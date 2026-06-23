import { apiClient } from '@/services/api-client';
import type { PaymentLink } from '@/types/domain';

export interface GetPaymentLinksParams {
  status?: string;
  search?: string;
  page?: number;
  limit?: number;
}

export interface GetPaymentLinksResponse {
  paymentLinks: PaymentLink[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

export interface CreatePaymentLinkInput {
  amount: number;
  fiatCurrency: string;
  description?: string;
  supportedTokens: string[];
  supportedNetworks: string[];
  expiresAt?: string;
  redirectUrl?: string;
  referenceId?: string;
  internalNotes?: string;
  partialPayments?: boolean;
  customerDetails?: {
    name?: string;
    phone?: string;
    email?: string;
  };
}

export const paymentLinkService = {
  getPaymentLinks(params?: GetPaymentLinksParams): Promise<GetPaymentLinksResponse> {
    return apiClient.get<GetPaymentLinksResponse>('/payment-links', { params });
  },

  getPaymentLinkById(id: string): Promise<PaymentLink> {
    return apiClient.get<PaymentLink>(`/payment-links/${id}`);
  },

  createPaymentLink(data: CreatePaymentLinkInput): Promise<PaymentLink> {
    return apiClient.post<PaymentLink>('/payment-links', data);
  },
};
