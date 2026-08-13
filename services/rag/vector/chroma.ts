import {
  ChromaClient,
  type Metadata,
} from "chromadb";

import { VectorRepository } from "./repository";
import { SearchVectorResult, VectorDocument } from "./types";

const client = new ChromaClient({
  path: process.env.CHROMA_URL!,
});

const COLLECTION_NAME = "nexora";

export class ChromaVectorRepository implements VectorRepository {
  private async collection() {
    return client.getOrCreateCollection({
      name: COLLECTION_NAME,
      embeddingFunction: null,
    });
  }
  async upsert(documents: VectorDocument[]): Promise<void> {
    if (!documents.length) {
      return;
    }

    const collection = await this.collection();

    await collection.add({
      ids: documents.map((doc) => doc.id),

      documents: documents.map((doc) => doc.content),

      embeddings: documents.map((doc) => doc.embedding),

      metadatas: documents.map((doc) => doc.metadata),
    });
  }
 async delete(
  ids: string[],
  userId: string,
): Promise<void> {
  if (!ids.length) {
    return;
  }

  const collection =
    await this.collection();

  await collection.delete({
    ids,
    where: {
      userId,
    },
  });
}
  async search(
  embedding: number[],
  limit = 5,
  filter?: Record<string, string>,
): Promise<SearchVectorResult[]> {
   
    const collection = await this.collection();

    const result = await collection.query({
  queryEmbeddings: [embedding],
  nResults: limit,
  ...(filter && {
    where: filter,
  }),
});

    const ids = result.ids?.[0] ?? [];

    const documents = result.documents?.[0] ?? [];

    const metadatas = result.metadatas?.[0] ?? [];

    const distances = result.distances?.[0] ?? [];

    return ids.map((id, index) => ({
      id,
      content: documents[index] ?? "",

  metadata:
  (metadatas[index] as Metadata) ?? {},

      score: distances[index] ?? 0,
    }));
  }
}
