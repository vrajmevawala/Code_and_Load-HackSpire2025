"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import {
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  AreaChart,
  Area,
  PieChart,
  Pie,
  Cell,
} from "recharts"
import { Loader2, RefreshCw, Calendar, Clock, ArrowRight, Download, Share2, Brain } from "lucide-react"
import Link from "next/link"
import { motion } from "framer-motion"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { useCheckInStorage } from "@/lib/storage"

type EmotionData = {
  date: string
  happiness: number
  anxiety: number
  energy: number
  anger: number
  sadness: number
}

type Recommendation = {
  id: string
  title: string
  description: string
  type: "exercise" | "meditation" | "activity"
  duration: number
  completed: boolean
}

type InsightCard = {
  title: string
  description: string
  type: "positive" | "negative" | "neutral"
  icon: React.ReactNode
}

export function Dashboard() {
  const [isLoading, setIsLoading] = useState(true)
  const [timeRange, setTimeRange] = useState<"week" | "month" | "year">("week")
  const { 
    getResultsByTimeRange, 
    getAverageSentiment, 
    getRecentTopics, 
    getRecentRecommendations,
    toggleRecommendationComplete 
  } = useCheckInStorage()

  useEffect(() => {
    setIsLoading(false)
  }, [])

  const results = getResultsByTimeRange(timeRange)
  const averageSentiment = getAverageSentiment(timeRange)
  const recentTopics = getRecentTopics()
  const recommendations = getRecentRecommendations()

  const getMoodDescription = () => {
    if (!averageSentiment) return "No data available"
    
    const { happiness, anxiety, energy, anger, sadness, calmness } = averageSentiment
    
    if (happiness > 70 && anxiety < 30 && anger < 20 && sadness < 20) {
      return "Very positive and calm"
    } else if (happiness > 50 && anxiety < 50 && anger < 30 && sadness < 30) {
      return "Generally positive"
    } else if (anxiety > 50 || anger > 40 || sadness > 40) {
      return "Experiencing some challenges"
    } else {
      return "Neutral"
    }
  }

  const getEmotionColor = (type: string) => {
    switch (type) {
      case "happiness":
        return "#22c55e" // Vibrant green
      case "anxiety":
        return "#ef4444" // Vibrant red
      case "energy":
        return "#3b82f6" // Vibrant blue
      case "anger":
        return "#ef4444" // Vibrant red
      case "sadness":
        return "#3b82f6" // Vibrant blue
      case "calmness":
        return "#8b5cf6" // Vibrant purple
      default:
        return "#22c55e"
    }
  }

  const getInsightBadgeColor = (type: "positive" | "negative" | "neutral") => {
    switch (type) {
      case "positive":
        return "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400"
      case "negative":
        return "bg-orange-100 text-orange-800 dark:bg-orange-900/30 dark:text-orange-400"
      case "neutral":
        return "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400"
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-400"
    }
  }

  const pieData = averageSentiment
    ? [
        { name: "Happiness", value: averageSentiment.happiness },
        { name: "Anxiety", value: averageSentiment.anxiety },
        { name: "Anger", value: averageSentiment.anger },
        { name: "Sadness", value: averageSentiment.sadness },
        { name: "Calmness", value: averageSentiment.calmness },
      ]
    : []

  const COLORS = ["#22c55e", "#ef4444", "#f97316", "#3b82f6", "#8b5cf6"]

  const metrics = averageSentiment
    ? [
        { label: "Happiness", value: averageSentiment.happiness, color: "bg-green-500" },
        { label: "Anxiety", value: averageSentiment.anxiety, color: "bg-orange-500" },
        { label: "Energy", value: averageSentiment.energy, color: "bg-yellow-500" },
        { label: "Anger", value: averageSentiment.anger, color: "bg-red-500" },
        { label: "Sadness", value: averageSentiment.sadness, color: "bg-blue-500" },
        { label: "Calmness", value: averageSentiment.calmness, color: "bg-purple-500" },
      ]
    : []

  const insights = [
    {
      title: "Recent Topics",
      description: recentTopics.length > 0 ? `You've been discussing: ${recentTopics.join(", ")}` : "No recent topics to show",
      type: "neutral" as const,
      icon: <Calendar className="h-5 w-5 text-blue-500" />,
    },
    {
      title: "Check-in Frequency",
      description: `You've completed ${results.length} check-ins in the last ${timeRange}`,
      type: "positive" as const,
      icon: <Clock className="h-5 w-5 text-green-500" />,
    },
  ]

  const handleToggleComplete = (id: string) => {
    toggleRecommendationComplete(id)
  }

  const handleTimeRangeChange = (value: string) => {
    setTimeRange(value as "week" | "month" | "year")
  }

  return (
    <div className="container mx-auto px-4 py-24">
      <div className="flex flex-col md:flex-row items-center justify-between mb-8 gap-4">
        <div>
          <h1 className="text-3xl font-bold text-teal-700 dark:text-teal-400">Your Wellness Dashboard</h1>
          <p className="text-gray-600 dark:text-gray-300">
            Track your mental wellness journey and get personalized insights
          </p>
        </div>
        <div className="flex items-center gap-3">
          <Button asChild variant="outline" size="sm">
            <Link href="/check-in">New Check-In</Link>
          </Button>
          <Select value={timeRange} onValueChange={handleTimeRangeChange}>
            <SelectTrigger className="w-[120px]">
              <SelectValue placeholder="Time Range" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="week">This Week</SelectItem>
              <SelectItem value="month">This Month</SelectItem>
              <SelectItem value="year">This Year</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {isLoading ? (
        <div className="flex justify-center items-center h-64">
          <Loader2 className="h-8 w-8 animate-spin text-teal-600 dark:text-teal-400" />
        </div>
      ) : (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="space-y-8"
        >
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card className="overflow-hidden border-2 hover:border-teal-200 dark:hover:border-teal-800 transition-all">
              <CardHeader className="pb-2">
                <CardTitle className="text-teal-700 dark:text-teal-400">Current Mood</CardTitle>
                <CardDescription>Based on your recent check-ins</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 rounded-full bg-teal-100 dark:bg-teal-900/30 flex items-center justify-center">
                    <div className="w-12 h-12 rounded-full bg-teal-200 dark:bg-teal-800/50 flex items-center justify-center">
                      <Brain className="h-6 w-6 text-teal-600 dark:text-teal-400" />
                    </div>
                  </div>
                  <div>
                    <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100">
                      {getMoodDescription()}
                    </h3>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      {averageSentiment
                        ? `Based on ${results.length} check-ins in the last ${timeRange}`
                        : "Complete a check-in to see your mood"}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="overflow-hidden border-2 hover:border-teal-200 dark:hover:border-teal-800 transition-all">
              <CardHeader className="pb-2">
                <CardTitle className="text-teal-700 dark:text-teal-400">Emotional Balance</CardTitle>
                <CardDescription>Your emotional state distribution</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[200px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={pieData}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        outerRadius={80}
                        fill="#8884d8"
                        dataKey="value"
                      >
                        {pieData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                      </Pie>
                      <Tooltip />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>

            <Card className="overflow-hidden border-2 hover:border-teal-200 dark:hover:border-teal-800 transition-all">
              <CardHeader className="pb-2">
                <CardTitle className="text-teal-700 dark:text-teal-400">Key Metrics</CardTitle>
                <CardDescription>Your emotional indicators</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {metrics.map((metric) => (
                    <div key={metric.label} className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                          {metric.label}
                        </span>
                        <span className="text-sm font-medium text-gray-900 dark:text-gray-100">
                          {metric.value}%
                        </span>
                      </div>
                      <div className="h-2 bg-gray-100 dark:bg-gray-800 rounded-full overflow-hidden">
                        <div
                          className={`h-full ${metric.color} transition-all duration-500`}
                          style={{ width: `${metric.value}%` }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card className="overflow-hidden border-2 hover:border-teal-200 dark:hover:border-teal-800 transition-all">
              <CardHeader className="pb-2">
                <CardTitle className="text-teal-700 dark:text-teal-400">Recent Insights</CardTitle>
                <CardDescription>Key observations from your check-ins</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {insights.map((insight, index) => (
                    <div
                      key={index}
                      className="flex items-start gap-4 p-4 rounded-lg bg-gray-50 dark:bg-gray-800/50"
                    >
                      <div className="p-2 rounded-full bg-gray-100 dark:bg-gray-700">
                        {insight.icon}
                      </div>
                      <div>
                        <h4 className="font-medium text-gray-900 dark:text-gray-100">{insight.title}</h4>
                        <p className="text-sm text-gray-500 dark:text-gray-400">{insight.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card className="overflow-hidden border-2 hover:border-teal-200 dark:hover:border-teal-800 transition-all">
              <CardHeader className="pb-2">
                <CardTitle className="text-teal-700 dark:text-teal-400">Recommendations</CardTitle>
                <CardDescription>Personalized activities for you</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4 max-h-[400px] overflow-y-auto pr-4">
                  {recommendations.length > 0 ? (
                    recommendations.map((rec) => (
                      <div
                        key={rec.id}
                        className={`flex items-start gap-4 p-4 rounded-lg bg-gray-50 dark:bg-gray-800/50 transition-all ${
                          rec.completed ? "opacity-75" : ""
                        }`}
                      >
                        <div className="p-2 rounded-full bg-gray-100 dark:bg-gray-700">
                          <Clock className="h-5 w-5 text-teal-600 dark:text-teal-400" />
                        </div>
                        <div className="flex-1">
                          <h4 className="font-medium text-gray-900 dark:text-gray-100 break-words">
                            {rec.title}
                          </h4>
                          <p className="text-sm text-gray-500 dark:text-gray-400 break-words">
                            {rec.description}
                          </p>
                        </div>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleToggleComplete(rec.id)}
                          className={`shrink-0 ${
                            rec.completed ? "bg-green-100 dark:bg-green-900/30" : ""
                          }`}
                        >
                          {rec.completed ? "Completed" : "Mark Complete"}
                        </Button>
                      </div>
                    ))
                  ) : (
                    <div className="text-center py-8 text-gray-500 dark:text-gray-400">
                      No recommendations available. Complete a check-in to get personalized recommendations.
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>
        </motion.div>
      )}
    </div>
  )
}
