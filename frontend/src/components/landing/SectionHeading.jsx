import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

export function SectionHeading({ eyebrow, title, description, align = "center", className }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.4 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className={cn(
        "mx-auto max-w-2xl",
        align === "center" ? "text-center" : "text-left",
        className,
      )}
    >
      {eyebrow && (
        <span className="inline-block rounded-full border border-white/10 bg-white/5 px-4 py-1 text-xs font-medium uppercase tracking-widest text-purple-300">
          {eyebrow}
        </span>
      )}
      <h2 className="mt-4 bg-gradient-to-r from-white via-white to-white/70 bg-clip-text text-3xl font-bold tracking-tight text-transparent sm:text-4xl">
        {title}
      </h2>
      {description && <p className="mt-3 text-base text-white/60">{description}</p>}
    </motion.div>
  );
}
