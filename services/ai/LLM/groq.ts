import { groq } from "@ai-sdk/groq";
import { generateText, streamText } from "ai";


import type {
  AIResponse,
  GenerateResponseParams,
} from "../types";

// Normal response
export async function generateGroqResponse(
  params: GenerateResponseParams
): Promise<AIResponse> {
  const { text } = await generateText({
    model: groq(params.model),
    messages: params.messages.map((message) => ({
      role: message.role === "ai" ? "assistant" : "user",
      content: message.content,
    })),
  });

  return {
    text,
    model: params.model,
  };
}

// Streaming response
export function streamGroqResponse(
  params: GenerateResponseParams
) {
  return streamText({
    model: groq(params.model),
    messages: params.messages.map((message) => ({
      role: message.role === "ai" ? "assistant" : "user",
      content: message.content,
    })),
  });
}