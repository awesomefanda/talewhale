import OpenAI from "openai";

const LLM_PROVIDER = process.env.LLM_PROVIDER || "groq";
const LLM_API_KEY = process.env.LLM_API_KEY;
const LLM_MODEL = process.env.LLM_MODEL;
const LLM_BASE_URL = process.env.LLM_BASE_URL;

const PROVIDER_CONFIGS = {
  groq: {
    baseURL: "https://api.groq.com/openai/v1",
    defaultModel: "llama-3.3-70b-versatile",
  },
  together: {
    baseURL: "https://api.together.xyz/v1",
    defaultModel: "meta-llama/Llama-3.3-70B-Instruct-Turbo",
  },
  openrouter: {
    baseURL: "https://openrouter.ai/api/v1",
    defaultModel: "meta-llama/llama-3.3-70b-instruct:free",
  },
  openai: {
    baseURL: "https://api.openai.com/v1",
    defaultModel: "gpt-4o-mini",
  },
  ollama: {
    baseURL: LLM_BASE_URL || "http://localhost:11434/v1",
    defaultModel: "llama3.2",
  },
  anthropic: {
    baseURL: "https://api.anthropic.com/v1", // Will need adapter
    defaultModel: "claude-3-5-sonnet-20240620",
  },
};

export async function generateComicChapter(systemPrompt, userPrompt) {
  const config = PROVIDER_CONFIGS[LLM_PROVIDER];
  
  if (!config) {
    throw new Error(`Unsupported LLM provider: ${LLM_PROVIDER}`);
  }

  const client = new OpenAI({
    apiKey: LLM_API_KEY,
    baseURL: config.baseURL,
  });

  const response = await client.chat.completions.create({
    model: LLM_MODEL || config.defaultModel,
    messages: [
      { role: "system", content: systemPrompt },
      { role: "user", content: userPrompt },
    ],
    response_format: { type: "json_object" },
  });

  return JSON.parse(response.choices[0].message.content);
}
