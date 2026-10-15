import { DollarSign } from "lucide-react";
import { useUsdtBalance } from "@/hooks/useUsdtBalance";
import { useMintFee } from "@/hooks/useMintFee";
import { Skeleton } from "@/components/ui/skeleton";

export function UsdtBalanceCard() {
  const { formatted, isLoading } = useUsdtBalance();
  const { formatted: feeFormatted } = useMintFee();

  return (
    <div className="flex items-center justify-between rounded-2xl border border-white/10 bg-white/5 p-5 backdrop-blur-xl">
      <div className="flex items-center gap-3">
        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-purple-500/20 to-blue-500/20 text-purple-300">
          <DollarSign className="h-5 w-5" />
        </div>
        <div>
          <p className="text-xs text-white/40">Your USDT Balance</p>
          {isLoading ? (
            <Skeleton className="mt-1 h-5 w-24 bg-white/10" />
          ) : (
            <p className="text-lg font-semibold text-white">{formatted} USDT</p>
          )}
        </div>
      </div>
      <div className="text-right">
        <p className="text-xs text-white/40">Mint Fee</p>
        <p className="text-sm font-medium text-purple-300">{feeFormatted} USDT</p>
      </div>
    </div>
  );
}
