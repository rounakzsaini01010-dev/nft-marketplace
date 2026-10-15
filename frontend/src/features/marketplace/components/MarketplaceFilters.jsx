import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";

function Select({ value, onChange, options, placeholder }) {
  return (
    <select
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="h-10 rounded-md border border-white/15 bg-white/5 px-3 text-sm text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring [&>option]:bg-zinc-900"
    >
      <option value="">{placeholder}</option>
      {options.map((opt) => (
        <option key={opt} value={opt}>
          {opt}
        </option>
      ))}
    </select>
  );
}

export function MarketplaceFilters({
  search,
  onSearchChange,
  category,
  onCategoryChange,
  categories,
  collection,
  onCollectionChange,
  collections,
  minPrice,
  onMinPriceChange,
  maxPrice,
  onMaxPriceChange,
}) {
  return (
    <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center">
      <div className="relative w-full sm:max-w-xs">
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-white/40" />
        <Input
          value={search}
          onChange={(e) => onSearchChange(e.target.value)}
          placeholder="Search by name, token ID, seller..."
          className="border-white/15 bg-white/5 pl-9 text-white placeholder:text-white/30"
        />
      </div>

      <Select value={category} onChange={onCategoryChange} options={categories} placeholder="All categories" />
      <Select value={collection} onChange={onCollectionChange} options={collections} placeholder="All collections" />

      <div className="flex items-center gap-2">
        <Input
          type="number"
          min="0"
          value={minPrice}
          onChange={(e) => onMinPriceChange(e.target.value)}
          placeholder="Min USDT"
          className="w-28 border-white/15 bg-white/5 text-white placeholder:text-white/30"
        />
        <span className="text-white/30">–</span>
        <Input
          type="number"
          min="0"
          value={maxPrice}
          onChange={(e) => onMaxPriceChange(e.target.value)}
          placeholder="Max USDT"
          className="w-28 border-white/15 bg-white/5 text-white placeholder:text-white/30"
        />
      </div>
    </div>
  );
}
