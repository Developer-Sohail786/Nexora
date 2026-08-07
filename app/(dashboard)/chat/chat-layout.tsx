"use client";

import { useEffect, useRef, useState } from "react";

import {
  AnimatePresence,
  motion,
} from "framer-motion";

import ChatInput from "./chat-input";
import ChatMessage from "./chat-message";

import { useChat } from "@/hooks/use-chat";

import type {
  ChatMessageData,
  Attachment,
} from "@/types/chat";

import {
  AI_MODELS,
  type AIModel,
} from "@/services/ai/types";

import { listVariants } from "@/lib/animations";

import EmptyState from "@/components/ui/empty-state";

import { MessageCircle } from "lucide-react";

export type ModelOption = {
  id: AIModel;
  name: string;
};

type ChatLayoutProps = {
  messages: ChatMessageData[];
  userImage: string | null;
  isPro: boolean;
};

const MODELS: ModelOption[] = [
  {
    id: AI_MODELS.GOOGLE.GEMINI_FLASH,
    name: "Gemini",
  },
  {
    id: AI_MODELS.DEEPSEEK.CHAT,
    name: "DeepSeek",
  },
  {
    id: AI_MODELS.GROQ.LLAMA,
    name: "Llama 3.3",
  },
  {
    id: AI_MODELS.GROQ.GPT_OSS_120B,
    name: "GPT-OSS",
  },
  {
    id: AI_MODELS.COHERE.COMMAND_A,
    name: "Cohere Command A",
  },
];

export default function ChatLayout({
  messages,
  userImage,
  isPro,
}: ChatLayoutProps) {
  const [selectedModel, setSelectedModel] =
    useState<ModelOption>(MODELS[0]);

  const [showModels, setShowModels] =
    useState(false);

  const {
    chatMessages,
    inputValue,
    setInputValue,
    isSending,
    streamingMessageId,
    handleSend,
    handleStop,
    handleRegenerate,
    handleEdit,
    uploadedFiles,
    uploadFile,
    removeFile,
  } = useChat({
    initialMessages: messages,
    selectedModel,
  });

  const messageEndRef =
    useRef<HTMLDivElement>(null);

  useEffect(() => {
    messageEndRef.current?.scrollIntoView({
      behavior: "smooth",
    });
  }, [chatMessages]);

  return (
    <div className="flex h-full bg-[#111018] text-white">
      <div className="flex min-h-0 min-w-0 flex-1 flex-col">
        <main className="min-h-0 flex-1 overflow-y-auto">
          <motion.div
            variants={listVariants}
            initial="hidden"
            animate="visible"
            layout
            className="flex flex-col gap-6 px-6 py-6"
          >
            {chatMessages.length === 0 ? (
              <div className="flex h-full items-center justify-center py-20">
                <EmptyState
                  icon={
                    <MessageCircle className="h-8 w-8 text-[#7C5CFC]" />
                  }
                  title="Welcome to Nexora"
                  description="Ask questions, upload documents, search the web, or generate AI images to get started."
                />
              </div>
            ) : (
              <AnimatePresence mode="popLayout">
                {chatMessages.map((message) => (
                  <ChatMessage
                    key={message.id}
                    id={message.id}
                    role={
                      message.role as
                        | "user"
                        | "ai"
                    }
                    type={message.type}
                    content={
                      message.content ?? ""
                    }
                    imageUrl={
                      message.imageUrl
                    }
                    model={message.model}
                    attachments={
                      Array.isArray(
                        message.attachments,
                      )
                        ? (message.attachments as Attachment[])
                        : []
                    }
                    userImage={userImage}
                    isStreaming={
                      message.id ===
                      streamingMessageId
                    }
                    onEdit={handleEdit}
                    onRegenerate={
                      handleRegenerate
                    }
                  />
                ))}
              </AnimatePresence>
            )}

            <div ref={messageEndRef} />
          </motion.div>
        </main>

        <div className="shrink-0 border-t border-white/6 px-6 py-4">
          <ChatInput
            isPro={isPro}
            inputValue={inputValue}
            setInputValue={setInputValue}
            isSending={isSending}
            handleSend={handleSend}
            handleStop={handleStop}
            models={MODELS}
            selectedModel={selectedModel}
            setSelectedModel={
              setSelectedModel
            }
            showModels={showModels}
            setShowModels={
              setShowModels
            }
            uploadedFiles={uploadedFiles}
            uploadFile={uploadFile}
            removeFile={removeFile}
          />
        </div>
      </div>
    </div>
  );
}