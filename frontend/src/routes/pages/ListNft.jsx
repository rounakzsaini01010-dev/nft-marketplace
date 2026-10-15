import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { parseUnits } from "viem";
import { useWriteContract, useReadContract } from "wagmi";
import { Loader2, ShieldCheck, Tag, CheckCircle2 } from "lucide-react";

import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";

import { useMyNfts } from "@/hooks/useMyNfts";
import { usePlatformFee } from "@/hooks/usePlatformFee";
import { useListNFT } from "@/hooks/useListNFT";
import { usdtContract } from "@/contracts/usdt";
import { nftCollectionContract } from "@/contracts/nftCollection";
import { addresses } from "@/contracts/addresses";

import { ListingStepper } from "@/features/marketplace/components/ListingStepper";
import { OwnedNftSelector } from "@/features/marketplace/components/OwnedNftSelector";
import { ListingPricePreview } from "@/features/marketplace/components/ListingPricePreview";
import { NftPreviewCard } from "@/features/mint/components/NftPreviewCard";

export default function ListNft() {
  const { toast } = useToast();
  const { data: nfts, isLoading: isLoadingNfts } = useMyNfts();
  const { percent: feePercent } = usePlatformFee();
  const { data: usdtDecimals } = useReadContract({ ...usdtContract, functionName: "decimals" });

  const [step, setStep] = useState(1);
  const [selectedNft, setSelectedNft] = useState(null);
  const [price, setPrice] = useState("");

  const { writeContractAsync: approveNft, isPending: isApproving } = useWriteContract();
  const { list, isPending: isListing, isConfirming: isListConfirming } = useListNFT();

  const handleSelect = (nft) => {
    setSelectedNft(nft);
    setStep(2);
  };

  const handleApprove = async () => {
    try {
      await approveNft({
        ...nftCollectionContract,
        functionName: "approve",
        args: [addresses.nftMarketplace, selectedNft.tokenId],
        gas: 150_000n,
      });
      toast({ title: "Marketplace approved" });
    } catch (err) {
      toast({ title: "Approval failed", description: err.shortMessage ?? err.message, variant: "destructive" });
    }
  };

  const handleList = async () => {
    try {
      const priceUnits = parseUnits(price, usdtDecimals ?? 6);
      await list({ nftContract: selectedNft.contractAddress, tokenId: selectedNft.tokenId, price: priceUnits });
      setStep(4);
    } catch (err) {
      toast({ title: "Listing failed", description: err.shortMessage ?? err.message, variant: "destructive" });
    }
  };

  const resetFlow = () => {
    setStep(1);
    setSelectedNft(null);
    setPrice("");
  };

  return (
    <div className="min-h-full bg-black px-4 py-12 sm:px-6">
      <div className="mx-auto max-w-5xl">
        <div className="text-center">
          <span className="inline-block rounded-full border border-white/10 bg-white/5 px-4 py-1 text-xs font-medium uppercase tracking-widest text-purple-300">
            Sell
          </span>
          <h1 className="mt-4 text-3xl font-bold text-white sm:text-4xl">List an NFT</h1>
          <p className="mt-2 text-sm text-white/50">Set your price and list on the marketplace.</p>
        </div>

        <Card className="mt-10 border-white/10 bg-white/[0.03] backdrop-blur-xl">
          <CardContent className="p-6 sm:p-8">
            <ListingStepper currentStep={step} />

            <div className="mt-10">
              <AnimatePresence mode="wait">
                {step === 1 && (
                  <motion.div key="step1" initial={{ opacity: 0, x: -12 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 12 }}>
                    {isLoadingNfts ? (
                      <div className="flex justify-center py-16 text-white/40">
                        <Loader2 className="h-6 w-6 animate-spin" />
                      </div>
                    ) : (
                      <OwnedNftSelector nfts={nfts ?? []} selectedTokenId={selectedNft?.tokenId} onSelect={handleSelect} />
                    )}
                  </motion.div>
                )}

                {step === 2 && selectedNft && (
                  <motion.div
                    key="step2"
                    initial={{ opacity: 0, x: -12 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 12 }}
                    className="grid grid-cols-1 gap-8 lg:grid-cols-2"
                  >
                    <NftPreviewCard
                      previewUrl={selectedNft.image}
                      name={selectedNft.name}
                      description={selectedNft.description}
                      attributes={selectedNft.attributes}
                    />
                    <div className="space-y-5">
                      <ListingPricePreview price={price} onPriceChange={setPrice} feePercent={feePercent} />
                      <Button className="w-full" size="lg" disabled={!price || Number(price) <= 0} onClick={() => setStep(3)}>
                        Continue
                      </Button>
                    </div>
                  </motion.div>
                )}

                {step === 3 && selectedNft && (
                  <motion.div key="step3" initial={{ opacity: 0, x: -12 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 12 }} className="mx-auto max-w-md space-y-5">
                    <ListingPricePreview price={price} onPriceChange={setPrice} feePercent={feePercent} />

                    <Button className="w-full" size="lg" disabled={isApproving} onClick={handleApprove}>
                      {isApproving && <Loader2 className="h-4 w-4 animate-spin" />}
                      <ShieldCheck className="h-4 w-4" />
                      Approve Marketplace
                    </Button>

                    <Button
                      className="w-full"
                      size="lg"
                      variant="secondary"
                      disabled={isListing || isListConfirming}
                      onClick={handleList}
                    >
                      {(isListing || isListConfirming) && <Loader2 className="h-4 w-4 animate-spin" />}
                      <Tag className="h-4 w-4" />
                      {isListConfirming ? "Confirming..." : "List NFT"}
                    </Button>
                  </motion.div>
                )}

                {step === 4 && (
                  <motion.div key="step4" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex flex-col items-center py-10 text-center">
                    <motion.div
                      initial={{ scale: 0, rotate: -90 }}
                      animate={{ scale: 1, rotate: 0 }}
                      transition={{ type: "spring", stiffness: 260, damping: 18 }}
                      className="flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-br from-purple-500 to-blue-500 shadow-lg shadow-purple-500/30"
                    >
                      <CheckCircle2 className="h-10 w-10 text-white" />
                    </motion.div>
                    <h3 className="mt-6 text-2xl font-bold text-white">NFT Listed Successfully</h3>
                    <p className="mt-2 text-sm text-white/50">
                      {selectedNft?.name} is now live on the marketplace for {price} USDT.
                    </p>
                    <Button className="mt-8" onClick={resetFlow}>
                      List another
                    </Button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
