import { google } from "@ai-sdk/google";
import { generateText, streamText } from "ai";

import { AI_MODELS } from "../types";
import type {
  AIResponse,
  GenerateResponseParams,
} from "../types";

// Normal response
export async function generateGeminiResponse(
  params: GenerateResponseParams
): Promise<AIResponse> {
  const { text } = await generateText({
    model: google(AI_MODELS.GOOGLE.GEMINI_FLASH),
    messages: params.messages.map((message) => ({
      role: message.role === "ai" ? "assistant" : "user",
      content: message.content,
    })),
  });

  return {
    text,
    model: AI_MODELS.GOOGLE.GEMINI_FLASH,
  };
}

// Streaming response
export function streamGeminiResponse(
  params: GenerateResponseParams
) {
  return streamText({
    model: google(AI_MODELS.GOOGLE.GEMINI_FLASH),
    messages: params.messages.map((message) => ({
      role: message.role === "ai" ? "assistant" : "user",
      content: message.content,
    })),
  });
}