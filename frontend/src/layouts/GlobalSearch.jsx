import { Search } from "lucide-react";

export function GlobalSearch() {
  return (
    <div className="group relative hidden w-full max-w-sm items-center sm:flex">
      <Search className="pointer-events-none absolute left-3.5 h-4 w-4 text-white/35" />
      <input
        type="text"
        placeholder="Search NFTs, collections, wallets..."
        className="h-10 w-full rounded-xl border border-white/10 bg-white/5 pl-10 pr-14 text-sm text-white placeholder:text-white/35 outline-none transition-colors focus:border-violet-400/50 focus:bg-white/[0.07]"
      />
      <kbd className="pointer-events-none absolute right-3 hidden items-center gap-0.5 rounded-md border border-white/10 bg-white/5 px-1.5 py-0.5 text-[10px] font-medium text-white/40 sm:flex">
        ⌘K
      </kbd>
    </div>
  );
}
