import { useMemo } from "react";
import { formatUnits } from "viem";
import { SalesOverviewChart } from "@/features/dashboard/components/charts/SalesOverviewChart";
import { RevenueChart } from "@/features/dashboard/components/charts/RevenueChart";
import { NftActivityChart } from "@/features/dashboard/components/charts/NftActivityChart";
import { ChartSkeleton } from "@/features/dashboard/components/skeletons";

export function AnalyticsSection({ volume, activityFeed, isLoading }) {
  const revenueSeries = useMemo(
    () =>
      (activityFeed ?? [])
        .filter((item) => item.type === "sold")
        .map((item) => ({
          date: item.timestamp,
          amount: Number(formatUnits(item.price - item.feePaid, 6)),
        })),
    [activityFeed],
  );

  const activityCounts = useMemo(() => {
    const counts = { minted: 0, listed: 0, purchased: 0, sold: 0 };
    for (const item of activityFeed ?? []) counts[item.type] = (counts[item.type] ?? 0) + 1;
    return [counts.minted, counts.listed, counts.purchased, counts.sold];
  }, [activityFeed]);

  return (
    <section id="analytics" className="scroll-mt-24">
      <h2 className="text-lg font-semibold text-white">Marketplace Analytics</h2>

      <div className="mt-4 grid grid-cols-1 gap-5 lg:grid-cols-3">
        {isLoading ? (
          <>
            <ChartSkeleton />
            <ChartSkeleton />
            <ChartSkeleton />
          </>
        ) : (
          <>
            <SalesOverviewChart series={volume?.series ?? []} />
            <RevenueChart series={revenueSeries} />
            <NftActivityChart counts={activityCounts} />
          </>
        )}
      </div>
    </section>
  );
}
