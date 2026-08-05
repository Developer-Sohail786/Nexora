"use client";

import { CalendarDays, Crown } from "lucide-react";

interface Props {
  plan: string;
}

export default function AnalyticsHeader({
  plan,
}: Props) {
  const isPro = plan === "PRO";

  return (
    <section className="bg-[#111018] px-6 pb-8 pt-8">
      <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-4xl font-bold tracking-tight text-white">
            Analytics
          </h1>

          <p className="mt-2 text-sm text-[#7A748F]">
            Track your AI usage and workspace insights.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <div
            className={`flex items-center gap-2 rounded-xl px-4 py-2 text-sm font-medium ${
              isPro
                ? "bg-emerald-500/15 text-emerald-400"
                : "bg-white/10 text-[#C4BEDD]"
            }`}
          >
            <Crown size={16} />
            {plan} Plan
          </div>

          <button className="flex items-center gap-2 rounded-xl border border-white/10 bg-[#1C1926] px-4 py-2 text-sm text-[#9490A8] transition hover:bg-[#242031]">
            <CalendarDays
              size={16}
              className="text-[#7C5CFC]"
            />
            Last 30 Days
          </button>
        </div>
      </div>
    </section>
  );
}