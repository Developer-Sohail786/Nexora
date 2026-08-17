"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { Paperclip } from "lucide-react";

import MessageContent from "./message-content";

import type { Attachment } from "@/types/chat";

interface UserMessageProps {
  id: string;
  content: string;
  attachments?: Attachment[];
  userImage: string | null;
  onEdit?: (id: string) => void;
}

export default function UserMessage({
  id,
  content,
  attachments,
  userImage,
  onEdit,
}: UserMessageProps) {
  const cleanContent = content
    .replace(/<think>[\s\S]*?<\/think>/g, "")
    .trim();

  return (
    <motion.div
      initial={{
        opacity: 0,
        y: 12,
      }}
      animate={{
        opacity: 1,
        y: 0,
      }}
      transition={{
        duration: 0.25,
      }}
      className="flex flex-row-reverse gap-3"
    >
      {userImage ? (
        <motion.div
          initial={{ scale: 0.9 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.2 }}
        >
          <Image
            src={userImage}
            alt="User"
            width={28}
            height={28}
            className="h-7 w-7 shrink-0 rounded-full object-cover"
          />
        </motion.div>
      ) : (
        <motion.div
          initial={{ scale: 0.9 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.2 }}
          className="h-7 w-7 shrink-0 rounded-full bg-gradient-to-br from-[#7C5CFC] to-[#4a3a8a]"
        />
      )}

      <div className="group flex min-w-0 flex-1 flex-col items-end">
        {/* User header */}
        <div className="mb-2 flex items-center justify-end gap-3">
          {onEdit && (
            <button
              onClick={() => onEdit(id)}
              className="cursor-pointer text-xs text-[#7A748F] opacity-70 transition hover:text-white hover:opacity-100"
            >
              Edit
            </button>
          )}

          <p className="text-xs font-semibold text-[#7C5CFC]">
            You
          </p>
        </div>

        {/* Attachments */}
        {attachments?.length ? (
          <div className="mb-3 flex flex-col items-end gap-2">
            {attachments.map((file) => (
              <motion.a
                key={file.id}
                href={file.url}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ y: -2 }}
                className="inline-flex w-fit items-center gap-2 rounded-lg border border-white/10 bg-[#242034] px-3 py-2 transition hover:bg-[#2A2640]"
              >
                <Paperclip
                  size={14}
                  className="text-[#7C5CFC]"
                />

                <span className="truncate text-xs text-white">
                  {file.name}.{file.type}
                </span>
              </motion.a>
            ))}
          </div>
        ) : null}

        {/* User message bubble */}
        <div className="max-w-[80%] rounded-2xl bg-[#2F2F2F] px-4 py-2 text-left">
          <MessageContent
            content={cleanContent}
            className="prose-p:my-0 text-[#ECECEC]"
          />
        </div>
      </div>
    </motion.div>
  );
}