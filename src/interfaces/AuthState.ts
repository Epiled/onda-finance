export interface AuthState {
  user: { name: string; email: string } | null;
  balance: number;
  incomeMonth: number;
  expenseMonth: number;
  logout: () => void;
  setBalance: (amount: number) => void;
  setIncomeMonth: (income: number,) => void;
  setExpenseMonth: (expense: number) => void;
}