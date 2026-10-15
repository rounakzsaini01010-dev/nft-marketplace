import { useReadContract } from "wagmi";
import { nftMarketplaceContract } from "@/contracts/nftMarketplace";

export function useMarketplace({ listingId } = {}) {
  const totalListingsQuery = useReadContract({
    ...nftMarketplaceContract,
    functionName: "totalListings",
  });

  const listingQuery = useReadContract({
    ...nftMarketplaceContract,
    functionName: "getListing",
    args: listingId !== undefined ? [listingId] : undefined,
    query: { enabled: listingId !== undefined },
  });

  return {
    contract: nftMarketplaceContract,
    totalListings: totalListingsQuery.data,
    isTotalListingsLoading: totalListingsQuery.isLoading,
    refetchTotalListings: totalListingsQuery.refetch,
    listing: listingQuery.data,
    isListingLoading: listingQuery.isLoading,
    refetchListing: listingQuery.refetch,
  };
}
