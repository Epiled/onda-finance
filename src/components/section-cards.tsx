"use client";

import { Card } from "./card";

import { useAuthStore } from "@/hooks/useAuthStore";
import { realFormat } from "@/utils/realFormat";

export function SectionCards() {
  const { balance, incomeMonth, expenseMonth } = useAuthStore();

  return (
    <div className="grid grid-cols-1 gap-4 px-4 *:data-[slot=card]:bg-linear-to-t *:data-[slot=card]:from-primary/5 *:data-[slot=card]:to-card *:data-[slot=card]:shadow-xs lg:px-6 @xl/main:grid-cols-2 @5xl/main:grid-cols-4 dark:*:data-[slot=card]:bg-card">
      <Card description={"Saldo Atual"} title={realFormat(String(balance))} />
      <Card
        description={"Entradas do mês"}
        title={realFormat(String(incomeMonth))}
      />
      <Card
        description={"Saídas do mês"}
        title={realFormat(String(expenseMonth))}
      />
    </div>
  );
}
