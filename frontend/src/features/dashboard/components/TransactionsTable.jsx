import { useMemo, useState } from "react";
import { formatUnits } from "viem";
import { Search, ExternalLink, Receipt, ChevronLeft, ChevronRight } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { EmptyState } from "@/features/dashboard/components/EmptyState";
import { TableSkeleton } from "@/features/dashboard/components/skeletons";
import { supportedChains } from "@/config/chains";

const typeOptions = ["all", "minted", "listed", "purchased", "sold"];
const badgeColor = {
  minted: "bg-violet-500/15 text-violet-300",
  listed: "bg-cyan-500/15 text-cyan-300",
  purchased: "bg-fuchsia-500/15 text-fuchsia-300",
  sold: "bg-emerald-500/15 text-emerald-300",
};

const PAGE_SIZE = 6;
const explorerUrl = supportedChains[0]?.blockExplorers?.default?.url;

export function TransactionsTable({ feed, isLoading }) {
  const [search, setSearch] = useState("");
  const [typeFilter, setTypeFilter] = useState("all");
  const [page, setPage] = useState(1);

  const filtered = useMemo(() => {
    return feed.filter((item) => {
      const matchesType = typeFilter === "all" || item.type === typeFilter;
      const matchesSearch = !search || item.tokenId.toString().includes(search.trim());
      return matchesType && matchesSearch;
    });
  }, [feed, search, typeFilter]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const paged = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  if (isLoading) return <TableSkeleton />;

  return (
    <div className="overflow-hidden rounded-2xl border border-white/10 bg-white/[0.04] backdrop-blur-xl">
      <div className="flex flex-col gap-3 border-b border-white/10 p-4 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-sm font-semibold text-white">Recent Transactions</p>
        <div className="flex flex-col gap-2 sm:flex-row sm:items-center">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-white/40" />
            <Input
              value={search}
              onChange={(e) => {
                setSearch(e.target.value);
                setPage(1);
              }}
              placeholder="Token ID..."
              className="h-9 w-40 border-white/15 bg-white/5 pl-8 text-sm text-white placeholder:text-white/30"
            />
          </div>
          <select
            value={typeFilter}
            onChange={(e) => {
              setTypeFilter(e.target.value);
              setPage(1);
            }}
            className="h-9 rounded-md border border-white/15 bg-white/5 px-2 text-sm text-white [&>option]:bg-zinc-900"
          >
            {typeOptions.map((opt) => (
              <option key={opt} value={opt}>
                {opt === "all" ? "All types" : opt}
              </option>
            ))}
          </select>
        </div>
      </div>

      {filtered.length === 0 ? (
        <EmptyState icon={Receipt} title="No transactions" description="Nothing matches your filters yet." />
      ) : (
        <>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead>
                <tr className="border-b border-white/10 text-xs uppercase tracking-wide text-white/35">
                  <th className="px-4 py-3 font-medium">Type</th>
                  <th className="px-4 py-3 font-medium">Token ID</th>
                  <th className="px-4 py-3 font-medium">Price</th>
                  <th className="px-4 py-3 font-medium">Date</th>
                  <th className="px-4 py-3 font-medium">Tx</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {paged.map((item, i) => (
                  <tr key={`${item.txHash}-${i}`} className="transition-colors hover:bg-white/5">
                    <td className="px-4 py-3">
                      <Badge className={`border-none capitalize ${badgeColor[item.type]}`}>{item.type}</Badge>
                    </td>
                    <td className="px-4 py-3 text-white/80">#{item.tokenId.toString()}</td>
                    <td className="px-4 py-3 text-white/60">
                      {item.price !== undefined ? `${formatUnits(item.price, 6)} USDT` : "—"}
                    </td>
                    <td className="px-4 py-3 text-white/40">{item.timestamp?.toLocaleDateString() ?? "—"}</td>
                    <td className="px-4 py-3">
                      {explorerUrl && (
                        <a
                          href={`${explorerUrl}/tx/${item.txHash}`}
                          target="_blank"
                          rel="noreferrer"
                          className="inline-flex items-center gap-1 text-violet-300 hover:text-violet-200"
                        >
                          View <ExternalLink className="h-3 w-3" />
                        </a>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="flex items-center justify-between border-t border-white/10 p-4 text-xs text-white/40">
            <span>
              Page {page} of {totalPages}
            </span>
            <div className="flex items-center gap-2">
              <Button
                size="icon"
                variant="ghost"
                disabled={page === 1}
                onClick={() => setPage((p) => Math.max(1, p - 1))}
                className="h-8 w-8 text-white/50 hover:bg-white/10 hover:text-white"
              >
                <ChevronLeft className="h-4 w-4" />
              </Button>
              <Button
                size="icon"
                variant="ghost"
                disabled={page === totalPages}
                onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                className="h-8 w-8 text-white/50 hover:bg-white/10 hover:text-white"
              >
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
