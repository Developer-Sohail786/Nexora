"use client";

import {
  useEffect,
  useRef,
  type Dispatch,
  type KeyboardEvent,
  type SetStateAction,
} from "react";

import {
  Globe,
  Lock,
  Mic,
  Send,
  Square,
} from "lucide-react";

import { toast } from "sonner";

import type { AIModel } from "@/services/ai/types";
import type { Attachment } from "@/types/chat";

import AttachmentPreview from "./attachment-preview";
import FileUploadButton from "./file-upload-btn";
import ModelSelector from "./model-selecter";

type ModelOption = {
  id: AIModel;
  name: string;
};

type UploadedFile = {
  id: string;
  name: string;
  url: string;
  type: string;
  size: number;
};

type ChatInputProps = {
  inputValue: string;
  setInputValue: Dispatch<SetStateAction<string>>;

  uploadedFiles: UploadedFile[];

  uploadFile: (
    file: File,
  ) => Promise<Attachment>;

  removeFile: (fileId: string) => void;

  isSending: boolean;
  isPro: boolean;

  handleSend: (
    prompt?: string,
    regenerate?: boolean,
    forceImage?: boolean,
  ) => Promise<void>;

  handleStop: () => void;

  models: ModelOption[];

  selectedModel: ModelOption;
  setSelectedModel: Dispatch<
    SetStateAction<ModelOption>
  >;

  showModels: boolean;
  setShowModels: Dispatch<
    SetStateAction<boolean>
  >;
};

export default function ChatInput({
  inputValue,
  setInputValue,
  uploadedFiles,
  uploadFile,
  removeFile,
  isSending,
  handleSend,
  handleStop,
  models,
  selectedModel,
  setSelectedModel,
  showModels,
  setShowModels,
  isPro,
}: ChatInputProps) {
  const textareaRef =
    useRef<HTMLTextAreaElement>(null);

  const adjustTextareaHeight = () => {
    const textarea = textareaRef.current;

    if (!textarea) return;

    textarea.style.height = "auto";

    const maxHeight = 160;

    textarea.style.height = `${Math.min(
      textarea.scrollHeight,
      maxHeight,
    )}px`;

    textarea.style.overflowY =
      textarea.scrollHeight > maxHeight
        ? "auto"
        : "hidden";
  };

  useEffect(() => {
    adjustTextareaHeight();
  }, [inputValue]);

  useEffect(() => {
    function handleShortcut(
      e: globalThis.KeyboardEvent,
    ) {
      if (
        (e.ctrlKey || e.metaKey) &&
        e.key.toLowerCase() === "k"
      ) {
        e.preventDefault();
        textareaRef.current?.focus();
      }
    }

    window.addEventListener(
      "keydown",
      handleShortcut,
    );

    return () => {
      window.removeEventListener(
        "keydown",
        handleShortcut,
      );
    };
  }, []);

  useEffect(() => {
    function handleGlobalTyping(
      e: globalThis.KeyboardEvent,
    ) {
      const target =
        e.target as HTMLElement;

      if (
        target.tagName === "INPUT" ||
        target.tagName === "TEXTAREA" ||
        target.isContentEditable
      ) {
        return;
      }

      if (
        e.ctrlKey ||
        e.metaKey ||
        e.altKey
      ) {
        return;
      }

      if (e.key.length !== 1) {
        return;
      }

      textareaRef.current?.focus();

      setInputValue(
        (prev) => prev + e.key,
      );

      e.preventDefault();
    }

    window.addEventListener(
      "keydown",
      handleGlobalTyping,
    );

    return () => {
      window.removeEventListener(
        "keydown",
        handleGlobalTyping,
      );
    };
  }, [setInputValue]);

  const handleKeyDown = (
    e: KeyboardEvent<HTMLTextAreaElement>,
  ) => {
    if (
      e.key === "Enter" &&
      !e.shiftKey
    ) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="space-y-2">
      <div className="rounded-2xl border border-white/[0.08] bg-[#1C1926] px-4 py-3">
        <div className="flex flex-col gap-3">
          <ModelSelector
            isPro={isPro}
            models={models}
            selectedModel={selectedModel}
            setSelectedModel={setSelectedModel}
            showModels={showModels}
            setShowModels={setShowModels}
          />

          <AttachmentPreview
            uploadedFiles={uploadedFiles}
            removeFile={removeFile}
          />

          <div className="flex items-end gap-3">
            <textarea
              ref={textareaRef}
              aria-label="Message input"
              rows={1}
              value={inputValue}
              onChange={({ target }) =>
                setInputValue(target.value)
              }
              onKeyDown={handleKeyDown}
              placeholder="Message Nexora AI..."
             className="max-h-40 flex-1 resize-none overflow-y-auto bg-transparent text-sm leading-relaxed text-white outline-none placeholder:text-[#5C5870] focus:outline-none focus:ring-1 focus:ring-white/20 focus:ring-offset-0"
            />

            <FileUploadButton
              uploadFile={uploadFile}
            />

            <button
              type="button"
              aria-label="Voice input"
              className="shrink-0 text-[#7A748F] transition-colors hover:text-white focus:outline-none focus:ring-2 focus:ring-[#7C5CFC] focus:ring-offset-2 focus:ring-offset-[#111018]"
            >
              <Mic
                aria-hidden="true"
                size={17}
              />
            </button>
          </div>
        </div>
      </div>

      <div className="flex items-center justify-between px-1">
        <button
          type="button"
          aria-label="Toggle web search"
          onClick={() => {
            if (!isPro) {
              toast.info(
                "Web Search is available with Nexora Pro.",
              );
              return;
            }
          }}
          className={`flex items-center gap-1.5 text-xs transition-colors focus:outline-none focus:ring-2 focus:ring-[#7C5CFC] focus:ring-offset-2 focus:ring-offset-[#111018] ${
            isPro
              ? "text-[#7A748F] hover:text-white"
              : "text-[#5C5870]"
          }`}
        >
          <Globe
            aria-hidden="true"
            size={13}
          />

          <span>Web Search</span>

          {!isPro && (
            <Lock
              aria-hidden="true"
              size={11}
              className="text-[#FACC15]"
            />
          )}
        </button>

        {isSending ? (
          <button
            type="button"
            aria-label="Stop generating response"
            onClick={handleStop}
            className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#2A2640] text-[#7C5CFC] shadow-[0_0_12px_rgba(124,92,252,0.25)] transition-all hover:bg-[#35304F] active:scale-95 focus:outline-none focus:ring-2 focus:ring-[#7C5CFC] focus:ring-offset-2 focus:ring-offset-[#111018]"
          >
            <Square
              aria-hidden="true"
              size={14}
              fill="currentColor"
            />
          </button>
        ) : (
          <button
            type="button"
            aria-label="Send message"
            onClick={() => handleSend()}
            disabled={!inputValue.trim()}
            className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#7C5CFC] text-white shadow-[0_0_12px_rgba(124,92,252,0.4)] transition-all hover:bg-[#6B4EE8] active:scale-95 disabled:cursor-not-allowed disabled:opacity-50 focus:outline-none focus:ring-2 focus:ring-[#7C5CFC] focus:ring-offset-2 focus:ring-offset-[#111018]"
          >
            <Send
              aria-hidden="true"
              size={14}
            />
          </button>
        )}
      </div>

      <p className="text-center text-[10px] text-[#3E3A52]">
        Nexora AI can make mistakes. Consider verifying important information.
      </p>
    </div>
  );
}