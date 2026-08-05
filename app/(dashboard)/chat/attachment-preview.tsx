"use client";

import { Paperclip } from "lucide-react";

type UploadedFile = {
  id: string;
  name: string;
  url: string;
  type: string;
  size: number;
};

interface AttachmentPreviewProps {
  uploadedFiles: UploadedFile[];
  removeFile: (fileId: string) => void;
}

export default function AttachmentPreview({
  uploadedFiles,
  removeFile,
}: AttachmentPreviewProps) {
  if (uploadedFiles.length === 0) {
    return null;
  }

  return (
    <div className="flex flex-wrap gap-2">
      {uploadedFiles.map((file) => (
        <div
          key={file.id}
          className="flex items-center gap-2 rounded-lg border border-white/10 bg-[#242034] px-3 py-2"
        >
          <Paperclip
            size={14}
            className="text-[#7C5CFC]"
          />

          <span className="max-w-[180px] cursor-pointer truncate text-xs text-white">
            {file.name}
          </span>

          <button
            type="button"
            onClick={() => removeFile(file.id)}
            className="ml-1 text-xs text-[#7A748F] transition hover:text-red-400"
          >
            ✕
          </button>
        </div>
      ))}
    </div>
  );
}