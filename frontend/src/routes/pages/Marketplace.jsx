import { useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ImageOff, Loader2 } from "lucide-react";

import { useListings } from "@/hooks/useListings";
import { MarketplaceNftCard } from "@/features/marketplace/components/MarketplaceNftCard";
import { MarketplaceFilters } from "@/features/marketplace/components/MarketplaceFilters";
import { BuyNftDialog } from "@/features/marketplace/components/BuyNftDialog";

export default function Marketplace() {
  const { data: listings, isLoading, isError, refetch } = useListings();

  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("");
  const [collection, setCollection] = useState("");
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [buyListing, setBuyListing] = useState(null);

  const categories = useMemo(
    () => [...new Set((listings ?? []).map((l) => l.category))],
    [listings],
  );
  const collections = useMemo(
    () => [...new Set((listings ?? []).map((l) => l.collectionName))],
    [listings],
  );

  const filtered = useMemo(() => {
    if (!listings) return [];
    const query = search.trim().toLowerCase();

    return listings.filter((listing) => {
      const matchesSearch =
        !query ||
        listing.name.toLowerCase().includes(query) ||
        listing.tokenId.toString().includes(query) ||
        listing.seller.toLowerCase().includes(query);

      const matchesCategory = !category || listing.category === category;
      const matchesCollection = !collection || listing.collectionName === collection;

      const price = Number(listing.priceFormatted);
      const matchesMin = !minPrice || price >= Number(minPrice);
      const matchesMax = !maxPrice || price <= Number(maxPrice);

      return matchesSearch && matchesCategory && matchesCollection && matchesMin && matchesMax;
    });
  }, [listings, search, category, collection, minPrice, maxPrice]);

  return (
    <div className="min-h-full px-4 py-10 sm:px-6">
      <div className="mx-auto max-w-7xl">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Marketplace</h1>
          <p className="mt-1 text-sm text-muted-foreground">
            Browse active NFT listings priced in USDT.
          </p>
        </div>

        <div className="mt-8">
          <MarketplaceFilters
            search={search}
            onSearchChange={setSearch}
            category={category}
            onCategoryChange={setCategory}
            categories={categories}
            collection={collection}
            onCollectionChange={setCollection}
            collections={collections}
            minPrice={minPrice}
            onMinPriceChange={setMinPrice}
            maxPrice={maxPrice}
            onMaxPriceChange={setMaxPrice}
          />
        </div>

        <div className="mt-8">
          {isLoading && (
            <div className="flex flex-col items-center gap-3 py-24 text-muted-foreground">
              <Loader2 className="h-6 w-6 animate-spin" />
              <p className="text-sm">Loading listings...</p>
            </div>
          )}

          {isError && (
            <div className="flex flex-col items-center gap-3 py-24 text-muted-foreground">
              <ImageOff className="h-8 w-8" />
              <p className="text-sm">Couldn't load listings. Try again shortly.</p>
            </div>
          )}

          {!isLoading && !isError && filtered.length === 0 && (
            <div className="flex flex-col items-center gap-3 py-24 text-muted-foreground">
              <ImageOff className="h-8 w-8" />
              <p className="text-sm">No listings match your filters.</p>
            </div>
          )}

          {!isLoading && filtered.length > 0 && (
            <motion.div layout className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              <AnimatePresence>
                {filtered.map((listing) => (
                  <MarketplaceNftCard
                    key={listing.listingId.toString()}
                    listing={listing}
                    onBuy={setBuyListing}
                  />
                ))}
              </AnimatePresence>
            </motion.div>
          )}
        </div>
      </div>

      <BuyNftDialog
        listing={buyListing}
        open={Boolean(buyListing)}
        onOpenChange={(open) => !open && setBuyListing(null)}
        onPurchased={refetch}
      />
    </div>
  );
}
