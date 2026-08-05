"use client";

import { FileQuestion } from "lucide-react";

import { Document } from "../types";

interface Props {
  file: Document;
}

export default function UnsupportedPreview({
  file,
}: Props) {
  return (
    <div className="flex h-full flex-col items-center justify-center gap-4 text-center">
      <FileQuestion
        size={56}
        className="text-[#7C5CFC]"
      />

      <h3 className="text-xl font-semibold text-white">
        Preview unavailable
      </h3>

      <p className="max-w-sm text-sm text-[#7A748F]">
        Preview is not supported for{" "}
        <span className="font-medium text-white">
          {file.type.toUpperCase()}
        </span>{" "}
        files yet.
      </p>
    </div>
  );
}