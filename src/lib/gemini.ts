import { GoogleGenAI } from "@google/genai";

// Safe accessor for API key
const getApiKey = () => {
  try {
    // @ts-ignore
    return (
      import.meta.env?.VITE_API_KEY ||
      import.meta.env?.VITE_GEMINI_API_KEY ||
      ""
    );
  } catch {
    return "";
  }
};

const apiKey = getApiKey();
let ai: GoogleGenAI | null = null;

// Initialize only if API key exists and is valid
if (apiKey && apiKey.length > 10 && apiKey !== "dummy_key") {
  try {
    ai = new GoogleGenAI({ apiKey });
    console.log("Gemini AI initialized successfully");
  } catch (error) {
    console.error("Failed to initialize Gemini AI:", error);
  }
} else {
  console.log("Gemini API key not found. Running in mock mode.");
}

// Mock responses for demo mode
const getMockResponse = (message: string): string => {
  const lowerMessage = message.toLowerCase();

  if (lowerMessage.includes("schedule") || lowerMessage.includes("timetable")) {
    return "📅 I can help you organize your schedule! Here are your upcoming classes:\n\n📚 CS301 - Data Structures (Mon, Wed, Fri at 9:00 AM)\n📊 MATH201 - Calculus II (Tue, Thu at 11:00 AM)\n💻 CS101 - Programming (Mon, Wed at 2:00 PM)\n\nWould you like me to add any assignments or reminders?";
  }

  if (
    lowerMessage.includes("assignment") ||
    lowerMessage.includes("deadline") ||
    lowerMessage.includes("homework")
  ) {
    return "📝 You have 2 pending assignments:\n\n✏️ Data Structures Project - Due in 7 days\n📐 Calculus Problem Set - Due in 3 days\n\nNeed help prioritizing your work or breaking them down into smaller tasks?";
  }

  if (
    lowerMessage.includes("study") ||
    lowerMessage.includes("material") ||
    lowerMessage.includes("notes")
  ) {
    return "📖 I can help you find study materials! For which subject are you looking for resources?\n\nAvailable subjects:\n• Computer Science 💻\n• Mathematics 📐\n• Physics ⚛️\n• Engineering ⚙️\n\nJust let me know which one!";
  }

  if (
    lowerMessage.includes("exam") ||
    lowerMessage.includes("test") ||
    lowerMessage.includes("preparation")
  ) {
    return "📚 Preparing for exams? Here's a quick study strategy:\n\n1. ✅ Start reviewing 2 weeks before\n2. 📅 Create a realistic study schedule\n3. 📝 Practice with past papers\n4. 👥 Join or form study groups\n5. ⏰ Take regular 10-minute breaks\n\nWhich subject's exam are you preparing for?";
  }

  if (
    lowerMessage.includes("hello") ||
    lowerMessage.includes("hi") ||
    lowerMessage.includes("hey")
  ) {
    return "👋 Hello! I'm CampusSync AI, your academic assistant.\n\nI can help you with:\n• 📅 Managing your schedule\n• 📝 Tracking assignments & deadlines\n• 📚 Finding study materials\n• 🎯 Exam preparation tips\n• 📢 Summarizing announcements\n\nHow can I assist you today?";
  }

  if (
    lowerMessage.includes("help") ||
    lowerMessage.includes("what can you do")
  ) {
    return "🤖 I'm CampusSync AI! Here's what I can do:\n\n✨ Schedule Management - Keep track of your classes\n📝 Assignment Tracking - Never miss a deadline\n📚 Study Resources - Find materials for your courses\n🎓 Exam Prep - Get study tips and plans\n📢 Announcements - Summarize important notices\n\nJust ask me anything related to your academics!";
  }

  return "I'm running in demo mode without an API key. I can help you with schedules, assignments, and study materials! 🎓\n\n💡 Tip: Add VITE_API_KEY to your .env.local file to enable real AI-powered responses.";
};

