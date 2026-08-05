"use client";

import { useFileUpload } from "@/hooks/use-file-upload";
import {  File } from "lucide-react";

export default function ProcessingFiles() {
  const{
    isUploading,
    uploadProgress,
    uploadFileName,
  }= useFileUpload()
  return (
    <section className="bg-[#111018] px-6">
      <h2 className="mb-4 text-lg font-semibold text-white">Processing Files</h2>

      <div className="rounded-xl border border-white/[0.07] bg-[#1C1926] p-4 flex flex-col gap-5">
        {!isUploading? (<div className="py-6 text-center"><p className="text-sm text-[#7A748F]">No files are currently being processed</p></div>):(
        <div>
          <div className="mb-2 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <File size={15} className="shrink-0 text-[#7C5CFC]" />
              <span className="text-xs font-medium text-white">{uploadFileName}</span>
            </div>
            <span className="text-xs text-[#9490A8]">{uploadProgress}%</span>
          </div>
          <div className="h-2 w-full overflow-hidden rounded-full bg-[#2A2640]" >
             <div
                className="h-full rounded-full bg-[#7C5CFC] transition-all duration-300"
                style={{
                  width: `${uploadProgress}%`,
                }}
              />
          </div>
          <p className="mt-2 text-xs text-[#5C5870]">{uploadProgress===100?"Completed":"Processing document for AI knowledge base..."}</p>
        </div>
)}
        <div>
          <div className="mb-1.5 flex items-center justify-between">
            <div className="flex items-center gap-2">
              
              
            </div>
            <span className="text-xs text-[#5C5870]">Queued</span>
          </div>
          <p className="text-[11px] text-[#5C5870]">Waiting for compute resources.</p>
        </div>

      </div>
    </section>
  );
}