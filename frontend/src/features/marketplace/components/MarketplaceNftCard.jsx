import { motion } from "framer-motion";
import { ImageIcon, Tag } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

function truncateAddress(addr) {
  if (!addr) return "";
  return `${addr.slice(0, 6)}...${addr.slice(-4)}`;
}

export function MarketplaceNftCard({ listing, onBuy }) {
  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      whileHover={{ y: -6 }}
      transition={{ duration: 0.35 }}
      className="group overflow-hidden rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl transition-colors hover:border-purple-400/40"
    >
      <div className="relative aspect-square overflow-hidden">
        {listing.image ? (
          <img
            src={listing.image}
            alt={listing.name}
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
            loading="lazy"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center bg-black/40 text-white/20">
            <ImageIcon className="h-10 w-10" strokeWidth={1.5} />
          </div>
        )}
        <Badge className="absolute left-3 top-3 border-none bg-black/50 text-white backdrop-blur">
          {listing.collectionName}
        </Badge>
      </div>

      <div className="p-4">
        <p className="truncate text-sm font-semibold text-white">{listing.name}</p>
        <p className="mt-1 text-xs text-white/40">Seller {truncateAddress(listing.seller)}</p>

        <div className="mt-4 flex items-center justify-between">
          <div>
            <p className="text-xs text-white/40">Price</p>
            <p className="text-base font-bold text-purple-300">{listing.priceFormatted} USDT</p>
          </div>
          <Button onClick={() => onBuy(listing)} size="sm">
            <Tag className="h-3.5 w-3.5" />
            Buy
          </Button>
        </div>
      </div>
    </motion.div>
  );
}
