import { motion, AnimatePresence } from "framer-motion";
import { Plus, Trash2 } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";

export function AttributesEditor({ attributes, onChange }) {
  const updateAttribute = (index, field, value) => {
    const next = attributes.map((attr, i) => (i === index ? { ...attr, [field]: value } : attr));
    onChange(next);
  };

  const addAttribute = () => onChange([...attributes, { trait_type: "", value: "" }]);
  const removeAttribute = (index) => onChange(attributes.filter((_, i) => i !== index));

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <Label className="text-white/70">Attributes</Label>
        <Button type="button" size="sm" variant="outline" onClick={addAttribute} className="border-white/15 bg-white/5 text-white hover:bg-white/10">
          <Plus className="h-3.5 w-3.5" />
          Add trait
        </Button>
      </div>

      <AnimatePresence initial={false}>
        {attributes.map((attr, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2 }}
            className="flex items-center gap-2"
          >
            <Input
              placeholder="Trait (e.g. Background)"
              value={attr.trait_type}
              onChange={(e) => updateAttribute(index, "trait_type", e.target.value)}
              className="border-white/15 bg-white/5 text-white placeholder:text-white/30"
            />
            <Input
              placeholder="Value (e.g. Purple)"
              value={attr.value}
              onChange={(e) => updateAttribute(index, "value", e.target.value)}
              className="border-white/15 bg-white/5 text-white placeholder:text-white/30"
            />
            <Button
              type="button"
              size="icon"
              variant="ghost"
              onClick={() => removeAttribute(index)}
              className="shrink-0 text-white/50 hover:text-destructive"
            >
              <Trash2 className="h-4 w-4" />
            </Button>
          </motion.div>
        ))}
      </AnimatePresence>

      {attributes.length === 0 && (
        <p className="text-xs text-white/40">No attributes yet — traits are optional but boost discoverability.</p>
      )}
    </div>
  );
}
