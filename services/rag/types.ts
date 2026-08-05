export interface RAGFile {
  id: string;
  name: string;
  url: string;
  type: SupportedFileType;
  size: number;
}

export interface ExtractedContent {
  content: string;
  metadata?: Record<string, unknown>;
}

export interface Chunk {
  id: string;
  content: string;
  index: number;
  metadata?: Record<string, unknown>;
}

export interface SearchResult {
  id: string;
  content: string;
  score: number;
  metadata?: Record<string, unknown>;
}

export interface IngestContent {
  fileId: string;
  userId: string;

  fileName: string;
  fileType: string;

  content: string;
}

export type SupportedFileType =
  | "pdf"
  | "docx"
  | "txt"
  | "image";
// | "pptx"
// | "csv"
// | "xlsx"
// | "audio"
// | "video";