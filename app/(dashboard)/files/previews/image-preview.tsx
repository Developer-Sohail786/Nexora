"use client";

import Image from "next/image";

import { Document } from "../types";

interface Props {
  file: Document;
}

export default function ImagePreview({
  file,
}: Props) {
  return (
    <div className="relative h-full w-full bg-[#111018]">
      <Image
        src={file.url}
        alt={file.name}
        fill
        className="object-contain"
      />
    </div>
  );
}