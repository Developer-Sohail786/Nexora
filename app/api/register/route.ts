import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { ZodError } from "zod";

import { prisma } from "@/lib/prisma";
import { signupSchema } from "@/lib/validations/auth.schema";

export async function POST(req: Request) {
  try {
    const {
      name,
      email,
      password,
    } = signupSchema.parse(await req.json());

    const existingUser =
      await prisma.user.findUnique({
        where: {
          email,
        },
        select: {
          id: true,
        },
      });

    if (existingUser) {
      return NextResponse.json(
        {
          success: false,
          message: "User already exists",
        },
        {
          status: 400,
        },
      );
    }

    const hashedPassword =
      await bcrypt.hash(password, 10);

    await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
      },
    });

    return NextResponse.json({
      success: true,
      message: "User created successfully",
    });
  } catch (error) {
    if (error instanceof ZodError) {
      return NextResponse.json(
        {
          success: false,
          message:
            error.issues[0]?.message ??
            "Invalid request",
        },
        {
          status: 400,
        },
      );
    }

    console.error(error);

    return NextResponse.json(
      {
        success: false,
        message: "Something went wrong",
      },
      {
        status: 500,
      },
    );
  }
}