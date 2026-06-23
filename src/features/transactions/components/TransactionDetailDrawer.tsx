import { X, Copy, Check, ExternalLink, ArrowDown } from 'lucide-react';
import { useState } from 'react';
import { useTransactionDetail } from '../hooks/useTransactionDetail';
import { formatCryptoAmount, formatFiatAmount, formatDate } from '@/utils/format';
import StatusBadge from '@/components/ui/StatusBadge';

interface TransactionDetailDrawerProps {
  transactionId: string | null;
  onClose: () => void;
}

export default function TransactionDetailDrawer({
  transactionId,
  onClose,
}: TransactionDetailDrawerProps) {
  const isOpen = !!transactionId;
  const { data: tx, isLoading, isError } = useTransactionDetail(transactionId || '');
  const [copiedField, setCopiedField] = useState<string | null>(null);

  const handleCopy = (text: string, fieldName: string) => {
    navigator.clipboard.writeText(text);
    setCopiedField(fieldName);
    setTimeout(() => setCopiedField(null), 2000);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/30 backdrop-blur-xs transition-opacity duration-300"
        onClick={onClose}
      />

      {/* Drawer Container */}
      <div className="absolute inset-y-0 right-0 pl-10 max-w-full flex">
        <div className="w-screen max-w-md bg-white shadow-2xl flex flex-col border-l border-black/5 animate-slide-in">
          {/* Header */}
          <div className="p-6 border-b border-black/5 flex justify-between items-center bg-[#F8F8FA]">
            <div>
              <h2 className="text-base font-extrabold text-black tracking-tight">
                Payment Details
              </h2>
              <p className="text-[10px] text-muted-foreground font-semibold mt-0.5">
                Complete metadata audit
              </p>
            </div>
            <button
              onClick={onClose}
              className="h-8 w-8 rounded-full border border-black/5 flex items-center justify-center text-muted-foreground hover:text-black hover:bg-black/5 transition-all"
            >
              <X className="h-4 w-4" />
            </button>
          </div>

          {/* Body */}
          <div className="flex-1 overflow-y-auto p-6">
            {isLoading ? (
              <div className="space-y-6">
                <div className="flex items-center space-x-4 animate-pulse">
                  <div className="h-10 w-10 bg-black/5 rounded-full" />
                  <div className="space-y-2 flex-1">
                    <div className="h-4 bg-black/5 rounded w-1/3" />
                    <div className="h-3 bg-black/5 rounded w-1/4" />
                  </div>
                </div>
                <div className="border border-black/5 rounded-2xl p-4 space-y-4">
                  {Array.from({ length: 5 }).map((_, idx) => (
                    <div key={idx} className="space-y-1">
                      <div className="h-3 bg-black/5 rounded w-1/5 animate-pulse" />
                      <div className="h-4 bg-black/5 rounded w-3/4 animate-pulse" />
                    </div>
                  ))}
                </div>
              </div>
            ) : isError || !tx ? (
              <div className="text-center py-12 border border-red-100 rounded-2xl bg-red-50/20">
                <p className="text-xs font-semibold text-red-500">
                  Could not load payment details. Please try again.
                </p>
              </div>
            ) : (
              <div className="space-y-6">
                {/* Status Hero */}
                <div className="flex justify-between items-center bg-[#F8F8FA] border border-black/5 rounded-2xl p-5">
                  <div className="space-y-1.5">
                    <span className="text-[10px] font-extrabold uppercase tracking-wider text-muted-foreground block">
                      Transaction Status
                    </span>
                    <StatusBadge status={tx.status} />
                  </div>
                  <div className="text-right">
                    <span className="text-[10px] font-extrabold uppercase tracking-wider text-muted-foreground block">
                      Amount
                    </span>
                    <span className="text-lg font-extrabold text-black">
                      {formatFiatAmount(tx.fiatAmount, tx.fiatCurrency)}
                    </span>
                  </div>
                </div>

                {/* Received details */}
                <div className="bg-emerald-500/5 border border-emerald-500/10 rounded-2xl p-5 flex justify-between items-center">
                  <div className="flex items-center space-x-3">
                    <div className="h-8 w-8 rounded-xl bg-emerald-500/15 flex items-center justify-center text-emerald-600">
                      <ArrowDown className="h-4 w-4" />
                    </div>
                    <div>
                      <span className="text-[10px] font-extrabold text-emerald-600 uppercase tracking-wider block">
                        Received Amount
                      </span>
                      <span className="text-xs font-bold text-emerald-700">
                        {formatCryptoAmount(tx.amount, tx.token.symbol, tx.token.decimals)}
                      </span>
                    </div>
                  </div>
                  <span className="text-[10px] font-bold text-emerald-600 bg-emerald-500/10 px-2 py-0.5 rounded-full">
                    {tx.network}
                  </span>
                </div>

                {/* Audit details card */}
                <div className="border border-black/5 rounded-2xl p-5 space-y-4 bg-white text-xs">
                  <h3 className="text-[10px] font-extrabold uppercase tracking-wider text-muted-foreground pb-2 border-b border-black/5">
                    Audit Info
                  </h3>

                  {/* ID */}
                  <div className="flex justify-between items-start py-0.5">
                    <span className="text-muted-foreground font-semibold">Payment ID</span>
                    <span className="font-bold text-black">{tx.id}</span>
                  </div>

                  {/* Title */}
                  <div className="flex justify-between items-start py-0.5">
                    <span className="text-muted-foreground font-semibold">Link Title</span>
                    <span className="font-bold text-black">{tx.description || 'Payment Link'}</span>
                  </div>

                  {/* Order Ref */}
                  <div className="flex justify-between items-start py-0.5">
                    <span className="text-muted-foreground font-semibold">Order Ref</span>
                    <span className="font-bold text-black uppercase">{tx.id.substring(13, 20)}</span>
                  </div>

                  {/* Created Date */}
                  <div className="flex justify-between items-start py-0.5">
                    <span className="text-muted-foreground font-semibold">Created At</span>
                    <span className="font-bold text-black">{formatDate(tx.createdAt)}</span>
                  </div>

                  {/* Payment Date */}
                  <div className="flex justify-between items-start py-0.5">
                    <span className="text-muted-foreground font-semibold">Settled At</span>
                    <span className="font-bold text-black">{formatDate(tx.updatedAt)}</span>
                  </div>
                </div>

                {/* Blockchain Info card */}
                <div className="border border-black/5 rounded-2xl p-5 space-y-4 bg-white text-xs">
                  <h3 className="text-[10px] font-extrabold uppercase tracking-wider text-muted-foreground pb-2 border-b border-black/5">
                    On-chain Info
                  </h3>

                  {/* Sender Address */}
                  {tx.senderAddress && (
                    <div className="space-y-1">
                      <div className="flex justify-between items-center">
                        <span className="text-muted-foreground font-semibold">Sender Wallet</span>
                        <button
                          onClick={() => handleCopy(tx.senderAddress!, 'sender')}
                          className="text-muted-foreground hover:text-black flex items-center space-x-1"
                        >
                          {copiedField === 'sender' ? (
                            <Check className="h-3 w-3 text-emerald-600" />
                          ) : (
                            <Copy className="h-3 w-3" />
                          )}
                          <span className="text-[9px] font-bold">
                            {copiedField === 'sender' ? 'Copied' : 'Copy'}
                          </span>
                        </button>
                      </div>
                      <p className="font-mono text-black font-semibold break-all bg-[#F8F8FA] p-2.5 rounded-lg border border-black/5 text-[10px]">
                        {tx.senderAddress}
                      </p>
                    </div>
                  )}

                  {/* Recipient Address */}
                  <div className="space-y-1">
                    <div className="flex justify-between items-center">
                      <span className="text-muted-foreground font-semibold">Merchant Recipient Wallet</span>
                      <button
                        onClick={() => handleCopy(tx.recipientAddress, 'recipient')}
                        className="text-muted-foreground hover:text-black flex items-center space-x-1"
                      >
                        {copiedField === 'recipient' ? (
                          <Check className="h-3 w-3 text-emerald-600" />
                        ) : (
                          <Copy className="h-3 w-3" />
                        )}
                        <span className="text-[9px] font-bold">
                          {copiedField === 'recipient' ? 'Copied' : 'Copy'}
                        </span>
                      </button>
                    </div>
                    <p className="font-mono text-black font-semibold break-all bg-[#F8F8FA] p-2.5 rounded-lg border border-black/5 text-[10px]">
                      {tx.recipientAddress}
                    </p>
                  </div>

                  {/* Tx Hash */}
                  {tx.txHash && (
                    <div className="space-y-1">
                      <div className="flex justify-between items-center">
                        <span className="text-muted-foreground font-semibold">Transaction Hash</span>
                        <div className="flex items-center space-x-2">
                          <button
                            onClick={() => handleCopy(tx.txHash!, 'hash')}
                            className="text-muted-foreground hover:text-black flex items-center space-x-1"
                          >
                            {copiedField === 'hash' ? (
                              <Check className="h-3 w-3 text-emerald-600" />
                            ) : (
                              <Copy className="h-3 w-3" />
                            )}
                            <span className="text-[9px] font-bold">
                              {copiedField === 'hash' ? 'Copied' : 'Copy'}
                            </span>
                          </button>
                          <a
                            href={`https://etherscan.io/tx/${tx.txHash}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-primary hover:text-primary/80 flex items-center space-x-0.5 ml-1"
                          >
                            <ExternalLink className="h-3 w-3" />
                            <span className="text-[9px] font-bold">Explorer</span>
                          </a>
                        </div>
                      </div>
                      <p className="font-mono text-black font-semibold break-all bg-[#F8F8FA] p-2.5 rounded-lg border border-black/5 text-[10px]">
                        {tx.txHash}
                      </p>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
