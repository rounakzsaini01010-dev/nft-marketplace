import { Link } from "react-router-dom";
import { Sparkles, Twitter, Github, MessageCircle } from "lucide-react";

const columns = [
  {
    title: "Marketplace",
    links: [
      { label: "Explore", to: "/marketplace" },
      { label: "Mint", to: "/mint" },
      { label: "My NFTs", to: "/my-nfts" },
    ],
  },
  {
    title: "Resources",
    links: [
      { label: "Documentation", to: "/" },
      { label: "Smart Contracts", to: "/" },
      { label: "FAQ", to: "/" },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "About", to: "/" },
      { label: "Terms", to: "/" },
      { label: "Privacy", to: "/" },
    ],
  },
];

export function FooterSection() {
  return (
    <footer className="relative border-t border-white/10 bg-black py-16">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-4">
          <div>
            <Link to="/" className="flex items-center gap-2 text-white">
              <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-purple-500 to-blue-500">
                <Sparkles className="h-4 w-4" />
              </span>
              <span className="text-sm font-semibold tracking-wide">VERTEXNFT</span>
            </Link>
            <p className="mt-4 max-w-xs text-sm text-white/50">
              A premium marketplace to create, mint, trade, and collect NFTs on-chain.
            </p>
            <div className="mt-6 flex items-center gap-3">
              {[Twitter, Github, MessageCircle].map((Icon, i) => (
                <a
                  key={i}
                  href="#"
                  className="flex h-9 w-9 items-center justify-center rounded-full border border-white/10 bg-white/5 text-white/60 transition-colors hover:border-purple-400/40 hover:text-white"
                >
                  <Icon className="h-4 w-4" />
                </a>
              ))}
            </div>
          </div>

          {columns.map((col) => (
            <div key={col.title}>
              <h4 className="text-sm font-semibold text-white">{col.title}</h4>
              <ul className="mt-4 space-y-3">
                {col.links.map((link) => (
                  <li key={link.label}>
                    <Link to={link.to} className="text-sm text-white/50 transition-colors hover:text-white">
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-14 flex flex-col items-center justify-between gap-4 border-t border-white/10 pt-8 sm:flex-row">
          <p className="text-xs text-white/40">© {new Date().getFullYear()} VertexNFT. All rights reserved.</p>
          <p className="text-xs text-white/40">Built on-chain. Secured by smart contracts.</p>
        </div>
      </div>
    </footer>
  );
}
