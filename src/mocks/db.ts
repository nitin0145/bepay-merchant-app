import type { Transaction, PaymentLink, DashboardSummary } from '@/types/domain';
import { initialTransactions, initialPaymentLinks } from './mockData';

// Persistent in-memory arrays during browser session
let transactions = [...initialTransactions];
let paymentLinks = [...initialPaymentLinks];

export const db = {
  // TRANSACTIONS
  getTransactions(filters?: {
    status?: string;
    network?: string;
    token?: string;
    search?: string;
    startDate?: string;
    endDate?: string;
  }): Transaction[] {
    let result = [...transactions];

    if (filters?.status) {
      result = result.filter(tx => tx.status.toUpperCase() === filters.status?.toUpperCase());
    }

    if (filters?.network) {
      result = result.filter(tx => tx.network.toUpperCase() === filters.network?.toUpperCase());
    }

    if (filters?.token) {
      result = result.filter(tx => tx.token.symbol.toUpperCase() === filters.token?.toUpperCase());
    }

    if (filters?.search) {
      const searchLower = filters.search.toLowerCase();
      result = result.filter(
        tx =>
          tx.id.toLowerCase().includes(searchLower) ||
          tx.description?.toLowerCase().includes(searchLower) ||
          tx.txHash?.toLowerCase().includes(searchLower) ||
          tx.senderAddress?.toLowerCase().includes(searchLower)
      );
    }

    if (filters?.startDate) {
      const startMs = new Date(filters.startDate).getTime();
      result = result.filter(tx => new Date(tx.createdAt).getTime() >= startMs);
    }

    if (filters?.endDate) {
      const end = new Date(filters.endDate);
      end.setHours(23, 59, 59, 999);
      const endMs = end.getTime();
      result = result.filter(tx => new Date(tx.createdAt).getTime() <= endMs);
    }

    // Sort by createdAt desc
    return result.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
  },

  getTransactionById(id: string): Transaction | undefined {
    return transactions.find(tx => tx.id === id);
  },

  // PAYMENT LINKS
  getPaymentLinks(filters?: {
    status?: string;
    search?: string;
  }): PaymentLink[] {
    let result = [...paymentLinks];

    if (filters?.status) {
      result = result.filter(pl => pl.status.toUpperCase() === filters.status?.toUpperCase());
    }

    if (filters?.search) {
      const searchLower = filters.search.toLowerCase();
      result = result.filter(
        pl =>
          pl.id.toLowerCase().includes(searchLower) ||
          pl.description?.toLowerCase().includes(searchLower) ||
          pl.referenceId?.toLowerCase().includes(searchLower)
      );
    }

    // Sort by createdAt desc
    return result.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
  },

  getPaymentLinkById(id: string): PaymentLink | undefined {
    return paymentLinks.find(pl => pl.id === id);
  },

  createPaymentLink(link: Omit<PaymentLink, 'id' | 'createdAt' | 'status' | 'url'>): PaymentLink {
    const id = `pl_01h${Math.random().toString(36).substring(2, 25)}`;
    const newLink: PaymentLink = {
      ...link,
      id,
      status: 'ACTIVE',
      url: `https://pay.bepay.to/${id}`,
      createdAt: new Date().toISOString(),
    };
    paymentLinks.push(newLink);
    return newLink;
  },

  // DASHBOARD
  getDashboardSummary(): DashboardSummary {
    const completedTx = transactions.filter(tx => tx.status === 'COMPLETED');
    const pendingTx = transactions.filter(tx => tx.status === 'PENDING');
    const failedTx = transactions.filter(tx => tx.status === 'FAILED');
    const expiredTx = transactions.filter(tx => tx.status === 'EXPIRED');
    
    const totalVol = completedTx.reduce((sum, tx) => sum + tx.fiatAmount, 0);
    const completedCount = completedTx.length;
    const pendingCount = pendingTx.length;
    const failedCount = failedTx.length + expiredTx.length;
    
    const activePl = paymentLinks.filter(pl => pl.status === 'ACTIVE').length;

    // Generate volume chart for past 7 days
    const volumeOverTime = Array.from({ length: 7 }).map((_, idx) => {
      const d = new Date();
      d.setDate(d.getDate() - (6 - idx));
      const dateStr = d.toISOString().split('T')[0];

      const dayVol = completedTx
        .filter(tx => tx.createdAt.startsWith(dateStr))
        .reduce((sum, tx) => sum + tx.fiatAmount, 0);

      return {
        date: dateStr,
        volume: Number(dayVol.toFixed(2)),
      };
    });

    return {
      totalReceived: {
        value: Number(totalVol.toFixed(2)),
        changePercentage: 14.8,
        trend: 'UP',
      },
      successfulPayments: {
        value: completedCount,
        changePercentage: 8.3,
        trend: 'UP',
      },
      pendingPayments: {
        value: pendingCount,
        changePercentage: 2.1,
        trend: 'UP',
      },
      failedPayments: {
        value: failedCount,
        changePercentage: -4.5,
        trend: 'DOWN',
      },
      activePaymentLinksCount: activePl,
      volumeOverTime,
    };
  },
};
