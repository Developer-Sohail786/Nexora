"use client";

import { useState } from "react";
import Link from "next/link";
import {
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

import DocumentCard from "./document-card";
import FilePreviewSheet from "./file-preview-sheet";

import {
  Document,
  RecentDocumentsProps,
} from "./types";

interface Props
  extends RecentDocumentsProps {
  view?: "grid" | "list";
  page: number;
  totalPages: number;
}

export default function RecentDocuments({
  files,
  view = "grid",
  page,
  totalPages,
}: Props) {
  const [
    selectedFile,
    setSelectedFile,
  ] = useState<Document | null>(
    null,
  );

  return (
    <div>
      <p className="mb-3 text-[11px] font-semibold uppercase tracking-widest text-[#5C5870]">
        Recent Documents
      </p>

      {files.length === 0 ? (
        <div className="rounded-xl border border-dashed border-white/10 bg-[#1C1926] py-16 text-center">
          <p className="text-lg font-medium text-white">
            No documents found
          </p>

          <p className="mt-2 text-sm text-[#7A748F]">
            Upload your first document
            to build your knowledge
            base.
          </p>
        </div>
      ) : (
        <>
          <div
            className={
              view === "grid"
                ? "grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3"
                : "space-y-3"
            }
          >
            {files.map((file) => (
              <DocumentCard
                key={file.id}
                file={file}
                onPreview={
                  setSelectedFile
                }
              />
            ))}
          </div>

          {totalPages > 1 && (
            <div className="mt-8 flex items-center justify-center gap-2">
              <Link
                href={`/files?page=${page - 1}`}
                className={`flex items-center gap-1 rounded-lg border border-white/10 px-3 py-2 text-sm transition ${
                  page === 1
                    ? "pointer-events-none opacity-40"
                    : "hover:bg-white/5"
                }`}
              >
                <ChevronLeft
                  size={16}
                />
                Previous
              </Link>

              {Array.from(
                {
                  length:
                    totalPages,
                },
                (_, index) =>
                  index + 1,
              ).map(
                (pageNumber) => (
                  <Link
                    key={
                      pageNumber
                    }
                    href={`/files?page=${pageNumber}`}
                    className={`flex h-10 w-10 items-center justify-center rounded-lg text-sm transition ${
                      pageNumber ===
                      page
                        ? "bg-[#7C5CFC] text-white"
                        : "border border-white/10 text-[#A09BB5] hover:bg-white/5"
                    }`}
                  >
                    {pageNumber}
                  </Link>
                ),
              )}

              <Link
                href={`/files?page=${page + 1}`}
                className={`flex items-center gap-1 rounded-lg border border-white/10 px-3 py-2 text-sm transition ${
                  page ===
                  totalPages
                    ? "pointer-events-none opacity-40"
                    : "hover:bg-white/5"
                }`}
              >
                Next
                <ChevronRight
                  size={16}
                />
              </Link>
            </div>
          )}
        </>
      )}

      <FilePreviewSheet
        file={selectedFile}
        open={!!selectedFile}
        onOpenChange={(
          open,
        ) => {
          if (!open) {
            setSelectedFile(
              null,
            );
          }
        }}
      />
    </div>
  );
}