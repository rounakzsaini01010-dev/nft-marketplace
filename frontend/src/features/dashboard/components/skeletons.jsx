import { Skeleton } from "@/components/ui/skeleton";

export function StatCardSkeleton() {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-5">
      <Skeleton className="h-10 w-10 rounded-xl bg-white/10" />
      <Skeleton className="mt-4 h-6 w-20 bg-white/10" />
      <Skeleton className="mt-2 h-3 w-24 bg-white/10" />
    </div>
  );
}

export function StatsGridSkeleton() {
  return (
    <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 xl:grid-cols-6">
      {Array.from({ length: 6 }).map((_, i) => (
        <StatCardSkeleton key={i} />
      ))}
    </div>
  );
}

export function PortfolioCardSkeleton() {
  return (
    <div className="overflow-hidden rounded-2xl border border-white/10 bg-white/[0.04]">
      <Skeleton className="aspect-square w-full rounded-none bg-white/10" />
      <div className="space-y-2 p-4">
        <Skeleton className="h-4 w-2/3 bg-white/10" />
        <Skeleton className="h-3 w-1/3 bg-white/10" />
      </div>
    </div>
  );
}

export function PortfolioGridSkeleton() {
  return (
    <div className="grid grid-cols-2 gap-5 sm:grid-cols-3 lg:grid-cols-4">
      {Array.from({ length: 8 }).map((_, i) => (
        <PortfolioCardSkeleton key={i} />
      ))}
    </div>
  );
}

export function ChartSkeleton() {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-5">
      <Skeleton className="h-4 w-32 bg-white/10" />
      <Skeleton className="mt-6 h-56 w-full rounded-xl bg-white/10" />
    </div>
  );
}

export function TableSkeleton({ rows = 5 }) {
  return (
    <div className="overflow-hidden rounded-2xl border border-white/10 bg-white/[0.04]">
      <div className="border-b border-white/10 p-4">
        <Skeleton className="h-8 w-48 bg-white/10" />
      </div>
      <div className="divide-y divide-white/5">
        {Array.from({ length: rows }).map((_, i) => (
          <div key={i} className="flex items-center gap-4 p-4">
            <Skeleton className="h-10 w-10 rounded-lg bg-white/10" />
            <Skeleton className="h-4 flex-1 bg-white/10" />
            <Skeleton className="h-4 w-20 bg-white/10" />
            <Skeleton className="h-4 w-24 bg-white/10" />
          </div>
        ))}
      </div>
    </div>
  );
}
