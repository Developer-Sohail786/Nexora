"use client";

import type { Attachment } from "@/types/chat";

import UserMessage from "./user-message";
import AIMessage from "./ai-message";
import type { MessageType } from "@prisma/client";

interface ChatMessageProps {
  id: string;
  role: "user" | "ai";
  content: string;
  type: MessageType;
  imageUrl: string | null;
  model: string | null;
  attachments?: Attachment[];
  userImage: string | null;
  isStreaming?: boolean;
  onEdit?: (id: string) => void;
  onRegenerate?: (id: string) => void;
}

export default function ChatMessage(props: ChatMessageProps) {
  if (props.role === "user") {
    return (
      <UserMessage
        id={props.id}
        content={props.content}
        attachments={props.attachments}
        userImage={props.userImage}
        onEdit={props.onEdit}
      />
    );
  }

  return (
  <AIMessage
  id={props.id}
  content={props.content}
  imageUrl={props.imageUrl}
  model={props.model}
  isStreaming={props.isStreaming}
  onRegenerate={props.onRegenerate}
  type={props.type}
/>
  );
}