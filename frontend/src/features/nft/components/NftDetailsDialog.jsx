import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";

export function NftDetailsDialog({ nft, open, onOpenChange }) {
  if (!nft) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-h-[85vh] max-w-lg overflow-y-auto border-white/10 bg-zinc-950 text-white">
        <DialogHeader>
          <DialogTitle>{nft.name}</DialogTitle>
        </DialogHeader>

        {nft.image && (
          <div className="aspect-square w-full overflow-hidden rounded-xl bg-black/40">
            <img src={nft.image} alt={nft.name} className="h-full w-full object-cover" />
          </div>
        )}

        {nft.description && <p className="text-sm text-white/60">{nft.description}</p>}

        <Separator className="bg-white/10" />

        <div className="space-y-2 text-sm">
          <div className="flex justify-between">
            <span className="text-white/40">Token ID</span>
            <span className="font-medium">#{nft.tokenId.toString()}</span>
          </div>
          <div className="flex justify-between gap-4">
            <span className="text-white/40">Contract Address</span>
            <span className="truncate font-mono text-xs">{nft.contractAddress}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-white/40">Mint Date</span>
            <span className="font-medium">
              {nft.mintedAt ? nft.mintedAt.toLocaleString() : "Unknown"}
            </span>
          </div>
        </div>

        {nft.attributes?.length > 0 && (
          <div className="flex flex-wrap gap-2 pt-2">
            {nft.attributes.map((a, i) => (
              <Badge key={i} variant="secondary" className="border-white/10 bg-white/10 text-white/70">
                {a.trait_type}: {a.value}
              </Badge>
            ))}
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
