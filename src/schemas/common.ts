import { z } from 'zod';

// Reusable basic validation patterns
export const ethAddressSchema = z
  .string()
  .regex(/^0x[a-fA-F0-9]{40}$/, 'Invalid Ethereum address format');

export const txHashSchema = z
  .string()
  .regex(/^0x[a-fA-F0-9]{64}$/, 'Invalid transaction hash format');

export const uuidSchema = z.string().uuid('Invalid identifier');
