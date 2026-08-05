"use client";

import { Check, CheckCircle } from "lucide-react";
import { useRazorpay } from "@/hooks/use-razorpay";

interface PricingCardProps {
  currentPlan: "FREE" | "PRO";
}

export function FreePricingCard({
  currentPlan,
}: PricingCardProps) {
  return (
    <div className="rounded-2xl border border-white/[0.07] bg-[#1C1926] p-8 transition-all duration-300 hover:-translate-y-2 hover:border-[#7C5CFC]/30 hover:shadow-[0_20px_50px_rgba(124,92,252,0.12)]">
      <h2 className="text-2xl font-bold text-white">Free</h2>

      <p className="mt-1 mb-6 text-sm text-[#7A748F]">
        For individuals exploring AI capabilities.
      </p>

      <p className="mb-6 text-5xl font-bold text-white">
        $0
        <span className="text-base font-normal text-[#7A748F]">
          {" "}
          /month
        </span>
      </p>

      <button
        disabled={currentPlan === "FREE"}
        className={`mb-8 w-full rounded-lg py-2.5 text-sm font-medium transition-colors ${
          currentPlan === "FREE"
            ? "cursor-default border border-emerald-500 bg-emerald-500/10 text-emerald-400"
            : "border border-white/[0.07] text-white hover:bg-white/5"
        }`}
      >
        {currentPlan === "FREE"
          ? "✓ Current Plan"
          : "Free Plan"}
      </button>

      <div className="space-y-3">
        <div className="flex items-center gap-2.5">
          <Check
            size={14}
            className="shrink-0 text-[#7A748F]"
          />
          <span className="text-sm text-[#9490A8]">
            Access to standard intelligence models
          </span>
        </div>

        <div className="flex items-center gap-2.5">
          <Check
            size={14}
            className="shrink-0 text-[#7A748F]"
          />
          <span className="text-sm text-[#9490A8]">
            20 AI interactions per day
          </span>
        </div>

        <div className="flex items-center gap-2.5">
          <Check
            size={14}
            className="shrink-0 text-[#7A748F]"
          />
          <span className="text-sm text-[#9490A8]">
            Basic file analysis (up to 10MB)
          </span>
        </div>

        <div className="flex items-center gap-2.5">
          <Check
            size={14}
            className="shrink-0 text-[#7A748F]"
          />
          <span className="text-sm text-[#9490A8]">
            Standard community support
          </span>
        </div>
      </div>
    </div>
  );
}

export function ProPricingCard({
  currentPlan,
}: PricingCardProps) {
  const { checkout } = useRazorpay();

  return (
    <div className="relative rounded-2xl border border-[#7C5CFC]/40 bg-[#1C1926] p-8 transition-all duration-300 hover:-translate-y-2 hover:border-[#7C5CFC] hover:shadow-[0_25px_60px_rgba(124,92,252,0.35)]">
      <div className="absolute -top-3.5 left-1/2 -translate-x-1/2">
        <span
          className={`rounded-full px-4 py-1 text-[10px] font-bold uppercase tracking-widest text-white ${
            currentPlan === "PRO"
              ? "bg-emerald-500"
              : "bg-[#7C5CFC]"
          }`}
        >
          {currentPlan === "PRO"
            ? "Current Plan"
            : "Most Popular"}
        </span>
      </div>

      <h2 className="text-2xl font-bold text-[#7C5CFC]">
        Pro
      </h2>

      <p className="mt-1 mb-6 text-sm text-[#7A748F]">
        For professionals requiring maximum velocity.
      </p>

      <p className="mb-6 text-5xl font-bold text-white">
        $29
        <span className="text-base font-normal text-[#7A748F]">
          {" "}
          /month
        </span>
      </p>

      <button
        onClick={() => {
          if (currentPlan === "PRO") return;

          checkout();
        }}
        disabled={currentPlan === "PRO"}
        className={`mb-8 w-full rounded-lg py-2.5 text-sm font-semibold transition-all ${
          currentPlan === "PRO"
            ? "cursor-default bg-emerald-500 text-white"
            : "cursor-pointer bg-[#7C5CFC] text-white shadow-[0_0_16px_rgba(124,92,252,0.35)] hover:bg-[#6B4EE8] active:scale-[0.98]"
        }`}
      >
        {currentPlan === "PRO"
          ? "✓ Current Plan"
          : "Upgrade to Pro"}
      </button>

      <div className="space-y-3">
        <div className="flex items-center gap-2.5">
          <CheckCircle
            size={14}
            className="shrink-0 text-[#7C5CFC]"
          />
          <span className="text-sm font-semibold text-white">
            Everything in Free, plus:
          </span>
        </div>

        <div className="flex items-center gap-2.5">
          <CheckCircle
            size={14}
            className="shrink-0 text-[#7C5CFC]"
          />
          <span className="text-sm text-[#9490A8]">
            Unlimited access to advanced flagship models
          </span>
        </div>

        <div className="flex items-center gap-2.5">
          <CheckCircle
            size={14}
            className="shrink-0 text-[#7C5CFC]"
          />
          <span className="text-sm text-[#9490A8]">
            Unlimited daily AI interactions
          </span>
        </div>

        <div className="flex items-center gap-2.5">
          <CheckCircle
            size={14}
            className="shrink-0 text-[#7C5CFC]"
          />
          <span className="text-sm text-[#9490A8]">
            Deep document analysis & synthesis (up to 500MB)
          </span>
        </div>

        <div className="flex items-center gap-2.5">
          <CheckCircle
            size={14}
            className="shrink-0 text-[#7C5CFC]"
          />
          <span className="text-sm text-[#9490A8]">
            Priority 24/7 dedicated support
          </span>
        </div>
      </div>
    </div>
  );
}