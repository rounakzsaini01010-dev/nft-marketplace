import { useAccount, useReadContract, useWriteContract, useWaitForTransactionReceipt } from "wagmi";
import { usdtContract } from "@/contracts/usdt";

export function useUSDTApproval(spender) {
  const { address } = useAccount();
  const { writeContractAsync, data: hash, isPending, error } = useWriteContract();
  const { isLoading: isConfirming, isSuccess } = useWaitForTransactionReceipt({ hash });

  const allowanceQuery = useReadContract({
    ...usdtContract,
    functionName: "allowance",
    args: address && spender ? [address, spender] : undefined,
    query: { enabled: Boolean(address && spender) },
  });

  const approve = (amount) =>
    writeContractAsync({
      ...usdtContract,
      functionName: "approve",
      args: [spender, amount],
      gas: 150_000n,
    });

  return {
    allowance: allowanceQuery.data,
    isAllowanceLoading: allowanceQuery.isLoading,
    refetchAllowance: allowanceQuery.refetch,
    approve,
    hash,
    isPending,
    isConfirming,
    isSuccess,
    error,
  };
}
