"use client";
import Link from "next/link";
import { useSession } from "next-auth/react";

export default function HeroSection() {
  const {status}=useSession()
  return (
    <section className="flex flex-col items-center text-center px-6 pt-24 pb-16 bg-[#111018]">
      <h1 className="text-xl md:text-6xl font-bold text-white max-w-3xl leading-tight">
        Your AI Workspace for Chat, Code & Documents
      </h1>
      <p className="mt-6 text-sm text-[#b3afc0] max-w-md leading-relaxed">
        A multi-purpose AI assistant that understands your documents and assists with complex coding tasks. Designed for deep focus and high-velocity productivity.
      </p>
      <div className="mt-8 flex items-center gap-3">
        {status==="authenticated"?(
            <Link
      href="/dashboard"
    className="rounded-lg bg-[#7C5CFC] px-6 py-3 text-sm font-semibold text-white shadow-[0_0_16px_rgba(124,92,252,0.35)] hover:bg-[#6B4EE8] transition-all active:scale-[0.98]"
    >
      Get Started
    </Link>
        ):(
        <Link
      href="/register"
    className="rounded-lg bg-[#7C5CFC] px-6 py-3 text-sm font-semibold text-white shadow-[0_0_16px_rgba(124,92,252,0.35)] hover:bg-[#6B4EE8] transition-all active:scale-[0.98]"
    >
      Get Started
    </Link>
    )
    }
        <a
          href="#"
          className="rounded-lg border border-white/[0.07] px-6 py-3 text-sm font-medium text-white hover:bg-white/5 transition-colors"
        >
          Try Demo
        </a>
      </div>
    </section>
  );
}

  // 