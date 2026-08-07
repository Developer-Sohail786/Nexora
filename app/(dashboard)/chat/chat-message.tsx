"use client";

import { motion } from "framer-motion";

import { itemVariants } from "@/lib/animations";

import type { Attachment } from "@/types/chat";
import type { MessageType } from "@prisma/client";

import UserMessage from "./user-message";
import AIMessage from "./ai-message";

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

export default function ChatMessage(
  props: ChatMessageProps,
) {
  return (
    <motion.div
      variants={itemVariants}
      initial="hidden"
      animate="visible"
      layout
    >
      {props.role === "user" ? (
        <UserMessage
          id={props.id}
          content={props.content}
          attachments={props.attachments}
          userImage={props.userImage}
          onEdit={props.onEdit}
        />
      ) : (
        <AIMessage
          id={props.id}
          content={props.content}
          imageUrl={props.imageUrl}
          model={props.model}
          isStreaming={props.isStreaming}
          onRegenerate={props.onRegenerate}
          type={props.type}
        />
      )}
    </motion.div>
  );
}