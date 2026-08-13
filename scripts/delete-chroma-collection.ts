import "dotenv/config";
import { ChromaClient } from "chromadb";

const client = new ChromaClient({
  path: process.env.CHROMA_URL!,
});

async function main() {
  await client.deleteCollection({
    name: "nexora",
  });

  console.log("nexora collection deleted.");
}

main().catch(console.error);