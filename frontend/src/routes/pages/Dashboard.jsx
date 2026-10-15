import { useMemo } from "react";
import { useDashboardStats } from "@/hooks/useDashboardStats";
import { useListings } from "@/hooks/useListings";
import { useMarketplaceVolume } from "@/hooks/useMarketplaceVolume";
import { DashboardHero } from "@/features/dashboard/components/DashboardHero";
import { StatsGrid } from "@/features/dashboard/components/StatsGrid";
import { StatsGridSkeleton } from "@/features/dashboard/components/skeletons";
import { PortfolioSection } from "@/features/dashboard/components/PortfolioSection";
import { AnalyticsSection } from "@/features/dashboard/components/AnalyticsSection";
import { ActivityTimeline } from "@/features/dashboard/components/ActivityTimeline";
import { TransactionsTable } from "@/features/dashboard/components/TransactionsTable";

export default function Dashboard() {
  const stats = useDashboardStats();
  const listings = useListings();
  const volume = useMarketplaceVolume();

  const listedTokenIds = useMemo(
    () => new Set((listings.data ?? []).map((l) => l.tokenId.toString())),
    [listings.data],
  );

  return (
    <div className="space-y-8 px-4 py-6 sm:px-6 lg:py-8">
      <DashboardHero nftsOwned={stats.nftsOwned} usdtBalance={Number(stats.usdtBalance).toFixed(2)} />

      {stats.isLoading ? (
        <StatsGridSkeleton />
      ) : (
        <StatsGrid
          stats={{
            nftsOwned: stats.nftsOwned,
            nftsListed: stats.nftsListed,
            nftsSold: stats.nftsSold,
            totalRevenue: stats.totalRevenue,
            marketplaceVolume: volume.data?.totalVolumeFormatted ?? 0,
            usdtBalance: stats.usdtBalance,
          }}
        />
      )}

      <PortfolioSection nfts={stats.myNfts} listedTokenIds={listedTokenIds} isLoading={stats.isLoading} />

      <AnalyticsSection volume={volume.data} activityFeed={stats.activityFeed} isLoading={stats.isLoading || volume.isLoading} />

      <section id="activity" className="grid scroll-mt-24 grid-cols-1 gap-5 lg:grid-cols-2">
        <div>
          <h2 className="mb-4 text-lg font-semibold text-white">Recent Activity</h2>
          <ActivityTimeline feed={stats.activityFeed} isLoading={stats.isLoading} />
        </div>
        <div>
          <h2 className="mb-4 text-lg font-semibold text-white">Transactions</h2>
          <TransactionsTable feed={stats.activityFeed} isLoading={stats.isLoading} />
        </div>
      </section>
    </div>
  );
}
