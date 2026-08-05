"use client";

import { FileText, X } from "lucide-react";
import { UploadProgressProps } from "./types";

interface Props extends UploadProgressProps {
  onCancel?: () => void;
}

export default function UploadProgress({
  fileName,
  fileSize,
  progress,
  status,
  onCancel,
}: Props) {
  return (
    <div>
      <p className="mb-3 text-[11px] font-semibold uppercase tracking-widest text-[#5C5870]">
        Uploading
      </p>

      <div className="flex items-center gap-4 rounded-xl border border-white/[0.07] bg-[#1C1926] px-4 py-3">
        <FileText
          size={18}
          className="shrink-0 text-[#7C5CFC]"
        />

        <div className="min-w-0 flex-1">
          <p className="truncate text-sm font-medium text-white">
            {fileName}
          </p>

          <p className="text-xs text-[#5C5870]">
            {fileSize} • {status}
          </p>

          <div className="mt-2 h-1 w-full overflow-hidden rounded-full bg-[#2A2640]">
            <div
              className="h-full rounded-full bg-[#7C5CFC] transition-all duration-300"
              style={{
                width: `${progress}%`,
              }}
            />
          </div>
        </div>

        <span className="shrink-0 text-sm text-[#9490A8]">
          {progress}%
        </span>

        <button
          type="button"
          onClick={onCancel}
          className="shrink-0 text-[#5C5870] transition-colors hover:text-white"
        >
          <X size={16} />
        </button>
      </div>
    </div>
  );
}