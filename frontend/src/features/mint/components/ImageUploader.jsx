import { useRef } from "react";
import { motion } from "framer-motion";
import { UploadCloud, ImageOff } from "lucide-react";
import { cn } from "@/lib/utils";

export function ImageUploader({ previewUrl, onFileSelected }) {
  const inputRef = useRef(null);

  const handleFiles = (files) => {
    const file = files?.[0];
    if (file && file.type.startsWith("image/")) onFileSelected(file);
  };

  return (
    <div
      onClick={() => inputRef.current?.click()}
      onDragOver={(e) => e.preventDefault()}
      onDrop={(e) => {
        e.preventDefault();
        handleFiles(e.dataTransfer.files);
      }}
      className={cn(
        "relative flex aspect-square w-full cursor-pointer flex-col items-center justify-center overflow-hidden rounded-2xl border border-dashed border-white/15 bg-white/5 backdrop-blur-xl transition-colors hover:border-purple-400/50",
      )}
    >
      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={(e) => handleFiles(e.target.files)}
      />

      {previewUrl ? (
        <motion.img
          key={previewUrl}
          src={previewUrl}
          alt="NFT preview"
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.3 }}
          className="h-full w-full object-cover"
        />
      ) : (
        <div className="flex flex-col items-center gap-3 px-6 text-center">
          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br from-purple-500 to-blue-500">
            <UploadCloud className="h-5 w-5 text-white" />
          </div>
          <p className="text-sm font-medium text-white">Click or drag an image here</p>
          <p className="text-xs text-white/40">PNG, JPG, GIF up to 10MB</p>
        </div>
      )}
    </div>
  );
}

export function ImageUploadError() {
  return (
    <div className="flex items-center gap-2 text-sm text-destructive">
      <ImageOff className="h-4 w-4" />
      Please select a valid image file.
    </div>
  );
}
