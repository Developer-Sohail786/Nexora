"use client";

import { useRouter } from "next/navigation";
import { toast } from "sonner";

interface RazorpayPayment {
  razorpay_order_id: string;
  razorpay_payment_id: string;
  razorpay_signature: string;
}

interface RazorpayOptions {
  key: string | undefined;
  order_id: string;
  amount: number;
  currency: string;
  name: string;
  description: string;
  handler: (payment: RazorpayPayment) => Promise<void>;
  theme: {
    color: string;
  };
}

interface RazorpayInstance {
  open: () => void;
}

declare global {
  interface Window {
    Razorpay: new (
      options: RazorpayOptions,
    ) => RazorpayInstance;
  }
}

export function useRazorpay() {
  const router = useRouter();

  const checkout = async () => {
    try {
      const response = await fetch(
        "/api/payment/create-order",
        {
          method: "POST",
        },
      );

      if (!response.ok) {
        const error =
          await response.json();

        throw new Error(
          error.message ??
            "Failed to create order.",
        );
      }

      const order =
        await response.json();

      const razorpay =
        new window.Razorpay({
          key: process.env
            .NEXT_PUBLIC_RAZORPAY_KEY_ID,

          order_id: order.id,

          amount: order.amount,

          currency: order.currency,

          name: "Nexora",

          description:
            "Nexora Pro Subscription",

          handler: async (
            payment: RazorpayPayment,
          ) => {
            const verify =
              await fetch(
                "/api/payment/verify",
                {
                  method: "POST",

                  headers: {
                    "Content-Type":
                      "application/json",
                  },

                  body: JSON.stringify(
                    payment,
                  ),
                },
              );

            if (!verify.ok) {
              const error =
                await verify.json();

              toast.error(
                error.message ??
                  "Payment verification failed.",
              );

              return;
            }

            toast.success(
              "Payment Successful",
            );

            router.refresh();
          },

          theme: {
            color: "#7C5CFC",
          },
        });

      razorpay.open();
    } catch (error) {
      console.error(error);

      toast.error(
        error instanceof Error
          ? error.message
          : "Checkout failed.",
      );
    }
  };

  return {
    checkout,
  };
}