import { useAuthStore } from "@/features/auth/store";
import { Navigate } from "react-router-dom";

interface GuestRouterProps {
  children: React.ReactNode;
}

export function GuestRoute({ children }: GuestRouterProps) {
  const { accessToken, role } = useAuthStore();
  if (accessToken) {
    const redireacTo = role === "admin" ? "/admin" : "/";
    return <Navigate to={redireacTo} replace />;
  }
  return <>{children}</>;
}
