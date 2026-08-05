import { auth } from "@/auth";
import cloudinary from "@/lib/cloudinary";
import { prisma } from "@/lib/prisma";
import { getFileContent } from "@/services/files/file.server";
import { ingestFile } from "@/services/rag/pipeline";
import { canUploadFile } from "@/services/subscription/subscription.service";
import { NextRequest, NextResponse } from "next/server";
import { Readable } from "stream";
import type { UploadApiResponse } from "cloudinary";

export async function POST(
  req: NextRequest,
  { params }: { params: Promise<{ chatId: string }> },
) {
  try {
    const session = await auth();

    if (!session?.user?.email) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const { chatId } = await params;

    const formData = await req.formData();

    const file = formData.get("file");

    if (!(file instanceof File)) {
      return NextResponse.json(
        { message: "File is required." },
        { status: 400 },
      );
    }

    const extension = file.name.split(".").pop()?.toLowerCase() ?? "";

    const arrayBuffer = await file.arrayBuffer();
    const fileBuffer = Buffer.from(arrayBuffer);

    const content = await getFileContent(fileBuffer, extension);
    const user = await prisma.user.findUnique({
      where: {
        email: session.user.email,
      },
    });

    if (!user) {
      return NextResponse.json({ message: "User not found." }, { status: 404 });
    }

    if (!(await canUploadFile(user))) {
      return NextResponse.json(
        {
          message:
            "You've reached today's free upload limit. Upgrade to Nexus Pro for unlimited uploads.",
        },
        {
          status: 403,
        },
      );
    }

    const chat = await prisma.chat.findFirst({
      where: {
        id: chatId,
        userId: user.id,
      },
    });

    if (!chat) {
      return NextResponse.json({ message: "Chat not found." }, { status: 404 });
    }

    const uploadResult = await new Promise<UploadApiResponse>(
      (resolve, reject) => {
        const uploadStream = cloudinary.uploader.upload_stream(
          {
            folder: "documents",
            resource_type: "raw",
            public_id: file.name.replace(/\.[^/.]+$/, ""),
          },
          (error, result) => {
            if (error || !result) {
              return reject(error ?? new Error("Cloudinary upload failed."));
            }

            resolve(result);
          },
        );

        Readable.from(fileBuffer).pipe(uploadStream);
      },
    );

    const createdFile = await prisma.file.create({
      data: {
        name: file.name,
        url: uploadResult.secure_url,
        type: extension,
        size: file.size,
        content,
        userId: user.id,
      },
    });

    try {
      await ingestFile({
        fileId: createdFile.id,
        userId: user.id,
        fileName: createdFile.name,
        fileType: createdFile.type,
        content,
      });
    } catch (error) {
      console.warn("RAG ingestion skipped:", error);
    }
    return NextResponse.json(createdFile, {
      status: 201,
    });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        message: "Internal Server Error",
      },
      {
        status: 500,
      },
    );
  }
}
