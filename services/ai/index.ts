import {
  streamGeminiResponse,
  streamGroqResponse,
  streamDeepSeekResponse,
  streamCohereResponse,
} from "./LLM";

import { AI_MODELS, AIModel } from "./types";

interface StreamResponseParams {
  model: AIModel;
  messages: {
    role: "user" | "ai";
    content: string;
  }[];
}

export async function streamResponse({
  model,
  messages,
}: StreamResponseParams) {
  switch (model) {
    case AI_MODELS.GOOGLE.GEMINI_FLASH:
      return streamGeminiResponse({
        model,
        messages,
      });

    case AI_MODELS.GROQ.LLAMA:
    case AI_MODELS.GROQ.GPT_OSS_120B:
      return streamGroqResponse({
        model,
        messages,
      });

    case AI_MODELS.DEEPSEEK.CHAT:
      return streamDeepSeekResponse({
        model,
        messages,
      });

    case AI_MODELS.COHERE.COMMAND_A:
      return streamCohereResponse({
        model,
        messages,
      });

    default:
      throw new Error("Unsupported AI model.");
  }
}