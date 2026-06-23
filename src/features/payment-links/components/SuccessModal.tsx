import { Copy, CheckCircle2, Bitcoin } from 'lucide-react';
import { useState } from 'react';
import type { PaymentLink } from '@/types/domain';
import { formatCryptoAmount } from '@/utils/format';

interface SuccessModalProps {
  isOpen: boolean;
  onClose: () => void;
  paymentLink: PaymentLink | null;
}

export default function SuccessModal({
  isOpen,
  onClose,
  paymentLink,
}: SuccessModalProps) {
  const [copied, setCopied] = useState(false);

  if (!isOpen || !paymentLink) return null;

  const handleCopy = () => {
    navigator.clipboard.writeText(paymentLink.url);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: 'Payment Link',
        text: 'Please pay using this link',
        url: paymentLink.url,
      }).catch((err) => console.error('Share failed:', err));
    } else {
      handleCopy();
    }
  };

  // Determine primary token to display
  const displayToken = paymentLink.supportedTokens?.[0];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Toast Notification for Copy */}
      {copied && (
        <div className="absolute top-8 left-1/2 -translate-x-1/2 bg-white rounded-full px-6 py-3 shadow-lg flex items-center space-x-2 animate-in fade-in slide-in-from-top-4 z-[60]">
          <span className="text-sm font-semibold">Copied to Clipboard</span>
          <CheckCircle2 className="h-4 w-4 text-emerald-500" />
        </div>
      )}

      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/40 backdrop-blur-sm transition-opacity duration-300"
        onClick={onClose}
      />

      {/* Modal Container */}
      <div 
        role="dialog"
        aria-modal="true"
        aria-labelledby="success-title"
        className="relative bg-white rounded-3xl w-full max-w-[400px] flex flex-col shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-200 p-8 text-center items-center"
      >
        
        {/* Illustration Placeholder */}
        <div className="w-24 h-24 mb-6 relative">
          {/* This mimics the "Bitcoin with wings/antennas" in Figma loosely */}
          <div className="absolute inset-0 border-[3px] border-black rounded-xl transform -rotate-6 bg-white z-10 flex items-center justify-center shadow-sm">
            <Bitcoin className="w-12 h-12 text-black" strokeWidth={1.5} />
          </div>
          <div className="absolute top-0 right-0 w-4 h-4 rounded-full border-[2px] border-black -mt-2 -mr-2 bg-white z-20" />
          <div className="absolute bottom-2 left-[-10px] w-3 h-3 rounded-full border-[2px] border-black bg-white z-0" />
          <div className="absolute top-1/2 -right-4 w-2 h-2 rounded-full bg-black z-0" />
        </div>

        <h2 id="success-title" className="text-xl font-bold text-black mb-8">Payment Link Created!</h2>

        <div className="w-full text-left space-y-6">
          {/* Amount Section */}
          <div className="flex items-end justify-between border-b border-black/5 pb-4">
            <div>
              <p className="text-[10px] font-semibold text-muted-foreground uppercase tracking-wider mb-1">
                Total Amount
              </p>
              <div className="flex items-baseline space-x-2">
                <span className="text-xl font-extrabold text-black">
                  {displayToken ? formatCryptoAmount(paymentLink.amount, displayToken.symbol, displayToken.decimals) : paymentLink.amount.toFixed(2)}
                </span>
                <span className="text-sm font-bold text-muted-foreground">
                  {displayToken ? displayToken.symbol : paymentLink.fiatCurrency}
                </span>
              </div>
            </div>
            {paymentLink.expiresAt && (
              <div className="text-xs font-semibold text-muted-foreground">
                {new Date(paymentLink.expiresAt).toLocaleDateString('en-US', {
                  day: 'numeric',
                  month: 'short',
                  year: 'numeric',
                })}
              </div>
            )}
          </div>

          {/* Link Section */}
          <div className="space-y-2">
            <p className="text-[10px] font-semibold text-muted-foreground uppercase tracking-wider">
              Link
            </p>
            <div className="flex items-center justify-between group">
              <p className="text-xs font-bold text-black break-all pr-4 line-clamp-2">
                {paymentLink.url}
              </p>
              <button
                onClick={handleCopy}
                className="p-2 -mr-2 text-muted-foreground hover:text-black hover:bg-black/5 rounded-lg transition-colors shrink-0"
                title="Copy Link"
              >
                {copied ? <CheckCircle2 className="w-5 h-5 text-emerald-500" /> : <Copy className="w-5 h-5" />}
              </button>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="w-full mt-10 space-y-4">
          <button
            onClick={handleShare}
            className="w-full h-12 bg-black text-white font-bold text-sm rounded-full hover:bg-black/90 active:scale-[0.98] transition-all flex items-center justify-center"
          >
            Share Via Other Apps
          </button>
          
          <button
            onClick={onClose}
            className="w-full h-10 text-xs font-bold text-muted-foreground hover:text-black transition-colors"
          >
            I'll do it later
          </button>
        </div>
      </div>
    </div>
  );
}
