import { motion } from "framer-motion";
import { CountUp } from "@/features/dashboard/components/CountUp";
import { cn } from "@/lib/utils";

export function StatCard({ icon: Icon, label, value, decimals = 0, prefix = "", suffix = "", accent, delay = 0 }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.4 }}
      transition={{ duration: 0.5, delay }}
      whileHover={{ y: -6 }}
      className="group relative overflow-hidden rounded-2xl border border-white/10 bg-white/[0.04] p-5 backdrop-blur-xl transition-colors hover:border-white/20"
    >
      <div
        className={cn(
          "pointer-events-none absolute -right-10 -top-10 h-32 w-32 rounded-full opacity-0 blur-2xl transition-opacity duration-300 group-hover:opacity-100",
          accent,
        )}
      />
      <div className="relative z-10 flex items-center justify-between">
        <span className={cn("flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br", accent)}>
          <Icon className="h-5 w-5 text-white" />
        </span>
      </div>
      <p className="relative z-10 mt-4 text-2xl font-bold text-white">
        <CountUp value={value} decimals={decimals} prefix={prefix} suffix={suffix} />
      </p>
      <p className="relative z-10 mt-1 text-xs text-white/45">{label}</p>
    </motion.div>
  );
}
