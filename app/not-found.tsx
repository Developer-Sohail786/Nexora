"use client";


import { LayoutDashboard, Headphones } from "lucide-react";

 export default function NotFound() {
  return (
    <div className="relative flex min-h-screen flex-col items-center justify-center bg-[#0A0810] overflow-hidden px-4">

      {/* Ambient glow */}
      <div className="pointer-events-none absolute top-1/4 left-1/2 -translate-x-1/2 h-64 w-64 rounded-full bg-[#7C5CFC]/10 blur-[80px]" />
      <div className="pointer-events-none absolute top-1/3 left-1/2 -translate-x-1/2 h-10 w-10 rounded-full bg-[#CC44FF]/60 blur-[20px]" />

      {/* Astronaut illustration */}
      <div className="relative mb-8 flex flex-col items-center">
        <div className="relative flex h-48 w-64 items-center justify-center">

          {/* Platform glow */}
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 h-3 w-40 rounded-full bg-[#7C5CFC]/30 blur-md" />
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 h-1 w-24 rounded-full bg-[#CC44FF]/60 blur-sm" />

          {/* Astronaut SVG */}
          <svg viewBox="0 0 120 160" className="h-44 w-44 drop-shadow-[0_0_24px_rgba(124,92,252,0.4)]" fill="none" xmlns="http://www.w3.org/2000/svg">
            {/* Helmet */}
            <ellipse cx="60" cy="45" rx="22" ry="24" fill="#2A2440" stroke="#5B4E8A" strokeWidth="1.5" />
            <ellipse cx="60" cy="44" rx="14" ry="15" fill="#1A1428" stroke="#7C5CFC" strokeWidth="0.8" opacity="0.6" />
            {/* Body */}
            <rect x="42" y="66" width="36" height="42" rx="10" fill="#2A2440" stroke="#5B4E8A" strokeWidth="1.5" />
            {/* Arms */}
            <rect x="24" y="68" width="18" height="10" rx="5" fill="#2A2440" stroke="#5B4E8A" strokeWidth="1.5" />
            <rect x="78" y="68" width="18" height="10" rx="5" fill="#2A2440" stroke="#5B4E8A" strokeWidth="1.5" />
            {/* Legs */}
            <rect x="46" y="106" width="12" height="22" rx="6" fill="#2A2440" stroke="#5B4E8A" strokeWidth="1.5" />
            <rect x="62" y="106" width="12" height="22" rx="6" fill="#2A2440" stroke="#5B4E8A" strokeWidth="1.5" />
            {/* Chest detail */}
            <rect x="52" y="76" width="16" height="10" rx="3" fill="#1A1428" stroke="#7C5CFC" strokeWidth="0.8" opacity="0.7" />
            {/* Slash / disconnected symbol */}
            <line x1="30" y1="20" x2="95" y2="145" stroke="#7C5CFC" strokeWidth="2.5" strokeLinecap="round" opacity="0.5" />
            <line x1="95" y1="20" x2="30" y2="145" stroke="#7C5CFC" strokeWidth="2.5" strokeLinecap="round" opacity="0.5" />
          </svg>
        </div>
      </div>

      {/* Card */}
      <div className="w-full max-w-lg rounded-2xl border-l-2 border-l-[#7C5CFC] border-t border-r border-b border-white/[0.07] bg-[#16121F] px-10 py-10 text-center shadow-[0_0_60px_rgba(124,92,252,0.08)]">
        <p className="text-7xl font-bold text-white tracking-tight mb-2">404</p>
        <p className="text-xl font-semibold text-[#7C5CFC] mb-4">Page not found</p>
        <p className="text-sm text-[#7A748F] leading-relaxed max-w-sm mx-auto mb-8">
          The neural pathway you are trying to access seems to be disconnected or doesn&apos;t exist in our current spatial mapping.
        </p>

        <div className="flex items-center justify-center gap-3">
          <a
            href="/dashboard"
            className="flex items-center gap-2 rounded-lg bg-[#7C5CFC] px-5 py-2.5 text-sm font-semibold text-white shadow-[0_0_16px_rgba(124,92,252,0.35)] hover:bg-[#6B4EE8] transition-all active:scale-[0.98]"
          >
            <LayoutDashboard size={15} />
            Back to Dashboard
          </a>
          <a
            href="/support"
            className="flex items-center gap-2 rounded-lg border border-white/[0.07] bg-[#1C1926] px-5 py-2.5 text-sm font-medium text-white hover:bg-white/5 transition-colors"
          >
            <Headphones size={15} />
            Contact Support
          </a>
        </div>
      </div>

    </div>
  );
}