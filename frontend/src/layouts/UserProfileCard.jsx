import { useAccount } from "wagmi";
import { LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useWalletDisconnect } from "@/hooks/useWalletDisconnect";

function truncateAddress(addr) {
  if (!addr) return "";
  return `${addr.slice(0, 6)}...${addr.slice(-4)}`;
}

export function UserProfileCard({ collapsed }) {
  const { address, isConnected } = useAccount();
  const { disconnect } = useWalletDisconnect();

  if (!isConnected) return null;

  return (
    <div
      className={cn(
        "flex items-center gap-3 rounded-xl border border-white/10 bg-white/5 p-3 backdrop-blur-xl",
        collapsed && "justify-center",
      )}
    >
      <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-violet-500 to-cyan-400 text-xs font-bold text-white">
        {address?.slice(2, 4).toUpperCase()}
      </div>
      {!collapsed && (
        <>
          <div className="min-w-0 flex-1">
            <p className="truncate text-sm font-medium text-white">{truncateAddress(address)}</p>
            <p className="text-xs text-white/40">Connected</p>
          </div>
          <Button
            size="icon"
            variant="ghost"
            onClick={() => disconnect()}
            className="h-8 w-8 shrink-0 text-white/40 hover:text-destructive"
          >
            <LogOut className="h-4 w-4" />
          </Button>
        </>
      )}
    </div>
  );
}
