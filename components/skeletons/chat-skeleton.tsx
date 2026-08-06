import { Skeleton } from "@/components/ui/skeleton";

export default function ChatSkeleton() {
  return (
    <div className="flex h-full flex-col">

      {/* Header */}
      <div className="border-b border-white/10 p-5">
        <Skeleton className="h-8 w-52 rounded-lg" />
      </div>

      {/* Messages */}
      <div className="flex-1 space-y-8 p-6">

        {/* User */}
        <div className="flex justify-end">
          <Skeleton className="h-12 w-64 rounded-2xl" />
        </div>

        {/* AI */}
        <div className="flex gap-3">
          <Skeleton className="h-10 w-10 rounded-full" />

          <div className="space-y-3">
            <Skeleton className="h-5 w-72 rounded-lg" />
            <Skeleton className="h-5 w-96 rounded-lg" />
            <Skeleton className="h-5 w-64 rounded-lg" />
          </div>
        </div>

        {/* User */}
        <div className="flex justify-end">
          <Skeleton className="h-12 w-52 rounded-2xl" />
        </div>

        {/* AI */}
        <div className="flex gap-3">
          <Skeleton className="h-10 w-10 rounded-full" />

          <div className="space-y-3">
            <Skeleton className="h-5 w-80 rounded-lg" />
            <Skeleton className="h-5 w-120 rounded-lg" />
            <Skeleton className="h-5 w-72 rounded-lg" />
          </div>
        </div>
      </div>

      {/* Input */}
      <div className="border-t border-white/10 p-5">
        <Skeleton className="h-14 w-full rounded-xl" />
      </div>
    </div>
  );
}