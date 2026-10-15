import { useQuery } from "@tanstack/react-query";
import { useAccount, usePublicClient } from "wagmi";
import { parseAbiItem, zeroAddress } from "viem";
import { nftCollectionContract } from "@/contracts/nftCollection";
import { fetchMetadata } from "@/lib/api";

const transferEvent = parseAbiItem(
  "event Transfer(address indexed from, address indexed to, uint256 indexed tokenId)",
);

export function useMyNfts() {
  const { address } = useAccount();
  const publicClient = usePublicClient();

  return useQuery({
    queryKey: ["my-nfts", address, nftCollectionContract.address],
    enabled: Boolean(address && publicClient && nftCollectionContract.address),
    queryFn: async () => {
      const incomingLogs = await publicClient.getLogs({
        address: nftCollectionContract.address,
        event: transferEvent,
        args: { to: address },
        fromBlock: 0n,
        toBlock: "latest",
      });

      const candidateIds = [...new Set(incomingLogs.map((log) => log.args.tokenId))];

      const owned = await Promise.all(
        candidateIds.map(async (tokenId) => {
          try {
            const owner = await publicClient.readContract({
              ...nftCollectionContract,
              functionName: "ownerOf",
              args: [tokenId],
            });
            return owner.toLowerCase() === address.toLowerCase() ? tokenId : null;
          } catch {
            return null;
          }
        }),
      );

      const ownedIds = owned.filter((id) => id !== null);

      const nfts = await Promise.all(
        ownedIds.map(async (tokenId) => {
          const [tokenUri, mintLogs] = await Promise.all([
            publicClient.readContract({
              ...nftCollectionContract,
              functionName: "tokenURI",
              args: [tokenId],
            }),
            publicClient.getLogs({
              address: nftCollectionContract.address,
              event: transferEvent,
              args: { from: zeroAddress, tokenId },
              fromBlock: 0n,
              toBlock: "latest",
            }),
          ]);

          let mintedAt = null;
          if (mintLogs[0]) {
            const block = await publicClient.getBlock({ blockNumber: mintLogs[0].blockNumber });
            mintedAt = new Date(Number(block.timestamp) * 1000);
          }

          const metadata = await fetchMetadata(tokenUri);

          return {
            tokenId,
            contractAddress: nftCollectionContract.address,
            tokenUri,
            mintedAt,
            name: metadata.name || `NFT #${tokenId.toString()}`,
            description: metadata.description ?? "",
            image: metadata.image ?? "",
            attributes: metadata.attributes ?? [],
          };
        }),
      );

      return nfts.sort((a, b) => Number(b.tokenId) - Number(a.tokenId));
    },
  });
}
