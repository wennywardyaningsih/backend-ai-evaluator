import OpenAI from "openai";
import dotenv from "dotenv";
dotenv.config();
const apiKey = process.env.OPENAI_API_KEY || process.env.LLM_API_KEY || "";

export const client = new OpenAI({ apiKey });

export async function callLLM(prompt: string, temperature = 0.2){
  // Using chat completions
  const resp = await client.chat.completions.create({
    model: "gpt-4o-mini",
    messages: [{ role: "user", content: prompt }],
    temperature
  });
  const text = resp.choices?.[0]?.message?.content;
  return text || "";
}
