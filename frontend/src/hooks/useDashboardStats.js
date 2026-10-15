import { useMemo } from "react";
import { useAccount, useReadContract } from "wagmi";
import { formatUnits } from "viem";
import { useMyNfts } from "@/hooks/useMyNfts";
import { useListings } from "@/hooks/useListings";
import { useUsdtBalance } from "@/hooks/useUsdtBalance";
import { useMyActivity } from "@/hooks/useMyActivity";
import { usdtContract } from "@/contracts/usdt";

export function useDashboardStats() {
  const { address } = useAccount();
  const myNfts = useMyNfts();
  const listings = useListings();
  const usdtBalance = useUsdtBalance();
  const activity = useMyActivity();
  const { data: usdtDecimals } = useReadContract({ ...usdtContract, functionName: "decimals" });

  const myListings = useMemo(
    () => (listings.data ?? []).filter((l) => l.seller?.toLowerCase() === address?.toLowerCase()),
    [listings.data, address],
  );

  const isLoading = myNfts.isLoading || listings.isLoading || usdtBalance.isLoading || activity.isLoading;

  return {
    isLoading,
    nftsOwned: myNfts.data?.length ?? 0,
    nftsListed: myListings.length,
    nftsSold: activity.data?.soldCount ?? 0,
    totalRevenue: activity.data ? formatUnits(activity.data.revenue, usdtDecimals ?? 6) : "0",
    usdtBalance: usdtBalance.formatted,
    activityFeed: activity.data?.feed ?? [],
    myNfts: myNfts.data ?? [],
  };
}
