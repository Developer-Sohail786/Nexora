import { generateGeminiImage } from "./gemini";
import { generateHuggingFaceImage } from "./huggingface";
import { GenerateImageParams, ImageGenerationResult } from "./types";

export async function generateImage(
  params: GenerateImageParams,
): Promise<ImageGenerationResult> {
  try {
   
    return await generateGeminiImage(params);
  } catch (error) {
    console.error("Gemini image generation failed:", error);

    try {
      
      return await generateHuggingFaceImage(params);
    } catch (fallbackError) {
      console.error("Hugging Face image generation failed:", fallbackError);

      throw new Error(
        "Image generation failed. Gemini quota may be exhausted and the fallback provider also failed.",
      );
    }
  }
}