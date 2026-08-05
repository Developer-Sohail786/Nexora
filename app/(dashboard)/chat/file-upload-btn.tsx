"use client";

import { useRef } from "react";
import { Paperclip } from "lucide-react";
import type { Attachment } from "@/types/chat";

type FileUploadButtonProps = {
  uploadFile: (
    file: File,
  ) => Promise<Attachment>;
};

export default function FileUploadButton({
  uploadFile,
}: FileUploadButtonProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);

  return (
    <>
      <input
        ref={fileInputRef}
        type="file"
        accept=".pdf,.doc,.docx,.txt"
        className="hidden"
        onChange={async (e) => {
          const file = e.target.files?.[0];

          if (!file) return;

          try {
            await uploadFile(file);
          } finally {
            e.target.value = "";
          }
        }}
      />

      <button
        type="button"
        onClick={() => fileInputRef.current?.click()}
        className="shrink-0 cursor-pointer text-[#7A748F] transition-colors hover:text-white"
      >
        <Paperclip size={17} />
      </button>
    </>
  );
}