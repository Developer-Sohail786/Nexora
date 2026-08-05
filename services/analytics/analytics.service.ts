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
 
  // Cards
 

  const totalChats =
    await prisma.chat.count({
      where: {
        userId,
      },
    });

  const totalDocuments =
    await prisma.file.count({
      where: {
        userId,
      },
    });

  const totalImages =
    await prisma.message.count({
      where: {
        chat: {
          userId,
        },
        type: "IMAGE",
      },
    });

  const totalResponses =
    await prisma.message.count({
      where: {
        chat: {
          userId,
        },
        role: "assistant",
      },
    });

  const files =
    await prisma.file.findMany({
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
    });

  const totalStorage =
    files.reduce(
      (
        total,
        file,
      ) =>
        total + file.size,
      0,
    );

  const models =
    await prisma.message.findMany({
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
    });

  const cards = {
    chats: totalChats,

    documents:
      totalDocuments,

    images: totalImages,

    responses:
      totalResponses,

    storage:
      formatBytes(
        totalStorage,
      ),

    models: new Set(
      models.map(
        (m) => m.model,
      ),
    ).size,
  };


  // Activity
 

  const chats =
    await prisma.chat.findMany({
      where: {
        userId,
      },
      select: {
        createdAt: true,
      },
    });

  const activity =
    buildActivityData(
      chats,
    );

 
  // Model Usage
 

  const modelUsage =
    buildModelUsage(
      models,
    );

 
    
  // File Types
  

  const fileTypes =
    buildFileTypes(files);

 
  // Recent Chats
  

  const recentChats =
    await prisma.chat.findMany({
      where: {
        userId,
      },
      take: 5,
      orderBy: {
        createdAt:
          "desc",
      },
    });

  const recentImages =
    await prisma.message.findMany({
      where: {
        chat: {
          userId,
        },
        type: "IMAGE",
      },
      take: 5,
      orderBy: {
        createdAt:
          "desc",
      },
    });
   
  // Recent Usage
 

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

 
  // Return


  return {
    cards,

    activity,

    modelUsage,

    fileTypes,

    activities,
  };
}