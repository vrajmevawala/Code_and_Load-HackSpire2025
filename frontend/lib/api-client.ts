const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001';

export async function analyzeResponse(messages: any[], userInput: string) {
  const response = await fetch(`${API_BASE_URL}/api/analyze`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ messages, userInput }),
  });

  if (!response.ok) {
    throw new Error('Failed to analyze response');
  }

  return response.json();
}

export async function detectEmotions(messages: any[]) {
  const response = await fetch(`${API_BASE_URL}/api/detect-emotions`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ messages }),
  });

  if (!response.ok) {
    throw new Error('Failed to detect emotions');
  }

  return response.json();
} 