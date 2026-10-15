import { AnimatePresence, motion } from "framer-motion";
import { NavLink, useLocation } from "react-router-dom";
import { Sparkles, X } from "lucide-react";
import { navItems } from "@/config/navigation";
import { useUiStore } from "@/store/ui.store";
import { UserProfileCard } from "@/layouts/UserProfileCard";
import { cn } from "@/lib/utils";
import { isNavItemActive } from "@/lib/isNavItemActive";

export function MobileDrawer() {
  const mobileMenuOpen = useUiStore((s) => s.mobileMenuOpen);
  const setMobileMenuOpen = useUiStore((s) => s.setMobileMenuOpen);
  const location = useLocation();

  return (
    <AnimatePresence>
      {mobileMenuOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setMobileMenuOpen(false)}
            className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm lg:hidden"
          />
          <motion.div
            initial={{ x: "-100%" }}
            animate={{ x: 0 }}
            exit={{ x: "-100%" }}
            transition={{ type: "spring", stiffness: 320, damping: 34 }}
            className="fixed inset-y-0 left-0 z-50 flex w-72 flex-col border-r border-white/10 bg-zinc-950/95 p-4 backdrop-blur-2xl lg:hidden"
          >
            <div className="flex items-center justify-between px-1 py-2">
              <div className="flex items-center gap-2">
                <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-violet-600 to-cyan-400">
                  <Sparkles className="h-4.5 w-4.5 text-white" />
                </span>
                <span className="text-sm font-semibold tracking-wide text-white">VERTEXNFT</span>
              </div>
              <button
                onClick={() => setMobileMenuOpen(false)}
                className="flex h-8 w-8 items-center justify-center rounded-lg text-white/50 hover:bg-white/10 hover:text-white"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            <nav className="mt-4 flex-1 space-y-1 overflow-y-auto">
              {navItems.map(({ label, to, icon: Icon }) => {
                const isActive = isNavItemActive(to, location);
                return (
                  <NavLink
                    key={to}
                    to={to}
                    onClick={() => setMobileMenuOpen(false)}
                    className={cn(
                      "flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-colors",
                      isActive
                        ? "bg-gradient-to-r from-violet-600/25 to-cyan-500/10 text-white ring-1 ring-violet-400/30"
                        : "text-white/50 hover:bg-white/5 hover:text-white",
                    )}
                  >
                    <Icon className="h-4.5 w-4.5" />
                    {label}
                  </NavLink>
                );
              })}
            </nav>

            <UserProfileCard collapsed={false} />
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
