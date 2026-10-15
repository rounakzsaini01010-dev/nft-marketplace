import { useQuery } from "@tanstack/react-query";
import { useAccount, usePublicClient } from "wagmi";
import { parseAbiItem } from "viem";
import { nftCollectionContract } from "@/contracts/nftCollection";
import { nftMarketplaceContract } from "@/contracts/nftMarketplace";

const mintedEvent = parseAbiItem(
  "event NFTMinted(address indexed user, uint256 indexed tokenId, string tokenURI)",
);
const listedEvent = parseAbiItem(
  "event NFTListed(uint256 indexed listingId, address indexed seller, address indexed nftContract, uint256 tokenId, uint256 price)",
);
const boughtEvent = parseAbiItem(
  "event NFTBought(uint256 indexed listingId, address indexed buyer, address indexed seller, address nftContract, uint256 tokenId, uint256 price, uint256 feePaid)",
);

async function withTimestamps(publicClient, logs, mapFn) {
  const blockNumbers = [...new Set(logs.map((log) => log.blockNumber))];
  const blocks = await Promise.all(blockNumbers.map((bn) => publicClient.getBlock({ blockNumber: bn })));
  const timestamps = new Map(blocks.map((b) => [b.number, new Date(Number(b.timestamp) * 1000)]));
  return logs.map((log) => mapFn(log, timestamps.get(log.blockNumber)));
}

export function useMyActivity() {
  const { address } = useAccount();
  const publicClient = usePublicClient();

  return useQuery({
    queryKey: ["my-activity", address],
    enabled: Boolean(address && publicClient),
    queryFn: async () => {
      const [mintLogs, listLogs, buyLogs, saleLogs] = await Promise.all([
        publicClient.getLogs({
          address: nftCollectionContract.address,
          event: mintedEvent,
          args: { user: address },
          fromBlock: 0n,
          toBlock: "latest",
        }),
        publicClient.getLogs({
          address: nftMarketplaceContract.address,
          event: listedEvent,
          args: { seller: address },
          fromBlock: 0n,
          toBlock: "latest",
        }),
        publicClient.getLogs({
          address: nftMarketplaceContract.address,
          event: boughtEvent,
          args: { buyer: address },
          fromBlock: 0n,
          toBlock: "latest",
        }),
        publicClient.getLogs({
          address: nftMarketplaceContract.address,
          event: boughtEvent,
          args: { seller: address },
          fromBlock: 0n,
          toBlock: "latest",
        }),
      ]);

      const [minted, listed, bought, sold] = await Promise.all([
        withTimestamps(publicClient, mintLogs, (log, timestamp) => ({
          type: "minted",
          tokenId: log.args.tokenId,
          txHash: log.transactionHash,
          timestamp,
        })),
        withTimestamps(publicClient, listLogs, (log, timestamp) => ({
          type: "listed",
          tokenId: log.args.tokenId,
          price: log.args.price,
          txHash: log.transactionHash,
          timestamp,
        })),
        withTimestamps(publicClient, buyLogs, (log, timestamp) => ({
          type: "purchased",
          tokenId: log.args.tokenId,
          price: log.args.price,
          txHash: log.transactionHash,
          timestamp,
        })),
        withTimestamps(publicClient, saleLogs, (log, timestamp) => ({
          type: "sold",
          tokenId: log.args.tokenId,
          price: log.args.price,
          feePaid: log.args.feePaid,
          txHash: log.transactionHash,
          timestamp,
        })),
      ]);

      const feed = [...minted, ...listed, ...bought, ...sold].sort(
        (a, b) => (b.timestamp?.getTime() ?? 0) - (a.timestamp?.getTime() ?? 0),
      );

      const revenue = sold.reduce((sum, item) => sum + (item.price - item.feePaid), 0n);

      return { feed, mintedCount: minted.length, soldCount: sold.length, revenue };
    },
  });
}
