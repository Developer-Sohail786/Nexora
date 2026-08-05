import { RecursiveCharacterTextSplitter } from "@langchain/textsplitters";

import { CHUNK_OVERLAP, CHUNK_SIZE } from "../constants";
import type { Chunk } from "../types";

const splitter = new RecursiveCharacterTextSplitter({
  chunkSize: CHUNK_SIZE,
  chunkOverlap: CHUNK_OVERLAP,
});

export async function chunkText(text: string): Promise<Chunk[]> {
  const documents = await splitter.createDocuments([text]);

  return documents.map((doc, index) => ({
    id: crypto.randomUUID(),
    index,
    content: doc.pageContent,
  }));
}
