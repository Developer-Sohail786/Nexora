"use client";

import { useParams } from "next/navigation";
import { useRef, useState } from "react";
import { toast } from "sonner";
import type { Dispatch, SetStateAction } from "react";
import { AI_MODELS } from "@/services/ai/types";
import type { AIModel } from "@/services/ai/types";
import type { ChatMessageData, Attachment } from "@/types/chat";

// export type ChatMessage = Message & {
//   attachments?: UploadedFile[];
// };

export type ModelOption = {
  id: AIModel;
  name: string;
};

type UseChatProps = {
  initialMessages: ChatMessageData[];
  selectedModel: ModelOption;
};

type UseChatReturn = {
  chatMessages: ChatMessageData[];
  setChatMessages: Dispatch<SetStateAction<ChatMessageData[]>>;

  inputValue: string;
  setInputValue: Dispatch<SetStateAction<string>>;

  uploadedFiles: Attachment[];
  setUploadedFiles: Dispatch<SetStateAction<Attachment[]>>;

  isSending: boolean;

  streamingMessageId: string | null;

  editingMessageId: string | null;

  handleSend: (prompt?: string, regenerate?: boolean, forceImage?: boolean) => Promise<void>;

  handleStop: () => void;

  handleRegenerate: (aiMessageId: string) => Promise<void>;

  handleEdit: (userMessageId: string) => void;

 uploadFile: (file: File) => Promise<Attachment>;

  removeFile: (fileId: string) => void;
};

