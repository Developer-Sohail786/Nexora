import { Skeleton } from "../ui/skeleton";

export default function DashboardSkeleton(){
    return(
         <div className="space-y-8 p-6">
            {/* hero */}
        <div className="space-y-3">
            <Skeleton className="h-10 w-72 rounded-lg"/>
            <Skeleton className="h-5 w-96 rounded-lg"/>
        </div>

        {/* stats */}
         <div className="grid gap-6 md:grid-cols-3">
        {Array.from({ length: 3 }).map((_, i) => (
          <Skeleton
            key={i}
            className="h-32 rounded-2xl"
          />
        ))}
      </div>

      {/* Recent Activity */}
      <div className="space-y-4">
        <Skeleton className="h-8 w-48 rounded-lg" />
        {Array.from({length: 5}).map((_,i)=>(
            <Skeleton key={i} className="h-16 rounded-xl" />
        ))}
      </div>


        </div>
    )
}