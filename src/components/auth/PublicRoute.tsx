import { Navigate, Outlet } from "react-router";
import { useAuthStore } from "../../hooks/useAuthStore";

export const PublicRoute = () => {
  const user = useAuthStore((state) => state.user);

  if (user) {
    return <Navigate to="/dashboard" replace />;
  }

  return <Outlet />;
};
