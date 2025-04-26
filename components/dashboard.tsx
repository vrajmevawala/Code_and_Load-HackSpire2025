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
import { Loader2, RefreshCw, Calendar, Clock, ArrowRight, Download, Share2 } from "lucide-react"
import Link from "next/link"
import { motion } from "framer-motion"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"

type EmotionData = {
  date: string
  happiness: number
  anxiety: number
  energy: number
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
  const [emotionData, setEmotionData] = useState<EmotionData[]>([])
  const [recommendations, setRecommendations] = useState<Recommendation[]>([])
  const [currentMood, setCurrentMood] = useState<string>("")
  const [timeRange, setTimeRange] = useState<"week" | "month" | "year">("week")
  const [insights, setInsights] = useState<InsightCard[]>([])

  useEffect(() => {
    // Simulate loading data
    const loadData = async () => {
      await new Promise((resolve) => setTimeout(resolve, 1500))

      // Mock data
      setEmotionData([
        { date: "Mon", happiness: 65, anxiety: 40, energy: 70 },
        { date: "Tue", happiness: 60, anxiety: 45, energy: 65 },
        { date: "Wed", happiness: 70, anxiety: 35, energy: 75 },
        { date: "Thu", happiness: 75, anxiety: 30, energy: 80 },
        { date: "Fri", happiness: 72, anxiety: 32, energy: 78 },
        { date: "Sat", happiness: 80, anxiety: 25, energy: 85 },
        { date: "Sun", happiness: 78, anxiety: 28, energy: 82 },
      ])

      setRecommendations([
        {
          id: "rec1",
          title: "Morning Meditation",
          description: "A 10-minute guided meditation to start your day with clarity and calm.",
          type: "meditation",
          duration: 10,
          completed: false,
        },
        {
          id: "rec2",
          title: "Deep Breathing Exercise",
          description: "A 5-minute breathing technique to reduce anxiety and increase focus.",
          type: "exercise",
          duration: 5,
          completed: true,
        },
        {
          id: "rec3",
          title: "Nature Walk",
          description: "Spend 20 minutes outdoors to boost your mood and energy levels.",
          type: "activity",
          duration: 20,
          completed: false,
        },
        {
          id: "rec4",
          title: "Gratitude Journaling",
          description: "Take 5 minutes to write down three things you're grateful for today.",
          type: "exercise",
          duration: 5,
          completed: false,
        },
        {
          id: "rec5",
          title: "Body Scan Meditation",
          description: "A 15-minute meditation to release tension and connect with your body.",
          type: "meditation",
          duration: 15,
          completed: false,
        },
      ])

      setInsights([
        {
          title: "Improved Sleep Pattern",
          description: "Your sleep quality has improved by 15% this week compared to last week.",
          type: "positive",
          icon: <Clock className="h-5 w-5 text-green-500" />,
        },
        {
          title: "Anxiety Triggers",
          description: "Work-related topics appear to trigger anxiety peaks in your check-ins.",
          type: "negative",
          icon: <Clock className="h-5 w-5 text-orange-500" />,
        },
        {
          title: "Consistent Check-ins",
          description: "You've completed 5 check-ins this week, maintaining your streak!",
          type: "positive",
          icon: <Calendar className="h-5 w-5 text-green-500" />,
        },
      ])

      setCurrentMood("Moderately positive with some anxiety")
      setIsLoading(false)
    }

    loadData()
  }, [])

  const handleToggleComplete = (id: string) => {
    setRecommendations((prev) => prev.map((rec) => (rec.id === id ? { ...rec, completed: !rec.completed } : rec)))
  }

  const handleTimeRangeChange = (value: string) => {
    setTimeRange(value as "week" | "month" | "year")
  }

  // Updated vibrant colors for better visual appeal
  const getEmotionColor = (type: string) => {
    switch (type) {
      case "happiness":
        return "#22c55e" // Vibrant green
      case "anxiety":
        return "#ef4444" // Vibrant red
      case "energy":
        return "#3b82f6" // Vibrant blue
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

  const pieData = [
    { name: "Happiness", value: 65 },
    { name: "Anxiety", value: 35 },
  ]

  // Updated vibrant colors for pie chart
  const COLORS = ["#22c55e", "#ef4444", "#3b82f6"]

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
                <CardDescription>Based on your recent check-in</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 rounded-full bg-teal-100 dark:bg-teal-900/30 flex items-center justify-center">
                    <div className="w-12 h-12 rounded-full bg-teal-200 dark:bg-teal-800/50 flex items-center justify-center">
                      <div className="w-8 h-8 rounded-full bg-teal-600 dark:bg-teal-600"></div>
                    </div>
                  </div>
                  <div>
                    <p className="text-xl font-medium">{currentMood}</p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">Updated 2 hours ago</p>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="bg-gray-50 dark:bg-gray-800/50 pt-3 pb-3">
                <Button asChild variant="ghost" size="sm" className="w-full justify-between">
                  <Link href="/check-in" className="flex items-center">
                    <span>New Check-In</span>
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                </Button>
              </CardFooter>
            </Card>

            <Card className="md:col-span-2 border-2 hover:border-teal-200 dark:hover:border-teal-800 transition-all">
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <div>
                  <CardTitle className="text-teal-700 dark:text-teal-400">Mood Trends</CardTitle>
                  <CardDescription>Your emotional patterns over time</CardDescription>
                </div>
                <Button variant="ghost" size="icon" className="h-8 w-8">
                  <RefreshCw className="h-4 w-4" />
                </Button>
              </CardHeader>
              <CardContent>
                <div className="h-[220px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={emotionData}>
                      <defs>
                        <linearGradient id="colorHappiness" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#22c55e" stopOpacity={0.8} />
                          <stop offset="95%" stopColor="#22c55e" stopOpacity={0} />
                        </linearGradient>
                        <linearGradient id="colorAnxiety" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#ef4444" stopOpacity={0.8} />
                          <stop offset="95%" stopColor="#ef4444" stopOpacity={0} />
                        </linearGradient>
                        <linearGradient id="colorEnergy" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.8} />
                          <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
                        </linearGradient>
                      </defs>
                      <CartesianGrid strokeDasharray="3 3" opacity={0.2} />
                      <XAxis dataKey="date" />
                      <YAxis />
                      <Tooltip
                        contentStyle={{
                          backgroundColor: "rgba(255, 255, 255, 0.9)",
                          borderRadius: "8px",
                          boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
                          border: "none",
                        }}
                      />
                      <Area
                        type="monotone"
                        dataKey="happiness"
                        stroke="#22c55e"
                        strokeWidth={2}
                        fillOpacity={1}
                        fill="url(#colorHappiness)"
                        name="Happiness"
                      />
                      <Area
                        type="monotone"
                        dataKey="anxiety"
                        stroke="#ef4444"
                        strokeWidth={2}
                        fillOpacity={1}
                        fill="url(#colorAnxiety)"
                        name="Anxiety"
                      />
                      <Area
                        type="monotone"
                        dataKey="energy"
                        stroke="#3b82f6"
                        strokeWidth={2}
                        fillOpacity={1}
                        fill="url(#colorEnergy)"
                        name="Energy"
                      />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
              <CardFooter className="bg-gray-50 dark:bg-gray-800/50 pt-3 pb-3 flex justify-between">
                <div className="flex items-center gap-6">
                  {["happiness", "anxiety", "energy"].map((type) => (
                    <div key={type} className="flex items-center gap-2">
                      <div className="w-3 h-3 rounded-full" style={{ backgroundColor: getEmotionColor(type) }} />
                      <span className="text-sm capitalize">{type}</span>
                    </div>
                  ))}
                </div>
                <div className="flex gap-2">
                  <Button variant="ghost" size="sm" className="h-8 flex items-center gap-1">
                    <Download className="h-3 w-3" />
                    <span>Export</span>
                  </Button>
                  <Button variant="ghost" size="sm" className="h-8 flex items-center gap-1">
                    <Share2 className="h-3 w-3" />
                    <span>Share</span>
                  </Button>
                </div>
              </CardFooter>
            </Card>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card className="border-2 hover:border-teal-200 dark:hover:border-teal-800 transition-all">
              <CardHeader className="pb-2">
                <CardTitle className="text-teal-700 dark:text-teal-400">Emotional Balance</CardTitle>
                <CardDescription>Happiness vs. Anxiety ratio</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[200px] flex items-center justify-center">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={pieData}
                        cx="50%"
                        cy="50%"
                        innerRadius={60}
                        outerRadius={80}
                        paddingAngle={5}
                        dataKey="value"
                      >
                        {pieData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                      </Pie>
                      <Tooltip
                        contentStyle={{
                          backgroundColor: "rgba(255, 255, 255, 0.9)",
                          borderRadius: "8px",
                          boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
                          border: "none",
                        }}
                      />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
              <CardFooter className="bg-gray-50 dark:bg-gray-800/50 pt-3 pb-3">
                <div className="w-full flex justify-around">
                  {pieData.map((entry, index) => (
                    <div key={`legend-${index}`} className="flex items-center gap-2">
                      <div
                        className="w-3 h-3 rounded-full"
                        style={{ backgroundColor: COLORS[index % COLORS.length] }}
                      />
                      <span className="text-sm">
                        {entry.name}: {entry.value}%
                      </span>
                    </div>
                  ))}
                </div>
              </CardFooter>
            </Card>

            <Card className="md:col-span-2 border-2 hover:border-teal-200 dark:hover:border-teal-800 transition-all">
              <CardHeader className="pb-2">
                <CardTitle className="text-teal-700 dark:text-teal-400">Wellness Insights</CardTitle>
                <CardDescription>Personalized observations based on your data</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {insights.map((insight, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.3, delay: index * 0.1 }}
                    >
                      <Card>
                        <CardContent className="p-4 flex items-start gap-3">
                          <div
                            className={`p-2 rounded-full ${
                              insight.type === "positive"
                                ? "bg-green-100 dark:bg-green-900/30"
                                : insight.type === "negative"
                                  ? "bg-orange-100 dark:bg-orange-900/30"
                                  : "bg-blue-100 dark:bg-blue-900/30"
                            }`}
                          >
                            {insight.icon}
                          </div>
                          <div className="flex-1">
                            <div className="flex items-center justify-between mb-1">
                              <h3 className="font-medium">{insight.title}</h3>
                              <Badge className={getInsightBadgeColor(insight.type)}>
                                {insight.type === "positive"
                                  ? "Positive"
                                  : insight.type === "negative"
                                    ? "Action Needed"
                                    : "Neutral"}
                              </Badge>
                            </div>
                            <p className="text-sm text-gray-600 dark:text-gray-300">{insight.description}</p>
                          </div>
                        </CardContent>
                      </Card>
                    </motion.div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          <Card className="border-2 hover:border-teal-200 dark:hover:border-teal-800 transition-all">
            <CardHeader className="pb-2">
              <CardTitle className="text-teal-700 dark:text-teal-400">Personalized Recommendations</CardTitle>
              <CardDescription>Based on your emotional state and patterns</CardDescription>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="all" className="w-full">
                <TabsList className="mb-4 w-full justify-start">
                  <TabsTrigger value="all">All</TabsTrigger>
                  <TabsTrigger value="meditation">Meditation</TabsTrigger>
                  <TabsTrigger value="exercise">Exercises</TabsTrigger>
                  <TabsTrigger value="activity">Activities</TabsTrigger>
                </TabsList>

                {["all", "meditation", "exercise", "activity"].map((tabValue) => (
                  <TabsContent key={tabValue} value={tabValue} className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                      {recommendations
                        .filter((rec) => tabValue === "all" || rec.type === tabValue)
                        .map((rec) => (
                          <Card
                            key={rec.id}
                            className={`overflow-hidden transition-all ${rec.completed ? "bg-gray-50 dark:bg-gray-800/50 opacity-75" : ""}`}
                          >
                            <CardHeader className="p-4 pb-2">
                              <div className="flex items-center justify-between">
                                <CardTitle className="text-base">{rec.title}</CardTitle>
                                <Badge variant="outline" className="text-xs">
                                  {rec.duration} min
                                </Badge>
                              </div>
                            </CardHeader>
                            <CardContent className="p-4 pt-2">
                              <p className="text-sm text-gray-600 dark:text-gray-300 mb-4">{rec.description}</p>
                              <div className="flex items-center justify-between">
                                <Button
                                  size="sm"
                                  variant={rec.completed ? "outline" : "default"}
                                  className={
                                    rec.completed
                                      ? ""
                                      : "bg-teal-600 hover:bg-teal-700 dark:bg-teal-600 dark:hover:bg-teal-700 text-white"
                                  }
                                  onClick={() => handleToggleComplete(rec.id)}
                                >
                                  {rec.completed ? "Completed" : "Start Now"}
                                </Button>
                                <Badge
                                  className={`capitalize ${
                                    rec.type === "meditation"
                                      ? "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400"
                                      : rec.type === "exercise"
                                        ? "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400"
                                        : "bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-400"
                                  }`}
                                >
                                  {rec.type}
                                </Badge>
                              </div>
                            </CardContent>
                          </Card>
                        ))}
                    </div>
                  </TabsContent>
                ))}
              </Tabs>
            </CardContent>
          </Card>
        </motion.div>
      )}
    </div>
  )
}
