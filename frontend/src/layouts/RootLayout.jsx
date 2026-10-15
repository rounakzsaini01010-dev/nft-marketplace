import { Outlet } from "react-router-dom";
import { Navbar } from "@/layouts/Navbar";
import { Sidebar } from "@/layouts/Sidebar";
import { MobileDrawer } from "@/layouts/MobileDrawer";

export function RootLayout() {
  return (
    <div className="relative flex h-svh overflow-hidden bg-[#050505]">
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -left-32 -top-32 h-96 w-96 rounded-full bg-violet-600/10 blur-[120px]" />
        <div className="absolute right-0 top-40 h-96 w-96 rounded-full bg-cyan-500/10 blur-[120px]" />
      </div>

      <MobileDrawer />
      <Sidebar />

      <div className="relative flex min-w-0 flex-1 flex-col">
        <Navbar />
        <main className="flex-1 overflow-y-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
