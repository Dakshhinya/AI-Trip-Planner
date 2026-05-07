import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI("YOUR_API_KEY");

async function checkModels() {
  const res = await genAI.listModels();
  res.models.forEach((m) => {
    console.log(m.name, m.supportedGenerationMethods);
  });
}

checkModels();