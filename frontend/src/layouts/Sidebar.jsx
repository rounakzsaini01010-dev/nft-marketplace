import { NavLink, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import { Sparkles, ChevronsLeft } from "lucide-react";
import { cn } from "@/lib/utils";
import { isNavItemActive } from "@/lib/isNavItemActive";
import { useUiStore } from "@/store/ui.store";
import { navItems } from "@/config/navigation";
import { UserProfileCard } from "@/layouts/UserProfileCard";

export function Sidebar() {
  const sidebarOpen = useUiStore((s) => s.sidebarOpen);
  const toggleSidebar = useUiStore((s) => s.toggleSidebar);
  const location = useLocation();

  return (
    <aside
      className={cn(
        "sticky top-0 hidden h-svh shrink-0 p-3 transition-all duration-300 lg:flex",
        sidebarOpen ? "w-64" : "w-20",
      )}
    >
      <div className="flex w-full flex-col rounded-2xl border border-white/10 bg-white/[0.03] backdrop-blur-2xl">
        <div className={cn("flex items-center gap-2 px-4 py-5", sidebarOpen ? "justify-between" : "justify-center")}>
          <div className="flex items-center gap-2">
            <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-violet-600 to-cyan-400 shadow-lg shadow-violet-500/20">
              <Sparkles className="h-4.5 w-4.5 text-white" />
            </span>
            {sidebarOpen && <span className="text-sm font-semibold tracking-wide text-white">VERTEXNFT</span>}
          </div>
          {sidebarOpen && (
            <button
              onClick={toggleSidebar}
              className="flex h-7 w-7 items-center justify-center rounded-lg text-white/40 transition-colors hover:bg-white/10 hover:text-white"
            >
              <ChevronsLeft className="h-4 w-4" />
            </button>
          )}
        </div>

        <nav className="flex-1 space-y-1 overflow-y-auto px-3 py-2">
          {navItems.map(({ label, to, icon: Icon }) => {
            const isActive = isNavItemActive(to, location);
            return (
              <NavLink
                key={to}
                to={to}
                className={cn(
                  "relative flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-colors",
                  isActive ? "text-white" : "text-white/50 hover:text-white",
                  !sidebarOpen && "justify-center",
                )}
              >
                {isActive && (
                  <motion.span
                    layoutId="sidebar-active-pill"
                    className="absolute inset-0 rounded-xl bg-gradient-to-r from-violet-600/25 to-cyan-500/10 ring-1 ring-violet-400/30"
                    transition={{ type: "spring", stiffness: 380, damping: 32 }}
                  />
                )}
                <Icon className="relative z-10 h-4.5 w-4.5 shrink-0" />
                {sidebarOpen && <span className="relative z-10">{label}</span>}
              </NavLink>
            );
          })}
        </nav>

        {!sidebarOpen && (
          <div className="flex justify-center pb-2">
            <button
              onClick={toggleSidebar}
              className="flex h-7 w-7 items-center justify-center rounded-lg text-white/40 transition-colors hover:bg-white/10 hover:text-white"
            >
              <ChevronsLeft className="h-4 w-4 rotate-180" />
            </button>
          </div>
        )}

        <div className="p-3">
          <UserProfileCard collapsed={!sidebarOpen} />
        </div>
      </div>
    </aside>
  );
}
