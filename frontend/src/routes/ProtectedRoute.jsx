import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";

export function ProtectedRoute() {
  const { isConnected } = useAuth();
  const location = useLocation();

  if (!isConnected) {
    return <Navigate to="/" replace state={{ from: location }} />;
  }

  return <Outlet />;
}
