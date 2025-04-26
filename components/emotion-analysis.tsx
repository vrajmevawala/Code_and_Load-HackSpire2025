"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Clock, ArrowRight, Brain, Activity, Heart } from "lucide-react"
import { motion } from "framer-motion"
import Link from "next/link"
import type { EmotionAnalysisResult, Recommendation } from "@/lib/emotion-detection"

interface EmotionAnalysisProps {
  analysis: EmotionAnalysisResult
  onComplete: () => void
}

export function EmotionAnalysis({ analysis, onComplete }: EmotionAnalysisProps) {
  const [activeTab, setActiveTab] = useState<string>("overview")

  const getProgressColor = (value: number) => {
    if (value > 70) return "bg-red-500"
    if (value > 40) return "bg-orange-500"
    return "bg-green-500"
  }

  return (
    <Card className="w-full max-w-4xl mx-auto shadow-lg border-2 border-gray-100 dark:border-gray-800">
      <CardHeader className="pb-2">
        <div className="flex justify-between items-center">
          <div>
            <CardTitle className="text-2xl font-bold text-teal-700 dark:text-teal-400">Emotion Analysis</CardTitle>
            <CardDescription>Based on your recent check-in conversation</CardDescription>
          </div>
          <div className="flex items-center gap-2">
            <Badge variant="outline" className="text-xs">
              Gemini-Powered
            </Badge>
            <Brain className="h-5 w-5 text-teal-600 dark:text-teal-400" />
          </div>
        </div>
      </CardHeader>

      <Tabs defaultValue="overview" value={activeTab} onValueChange={setActiveTab} className="w-full">
        <div className="px-6">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="emotions">Emotions</TabsTrigger>
            <TabsTrigger value="recommendations">Recommendations</TabsTrigger>
          </TabsList>
        </div>

        <TabsContent value="overview" className="p-6 pt-4">
          <div className="space-y-6">
            <div className="flex flex-col md:flex-row gap-6">
              <Card className="flex-1">
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg">Primary Emotion</CardTitle>
                </CardHeader>
                <CardContent className="pt-0">
                  <div className="flex items-center gap-3">
                    <div
                      className="w-12 h-12 rounded-full flex items-center justify-center"
                      style={{ backgroundColor: `${analysis.primaryEmotion.color}20` }}
                    >
                      <div
                        className="w-8 h-8 rounded-full"
                        style={{ backgroundColor: analysis.primaryEmotion.color }}
                      ></div>
                    </div>
                    <div>
                      <div className="text-xl font-medium">{analysis.primaryEmotion.name}</div>
                      <div className="text-sm text-gray-500 dark:text-gray-400">
                        {analysis.primaryEmotion.score.toFixed(0)}% intensity
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {analysis.secondaryEmotion && (
                <Card className="flex-1">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg">Secondary Emotion</CardTitle>
                  </CardHeader>
                  <CardContent className="pt-0">
                    <div className="flex items-center gap-3">
                      <div
                        className="w-12 h-12 rounded-full flex items-center justify-center"
                        style={{ backgroundColor: `${analysis.secondaryEmotion.color}20` }}
                      >
                        <div
                          className="w-8 h-8 rounded-full"
                          style={{ backgroundColor: analysis.secondaryEmotion.color }}
                        ></div>
                      </div>
                      <div>
                        <div className="text-xl font-medium">{analysis.secondaryEmotion.name}</div>
                        <div className="text-sm text-gray-500 dark:text-gray-400">
                          {analysis.secondaryEmotion.score.toFixed(0)}% intensity
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )}
            </div>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg">Stress & Anxiety Levels</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <div className="flex justify-between mb-1">
                    <div className="text-sm font-medium">Stress Level</div>
                    <div className="text-sm text-gray-500">{analysis.stressLevel.toFixed(0)}%</div>
                  </div>
                  <div className="relative h-2 w-full overflow-hidden rounded-full bg-secondary">
                    <div
                      className="h-full w-full flex-1 transition-all"
                      style={{
                        transform: `translateX(-${100 - analysis.stressLevel}%)`,
                        backgroundColor: getProgressColor(analysis.stressLevel),
                      }}
                    />
                  </div>
                </div>

                <div>
                  <div className="flex justify-between mb-1">
                    <div className="text-sm font-medium">Anxiety Level</div>
                    <div className="text-sm text-gray-500">{analysis.anxietyLevel.toFixed(0)}%</div>
                  </div>
                  <div className="relative h-2 w-full overflow-hidden rounded-full bg-secondary">
                    <div
                      className="h-full w-full flex-1 transition-all"
                      style={{
                        transform: `translateX(-${100 - analysis.anxietyLevel}%)`,
                        backgroundColor: getProgressColor(analysis.anxietyLevel),
                      }}
                    />
                  </div>
                </div>
              </CardContent>
            </Card>

            <div className="flex justify-between">
              <Button variant="outline" onClick={() => setActiveTab("emotions")}>
                View Detailed Emotions
              </Button>
              <Button onClick={() => setActiveTab("recommendations")}>View Recommendations</Button>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="emotions" className="p-6 pt-4">
          <div className="space-y-6">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg">About Your Emotions</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="mb-4">Based on your check-in, we've identified the following emotional patterns:</p>

                <div className="space-y-4">
                  <div className="p-4 border rounded-lg">
                    <div className="flex items-center gap-3 mb-2">
                      <div
                        className="w-8 h-8 rounded-full"
                        style={{ backgroundColor: analysis.primaryEmotion.color }}
                      ></div>
                      <h3 className="font-medium text-lg">{analysis.primaryEmotion.name}</h3>
                    </div>
                    <p className="text-gray-600 dark:text-gray-300">{analysis.primaryEmotion.description}</p>
                  </div>

                  {analysis.secondaryEmotion && (
                    <div className="p-4 border rounded-lg">
                      <div className="flex items-center gap-3 mb-2">
                        <div
                          className="w-8 h-8 rounded-full"
                          style={{ backgroundColor: analysis.secondaryEmotion.color }}
                        ></div>
                        <h3 className="font-medium text-lg">{analysis.secondaryEmotion.name}</h3>
                      </div>
                      <p className="text-gray-600 dark:text-gray-300">{analysis.secondaryEmotion.description}</p>
                    </div>
                  )}
                </div>

                <div className="mt-6">
                  <h3 className="font-medium mb-2">Overall Mood</h3>
                  <div className="w-full h-6 bg-gray-100 dark:bg-gray-800 rounded-full overflow-hidden">
                    <div
                      className="h-full flex items-center justify-center text-xs text-white"
                      style={{
                        width: "50%",
                        marginLeft: `${50 + analysis.overallSentiment * 50}%`,
                        backgroundColor:
                          analysis.overallSentiment > 0.3
                            ? "#22c55e"
                            : analysis.overallSentiment < -0.3
                              ? "#ef4444"
                              : "#f59e0b",
                        transform: "translateX(-50%)",
                      }}
                    >
                      {analysis.overallSentiment > 0.3
                        ? "Positive"
                        : analysis.overallSentiment < -0.3
                          ? "Negative"
                          : "Neutral"}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <div className="flex justify-between">
              <Button variant="outline" onClick={() => setActiveTab("overview")}>
                Back to Overview
              </Button>
              <Button onClick={() => setActiveTab("recommendations")}>View Recommendations</Button>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="recommendations" className="p-6 pt-4">
          <div className="space-y-6">
            <p className="text-gray-600 dark:text-gray-300">
              Based on your emotional state, here are some personalized recommendations to help you:
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {analysis.recommendations.map((rec) => (
                <RecommendationCard key={rec.id} recommendation={rec} />
              ))}
            </div>

            <div className="flex justify-between">
              <Button variant="outline" onClick={() => setActiveTab("overview")}>
                Back to Overview
              </Button>
              <Button onClick={onComplete}>Complete Check-In</Button>
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </Card>
  )
}

