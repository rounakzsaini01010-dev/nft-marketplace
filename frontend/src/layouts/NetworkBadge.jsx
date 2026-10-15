import { useAccount, useSwitchChain } from "wagmi";
import { Radio, AlertTriangle } from "lucide-react";
import { supportedChains } from "@/config/chains";
import { cn } from "@/lib/utils";

export function NetworkBadge() {
  const { chain, isConnected } = useAccount();
  const { switchChain } = useSwitchChain();

  if (!isConnected) return null;

  const isSupported = supportedChains.some((c) => c.id === chain?.id);

  return (
    <button
      onClick={() => !isSupported && switchChain?.({ chainId: supportedChains[0].id })}
      className={cn(
        "flex items-center gap-1.5 rounded-full border px-3 py-1.5 text-xs font-medium backdrop-blur-xl transition-colors",
        isSupported
          ? "border-emerald-400/30 bg-emerald-400/10 text-emerald-300"
          : "border-amber-400/30 bg-amber-400/10 text-amber-300 hover:bg-amber-400/20",
      )}
    >
      {isSupported ? (
        <Radio className="h-3 w-3 animate-pulse" />
      ) : (
        <AlertTriangle className="h-3 w-3" />
      )}
      {isSupported ? chain?.name : "Wrong network"}
    </button>
  );
}
