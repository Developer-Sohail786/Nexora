export interface CreateOrderInput{
    amount: number;
    currency?: string;
}

export interface VerifyPaymentInput {
     razorpay_order_id: string;
  razorpay_payment_id: string;
  razorpay_signature: string;
}