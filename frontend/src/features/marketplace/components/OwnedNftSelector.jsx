import { motion } from "framer-motion";
import { ImageIcon, Check } from "lucide-react";
import { cn } from "@/lib/utils";

export function OwnedNftSelector({ nfts, selectedTokenId, onSelect }) {
  if (nfts.length === 0) {
    return (
      <div className="flex flex-col items-center gap-2 rounded-2xl border border-white/10 bg-white/5 py-16 text-center text-white/40">
        <ImageIcon className="h-8 w-8" strokeWidth={1.5} />
        <p className="text-sm">You don't own any NFTs to list yet.</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
      {nfts.map((nft) => {
        const isSelected = selectedTokenId === nft.tokenId;
        return (
          <motion.button
            key={nft.tokenId.toString()}
            type="button"
            onClick={() => onSelect(nft)}
            whileHover={{ y: -4 }}
            className={cn(
              "relative overflow-hidden rounded-xl border bg-white/5 text-left backdrop-blur-xl transition-colors",
              isSelected ? "border-purple-400 ring-2 ring-purple-400/40" : "border-white/10 hover:border-white/25",
            )}
          >
            <div className="aspect-square w-full overflow-hidden bg-black/40">
              {nft.image ? (
                <img src={nft.image} alt={nft.name} className="h-full w-full object-cover" />
              ) : (
                <div className="flex h-full w-full items-center justify-center text-white/20">
                  <ImageIcon className="h-8 w-8" strokeWidth={1.5} />
                </div>
              )}
            </div>
            {isSelected && (
              <div className="absolute right-2 top-2 flex h-6 w-6 items-center justify-center rounded-full bg-purple-500">
                <Check className="h-3.5 w-3.5 text-white" />
              </div>
            )}
            <div className="p-2.5">
              <p className="truncate text-xs font-medium text-white">{nft.name}</p>
              <p className="text-[11px] text-white/40">#{nft.tokenId.toString()}</p>
            </div>
          </motion.button>
        );
      })}
    </div>
  );
}
