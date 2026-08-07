import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { ZodError } from "zod";

import { prisma } from "@/lib/prisma";
import { signupSchema } from "@/lib/validations/auth.schema";
import { rateLimits } from "@/lib/rateLimit";

export async function POST(req: Request) {
  try {

    const ip= req.headers.get("x-forwarded-for") ?? req.headers.get("x-real-ip") ?? "127.0.0.1";

    const {success}= await rateLimits.register.limit(ip)

    if (!success) {
      return NextResponse.json(
        {
          success: false,
          message:
            "Too many registration attempts. Please try again later.",
        },
        {
          status: 429,
        },
      );
    }
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