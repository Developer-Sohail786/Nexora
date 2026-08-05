"use client";

import { useUpload } from "@/components/providers/upload-provider";

export function useFileUpload() {
  return useUpload();
}