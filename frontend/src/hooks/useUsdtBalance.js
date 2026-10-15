import { useAccount, useReadContract } from "wagmi";
import { formatUnits } from "viem";
import { usdtContract } from "@/contracts/usdt";

export function useUsdtBalance() {
  const { address } = useAccount();

  const balanceQuery = useReadContract({
    ...usdtContract,
    functionName: "balanceOf",
    args: address ? [address] : undefined,
    query: { enabled: Boolean(address) },
  });

  const decimalsQuery = useReadContract({
    ...usdtContract,
    functionName: "decimals",
  });

  const decimals = decimalsQuery.data ?? 6;
  const raw = balanceQuery.data ?? 0n;

  return {
    raw,
    decimals,
    formatted: formatUnits(raw, decimals),
    isLoading: balanceQuery.isLoading || decimalsQuery.isLoading,
    refetch: balanceQuery.refetch,
  };
}
