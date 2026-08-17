"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import {
  Copy,
  Check,
  RotateCcw,
} from "lucide-react";
import type { MessageType } from "@prisma/client";

import ImageModal from "./image-modal";
import MessageContent from "./message-content";

interface AIMessageProps {
  id: string;
  content: string | null;
  imageUrl: string | null;
  model: string | null;
  type: MessageType;
  isStreaming?: boolean;
  onRegenerate?: (id: string) => void;
}

export default function AIMessage({
  id,
  content,
  imageUrl,
  model,
  type,
  isStreaming,
  onRegenerate,
}: AIMessageProps) {
  const [copied, setCopied] =
    useState(false);

  const [isModalOpen, setIsModalOpen] =
    useState(false);

  const modelNames: Record<
    string,
    string
  > = {
    "gemini-2.5-flash": "Gemini",
    "deepseek-chat": "DeepSeek",
    "llama-3.3-70b-versatile":
      "Llama 3.3",
    "qwen/qwen3-32b": "Qwen 3",
    "command-a-03-2025": "Cohere",
  };

  const cleanContent =
    type === "TEXT"
      ? (content ?? "")
          .replace(
            /<think>[\s\S]*?<\/think>/g,
            "",
          )
          .trim()
      : "";

  async function handleCopy() {
    await navigator.clipboard.writeText(
      cleanContent,
    );

    setCopied(true);

    setTimeout(
      () => setCopied(false),
      2000,
    );
  }

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
      className="flex gap-3"
    >
      <motion.div
        initial={{
          scale: 0.9,
        }}
        animate={{
          scale: 1,
        }}
        transition={{
          duration: 0.2,
        }}
        className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-[#7C5CFC] text-xs font-bold text-white"
      >
        AI
      </motion.div>

      <div className="group flex-1">
        <div className="mb-2 flex items-center justify-between">
          <p className="text-xs font-semibold text-[#7C5CFC]">
            Nexora AI
          </p>

          {cleanContent !==
            "Thinking...." && (
            <div className="flex items-center gap-3 opacity-70 transition-opacity hover:opacity-100">
              <button
                onClick={handleCopy}
                className="flex cursor-pointer items-center gap-1 text-xs text-[#7A748F] transition hover:text-white"
              >
                {copied ? (
                  <>
                    <Check size={14} />
                    Copied
                  </>
                ) : (
                  <>
                    <Copy size={14} />
                    Copy
                  </>
                )}
              </button>

              <button
                onClick={() =>
                  onRegenerate?.(id)
                }
                className="flex cursor-pointer items-center gap-1 text-xs text-[#7A748F] transition hover:text-white"
              >
                <RotateCcw size={14} />
                Regenerate
              </button>
            </div>
          )}
        </div>

        {model && (
          <p className="mb-2 mt-1 text-[11px] text-[#7A748F]">
            {modelNames[model] ??
              model}
          </p>
        )}

        {type === "IMAGE" ? (
          <motion.div
            initial={{
              opacity: 0,
            }}
            animate={{
              opacity: 1,
            }}
            transition={{
              duration: 0.35,
            }}
            className="mt-3 w-fit max-w-full overflow-hidden rounded-xl border border-[#2B2B35]"
          >
            {imageUrl && (
              <>
                <Image
                  src={imageUrl}
                  alt="Generated image"
                  width={512}
                  height={512}
                  unoptimized
                  onClick={() =>
                    setIsModalOpen(
                      true,
                    )
                  }
                  className="h-auto max-h-105 w-full max-w-lg cursor-pointer rounded-xl object-contain transition hover:opacity-90"
                />

                <ImageModal
                  open={
                    isModalOpen
                  }
                  imageUrl={
                    imageUrl
                  }
                  onClose={() =>
                    setIsModalOpen(
                      false,
                    )
                  }
                  onRegenrate={() =>
                    onRegenerate?.(
                      id,
                    )
                  }
                />
              </>
            )}
          </motion.div>
        ) : (
          <div className="w-fit max-w-full rounded-2xl border border-none bg-[#2A2833] px-4 py-2">
            <MessageContent
              content={cleanContent}
              isStreaming={
                isStreaming &&
                cleanContent !==
                  "Thinking...."
              }
            />
          </div>
        )}
      </div>
    </motion.div>
  );
}