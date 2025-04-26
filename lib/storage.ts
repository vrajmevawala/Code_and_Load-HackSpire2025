"use client"

import { useState, useEffect } from "react"

type CheckInResult = {
  id: string
  date: string
  sentiment: {
    happiness: number
    anxiety: number
    energy: number
    anger: number
    sadness: number
    calmness: number
  }
  topics: string[]
  recommendations: string[]
}

export function useCheckInStorage() {
  const [results, setResults] = useState<CheckInResult[]>([])
  const [completedRecommendations, setCompletedRecommendations] = useState<Record<string, boolean>>({})

  useEffect(() => {
    // Load results from localStorage on mount
    const storedResults = localStorage.getItem("checkInResults")
    if (storedResults) {
      setResults(JSON.parse(storedResults))
    }

    // Load completed recommendations
    const storedCompleted = localStorage.getItem("completedRecommendations")
    if (storedCompleted) {
      setCompletedRecommendations(JSON.parse(storedCompleted))
    }
  }, [])

  const addResult = (result: Omit<CheckInResult, "id" | "date">) => {
    const newResult: CheckInResult = {
      id: Date.now().toString(),
      date: new Date().toISOString(),
      ...result,
    }

    const updatedResults = [...results, newResult]
    setResults(updatedResults)
    localStorage.setItem("checkInResults", JSON.stringify(updatedResults))
  }

  const getResultsByTimeRange = (range: "week" | "month" | "year") => {
    const now = new Date()
    const filteredResults = results.filter((result) => {
      const resultDate = new Date(result.date)
      const diffTime = Math.abs(now.getTime() - resultDate.getTime())
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))

      switch (range) {
        case "week":
          return diffDays <= 7
        case "month":
          return diffDays <= 30
        case "year":
          return diffDays <= 365
        default:
          return true
      }
    })

    return filteredResults
  }

  const getAverageSentiment = (range: "week" | "month" | "year") => {
    const filteredResults = getResultsByTimeRange(range)
    if (filteredResults.length === 0) return null

    const sum = filteredResults.reduce(
      (acc, result) => ({
        happiness: acc.happiness + result.sentiment.happiness,
        anxiety: acc.anxiety + result.sentiment.anxiety,
        energy: acc.energy + result.sentiment.energy,
        anger: acc.anger + result.sentiment.anger,
        sadness: acc.sadness + result.sentiment.sadness,
        calmness: acc.calmness + result.sentiment.calmness,
      }),
      { happiness: 0, anxiety: 0, energy: 0, anger: 0, sadness: 0, calmness: 0 }
    )

    return {
      happiness: Math.round(sum.happiness / filteredResults.length),
      anxiety: Math.round(sum.anxiety / filteredResults.length),
      energy: Math.round(sum.energy / filteredResults.length),
      anger: Math.round(sum.anger / filteredResults.length),
      sadness: Math.round(sum.sadness / filteredResults.length),
      calmness: Math.round(sum.calmness / filteredResults.length),
    }
  }

  const getRecentTopics = () => {
    const recentResults = getResultsByTimeRange("week")
    const topics = recentResults.flatMap((result) => result.topics)
    const topicCounts = topics.reduce((acc, topic) => {
      acc[topic] = (acc[topic] || 0) + 1
      return acc
    }, {} as Record<string, number>)

    return Object.entries(topicCounts)
      .sort(([, a], [, b]) => b - a)
      .slice(0, 5)
      .map(([topic]) => topic)
  }

  const toggleRecommendationComplete = (id: string) => {
    const updatedCompleted = {
      ...completedRecommendations,
      [id]: !completedRecommendations[id]
    }
    setCompletedRecommendations(updatedCompleted)
    localStorage.setItem("completedRecommendations", JSON.stringify(updatedCompleted))
  }

  const getRecentRecommendations = () => {
    const recentResults = getResultsByTimeRange("week")
    return recentResults.flatMap((result) =>
      result.recommendations.map((rec, index) => ({
        id: `${result.id}-${index}`,
        title: rec,
        description: "Based on your recent check-in",
        type: "activity" as const,
        duration: 15,
        completed: completedRecommendations[`${result.id}-${index}`] || false,
      }))
    )
  }

  return {
    results,
    addResult,
    getResultsByTimeRange,
    getAverageSentiment,
    getRecentTopics,
    getRecentRecommendations,
    toggleRecommendationComplete,
  }
} 