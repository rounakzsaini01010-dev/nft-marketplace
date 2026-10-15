import { useWriteContract, useWaitForTransactionReceipt } from "wagmi";
import { nftMarketplaceContract } from "@/contracts/nftMarketplace";

export function useListNFT() {
  const { writeContractAsync, data: hash, isPending, error } = useWriteContract();
  const { isLoading: isConfirming, isSuccess } = useWaitForTransactionReceipt({ hash });

  const list = ({ nftContract, tokenId, price }) =>
    writeContractAsync({
      ...nftMarketplaceContract,
      functionName: "listNFT",
      args: [nftContract, tokenId, price],
      gas: 500_000n,
    });

  return { list, hash, isPending, isConfirming, isSuccess, error };
}
