"use server"

import { generateWithGemini } from "./gemini-client"

export type Emotion = {
  name: string
  score: number
  description: string
  color: string
}

export type EmotionAnalysisResult = {
  primaryEmotion: Emotion
  secondaryEmotion: Emotion | null
  overallSentiment: number // -1 to 1 scale
  stressLevel: number // 0 to 100
  anxietyLevel: number // 0 to 100
  recommendations: Recommendation[]
}

export type Recommendation = {
  id: string
  title: string
  description: string
  type: "exercise" | "meditation" | "activity" | "resource"
  duration?: number
  link?: string
  priority: number // 1-10, higher means more important
}

// Emotion definitions with descriptions and associated colors
const emotions: Record<string, Omit<Emotion, "score">> = {
  joy: {
    name: "Joy",
    description: "Feelings of happiness, contentment, and satisfaction",
    color: "#22c55e", // green
  },
  sadness: {
    name: "Sadness",
    description: "Feelings of sorrow, grief, or unhappiness",
    color: "#3b82f6", // blue
  },
  anger: {
    name: "Anger",
    description: "Feelings of annoyance, hostility, or rage",
    color: "#ef4444", // red
  },
  fear: {
    name: "Fear",
    description: "Feelings of anxiety, worry, or dread",
    color: "#f97316", // orange
  },
  disgust: {
    name: "Disgust",
    description: "Feelings of aversion, distaste, or revulsion",
    color: "#84cc16", // lime
  },
  surprise: {
    name: "Surprise",
    description: "Feelings of astonishment, amazement, or shock",
    color: "#a855f7", // purple
  },
  neutral: {
    name: "Neutral",
    description: "Balanced emotional state without strong positive or negative feelings",
    color: "#94a3b8", // slate
  },
}

// Predefined recommendations based on emotional states
const recommendationsByEmotion: Record<string, Recommendation[]> = {
  joy: [
    {
      id: "joy-1",
      title: "Gratitude Journaling",
      description: "Write down three things you're grateful for to maintain your positive mood.",
      type: "exercise",
      duration: 5,
      priority: 7,
    },
    {
      id: "joy-2",
      title: "Share Your Positivity",
      description: "Reach out to someone who might need encouragement today.",
      type: "activity",
      priority: 6,
    },
    {
      id: "joy-3",
      title: "Mindful Joy Meditation",
      description: "A short meditation to fully appreciate and extend your positive feelings.",
      type: "meditation",
      duration: 10,
      link: "/resources/meditation",
      priority: 5,
    },
  ],
  sadness: [
    {
      id: "sadness-1",
      title: "Gentle Movement",
      description: "A short walk or gentle stretching to help shift your mood.",
      type: "activity",
      duration: 15,
      priority: 9,
    },
    {
      id: "sadness-2",
      title: "Self-Compassion Exercise",
      description: "Practice speaking to yourself with kindness and understanding.",
      type: "exercise",
      duration: 5,
      priority: 8,
    },
    {
      id: "sadness-3",
      title: "Depression Resources",
      description: "Learn about techniques to manage feelings of sadness.",
      type: "resource",
      link: "/resources/depression",
      priority: 7,
    },
  ],
  anger: [
    {
      id: "anger-1",
      title: "Deep Breathing",
      description: "A quick breathing exercise to calm your nervous system.",
      type: "exercise",
      duration: 3,
      priority: 10,
    },
    {
      id: "anger-2",
      title: "Physical Release",
      description: "Try a brief physical activity to release tension, like a brisk walk or jumping jacks.",
      type: "activity",
      duration: 10,
      priority: 8,
    },
    {
      id: "anger-3",
      title: "Reframing Thoughts",
      description: "Practice identifying and reframing angry thoughts.",
      type: "exercise",
      duration: 7,
      priority: 7,
    },
  ],
  fear: [
    {
      id: "fear-1",
      title: "Grounding Technique",
      description: "Use the 5-4-3-2-1 technique to ground yourself in the present moment.",
      type: "exercise",
      duration: 5,
      priority: 10,
    },
    {
      id: "fear-2",
      title: "Anxiety Resources",
      description: "Learn about techniques to manage anxiety and worry.",
      type: "resource",
      link: "/resources/anxiety",
      priority: 8,
    },
    {
      id: "fear-3",
      title: "Progressive Muscle Relaxation",
      description: "A guided exercise to release physical tension associated with anxiety.",
      type: "meditation",
      duration: 10,
      priority: 7,
    },
  ],
  neutral: [
    {
      id: "neutral-1",
      title: "Mindfulness Practice",
      description: "A short mindfulness exercise to increase awareness of the present moment.",
      type: "meditation",
      duration: 5,
      priority: 6,
    },
    {
      id: "neutral-2",
      title: "Goal Setting",
      description: "Take a few minutes to set an intention or goal for your day.",
      type: "exercise",
      duration: 5,
      priority: 5,
    },
    {
      id: "neutral-3",
      title: "Explore Resources",
      description: "Browse our wellness resources to find topics that interest you.",
      type: "resource",
      link: "/resources",
      priority: 4,
    },
  ],
}

