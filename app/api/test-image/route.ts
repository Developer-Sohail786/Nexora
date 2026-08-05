import { generateImage } from "@/services/ai/image/image.service";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const result = await generateImage({
      prompt: "A futuristic cyberpunk city at sunset",
    });

    return NextResponse.json(result);
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      { message: "Image generation failed." },
      { status: 500 },
    );
  }
}