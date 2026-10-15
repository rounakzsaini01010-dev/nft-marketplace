import { useState } from "react";
import { isAddress } from "viem";
import { useAccount, useWriteContract } from "wagmi";
import { Loader2, Send } from "lucide-react";

import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";

import { nftCollectionContract } from "@/contracts/nftCollection";

export function TransferNftDialog({ nft, open, onOpenChange, onTransferred }) {
  const [recipient, setRecipient] = useState("");
  const { address } = useAccount();
  const { toast } = useToast();
  const { writeContractAsync, isPending } = useWriteContract();

  const isValid = isAddress(recipient || "");

  const handleSubmit = async () => {
    if (!nft || !isValid) return;
    try {
      await writeContractAsync({
        ...nftCollectionContract,
        functionName: "safeTransferFrom",
        args: [address, recipient, nft.tokenId],
        gas: 200_000n,
      });
      toast({ title: "NFT transferred", description: `${nft.name} sent to ${recipient}.` });
      onTransferred?.();
      onOpenChange(false);
      setRecipient("");
    } catch (err) {
      toast({ title: "Transfer failed", description: err.shortMessage ?? err.message, variant: "destructive" });
    }
  };

  if (!nft) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md border-white/10 bg-zinc-950 text-white">
        <DialogHeader>
          <DialogTitle>Transfer {nft.name}</DialogTitle>
        </DialogHeader>

        <div className="space-y-2">
          <Label className="text-white/70">Recipient address</Label>
          <Input
            value={recipient}
            onChange={(e) => setRecipient(e.target.value)}
            placeholder="0x..."
            className="border-white/15 bg-white/5 text-white placeholder:text-white/30"
          />
          {recipient && !isValid && (
            <p className="text-xs text-destructive">Enter a valid wallet address.</p>
          )}
        </div>

        <DialogFooter>
          <Button className="w-full" disabled={!isValid || isPending} onClick={handleSubmit}>
            {isPending && <Loader2 className="h-4 w-4 animate-spin" />}
            <Send className="h-4 w-4" />
            {isPending ? "Transferring..." : "Confirm Transfer"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
