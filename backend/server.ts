import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { GoogleGenerativeAI, HarmCategory, HarmBlockThreshold } from '@google/generative-ai';

dotenv.config();

const app = express();
const port = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(express.json());

// Initialize Gemini API
const apiKey = process.env.GEMINI_API_KEY || "";
const genAI = new GoogleGenerativeAI(apiKey);

// Configure safety settings
const safetySettings = [
  {
    category: HarmCategory.HARM_CATEGORY_HARASSMENT,
    threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
  },
  {
    category: HarmCategory.HARM_CATEGORY_HATE_SPEECH,
    threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
  },
  {
    category: HarmCategory.HARM_CATEGORY_SEXUALLY_EXPLICIT,
    threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
  },
  {
    category: HarmCategory.HARM_CATEGORY_DANGEROUS_CONTENT,
    threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
  },
];

// Get the Gemini Pro model
function getGeminiModel() {
  return genAI.getGenerativeModel({
    model: "gemini-pro",
    safetySettings,
  });
}

// Generate content with Gemini
async function generateWithGemini(prompt: string): Promise<string> {
  try {
    if (!apiKey) {
      throw new Error("GEMINI_API_KEY is not set in environment variables");
    }

    const model = getGeminiModel();
    const result = await model.generateContent(prompt);
    const response = result.response;
    return response.text();
  } catch (error) {
    console.error("Error generating content with Gemini:", error);
    throw error;
  }
}

// Routes
app.post('/api/analyze', async (req, res) => {
  try {
    const { messages, userInput } = req.body;

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
      ...messages,
      { role: "user", content: userInput },
    ];

    // Convert the conversation history to a string for the AI
    const conversationString = conversationHistory.map((msg) => `${msg.role}: ${msg.content}`).join("\n");

    // Generate the AI response using Gemini
    const prompt = `
    Based on this conversation:
    
    ${conversationString}
    
    1. Provide a thoughtful, empathetic response to the user's last message.
    2. Analyze the sentiment in their message (happiness: 0-100, anxiety: 0-100, energy: 0-100).
    3. Identify key topics they've mentioned (e.g., work, relationships, health).
    4. Suggest 2-3 personalized recommendations based on their emotional state.
    5. Determine if we should complete the check-in (true/false). Complete after 3-5 meaningful exchanges.
    
    Format your response as JSON:
    {
      "response": "Your response to the user",
      "sentiment": {
        "happiness": number,
        "anxiety": number,
        "energy": number
      },
      "topics": ["topic1", "topic2"],
      "recommendations": ["recommendation1", "recommendation2"],
      "shouldComplete": boolean
    }
    `;

    const text = await generateWithGemini(prompt);
    const result = JSON.parse(text);
    res.json(result);
  } catch (error) {
    console.error("Error analyzing response:", error);
    res.status(500).json({
      error: "Failed to analyze response",
      details: error instanceof Error ? error.message : "Unknown error",
    });
  }
});

app.post('/api/detect-emotions', async (req, res) => {
  try {
    const { messages } = req.body;

    // Get the last user message
    const lastUserMessage = messages.filter((m: any) => m.role === "user").pop()?.content || "";

    // Create conversation history for context
    const conversationHistory = messages.map((msg: any) => `${msg.role}: ${msg.content}`).join("\n");

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
    `;

    const text = await generateWithGemini(prompt);
    const result = JSON.parse(text);
    res.json(result);
  } catch (error) {
    console.error("Error detecting emotions:", error);
    res.status(500).json({
      error: "Failed to detect emotions",
      details: error instanceof Error ? error.message : "Unknown error",
    });
  }
});

// Start server
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
}); 