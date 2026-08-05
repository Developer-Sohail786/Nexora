import { cohere } from "@ai-sdk/cohere";
import { generateText } from "ai";

import { AI_MODELS } from "../ai/types";

export async function generateChatTitle(
  message: string
): Promise<string> {
  const { text } = await generateText({
    model: cohere(AI_MODELS.COHERE.COMMAND_A),
    system:
      "Generate a short, meaningful chat title (2-5 words). Return only the title. No quotes. No punctuation.",
    prompt: message,
  });

  return text.trim();
}