import { auth } from "@/auth";
import cloudinary from "@/lib/cloudinary";
import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function DELETE(
  req: NextRequest,
  { params }: { params: Promise<{ fileId: string }> },
) {
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

    const { fileId } = await params;

    const file = await prisma.file.findFirst({
      where: {
        id: fileId,
        userId: user.id,
      },
    });

    if (!file) {
      return NextResponse.json(
        { message: "File not found." },
        { status: 404 },
      );
    }

    const publicId = file.url
      .split("/")
      .pop()
      ?.replace(/\.[^/.]+$/, "");

    if (publicId) {
      try {
        await cloudinary.uploader.destroy(
          `documents/${publicId}`,
          {
            resource_type: "raw",
          },
        );
      } catch (error) {
        console.warn(
          "Cloudinary delete failed:",
          error,
        );
      }
    }

    await prisma.file.delete({
      where: {
        id: file.id,
      },
    });

    return NextResponse.json({
      message: "File deleted successfully.",
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