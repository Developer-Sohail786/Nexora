import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";


export async function PATCH(req: Request) {
  try {
    const session = await auth();

    if (!session?.user?.email) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const body = await req.json();
    const { firstName, lastName, username, image } = body;

    const updatedUser = await prisma.user.update({
      where: {
        email: session.user.email,
      },
      data: {
        firstName,
        lastName,
        username,
        image,
      },
    });

    return NextResponse.json({
        success: true,
        user: updatedUser
    })
  } catch  {
    return NextResponse.json(
        {message:"Somethig went wrond"},
        {status:500}
    )
  }
}
