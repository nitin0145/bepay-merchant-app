import { useQuery } from '@tanstack/react-query';
import { paymentLinkService } from '../services/payment-link.service';
import type { GetPaymentLinksParams } from '../services/payment-link.service';
import { queryKeys } from '../../queryKeys';

export function usePaymentLinks(params?: GetPaymentLinksParams) {
  return useQuery({
    queryKey: queryKeys.paymentLinks.list(params as any),
    queryFn: () => paymentLinkService.getPaymentLinks(params),
    placeholderData: (previousData) => previousData, // keep previous data for smooth pagination
  });
}
