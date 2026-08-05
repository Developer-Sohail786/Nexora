"use client";

import { FreePricingCard, ProPricingCard } from "./pricing-card";

interface PricingGridProps {
  currentPlan: "FREE" | "PRO";
}

export default function PricingGrid({
  currentPlan,
}: PricingGridProps) {
  return (
    <div className="mx-auto grid max-w-3xl grid-cols-1 gap-6 md:grid-cols-2">
      <FreePricingCard currentPlan={currentPlan} />
      <ProPricingCard currentPlan={currentPlan} />
    </div>
  );
}