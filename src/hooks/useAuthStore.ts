import type { AuthState } from "@/interfaces/AuthState";
import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      balance: 0,
      incomeMonth: 0,
      expenseMonth: 0,

      login: (userData) => set({ user: userData }),

      logout: () => set({ 
        user: null, 
        balance: 0, 
        incomeMonth: 0, 
        expenseMonth: 0 
      }),

      setBalance: (amount) => set({ balance: amount }),
      setIncomeMonth: (amount) => set({ incomeMonth: amount }),
      setExpenseMonth: (amount) => set({ expenseMonth: amount }),
    }),
    {
      name: "onda-finance-storage",
      storage: createJSONStorage(() => localStorage),
    }
  )
);