import { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";
import { Loader2, ShieldCheck, ShoppingCart, CheckCircle2, AlertTriangle } from "lucide-react";

import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";

import { useUsdtBalance } from "@/hooks/useUsdtBalance";
import { useUSDTApproval } from "@/hooks/useUSDTApproval";
import { useBuyNFT } from "@/hooks/useBuyNFT";
import { addresses } from "@/contracts/addresses";

export function BuyNftDialog({ listing, open, onOpenChange, onPurchased }) {
  const { toast } = useToast();
  const [step, setStep] = useState("review");

  const { raw: usdtBalance, formatted: balanceFormatted, refetch: refetchBalance } = useUsdtBalance();
  const {
    allowance,
    approve,
    isPending: isApproving,
    isConfirming: isApproveConfirming,
    refetchAllowance,
  } = useUSDTApproval(addresses.nftMarketplace);
  const { buy, isPending: isBuying, isConfirming: isBuyConfirming, hash } = useBuyNFT();

  useEffect(() => {
    if (open) setStep("review");
  }, [open]);

  if (!listing) return null;

  const hasEnoughBalance = usdtBalance >= listing.price;
  const hasAllowance = (allowance ?? 0n) >= listing.price;

  const handleApprove = async () => {
    try {
      await approve(listing.price);
      await refetchAllowance();
      toast({ title: "USDT approved" });
    } catch (err) {
      toast({ title: "Approval failed", description: err.shortMessage ?? err.message, variant: "destructive" });
    }
  };

  const handleBuy = async () => {
    try {
      await buy(listing.listingId);
      await refetchBalance();
      setStep("success");
      onPurchased?.();
    } catch (err) {
      toast({ title: "Purchase failed", description: err.shortMessage ?? err.message, variant: "destructive" });
    }
  };

  const isBusy = isApproving || isApproveConfirming || isBuying || isBuyConfirming;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md border-white/10 bg-zinc-950 text-white">
        {step === "review" && (
          <>
            <DialogHeader>
              <DialogTitle>Buy {listing.name}</DialogTitle>
            </DialogHeader>

            <div className="space-y-4">
              <div className="flex items-center gap-3 rounded-xl border border-white/10 bg-white/5 p-4">
                {listing.image && (
                  <img src={listing.image} alt={listing.name} className="h-14 w-14 rounded-lg object-cover" />
                )}
                <div className="flex-1">
                  <p className="text-sm font-medium">{listing.name}</p>
                  <p className="text-xs text-white/40">Token #{listing.tokenId.toString()}</p>
                </div>
                <p className="text-base font-bold text-purple-300">{listing.priceFormatted} USDT</p>
              </div>

              <div className="flex items-center justify-between text-sm text-white/60">
                <span>Your USDT balance</span>
                <span className="font-medium text-white">{balanceFormatted} USDT</span>
              </div>

              {!hasEnoughBalance && (
                <div className="flex items-center gap-2 rounded-lg border border-destructive/40 bg-destructive/10 p-3 text-sm text-destructive">
                  <AlertTriangle className="h-4 w-4 shrink-0" />
                  Insufficient USDT balance to complete this purchase.
                </div>
              )}

              <Button
                className="w-full"
                size="lg"
                disabled={!hasEnoughBalance || hasAllowance || isApproving || isApproveConfirming}
                onClick={handleApprove}
              >
                {(isApproving || isApproveConfirming) && <Loader2 className="h-4 w-4 animate-spin" />}
                <ShieldCheck className="h-4 w-4" />
                {hasAllowance ? "USDT Approved" : "Approve USDT"}
              </Button>

              <Button
                className="w-full"
                size="lg"
                variant="secondary"
                disabled={!hasEnoughBalance || !hasAllowance || isBuying || isBuyConfirming}
                onClick={handleBuy}
              >
                {(isBuying || isBuyConfirming) && <Loader2 className="h-4 w-4 animate-spin" />}
                <ShoppingCart className="h-4 w-4" />
                {isBuyConfirming ? "Confirming..." : "Buy Now"}
              </Button>
            </div>
          </>
        )}

        {step === "success" && (
          <div className="flex flex-col items-center py-6 text-center">
            <motion.div
              initial={{ scale: 0, rotate: -90 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ type: "spring", stiffness: 260, damping: 18 }}
              className="flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-purple-500 to-blue-500 shadow-lg shadow-purple-500/30"
            >
              <CheckCircle2 className="h-8 w-8 text-white" />
            </motion.div>
            <h3 className="mt-5 text-xl font-bold">Purchase Successful</h3>
            <p className="mt-1 text-sm text-white/50">{listing.name} is now yours.</p>
            <Button className="mt-6 w-full" onClick={() => onOpenChange(false)}>
              Done
            </Button>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
