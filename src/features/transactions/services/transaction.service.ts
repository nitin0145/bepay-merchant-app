import { apiClient } from '@/services/api-client';
import type { Transaction } from '@/types/domain';

export interface GetTransactionsParams {
  status?: string;
  network?: string;
  token?: string;
  search?: string;
  startDate?: string;
  endDate?: string;
  page?: number;
  limit?: number;
}

export interface GetTransactionsResponse {
  transactions: Transaction[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

export const transactionService = {
  getTransactions(params?: GetTransactionsParams): Promise<GetTransactionsResponse> {
    return apiClient.get<GetTransactionsResponse>('/transactions', params);
  },

  getTransactionById(id: string): Promise<Transaction> {
    return apiClient.get<Transaction>(`/transactions/${id}`);
  },
};
