"use client";

import { Copy, ThumbsUp, ThumbsDown, RotateCcw } from "lucide-react";

export default function ActionButtons() {
  return (
    <div className="flex items-center gap-1 mt-3">
      <button className="p-1.5 text-[#5C5870] hover:text-white transition-colors rounded-md hover:bg-white/5">
        <Copy size={14} />
      </button>
      <button className="p-1.5 text-[#5C5870] hover:text-white transition-colors rounded-md hover:bg-white/5">
        <ThumbsUp size={14} />
      </button>
      <button className="p-1.5 text-[#5C5870] hover:text-white transition-colors rounded-md hover:bg-white/5">
        <ThumbsDown size={14} />
      </button>
      <button className="p-1.5 text-[#5C5870] hover:text-white transition-colors rounded-md hover:bg-white/5">
        <RotateCcw size={14} />
      </button>
    </div>
  );
}