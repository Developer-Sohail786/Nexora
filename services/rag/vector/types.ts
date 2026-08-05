import type { Metadata } from "chromadb";

export interface VectorDocument{
    id: string;
    content: string;
    embedding: number[];
    metadata: Metadata;
}

export interface SearchVectorResult{
    id: string;
    score: number;
    content: string;
    metadata: Metadata;
}