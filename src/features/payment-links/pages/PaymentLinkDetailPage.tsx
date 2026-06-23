import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Copy, CheckCircle2 } from 'lucide-react';
import { useState } from 'react';
import { usePaymentLinkDetail } from '../hooks/usePaymentLinkDetail';
import StatusBadge from '@/components/ui/StatusBadge';
import { formatCryptoAmount } from '@/utils/format';

export default function PaymentLinkDetailPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { data: link, isLoading, isError } = usePaymentLinkDetail(id!);
  const [copied, setCopied] = useState(false);

  if (isLoading) {
    return <div className="p-8 text-center text-muted-foreground font-semibold">Loading payment link details...</div>;
  }

  if (isError || !link) {
    return (
      <div className="p-8 text-center space-y-4">
        <p className="text-red-500 font-semibold">Failed to load payment link or not found.</p>
        <button onClick={() => navigate('/payment-links')} className="text-sm font-bold text-black underline">
          Go back to list
        </button>
      </div>
    );
  }

  const handleCopy = () => {
    navigator.clipboard.writeText(link.url);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const displayToken = link.supportedTokens?.[0];

  return (
    <div className="space-y-6 animate-in fade-in duration-300 max-w-4xl">
      {/* Header */}
      <div className="flex items-center space-x-4">
        <button
          onClick={() => navigate('/payment-links')}
          className="p-2 border border-black/5 rounded-full hover:bg-black/5 transition-colors"
        >
          <ArrowLeft className="h-5 w-5 text-black" />
        </button>
        <div>
          <h2 className="text-xl font-extrabold text-black tracking-tight">Payment Link Details</h2>
          <p className="text-xs text-muted-foreground font-semibold mt-0.5">
            {link.id}
          </p>
        </div>
        <div className="ml-auto">
          <StatusBadge status={link.status} />
        </div>
      </div>

      {/* Main Details Card */}
      <div className="bg-white border border-black/5 rounded-[2rem] p-6 md:p-8 space-y-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          
          {/* General Info */}
          <div className="space-y-6">
            <div>
              <p className="text-[10px] font-extrabold text-muted-foreground uppercase tracking-wider mb-1">
                Link Description
              </p>
              <p className="text-sm font-bold text-black">
                {link.description || 'No description provided'}
              </p>
            </div>

            <div>
              <p className="text-[10px] font-extrabold text-muted-foreground uppercase tracking-wider mb-1">
                Amount
              </p>
              <div className="flex items-baseline space-x-2">
                <span className="text-2xl font-extrabold text-black">
                  {displayToken ? formatCryptoAmount(link.amount, displayToken.symbol, displayToken.decimals) : link.amount.toFixed(2)}
                </span>
                <span className="text-sm font-bold text-muted-foreground">
                  {displayToken ? displayToken.symbol : link.fiatCurrency}
                </span>
              </div>
            </div>

            <div>
              <p className="text-[10px] font-extrabold text-muted-foreground uppercase tracking-wider mb-1">
                Shareable URL
              </p>
              <div className="flex items-center space-x-2 bg-[#F8F8FA] p-3 rounded-xl border border-black/5">
                <span className="text-xs font-semibold text-black truncate flex-1">
                  {link.url}
                </span>
                <button
                  onClick={handleCopy}
                  className="p-2 -m-2 text-muted-foreground hover:text-black transition-colors"
                  title="Copy Link"
                >
                  {copied ? <CheckCircle2 className="w-4 h-4 text-emerald-500" /> : <Copy className="w-4 h-4" />}
                </button>
              </div>
            </div>
          </div>

          {/* Settings & Dates */}
          <div className="space-y-6">
            <div>
              <p className="text-[10px] font-extrabold text-muted-foreground uppercase tracking-wider mb-1">
                Created At
              </p>
              <p className="text-sm font-bold text-black">
                {new Date(link.createdAt).toLocaleString()}
              </p>
            </div>

            {link.expiresAt && (
              <div>
                <p className="text-[10px] font-extrabold text-muted-foreground uppercase tracking-wider mb-1">
                  Expires At
                </p>
                <p className="text-sm font-bold text-black">
                  {new Date(link.expiresAt).toLocaleString()}
                </p>
              </div>
            )}

            {link.referenceId && (
              <div>
                <p className="text-[10px] font-extrabold text-muted-foreground uppercase tracking-wider mb-1">
                  Reference ID
                </p>
                <p className="text-sm font-bold text-black">
                  {link.referenceId}
                </p>
              </div>
            )}

            <div>
              <p className="text-[10px] font-extrabold text-muted-foreground uppercase tracking-wider mb-1">
                Partial Payments
              </p>
              <p className="text-sm font-bold text-black">
                {link.partialPayments ? 'Enabled' : 'Disabled'}
              </p>
            </div>
          </div>
        </div>

        {/* Customer Details */}
        {link.customerDetails && (
          <div className="pt-8 border-t border-black/5">
            <h3 className="text-sm font-extrabold text-black mb-4">Customer Details</h3>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              <div>
                <p className="text-[10px] font-extrabold text-muted-foreground uppercase tracking-wider mb-1">Name</p>
                <p className="text-sm font-bold text-black">{link.customerDetails.name || '-'}</p>
              </div>
              <div>
                <p className="text-[10px] font-extrabold text-muted-foreground uppercase tracking-wider mb-1">Phone</p>
                <p className="text-sm font-bold text-black">{link.customerDetails.phone || '-'}</p>
              </div>
              <div>
                <p className="text-[10px] font-extrabold text-muted-foreground uppercase tracking-wider mb-1">Email</p>
                <p className="text-sm font-bold text-black">{link.customerDetails.email || '-'}</p>
              </div>
            </div>
          </div>
        )}

        {/* Internal Notes */}
        {link.internalNotes && (
          <div className="pt-8 border-t border-black/5">
            <h3 className="text-sm font-extrabold text-black mb-2">Internal Notes</h3>
            <p className="text-sm font-semibold text-muted-foreground bg-[#F8F8FA] p-4 rounded-xl">
              {link.internalNotes}
            </p>
          </div>
        )}
      </div>

      {/* Associated Transactions Placeholder */}
      <div className="mt-8">
        <h3 className="text-lg font-extrabold text-black tracking-tight mb-4">Associated Payments</h3>
        <div className="bg-white border border-black/5 rounded-[2rem] p-8 text-center">
          <p className="text-sm font-semibold text-muted-foreground">
            {link.status === 'PAID' 
              ? 'Transactions for this link will appear here.'
              : 'No payments have been received for this link yet.'}
          </p>
        </div>
      </div>
    </div>
  );
}
