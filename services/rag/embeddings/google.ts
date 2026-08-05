import { google } from "@ai-sdk/google";
import { embed } from "ai";

import type { EmbeddingResult } from "./types";

export async function generateEmbedding(
  text: string,
): Promise<EmbeddingResult> {
  const { embedding } = await embed({
    model: google.embeddingModel(
      "gemini-embedding-001",
    ),
    value: text,
  });

  return {
    embedding,
  };
}