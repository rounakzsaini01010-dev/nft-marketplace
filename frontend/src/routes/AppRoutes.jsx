import { Routes, Route } from "react-router-dom";
import { RootLayout } from "@/layouts/RootLayout";
import { MarketingLayout } from "@/layouts/MarketingLayout";
import { ProtectedRoute } from "@/routes/ProtectedRoute";
import { useConnectRedirect } from "@/hooks/useConnectRedirect";
import Home from "@/routes/pages/Home";
import Dashboard from "@/routes/pages/Dashboard";
import Marketplace from "@/routes/pages/Marketplace";
import Mint from "@/routes/pages/Mint";
import MyNfts from "@/routes/pages/MyNfts";
import ListNft from "@/routes/pages/ListNft";
import Profile from "@/routes/pages/Profile";
import Settings from "@/routes/pages/Settings";
import NotFound from "@/routes/pages/NotFound";

export function AppRoutes() {
  useConnectRedirect();

  return (
    <Routes>
      <Route element={<MarketingLayout />}>
        <Route index element={<Home />} />
      </Route>

      <Route element={<RootLayout />}>
        <Route element={<ProtectedRoute />}>
          <Route path="marketplace" element={<Marketplace />} />
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="mint" element={<Mint />} />
          <Route path="my-nfts" element={<MyNfts />} />
          <Route path="list" element={<ListNft />} />
          <Route path="profile" element={<Profile />} />
          <Route path="settings" element={<Settings />} />
        </Route>

        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
}
