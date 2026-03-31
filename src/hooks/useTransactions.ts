import { TransactionService } from "@/services/transactions.service";
import { useQuery } from "@tanstack/react-query";

  export function useTransactions (userId: string) { 
    return useQuery({
      queryKey: ["transactions", userId],
      queryFn: TransactionService.getAll,
      select: (data) => {
        const filtered = data.filter(
          (item) => item.foreignKey === userId,
        );

        const balance = filtered.reduce((acc, tx) => {
          if (tx.status !== "COMPLETED") return acc;

          return tx.type === "INCOME" ? acc + tx.value : acc - tx.value;
        }, 0);

        const now = new Date();
        const totals = filtered.reduce(
          (acc: { income: 0; expense: 0 }, item) => {
            const itemDate = new Date(item.date);

            if (
              itemDate.getMonth() !== now.getMonth() ||
              itemDate.getFullYear() !== now.getFullYear()
            ) {
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

        return { transactions: filtered, balance, totals };
      },
  })
};