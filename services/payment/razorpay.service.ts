import { razorpay } from "@/lib/razorpay";
import crypto from "crypto";

interface CreateOrderParams {
  amount: number;
  currency?: string;
}

interface VerifyPaymentParams {
  razorpay_order_id: string;
  razorpay_payment_id: string;
  razorpay_signature: string;
}

export async function createRazorpayOrder({
  amount,
  currency = "INR",
}: CreateOrderParams) {
  return razorpay.orders.create({
    amount,
    currency,
  });
}

export function verifyRazorpayPayments({
  razorpay_order_id,
  razorpay_payment_id,
  razorpay_signature,
}: VerifyPaymentParams) {
  const body = razorpay_order_id + "|" + razorpay_payment_id;

  const expectedSignature = crypto
    .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET!)
    .update(body)
    .digest("hex");
  return expectedSignature === razorpay_signature;
}
