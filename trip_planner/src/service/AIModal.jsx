import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(
  import.meta.env.VITE_GOOGLE_GEMINI_AI_API_KEY
);

const model = genAI.getGenerativeModel({
  model: "models/gemini-2.5-flash-lite"
});

const generationConfig = {
  temperature: 0.7,
  topP: 0.9,
  maxOutputTokens: 4096,
  responseMimeType: "application/json",
};

export async function generateTrip(prompt) {
  try {
    const result = await model.generateContent({
      contents: [
        {
          role: "user",
          parts: [{ text: prompt }],
        },
      ],
      generationConfig,
    });

    return result.response.text();

  } catch (error) {
    console.log("Gemini failed:", error.message);

    // 🔁 Retry once
    await new Promise(res => setTimeout(res, 2000));

    const retry = await model.generateContent(prompt);
    return retry.response.text();
  }
}