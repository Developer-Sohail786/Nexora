export interface PromptBuilderParams {
  messages: {
    role: "user" | "ai";
    content: string;
  }[];
  context?: string[];
  systemPrompt?: string;
}