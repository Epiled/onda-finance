import * as z from "zod";

export const transactionSchema = z.object({
  id: z.string(),
  foreignKey: z.string(),
  date: z.string(),
  description: z.string(),
  type: z.string(),
  value: z.number(),
  status: z.string(),
});

export type Transaction = z.infer<typeof transactionSchema>;
