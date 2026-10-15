import { useReadContract } from "wagmi";
import { nftCollectionContract } from "@/contracts/nftCollection";

export function useNFTCollection({ owner, tokenId } = {}) {
  const balanceQuery = useReadContract({
    ...nftCollectionContract,
    functionName: "balanceOf",
    args: owner ? [owner] : undefined,
    query: { enabled: Boolean(owner) },
  });

  const ownerQuery = useReadContract({
    ...nftCollectionContract,
    functionName: "ownerOf",
    args: tokenId !== undefined ? [tokenId] : undefined,
    query: { enabled: tokenId !== undefined },
  });

  return {
    contract: nftCollectionContract,
    balance: balanceQuery.data,
    isBalanceLoading: balanceQuery.isLoading,
    refetchBalance: balanceQuery.refetch,
    owner: ownerQuery.data,
    isOwnerLoading: ownerQuery.isLoading,
  };
}
