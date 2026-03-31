import * as z from "zod";

export const transactionSchemaForm = z.object({
  from: z.email("E-mail do remetente inválido"),
  to: z.email("Informe um e-mail de destino válido"),
  value: z.number("O valor deve ser um número").min(0.01, "O valor deve ser maior que zero"),
});

export type TransactionFormValues = z.infer<typeof transactionSchemaForm>;
