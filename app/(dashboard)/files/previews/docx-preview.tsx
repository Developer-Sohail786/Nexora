"use client";

import { Document } from "../types";

interface Props {
  file: Document;
}

export default function DocxPreview({
  file,
}: Props) {
  return (
    <div className="h-full overflow-y-auto bg-[#111018] p-6">
      <pre className="whitespace-pre-wrap text-sm leading-7 text-[#D6D3E3]">
        {file.content ??
          "No preview available."}
      </pre>
    </div>
  );
}