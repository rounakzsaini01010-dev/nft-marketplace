import { ImageIcon, Tag, ShoppingBag, TrendingUp, BarChart3, DollarSign } from "lucide-react";
import { StatCard } from "@/features/dashboard/components/StatCard";

export function StatsGrid({ stats }) {
  const cards = [
    {
      icon: ImageIcon,
      label: "NFTs Owned",
      value: stats.nftsOwned,
      accent: "from-violet-600 to-violet-500",
    },
    {
      icon: Tag,
      label: "NFTs Listed",
      value: stats.nftsListed,
      accent: "from-cyan-500 to-cyan-400",
    },
    {
      icon: ShoppingBag,
      label: "NFTs Sold",
      value: stats.nftsSold,
      accent: "from-fuchsia-500 to-violet-500",
    },
    {
      icon: TrendingUp,
      label: "Total Revenue",
      value: stats.totalRevenue,
      decimals: 2,
      suffix: " USDT",
      accent: "from-emerald-500 to-cyan-500",
    },
    {
      icon: BarChart3,
      label: "Marketplace Volume",
      value: stats.marketplaceVolume,
      decimals: 2,
      suffix: " USDT",
      accent: "from-indigo-500 to-blue-500",
    },
    {
      icon: DollarSign,
      label: "USDT Balance",
      value: stats.usdtBalance,
      decimals: 2,
      suffix: " USDT",
      accent: "from-violet-500 to-fuchsia-500",
    },
  ];

  return (
    <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 xl:grid-cols-6">
      {cards.map((card, i) => (
        <StatCard key={card.label} {...card} delay={i * 0.06} />
      ))}
    </div>
  );
}
