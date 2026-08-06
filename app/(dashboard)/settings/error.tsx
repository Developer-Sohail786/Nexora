"use client";

import ErrorState from "@/components/errors/error-state";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  console.error(error);

  return (
    <ErrorState
      description="We couldn't load your settings. Please try again."
      reset={reset}
    />
  );
}