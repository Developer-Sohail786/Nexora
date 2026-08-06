"use client";

import { AlertTriangle } from "lucide-react";
import { Button } from "@/components/ui/button";

interface ErrorStateProps {
  title?: string;
  description: string;
  reset: () => void;
}

export default function ErrorState({
  title = "Something went wrong",
  description,
  reset,
}: ErrorStateProps) {
  return (
    <div className="flex min-h-[70vh] items-center justify-center px-6">
      <div className="w-full max-w-md rounded-2xl border border-white/10 bg-[#1C1926] p-8 text-center shadow-xl">

        <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-red-500/10">
          <AlertTriangle className="h-8 w-8 text-red-500" />
        </div>

        <h1 className="text-2xl font-bold text-white">
          {title}
        </h1>

        <p className="mt-3 text-sm leading-6 text-[#9490A8]">
          {description}
        </p>

        <Button
          onClick={reset}
          className="mt-8 w-full"
        >
          Try Again
        </Button>
      </div>
    </div>
  );
}