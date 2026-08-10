"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { Check, Copy, Download, X, RotateCcw } from "lucide-react";
import { toast } from "sonner";

interface ImageModalProps {
  open: boolean;
  imageUrl: string;
  onClose: () => void;
  onRegenrate?: () => void;
}

export default function ImageModal({
  open,
  imageUrl,
  onClose,
  onRegenrate,
}: ImageModalProps) {
  const [copied, setCopied] = useState(false);

  // Close with Escape
  useEffect(() => {
    if (!open) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [open, onClose]);

  // Prevent background scrolling
  useEffect(() => {
    if (!open) return;

    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  function handleDownload() {
    const link = document.createElement("a");

    link.href = imageUrl;
    link.download = `nexora-ai-${Date.now()}.png`;

    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

   toast.success("Image downloaded successfully.");
  }

  async function handleCopy() {
    try {
      const response = await fetch(imageUrl);
      const blob = await response.blob();

      await navigator.clipboard.write([
        new ClipboardItem({
          [blob.type]: blob,
        }),
      ]);

      setCopied(true);
      toast.success("Image copied to clipboard.");

      setTimeout(() => {
        setCopied(false);
      }, 2000);
    } catch (error) {
      console.error(error);
toast.error("Unable to copy the image. Please try again.");    }
  }

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-4 backdrop-blur-sm"
          onClick={onClose}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
        >
          <motion.div
            className="relative flex flex-col items-center"
            onClick={(e) => e.stopPropagation()}
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.95, opacity: 0 }}
            transition={{
              type: "spring",
              stiffness: 260,
              damping: 24,
            }}
          >
            <button
              onClick={onClose}
              className="absolute -top-12 right-0 rounded-full bg-zinc-800/90 p-2 text-white transition hover:bg-zinc-700"
            >
              <X className="h-5 w-5" />
            </button>

            <Image
              src={imageUrl}
              alt="Generated image"
              width={1024}
              height={1024}
              priority
              unoptimized
              className="h-auto max-h-[90vh] w-auto rounded-xl object-contain shadow-2xl"
            />

            <div className="mt-5 flex flex-wrap items-center justify-center gap-3">
              <button
                onClick={handleDownload}
                className=" cursor-pointer flex items-center gap-2 rounded-lg bg-[#7C5CFC] px-4 py-2 text-sm font-medium text-white transition hover:bg-[#6C4AF8]"
              >
                <Download size={18} />
                Download
              </button>

              <button
                onClick={handleCopy}
                className="flex cursor-pointer items-center gap-2 rounded-lg border border-[#2B2B35] bg-[#18181B] px-4 py-2 text-sm font-medium text-white transition hover:bg-[#27272A]"
              >
                {copied ? (
                  <>
                    <Check size={18} />
                    Copied
                  </>
                ) : (
                  <>
                    <Copy size={18} />
                    Copy
                  </>
                )}
              </button>
              <button
                onClick={() => {
                  onClose();
                  onRegenrate?.();
                }}
                className="flex cursor-pointer items-center gap-2 rounded-lg border border-[#2B2B35] bg-[#18181B] px-4 py-2 text-sm font-medium text-white transition hover:bg-[#27272A]"
              >
                <RotateCcw size={18} />
                Regenrate
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
