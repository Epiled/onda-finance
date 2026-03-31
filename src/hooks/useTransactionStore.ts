import { create } from "zustand";
import { persist } from "zustand/middleware";

import dashboardData from "@/mocks/dashboardData.json";

interface Transaction {
   id: string
   foreignKey: string,
   date: string,
   description: string,
   type: string,
   value: number,
   status: string
}

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