export function useChat({
  initialMessages,
  selectedModel,
}: UseChatProps): UseChatReturn {
  const { chatId } = useParams<{
    chatId: string;
  }>();

  const [chatMessages, setChatMessages] =
    useState<ChatMessageData[]>(initialMessages);

  const [inputValue, setInputValue] = useState("");

  const [isSending, setIsSending] = useState(false);

  const [streamingMessageId, setStreamingMessageId] = useState<string | null>(
    null,
  );

  const [editingMessageId, setEditingMessageId] = useState<string | null>(null);

  // file upload states
  const [uploadedFiles, setUploadedFiles] = useState<Attachment[]>([]);

  const abortControllerRef = useRef<AbortController | null>(null);

  const stopStreamingRef = useRef(false);

const handleSend = async (
  prompt?: string,
  regenerate = false,
  forceImage = false,
) => {
  const userInput = prompt ?? inputValue;

  if (!userInput.trim() || isSending) return;

  const currentEditingMessageId =
    editingMessageId;

  try {
    setIsSending(true);
    stopStreamingRef.current = false;

    if (
      selectedModel.id ===
      AI_MODELS.DEEPSEEK.CHAT
    ) {
      toast.error(
        "DeepSeek is currently unavailable. Please choose another AI model.",
      );
      return;
    }

    const controller =
      new AbortController();

    abortControllerRef.current =
      controller;

    // Edit & Resend
    if (currentEditingMessageId) {
      const editIndex =
        chatMessages.findIndex(
          (msg) =>
            msg.id ===
            currentEditingMessageId,
        );

      if (editIndex !== -1) {
        setChatMessages((prev) => {
          const updated = [...prev];

          updated[editIndex] = {
            ...updated[editIndex],
            content: userInput,
            attachments: uploadedFiles,
          };

          return updated.slice(
            0,
            editIndex + 1,
          );
        });
      }
    }

    // Normal Send
    else if (!regenerate) {
      const userMessage: ChatMessageData =
        {
          id: crypto.randomUUID(),
          chatId,
          role: "user",
          type: "TEXT",
          content: userInput,
          imageUrl: null,
          model: null,
          attachments: uploadedFiles,
          createdAt: new Date(),
        };

      setChatMessages((prev) => [
        ...prev,
        userMessage,
      ]);
    }

    setInputValue("");

    const aiMessage: ChatMessageData = {
      id: crypto.randomUUID(),
      chatId,
      role: "ai",
      type: "TEXT",
      content: "Thinking....",
      imageUrl: null,
      model: selectedModel.id,
      attachments: [],
      createdAt: new Date(),
    };

    setChatMessages((prev) => [
      ...prev,
      aiMessage,
    ]);

    setStreamingMessageId(
      aiMessage.id,
    );

    const response = await fetch(
      `/api/chat/${chatId}/message`,
      {
        method: "POST",
        headers: {
          "Content-Type":
            "application/json",
        },
        signal: controller.signal,
        body: JSON.stringify({
          content: userInput,
          model: selectedModel.id,
          files: uploadedFiles,
          forceImage,
          ...(currentEditingMessageId && {
            editingMessageId:
              currentEditingMessageId,
          }),
        }),
      },
    );

   if (!response.ok) {
  const error = await response.json();

  setChatMessages((prev) =>
    prev.filter(
      (msg) => msg.id !== aiMessage.id,
    ),
  );

  toast.error(
    error.message ??
      "Something went wrong.",
  );

  return;
}

    if (currentEditingMessageId) {
      setEditingMessageId(null);
    }

    const contentType =
      response.headers.get(
        "content-type",
      ) ?? "";

    // IMAGE RESPONSE
    if (
      contentType.includes(
        "application/json",
      )
    ) {
      const result =
        await response.json();

      if (result.type === "image") {
        setChatMessages((prev) =>
          prev.map((msg) =>
            msg.id === aiMessage.id
              ? {
                  ...msg,
                  type: "IMAGE",
                  content: "",
                  imageUrl:
                    result.imageUrl,
                }
              : msg,
          ),
        );

        return;
      }
    }

    // TEXT STREAM RESPONSE
    if (!response.body) {
      throw new Error(
        "No response stream.",
      );
    }

    const reader =
      response.body.getReader();

    const decoder =
      new TextDecoder();

    let aiText = "";
    let pendingText = "";

    let flushTimeout: ReturnType<
      typeof setTimeout
    > | null = null;

    const flush = () => {
      const text = pendingText;

      pendingText = "";

      aiText += text;

      setChatMessages((prev) =>
        prev.map((msg) =>
          msg.id === aiMessage.id
            ? {
                ...msg,
                content: aiText,
              }
            : msg,
        ),
      );

      flushTimeout = null;
    };

    while (true) {
      if (
        stopStreamingRef.current
      )
        break;

      const {
        done,
        value,
      } = await reader.read();

      if (done) break;

      const chunk =
        decoder.decode(value, {
          stream: true,
        });

      pendingText += chunk;

      if (!flushTimeout) {
        flushTimeout =
          setTimeout(
            flush,
            30,
          );
      }
    }

    if (flushTimeout) {
      clearTimeout(flushTimeout);
    }

    if (pendingText.length > 0) {
      flush();
    }
  } catch (error) {
    if (
      !(
        error instanceof Error
      ) ||
      error.name !==
        "AbortError"
    ) {
      console.error(error);

      toast.error(
        error instanceof Error
          ? error.message
          : "Unable to send your message. Please try again.",
      );
    }
  } finally {
    abortControllerRef.current =
      null;

    stopStreamingRef.current =
      false;

    setIsSending(false);

    setStreamingMessageId(
      null,
    );

    setUploadedFiles([]);
  }
};

  // Stop Streaming

  const handleStop = () => {
    stopStreamingRef.current = true;

    abortControllerRef.current?.abort();

    setChatMessages((prev) =>
      prev.map((msg) =>
        msg.content === "Thinking...."
          ? {
              ...msg,
              content: "Response stopped.",
            }
          : msg,
      ),
    );

    setIsSending(false);
    setStreamingMessageId(null);
  };

  // Regenerate Response

  const handleRegenerate = async (aiMessageId: string) => {
    const aiIndex = chatMessages.findIndex((msg) => msg.id === aiMessageId);

    if (aiIndex <= 0) return;

    const previousUserMessage = [...chatMessages]
      .slice(0, aiIndex)
      .reverse()
      .find((msg) => msg.role === "user");

    if (!previousUserMessage) return;

    setChatMessages((prev) => prev.filter((msg) => msg.id !== aiMessageId));

    await handleSend(previousUserMessage.content ?? "", true, chatMessages[aiIndex].type === "IMAGE");
  };

  // Edit Message

  const handleEdit = (userMessageId: string) => {
    const userMessage = chatMessages.find(
      (msg) => msg.id === userMessageId && msg.role === "user",
    );

    if (!userMessage) return;

    setEditingMessageId(userMessage.id);

    setInputValue(userMessage.content ?? "");
  };

  const uploadFile = async (file: File) => {
    const formData = new FormData();

    formData.append("file", file);

    const response = await fetch(`/api/chat/${chatId}/files`, {
      method: "POST",
      body: formData,
    });

    const text = await response.text();

   

if (!response.ok) {
  let message = "Unable to upload this file.";

  try {
    const data = JSON.parse(text);
    message = data.message ?? message;
  } catch {}

  toast.error(message);
  return;
}

    const uploadedFile = JSON.parse(text);

    setUploadedFiles((prev) => [...prev, uploadedFile]);

    return uploadedFile;
  };

  const removeFile = (fileId: string) => {
    setUploadedFiles((prev) => prev.filter((file) => file.id !== fileId));
  };

  return {
    chatMessages,
    setChatMessages,

    inputValue,
    setInputValue,

    isSending,

    streamingMessageId,

    editingMessageId,

    handleSend,
    handleStop,
    handleRegenerate,
    handleEdit,
    uploadedFiles,
    setUploadedFiles,
    uploadFile,
    removeFile,
  };
}
