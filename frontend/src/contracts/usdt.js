import { writeContract, readContract } from "wagmi/actions";
import { wagmiConfig } from "@/lib/web3/wagmi.config";
import { addresses } from "@/contracts/addresses";
import { usdtAbi } from "@/contracts/abi";

export const usdtContract = {
  address: addresses.usdt,
  abi: usdtAbi,
};

export function approveUSDT({ spender, amount }) {
  return writeContract(wagmiConfig, {
    ...usdtContract,
    functionName: "approve",
    args: [spender, amount],
    gas: 150_000n,
  });
}

export function getUsdtBalance(owner) {
  return readContract(wagmiConfig, {
    ...usdtContract,
    functionName: "balanceOf",
    args: [owner],
  });
}

export function getUsdtAllowance({ owner, spender }) {
  return readContract(wagmiConfig, {
    ...usdtContract,
    functionName: "allowance",
    args: [owner, spender],
  });
}
