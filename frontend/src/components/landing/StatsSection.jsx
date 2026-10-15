import { motion } from "framer-motion";
import { Image, TrendingUp, Layers, Users } from "lucide-react";

const stats = [
  { icon: Image, label: "NFTs Minted", value: "24,800+" },
  { icon: TrendingUp, label: "Total Volume", value: "$18.4M" },
  { icon: Layers, label: "Active Listings", value: "3,120" },
  { icon: Users, label: "Total Users", value: "56,900+" },
];

export function StatsSection() {
  return (
    <section className="relative border-y border-white/10 bg-white/[0.02] py-16">
      <div className="mx-auto grid max-w-6xl grid-cols-2 gap-4 px-4 sm:px-6 lg:grid-cols-4">
        {stats.map(({ icon: Icon, label, value }, i) => (
          <motion.div
            key={label}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.5, delay: i * 0.1 }}
            className="rounded-2xl border border-white/10 bg-white/5 p-6 text-center backdrop-blur-xl"
          >
            <div className="mx-auto flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-purple-500/20 to-blue-500/20 text-purple-300">
              <Icon className="h-5 w-5" />
            </div>
            <p className="mt-4 text-2xl font-bold text-white sm:text-3xl">{value}</p>
            <p className="mt-1 text-sm text-white/50">{label}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
