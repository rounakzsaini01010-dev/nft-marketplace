import { http } from "wagmi";
import { getDefaultConfig } from "@rainbow-me/rainbowkit";
import { supportedChains } from "@/config/chains";
import { env } from "@/config/env";

export const wagmiConfig = getDefaultConfig({
  appName: env.appName,
  projectId: env.walletConnectProjectId,
  chains: supportedChains,
  transports: {
    [supportedChains[0].id]: http(env.bscTestnetRpcUrl),
  },
  ssr: false,
});
