import { isSearchPrompt } from "@/lib/utils/is-search-prompt";
import { isImagePrompt } from "@/lib/utils/is-image-prompt";

import { streamResponse } from ".";
import { AIModel } from "./types";

import { generateImage } from "./image/image.service";
import { webSearch } from "./search/web-search";

import { retrieve } from "../rag/pipeline";
import { buildPrompt } from "./prompt/prompt-builder";

export type AIResponse =
  | {
      type: "text";
      textStream: AsyncIterable<string>;
      sources?: {
        title: string;
        url: string;
      }[];
    }
  | {
      type: "image";
      imageUrl: string;
      provider: string;
    };

interface RouterParams {
  model: AIModel;
  forceImage?: boolean;
  userId: string;
  chatId: string;
  messages: {
    role: "user" | "ai";
    content: string;
  }[];
}

export async function routerAIRequest({
  model,
  forceImage = false,
  userId,
  chatId,
  messages,
}: RouterParams): Promise<AIResponse> {
  const lastMessage = messages.at(-1);

  if (!lastMessage) {
    throw new Error("No messages found.");
  }

  // IMAGE
  if (
    forceImage ||
    isImagePrompt(lastMessage.content)
  ) {
    const image = await generateImage({
      prompt: lastMessage.content,
    });

    return {
      type: "image",
      imageUrl: image.imageUrl,
      provider: image.provider,
    };
  }

  // SEARCH
  const searchedMessages =
    isSearchPrompt(lastMessage.content)
      ? await webSearch(messages)
      : messages;

  // RAG
  const chunks = await retrieve({
    query: lastMessage.content,
    userId,
    chatId,
  });

  // Prompt Builder
  const finalMessages = buildPrompt({
    messages: searchedMessages,
    context: chunks.map(
      (chunk) => chunk.content,
    ),
  });

  // LLM
  const result = await streamResponse({
    model,
    messages: finalMessages,
  });

  return {
    type: "text",
    textStream: result.textStream,
  };
}