import { auth } from "@/auth";
import cloudinary from "@/lib/cloudinary";
import { prisma } from "@/lib/prisma";
import { getFileContent } from "@/services/files/file.server";
import { ingestFile } from "@/services/rag/pipeline";
import { canUploadFile } from "@/services/subscription/subscription.service";
import { NextRequest, NextResponse } from "next/server";
import { Readable } from "stream";
import type { UploadApiResponse } from "cloudinary";
import { rateLimits } from "@/lib/rateLimit";

export async function POST(
  req: NextRequest,
  { params }: { params: Promise<{ chatId: string }> },
) {
  try {
    const session = await auth();
    const ip =
  req.headers.get("x-forwarded-for") ??
  req.headers.get("x-real-ip") ??
  "127.0.0.1";

const { success } =
  await rateLimits.upload.limit(ip);

if (!success) {
  return NextResponse.json(
    {
      message:
        "Too many file uploads. Please try again later.",
    },
    {
      status: 429,
    },
  );
}

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

    const ALLOWED_FILE_TYPES = [
  "pdf",
  "docx",
  "txt",
];

if (!ALLOWED_FILE_TYPES.includes(extension)) {
  return NextResponse.json(
    {
      message:
        "Unsupported file type.",
    },
    {
      status: 400,
    },
  );
}

const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10MB

if (file.size > MAX_FILE_SIZE) {
  return NextResponse.json(
    {
      message:
        "File size exceeds 10MB.",
    },
    {
      status: 400,
    },
  );
}

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