function RecommendationCard({ recommendation }: { recommendation: Recommendation }) {
  const getIcon = () => {
    switch (recommendation.type) {
      case "meditation":
        return <Brain className="h-5 w-5 text-blue-500" />
      case "exercise":
        return <Activity className="h-5 w-5 text-green-500" />
      case "activity":
        return <Heart className="h-5 w-5 text-purple-500" />
      case "resource":
        return <Clock className="h-5 w-5 text-orange-500" />
      default:
        return <Clock className="h-5 w-5 text-gray-500" />
    }
  }

  return (
    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }}>
      <Card>
        <CardHeader className="pb-2">
          <div className="flex justify-between items-start">
            <CardTitle className="text-base">{recommendation.title}</CardTitle>
            <Badge variant="outline" className="capitalize">
              {recommendation.type}
            </Badge>
          </div>
        </CardHeader>
        <CardContent className="pb-2">
          <p className="text-sm text-gray-600 dark:text-gray-300">{recommendation.description}</p>
        </CardContent>
        <CardFooter className="flex justify-between pt-0">
          <div className="flex items-center text-sm text-gray-500">
            {recommendation.duration && (
              <>
                <Clock className="h-3.5 w-3.5 mr-1" />
                <span>{recommendation.duration} min</span>
              </>
            )}
          </div>
          {recommendation.link ? (
            <Button asChild variant="ghost" size="sm" className="gap-1">
              <Link href={recommendation.link}>
                <span>View</span>
                <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            </Button>
          ) : (
            <Button variant="ghost" size="sm" className="gap-1">
              <span>Start</span>
              <ArrowRight className="h-3.5 w-3.5" />
            </Button>
          )}
        </CardFooter>
      </Card>
    </motion.div>
  )
}
