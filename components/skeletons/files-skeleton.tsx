import { Skeleton } from "@/components/ui/skeleton";

export default function FilesSkeleton() {
  return (
    <div className="space-y-8 p-6">

      {/* Header */}
      <div className="space-y-3">
        <Skeleton className="h-9 w-56 rounded-lg" />
        <Skeleton className="h-5 w-80 rounded-lg" />
      </div>

      {/* Upload Box */}
      <Skeleton className="h-44 w-full rounded-2xl" />

      {/* Recent Files */}
      <div className="space-y-5">

        <Skeleton className="h-7 w-40 rounded-lg" />

        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {Array.from({ length: 6 }).map((_, index) => (
            <div
              key={index}
              className="rounded-2xl border border-white/10 p-5"
            >
              <div className="flex items-start justify-between">
                <Skeleton className="h-12 w-12 rounded-xl" />
                <Skeleton className="h-8 w-8 rounded-lg" />
              </div>

              <Skeleton className="mt-5 h-5 w-40 rounded-lg" />
              <Skeleton className="mt-3 h-4 w-28 rounded-lg" />

              <div className="mt-6 flex justify-between">
                <Skeleton className="h-4 w-16 rounded-lg" />
                <Skeleton className="h-4 w-20 rounded-lg" />
              </div>
            </div>
          ))}
        </div>

      </div>

    </div>
  );
}