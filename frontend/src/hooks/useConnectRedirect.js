import { useEffect, useRef } from "react";
import { useAccount } from "wagmi";
import { useNavigate } from "react-router-dom";

export function useConnectRedirect() {
  const { isConnected } = useAccount();
  const navigate = useNavigate();
  const wasConnected = useRef(isConnected);

  useEffect(() => {
    if (!wasConnected.current && isConnected) {
      navigate("/dashboard");
    }
    wasConnected.current = isConnected;
  }, [isConnected, navigate]);
}
