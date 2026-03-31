export interface User {
  id: string;
  name: string;
  email: string;
  role: string;
  status: string;
  createdAt: string;
}

export interface AuthState {
  user: User;
  balance: number;
  incomeMonth: number;
  expenseMonth: number;
  login: (user: User) => void;
  logout: () => void;
  setBalance: (amount: number) => void;
  setIncomeMonth: (income: number) => void;
  setExpenseMonth: (expense: number) => void;
}