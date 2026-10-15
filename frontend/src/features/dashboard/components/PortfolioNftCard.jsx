import { useRef } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { ImageIcon } from "lucide-react";
import { Badge } from "@/components/ui/badge";

function truncateAddress(addr) {
  if (!addr) return "";
  return `${addr.slice(0, 6)}...${addr.slice(-4)}`;
}

export function PortfolioNftCard({ nft, isListed }) {
  const ref = useRef(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotateX = useSpring(useTransform(y, [-0.5, 0.5], [10, -10]), { stiffness: 300, damping: 25 });
  const rotateY = useSpring(useTransform(x, [-0.5, 0.5], [-10, 10]), { stiffness: 300, damping: 25 });

  const handleMouseMove = (e) => {
    const rect = ref.current.getBoundingClientRect();
    x.set((e.clientX - rect.left) / rect.width - 0.5);
    y.set((e.clientY - rect.top) / rect.height - 0.5);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      ref={ref}
      style={{ rotateX, rotateY, transformStyle: "preserve-3d", transformPerspective: 800 }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      className="group relative overflow-hidden rounded-2xl border border-white/10 bg-white/[0.04] backdrop-blur-xl transition-[border-color,box-shadow] duration-300 hover:border-violet-400/50 hover:shadow-[0_0_40px_-10px_rgba(139,92,246,0.5)]"
    >
      <div className="relative aspect-square overflow-hidden">
        {nft.image ? (
          <img src={nft.image} alt={nft.name} className="h-full w-full object-cover" loading="lazy" />
        ) : (
          <div className="flex h-full w-full items-center justify-center bg-black/40 text-white/20">
            <ImageIcon className="h-8 w-8" strokeWidth={1.5} />
          </div>
        )}
        <Badge
          className={
            isListed
              ? "absolute left-2.5 top-2.5 border-none bg-cyan-500/90 text-white"
              : "absolute left-2.5 top-2.5 border-none bg-white/15 text-white backdrop-blur"
          }
        >
          {isListed ? "Listed" : "Owned"}
        </Badge>
      </div>
      <div className="p-3.5">
        <p className="truncate text-sm font-semibold text-white">{nft.name}</p>
        <div className="mt-1.5 flex items-center justify-between text-xs text-white/40">
          <span>#{nft.tokenId.toString()}</span>
          <span>{truncateAddress(nft.contractAddress)}</span>
        </div>
      </div>
    </motion.div>
  );
}
