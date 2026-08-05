import { prisma } from "@/lib/prisma";

import { SubscriptionStatus } from "@prisma/client";

interface UpgradeUserParams {
  userId: string;
  razorpayOrderId: string;
  razorpayPaymentId: string;
  razorpaySignature: string;
}

export async function upgradeToPro({
  userId,
  razorpayOrderId,
  razorpayPaymentId,
  razorpaySignature,
}: UpgradeUserParams) {
  return prisma.user.update({
    where: {
      id: userId,
    },

    data: {
      plan: "PRO",

      subscriptionStatus:
        SubscriptionStatus.ACTIVE,

      razorpayOrderId,

      razorpayPaymentId,

      razorpaySignature,

      subscriptionEnd: null,
    },
  });
}

export async function downgradeToFree(
  userId: string,
) {
  return prisma.user.update({
    where: {
      id: userId,
    },

    data: {
      plan: "FREE",

      subscriptionStatus:
        SubscriptionStatus.EXPIRED,

      razorpayOrderId: null,

      razorpayPaymentId: null,

      razorpaySignature: null,

      subscriptionEnd: null,
    },
  });
}