import { useAccount } from "wagmi";
import { motion } from "framer-motion";
import { Moon, Sun, Monitor, LogOut, Bell, Shield } from "lucide-react";
import { useThemeStore } from "@/store/theme.store";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";
import { useWalletDisconnect } from "@/hooks/useWalletDisconnect";

const themeOptions = [
  { value: "light", label: "Light", icon: Sun },
  { value: "dark", label: "Dark", icon: Moon },
  { value: "system", label: "System", icon: Monitor },
];

function SettingsCard({ icon: Icon, title, description, children }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      className="rounded-2xl border border-white/10 bg-white/[0.04] p-6 backdrop-blur-xl"
    >
      <div className="flex items-start gap-3">
        <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-violet-500/20 to-cyan-400/20 text-violet-300">
          <Icon className="h-5 w-5" />
        </span>
        <div>
          <p className="text-sm font-semibold text-white">{title}</p>
          <p className="mt-0.5 text-xs text-white/40">{description}</p>
        </div>
      </div>
      <div className="mt-5">{children}</div>
    </motion.div>
  );
}

export default function Settings() {
  const { address } = useAccount();
  const { disconnect } = useWalletDisconnect();
  const theme = useThemeStore((s) => s.theme);
  const setTheme = useThemeStore((s) => s.setTheme);

  return (
    <div className="space-y-6 px-4 py-6 sm:px-6 lg:py-8">
      <div>
        <h1 className="text-2xl font-bold text-white">Settings</h1>
        <p className="mt-1 text-sm text-white/40">Manage your appearance, wallet, and preferences.</p>
      </div>

      <SettingsCard icon={Sun} title="Appearance" description="Choose how VertexNFT looks on your device.">
        <div className="flex gap-2">
          {themeOptions.map((opt) => (
            <button
              key={opt.value}
              onClick={() => setTheme(opt.value)}
              className={cn(
                "flex flex-1 flex-col items-center gap-2 rounded-xl border px-4 py-3 text-xs font-medium transition-colors",
                theme === opt.value
                  ? "border-violet-400/50 bg-violet-500/10 text-white"
                  : "border-white/10 bg-white/5 text-white/50 hover:text-white",
              )}
            >
              <opt.icon className="h-4 w-4" />
              {opt.label}
            </button>
          ))}
        </div>
      </SettingsCard>

      <SettingsCard icon={Bell} title="Notifications" description="Choose what you want to be notified about.">
        <div className="space-y-3 text-sm text-white/70">
          {["Sales & purchases", "New listings on watched collections", "Price alerts"].map((label) => (
            <label key={label} className="flex items-center justify-between rounded-lg border border-white/10 bg-white/5 px-4 py-3">
              {label}
              <input type="checkbox" defaultChecked className="h-4 w-4 accent-violet-500" />
            </label>
          ))}
        </div>
      </SettingsCard>

      <SettingsCard icon={Shield} title="Wallet" description="Connected wallet and session controls.">
        <div className="flex items-center justify-between rounded-lg border border-white/10 bg-white/5 px-4 py-3">
          <div>
            <p className="text-sm text-white/80">{address}</p>
            <p className="text-xs text-white/40">Currently connected</p>
          </div>
          <Button size="sm" variant="outline" className="border-destructive/40 text-destructive hover:bg-destructive/10" onClick={() => disconnect()}>
            <LogOut className="h-3.5 w-3.5" />
            Disconnect
          </Button>
        </div>
      </SettingsCard>

      <Separator className="bg-white/10" />
    </div>
  );
}
