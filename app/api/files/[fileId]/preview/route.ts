import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET(
  _: Request,
  {
    params,
  }: {
    params: Promise<{
      fileId: string;
    }>;
  },
) {
  const session = await auth();

  if (!session?.user?.email) {
    return new NextResponse(
      "Unauthorized",
      {
        status: 401,
      },
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
    return new NextResponse(
      "User not found",
      {
        status: 404,
      },
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
    return new NextResponse(
      "File not found",
      {
        status: 404,
      },
    );
  }

  const response = await fetch(file.url);



  if (!response.ok) {
    return new NextResponse(
      "Unable to load file",
      {
        status: 500,
      },
    );
  }

  const buffer =
    await response.arrayBuffer();

  return new NextResponse(buffer, {
    headers: {
      "Content-Type":
        "application/pdf",
      "Content-Disposition":
        'inline; filename="' +
        file.name +
        '"',
    },
  });
}