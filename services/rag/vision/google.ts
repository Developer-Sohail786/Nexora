import { google } from "@ai-sdk/google";
import { generateText } from "ai";

import { AI_MODELS } from "@/services/ai/types";

export async function generateImageDescription(
  image: Uint8Array,
): Promise<string> {
  const { text } = await generateText({
    model: google(AI_MODELS.GOOGLE.GEMINI_FLASH),

    messages: [
      {
        role: "user",
        content: [
          {
            type: "text",
            text: `
You are generating knowledge for a Retrieval-Augmented Generation (RAG) system.

Describe this image in detail.

Include:
- All visible text
- UI elements
- Buttons
- Charts
- Tables
- Diagrams
- Code
- Error messages
- Objects
- Colors (if important)
- Relationships between objects

Do not summarize.
Do not omit details.
Produce factual, searchable text.
            `,
          },
          {
            type: "image",
            image,
          },
        ],
      },
    ],
  });

  return text;
}