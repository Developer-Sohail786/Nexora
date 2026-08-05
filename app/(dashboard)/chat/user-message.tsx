"use client";

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
    <div className="flex gap-3">
      {userImage ? (
        <Image
          src={userImage}
          alt="User"
          width={28}
          height={28}
          className="h-7 w-7 shrink-0 rounded-full object-cover"
        />
      ) : (
        <div className="h-7 w-7 shrink-0 rounded-full bg-gradient-to-br from-[#7C5CFC] to-[#4a3a8a]" />
      )}

      <div className="flex-1">
        <div className="mb-2 flex items-center justify-between">
          <p className="text-xs font-semibold text-[#7C5CFC]">
            You
          </p>

          {onEdit && (
            <button
              onClick={() => onEdit(id)}
              className="cursor-pointer text-xs text-[#7A748F] transition hover:text-white"
            >
              Edit
            </button>
          )}
        </div>

        {attachments?.length ? (
          <div className="mb-3 space-y-2">
            {attachments.map((file) => (
              <a
                key={file.id}
                href={file.url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex w-fit items-center gap-2 rounded-lg border border-white/10 bg-[#242034] px-3 py-2 transition hover:bg-[#2A2640]"
              >
                <Paperclip
                  size={14}
                  className="text-[#7C5CFC]"
                />

                <span className="truncate text-xs text-white">
                  {file.name}.{file.type}
                </span>
              </a>
            ))}
          </div>
        ) : null}

        <MessageContent content={cleanContent} />
      </div>
    </div>
  );
}