import { PromptBuilderParams } from "./types";

export function buildPrompt({
  messages,
  context = [],
  systemPrompt,
}: PromptBuilderParams) {
  const finalMessages = [...messages];

  const lastMessage = finalMessages.at(-1);

  if (!lastMessage) {
    throw new Error("No messages found.");
  }

  let prompt = "";

  // Global System Prompt
  prompt += `You are Nexus AI.

Be minimal with your words.
Keep responses concise, direct, and well-structured.
Avoid unnecessary explanations unless the user explicitly asks for more detail.

`;

  // Optional Additional System Prompt
  if (systemPrompt) {
    prompt += `${systemPrompt}\n\n`;
  }

  // RAG Context
  if (context.length > 0) {
    prompt += `Use the following context to answer the user's question.\n`;
    prompt += `If the context is not relevant, answer normally.\n\n`;
    prompt += `Context:\n`;
    prompt += `${context.join("\n\n")}\n\n`;
  }

  // User Message
  prompt += `User Question:\n${lastMessage.content}`;

  finalMessages[finalMessages.length - 1] = {
    ...lastMessage,
    content: prompt,
  };

  return finalMessages;
}