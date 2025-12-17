import { GoogleGenAI } from "@google/genai";

// Safe accessor for API key
const getApiKey = () => {
  try {
    // @ts-ignore
    return import.meta.env?.VITE_API_KEY || '';
  } catch {
    return '';
  }
};

const apiKey = getApiKey();
// Initialize with dummy key if missing to prevent constructor error, guard usage later
const ai = new GoogleGenAI({ apiKey: apiKey || 'dummy_key' });

export const getChatResponse = async (
  message: string,
  history: { role: string; parts: { text: string }[] }[]
): Promise<string> => {
  if (!apiKey || apiKey === 'dummy_key') {
    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    return "I'm running in demo mode without an API key. I can pretend to help you organize your schedule! (Add VITE_API_KEY to .env to enable AI)";
  }

  try {
    const chat = ai.chats.create({
      model: 'gemini-2.5-flash',
      config: {
        systemInstruction: "You are CampusSync AI, a helpful academic assistant for Indian university students. You help with scheduling, summarizing announcements, and finding study materials. Keep answers concise and friendly.",
      },
      history: history,
    });

    const result = await chat.sendMessage({ message });
    return result.text || "I couldn't generate a response.";
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "Sorry, I'm having trouble connecting to the campus network right now.";
  }
};