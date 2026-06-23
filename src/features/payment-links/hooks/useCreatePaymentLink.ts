import { useMutation, useQueryClient } from '@tanstack/react-query';
import { paymentLinkService } from '../services/payment-link.service';
import type { CreatePaymentLinkInput } from '../services/payment-link.service';
import { queryKeys } from '../../queryKeys';

export function useCreatePaymentLink() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: CreatePaymentLinkInput) => paymentLinkService.createPaymentLink(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.paymentLinks.all });
    },
  });
}
