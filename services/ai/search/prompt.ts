import { SearchResult } from "@/types/search";

export function buildSearchMessages(
  messages: {
    role: "user" | "ai";
    content: string;
  }[],
  results: SearchResult[],
) {
  const lastMessage = messages.at(-1);

  if (!lastMessage) return messages;

  const searchContext = results
    .map(
      (result, index) => `
[${index + 1}]
Title: ${result.title}
URL: ${result.url}
Content: ${result.content}
`,
    )
    .join("\n");

  return [
    ...messages.slice(0, -1),
    {
      ...lastMessage,
      content: `You are a helpful AI assistant.

Use the web search results below as your primary source of truth when answering.

Do not mention that you were given search results.
Do not say "Based on the provided search results."
Answer naturally as if you already know the information.

If the search results are insufficient, say so honestly.

Web Search Results:
...
${searchContext}

User Question:
${lastMessage.content}`,
    },
  ];
}