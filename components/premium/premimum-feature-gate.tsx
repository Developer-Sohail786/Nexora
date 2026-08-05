"use client";

import { Lock } from "lucide-react";

interface PremiumFeatureGateProps {
  children: React.ReactNode;
  locked: boolean;
  className?: string;
}

export default function PremiumFeatureGate({
  children,
  locked,
  className,
}: PremiumFeatureGateProps) {
  return (
    <div
      className={`relative ${className ?? ""}`}
    >
      {children}

      {locked && (
        <div className="absolute -right-1 -top-1 rounded-full bg-[#FACC15] p-1 shadow-lg">
          <Lock
            size={10}
            className="text-black"
          />
        </div>
      )}
    </div>
  );
}