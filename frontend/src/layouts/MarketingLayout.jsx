import { Outlet } from "react-router-dom";
import { MarketingNavbar } from "@/layouts/MarketingNavbar";

export function MarketingLayout() {
  return (
    <div className="min-h-svh bg-black">
      <MarketingNavbar />
      <Outlet />
    </div>
  );
}
