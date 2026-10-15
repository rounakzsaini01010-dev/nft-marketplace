import { motion } from "framer-motion";
import { Hammer, ShoppingCart, Tag, DollarSign, ShieldCheck } from "lucide-react";
import { SectionHeading } from "@/components/landing/SectionHeading";

const features = [
  { icon: Hammer, title: "Mint NFTs", description: "Turn your art into on-chain assets in a few clicks." },
  { icon: ShoppingCart, title: "Buy NFTs", description: "Discover and collect NFTs from top creators." },
  { icon: Tag, title: "Sell NFTs", description: "List your NFTs and reach buyers instantly." },
  { icon: DollarSign, title: "USDT Payments", description: "Trade with stable, predictable USDT pricing." },
  { icon: ShieldCheck, title: "Secure Ownership", description: "Ownership enforced by audited smart contracts." },
];

export function FeaturesSection() {
  return (
    <section id="features" className="scroll-mt-20 relative py-24">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <SectionHeading
          eyebrow="Why VertexNFT"
          title="Everything you need to trade NFTs"
          description="A full-stack marketplace experience built for creators and collectors."
        />

        <div className="mt-14 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-5">
          {features.map(({ icon: Icon, title, description }, i) => (
            <motion.div
              key={title}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              whileHover={{ y: -6 }}
              className="group relative overflow-hidden rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-xl transition-colors hover:border-purple-400/40"
            >
              <div className="absolute -right-8 -top-8 h-24 w-24 rounded-full bg-purple-500/20 blur-2xl transition-opacity opacity-0 group-hover:opacity-100" />
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br from-purple-500 to-blue-500 text-white">
                <Icon className="h-5 w-5" />
              </div>
              <h3 className="mt-4 text-base font-semibold text-white">{title}</h3>
              <p className="mt-2 text-sm text-white/55">{description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
