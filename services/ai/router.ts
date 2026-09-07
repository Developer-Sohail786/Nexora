import { isImagePrompt } from "@/lib/utils/is-image-prompt";
import { isSearchPrompt } from "@/lib/utils/is-search-prompt";

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
  messages,
}: RouterParams): Promise<AIResponse> {
  const lastMessage = messages.at(-1);

  if (!lastMessage) {
    throw new Error("No messages found.");
  }

  const prompt = lastMessage.content;

  // IMAGE
  if (
    forceImage ||
    isImagePrompt(prompt)
  ) {
    const image =
      await generateImage({
        prompt,
      });

    return {
      type: "image",
      imageUrl: image.imageUrl,
      provider: image.provider,
    };
  }

  const [
    searchedMessages,
    chunks,
  ] = await Promise.all([
    isSearchPrompt(prompt)
      ? webSearch(messages)
      : Promise.resolve(messages),

    retrieve({
      query: prompt,
      userId,
    }),
  ]);

  const finalMessages =
    buildPrompt({
      messages: searchedMessages,
      context: chunks.map(
        (chunk) => chunk.content,
      ),
    });

  const result =
    await streamResponse({
      model,
      messages: finalMessages,
    });

  return {
    type: "text",
    textStream:
      result.textStream,
  };
}