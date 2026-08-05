import { AI_MODELS } from "@/services/ai/types";

export const FREE_LIMITS = {
  CHATS_PER_DAY: 20,
  FILE_UPLOADS_PER_DAY: 5,
  IMAGES_PER_DAY: 1,
} as const;

export const FREE_MODELS = [
  AI_MODELS.GOOGLE.GEMINI_FLASH,
] as const;