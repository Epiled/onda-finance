import { BrowserRouter, Route, Routes } from "react-router";

import { PublicRoute } from "./components/auth/PublicRoute";
import { RequireAuth } from "./components/auth/RequireAuth";

import LoginPage from "./pages/Login";
import DashboardPage from "./pages/Dashboard";
import TransferPage from "./pages/Transfer";
import FallbackPage from "./pages/Fallback";

function App() {
  return (
    <BrowserRouter>
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
