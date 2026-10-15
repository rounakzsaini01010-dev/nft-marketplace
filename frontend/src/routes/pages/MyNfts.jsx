import { useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ImageOff, Loader2 } from "lucide-react";

import { useMyNfts } from "@/hooks/useMyNfts";
import { NftCard } from "@/features/nft/components/NftCard";
import { NftDetailsDialog } from "@/features/nft/components/NftDetailsDialog";
import { ListNftDialog } from "@/features/nft/components/ListNftDialog";
import { TransferNftDialog } from "@/features/nft/components/TransferNftDialog";
import { SearchFilterBar } from "@/features/nft/components/SearchFilterBar";

export default function MyNfts() {
  const { data: nfts, isLoading, isError } = useMyNfts();

  const [search, setSearch] = useState("");
  const [sort, setSort] = useState("newest");

  const [detailsNft, setDetailsNft] = useState(null);
  const [listNft, setListNft] = useState(null);
  const [transferNft, setTransferNft] = useState(null);

  const filtered = useMemo(() => {
    if (!nfts) return [];
    const query = search.trim().toLowerCase();
    let result = nfts.filter(
      (nft) =>
        !query ||
        nft.name.toLowerCase().includes(query) ||
        nft.tokenId.toString().includes(query),
    );

    if (sort === "oldest") result = [...result].sort((a, b) => Number(a.tokenId) - Number(b.tokenId));
    else if (sort === "name") result = [...result].sort((a, b) => a.name.localeCompare(b.name));
    else result = [...result].sort((a, b) => Number(b.tokenId) - Number(a.tokenId));

    return result;
  }, [nfts, search, sort]);

  return (
    <div className="min-h-full px-4 py-10 sm:px-6">
      <div className="mx-auto max-w-7xl">
        <div>
          <h1 className="text-3xl font-bold text-foreground">My NFTs</h1>
          <p className="mt-1 text-sm text-muted-foreground">
            NFTs owned by your connected wallet.
          </p>
        </div>

        <div className="mt-8">
          <SearchFilterBar search={search} onSearchChange={setSearch} sort={sort} onSortChange={setSort} />
        </div>

        <div className="mt-8">
          {isLoading && (
            <div className="flex flex-col items-center gap-3 py-24 text-muted-foreground">
              <Loader2 className="h-6 w-6 animate-spin" />
              <p className="text-sm">Loading your NFTs...</p>
            </div>
          )}

          {isError && (
            <div className="flex flex-col items-center gap-3 py-24 text-muted-foreground">
              <ImageOff className="h-8 w-8" />
              <p className="text-sm">Couldn't load your NFTs. Try again shortly.</p>
            </div>
          )}

          {!isLoading && !isError && filtered.length === 0 && (
            <div className="flex flex-col items-center gap-3 py-24 text-muted-foreground">
              <ImageOff className="h-8 w-8" />
              <p className="text-sm">No NFTs found.</p>
            </div>
          )}

          {!isLoading && filtered.length > 0 && (
            <motion.div layout className="columns-1 sm:columns-2 lg:columns-3 xl:columns-4">
              <AnimatePresence>
                {filtered.map((nft) => (
                  <NftCard
                    key={nft.tokenId.toString()}
                    nft={nft}
                    onView={setDetailsNft}
                    onList={setListNft}
                    onTransfer={setTransferNft}
                  />
                ))}
              </AnimatePresence>
            </motion.div>
          )}
        </div>
      </div>

      <NftDetailsDialog nft={detailsNft} open={Boolean(detailsNft)} onOpenChange={(open) => !open && setDetailsNft(null)} />
      <ListNftDialog nft={listNft} open={Boolean(listNft)} onOpenChange={(open) => !open && setListNft(null)} />
      <TransferNftDialog nft={transferNft} open={Boolean(transferNft)} onOpenChange={(open) => !open && setTransferNft(null)} />
    </div>
  );
}
