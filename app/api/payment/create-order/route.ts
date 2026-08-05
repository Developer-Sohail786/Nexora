import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import { createRazorpayOrder } from "@/services/payment/razorpay.service";
import { NextResponse } from "next/server";

export async function POST(){
    try {
         const session = await auth();

    if (!session?.user?.email) {
      return NextResponse.json(
        {
          message: "Unauthorized",
        },
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
        plan: true,
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

    const order= await createRazorpayOrder({
        amount: 29900,
    })
    return NextResponse.json(order);


    } catch (error) {
        console.error(error);
        return NextResponse.json({
            message: "Internal Server Error",
        },
    {status:500})
        
    }
}