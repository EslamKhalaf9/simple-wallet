import { z } from 'zod';

export const createTransactionSchema = z.object({
  amount: z.number().min(1),
});

export type CreateTransactionDto = z.infer<typeof createTransactionSchema>;
