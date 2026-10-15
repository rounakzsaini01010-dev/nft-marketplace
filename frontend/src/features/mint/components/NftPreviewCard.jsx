import { motion } from "framer-motion";
import { ImageIcon } from "lucide-react";
import { Badge } from "@/components/ui/badge";

export function NftPreviewCard({ previewUrl, name, description, attributes }) {
  return (
    <motion.div
      layout
      className="overflow-hidden rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl"
    >
      <div className="aspect-square w-full overflow-hidden bg-black/40">
        {previewUrl ? (
          <img src={previewUrl} alt={name || "NFT preview"} className="h-full w-full object-cover" />
        ) : (
          <div className="flex h-full w-full items-center justify-center text-white/20">
            <ImageIcon className="h-10 w-10" strokeWidth={1.5} />
          </div>
        )}
      </div>
      <div className="p-5">
        <p className="truncate text-base font-semibold text-white">{name || "Untitled NFT"}</p>
        <p className="mt-1 line-clamp-2 text-sm text-white/50">
          {description || "No description provided yet."}
        </p>

        {attributes?.length > 0 && (
          <div className="mt-4 flex flex-wrap gap-2">
            {attributes
              .filter((a) => a.trait_type && a.value)
              .map((a, i) => (
                <Badge key={i} variant="secondary" className="border-white/10 bg-white/10 text-white/70">
                  {a.trait_type}: {a.value}
                </Badge>
              ))}
          </div>
        )}
      </div>
    </motion.div>
  );
}
