"use client";

import { AnalyticsCardProps } from "./types";

export default function AnalyticsCard({
  title,
  value,
  subtitle,
  icon: Icon,
}: AnalyticsCardProps) {
  return (
    <article
      aria-label={`${title}: ${value}. ${subtitle}`}
      className="rounded-2xl border border-white/10 bg-[#1C1926] p-5 transition-all hover:border-white/15 hover:bg-[#222030]"
    >
      <div className="mb-5 flex items-center justify-between">
        <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#2A2640]">
          <Icon
            aria-hidden="true"
            size={20}
            className="text-[#7C5CFC]"
          />
        </div>
      </div>

      <p className="text-sm text-[#7A748F]">
        {title}
      </p>

      <h2 className="mt-2 text-3xl font-bold text-white">
        {value}
      </h2>

      <p className="mt-2 text-xs text-[#5C5870]">
        {subtitle}
      </p>
    </article>
  );
}