export const queryKeys = {
  dashboard: {
    all: ['dashboard'] as const,
    summary: (filters?: Record<string, any>) => [...queryKeys.dashboard.all, 'summary', filters || {}] as const,
  },
  transactions: {
    all: ['transactions'] as const,
    list: (filters?: Record<string, any>) => [...queryKeys.transactions.all, 'list', filters || {}] as const,
    detail: (id: string) => [...queryKeys.transactions.all, 'detail', id] as const,
  },
  paymentLinks: {
    all: ['paymentLinks'] as const,
    list: (filters?: Record<string, any>) => [...queryKeys.paymentLinks.all, 'list', filters || {}] as const,
    detail: (id: string) => [...queryKeys.paymentLinks.all, 'detail', id] as const,
  },
} as const;
