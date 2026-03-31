import { useEffect } from "react";

import { AppSidebar } from "@/components/app-sidebar";
import { DataTable } from "@/components/data-table";
import { SectionCards } from "@/components/section-cards";
import { SiteHeader } from "@/components/site-header";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";

import { useUser } from "@/hooks/useUser";
import { useTransactions } from "@/hooks/useTransactions";
import { useAuthStore } from "@/hooks/useAuthStore";

import { TransactionService } from "@/services/transactions.service";

const DashboardPage: React.FC = () => {
  TransactionService.getAll();
  const user = useUser();

  const { data } = useTransactions(user.id);

  const { setBalance, setIncomeMonth, setExpenseMonth } = useAuthStore();

  useEffect(() => {
    setBalance(data?.balance ?? 0);
    setIncomeMonth(data?.totals.income ?? 0);
    setExpenseMonth(data?.totals.expense ?? 0);
  }, [
    data?.balance,
    data?.totals.expense,
    data?.totals.income,
    setBalance,
    setExpenseMonth,
    setIncomeMonth,
  ]);

  const transactionsList = data?.transactions ?? [];

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
              <DataTable data={transactionsList} />
            </div>
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
};

export default DashboardPage;
