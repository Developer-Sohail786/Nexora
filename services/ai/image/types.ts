export interface GenerateImageParams {
  prompt: string;
}

export interface ImageGenerationResult {
  imageUrl: string;
  provider: "gemini" | "huggingface";
}