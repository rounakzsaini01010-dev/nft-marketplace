import { useQuery } from "@tanstack/react-query";
import { usePublicClient } from "wagmi";
import { parseAbiItem, formatUnits } from "viem";
import { nftMarketplaceContract } from "@/contracts/nftMarketplace";
import { usdtContract } from "@/contracts/usdt";

const boughtEvent = parseAbiItem(
  "event NFTBought(uint256 indexed listingId, address indexed buyer, address indexed seller, address nftContract, uint256 tokenId, uint256 price, uint256 feePaid)",
);

export function useMarketplaceVolume() {
  const publicClient = usePublicClient();

  return useQuery({
    queryKey: ["marketplace-volume"],
    enabled: Boolean(publicClient),
    queryFn: async () => {
      const [logs, decimals] = await Promise.all([
        publicClient.getLogs({
          address: nftMarketplaceContract.address,
          event: boughtEvent,
          fromBlock: 0n,
          toBlock: "latest",
        }),
        publicClient.readContract({ ...usdtContract, functionName: "decimals" }),
      ]);

      const blockNumbers = [...new Set(logs.map((l) => l.blockNumber))];
      const blocks = await Promise.all(blockNumbers.map((bn) => publicClient.getBlock({ blockNumber: bn })));
      const timestamps = new Map(blocks.map((b) => [b.number, new Date(Number(b.timestamp) * 1000)]));

      const totalVolume = logs.reduce((sum, log) => sum + log.args.price, 0n);

      const series = logs
        .map((log) => ({
          date: timestamps.get(log.blockNumber),
          price: Number(formatUnits(log.args.price, decimals)),
        }))
        .sort((a, b) => (a.date?.getTime() ?? 0) - (b.date?.getTime() ?? 0));

      return {
        totalVolumeFormatted: formatUnits(totalVolume, decimals),
        salesCount: logs.length,
        series,
      };
    },
  });
}
