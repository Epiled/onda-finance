import { Navigate, Outlet } from "react-router";
import { useAuthStore } from "../../hooks/useAuthStore";

export const RequireAuth = () => {
  const user = useAuthStore((state) => state.user);

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return <Outlet />;
};
