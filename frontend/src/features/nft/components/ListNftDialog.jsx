import { useState } from "react";
import { parseUnits } from "viem";
import { useReadContract, useWriteContract } from "wagmi";
import { Loader2, Tag } from "lucide-react";

import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";

import { nftCollectionContract } from "@/contracts/nftCollection";
import { usdtContract } from "@/contracts/usdt";
import { useListNFT } from "@/hooks/useListNFT";
import { addresses } from "@/contracts/addresses";

export function ListNftDialog({ nft, open, onOpenChange, onListed }) {
  const [price, setPrice] = useState("");
  const { toast } = useToast();

  const { writeContractAsync: approveNft, isPending: isApproving } = useWriteContract();
  const { list, isPending: isListing, isConfirming } = useListNFT();

  const { data: decimals } = useReadContract({
    ...usdtContract,
    functionName: "decimals",
  });

  const handleSubmit = async () => {
    if (!nft || !price) return;
    try {
      await approveNft({
        ...nftCollectionContract,
        functionName: "approve",
        args: [addresses.nftMarketplace, nft.tokenId],
        gas: 150_000n,
      });

      const priceUnits = parseUnits(price, decimals ?? 6);
      await list({ nftContract: nft.contractAddress, tokenId: nft.tokenId, price: priceUnits });

      toast({ title: "NFT listed", description: `${nft.name} is now listed for ${price} USDT.` });
      onListed?.();
      onOpenChange(false);
      setPrice("");
    } catch (err) {
      toast({ title: "Listing failed", description: err.shortMessage ?? err.message, variant: "destructive" });
    }
  };

  if (!nft) return null;
  const isBusy = isApproving || isListing || isConfirming;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md border-white/10 bg-zinc-950 text-white">
        <DialogHeader>
          <DialogTitle>List {nft.name}</DialogTitle>
        </DialogHeader>

        <div className="space-y-2">
          <Label className="text-white/70">Price (USDT)</Label>
          <Input
            type="number"
            min="0"
            step="0.01"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            placeholder="e.g. 25.00"
            className="border-white/15 bg-white/5 text-white placeholder:text-white/30"
          />
        </div>

        <DialogFooter>
          <Button className="w-full" disabled={!price || isBusy} onClick={handleSubmit}>
            {isBusy && <Loader2 className="h-4 w-4 animate-spin" />}
            <Tag className="h-4 w-4" />
            {isBusy ? "Listing..." : "Confirm Listing"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
