"use client";

export default function TypingIndicator() {
  return (
    <div className="flex gap-3">
      <div className="h-7 w-7 shrink-0 rounded-full bg-[#7C5CFC] flex items-center justify-center text-[10px] font-bold text-white">
        N
      </div>
      <div className="flex items-center gap-1.5 rounded-2xl rounded-tl-sm bg-[#1C1926] px-4 py-3">
        <span className="h-1.5 w-1.5 rounded-full bg-[#7C5CFC] animate-bounce [animation-delay:0ms]" />
        <span className="h-1.5 w-1.5 rounded-full bg-[#7C5CFC] animate-bounce [animation-delay:150ms]" />
        <span className="h-1.5 w-1.5 rounded-full bg-[#7C5CFC] animate-bounce [animation-delay:300ms]" />
      </div>
    </div>
  );
}