import { Menu } from "lucide-react";
import { useAccount } from "wagmi";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { ThemeToggle } from "@/components/common/ThemeToggle";
import { ConnectWalletButton } from "@/components/common/ConnectWalletButton";
import { GlobalSearch } from "@/layouts/GlobalSearch";
import { NetworkBadge } from "@/layouts/NetworkBadge";
import { NotificationsDropdown } from "@/layouts/NotificationsDropdown";
import { ProfileDropdown } from "@/layouts/ProfileDropdown";
import { useUiStore } from "@/store/ui.store";

export function Navbar() {
  const toggleMobileMenu = useUiStore((s) => s.toggleMobileMenu);
  const { isConnected } = useAccount();

  return (
    <header className="sticky top-0 z-40 px-3 pt-3">
      <div className="flex h-16 items-center justify-between gap-3 rounded-2xl border border-white/10 bg-white/[0.03] px-4 backdrop-blur-2xl">
        <div className="flex flex-1 items-center gap-3">
          <Button
            variant="ghost"
            size="icon"
            onClick={toggleMobileMenu}
            className="text-white/60 hover:bg-white/10 hover:text-white lg:hidden"
          >
            <Menu className="h-5 w-5" />
          </Button>
          <GlobalSearch />
        </div>

        <div className="flex items-center gap-2">
          {isConnected ? (
            <>
              <NetworkBadge />
              <Separator orientation="vertical" className="mx-1 hidden h-6 bg-white/10 sm:block" />
              <NotificationsDropdown />
              <ThemeToggle />
              <ProfileDropdown />
            </>
          ) : (
            <>
              <ThemeToggle />
              <ConnectWalletButton />
            </>
          )}
        </div>
      </div>
    </header>
  );
}
