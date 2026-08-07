"use client";

import { motion } from "framer-motion";

import {
  slideUpVariants,
  itemVariants,
} from "@/lib/animations";

import { useFileUpload } from "@/hooks/use-file-upload";

import {
  File,
  FileClock,
} from "lucide-react";

import EmptyState from "@/components/ui/empty-state";

export default function ProcessingFiles() {
  const {
    isUploading,
    uploadProgress,
    uploadFileName,
  } = useFileUpload();

  return (
    <motion.section
      variants={slideUpVariants}
      initial="hidden"
      animate="visible"
      className="bg-[#111018] px-6"
    >
      <h2 className="mb-4 text-lg font-semibold text-white">
        Processing Files
      </h2>

      <motion.div
        variants={itemVariants}
        whileHover={{
          y: -3,
          transition: {
            duration: 0.2,
          },
        }}
        className="flex flex-col gap-5 rounded-xl border border-white/[0.07] bg-[#1C1926] p-4"
      >
        {!isUploading ? (
          <EmptyState
            icon={
              <FileClock className="h-8 w-8 text-[#7C5CFC]" />
            }
            title="No active uploads"
            description="Upload a document to build your AI knowledge base."
          />
        ) : (
          <div>
            <div className="mb-2 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <File
                  size={15}
                  className="shrink-0 text-[#7C5CFC]"
                />

                <span className="text-xs font-medium text-white">
                  {uploadFileName}
                </span>
              </div>

              <span className="text-xs text-[#9490A8]">
                {uploadProgress}%
              </span>
            </div>

            <div className="h-2 w-full overflow-hidden rounded-full bg-[#2A2640]">
              <motion.div
                className="h-full rounded-full bg-[#7C5CFC]"
                animate={{
                  width: `${uploadProgress}%`,
                }}
                transition={{
                  duration: 0.3,
                }}
              />
            </div>

            <p className="mt-2 text-xs text-[#5C5870]">
              {uploadProgress === 100
                ? "Completed"
                : "Processing document for AI knowledge base..."}
            </p>
          </div>
        )}

        <div>
          <div className="mb-1.5 flex items-center justify-between">
            <div className="flex items-center gap-2" />

            <span className="text-xs text-[#5C5870]">
              Queued
            </span>
          </div>

          <p className="text-[11px] text-[#5C5870]">
            Waiting for compute resources.
          </p>
        </div>
      </motion.div>
    </motion.section>
  );
}