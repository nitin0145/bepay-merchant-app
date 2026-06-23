import { useQuery } from '@tanstack/react-query';
import { transactionService } from '../services/transaction.service';
import { queryKeys } from '../../queryKeys';

export function useTransactionDetail(id: string) {
  return useQuery({
    queryKey: queryKeys.transactions.detail(id),
    queryFn: () => transactionService.getTransactionById(id),
    enabled: !!id,
    staleTime: 60000, // 1 minute stale time for individual transactions
  });
}
