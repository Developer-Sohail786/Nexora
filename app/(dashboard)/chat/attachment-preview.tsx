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
  aria-hidden="true"
  size={14}
  className="text-[#7C5CFC]"
/>

         <span
  title={file.name}
  className="max-w-[180px] cursor-pointer truncate text-xs text-white"
>
            {file.name}
          </span>

         <button
  type="button"
  aria-label={`Remove ${file.name}`}
  onClick={() => removeFile(file.id)}
  className="ml-1 rounded text-xs text-[#7A748F] transition hover:text-red-400 focus:outline-none focus:ring-2 focus:ring-[#7C5CFC] focus:ring-offset-2 focus:ring-offset-[#111018]"
>
  <span aria-hidden="true">✕</span>
</button>
        </div>
      ))}
    </div>
  );
}