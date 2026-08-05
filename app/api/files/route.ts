import { auth } from "@/auth";
import cloudinary from "@/lib/cloudinary";
import { prisma } from "@/lib/prisma";
import { getFileContent } from "@/services/files/file.server";
import { ingestFile } from "@/services/rag/pipeline";

import { NextRequest, NextResponse } from "next/server";
import { Readable } from "stream";
import type { UploadApiResponse } from "cloudinary";

export async function GET() {
  try {
    const session = await auth();

    if (!session?.user?.email) {
      return NextResponse.json(
        { message: "Unauthorized" },
        { status: 401 },
      );
    }

    const user = await prisma.user.findUnique({
      where: {
        email: session.user.email,
      },
      select: {
        id: true,
      },
    });

    if (!user) {
      return NextResponse.json(
        { message: "User not found." },
        { status: 404 },
      );
    }

    const files = await prisma.file.findMany({
      where: {
        userId: user.id,
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    return NextResponse.json(files);
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

export async function POST(req: NextRequest) {
  try {
    const session = await auth();

    if (!session?.user?.email) {
      return NextResponse.json(
        { message: "Unauthorized" },
        { status: 401 },
      );
    }

    const formData = await req.formData();

    const file = formData.get("file");

    if (!(file instanceof File)) {
      return NextResponse.json(
        {
          message: "File is required.",
        },
        {
          status: 400,
        },
      );
    }

    const extension =
      file.name.split(".").pop()?.toLowerCase() ?? "";

    const buffer = Buffer.from(
      await file.arrayBuffer(),
    );

    const content = await getFileContent(
      buffer,
      extension,
    );

    const user = await prisma.user.findUnique({
      where: {
        email: session.user.email,
      },
      select: {
        id: true,
      },
    });

    if (!user) {
      return NextResponse.json(
        {
          message: "User not found.",
        },
        {
          status: 404,
        },
      );
    }

const uploadResult =
  await new Promise<UploadApiResponse>(
    (resolve, reject) => {
      const uploadStream =
        cloudinary.uploader.upload_stream(
          {
            folder: "documents",
            resource_type: "raw",
            public_id: file.name.replace(
              /\.[^/.]+$/,
              "",
            ),
          },
          (error, result) => {
            if (error || !result) {
              return reject(
                error ??
                  new Error(
                    "Cloudinary upload failed.",
                  ),
              );
            }

            resolve(result);
          },
        );

      Readable.from(buffer).pipe(
        uploadStream,
      );
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
      console.warn(
        "RAG ingestion skipped:",
        error,
      );
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