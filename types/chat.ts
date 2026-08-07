import type { MessageType } from "@prisma/client";

export type Attachment = {
  id: string;
  name: string;
  url: string;
  type: string;
  size: number;
  content?: string | null;
};

export type ChatMessageData = {
  id: string;
  chatId: string;

  role: "user" | "ai";

  type: MessageType;

  content: string | null;

  imageUrl: string | null;

  model: string | null;

  createdAt: Date;

  attachments: Attachment[];
};