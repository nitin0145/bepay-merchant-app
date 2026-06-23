import { z } from 'zod';

export const transactionFilterSchema = z.object({
  search: z.string().optional(),
  status: z.enum(['PENDING', 'COMPLETED', 'FAILED', 'EXPIRED', '']).optional(),
  network: z.enum(['ETHEREUM', 'POLYGON', 'SOLANA', 'BITCOIN', 'TRON', '']).optional(),
  token: z.enum(['USDC', 'USDT', 'ETH', 'SOL', 'BTC', '']).optional(),
  page: z.number().int().positive().default(1),
  limit: z.number().int().positive().default(10),
});

export type TransactionFilterData = z.infer<typeof transactionFilterSchema>;
export type TransactionStatusFilter = z.infer<typeof transactionFilterSchema>['status'];
