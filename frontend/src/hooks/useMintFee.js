import { useReadContract } from "wagmi";
import { formatUnits } from "viem";
import { nftCollectionContract } from "@/contracts/nftCollection";

export function useMintFee() {
  const feeQuery = useReadContract({
    ...nftCollectionContract,
    functionName: "MINT_FEE",
  });

  const raw = feeQuery.data ?? 10_000_000n;

  return {
    raw,
    formatted: formatUnits(raw, 6),
    isLoading: feeQuery.isLoading,
  };
}