export const getChatResponse = async (
  message: string,
  history: { role: string; parts: { text: string }[] }[] = []
): Promise<string> => {
  // Mock mode
  if (!ai) {
    await new Promise((resolve) => setTimeout(resolve, 800)); // Simulate API delay
    return getMockResponse(message);
  }

  try {
    const chat = ai.chats.create({
      model: "gemini-2.0-flash-exp",
      config: {
        systemInstruction: `You are CampusSync AI, a helpful and friendly academic assistant for Indian university students. 

Your main responsibilities:
- Help students manage their class schedules and timetables
- Track assignments, deadlines, and project submissions
- Provide study tips and exam preparation strategies
- Summarize academic announcements and notices
- Suggest study materials and resources
- Offer course recommendations and academic guidance

Personality traits:
- Be concise but informative (keep responses under 150 words when possible)
- Use emojis sparingly to make responses engaging
- Be encouraging and supportive
- Understand Indian education system context (semesters, university structure)
- Be respectful and professional

Response style:
- Start with a brief acknowledgment
- Provide actionable advice
- Ask follow-up questions when appropriate
- Use bullet points for lists
- Keep language simple and clear`,
      },
      history: history,
    });

    const result = await chat.sendMessage({ message });
    const responseText =
      result.text || "I couldn't generate a response. Please try again.";

    console.log("Gemini AI response received successfully");
    return responseText;
  } catch (error: any) {
    console.error("Gemini API Error:", error);

    // Provide specific error messages
    if (error?.message?.includes("API_KEY_INVALID") || error?.status === 400) {
      return "⚠️ Your API key seems to be invalid. Please check your VITE_API_KEY in .env.local and make sure it's a valid Gemini API key.";
    }

    if (error?.message?.includes("quota") || error?.status === 429) {
      return "⚠️ API quota exceeded. Please check your Gemini API usage limits or try again later.";
    }

    if (
      error?.message?.includes("SAFETY") ||
      error?.message?.includes("blocked")
    ) {
      return "⚠️ I couldn't process that request due to safety filters. Please rephrase your question in a different way.";
    }

    if (error?.status === 503 || error?.message?.includes("unavailable")) {
      return "⚠️ The AI service is temporarily unavailable. Please try again in a few moments.";
    }

    return "❌ Sorry, I'm having trouble connecting to the campus network right now. Please try again in a moment.";
  }
};

// Helper function to check if AI is available
export const isAIAvailable = (): boolean => {
  return ai !== null;
};

// Helper function to generate a study plan
export const generateStudyPlan = async (
  subjects: string[],
  examDate: Date,
  currentLevel: string = "undergraduate"
): Promise<string> => {
  const daysUntilExam = Math.ceil(
    (examDate.getTime() - Date.now()) / (1000 * 60 * 60 * 24)
  );

  const prompt = `Create a detailed ${daysUntilExam}-day study plan for a ${currentLevel} student preparing for exams in these subjects: ${subjects.join(
    ", "
  )}.

The exam is on ${examDate.toLocaleDateString("en-IN", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  })}.

Please include:
- Daily study hours for each subject
- Specific topics to cover each day
- Break times and rest days
- Revision schedule for the last 3 days
- Practice test recommendations

Make it realistic and balanced for an Indian university student.`;

  return getChatResponse(prompt, []);
};

// Helper function to summarize announcements
export const summarizeAnnouncement = async (
  announcement: string
): Promise<string> => {
  const prompt = `Summarize this university announcement in 2-3 bullet points, highlighting the most important information:\n\n${announcement}`;
  return getChatResponse(prompt, []);
};

export default {
  getChatResponse,
  isAIAvailable,
  generateStudyPlan,
  summarizeAnnouncement,
};
// ```

// **Key improvements:**

// 1. ✅ **Better initialization** - Only creates AI instance if valid API key exists
// 2. ✅ **Enhanced mock responses** - Context-aware, emoji-rich demo responses
// 3. ✅ **Improved error handling** - Specific messages for different error types
// 4. ✅ **Multiple API key support** - Checks both `VITE_API_KEY` and `VITE_GEMINI_API_KEY`
// 5. ✅ **Helper functions**:
//    - `isAIAvailable()` - Check if real AI is active
//    - `generateStudyPlan()` - Generate personalized study plans
//    - `summarizeAnnouncement()` - Summarize long announcements
// 6. ✅ **Better system instructions** - More detailed personality and context
// 7. ✅ **Indian education context** - Understands Indian university system

// **Your `.env.local` should have:**
// ```
// VITE_API_KEY=your-gemini-api-key-here
