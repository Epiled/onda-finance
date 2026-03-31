import { useEffect, useMemo } from "react";

import { AppSidebar } from "@/components/app-sidebar";
import { DataTable } from "@/components/data-table";
import { SiteHeader } from "@/components/site-header";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";

import { Card } from "@/components/card";
import { TransactionForm } from "@/components/transaction-form";

import { useAuthStore } from "@/hooks/useAuthStore";

import { realFormat } from "@/utils/realFormat";

import { useTransactionStore } from "@/hooks/useTransactionStore";

const TransferPage: React.FC = () => {
  const { user, balance, setIncomeMonth, setExpenseMonth } = useAuthStore();
  const { transactions } = useTransactionStore();

  const userTransactions = useMemo(() => {
    return transactions.filter((item) => item.foreignKey === user?.id);
  }, [transactions, user?.id]);

  useEffect(() => {
    const now = new Date();
    const currentMonth = now.getMonth();
    const currentYear = now.getFullYear();

    const totals = userTransactions.reduce(
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
  }, [setExpenseMonth, setIncomeMonth, userTransactions]);

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
        <SiteHeader title={"Transferências"} />
        <div className="flex flex-1 flex-col">
          <div className="@container/main flex flex-1 flex-col gap-2">
            <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
              <div className="grid grid-cols-1 gap-4 px-4 *:data-[slot=card]:bg-gradient-to-t *:data-[slot=card]:from-primary/5 *:data-[slot=card]:to-card *:data-[slot=card]:shadow-xs lg:px-6 @xl/main:grid-cols-2 @5xl/main:grid-cols-4 dark:*:data-[slot=card]:bg-card">
                <Card
                  description="Saldo Atual:"
                  title={realFormat(String(balance))}
                />
              </div>

              <TransactionForm />

              <DataTable data={userTransactions} />
            </div>
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
};

export default TransferPage;
