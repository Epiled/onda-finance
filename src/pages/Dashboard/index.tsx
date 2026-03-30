import { useEffect } from "react";

import { AppSidebar } from "@/components/app-sidebar";
import { DataTable } from "@/components/data-table";
import { SectionCards } from "@/components/section-cards";
import { SiteHeader } from "@/components/site-header";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";

import { useAuthStore } from "@/hooks/useAuthStore";

import data from "../../mocks/dashboardData.json";

const DashboardPage: React.FC = () => {
  const { setBalance, setIncomeMonth, setExpenseMonth } =
    useAuthStore();

  useEffect(() => {
    async function fetchUserBalance() {
      setTimeout(() => {
        const balanceBank = 5440.65;
        // 5440.6500000000015

        setBalance(balanceBank);
      }, 1000);
    }

    fetchUserBalance();
  }, [setBalance]);

  useEffect(() => {
    const now = new Date();
    const currentMonth = now.getMonth();
    const currentYear = now.getFullYear();

    const totals = data.reduce(
      (acc: { income: 0; expense: 0 }, item) => {
        const itemDate = new Date(item.date);
        const itemMonth = itemDate.getMonth();
        const itemYear = itemDate.getFullYear();

        if (itemMonth !== currentMonth || itemYear !== currentYear) {
          return acc;
        }

        if (
          item.type === "INCOME" &&
          item.status !== "FAILED" &&
          item.status !== "PENDING"
        ) {
          acc.income += item.value;
        }

        if (item.type === "EXPENSE" && item.status !== "FAILED") {
          acc.expense += item.value;
        }

        return acc;
      },
      { income: 0, expense: 0 },
    );

    setIncomeMonth(totals.income);
    setExpenseMonth(totals.expense);
  }, [setExpenseMonth, setIncomeMonth]);

  useEffect(() => {
    const totals = data.reduce(
      (acc: { income: 0; expense: 0 }, item) => {
        if (
          item.type === "INCOME" &&
          item.status !== "FAILED" &&
          item.status !== "PENDING"
        ) {
          acc.income += item.value;
        }

        if (item.type === "EXPENSE" && item.status !== "FAILED") {
          acc.expense += item.value;
        }

        return acc;
      },
      { income: 0, expense: 0 },
    );

    console.log(totals.income - totals.expense);
  }, []);

  return (
    <SidebarProvider
      style={
        {
          "--sidebar-width": "calc(var(--spacing) * 72)",
          "--header-height": "calc(var(--spacing) * 12)",
        } as React.CSSProperties
      }
    >
      <AppSidebar variant="inset" />
      <SidebarInset>
        <SiteHeader />
        <div className="flex flex-1 flex-col">
          <div className="@container/main flex flex-1 flex-col gap-2">
            <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
              <SectionCards />
              <DataTable data={data} />
            </div>
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
};

export default DashboardPage;
