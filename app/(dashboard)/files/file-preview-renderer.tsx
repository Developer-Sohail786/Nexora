"use client";

import { Document } from "./types";

import PdfPreview from "./previews/pdf-preview";
import DocxPreview from "./previews/docx-preview";
import MarkdownPreview from "./previews/markdown-preview";
import TextPreview from "./previews/text-preview";
import ImagePreview from "./previews/image-preview";
import UnsupportedPreview from "./previews/unsupported-preview";

interface Props {
  file: Document;
}

export default function FilePreviewRenderer({
  file,
}: Props) {
  switch (file.type.toLowerCase()) {
    case "pdf":
      return <PdfPreview file={file} />;

    case "doc":
    case "docx":
      return <DocxPreview file={file} />;

    case "md":
      return (
        <MarkdownPreview file={file} />
      );

    case "txt":
      return <TextPreview file={file} />;

    case "jpg":
    case "jpeg":
    case "png":
    case "webp":
      return <ImagePreview file={file} />;

    default:
      return (
        <UnsupportedPreview file={file} />
      );
  }
}