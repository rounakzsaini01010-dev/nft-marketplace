import { useReadContract } from "wagmi";
import { nftMarketplaceContract } from "@/contracts/nftMarketplace";

export function usePlatformFee() {
  const { data: feeBps, isLoading } = useReadContract({
    ...nftMarketplaceContract,
    functionName: "platformFeeBps",
  });

  const bps = feeBps ?? 250n;

  return {
    bps,
    percent: Number(bps) / 100,
    isLoading,
  };
}
