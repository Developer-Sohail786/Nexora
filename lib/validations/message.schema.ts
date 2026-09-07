import { z } from "zod";

import { AI_MODELS } from "@/services/ai/types";

export const SendMessageSchema = z.object({
  content: z
    .string()
    .trim()
    .min(1, "Message is required")
    .max(10000, "Message is too long"),

model: z.enum([
  AI_MODELS.GOOGLE.GEMINI_FLASH,
  AI_MODELS.DEEPSEEK.CHAT,
  AI_MODELS.GROQ.QWEN,
  AI_MODELS.GROQ.GPT_OSS_120B,
  AI_MODELS.COHERE.COMMAND_A,
]),

  files: z
  .array(
    z.object({
      id: z.string(),
      name: z.string(),
      url: z.string().url(),
      type: z.string(),
      size: z.number(),
    }),
  )
  .default([]),

  editingMessageId: z.string().nullable().optional(),

  forceImage: z.boolean().default(false),
  
});

export type SendMessageInput = z.infer<typeof SendMessageSchema>;