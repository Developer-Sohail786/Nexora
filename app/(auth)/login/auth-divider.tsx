"use client";

export default function AuthDivider() {
  return (
    <div className="flex items-center gap-3">
      <div className="flex-1 h-px border-white/6" />
      <span className="text-[11px] font-semibold tracking-widest text-[#5C5870]">OR</span>
      <div className="flex-1 h-px border-white/6" />
    </div>
  );
}