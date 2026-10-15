import { useDisconnect } from "wagmi";
import { useNavigate } from "react-router-dom";

export function useWalletDisconnect() {
  const { disconnect: wagmiDisconnect, ...rest } = useDisconnect();
  const navigate = useNavigate();

  const disconnect = () => {
    wagmiDisconnect();
    navigate("/");
  };

  return { disconnect, ...rest };
}
