import { prepareSearchMessages } from "./search.service";

export async function webSearch(
  messages: {
    role: "user" | "ai";
    content: string;
  }[],
) {
  return prepareSearchMessages(messages);
}