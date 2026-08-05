import { auth } from "@/auth";
import { upgradeToPro } from "@/services/payment/payment.service";
import { verifyRazorpayPayments } from "@/services/payment/razorpay.service";
import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(req: NextRequest){
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

    const {razorpay_order_id,razorpay_payment_id,razorpay_signature}= await req.json()

    const verified= verifyRazorpayPayments({
        razorpay_order_id,
        razorpay_payment_id,
        razorpay_signature
    })

    if(!verified){
        return NextResponse.json(
            {message: "Payment verification failed"},
            {status:400}
        )
    }

  await upgradeToPro({
      userId: user.id,
      razorpayOrderId:
        razorpay_order_id,
      razorpayPaymentId:
        razorpay_payment_id,
      razorpaySignature:
        razorpay_signature,
    });

    return NextResponse.json({
        success: true
    })

    } catch (error) {
        console.error(error);
        return NextResponse.json(
            {message: "Internal Server Error"},
            {status:500}
        )
        
    }
}