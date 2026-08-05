"use client";
import Link from "next/link";
export default function PricingCta() {
  return (
    <section className="flex justify-center bg-[#111018] px-6 py-20">

  <div className="w-full max-w-xl rounded-2xl border border-white/[0.07] bg-[#1C1926] px-10 py-12 text-center">

    <span className="rounded-full border border-white/[0.07] bg-[#2A2640] px-3 py-1 text-[11px] text-[#9490A8]">
      Early Access
    </span>

    <h2 className="mt-5 text-3xl font-bold text-white">
      Start building faster today.
    </h2>

    <p className="mt-3 text-sm leading-relaxed text-[#7A748F]">
      Join the thousands of developers and professionals
      streamlining their workflow with Nexus AI.
    </p>

    <div className="mt-8 flex flex-col items-center">

      <div className="flex items-end justify-center gap-1">

        <span className="text-5xl font-bold text-white">
          Rs.500
        </span>

        <div className="mb-1 text-left text-xs leading-tight text-[#7A748F]">
          <p>/ user</p>
          <p>/ month</p>
        </div>

      </div>

      <Link
        href="/pricing"
        className="mt-6 rounded-lg bg-[#7C5CFC] px-8 py-3 text-sm font-semibold text-white shadow-[0_0_16px_rgba(124,92,252,0.35)] transition-all hover:bg-[#6B4EE8] active:scale-[0.98]"
      >
        Upgrade to Pro
      </Link>

    </div>

  </div>

</section>
  );
}