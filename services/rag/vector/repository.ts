import { SearchVectorResult, VectorDocument } from "./types";

export interface VectorRepository{
    upsert(
        documents: VectorDocument[],
    ): Promise<void>;

    search(
        embedding: number[],
        limit?: number,
    ): Promise<SearchVectorResult[]>;

    delete(
        ids: string[],
    ): Promise<void>
}