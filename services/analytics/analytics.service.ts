import { prisma } from "@/lib/prisma";

import {
  buildActivityData,
  buildFileTypes,
  buildModelUsage,
  formatBytes,
} from "@/app/(dashboard)/analytics/utils";

export async function getAnalytics(
  userId: string,
) {
  const [
    totalChats,
    totalDocuments,
    totalImages,
    totalResponses,
    files,
    models,
    chats,
    recentChats,
    recentImages,
  ] = await Promise.all([
    prisma.chat.count({
      where: {
        userId,
      },
    }),

    prisma.file.count({
      where: {
        userId,
      },
    }),

    prisma.message.count({
      where: {
        chat: {
          userId,
        },
        type: "IMAGE",
      },
    }),

    prisma.message.count({
      where: {
        chat: {
          userId,
        },
        role: "assistant",
      },
    }),

    prisma.file.findMany({
      where: {
        userId,
      },
      select: {
        id: true,
        name: true,
        size: true,
        type: true,
        createdAt: true,
      },
    }),

    prisma.message.findMany({
      where: {
        chat: {
          userId,
        },
        model: {
          not: null,
        },
      },
      select: {
        model: true,
      },
    }),

    prisma.chat.findMany({
      where: {
        userId,
      },
      select: {
        createdAt: true,
      },
    }),

    prisma.chat.findMany({
      where: {
        userId,
      },
      take: 5,
      orderBy: {
        createdAt: "desc",
      },
      select: {
        id: true,
        title: true,
        createdAt: true,
      },
    }),

    prisma.message.findMany({
      where: {
        chat: {
          userId,
        },
        type: "IMAGE",
      },
      take: 5,
      orderBy: {
        createdAt: "desc",
      },
      select: {
        id: true,
        content: true,
        createdAt: true,
      },
    }),
  ]);

  const totalStorage = files.reduce(
    (total, file) => total + file.size,
    0,
  );

  const cards = {
    chats: totalChats,

    documents: totalDocuments,

    images: totalImages,

    responses: totalResponses,

    storage: formatBytes(
      totalStorage,
    ),

    models: new Set(
      models.map(
        (model) => model.model,
      ),
    ).size,
  };

  const activity =
    buildActivityData(chats);

  const modelUsage =
    buildModelUsage(models);

  const fileTypes =
    buildFileTypes(files);

  const activities = [
    ...recentChats.map((chat) => ({
      id: chat.id,
      type: "chat" as const,
      title: chat.title,
      createdAt: chat.createdAt,
    })),

    ...files.map((file) => ({
      id: file.id,
      type: "file" as const,
      title: file.name,
      createdAt: file.createdAt,
    })),

    ...recentImages.map((image) => ({
      id: image.id,
      type: "image" as const,
      title:
        image.content ??
        "Generated Image",
      createdAt:
        image.createdAt,
    })),
  ]
    .sort(
      (a, b) =>
        b.createdAt.getTime() -
        a.createdAt.getTime(),
    )
    .slice(0, 8);

  return {
    cards,

    activity,

    modelUsage,

    fileTypes,

    activities,
  };
}