import { motion } from "framer-motion";
import { GradientBlobs } from "@/components/landing/GradientBlobs";
import { NftArtTile } from "@/components/landing/NftArtTile";
import { ConnectWalletButton } from "@/components/common/ConnectWalletButton";

const floatingCards = [
  { seed: 0, className: "left-[4%] top-[18%] h-40 w-32 rotate-[-8deg]", float: [0, -14, 0], duration: 6 },
  { seed: 1, className: "right-[6%] top-[12%] h-44 w-36 rotate-[6deg]", float: [0, 16, 0], duration: 7 },
  { seed: 2, className: "left-[10%] bottom-[10%] h-36 w-28 rotate-[10deg]", float: [0, -10, 0], duration: 5.5 },
  { seed: 3, className: "right-[10%] bottom-[16%] h-40 w-32 rotate-[-6deg]", float: [0, 12, 0], duration: 6.5 },
];

export function HeroSection() {
  return (
    <section className="relative flex min-h-svh items-center overflow-hidden pt-16">
      <GradientBlobs />

      {floatingCards.map((card, i) => (
        <motion.div
          key={i}
          className={`absolute hidden shadow-2xl shadow-purple-500/20 lg:block ${card.className}`}
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1, y: card.float }}
          transition={{
            opacity: { duration: 0.8, delay: i * 0.15 },
            scale: { duration: 0.8, delay: i * 0.15 },
            y: { duration: card.duration, repeat: Infinity, ease: "easeInOut", delay: i * 0.2 },
          }}
        >
          <NftArtTile seed={card.seed} className="h-full w-full border border-white/10" />
        </motion.div>
      ))}

      <div className="relative z-10 mx-auto flex max-w-4xl flex-col items-center px-4 text-center sm:px-6">
        <motion.span
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-1.5 text-xs font-medium text-purple-300 backdrop-blur-xl"
        >
          The next-gen NFT marketplace
        </motion.span>

        <motion.h1
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="text-5xl font-bold leading-[1.05] tracking-tight text-white sm:text-6xl md:text-7xl"
        >
          Create, Mint, Trade{" "}
          <span className="bg-gradient-to-r from-purple-400 via-fuchsia-400 to-blue-400 bg-clip-text text-transparent">
            &amp; Collect
          </span>{" "}
          NFTs
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="mt-6 max-w-xl text-lg text-white/60"
        >
          A premium marketplace to mint, buy, and sell NFTs with secure on-chain ownership
          and seamless USDT payments.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.3 }}
          className="mt-10 flex flex-col items-center gap-4 sm:flex-row"
        >
          <ConnectWalletButton />
        </motion.div>
      </div>
    </section>
  );
}
