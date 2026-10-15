import { useWriteContract, useWaitForTransactionReceipt } from "wagmi";
import { nftCollectionContract } from "@/contracts/nftCollection";

export function useMintNFT() {
  const { writeContractAsync, data: hash, isPending, error } = useWriteContract();
  const { data: receipt, isLoading: isConfirming, isSuccess } = useWaitForTransactionReceipt({ hash });

  const mint = ({ recipient, tokenUri }) =>
    writeContractAsync({
      ...nftCollectionContract,
      functionName: "mintNFT",
      args: [recipient, tokenUri],
      gas: 800_000n,
    });

  return { mint, hash, receipt, isPending, isConfirming, isSuccess, error };
}
