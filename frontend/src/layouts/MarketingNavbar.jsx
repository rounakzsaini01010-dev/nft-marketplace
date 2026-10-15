import { NavLink } from "react-router-dom";
import { Sparkles } from "lucide-react";
import { ConnectWalletButton } from "@/components/common/ConnectWalletButton";

const tabs = [
  { label: "Features", id: "features" },
  { label: "Trending", id: "trending" },
  { label: "How It Works", id: "how-it-works" },
  { label: "FAQ", id: "faq" },
];

export function MarketingNavbar() {
  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-white/10 bg-black/40 backdrop-blur-xl">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6">
        <NavLink to="/" className="flex items-center gap-2 text-white">
          <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-purple-500 to-blue-500">
            <Sparkles className="h-4 w-4" />
          </span>
          <span className="text-sm font-semibold tracking-wide">VERTEXNFT</span>
        </NavLink>

        <nav className="hidden items-center gap-8 md:flex">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => {
                const element = document.getElementById(tab.id);
                if (element) {
                  element.scrollIntoView({ behavior: "smooth" });
                }
              }}
              className="text-sm font-medium text-white/60 transition-colors hover:text-white"
            >
              {tab.label}
            </button>
          ))}
        </nav>

        <ConnectWalletButton />
      </div>
    </header>
  );
}
