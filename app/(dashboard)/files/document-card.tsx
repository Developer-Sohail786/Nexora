"use client";

import {
  File,
  FileCode,
  FileText,
} from "lucide-react";

import { format } from "date-fns";

import FileActions from "./file-actions";
import { DocumentCardProps } from "./types";

function getIcon(type: string) {
  switch (type.toLowerCase()) {
    case "pdf":
      return (
        <FileText
          size={18}
          className="text-orange-400"
        />
      );

    case "md":
      return (
        <FileCode
          size={18}
          className="text-blue-400"
        />
      );

    case "txt":
      return (
        <File
          size={18}
          className="text-[#9490A8]"
        />
      );

    case "doc":
    case "docx":
      return (
        <FileText
          size={18}
          className="text-sky-400"
        />
      );

    default:
      return (
        <File
          size={18}
          className="text-[#9490A8]"
        />
      );
  }
}

function formatSize(size: number) {
  if (size < 1024) {
    return `${size} B`;
  }

  if (size < 1024 * 1024) {
    return `${(size / 1024).toFixed(1)} KB`;
  }

  return `${(size / 1024 / 1024).toFixed(2)} MB`;
}

export default function DocumentCard({
  file,
  onPreview,
}: DocumentCardProps) {
  return (
    <div
      onClick={() => onPreview(file)}
      className="cursor-pointer rounded-xl border border-white/[0.07] bg-[#1C1926] p-5 transition-all hover:border-white/15 hover:bg-[#222030]"
    >
      <div className="mb-4 flex items-start justify-between">
        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-[#2A2640]">
          {getIcon(file.type)}
        </div>

        <div
          onClick={(e) => e.stopPropagation()}
        >
          <FileActions file={file} />
        </div>
      </div>

      <p className="mb-3 truncate text-sm font-semibold text-white">
        {file.name}
      </p>

      <div className="mb-4 flex flex-wrap gap-1.5">
        <span className="rounded-md bg-[#2A2640] px-2 py-0.5 text-[11px] text-[#9490A8]">
          {file.type.toUpperCase()}
        </span>

        <span className="rounded-md bg-[#2A2640] px-2 py-0.5 text-[11px] text-[#9490A8]">
          RAG Ready
        </span>
      </div>

      <div className="flex items-center justify-between text-xs text-[#5C5870]">
        <span>{formatSize(file.size)}</span>

        <span>
          {format(
            new Date(file.createdAt),
            "MMM dd, yyyy",
          )}
        </span>
      </div>
    </div>
  );
}