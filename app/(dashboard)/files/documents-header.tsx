"use client";

import { Search, LayoutGrid, List } from "lucide-react";
import { DocumentsHeaderProps } from "./types";

export default function DocumentsHeader({
  search,
  onSearchChange,
  view,
  onViewChange,
}: DocumentsHeaderProps) {
  return (
    <div className="flex items-start justify-between">
      <div>
        <h1 className="text-4xl font-bold text-white">
          Knowledge Base
        </h1>

        <p className="mt-2 text-sm text-[#7A748F]">
          Upload documents to expand your RAG semantic search context.
        </p>
      </div>

      <div className="flex items-center gap-2">
        <div className="flex items-center gap-2 rounded-lg border border-white/[0.07] bg-[#1C1926] px-3 py-2">
          <Search
            size={14}
            className="text-[#5C5870]"
          />

          <input
            value={search}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder="Search files..."
            className="w-44 bg-transparent text-sm text-white placeholder-[#5C5870] outline-none"
          />
        </div>

        <button
          onClick={() => onViewChange("grid")}
          className={`rounded-lg border border-white/[0.07] p-2 transition-colors ${
            view === "grid"
              ? "bg-[#7C5CFC] text-white"
              : "bg-[#1C1926] text-[#7A748F] hover:text-white"
          }`}
        >
          <LayoutGrid size={16} />
        </button>

        <button
          onClick={() => onViewChange("list")}
          className={`rounded-lg border border-white/[0.07] p-2 transition-colors ${
            view === "list"
              ? "bg-[#7C5CFC] text-white"
              : "bg-[#1C1926] text-[#7A748F] hover:text-white"
          }`}
        >
          <List size={16} />
        </button>
      </div>
    </div>
  );
}