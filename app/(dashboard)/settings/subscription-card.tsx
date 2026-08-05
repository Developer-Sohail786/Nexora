"use client";

import Link from "next/link";
import { Crown } from "lucide-react";

interface Props {
  user: {
    plan: string;
    subscriptionEnd: Date | null;
  };
}

export default function SubscriptionCard({
  user,
}: Props) {
  const isPro = user.plan === "PRO";

  return (
    <section className="rounded-2xl border border-white/10 bg-[#1C1926] p-6">
      <div className="mb-6 flex items-center gap-3">
        <div className="rounded-lg bg-[#7C5CFC]/15 p-2">
          <Crown
            size={20}
            className="text-[#7C5CFC]"
          />
        </div>

        <div>
          <h2 className="text-lg font-semibold text-white">
            Subscription
          </h2>

          <p className="text-sm text-[#7A748F]">
            Manage your current plan.
          </p>
        </div>
      </div>

      <div className="space-y-5">
        <div>
          <p className="text-xs uppercase tracking-wider text-[#7A748F]">
            Current Plan
          </p>

          <div className="mt-2">
            <span
              className={`inline-flex rounded-full px-3 py-1 text-sm font-semibold ${
                isPro
                  ? "bg-emerald-500/15 text-emerald-400"
                  : "bg-white/10 text-[#C4BEDD]"
              }`}
            >
              {user.plan}
            </span>
          </div>
        </div>

        <div>
          <p className="text-xs uppercase tracking-wider text-[#7A748F]">
            Subscription Ends
          </p>

          <p className="mt-2 text-sm text-white">
            {user.subscriptionEnd
              ? new Date(user.subscriptionEnd).toLocaleDateString()
              : "Never"}
          </p>
        </div>

        {isPro ? (
          <button
            disabled
            className="mt-4 flex w-full cursor-default items-center justify-center rounded-lg bg-emerald-500 py-3 text-sm font-semibold text-white"
          >
            ✓ Current Plan
          </button>
        ) : (
          <Link
            href="/pricing"
            className="mt-4 flex w-full items-center justify-center rounded-lg bg-[#7C5CFC] py-3 text-sm font-semibold text-white transition-all hover:bg-[#6B4EE8]"
          >
            Upgrade to Pro
          </Link>
        )}
      </div>
    </section>
  );
}