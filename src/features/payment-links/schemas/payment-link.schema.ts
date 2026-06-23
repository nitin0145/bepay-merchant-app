import { z } from 'zod';

export const createPaymentLinkSchema = z.object({
  amount: z
    .number()
    .positive('Amount must be greater than zero'),
  fiatCurrency: z
    .string()
    .min(3, 'Currency code must be exactly 3 characters')
    .max(3, 'Currency code must be exactly 3 characters')
    .toUpperCase(),
  description: z
    .string()
    .max(200, 'Description cannot exceed 200 characters')
    .optional(),
  supportedTokens: z
    .array(z.enum(['USDC', 'USDT', 'ETH', 'SOL', 'BTC']))
    .min(1, 'Select at least one supported token'),
  supportedNetworks: z
    .array(z.enum(['ETHEREUM', 'POLYGON', 'SOLANA', 'BITCOIN', 'TRON']))
    .min(1, 'Select at least one supported network'),
  expiresAt: z
    .string()
    .refine(
      val => {
        if (!val) return true;
        const date = new Date(val);
        return !isNaN(date.getTime()) && date.getTime() > Date.now();
      },
      {
        message: 'Expiration date must be in the future',
      }
    )
    .optional(),
  redirectUrl: z
    .string()
    .url('Please enter a valid URL')
    .or(z.literal(''))
    .optional(),
});

export type CreatePaymentLinkFormData = z.infer<typeof createPaymentLinkSchema>;
