import { chunkText } from "../chunking";
import { generateEmbedding } from "../embeddings";
import type { IngestContent } from "../types";
import { vectorRepository } from "../vector/client";

export async function ingestFile(
  data: IngestContent,
) {
  const chunks = await chunkText(data.content);

  const embeddings = await Promise.all(
    chunks.map(async (chunk) => ({
      ...chunk,

      embedding: (
        await generateEmbedding(chunk.content)
      ).embedding,

      metadata: {
        fileId: data.fileId,
        userId: data.userId,

        fileName: data.fileName,
        fileType: data.fileType,

        chunkIndex: chunk.index,
      },
    })),
  );

  try {
    if (process.env.CHROMA_URL) {
      await vectorRepository.upsert(embeddings);
    }
  } catch (error) {
    console.warn("Vector storage skipped:", error);
  }

  return embeddings;
}