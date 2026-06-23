import { Link } from 'react-router-dom';
import { ArrowUpRight, Clock, AlertTriangle } from 'lucide-react';
import type { Transaction } from '@/types/domain';
import { formatCryptoAmount, formatFiatAmount, formatDate } from '@/utils/format';
import StatusBadge from '@/components/ui/StatusBadge';
import { PATHS } from '@/routes/paths';

interface RecentTransactionsTableProps {
  transactions: Transaction[];
  loading?: boolean;
}

export default function RecentTransactionsTable({
  transactions,
  loading = false,
}: RecentTransactionsTableProps) {
  if (loading) {
    return (
      <div className="space-y-4">
        <div className="h-4 bg-black/5 rounded w-1/4" />
        <div className="border border-black/5 rounded-3xl overflow-hidden">
          <div className="bg-black/5 h-12 w-full border-b border-black/5" />
          <div className="p-4 space-y-4">
            {Array.from({ length: 5 }).map((_, idx) => (
              <div key={idx} className="flex justify-between items-center h-10 animate-pulse">
                <div className="h-6 bg-black/5 rounded w-1/3" />
                <div className="h-6 bg-black/5 rounded w-12" />
                <div className="h-6 bg-black/5 rounded w-20" />
                <div className="h-6 bg-black/5 rounded w-24" />
                <div className="h-6 bg-black/5 rounded w-16" />
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Table Header */}
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-bold text-black tracking-tight">Recent Payments</h3>
        <Link
          to={PATHS.TRANSACTIONS}
          className="text-xs font-bold text-primary hover:underline flex items-center space-x-1"
        >
          <span>See all</span>
          <ArrowUpRight className="h-3 w-3" />
        </Link>
      </div>

      {/* Table grid wrapper */}
      <div className="overflow-x-auto border border-black/5 rounded-[2rem] bg-white">
        <table className="min-w-full divide-y divide-black/5 text-left text-xs">
          <thead>
            <tr className="text-muted-foreground font-bold uppercase tracking-wider text-[10px] bg-[#F8F8FA]">
              <th className="px-6 py-4">Transaction</th>
              <th className="px-6 py-4">Token</th>
              <th className="px-6 py-4">Amount</th>
              <th className="px-6 py-4">Fiat Value</th>
              <th className="px-6 py-4">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-black/5 bg-white font-medium text-black">
            {transactions.length === 0 ? (
              <tr>
                <td colSpan={5} className="text-center py-10 text-muted-foreground text-sm">
                  No recent transactions found
                </td>
              </tr>
            ) : (
              transactions.map((tx) => {
                return (
                  <tr
                    key={tx.id}
                    className="hover:bg-black/5 transition-colors cursor-pointer group"
                  >
                    {/* Desc Column */}
                    <td className="px-6 py-4">
                      <div className="flex items-center space-x-3">
                        <div
                          className={`h-8 w-8 rounded-xl flex items-center justify-center text-white ${
                            tx.status === 'COMPLETED'
                              ? 'bg-emerald-500/10 text-emerald-600'
                              : tx.status === 'PENDING'
                              ? 'bg-[#F2C94C]/10 text-[#C48E00]'
                              : 'bg-rose-500/10 text-rose-600'
                          }`}
                        >
                          {tx.status === 'COMPLETED' ? (
                            <ArrowUpRight className="h-4 w-4" />
                          ) : tx.status === 'PENDING' ? (
                            <Clock className="h-4 w-4" />
                          ) : (
                            <AlertTriangle className="h-4 w-4" />
                          )}
                        </div>
                        <div className="flex flex-col">
                          <span className="font-semibold text-black group-hover:text-primary transition-colors">
                            {tx.description || 'Crypto Payment'}
                          </span>
                          <span className="text-[10px] text-muted-foreground font-medium mt-0.5">
                            {formatDate(tx.createdAt)}
                          </span>
                        </div>
                      </div>
                    </td>

                    {/* Token detail */}
                    <td className="px-6 py-4">
                      <div className="flex flex-col">
                        <span className="font-bold text-black">{tx.token.symbol}</span>
                        <span className="text-[10px] text-muted-foreground font-semibold">
                          {tx.network}
                        </span>
                      </div>
                    </td>

                    {/* Crypto Amount */}
                    <td className="px-6 py-4">
                      <span className="font-bold">
                        {formatCryptoAmount(tx.amount, tx.token.symbol, tx.token.decimals)}
                      </span>
                    </td>

                    {/* Fiat Amount */}
                    <td className="px-6 py-4">
                      <span className="font-bold">{formatFiatAmount(tx.fiatAmount, tx.fiatCurrency)}</span>
                    </td>

                    {/* Status Badge */}
                    <td className="px-6 py-4">
                      <StatusBadge status={tx.status} />
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
