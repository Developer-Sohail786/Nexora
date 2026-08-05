import { deepseek } from "@ai-sdk/deepseek";
import { generateText, streamText } from "ai";

import { AI_MODELS } from "../types";
import type {
  AIResponse,
  GenerateResponseParams,
} from "../types";

// Normal response
export async function generateDeepSeekResponse(
  params: GenerateResponseParams
): Promise<AIResponse> {
  const { text } = await generateText({
    model: deepseek(AI_MODELS.DEEPSEEK.CHAT),
    messages: params.messages.map((message) => ({
      role: message.role === "ai" ? "assistant" : "user",
      content: message.content,
    })),
  });

  return {
    text,
    model: AI_MODELS.DEEPSEEK.CHAT,
  };
}

// Streaming response
export function streamDeepSeekResponse(
  params: GenerateResponseParams
) {
  return streamText({
    model: deepseek(AI_MODELS.DEEPSEEK.CHAT),
    messages: params.messages.map((message) => ({
      role: message.role === "ai" ? "assistant" : "user",
      content: message.content,
    })),
  });
}