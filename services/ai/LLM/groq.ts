import { groq } from "@ai-sdk/groq";
import {
  generateText,
  streamText,
  type ModelMessage,
} from "ai";

import type {
  AIResponse,
  GenerateResponseParams,
} from "../types";

function getGroqMessages(
  messages: GenerateResponseParams["messages"]
): ModelMessage[] {
  return messages
    .filter(
      (message) =>
        typeof message.content === "string" &&
        message.content.trim().length > 0
    )
    .map(
      (message): ModelMessage => ({
        role: message.role === "ai" ? "assistant" : "user",
        content: message.content,
      })
    );
}

function isQwenModel(model: string) {
  return model === "qwen/qwen3.6-27b";
}

// Normal response
export async function generateGroqResponse(
  params: GenerateResponseParams
): Promise<AIResponse> {
  const messages = getGroqMessages(params.messages);

  if (!messages.length) {
    throw new Error("No valid messages found for Groq.");
  }

  const { text } = await generateText({
    model: groq(params.model),
    messages,
    ...(isQwenModel(params.model)
      ? {
          maxOutputTokens: 1000,
          providerOptions: {
            groq: {
              reasoningEffort: "none",
            },
          },
        }
      : {}),
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
  const messages = getGroqMessages(params.messages);

  if (!messages.length) {
    throw new Error("No valid messages found for Groq.");
  }

  return streamText({
    model: groq(params.model),
    messages,
    ...(isQwenModel(params.model)
      ? {
          maxOutputTokens: 1000,
          providerOptions: {
            groq: {
              reasoningEffort: "none",
            },
          },
        }
      : {}),
  });
}