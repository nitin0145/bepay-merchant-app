export const Network = {
  ETHEREUM: 'ETHEREUM',
  POLYGON: 'POLYGON',
  SOLANA: 'SOLANA',
  BITCOIN: 'BITCOIN',
  TRON: 'TRON',
} as const;
export type Network = typeof Network[keyof typeof Network];

export const TokenSymbol = {
  USDC: 'USDC',
  USDT: 'USDT',
  ETH: 'ETH',
  SOL: 'SOL',
  BTC: 'BTC',
} as const;
export type TokenSymbol = typeof TokenSymbol[keyof typeof TokenSymbol];

export interface Token {
  symbol: TokenSymbol;
  name: string;
  decimals: number;
  network: Network;
  contractAddress?: string;
  logoUrl?: string;
}

export type TransactionStatus = 'PENDING' | 'COMPLETED' | 'FAILED' | 'EXPIRED';

export interface Transaction {
  id: string;
  merchantId: string;
  amount: number;             // Crypto amount
  fiatAmount: number;         // Equivalent fiat value at runtime
  fiatCurrency: string;       // e.g. 'USD'
  token: Token;
  network: Network;
  txHash?: string;
  senderAddress?: string;
  recipientAddress: string;
  status: TransactionStatus;
  description?: string;
  paymentLinkId?: string;     // References source PaymentLink if applicable
  createdAt: string;          // ISO Date string
  updatedAt: string;          // ISO Date string
}

export type PaymentLinkStatus = 'ACTIVE' | 'INACTIVE' | 'PAID' | 'EXPIRED';

export interface PaymentLink {
  id: string;
  merchantId: string;
  amount: number;             // Request amount in fiat
  fiatCurrency: string;       // Fiat currency code (e.g., 'USD', 'EUR')
  description?: string;
  supportedTokens: Token[];
  supportedNetworks: Network[];
  status: PaymentLinkStatus;
  url: string;                // The shareable payment URL link
  redirectUrl?: string;       // Success callback redirect page
  expiresAt?: string;         // Optional ISO Date string
  createdAt: string;          // ISO Date string
  referenceId?: string;
  internalNotes?: string;
  partialPayments?: boolean;
  customerDetails?: {
    name?: string;
    phone?: string;
    email?: string;
  };
}

export interface MetricSummary {
  value: number;
  changePercentage: number;   // e.g. 12.5 (positive) or -3.2 (negative)
  trend: 'UP' | 'DOWN' | 'NEUTRAL';
}

export interface DashboardSummary {
  totalReceived: MetricSummary;
  successfulPayments: MetricSummary;
  pendingPayments: MetricSummary;
  failedPayments: MetricSummary;
  activePaymentLinksCount: number;
  volumeOverTime: Array<{
    date: string;              // e.g. '2026-06-01'
    volume: number;
  }>;
}
