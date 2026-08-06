import { Skeleton } from "@/components/ui/skeleton";

export default function AnalyticsSkeleton() {
  return (
    <div className="space-y-8 p-6">

      {/* Header */}
      <div className="space-y-3">
        <Skeleton className="h-9 w-64 rounded-lg" />
        <Skeleton className="h-5 w-80 rounded-lg" />
      </div>

      {/* Stats */}
      <div className="grid gap-6 md:grid-cols-4">
        {Array.from({ length: 4 }).map((_, i) => (
          <Skeleton
            key={i}
            className="h-32 rounded-2xl"
          />
        ))}
      </div>

      {/* Charts */}
      <div className="grid gap-6 lg:grid-cols-2">
        <Skeleton className="h-80 rounded-2xl" />
        <Skeleton className="h-80 rounded-2xl" />
      </div>

      {/* Table */}
      <Skeleton className="h-72 rounded-2xl" />

    </div>
  );
}