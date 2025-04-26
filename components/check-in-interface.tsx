"use client"

import type React from "react"
import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"
import { useRouter } from "next/navigation"
import { analyzeResponse } from "@/lib/analyze-response"
import { detectEmotions } from "@/lib/emotion-detection"
import { Send, ArrowRight, Brain, RefreshCw } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import { Progress } from "@/components/ui/progress"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { EmotionAnalysis } from "@/components/emotion-analysis"
import type { EmotionAnalysisResult } from "@/lib/emotion-detection"

type Message = {
  id: string
  role: "system" | "user" | "assistant"
  content: string
  timestamp: Date
}

type CheckInStage = "intro" | "conversation" | "processing" | "analysis" | "complete"

type SentimentAnalysis = {
  happiness: number
  anxiety: number
  energy: number
}

const initialMessages: Message[] = [
  {
    id: "welcome",
    role: "assistant",
    content: "Hi there! I'm your mental wellness companion. How are you feeling today?",
    timestamp: new Date(),
  },
]

export function CheckInInterface() {
  const [messages, setMessages] = useState<Message[]>(initialMessages)
  const [input, setInput] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [stage, setStage] = useState<CheckInStage>("intro")
  const [progress, setProgress] = useState(0)
  const [analysis, setAnalysis] = useState<SentimentAnalysis | null>(null)
  const [emotionAnalysis, setEmotionAnalysis] = useState<EmotionAnalysisResult | null>(null)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const router = useRouter()

  // Auto-scroll to bottom of messages
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [messages])

  // Simulate progress for processing stage
  useEffect(() => {
    if (stage === "processing") {
      const interval = setInterval(() => {
        setProgress((prev: number) => {
          if (prev >= 100) {
            clearInterval(interval)
            return 100
          }
          return prev + 5
        })
      }, 150)

      // After progress reaches 100%, perform emotion analysis
      const timeout = setTimeout(async () => {
        try {
          const result = await detectEmotions(messages)
          setEmotionAnalysis(result)
          setStage("analysis")
        } catch (error) {
          console.error("Error analyzing emotions:", error)
          setStage("complete")
        }
      }, 3000)

      return () => {
        clearInterval(interval)
        clearTimeout(timeout)
      }
    }
  }, [stage, messages])

  const handleSendMessage = async () => {
    if (!input.trim()) return

    // Add user message
    const userMessage: Message = {
      id: `user-${Date.now()}`,
      role: "user",
      content: input,
      timestamp: new Date(),
    }

    setMessages((prev: Message[]) => [...prev, userMessage])
    setInput("")
    setIsLoading(true)

    try {
      // Analyze the response and get AI reply
      const result = await analyzeResponse(messages, input)

      // Add AI response
      setMessages((prev: Message[]) => [
        ...prev,
        {
          id: `assistant-${Date.now()}`,
          role: "assistant",
          content: result.response,
          timestamp: new Date(),
        },
      ])

      // Update sentiment analysis
      setAnalysis(result.sentiment)

      // Check if we should end the conversation
      if (result.shouldComplete) {
        setStage("processing")
      }
    } catch (error) {
      console.error("Error processing message:", error)
      setMessages((prev: Message[]) => [
        ...prev,
        {
          id: `error-${Date.now()}`,
          role: "assistant",
          content: "I'm sorry, I'm having trouble processing your response. Could you try again?",
          timestamp: new Date(),
        },
      ])
    } finally {
      setIsLoading(false)
    }
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      handleSendMessage()
    }
  }

  const handleStartCheckIn = () => {
    setStage("conversation")
  }

  const handleViewResults = () => {
    router.push("/dashboard")
  }

  const handleRestartCheckIn = () => {
    setMessages(initialMessages)
    setStage("intro")
    setProgress(0)
    setAnalysis(null)
    setEmotionAnalysis(null)
  }

  const handleCompleteAnalysis = () => {
    setStage("complete")
  }

  // Render different stages
  if (stage === "intro") {
    return (
      <div className="container mx-auto px-4 py-24">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
          <Card className="max-w-3xl mx-auto shadow-lg border-2 border-gray-100 dark:border-gray-800">
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
                      "Our Gemini AI analyzes your responses to understand your emotional state",
                      "Receive personalized insights and recommendations",
                      "Track your progress over time on your dashboard",
                    ].map((step, i) => (
                      <motion.li
                        key={i}
                        className="flex items-start gap-3"
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.3, delay: 0.1 * i }}
                      >
                        <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-teal-100 dark:bg-teal-900/50 text-teal-600 dark:text-teal-400 text-sm font-medium">
                          {i + 1}
                        </div>
                        <span>{step}</span>
                      </motion.li>
                    ))}
                  </ul>
                </div>
                <div className="flex-1 flex justify-center">
                  <div className="relative">
                    <div className="absolute -inset-1 bg-gradient-to-r from-teal-500 to-blue-500 rounded-full blur opacity-30 dark:opacity-40"></div>
                    <div className="relative bg-white dark:bg-gray-800 rounded-full p-6">
                      <Brain className="h-24 w-24 text-teal-600 dark:text-teal-400" />
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex justify-center pt-4">
                <Button
                  onClick={handleStartCheckIn}
                  size="lg"
                  className="bg-teal-600 hover:bg-teal-700 dark:bg-teal-600 dark:hover:bg-teal-700 group text-white"
                >
                  <span className="flex items-center gap-2">
                    Start Your Check-In
                    <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </span>
                </Button>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    )
  }

  if (stage === "processing") {
    return (
      <div className="container mx-auto px-4 py-24">
        <Card className="max-w-2xl mx-auto shadow-lg border-2 border-gray-100 dark:border-gray-800">
          <CardContent className="p-8 flex flex-col items-center justify-center min-h-[400px] text-center">
            <Brain className="h-16 w-16 text-teal-600 dark:text-teal-400 mb-6 animate-pulse" />
            <h2 className="text-2xl font-bold text-teal-700 dark:text-teal-400 mb-2">Analyzing Your Responses</h2>
            <p className="text-gray-600 dark:text-gray-300 mb-8 max-w-md">
              Our Gemini AI is processing your check-in to provide personalized insights and recommendations for your
              mental wellness.
            </p>
            <div className="w-full max-w-md mb-4">
              <Progress value={progress} className="h-2" />
            </div>
            <p className="text-sm text-gray-500 dark:text-gray-400">{progress}% complete</p>
          </CardContent>
        </Card>
      </div>
    )
  }

  if (stage === "analysis" && emotionAnalysis) {
    return (
      <div className="container mx-auto px-4 py-24">
        <EmotionAnalysis analysis={emotionAnalysis} onComplete={handleCompleteAnalysis} />
      </div>
    )
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

  // Conversation stage
  return (
    <div className="container mx-auto px-4 py-24">
      <Card className="max-w-2xl mx-auto shadow-lg border-2 border-gray-100 dark:border-gray-800">
        <CardHeader className="px-6 py-4 border-b">
          <div className="flex items-center gap-3">
            <Avatar>
              <AvatarImage src="/mindmosaic-avatar.png" alt="MindMosaic AI" />
              <AvatarFallback>
                <Brain className="h-5 w-5 text-teal-600 dark:text-teal-400" />
              </AvatarFallback>
            </Avatar>
            <div>
              <CardTitle className="text-sm font-medium">MindMosaic AI</CardTitle>
              <CardDescription className="text-xs">Your Gemini-powered mental wellness companion</CardDescription>
            </div>
          </div>
        </CardHeader>
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
                    transition={{ duration: 0.3 }}
                    className={`flex ${message.role === "user" ? "justify-end" : "justify-start"}`}
                  >
                    <div
                      className={`max-w-[80%] rounded-lg p-3 ${
                        message.role === "user"
                          ? "bg-teal-600 text-white"
                          : "bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700"
                      }`}
                    >
                      <p className="text-sm whitespace-pre-wrap">{message.content}</p>
                      <div className={`text-xs mt-1 ${message.role === "user" ? "text-teal-100" : "text-gray-400"}`}>
                        {new Intl.DateTimeFormat("en-US", {
                          hour: "2-digit",
                          minute: "2-digit",
                        }).format(message.timestamp)}
                      </div>
                    </div>
                  </motion.div>
                ))}
                {isLoading && (
                  <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex justify-start">
                    <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-3">
                      <div className="flex items-center gap-2">
                        <div className="w-2 h-2 rounded-full bg-teal-600 dark:bg-teal-400 animate-pulse"></div>
                        <div
                          className="w-2 h-2 rounded-full bg-teal-600 dark:bg-teal-400 animate-pulse"
                          style={{ animationDelay: "0.2s" }}
                        ></div>
                        <div
                          className="w-2 h-2 rounded-full bg-teal-600 dark:bg-teal-400 animate-pulse"
                          style={{ animationDelay: "0.4s" }}
                        ></div>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
              <div ref={messagesEndRef} />
            </div>

            <div className="p-4 border-t">
              <div className="flex items-end gap-2">
                <Textarea
                  value={input}
                  onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => setInput(e.target.value)}
                  onKeyDown={handleKeyDown}
                  placeholder="Type your response..."
                  className="flex-1 resize-none min-h-[80px]"
                  disabled={isLoading}
                />
                <Button
                  onClick={handleSendMessage}
                  disabled={isLoading || !input.trim()}
                  size="icon"
                  className="h-10 w-10 bg-teal-600 hover:bg-teal-700 dark:bg-teal-600 dark:hover:bg-teal-700 text-white"
                >
                  <Send className="h-5 w-5" />
                </Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
