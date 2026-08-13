import {
  SearchVectorResult,
  VectorDocument,
} from "./types";

export interface VectorRepository {
  upsert(
    documents: VectorDocument[],
  ): Promise<void>;

 search(
  embedding: number[],
  limit?: number,
  filter?: Record<string, string>,
): Promise<SearchVectorResult[]>;

  delete(
    ids: string[],
    userId: string,
  ): Promise<void>;
}