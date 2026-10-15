import { motion } from "framer-motion";
import { Wallet, ShieldCheck, Hammer, Tag, DollarSign } from "lucide-react";
import { SectionHeading } from "@/components/landing/SectionHeading";

const steps = [
  { icon: Wallet, title: "Connect Wallet", description: "Link your wallet with a single click." },
  { icon: ShieldCheck, title: "Approve USDT", description: "Grant the marketplace approval to spend USDT." },
  { icon: Hammer, title: "Mint NFT", description: "Upload your art and mint it on-chain." },
  { icon: Tag, title: "List NFT", description: "Set a price and list it on the marketplace." },
  { icon: DollarSign, title: "Sell NFT", description: "Get paid instantly in USDT when it sells." },
];

export function HowItWorksSection() {
  return (
    <section id="how-it-works" className="scroll-mt-20 relative py-24">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <SectionHeading eyebrow="Process" title="How it works" description="From wallet to sale in five simple steps." />

        <div className="relative mt-16">
          <div className="absolute left-0 right-0 top-6 hidden h-px bg-gradient-to-r from-transparent via-white/15 to-transparent lg:block" />
          <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-5">
            {steps.map(({ icon: Icon, title, description }, i) => (
              <motion.div
                key={title}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.4 }}
                transition={{ duration: 0.5, delay: i * 0.12 }}
                className="relative flex flex-col items-center text-center"
              >
                <div className="relative z-10 flex h-12 w-12 items-center justify-center rounded-full border border-white/10 bg-black bg-gradient-to-br from-purple-500 to-blue-500 text-white shadow-lg shadow-purple-500/20">
                  <Icon className="h-5 w-5" />
                </div>
                <span className="mt-4 text-xs font-semibold uppercase tracking-widest text-purple-300">
                  Step {i + 1}
                </span>
                <h3 className="mt-1 text-base font-semibold text-white">{title}</h3>
                <p className="mt-2 text-sm text-white/55">{description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
