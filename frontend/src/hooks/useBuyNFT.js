import { useWriteContract, useWaitForTransactionReceipt } from "wagmi";
import { nftMarketplaceContract } from "@/contracts/nftMarketplace";

export function useBuyNFT() {
  const { writeContractAsync, data: hash, isPending, error } = useWriteContract();
  const { isLoading: isConfirming, isSuccess } = useWaitForTransactionReceipt({ hash });

  const buy = (listingId) =>
    writeContractAsync({
      ...nftMarketplaceContract,
      functionName: "buyNFT",
      args: [listingId],
      gas: 600_000n,
    });

  return { buy, hash, isPending, isConfirming, isSuccess, error };
}
