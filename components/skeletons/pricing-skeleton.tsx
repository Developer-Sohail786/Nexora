import { Skeleton } from "@/components/ui/skeleton";

export default function PricingSkeleton() {
  return (
    <div className="space-y-8 p-6">

      <div className="space-y-3 text-center">
        <Skeleton className="mx-auto h-10 w-72 rounded-lg" />
        <Skeleton className="mx-auto h-5 w-96 rounded-lg" />
      </div>

      <div className="grid gap-8 lg:grid-cols-2">

        {Array.from({ length: 2 }).map((_, i) => (
          <div
            key={i}
            className="rounded-2xl border border-white/10 p-8 space-y-5"
          >
            <Skeleton className="h-8 w-40 rounded-lg" />
            <Skeleton className="h-12 w-28 rounded-lg" />

            {Array.from({ length: 5 }).map((_, j) => (
              <Skeleton
                key={j}
                className="h-5 w-full rounded-lg"
              />
            ))}

            <Skeleton className="h-12 w-full rounded-xl" />
          </div>
        ))}

      </div>

    </div>
  );
}