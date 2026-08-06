import { Skeleton } from "@/components/ui/skeleton";

export default function SettingsSkeleton() {
  return (
    <div className="space-y-8 p-6">

      {/* Header */}
      <div className="space-y-3">
        <Skeleton className="h-9 w-48 rounded-lg" />
        <Skeleton className="h-5 w-72 rounded-lg" />
      </div>

      {/* Profile Card */}
      <div className="rounded-2xl border border-white/10 p-6 space-y-6">

        <div className="flex items-center gap-5">
          <Skeleton className="h-20 w-20 rounded-full" />

          <div className="space-y-3">
            <Skeleton className="h-5 w-40 rounded-lg" />
            <Skeleton className="h-4 w-56 rounded-lg" />
          </div>
        </div>

        <Skeleton className="h-12 w-full rounded-xl" />
        <Skeleton className="h-12 w-full rounded-xl" />

        <div className="flex justify-end">
          <Skeleton className="h-11 w-32 rounded-xl" />
        </div>

      </div>

      {/* Subscription */}
      <Skeleton className="h-48 rounded-2xl" />

    </div>
  );
}