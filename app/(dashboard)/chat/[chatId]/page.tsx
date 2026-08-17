import ChatLayout from "../chat-layout";
import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import { notFound, redirect } from "next/navigation";
import type { ChatMessageData } from "@/types/chat";

export default async function ChatPage({
  params,
}: {
  params: Promise<{ chatId: string }>;
}) {
  const { chatId } = await params;

  const session = await auth();

  if (!session?.user?.email) {
    notFound();
  }

  const user = await prisma.user.findUnique({
    where: {
      email: session.user.email,
    },
  });

  if (!user) {
    notFound();
  }

  const chat = await prisma.chat.findFirst({
    where: {
      id: chatId,
      userId: user.id,
    },
    include: {
      messages: {
        orderBy: {
          createdAt: "asc",
        },
      },
    },
  });

  if (!chat) {
    redirect("/dashboard");
  }

  return (
    <ChatLayout
      messages={
        chat.messages.map((message) => ({
          ...message,
          attachments: Array.isArray(
            message.attachments,
          )
            ? (message.attachments as ChatMessageData["attachments"])
            : [],
        })) as ChatMessageData[]
      }
      userImage={user.image}
      isPro={user.plan === "PRO"}
    />
  );
}