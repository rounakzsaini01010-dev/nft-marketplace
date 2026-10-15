import { useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { decodeEventLog } from "viem";
import { useAccount } from "wagmi";
import { Loader2, ShieldCheck, Hammer } from "lucide-react";

import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";

import { MintStepper } from "@/features/mint/components/MintStepper";
import { ImageUploader } from "@/features/mint/components/ImageUploader";
import { NftPreviewCard } from "@/features/mint/components/NftPreviewCard";
import { UsdtBalanceCard } from "@/features/mint/components/UsdtBalanceCard";
import { MintSuccessAnimation } from "@/features/mint/components/MintSuccessAnimation";

import { uploadNftToBackend } from "@/lib/api";
import { useUSDTApproval } from "@/hooks/useUSDTApproval";
import { useMintNFT } from "@/hooks/useMintNFT";
import { useMintFee } from "@/hooks/useMintFee";
import { addresses } from "@/contracts/addresses";
import { nftCollectionAbi } from "@/contracts/abi";
import { supportedChains } from "@/config/chains";

const explorerUrl = supportedChains[0]?.blockExplorers?.default?.url ?? "";

export default function Mint() {
  const { address } = useAccount();
  const { toast } = useToast();

  const [step, setStep] = useState(1);
  const [imageFile, setImageFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState("");

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [metadataUri, setMetadataUri] = useState("");
  const [isUploadingMetadata, setIsUploadingMetadata] = useState(false);

  const [mintedTokenId, setMintedTokenId] = useState(undefined);

  const { formatted: feeFormatted, raw: mintFeeRaw } = useMintFee();
  const {
    allowance,
    approve,
    isPending: isApprovePending,
    isConfirming: isApproveConfirming,
    refetchAllowance,
  } = useUSDTApproval(addresses.nftCollection);

  const {
    mint,
    receipt,
    isPending: isMintPending,
    isConfirming: isMintConfirming,
    hash: mintHash,
  } = useMintNFT();

  const hasAllowance = useMemo(
    () => (allowance ?? 0n) >= mintFeeRaw,
    [allowance, mintFeeRaw],
  );

  const handleImageSelected = (file) => {
    setImageFile(file);
    setPreviewUrl(URL.createObjectURL(file));
  };

  const handleContinueFromImage = () => {
    if (!imageFile) return;
    setStep(2);
  };

  const handleUploadMetadata = async () => {
    if (!name.trim()) {
      toast({ title: "Name is required", variant: "destructive" });
      return;
    }
    setIsUploadingMetadata(true);
    try {
      const result = await uploadNftToBackend({
        name,
        description,
        walletAddress: address,
        imageFile,
      });
      setMetadataUri(result.metadata_url);
      setStep(3);
    } catch (err) {
      toast({ title: "Upload failed", description: err.message, variant: "destructive" });
    } finally {
      setIsUploadingMetadata(false);
    }
  };

  const handleApprove = async () => {
    try {
      await approve(mintFeeRaw);
      await refetchAllowance();
      toast({ title: "USDT approved" });
      setStep(4);
    } catch (err) {
      toast({ title: "Approval failed", description: err.shortMessage ?? err.message, variant: "destructive" });
    }
  };

  const handleMint = async () => {
    try {
      await mint({ recipient: address, tokenUri: metadataUri });
      setStep(5);
    } catch (err) {
      toast({ title: "Mint failed", description: err.shortMessage ?? err.message, variant: "destructive" });
    }
  };

  useMemo(() => {
    if (!receipt) return;
    try {
      for (const log of receipt.logs) {
        const decoded = decodeEventLog({ abi: nftCollectionAbi, data: log.data, topics: log.topics });
        if (decoded.eventName === "NFTMinted") {
          setMintedTokenId(decoded.args.tokenId);
          break;
        }
      }
    } catch {
      // non-matching log, ignore
    }
  }, [receipt]);

  const resetForm = () => {
    setStep(1);
    setImageFile(null);
    setPreviewUrl("");
    setImageUri("");
    setName("");
    setDescription("");
    setAttributes([]);
    setMetadataUri("");
    setMintedTokenId(undefined);
  };

  return (
    <div className="relative min-h-full bg-black px-4 py-12 sm:px-6">
      <div className="mx-auto max-w-5xl">
        <div className="text-center">
          <span className="inline-block rounded-full border border-white/10 bg-white/5 px-4 py-1 text-xs font-medium uppercase tracking-widest text-purple-300">
            Create
          </span>
          <h1 className="mt-4 text-3xl font-bold text-white sm:text-4xl">Mint your NFT</h1>
          <p className="mt-2 text-sm text-white/50">Mint fee: {feeFormatted} USDT · paid on mint</p>
        </div>

        <Card className="mt-10 border-white/10 bg-white/[0.03] backdrop-blur-xl">
          <CardContent className="p-6 sm:p-8">
            <MintStepper currentStep={step} />

            <div className="mt-10 grid grid-cols-1 gap-8 lg:grid-cols-2">
              <div>
                <AnimatePresence mode="wait">
                  {step === 1 && (
                    <motion.div key="step1" initial={{ opacity: 0, x: -12 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 12 }}>
                      <ImageUploader previewUrl={previewUrl} onFileSelected={handleImageSelected} />
                      <Button
                        className="mt-5 w-full"
                        size="lg"
                        disabled={!imageFile}
                        onClick={handleContinueFromImage}
                      >
                        Continue
                      </Button>
                    </motion.div>
                  )}

                  {step === 2 && (
                    <motion.div key="step2" initial={{ opacity: 0, x: -12 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 12 }} className="space-y-4">
                      <div>
                        <Label className="text-white/70">Name</Label>
                        <Input
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                          placeholder="e.g. VertexNFT Genesis #1"
                          className="mt-1.5 border-white/15 bg-white/5 text-white placeholder:text-white/30"
                        />
                      </div>
                      <div>
                        <Label className="text-white/70">Description</Label>
                        <Textarea
                          value={description}
                          onChange={(e) => setDescription(e.target.value)}
                          placeholder="Tell collectors about this piece..."
                          className="mt-1.5 border-white/15 bg-white/5 text-white placeholder:text-white/30"
                        />
                      </div>
                      <Button
                        className="w-full"
                        size="lg"
                        disabled={isUploadingMetadata}
                        onClick={handleUploadMetadata}
                      >
                        {isUploadingMetadata && <Loader2 className="h-4 w-4 animate-spin" />}
                        {isUploadingMetadata ? "Uploading to server..." : "Continue"}
                      </Button>
                    </motion.div>
                  )}

                  {step === 3 && (
                    <motion.div key="step3" initial={{ opacity: 0, x: -12 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 12 }} className="space-y-5">
                      <UsdtBalanceCard />
                      <div className="rounded-2xl border border-white/10 bg-white/5 p-5 text-sm text-white/60">
                        Before minting, approve the NFT contract to spend{" "}
                        <span className="font-medium text-white">{feeFormatted} USDT</span> on your behalf.
                      </div>
                      <Button
                        className="w-full"
                        size="lg"
                        disabled={hasAllowance || isApprovePending || isApproveConfirming}
                        onClick={handleApprove}
                      >
                        {(isApprovePending || isApproveConfirming) && <Loader2 className="h-4 w-4 animate-spin" />}
                        <ShieldCheck className="h-4 w-4" />
                        {hasAllowance ? "USDT Already Approved" : "Approve USDT"}
                      </Button>
                      {hasAllowance && (
                        <Button className="w-full" variant="outline" onClick={() => setStep(4)}>
                          Continue
                        </Button>
                      )}
                    </motion.div>
                  )}

                  {step === 4 && (
                    <motion.div key="step4" initial={{ opacity: 0, x: -12 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 12 }} className="space-y-5">
                      <UsdtBalanceCard />
                      <div className="rounded-2xl border border-white/10 bg-white/5 p-5 text-sm text-white/60">
                        Ready to mint. This will charge {feeFormatted} USDT and create your NFT on-chain.
                      </div>
                      <Button className="w-full" size="lg" disabled={isMintPending || isMintConfirming} onClick={handleMint}>
                        {(isMintPending || isMintConfirming) && <Loader2 className="h-4 w-4 animate-spin" />}
                        <Hammer className="h-4 w-4" />
                        {isMintConfirming ? "Confirming transaction..." : "Mint NFT"}
                      </Button>
                    </motion.div>
                  )}

                  {step === 5 && (
                    <motion.div key="step5" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                      <MintSuccessAnimation
                        tokenId={mintedTokenId}
                        txHash={mintHash}
                        explorerUrl={explorerUrl}
                        onMintAnother={resetForm}
                      />
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              <div className="lg:sticky lg:top-24 lg:self-start">
                <NftPreviewCard previewUrl={previewUrl} name={name} description={description} />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