// General recommendations that apply to most emotional states
const generalRecommendations: Recommendation[] = [
  {
    id: "general-1",
    title: "Breathing Exercise",
    description: "A simple breathing technique to center yourself.",
    type: "exercise",
    duration: 3,
    priority: 9,
  },
  {
    id: "general-2",
    title: "Hydration Check",
    description: "Take a moment to drink some water - staying hydrated helps your mental wellbeing.",
    type: "activity",
    duration: 1,
    priority: 8,
  },
  {
    id: "general-3",
    title: "Stretch Break",
    description: "A quick stretching routine to release physical tension.",
    type: "activity",
    duration: 5,
    priority: 7,
  },
]

/**
 * Analyze user messages to detect emotions and provide recommendations using Gemini
 */
export async function detectEmotions(messages: any[]): Promise<EmotionAnalysisResult> {
  // Get the last user message
  const lastUserMessage = messages.filter((m) => m.role === "user").pop()?.content || ""

  // Create conversation history for context
  const conversationHistory = messages.map((msg) => `${msg.role}: ${msg.content}`).join("\n")

  // Create prompt for Gemini
  const prompt = `
  Analyze the following conversation, focusing on the user's emotional state:
  
  ${conversationHistory}
  
  Based on this conversation, please:
  
  1. Identify the primary emotion the user is feeling (choose from: joy, sadness, anger, fear, disgust, surprise, neutral)
  2. Identify a secondary emotion if present (can be null)
  3. Rate the overall sentiment on a scale from -1 (very negative) to 1 (very positive)
  4. Estimate the user's stress level (0-100)
  5. Estimate the user's anxiety level (0-100)
  
  Format your response as JSON:
  {
    "primaryEmotion": {
      "name": "Emotion name",
      "score": number between 0-100
    },
    "secondaryEmotion": {
      "name": "Emotion name",
      "score": number between 0-100
    } or null,
    "overallSentiment": number between -1 and 1,
    "stressLevel": number between 0-100,
    "anxietyLevel": number between 0-100
  }
  `

  try {
    // Get response from Gemini
    const text = await generateWithGemini(prompt)

    // Parse the JSON response
    const result = JSON.parse(text)

    // Map the emotion names to our emotion objects with descriptions and colors
    const primaryEmotion = {
      ...emotions[result.primaryEmotion.name.toLowerCase()],
      score: result.primaryEmotion.score,
    }

    let secondaryEmotion = null
    if (result.secondaryEmotion) {
      secondaryEmotion = {
        ...emotions[result.secondaryEmotion.name.toLowerCase()],
        score: result.secondaryEmotion.score,
      }
    }

    // Get personalized recommendations
    const recommendations = getRecommendations(
      primaryEmotion,
      secondaryEmotion,
      result.stressLevel,
      result.anxietyLevel,
    )

    return {
      primaryEmotion,
      secondaryEmotion,
      overallSentiment: result.overallSentiment,
      stressLevel: result.stressLevel,
      anxietyLevel: result.anxietyLevel,
      recommendations,
    }
  } catch (error) {
    console.error("Error analyzing emotions with Gemini:", error)

    // Fallback response
    const fallbackEmotion = {
      ...emotions.neutral,
      score: 70,
    }

    return {
      primaryEmotion: fallbackEmotion,
      secondaryEmotion: null,
      overallSentiment: 0,
      stressLevel: 50,
      anxietyLevel: 50,
      recommendations: getRecommendations(fallbackEmotion, null, 50, 50),
    }
  }
}

/**
 * Get personalized recommendations based on emotional state
 */
function getRecommendations(
  primaryEmotion: Emotion,
  secondaryEmotion: Emotion | null,
  stressLevel: number,
  anxietyLevel: number,
): Recommendation[] {
  let recommendations: Recommendation[] = []

  // Add primary emotion recommendations
  const primaryEmotionKey = primaryEmotion.name.toLowerCase()
  if (recommendationsByEmotion[primaryEmotionKey]) {
    recommendations = recommendations.concat(recommendationsByEmotion[primaryEmotionKey])
  }

  // Add secondary emotion recommendations if they exist
  if (secondaryEmotion) {
    const secondaryEmotionKey = secondaryEmotion.name.toLowerCase()
    if (recommendationsByEmotion[secondaryEmotionKey]) {
      recommendations = recommendations.concat(recommendationsByEmotion[secondaryEmotionKey].slice(0, 1))
    }
  }

  // Add anxiety-specific recommendations if anxiety is high
  if (anxietyLevel > 60 && !recommendations.some((r) => r.id.includes("fear"))) {
    recommendations.push(recommendationsByEmotion.fear[0])
  }

  // Add some general recommendations
  recommendations = recommendations.concat(generalRecommendations.slice(0, 2))

  // Sort by priority and limit to 5
  return recommendations
    .sort((a, b) => b.priority - a.priority)
    .slice(0, 5)
    .map((rec) => ({
      ...rec,
      id: `${rec.id}-${Date.now()}`, // Ensure IDs are unique
    }))
}
