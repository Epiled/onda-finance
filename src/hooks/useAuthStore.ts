import type { AuthState } from "@/interfaces/AuthState";
import { create } from "zustand";

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  balance: 0,
  incomeMonth: 0,
  expenseMonth: 0,

  login: (userData) => set({ user: userData }),

  logout: () => set({ user: null, balance: 0, incomeMonth: 0, expenseMonth: 0}),

  setBalance: (amount) => set({ balance: amount }),
  setIncomeMonth: (amount) => set({ incomeMonth: amount }),
  setExpenseMonth: (amount) => set({ expenseMonth: amount }),
}))
