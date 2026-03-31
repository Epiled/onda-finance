import { create } from "zustand";
import { persist } from "zustand/middleware";

import type { Transaction } from "@/types/transaction";

import dashboardData from "@/mocks/dashboardData.json";

interface TransactionStore {
  transactions: Transaction[];
  addTransaction: (tx: Transaction) => void;
}

export const useTransactionStore = create<TransactionStore>()(
  persist(
    (set) => ({
      transactions: dashboardData,

      addTransaction: (newTx) => {
        set((state) => ({
          transactions: [...state.transactions, newTx]
        }))
      }
    }),
    {
      name: "onda-finance-transations",
    }
  )
);