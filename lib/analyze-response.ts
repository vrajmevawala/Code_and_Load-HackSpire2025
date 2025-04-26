"use server"

import { generateWithGemini } from "./gemini-client"

type Message = {
  id?: string
  role: "system" | "user" | "assistant"
  content: string
  timestamp?: Date
}

type AnalysisResult = {
  response: string
  sentiment: {
    happiness: number
    anxiety: number
    energy: number
  }
  topics: string[]
  recommendations: string[]
  shouldComplete: boolean
}

export async function analyzeResponse(previousMessages: Message[], userInput: string): Promise<AnalysisResult> {
  // Create the conversation history for context
  const conversationHistory = [
    {
      role: "system",
      content: `You are an empathetic mental wellness assistant for MindMosaic. 
      Your goal is to have a supportive conversation with the user about their mental state.
      Ask follow-up questions based on their responses to better understand their emotional state.
      After 3-5 exchanges, provide a summary of what you've learned and suggest a next step.
      Analyze their responses for sentiment (happiness, anxiety, energy levels) on a scale of 0-100.
      Identify key topics they mention (work, relationships, health, etc.).
      Suggest personalized recommendations based on their emotional state.
      Be warm, supportive, and non-judgmental in your responses.`,
    },
    ...previousMessages,
    { role: "user", content: userInput },
  ]

  // Convert the conversation history to a string for the AI
  const conversationString = conversationHistory.map((msg) => `${msg.role}: ${msg.content}`).join("\n")

  // Generate the AI response using Gemini
  const prompt = `
  You are an AI mental wellness assistant. Analyze the conversation and provide a response in the exact JSON format below.
  Do not include any additional text, explanations, or backticks. Only return the JSON object.

  Conversation:
  ${conversationString}

  Required JSON format:
  {
    "response": "Your supportive response here",
    "sentiment": {
      "happiness": number,
      "anxiety": number,
      "energy": number
    },
    "topics": ["topic1", "topic2"],
    "recommendations": ["recommendation1", "recommendation2"],
    "shouldComplete": boolean
  }

  Guidelines:
  - Return only the JSON object, nothing else
  - Use numbers between 0-100 for sentiment scores
  - Include 2-3 topics and recommendations
  - Set shouldComplete to true after 3-5 meaningful exchanges
  `

  try {
    // Get response from Gemini
    const text = await generateWithGemini(prompt)

    // Clean the response by removing any backticks and extra whitespace
    const cleanedText = text
      .replace(/```json\n?/g, '') // Remove JSON code block markers
      .replace(/```\n?/g, '')     // Remove any remaining backticks
      .trim()                     // Remove extra whitespace

    // Parse the JSON response
    const result = JSON.parse(cleanedText) as AnalysisResult

    // Validate the result structure
    if (!result.response || !result.sentiment || !result.topics || !result.recommendations || typeof result.shouldComplete !== 'boolean') {
      throw new Error('Invalid response structure')
    }

    return result
  } catch (error) {
    console.error("Error parsing Gemini response:", error)
    // Fallback response if parsing fails
    return {
      response: "I'm here to listen. Could you tell me more about how you're feeling?",
      sentiment: {
        happiness: 50,
        anxiety: 50,
        energy: 50,
      },
      topics: ["general"],
      recommendations: ["Take a few deep breaths", "Consider a short walk outside"],
      shouldComplete: false,
    }
  }
}
