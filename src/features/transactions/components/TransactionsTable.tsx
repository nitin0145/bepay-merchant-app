import { ArrowDown } from 'lucide-react';
import type { Transaction } from '@/types/domain';
import { formatCryptoAmount, formatFiatAmount } from '@/utils/format';
import StatusBadge from '@/components/ui/StatusBadge';

interface TransactionsTableProps {
  transactions: Transaction[];
  onSelectRow: (tx: Transaction) => void;
}

export default function TransactionsTable({
  transactions,
  onSelectRow,
}: TransactionsTableProps) {
  return (
    <div className="overflow-x-auto border border-black/5 rounded-[2rem] bg-white">
      <table className="min-w-full divide-y divide-black/5 text-left text-xs">
        <thead>
          <tr className="text-muted-foreground font-bold uppercase tracking-wider text-[10px] bg-[#F8F8FA]">
            <th className="px-6 py-4">Transaction ID</th>
            <th className="px-6 py-4">Link Title</th>
            <th className="px-6 py-4">Order Ref</th>
            <th className="px-6 py-4">Amount</th>
            <th className="px-6 py-4">Amount Received</th>
            <th className="px-6 py-4">Network</th>
            <th className="px-6 py-4">Status</th>
            <th className="px-6 py-4">Created Date</th>
            <th className="px-6 py-4">Payment Date</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-black/5 bg-white font-medium text-black">
          {transactions.length === 0 ? (
            <tr>
              <td colSpan={9} className="text-center py-12 text-muted-foreground text-sm">
                No transactions found matching your filters.
              </td>
            </tr>
          ) : (
            transactions.map((tx) => (
              <tr
                key={tx.id}
                onClick={() => onSelectRow(tx)}
                className="hover:bg-black/5 transition-colors cursor-pointer group"
              >
                {/* ID */}
                <td className="px-6 py-4 font-bold text-muted-foreground group-hover:text-black transition-colors">
                  {tx.id.substring(3, 13)}
                </td>

                {/* Title */}
                <td className="px-6 py-4 truncate max-w-[120px] font-semibold text-black">
                  {tx.description || 'Payment Link'}
                </td>

                {/* Order ID */}
                <td className="px-6 py-4 text-muted-foreground font-semibold">
                  {tx.id.substring(13, 20).toUpperCase()}
                </td>

                {/* Original price (USD Equivalent) */}
                <td className="px-6 py-4 font-bold">
                  {formatFiatAmount(tx.fiatAmount, tx.fiatCurrency)}
                </td>

                {/* Amount Received */}
                <td className="px-6 py-4">
                  <div className="flex items-center space-x-1.5 text-emerald-600 font-bold bg-emerald-500/5 px-2 py-1 rounded-lg w-max">
                    <ArrowDown className="h-3 w-3" />
                    <span>
                      {formatCryptoAmount(tx.amount, tx.token.symbol, tx.token.decimals)}
                    </span>
                  </div>
                </td>

                {/* Network */}
                <td className="px-6 py-4 text-muted-foreground font-semibold">
                  {tx.network}
                </td>

                {/* Status */}
                <td className="px-6 py-4">
                  <StatusBadge status={tx.status} />
                </td>

                {/* Created Date */}
                <td className="px-6 py-4 text-muted-foreground font-semibold">
                  {new Date(tx.createdAt).toLocaleDateString('en-US', {
                    day: 'numeric',
                    month: 'short',
                    year: 'numeric',
                  })}
                </td>

                {/* Created Time / Payment Date */}
                <td className="px-6 py-4 text-muted-foreground font-semibold">
                  {new Date(tx.updatedAt).toLocaleTimeString('en-US', {
                    hour: '2-digit',
                    minute: '2-digit',
                  })}
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}
