"use client";

import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

import { Document } from "../types";

interface Props {
  file: Document;
}

export default function MarkdownPreview({
  file,
}: Props) {
  return (
    <div className="prose prose-invert max-w-none overflow-y-auto p-8">
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
      >
        {file.content ??
          "No preview available."}
      </ReactMarkdown>
    </div>
  );
}