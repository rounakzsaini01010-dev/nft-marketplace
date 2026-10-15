import { motion } from "framer-motion";
import { ImageIcon, Eye, Tag, Send } from "lucide-react";
import { Button } from "@/components/ui/button";

function truncateAddress(addr) {
  if (!addr) return "";
  return `${addr.slice(0, 6)}...${addr.slice(-4)}`;
}

export function NftCard({ nft, onView, onList, onTransfer }) {
  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      whileHover={{ y: -6 }}
      transition={{ duration: 0.35 }}
      className="group flex h-full flex-col overflow-hidden rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl transition-colors hover:border-purple-400/40"
    >
      <div className="relative aspect-square overflow-hidden">
        {nft.image ? (
          <img
            src={nft.image}
            alt={nft.name}
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
            loading="lazy"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center bg-black/40 text-white/20">
            <ImageIcon className="h-10 w-10" strokeWidth={1.5} />
          </div>
        )}

        <div className="absolute inset-0 flex flex-wrap items-end gap-2 bg-gradient-to-t from-black/80 via-black/10 to-black/0 p-3 opacity-100 transition-opacity duration-300 md:opacity-0 md:group-hover:opacity-100">
          <Button size="sm" variant="secondary" onClick={() => onView(nft)} className="bg-white/10 text-white hover:bg-white/20">
            <Eye className="h-3.5 w-3.5" />
            View
          </Button>
          <Button size="sm" variant="secondary" onClick={() => onList(nft)} className="bg-white/10 text-white hover:bg-white/20">
            <Tag className="h-3.5 w-3.5" />
            List
          </Button>
          <Button size="sm" variant="secondary" onClick={() => onTransfer(nft)} className="bg-white/10 text-white hover:bg-white/20">
            <Send className="h-3.5 w-3.5" />
            Transfer
          </Button>
        </div>
      </div>

      <div className="flex flex-1 flex-col p-4">
        <p className="truncate text-sm font-semibold text-white">{nft.name}</p>
        <div className="mt-2 flex items-center justify-between text-xs text-white/40">
          <span>Token #{nft.tokenId.toString()}</span>
          <span>{truncateAddress(nft.contractAddress)}</span>
        </div>
        {nft.mintedAt && (
          <p className="mt-1 text-xs text-white/30">
            Minted {nft.mintedAt.toLocaleDateString()}
          </p>
        )}
      </div>
    </motion.div>
  );
}
