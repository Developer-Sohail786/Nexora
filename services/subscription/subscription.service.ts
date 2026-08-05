import { prisma } from "@/lib/prisma";

import { SubscriptionUser } from "./subscription.types";
import { FREE_LIMITS, FREE_MODELS } from "./subscription.constant";

export function isPro(user: SubscriptionUser) {
  return user.plan === "PRO";
}

function getStartOfToday() {
  const today = new Date();

  today.setHours(0, 0, 0, 0);

  return today;
}

// Usage Counters

export async function getTodayChatCount(userId: string) {
  return prisma.message.count({
    where: {
      role: "user",
      chat: {
        userId,
      },
      createdAt: {
        gte: getStartOfToday(),
      },
    },
  });
}

export async function getTodayUploadCount(userId: string) {
  return prisma.file.count({
    where: {
      userId,
      createdAt: {
        gte: getStartOfToday(),
      },
    },
  });
}

export async function getTodayImageCount(userId: string) {
  return prisma.message.count({
    where: {
      role: "ai",
      type: "IMAGE",
      chat: {
        userId,
      },
      createdAt: {
        gte: getStartOfToday(),
      },
    },
  });
}

// Permissions

export async function canSendMessage(user: SubscriptionUser) {
  if (isPro(user)) {
    return true;
  }

  const count = await getTodayChatCount(user.id);

  return count < FREE_LIMITS.CHATS_PER_DAY;
}

export async function canUploadFile(user: SubscriptionUser) {
  if (isPro(user)) {
    return true;
  }

  const count = await getTodayUploadCount(user.id);

  return count < FREE_LIMITS.FILE_UPLOADS_PER_DAY;
}

export async function canGenerateImage(user: SubscriptionUser) {
  if (isPro(user)) {
    return true;
  }

  const count = await getTodayImageCount(user.id);

  return count < FREE_LIMITS.IMAGES_PER_DAY;
}

export function canUseModel(user: SubscriptionUser, model: string) {
  if (isPro(user)) {
    return true;
  }

  return FREE_MODELS.includes(model as (typeof FREE_MODELS)[number]);
}

export function canUseWebSearch(user: SubscriptionUser) {
  return isPro(user);
}
