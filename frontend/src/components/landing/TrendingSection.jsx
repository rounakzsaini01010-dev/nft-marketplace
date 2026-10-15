import { motion } from "framer-motion";
import { Flame } from "lucide-react";
import { SectionHeading } from "@/components/landing/SectionHeading";
import { NftArtTile } from "@/components/landing/NftArtTile";
import { Badge } from "@/components/ui/badge";

const trending = Array.from({ length: 8 }).map((_, i) => ({
  id: i,
  name: `VertexNFT Genesis #${1000 + i}`,
  price: (0.5 + i * 0.35).toFixed(2),
}));

export function TrendingSection() {
  return (
    <section id="trending" className="scroll-mt-20 relative py-24">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <SectionHeading
          eyebrow="Trending"
          title="Trending NFTs"
          description="The most active collectibles right now."
        />

        <div className="mt-14 grid grid-cols-2 gap-5 sm:grid-cols-3 lg:grid-cols-4">
          {trending.map((nft, i) => (
            <motion.div
              key={nft.id}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.5, delay: (i % 4) * 0.08 }}
              whileHover={{ y: -8, scale: 1.02 }}
              className="group overflow-hidden rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl transition-colors hover:border-purple-400/40"
            >
              <div className="relative aspect-square overflow-hidden">
                <NftArtTile
                  seed={nft.id}
                  className="h-full w-full rounded-none transition-transform duration-500 group-hover:scale-110"
                />
                <Badge className="absolute left-3 top-3 gap-1 border-none bg-black/50 text-white backdrop-blur">
                  <Flame className="h-3 w-3 text-orange-400" />
                  Hot
                </Badge>
              </div>
              <div className="p-4">
                <p className="truncate text-sm font-medium text-white">{nft.name}</p>
                <p className="mt-1 text-xs text-white/50">
                  <span className="text-purple-300">{nft.price} USDT</span>
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
