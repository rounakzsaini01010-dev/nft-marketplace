import { motion } from "framer-motion";
import { CheckCircle2, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";

export function MintSuccessAnimation({ tokenId, txHash, explorerUrl, onMintAnother }) {
  return (
    <div className="flex flex-col items-center py-10 text-center">
      <motion.div
        initial={{ scale: 0, rotate: -90 }}
        animate={{ scale: 1, rotate: 0 }}
        transition={{ type: "spring", stiffness: 260, damping: 18 }}
        className="flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-br from-purple-500 to-blue-500 shadow-lg shadow-purple-500/30"
      >
        <CheckCircle2 className="h-10 w-10 text-white" />
      </motion.div>

      <motion.h3
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="mt-6 text-2xl font-bold text-white"
      >
        NFT Minted Successfully
      </motion.h3>

      <motion.p
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="mt-2 text-sm text-white/50"
      >
        {tokenId !== undefined ? `Token ID #${tokenId.toString()}` : "Your NFT is now live on-chain."}
      </motion.p>

      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="mt-8 flex items-center gap-3"
      >
        {txHash && (
          <Button asChild variant="outline" className="border-white/15 bg-white/5 text-white hover:bg-white/10">
            <a href={`${explorerUrl}/tx/${txHash}`} target="_blank" rel="noreferrer">
              View transaction
              <ExternalLink className="h-4 w-4" />
            </a>
          </Button>
        )}
        <Button onClick={onMintAnother}>Mint another</Button>
      </motion.div>
    </div>
  );
}
