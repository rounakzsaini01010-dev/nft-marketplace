import {
  LayoutDashboard,
  ImageIcon,
  Store,
  Wallet,
  Tag,
  Activity,
  BarChart3,
  User,
  Settings,
} from "lucide-react";

export const navItems = [
  { label: "Dashboard", to: "/dashboard", icon: LayoutDashboard, protected: true },
  { label: "Mint NFT", to: "/mint", icon: ImageIcon, protected: true },
  { label: "Marketplace", to: "/marketplace", icon: Store },
  { label: "My NFTs", to: "/my-nfts", icon: Wallet, protected: true },
  { label: "List NFT", to: "/list", icon: Tag, protected: true },
  { label: "Activity", to: "/dashboard#activity", icon: Activity, protected: true },
  { label: "Analytics", to: "/dashboard#analytics", icon: BarChart3, protected: true },
  { label: "Profile", to: "/profile", icon: User, protected: true },
  { label: "Settings", to: "/settings", icon: Settings, protected: true },
];
