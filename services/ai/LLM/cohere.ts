import { cohere } from "@ai-sdk/cohere";
import { generateText, streamText } from "ai";

import { AI_MODELS } from "../types";
import type {
  AIResponse,
  GenerateResponseParams,
} from "../types";

// Normal response
export async function generateCohereResponse(
  params: GenerateResponseParams
): Promise<AIResponse> {
  const { text } = await generateText({
    model: cohere(AI_MODELS.COHERE.COMMAND_A),
    messages: params.messages.map((message) => ({
      role: message.role === "ai" ? "assistant" : "user",
      content: message.content,
    })),
  });

  return {
    text,
    model: AI_MODELS.COHERE.COMMAND_A,
  };
}

// Streaming response
export function streamCohereResponse(
  params: GenerateResponseParams
) {
  return streamText({
    model: cohere(AI_MODELS.COHERE.COMMAND_A),
    messages: params.messages.map((message) => ({
      role: message.role === "ai" ? "assistant" : "user",
      content: message.content,
    })),
  });
}