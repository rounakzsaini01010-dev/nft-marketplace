import { cn } from "@/lib/utils";
import nft0 from "@/assets/nft/nft-0.svg";
import nft1 from "@/assets/nft/nft-1.svg";
import nft2 from "@/assets/nft/nft-2.svg";
import nft3 from "@/assets/nft/nft-3.svg";
import nft4 from "@/assets/nft/nft-4.svg";
import nft5 from "@/assets/nft/nft-5.svg";
import nft6 from "@/assets/nft/nft-6.svg";
import nft7 from "@/assets/nft/nft-7.svg";

const artworks = [nft0, nft1, nft2, nft3, nft4, nft5, nft6, nft7];

export function NftArtTile({ seed = 0, className }) {
  const src = artworks[seed % artworks.length];
  return (
    <div className={cn("relative overflow-hidden rounded-xl", className)}>
      <img
        src={src}
        alt="NFT artwork"
        className="h-full w-full object-cover"
        loading="lazy"
      />
    </div>
  );
}
