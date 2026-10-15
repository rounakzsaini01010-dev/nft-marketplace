import { Bell, Hammer, Tag, ShoppingCart, CircleDollarSign } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";

const notifications = [
  { icon: ShoppingCart, title: "Your NFT was purchased", time: "2m ago" },
  { icon: Tag, title: "Listing went live on marketplace", time: "1h ago" },
  { icon: Hammer, title: "NFT minted successfully", time: "3h ago" },
  { icon: CircleDollarSign, title: "USDT payment received", time: "1d ago" },
];

export function NotificationsDropdown() {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon" className="relative text-white/60 hover:bg-white/10 hover:text-white">
          <Bell className="h-4.5 w-4.5" />
          <span className="absolute right-2 top-2 h-1.5 w-1.5 rounded-full bg-violet-400 shadow-[0_0_8px_2px_rgba(139,92,246,0.6)]" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-80 border-white/10 bg-zinc-950/95 text-white backdrop-blur-xl">
        <DropdownMenuLabel className="text-white/50">Notifications</DropdownMenuLabel>
        <DropdownMenuSeparator className="bg-white/10" />
        {notifications.map((n, i) => (
          <div key={i} className="flex items-start gap-3 rounded-md px-2 py-2.5 hover:bg-white/5">
            <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-gradient-to-br from-violet-500/20 to-cyan-400/20 text-violet-300">
              <n.icon className="h-4 w-4" />
            </span>
            <div className="min-w-0">
              <p className="truncate text-sm text-white/90">{n.title}</p>
              <p className="text-xs text-white/40">{n.time}</p>
            </div>
          </div>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
