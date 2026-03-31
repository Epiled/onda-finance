import type { Transaction } from "@/types/transaction";
import transactionsData from "@/mocks/transactions.mock.json";

const LOCAL_STORAGE_KEY = "onda-finance-transactions";

export const TransactionService = {
  async getAll(): Promise<Transaction[]> {
    // Na vida real seria: const { data } = await api.get('/transactions');

    const localData = localStorage.getItem(LOCAL_STORAGE_KEY);

    if (!localData) {
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(transactionsData));
      return transactionsData;
    }

    try {
      const parsed = JSON.parse(localData);
      return Array.isArray(parsed) ? parsed : transactionsData;
    } catch {
      return transactionsData;
    }
  },

  async create(transaction: Transaction) {
    // Na vida real seria: return api.post("/transactions", transaction);

    const current = await this.getAll();

    const updated = [...current, transaction];
    
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(updated));

    return Promise.resolve(transaction);
  }
}