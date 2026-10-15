import { useAccount } from "wagmi";

export function useAuth() {
  const { address, isConnected, isConnecting } = useAccount();
  return { address, isConnected, isConnecting };
}
