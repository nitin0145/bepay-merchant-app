import { Copy, CheckCircle2 } from 'lucide-react';
import { useState } from 'react';
import type { PaymentLink } from '@/types/domain';
import StatusBadge from '@/components/ui/StatusBadge';

interface PaymentLinksTableProps {
  paymentLinks: PaymentLink[];
  onSelectRow: (pl: PaymentLink) => void;
}

export default function PaymentLinksTable({
  paymentLinks,
  onSelectRow,
}: PaymentLinksTableProps) {
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const handleCopy = (e: React.MouseEvent, url: string, id: string) => {
    e.stopPropagation(); // prevent row click
    navigator.clipboard.writeText(url);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <div className="overflow-x-auto border border-black/5 rounded-[2rem] bg-white">
      <table className="min-w-full divide-y divide-black/5 text-left text-xs">
        <thead>
          <tr className="text-muted-foreground font-bold uppercase tracking-wider text-[10px] bg-[#F8F8FA]">
            <th className="px-6 py-4">Invoice ID</th>
            <th className="px-6 py-4">Order ID</th>
            <th className="px-6 py-4">Currency</th>
            <th className="px-6 py-4">Invoice URL</th>
            <th className="px-6 py-4">Status</th>
            <th className="px-6 py-4">Created/ Last Updated Date</th>
            <th className="px-6 py-4">Created/ Last Updated Time</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-black/5 bg-white font-medium text-black">
          {paymentLinks.length === 0 ? (
            <tr>
              <td colSpan={7} className="text-center py-12 text-muted-foreground text-sm">
                No payment links found matching your filters.
              </td>
            </tr>
          ) : (
            paymentLinks.map((pl) => (
              <tr
                key={pl.id}
                onClick={() => onSelectRow(pl)}
                className="hover:bg-black/5 transition-colors cursor-pointer group"
              >
                {/* Invoice ID */}
                <td className="px-6 py-4 font-bold text-muted-foreground group-hover:text-black transition-colors">
                  {pl.id.substring(3, 13)}
                </td>

                {/* Order ID */}
                <td className="px-6 py-4 text-muted-foreground font-semibold">
                  {pl.referenceId || pl.id.substring(13, 20).toUpperCase()}
                </td>

                {/* Currency */}
                <td className="px-6 py-4 font-bold">
                  {pl.fiatCurrency || 'All currencies'}
                </td>

                {/* Invoice URL */}
                <td className="px-6 py-4">
                  <div className="flex items-center space-x-2">
                    <span className="truncate max-w-[150px] text-muted-foreground">
                      {pl.url}
                    </span>
                    <button
                      onClick={(e) => handleCopy(e, pl.url, pl.id)}
                      className="text-muted-foreground hover:text-black transition-colors p-1"
                      title="Copy URL"
                    >
                      {copiedId === pl.id ? (
                        <CheckCircle2 className="h-4 w-4 text-emerald-500" />
                      ) : (
                        <Copy className="h-4 w-4" />
                      )}
                    </button>
                  </div>
                </td>

                {/* Status */}
                <td className="px-6 py-4">
                  <StatusBadge status={pl.status} />
                </td>

                {/* Date */}
                <td className="px-6 py-4 text-muted-foreground font-semibold">
                  {new Date(pl.createdAt).toLocaleDateString('en-US', {
                    day: 'numeric',
                    month: 'short',
                    year: 'numeric',
                  })}
                </td>

                {/* Time */}
                <td className="px-6 py-4 text-muted-foreground font-semibold">
                  {new Date(pl.createdAt).toLocaleTimeString('en-US', {
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
