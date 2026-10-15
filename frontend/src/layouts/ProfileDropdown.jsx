import { Link } from "react-router-dom";
import { useAccount } from "wagmi";
import { User, Settings, Copy, ExternalLink, LogOut } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useToast } from "@/hooks/use-toast";
import { useWalletDisconnect } from "@/hooks/useWalletDisconnect";
import { supportedChains } from "@/config/chains";

function truncateAddress(addr) {
  if (!addr) return "";
  return `${addr.slice(0, 6)}...${addr.slice(-4)}`;
}

export function ProfileDropdown() {
  const { address, isConnected } = useAccount();
  const { disconnect } = useWalletDisconnect();
  const { toast } = useToast();

  if (!isConnected) return null;

  const explorerUrl = supportedChains[0]?.blockExplorers?.default?.url;

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button className="flex h-9 w-9 items-center justify-center rounded-full bg-gradient-to-br from-violet-500 to-cyan-400 text-xs font-bold text-white ring-2 ring-white/10 transition-transform hover:scale-105">
          {address?.slice(2, 4).toUpperCase()}
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-64 border-white/10 bg-zinc-950/95 text-white backdrop-blur-xl">
        <DropdownMenuLabel className="text-white/50">{truncateAddress(address)}</DropdownMenuLabel>
        <DropdownMenuSeparator className="bg-white/10" />

        <DropdownMenuItem
          onClick={() => {
            navigator.clipboard.writeText(address);
            toast({ title: "Address copied" });
          }}
          className="gap-2 focus:bg-white/10"
        >
          <Copy className="h-4 w-4" /> Copy address
        </DropdownMenuItem>

        {explorerUrl && (
          <DropdownMenuItem asChild className="gap-2 focus:bg-white/10">
            <a href={`${explorerUrl}/address/${address}`} target="_blank" rel="noreferrer">
              <ExternalLink className="h-4 w-4" /> View on explorer
            </a>
          </DropdownMenuItem>
        )}

        <DropdownMenuItem asChild className="gap-2 focus:bg-white/10">
          <Link to="/profile">
            <User className="h-4 w-4" /> Profile
          </Link>
        </DropdownMenuItem>

        <DropdownMenuItem asChild className="gap-2 focus:bg-white/10">
          <Link to="/settings">
            <Settings className="h-4 w-4" /> Settings
          </Link>
        </DropdownMenuItem>

        <DropdownMenuSeparator className="bg-white/10" />

        <DropdownMenuItem onClick={() => disconnect()} className="gap-2 text-destructive focus:bg-destructive/10 focus:text-destructive">
          <LogOut className="h-4 w-4" /> Disconnect
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
