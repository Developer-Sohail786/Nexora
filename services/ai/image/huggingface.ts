import { InferenceClient } from "@huggingface/inference";

import type {
  GenerateImageParams,
  ImageGenerationResult,
} from "./types";

const client = new InferenceClient(process.env.HUGGINGFACE_API_KEY);

export async function generateHuggingFaceImage({
  prompt,
}: GenerateImageParams): Promise<ImageGenerationResult> {
  const imageBlob = await client.textToImage(
    {
      model: "black-forest-labs/FLUX.1-dev",
      inputs: prompt,
    },
    {
      outputType: "blob",
    }
  );

  const buffer = Buffer.from(await imageBlob.arrayBuffer());

  return {
    imageUrl: `data:image/png;base64,${buffer.toString("base64")}`,
    provider: "huggingface",
  };
}