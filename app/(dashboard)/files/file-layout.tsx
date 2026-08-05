import FileClient from "./file-client";
import { Document } from "./types";

interface FileLayoutProps {
  files: Document[];
  page: number;
  totalPages: number;
}

export default function FileLayout({
  files,
  page,
  totalPages,
}: FileLayoutProps) {
  return (
    <FileClient
      files={files}
      page={page}
      totalPages={totalPages}
    />
  );
}