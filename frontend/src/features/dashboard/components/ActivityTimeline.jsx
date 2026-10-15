import { motion } from "framer-motion";
import { Hammer, Tag, ShoppingCart, DollarSign, History } from "lucide-react";
import { formatUnits } from "viem";
import { EmptyState } from "@/features/dashboard/components/EmptyState";

const typeMeta = {
  minted: { icon: Hammer, label: "NFT Minted", color: "text-violet-300 bg-violet-500/15" },
  listed: { icon: Tag, label: "NFT Listed", color: "text-cyan-300 bg-cyan-500/15" },
  purchased: { icon: ShoppingCart, label: "NFT Purchased", color: "text-fuchsia-300 bg-fuchsia-500/15" },
  sold: { icon: DollarSign, label: "NFT Sold", color: "text-emerald-300 bg-emerald-500/15" },
};

export function ActivityTimeline({ feed, isLoading }) {
  if (isLoading) {
    return (
      <div className="space-y-4 rounded-2xl border border-white/10 bg-white/[0.04] p-5">
        {Array.from({ length: 4 }).map((_, i) => (
          <div key={i} className="h-12 animate-pulse rounded-xl bg-white/5" />
        ))}
      </div>
    );
  }

  if (feed.length === 0) {
    return (
      <EmptyState
        icon={History}
        title="No activity yet"
        description="Your mints, listings, and sales will show up here."
      />
    );
  }

  return (
    <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-5 backdrop-blur-xl">
      <ol className="relative space-y-6 border-l border-white/10 pl-6">
        {feed.slice(0, 8).map((item, i) => {
          const meta = typeMeta[item.type];
          const Icon = meta.icon;
          return (
            <motion.li
              key={`${item.type}-${item.tokenId}-${i}`}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.05 }}
              className="relative"
            >
              <span className={`absolute -left-[31px] flex h-6 w-6 items-center justify-center rounded-full ring-4 ring-[#050505] ${meta.color}`}>
                <Icon className="h-3 w-3" />
              </span>
              <p className="text-sm font-medium text-white">
                {meta.label} <span className="text-white/40">#{item.tokenId.toString()}</span>
              </p>
              <p className="mt-0.5 text-xs text-white/35">
                {item.price !== undefined && `${formatUnits(item.price, 6)} USDT · `}
                {item.timestamp ? item.timestamp.toLocaleString() : "Pending"}
              </p>
            </motion.li>
          );
        })}
      </ol>
    </div>
  );
}
