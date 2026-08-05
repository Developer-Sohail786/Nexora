"use client";

import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";

import { Download } from "lucide-react";

import { Button } from "@/components/ui/button";

import { Document } from "./types";
import FilePreviewRenderer from "./file-preview-renderer";

interface FilePreviewSheetProps {
  file: Document | null;
  open: boolean;
  onOpenChange: (
    open: boolean,
  ) => void;
}

export default function FilePreviewSheet({
  file,
  open,
  onOpenChange,
}: FilePreviewSheetProps) {
  if (!file) return null;

  return (
    <Sheet
      open={open}
      onOpenChange={onOpenChange}
    >
      <SheetContent className="flex w-[900px] max-w-[90vw] flex-col border-l border-white/10 bg-[#17131F] p-0 text-white">
        <SheetHeader className="border-b border-white/10 px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="min-w-0">
              <SheetTitle className="truncate text-left text-white">
                {file.name}
              </SheetTitle>

              <p className="mt-1 text-xs text-[#7A748F]">
                {file.type.toUpperCase()}
              </p>
            </div>

            <Button
              asChild
              variant="outline"
              className="border-white/10 bg-[#1C1926] text-white hover:bg-white/10"
            >
              <a
                href={file.url}
                target="_blank"
                rel="noopener noreferrer"
              >
                <Download
                  size={16}
                  className="mr-2"
                />
                Download
              </a>
            </Button>
          </div>
        </SheetHeader>

        <div className="flex-1 overflow-hidden bg-[#111018]">
          <FilePreviewRenderer
            file={file}
          />
        </div>
      </SheetContent>
    </Sheet>
  );
}