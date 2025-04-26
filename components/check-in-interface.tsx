"use client";

import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { useRouter } from "next/navigation";
import { analyzeResponse } from "@/lib/analyze-response";
import { detectEmotions } from "@/lib/emotion-detection";
import { Send, ArrowRight, Brain, RefreshCw } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

type Message = {
  id: string;
  role: "system" | "user" | "assistant";
  content: string;
  timestamp: Date;
};

type CheckInStage = "intro" | "conversation" | "processing" | "analysis" | "complete";

type SentimentAnalysis = {
  happiness: number;
  anxiety: number;
  energy: number;
};

const initialMessages: Message[] = [
  {
    id: "welcome",
    role: "assistant",
    content: "Hi there! I'm your mental wellness companion. How are you feeling today?",
    timestamp: new Date(),
  },
];

export function CheckInInterface() {
  const [messages, setMessages] = useState<Message[]>(initialMessages);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [stage, setStage] = useState<CheckInStage>("intro");
  const [progress, setProgress] = useState(0);
  const [analysis, setAnalysis] = useState<SentimentAnalysis | null>(null);

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  useEffect(() => {
    if (stage === "processing") {
      const interval = setInterval(() => {
        setProgress((prev: number) => {
          if (prev >= 100) {
            clearInterval(interval);
            return 100;
          }
          return prev + 5;
        });
      }, 150);

      const timeout = setTimeout(async () => {
        try {
          await detectEmotions(messages);
          setStage("analysis");
        } catch (error) {
          console.error("Error analyzing emotions:", error);
          setStage("complete");
        }
      }, 3000);

      return () => {
        clearInterval(interval);
        clearTimeout(timeout);
      };
    }
  }, [stage, messages]);

  const handleSendMessage = async () => {
    if (!input.trim()) return;

    const userMessage: Message = {
      id: `user-${Date.now()}`,
      role: "user",
      content: input,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsLoading(true);

    try {
      const result = await analyzeResponse(messages, input);

      setMessages((prev) => [
        ...prev,
        {
          id: `assistant-${Date.now()}`,
          role: "assistant",
          content: result.response,
          timestamp: new Date(),
        },
      ]);

      setAnalysis(result.sentiment);
    } catch (error) {
      console.error("Error processing message:", error);
      setMessages((prev) => [
        ...prev,
        {
          id: `error-${Date.now()}`,
          role: "assistant",
          content: "I'm sorry, I'm having trouble processing your response. Could you try again?",
          timestamp: new Date(),
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const handleStartCheckIn = () => {
    setStage("conversation");
  };

  const handleViewResults = () => {
    router.push("/dashboard");
  };

  const handleRestartCheckIn = () => {
    setMessages(initialMessages);
    setStage("intro");
    setProgress(0);
    setAnalysis(null);
  };

  const handleCompleteAnalysis = () => {
    setStage("complete");
  };

  if (stage === "intro") {
    return (
      <div className="container mx-auto px-4 py-24">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
          <Card className="max-w-3xl mx-auto shadow-lg border-2">
            <CardHeader className="text-center pb-2">
              <CardTitle className="text-3xl font-bold text-teal-700 dark:text-teal-400">
                Mental Wellness Check-In
              </CardTitle>
              <CardDescription className="text-lg">
                Take a moment to reflect on your mental state and receive personalized insights
              </CardDescription>
            </CardHeader>
            <CardContent className="p-6 space-y-8">
              <div className="flex flex-col md:flex-row gap-8 items-center">
                <div className="flex-1">
                  <h3 className="text-xl font-medium text-teal-700 dark:text-teal-400 mb-4">How it works:</h3>
                  <ul className="space-y-3">
                    {[
                      "Have a natural conversation about how you're feeling",
                      "Our AI analyzes your responses",
                      "Receive insights and recommendations",
                      "Track your progress over time",
                    ].map((step, i) => (
                      <motion.li key={i} className="flex items-start gap-3">
                        <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-teal-100 dark:bg-teal-900/50 text-teal-600 dark:text-teal-400 text-sm font-medium">
                          {i + 1}
                        </div>
                        <span>{step}</span>
                      </motion.li>
                    ))}
                  </ul>
                </div>
                <div className="flex-1 flex justify-center">
                  <div className="relative bg-white dark:bg-gray-800 rounded-full p-6">
                    <Brain className="h-24 w-24 text-teal-600 dark:text-teal-400" />
                  </div>
                </div>
              </div>
              <div className="flex justify-center pt-4">
                <Button onClick={handleStartCheckIn} size="lg" className="bg-teal-600 hover:bg-teal-700 text-white">
                  Start Your Check-In
                  <ArrowRight className="h-4 w-4 ml-2" />
                </Button>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    );
  }

  if (stage === "analysis") {
    return (
      <div className="container mx-auto px-4 py-24 text-center">
        <h2 className="text-2xl font-bold text-teal-700 dark:text-teal-400 mb-4">
          Analysis Complete
        </h2>
        <p className="text-gray-600 dark:text-gray-300 mb-8">
          Your emotional analysis is complete. You can now view your results!
        </p>
        <Button
          onClick={handleCompleteAnalysis}
          className="bg-teal-600 hover:bg-teal-700 text-white"
        >
          View Results
        </Button>
      </div>
    );
  }

  if (stage === "complete") {
    return (
      <div className="container mx-auto px-4 py-24">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
          <Card className="max-w-2xl mx-auto shadow-lg border-2 border-gray-100 dark:border-gray-800">
            <CardContent className="p-8">
              <div className="text-center mb-8">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-teal-100 dark:bg-teal-900/50 text-teal-600 dark:text-teal-400 mb-4">
                  <Brain className="h-8 w-8" />
                </div>
                <h2 className="text-2xl font-bold text-teal-700 dark:text-teal-400 mb-2">Check-In Complete!</h2>
                <p className="text-gray-600 dark:text-gray-300 max-w-md mx-auto">
                  Thank you for sharing. We've analyzed your responses and prepared personalized insights.
                </p>
              </div>

              {analysis && (
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
                  {[
                    { label: "Happiness", value: analysis.happiness, color: "bg-green-500" },
                    { label: "Energy", value: analysis.energy, color: "bg-blue-500" },
                    { label: "Anxiety", value: analysis.anxiety, color: "bg-orange-500" },
                  ].map((metric) => (
                    <Card key={metric.label} className="overflow-hidden">
                      <CardHeader className="p-4 pb-2">
                        <CardTitle className="text-sm font-medium">{metric.label}</CardTitle>
                      </CardHeader>
                      <CardContent className="p-4 pt-0">
                        <div className="text-2xl font-bold">{metric.value}%</div>
                        <div className="w-full h-2 bg-gray-100 dark:bg-gray-700 rounded-full mt-2 overflow-hidden">
                          <motion.div
                            className={`h-full ${metric.color}`}
                            initial={{ width: 0 }}
                            animate={{ width: `${metric.value}%` }}
                            transition={{ duration: 1, delay: 0.2 }}
                          />
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              )}

              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button
                  onClick={handleViewResults}
                  size="lg"
                  className="bg-teal-600 hover:bg-teal-700 dark:bg-teal-600 dark:hover:bg-teal-700 text-white"
                >
                  View Your Dashboard
                </Button>
                <Button onClick={handleRestartCheckIn} variant="outline" size="lg" className="flex items-center gap-2">
                  <RefreshCw className="h-4 w-4" />
                  Start New Check-In
                </Button>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    )
  }


  return (
    <div className="container mx-auto px-4 py-24">
      <Card className="max-w-2xl mx-auto shadow-lg border-2">
        <CardContent className="p-0">
          <div className="flex flex-col h-[500px]">
            <div className="flex-1 overflow-y-auto p-4 space-y-4" id="chat-container">
              <AnimatePresence>
                {messages.map((message: Message) => (
                  <motion.div
                    key={message.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    className={`flex ${message.role === "user" ? "justify-end" : "justify-start"}`}
                  >
                    <div
                      className={`max-w-[80%] rounded-lg p-3 ${
                        message.role === "user"
                          ? "bg-teal-600 text-white"
                          : "bg-white border dark:bg-gray-800 dark:border-gray-700"
                      }`}
                    >
                      <p className="text-sm whitespace-pre-wrap">{message.content}</p>
                      <div className={`text-xs mt-1 ${message.role === "user" ? "text-teal-100" : "text-gray-400"}`}>
                        {new Intl.DateTimeFormat("en-US", { hour: "2-digit", minute: "2-digit" }).format(
                          message.timestamp
                        )}
                      </div>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
              <div ref={messagesEndRef} />
            </div>

            <div className="p-4 border-t">
              <div className="flex flex-col gap-4">
                <div className="flex items-end gap-2">
                  <Textarea
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={handleKeyDown}
                    placeholder="Type your response..."
                    className="flex-1 resize-none min-h-[80px]"
                    disabled={isLoading}
                  />
                  <Button
                    onClick={handleSendMessage}
                    disabled={isLoading || !input.trim()}
                    size="icon"
                    className="h-10 w-10 bg-teal-600 hover:bg-teal-700 text-white"
                  >
                    <Send className="h-5 w-5" />
                  </Button>
                </div>

                <Button
                  onClick={() => setStage("processing")}
                  size="lg"
                  className="w-full flex items-center justify-center gap-2 rounded-md bg-teal-600 hover:bg-teal-700 text-white font-semibold transition-all duration-200"
                >
                  <Brain className="h-5 w-5" />
                  Analyze Now
                </Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
