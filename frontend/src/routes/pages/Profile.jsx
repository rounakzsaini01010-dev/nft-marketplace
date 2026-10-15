import { useAccount } from "wagmi";
import { motion } from "framer-motion";
import { Copy, ExternalLink, ImageIcon, Tag, ShoppingBag, DollarSign } from "lucide-react";
import { useDashboardStats } from "@/hooks/useDashboardStats";
import { useToast } from "@/hooks/use-toast";
import { supportedChains } from "@/config/chains";
import { Button } from "@/components/ui/button";
import { CountUp } from "@/features/dashboard/components/CountUp";

function truncateAddress(addr) {
  if (!addr) return "";
  return `${addr.slice(0, 8)}...${addr.slice(-6)}`;
}

export default function Profile() {
  const { address, chain } = useAccount();
  const stats = useDashboardStats();
  const { toast } = useToast();
  const explorerUrl = supportedChains[0]?.blockExplorers?.default?.url;

  const summary = [
    { icon: ImageIcon, label: "NFTs Owned", value: stats.nftsOwned, accent: "from-violet-600 to-violet-500" },
    { icon: Tag, label: "NFTs Listed", value: stats.nftsListed, accent: "from-cyan-500 to-cyan-400" },
    { icon: ShoppingBag, label: "NFTs Sold", value: stats.nftsSold, accent: "from-fuchsia-500 to-violet-500" },
    { icon: DollarSign, label: "USDT Balance", value: Number(stats.usdtBalance), decimals: 2, accent: "from-emerald-500 to-cyan-500" },
  ];

  return (
    <div className="space-y-8 px-4 py-6 sm:px-6 lg:py-8">
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-br from-white/[0.06] via-white/[0.02] to-transparent p-8 backdrop-blur-2xl"
      >
        <div className="pointer-events-none absolute -left-24 -top-24 h-72 w-72 rounded-full bg-violet-600/20 blur-[100px]" />

        <div className="relative z-10 flex flex-col items-start gap-6 sm:flex-row sm:items-center">
          <div className="flex h-20 w-20 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-violet-500 to-cyan-400 text-2xl font-bold text-white shadow-lg shadow-violet-500/30">
            {address?.slice(2, 4).toUpperCase()}
          </div>
          <div className="min-w-0 flex-1">
            <p className="text-xs font-medium uppercase tracking-widest text-violet-300">Wallet Profile</p>
            <h1 className="mt-1 truncate text-2xl font-bold text-white">{truncateAddress(address)}</h1>
            <p className="mt-1 text-sm text-white/40">Connected to {chain?.name ?? "Unknown network"}</p>

            <div className="mt-4 flex flex-wrap gap-2">
              <Button
                size="sm"
                variant="outline"
                className="border-white/15 bg-white/5 text-white hover:bg-white/10"
                onClick={() => {
                  navigator.clipboard.writeText(address ?? "");
                  toast({ title: "Address copied" });
                }}
              >
                <Copy className="h-3.5 w-3.5" />
                Copy address
              </Button>
              {explorerUrl && (
                <Button asChild size="sm" variant="outline" className="border-white/15 bg-white/5 text-white hover:bg-white/10">
                  <a href={`${explorerUrl}/address/${address}`} target="_blank" rel="noreferrer">
                    <ExternalLink className="h-3.5 w-3.5" />
                    View on explorer
                  </a>
                </Button>
              )}
            </div>
          </div>
        </div>
      </motion.div>

      <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
        {summary.map((item, i) => (
          <motion.div
            key={item.label}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ delay: i * 0.06 }}
            className="rounded-2xl border border-white/10 bg-white/[0.04] p-5 backdrop-blur-xl"
          >
            <span className={`flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br ${item.accent}`}>
              <item.icon className="h-5 w-5 text-white" />
            </span>
            <p className="mt-4 text-2xl font-bold text-white">
              <CountUp value={item.value} decimals={item.decimals ?? 0} />
            </p>
            <p className="mt-1 text-xs text-white/45">{item.label}</p>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
