import { generateGeminiImage } from "./gemini";
import { generateHuggingFaceImage } from "./huggingface";

import type {
  GenerateImageParams,
  ImageGenerationResult,
} from "./types";

export async function generateImage(
  params: GenerateImageParams,
): Promise<ImageGenerationResult> {
  try {
    return await generateGeminiImage(
      params,
    );
  } catch (geminiError) {
    console.error(
      "Gemini image generation failed:",
      geminiError,
    );
  }

  try {
    return await generateHuggingFaceImage(
      params,
    );
  } catch (huggingFaceError) {
    console.error(
      "Hugging Face image generation failed:",
      huggingFaceError,
    );
  }

  throw new Error(
    "Image generation failed. Gemini quota may be exhausted and the fallback provider also failed.",
  );
}