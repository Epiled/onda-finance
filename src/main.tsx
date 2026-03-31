import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

import "./styles/global.css";
import "@radix-ui/themes/styles.css";

import App from "./App.tsx";

import { TooltipProvider } from "./components/ui/tooltip.tsx";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5,
      retry: 1,
    },
  },
});

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <TooltipProvider>
      <QueryClientProvider client={queryClient}>
        <App />
      </QueryClientProvider>
    </TooltipProvider>
  </StrictMode>,
);
