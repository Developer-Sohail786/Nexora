"use client";

import { Document } from "../types";

interface Props {
  file: Document;
}

export default function PdfPreview({
  file,
}: Props) {
  return (
    <iframe
      src={`/api/files/${file.id}/preview`}
      title={file.name}
      className="h-full w-full border-0"
    />
  );
}