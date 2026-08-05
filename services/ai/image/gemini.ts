import { generateImage } from "ai";
import { google } from "@ai-sdk/google";

import type {
  GenerateImageParams,
  ImageGenerationResult,
} from "./types";

export async function generateGeminiImage({
  prompt,
}: GenerateImageParams): Promise<ImageGenerationResult> {
  try {
   

    const { image } = await generateImage({
      model: google.image("gemini-2.5-flash-image"),
      prompt,
      aspectRatio: "1:1",
    });

    

    return {
      imageUrl: `data:${image.mediaType};base64,${image.base64}`,
      provider: "gemini",
    };
  } catch (error) {
    console.error("Gemini image generation failed:");
    console.error(error);
    throw error;
  }
}