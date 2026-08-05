export const AI_MODELS = {
  GOOGLE: {
    GEMINI_FLASH: "gemini-2.5-flash",
  },

  DEEPSEEK: {
    CHAT: "deepseek-chat",
  },

  GROQ: {
    LLAMA: "llama-3.3-70b-versatile",
     GPT_OSS_120B: "openai/gpt-oss-120b",
    
  },

  COHERE: {
    COMMAND_A: "command-a-03-2025",
  },
} as const;

export type AIModel =
  | (typeof AI_MODELS.GOOGLE)[keyof typeof AI_MODELS.GOOGLE]
  | (typeof AI_MODELS.DEEPSEEK)[keyof typeof AI_MODELS.DEEPSEEK]
  | (typeof AI_MODELS.GROQ)[keyof typeof AI_MODELS.GROQ]
  | (typeof AI_MODELS.COHERE)[keyof typeof AI_MODELS.COHERE];

export interface AIMessage {
  role: "user" | "ai";
  content: string;
}

export interface GenerateResponseParams {
  model: AIModel;
  messages: AIMessage[];
}

export interface AIResponse {
  text: string;
  model: AIModel;
}