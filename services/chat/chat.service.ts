import { prisma } from "@/lib/prisma";
import { routerAIRequest } from "../ai/router";
import type { AIModel } from "../ai/types";
import { MessageType } from "@prisma/client";

export async function saveUserMessage(
  chatId: string,
  content: string,
  attachments?: {
    id: string;
    name: string;
    url: string;
    type: string;
    size: number;
  }[],
  editingMessageId?: string,
) {
  

  if (editingMessageId) {
    const editedMessage =
      await prisma.message.findUnique({
        where: {
          id: editingMessageId,
        },
        select: {
          createdAt: true,
        },
      });

    if (!editedMessage) {
      throw new Error("Message not found.");
    }

    await prisma.$transaction([
      prisma.message.update({
        where: {
          id: editingMessageId,
        },
        data: {
          content,
          attachments: attachments ?? [],
        },
      }),

      prisma.message.deleteMany({
        where: {
          chatId,
          createdAt: {
            gt: editedMessage.createdAt,
          },
        },
      }),
    ]);

    return prisma.message.findUnique({
      where: {
        id: editingMessageId,
      },
    });
  }

  return prisma.message.create({
    data: {
      chatId,
      role: "user",
      content,
      attachments: attachments ?? [],
    },
  });
}
export async function getConversation(chatId: string) {
  return prisma.message.findMany({
    where: {
      chatId,
    },
    orderBy: {
      createdAt: "asc",
    },
 select: {
  id: true,
  role: true,
  content: true,
  imageUrl: true,
  type: true,
  model: true,
  createdAt: true,
  attachments: true,
}
  });
}

export async function saveAIMessage(
  chatId: string,
  model: AIModel,
  {
    type,
    content,
    imageUrl,
  }: {
    type: MessageType;
    content?: string;
    imageUrl?: string;
  },
) {
  return prisma.message.create({
    data: {
      chatId,
      role: "ai",
      model,
      type,
      content,
      imageUrl,
    },
  });
}
export async function streamAIResponse(
 chatId: string,
  userId: string,
  model: AIModel,
  forceImage = false,
) {
  const messages = await getConversation(chatId);

return routerAIRequest({
  userId,
  chatId,
  model,
  forceImage,
  messages: messages
    .filter((message) => message.type === MessageType.TEXT)
    .map((message) => ({
      role: message.role as "user" | "ai",
      content: message.content ?? "",
    })),
});
}
