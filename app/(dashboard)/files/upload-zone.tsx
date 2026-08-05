"use client";

import { useRef } from "react";
import { UploadCloud } from "lucide-react";

import { UploadZoneProps } from "./types";

export default function UploadZone({
  onUpload,
}: UploadZoneProps) {
  const inputRef = useRef<HTMLInputElement>(null);

  function handleBrowse() {
    inputRef.current?.click();
  }

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement>,
  ) {
    const file = e.target.files?.[0];

    if (!file) return;

    onUpload(file);

    e.target.value = "";
  }

  function handleDrop(
    e: React.DragEvent<HTMLDivElement>,
  ) {
    e.preventDefault();

    const file = e.dataTransfer.files?.[0];

    if (!file) return;

    onUpload(file);
  }

  function handleDragOver(
    e: React.DragEvent<HTMLDivElement>,
  ) {
    e.preventDefault();
  }

  return (
    <div
      onDrop={handleDrop}
      onDragOver={handleDragOver}
      className="rounded-2xl border-2 border-dashed border-white/10 bg-[#1C1926]/50 px-6 py-16 text-center"
    >
      <input
        ref={inputRef}
        type="file"
        className="hidden"
        accept=".pdf,.doc,.docx,.txt,.md"
        onChange={handleChange}
      />

      <div className="mb-5 flex justify-center">
        <div className="flex h-16 w-16 items-center justify-center rounded-full bg-[#2A2640]">
          <UploadCloud
            size={28}
            className="text-[#7A748F]"
          />
        </div>
      </div>

      <h2 className="mb-2 text-xl font-semibold text-white">
        Drag & drop files here
      </h2>

      <p className="mb-6 text-sm text-[#7A748F]">
        Support for PDF, DOCX, TXT and MD
      </p>

      <button
        onClick={handleBrowse}
        className="rounded-lg border border-white/[0.07] bg-transparent px-6 py-2.5 text-sm font-medium text-white transition-colors hover:bg-white/5"
      >
        Browse Files
      </button>
    </div>
  );
}