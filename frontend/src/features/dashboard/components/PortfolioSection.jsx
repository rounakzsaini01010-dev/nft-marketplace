import { useNavigate } from "react-router-dom";
import { ImageOff } from "lucide-react";
import { PortfolioNftCard } from "@/features/dashboard/components/PortfolioNftCard";
import { PortfolioGridSkeleton } from "@/features/dashboard/components/skeletons";
import { EmptyState } from "@/features/dashboard/components/EmptyState";

export function PortfolioSection({ nfts, listedTokenIds, isLoading }) {
  const navigate = useNavigate();

  return (
    <section>
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold text-white">NFT Portfolio</h2>
        <span className="text-xs text-white/40">{nfts.length} items</span>
      </div>

      <div className="mt-4">
        {isLoading ? (
          <PortfolioGridSkeleton />
        ) : nfts.length === 0 ? (
          <EmptyState
            icon={ImageOff}
            title="No NFTs yet"
            description="Mint your first NFT to start building your collection."
            actionLabel="Mint an NFT"
            onAction={() => navigate("/mint")}
          />
        ) : (
          <div className="grid grid-cols-2 gap-5 sm:grid-cols-3 lg:grid-cols-4">
            {nfts.slice(0, 8).map((nft) => (
              <PortfolioNftCard
                key={nft.tokenId.toString()}
                nft={nft}
                isListed={listedTokenIds.has(nft.tokenId.toString())}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
