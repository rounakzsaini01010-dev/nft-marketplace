import { motion } from "framer-motion";
import { useAccount } from "wagmi";
import { Wallet, ImageIcon, DollarSign } from "lucide-react";
import { NftArtTile } from "@/components/landing/NftArtTile";

function truncateAddress(addr) {
  if (!addr) return "";
  return `${addr.slice(0, 6)}...${addr.slice(-4)}`;
}

const floatingCards = [
  { seed: 1, className: "right-[16%] top-[8%] h-24 w-20 rotate-[8deg]", float: [0, -10, 0], duration: 6 },
  { seed: 3, className: "right-[2%] top-[38%] h-28 w-24 rotate-[-6deg]", float: [0, 12, 0], duration: 7 },
  { seed: 5, className: "right-[26%] bottom-[4%] h-20 w-16 rotate-[4deg]", float: [0, -8, 0], duration: 5.5 },
];

export function DashboardHero({ nftsOwned, usdtBalance }) {
  const { address } = useAccount();

  return (
    <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-br from-white/[0.06] via-white/[0.02] to-transparent p-8 backdrop-blur-2xl sm:p-10">
      <div className="pointer-events-none absolute -left-24 -top-24 h-72 w-72 rounded-full bg-violet-600/20 blur-[100px]" />
      <div className="pointer-events-none absolute -bottom-24 right-0 h-72 w-72 rounded-full bg-cyan-500/15 blur-[100px]" />

      {floatingCards.map((card, i) => (
        <motion.div
          key={i}
          className={`absolute hidden shadow-2xl shadow-violet-500/20 md:block ${card.className}`}
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1, y: card.float }}
          transition={{
            opacity: { duration: 0.6, delay: i * 0.15 },
            scale: { duration: 0.6, delay: i * 0.15 },
            y: { duration: card.duration, repeat: Infinity, ease: "easeInOut" },
          }}
        >
          <NftArtTile seed={card.seed} className="h-full w-full border border-white/10" />
        </motion.div>
      ))}

      <div className="relative z-10 max-w-lg">
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-xs font-medium uppercase tracking-widest text-violet-300"
        >
          Welcome back
        </motion.p>
        <motion.h1
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.05 }}
          className="mt-2 text-3xl font-bold text-white sm:text-4xl"
        >
          {address ? truncateAddress(address) : "Your Dashboard"}
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="mt-2 text-sm text-white/50"
        >
          Here's what's happening with your NFT portfolio today.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mt-8 flex flex-wrap gap-4"
        >
          <div className="flex items-center gap-3 rounded-2xl border border-white/10 bg-white/5 px-4 py-3">
            <span className="flex h-9 w-9 items-center justify-center rounded-full bg-violet-500/15 text-violet-300">
              <ImageIcon className="h-4 w-4" />
            </span>
            <div>
              <p className="text-xs text-white/40">NFTs Owned</p>
              <p className="text-sm font-semibold text-white">{nftsOwned}</p>
            </div>
          </div>

          <div className="flex items-center gap-3 rounded-2xl border border-white/10 bg-white/5 px-4 py-3">
            <span className="flex h-9 w-9 items-center justify-center rounded-full bg-cyan-500/15 text-cyan-300">
              <DollarSign className="h-4 w-4" />
            </span>
            <div>
              <p className="text-xs text-white/40">USDT Balance</p>
              <p className="text-sm font-semibold text-white">{usdtBalance}</p>
            </div>
          </div>

          <div className="flex items-center gap-3 rounded-2xl border border-white/10 bg-white/5 px-4 py-3">
            <span className="flex h-9 w-9 items-center justify-center rounded-full bg-emerald-500/15 text-emerald-300">
              <Wallet className="h-4 w-4" />
            </span>
            <div>
              <p className="text-xs text-white/40">Wallet Status</p>
              <p className="text-sm font-semibold text-white">Connected</p>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
