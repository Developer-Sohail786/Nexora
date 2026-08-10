import { generateEmbedding } from "../embeddings";
import {
  SearchVectorResult,
  vectorRepository,
} from "../vector";

interface RetrieveParams {
  query: string;
  userId: string;
  chatId: string;
  topK?: number;
}

export async function retrieve({
  query,
  userId,
  chatId,
  topK = 5,
}: RetrieveParams): Promise<SearchVectorResult[]> {
  try {
    const { embedding } =
      await generateEmbedding(query);

    const results =
      await vectorRepository.search(
        embedding,
        topK,
      );

    return results.filter(
      (result) =>
        result.metadata.userId ===
        userId,
    );
  } catch (error) {
    console.warn(
      "RAG retrieval unavailable:",
      error,
    );

    return [];
  }
}