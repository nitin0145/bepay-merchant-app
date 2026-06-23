import { useQuery } from '@tanstack/react-query';
import { paymentLinkService } from '../services/payment-link.service';
import { queryKeys } from '../../queryKeys';

export function usePaymentLinkDetail(id: string) {
  return useQuery({
    queryKey: queryKeys.paymentLinks.detail(id),
    queryFn: () => paymentLinkService.getPaymentLinkById(id),
    enabled: !!id,
    staleTime: 60000,
  });
}
