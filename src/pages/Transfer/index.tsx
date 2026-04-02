import { AppSidebar } from "@/components/app-sidebar";
import { DataTable } from "@/components/data-table";
import { SiteHeader } from "@/components/site-header";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";

import { Card } from "@/components/card";
import { TransactionForm } from "@/components/transaction-form";

import { useAuthStore } from "@/hooks/useAuthStore";
import { useUser } from "@/hooks/useUser";
import { useTransactions } from "@/hooks/useTransactions";

import { realFormat } from "@/utils/realFormat";

const TransferPage: React.FC = () => {
  const user = useUser();
  const { balance } = useAuthStore();

  const { data } = useTransactions(user.id);

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
        <SiteHeader title={"Transferências"} />
        <div className="flex flex-1 flex-col">
          <div className="@container/main flex flex-1 flex-col gap-2">
            <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
              <div className="grid grid-cols-1 gap-4 px-4 *:data-[slot=card]:bg-linear-to-t *:data-[slot=card]:from-primary/5 *:data-[slot=card]:to-card *:data-[slot=card]:shadow-xs lg:px-6 @xl/main:grid-cols-2 @5xl/main:grid-cols-4 dark:*:data-[slot=card]:bg-card">
                <Card
                  description="Saldo Atual"
                  title={realFormat(String(balance))}
                />
              </div>

              <TransactionForm />

              <DataTable data={transactionsList} />
            </div>
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
};

export default TransferPage;
