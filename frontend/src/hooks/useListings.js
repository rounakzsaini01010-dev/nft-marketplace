import { useQuery } from "@tanstack/react-query";
import { usePublicClient } from "wagmi";
import { formatUnits } from "viem";
import { nftMarketplaceContract } from "@/contracts/nftMarketplace";
import { usdtContract } from "@/contracts/usdt";
import { erc721MetadataAbi } from "@/contracts/erc721.abi";
import { fetchMetadata } from "@/lib/api";

function deriveCategory(attributes) {
  const match = attributes?.find((a) => a.trait_type?.toLowerCase() === "category");
  return match?.value ?? "Uncategorized";
}

export function useListings() {
  const publicClient = usePublicClient();

  return useQuery({
    queryKey: ["marketplace-listings", nftMarketplaceContract.address],
    enabled: Boolean(publicClient && nftMarketplaceContract.address),
    queryFn: async () => {
      const [total, decimals] = await Promise.all([
        publicClient.readContract({ ...nftMarketplaceContract, functionName: "totalListings" }),
        publicClient.readContract({ ...usdtContract, functionName: "decimals" }),
      ]);

      const listingIds = Array.from({ length: Number(total) }, (_, i) => BigInt(i + 1));

      const rawListings = await Promise.all(
        listingIds.map(async (listingId) => {
          const listing = await publicClient.readContract({
            ...nftMarketplaceContract,
            functionName: "getListing",
            args: [listingId],
          });
          return { listingId, ...listing };
        }),
      );

      const activeListings = rawListings.filter((l) => l.active);
      const collectionNameCache = new Map();

      const enriched = await Promise.all(
        activeListings.map(async (listing) => {
          if (!collectionNameCache.has(listing.nftContract)) {
            collectionNameCache.set(
              listing.nftContract,
              publicClient
                .readContract({
                  address: listing.nftContract,
                  abi: erc721MetadataAbi,
                  functionName: "name",
                })
                .catch(() => "Unknown Collection"),
            );
          }

          const [tokenUri, collectionName] = await Promise.all([
            publicClient.readContract({
              address: listing.nftContract,
              abi: erc721MetadataAbi,
              functionName: "tokenURI",
              args: [listing.tokenId],
            }),
            collectionNameCache.get(listing.nftContract),
          ]);

          const metadata = await fetchMetadata(tokenUri);

          return {
            listingId: listing.listingId,
            seller: listing.seller,
            nftContract: listing.nftContract,
            collectionName,
            tokenId: listing.tokenId,
            price: listing.price,
            priceFormatted: formatUnits(listing.price, decimals),
            name: metadata.name || `NFT #${listing.tokenId.toString()}`,
            description: metadata.description ?? "",
            image: metadata.image ?? "",
            attributes: metadata.attributes ?? [],
            category: deriveCategory(metadata.attributes),
          };
        }),
      );

      return enriched.sort((a, b) => Number(b.listingId) - Number(a.listingId));
    },
  });
}
