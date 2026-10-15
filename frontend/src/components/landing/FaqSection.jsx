import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { SectionHeading } from "@/components/landing/SectionHeading";
import { cn } from "@/lib/utils";

const faqs = [
  {
    q: "How do I mint an NFT?",
    a: "Connect your wallet, go to the Mint page, upload your artwork, and confirm the mint transaction.",
  },
  {
    q: "What currency is used for payments?",
    a: "All listings and sales on VertexNFT are priced and settled in USDT for price stability.",
  },
  {
    q: "Do I need to approve USDT before buying?",
    a: "Yes, the marketplace contract requires a one-time USDT approval before your first purchase.",
  },
  {
    q: "Is my NFT ownership secure?",
    a: "Ownership is enforced entirely on-chain by audited smart contracts, not a centralized database.",
  },
  {
    q: "What fees does the marketplace charge?",
    a: "A small platform fee is deducted automatically from each sale; listing is free.",
  },
];

function FaqItem({ item, isOpen, onToggle }) {
  return (
    <div className="overflow-hidden rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl">
      <button
        onClick={onToggle}
        className="flex w-full items-center justify-between gap-4 px-6 py-5 text-left"
      >
        <span className="text-sm font-medium text-white sm:text-base">{item.q}</span>
        <ChevronDown
          className={cn("h-4 w-4 shrink-0 text-white/50 transition-transform", isOpen && "rotate-180 text-purple-300")}
        />
      </button>
      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
          >
            <p className="px-6 pb-5 text-sm text-white/55">{item.a}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export function FaqSection() {
  const [openIndex, setOpenIndex] = useState(0);

  return (
    <section id="faq" className="scroll-mt-20 relative py-24">
      <div className="mx-auto max-w-3xl px-4 sm:px-6">
        <SectionHeading eyebrow="FAQ" title="Frequently asked questions" />

        <div className="mt-12 space-y-4">
          {faqs.map((item, i) => (
            <FaqItem
              key={item.q}
              item={item}
              isOpen={openIndex === i}
              onToggle={() => setOpenIndex(openIndex === i ? -1 : i)}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
