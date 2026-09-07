import { cohere } from "@ai-sdk/cohere";
import { generateText, streamText, type ModelMessage } from "ai";

import { AI_MODELS } from "../types";
import type {
  AIResponse,
  GenerateResponseParams,
} from "../types";

function getCohereMessages(
  messages: GenerateResponseParams["messages"]
): ModelMessage[] {
  return messages
    .filter(
      (message) =>
        typeof message.content === "string" &&
        message.content.trim().length > 0
    )
    .map((message) => ({
      role: message.role === "ai" ? "assistant" : "user",
      content: message.content,
    }));
}

// Normal response
export async function generateCohereResponse(
  params: GenerateResponseParams
): Promise<AIResponse> {
  const messages = getCohereMessages(params.messages);

  if (!messages.length) {
    throw new Error("No valid messages found for Cohere.");
  }

  const { text } = await generateText({
    model: cohere(AI_MODELS.COHERE.COMMAND_A),
    messages,
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
  const messages = getCohereMessages(params.messages);

  if (!messages.length) {
    throw new Error("No valid messages found for Cohere.");
  }

  return streamText({
    model: cohere(AI_MODELS.COHERE.COMMAND_A),
    messages,
  });
}