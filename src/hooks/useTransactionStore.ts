import { TransactionService } from "@/services/transactions.service";
import type { Transaction } from "@/types/transaction";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

export function useTransactions() {
  return useQuery({
    queryKey: ["transactions"],
    queryFn: TransactionService.getAll,
  });
}

export function useCreateTransaction() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: Transaction) => TransactionService.create(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["transactions"] });
    },
  });
}