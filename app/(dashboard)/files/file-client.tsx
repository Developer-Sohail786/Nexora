"use client";

import { useMemo, useState } from "react";
import DocumentsHeader from "./documents-header";
import UploadZone from "./upload-zone";
import UploadProgress from "./upload-progress";
import RecentDocuments from "./recent-documents";

import { Document } from "./types";
import { useFileUpload } from "@/hooks/use-file-upload";

interface FileClientProps {
  files: Document[];
  page: number;
  totalPages: number;
}

export default function FileClient({
  files,
  page,
  totalPages,
}: FileClientProps){
  
  const {
  upload,
  cancelUpload,
  isUploading,
  uploadProgress,
  uploadFileName,
  uploadFileSize,
} = useFileUpload();

  const [search, setSearch] = useState("");
  const [view, setView] = useState<"grid" | "list">("grid");



  const filteredFiles = useMemo(() => {
    return files.filter((file) =>
      file.name.toLowerCase().includes(search.toLowerCase()),
    );
  }, [files, search]);



  return (
    <main className="flex-1 space-y-8 px-10 py-10">
      <DocumentsHeader
        search={search}
        onSearchChange={setSearch}
        view={view}
        onViewChange={setView}
      />

      <UploadZone onUpload={upload} />

      {isUploading && (
       <UploadProgress
  fileName={uploadFileName}
  fileSize={uploadFileSize}
  progress={uploadProgress}
  status={
    uploadProgress === 100
      ? "Completed"
      : "Processing for RAG..."
  }
onCancel={cancelUpload}
/>
      )}

  <RecentDocuments
  files={filteredFiles}
  view={view}
  page={page}
  totalPages={totalPages}
/>
    </main>
  );
}