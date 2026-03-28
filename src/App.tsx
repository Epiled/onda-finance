import "./App.css";

import { BrowserRouter, Route, Routes } from "react-router";

import LoginPage from "./pages/Login";
import DashboardPage from "./pages/Dashboard";
import TransferPage from "./pages/Transfer";
import FallbackPage from "./pages/Fallback";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route index path="/" element={<LoginPage />} />
        <Route path="login" element={<LoginPage />} />

        <Route path="dashboard" element={<DashboardPage />} />
        <Route path="transfer" element={<TransferPage />} />

        {/* Fallback routes */}
        <Route path="*" element={<FallbackPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
