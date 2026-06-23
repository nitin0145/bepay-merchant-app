import { useQuery } from '@tanstack/react-query';
import { transactionService } from '../services/transaction.service';
import type { GetTransactionsParams } from '../services/transaction.service';
import { queryKeys } from '../../queryKeys';

export function useTransactions(filters?: GetTransactionsParams) {
  return useQuery({
    queryKey: queryKeys.transactions.list(filters),
    queryFn: () => transactionService.getTransactions(filters),
    staleTime: 30000,
  });
}
