import { BrowserRouter, Route, Routes, useLocation } from "react-router";

import { PublicRoute } from "./components/auth/PublicRoute";
import { RequireAuth } from "./components/auth/RequireAuth";

import LoginPage from "./pages/Login";
import DashboardPage from "./pages/Dashboard";
import TransferPage from "./pages/Transfer";
import FallbackPage from "./pages/Fallback";
import { useEffect } from "react";

const TitleManage = () => {
  const location = useLocation();

  useEffect(() => {
    const path = location.pathname;

    const routeTitles: Record<string, string> = {
      "/": "Login",
      "/dashboard": "Dashboard",
      "/transfer": "Tranferências",
    };

    const pageTitle = routeTitles[path] || "Onda Finance";
    document.title = `${pageTitle} | Onda Finance`;
  }, [location]);

  return null;
};

function App() {
  return (
    <BrowserRouter>
      <TitleManage />
      <Routes>
        <Route element={<PublicRoute />}>
          <Route path="/" element={<LoginPage />} />
          <Route path="/login" element={<LoginPage />} />
        </Route>

        <Route element={<RequireAuth />}>
          <Route path="/dashboard" element={<DashboardPage />} />
          <Route path="/transfer" element={<TransferPage />} />
        </Route>

        <Route path="*" element={<FallbackPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
