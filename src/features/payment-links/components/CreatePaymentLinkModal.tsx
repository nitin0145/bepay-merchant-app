import { X, ChevronDown, ChevronUp } from 'lucide-react';
import { useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useCreatePaymentLink } from '../hooks/useCreatePaymentLink';
import type { PaymentLink } from '@/types/domain';

// --- Schema ---
const createPaymentLinkSchema = z.object({
  fiatCurrency: z.string().min(1, 'Please select a currency'),
  amount: z.number().positive('Amount must be greater than zero'),
  description: z.string().optional(),
  
  // Additional Settings
  partialPayments: z.boolean().optional(),
  referenceId: z.string().optional(),
  expiresAt: z.string().optional(),
  internalNotes: z.string().optional(),

  // Customer Details
  customerDetails: z.object({
    name: z.string().optional(),
    phone: z.string().optional(),
    email: z.string().email('Invalid email').optional().or(z.literal('')),
  }).optional(),
});

type FormValues = z.infer<typeof createPaymentLinkSchema>;

interface CreatePaymentLinkModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: (link: PaymentLink) => void;
}

export default function CreatePaymentLinkModal({
  isOpen,
  onClose,
  onSuccess,
}: CreatePaymentLinkModalProps) {
  const [showAdditionalSettings, setShowAdditionalSettings] = useState(false);
  const [showCustomerDetails, setShowCustomerDetails] = useState(true); // Default true based on Figma

  const createMutation = useCreatePaymentLink();

  const {
    register,
    handleSubmit,
    control,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<FormValues>({
    resolver: zodResolver(createPaymentLinkSchema),
    defaultValues: {
      fiatCurrency: 'USDC',
      amount: 0,
      description: '',
      partialPayments: false,
      referenceId: '',
      expiresAt: '',
      internalNotes: '',
      customerDetails: {
        name: '',
        phone: '',
        email: '',
      },
    },
  });

  const onSubmit = async (data: FormValues) => {
    try {
      // Figma shows "Pay Currency" but our backend mock expects supportedTokens & Networks
      // We will map the selected currency to supportedTokens for now.
      const supportedTokens = data.fiatCurrency === 'USDC' ? ['USDC'] : 
                              data.fiatCurrency === 'USDT' ? ['USDT'] : 
                              data.fiatCurrency === 'BTC' ? ['BTC'] :
                              data.fiatCurrency === 'ETH' ? ['ETH'] : 
                              ['USDC']; // default fallback

      const supportedNetworks = data.fiatCurrency === 'BTC' ? ['BITCOIN'] :
                                data.fiatCurrency === 'ETH' ? ['ETHEREUM'] :
                                ['POLYGON', 'ETHEREUM', 'SOLANA']; // default fallback

      const newLink = await createMutation.mutateAsync({
        amount: data.amount,
        fiatCurrency: 'USD', // The base fiat amount we display
        description: data.description,
        supportedTokens,
        supportedNetworks,
        expiresAt: data.expiresAt || undefined,
        referenceId: data.referenceId || undefined,
        internalNotes: data.internalNotes || undefined,
        partialPayments: data.partialPayments,
        customerDetails: showCustomerDetails && data.customerDetails ? {
          name: data.customerDetails.name || undefined,
          phone: data.customerDetails.phone || undefined,
          email: data.customerDetails.email || undefined,
        } : undefined,
      });

      reset();
      onSuccess(newLink);
      onClose();
    } catch (err) {
      console.error('Failed to create payment link:', err);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/40 backdrop-blur-sm transition-opacity duration-300"
        onClick={onClose}
      />

      {/* Modal Container */}
      <div 
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-title"
        className="relative bg-white rounded-[2rem] w-full max-w-[480px] max-h-[90vh] flex flex-col shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-200"
      >
        {/* Header */}
        <div className="flex items-center justify-between p-6 pb-2">
          <h2 id="modal-title" className="text-xl font-bold text-black">Create Payment Tools</h2>
          <button
            onClick={onClose}
            className="text-muted-foreground hover:text-black hover:bg-black/5 rounded-full p-2 transition-colors"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Scrollable Form Body */}
        <div className="flex-1 overflow-y-auto px-6 pb-6 pt-2">
          <form id="create-payment-link-form" onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            
            {/* Pay Currency */}
            <div className="space-y-2">
              <label className="text-xs font-bold text-black">Pay Currency</label>
              <Controller
                control={control}
                name="fiatCurrency"
                render={({ field }) => (
                  <div className="relative">
                    <select
                      {...field}
                      className="w-full h-12 px-4 text-sm font-semibold rounded-2xl bg-[#F8F8FA] border-none text-black focus:ring-2 focus:ring-black/5 transition-all appearance-none"
                    >
                      <option value="">All currencies</option>
                      <option value="USDC">USDC</option>
                      <option value="USDT">USDT</option>
                      <option value="BTC">Bitcoin</option>
                      <option value="ETH">Ethereum</option>
                    </select>
                    <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground pointer-events-none" />
                  </div>
                )}
              />
              <p className="text-[10px] font-semibold text-muted-foreground pl-1">
                Please choose any supported crypto for payment
              </p>
              {errors.fiatCurrency && (
                <p className="text-xs text-red-500 font-semibold">{errors.fiatCurrency.message}</p>
              )}
            </div>

            {/* Price */}
            <div className="space-y-2">
              <label className="text-xs font-bold text-black">Price</label>
              <div className="relative">
                <input
                  type="number"
                  step="0.01"
                  {...register('amount', { valueAsNumber: true })}
                  className="w-full h-12 pl-4 pr-12 text-sm font-semibold rounded-2xl bg-[#F8F8FA] border-none text-black focus:ring-2 focus:ring-black/5 transition-all"
                  placeholder="0.00"
                />
                <span className="absolute right-4 top-1/2 -translate-y-1/2 text-sm font-bold text-black pointer-events-none">
                  USD
                </span>
              </div>
              {errors.amount && (
                <p className="text-xs text-red-500 font-semibold">{errors.amount.message}</p>
              )}
            </div>

            {/* Link For? */}
            <div className="space-y-2">
              <label className="text-xs font-bold text-black">Link For?</label>
              <input
                type="text"
                {...register('description')}
                placeholder="I need to get funds"
                className="w-full h-12 px-4 text-sm font-semibold rounded-2xl bg-[#F8F8FA] border-none text-black focus:ring-2 focus:ring-black/5 transition-all"
              />
            </div>

            {/* Additional Settings */}
            <div className="border-t border-black/5 pt-4">
              <button
                type="button"
                onClick={() => setShowAdditionalSettings(!showAdditionalSettings)}
                className="w-full flex items-center justify-between text-xs font-bold text-black"
              >
                <span>Additional Settings</span>
                {showAdditionalSettings ? (
                  <ChevronUp className="h-4 w-4 text-muted-foreground" />
                ) : (
                  <ChevronDown className="h-4 w-4 text-muted-foreground" />
                )}
              </button>

              {showAdditionalSettings && (
                <div className="mt-4 space-y-4 animate-in fade-in slide-in-from-top-2 duration-200">
                  {/* Partial Payments */}
                  <div className="flex justify-between items-center bg-[#F8F8FA] p-3 rounded-2xl">
                    <span className="text-xs font-semibold text-black">Partial Payments</span>
                    <Controller
                      control={control}
                      name="partialPayments"
                      render={({ field: { value, onChange } }) => (
                        <button
                          type="button"
                          onClick={() => onChange(!value)}
                          className={`w-10 h-6 rounded-full transition-colors flex items-center ${
                            value ? 'bg-emerald-500' : 'bg-black/10'
                          }`}
                        >
                          <div
                            className={`w-4 h-4 bg-white rounded-full mx-1 transition-transform ${
                              value ? 'translate-x-4' : 'translate-x-0'
                            }`}
                          />
                        </button>
                      )}
                    />
                  </div>

                  {/* Reference ID */}
                  <div className="space-y-1">
                    <label className="text-[10px] font-semibold text-muted-foreground uppercase">Reference ID</label>
                    <input
                      type="text"
                      {...register('referenceId')}
                      className="w-full h-10 px-4 text-xs font-semibold rounded-xl bg-[#F8F8FA] border-none text-black focus:ring-2 focus:ring-black/5 transition-all"
                    />
                  </div>

                  {/* Expiry Date */}
                  <div className="space-y-1">
                    <label className="text-[10px] font-semibold text-muted-foreground uppercase">Expiry Date</label>
                    <input
                      type="datetime-local"
                      {...register('expiresAt')}
                      className="w-full h-10 px-4 text-xs font-semibold rounded-xl bg-[#F8F8FA] border-none text-black focus:ring-2 focus:ring-black/5 transition-all"
                    />
                  </div>

                  {/* Internal Notes */}
                  <div className="space-y-1">
                    <label className="text-[10px] font-semibold text-muted-foreground uppercase">Internal Notes</label>
                    <textarea
                      {...register('internalNotes')}
                      className="w-full min-h-[60px] p-3 text-xs font-semibold rounded-xl bg-[#F8F8FA] border-none text-black focus:ring-2 focus:ring-black/5 transition-all resize-none"
                    />
                  </div>
                </div>
              )}
            </div>

            {/* Customer Details */}
            <div className="border-t border-black/5 pt-4">
              <div className="flex items-center justify-between mb-4">
                <span className="text-xs font-bold text-black">Customer Details</span>
                {showCustomerDetails ? (
                  <button
                    type="button"
                    onClick={() => {
                      setShowCustomerDetails(false);
                      reset({ ...control._formValues, customerDetails: { name: '', phone: '', email: '' } });
                    }}
                    className="text-[10px] font-bold text-red-500 hover:text-red-600 transition-colors"
                  >
                    Delete
                  </button>
                ) : (
                  <button
                    type="button"
                    onClick={() => setShowCustomerDetails(true)}
                    className="text-[10px] font-bold text-black hover:text-black/70 transition-colors"
                  >
                    + Add
                  </button>
                )}
              </div>

              {showCustomerDetails && (
                <div className="border border-black/5 rounded-[1.5rem] p-4 space-y-4">
                  {/* Name */}
                  <div className="space-y-1.5">
                    <label className="text-[10px] font-semibold text-muted-foreground uppercase">Name</label>
                    <input
                      type="text"
                      {...register('customerDetails.name')}
                      placeholder="Arshi Kohli"
                      className="w-full h-11 px-4 text-xs font-semibold rounded-xl bg-[#F8F8FA] border-none text-black focus:ring-2 focus:ring-black/5 transition-all"
                    />
                  </div>
                  
                  {/* Mobile Number */}
                  <div className="space-y-1.5">
                    <label className="text-[10px] font-semibold text-muted-foreground uppercase">Mobile Number</label>
                    <input
                      type="tel"
                      {...register('customerDetails.phone')}
                      placeholder="927969237982"
                      className="w-full h-11 px-4 text-xs font-semibold rounded-xl bg-[#F8F8FA] border-none text-black focus:ring-2 focus:ring-black/5 transition-all"
                    />
                  </div>

                  {/* Email */}
                  <div className="space-y-1.5">
                    <label className="text-[10px] font-semibold text-muted-foreground uppercase">Email</label>
                    <input
                      type="email"
                      {...register('customerDetails.email')}
                      placeholder="aryhhdluw@gmail.com"
                      className="w-full h-11 px-4 text-xs font-semibold rounded-xl bg-[#F8F8FA] border-none text-black focus:ring-2 focus:ring-black/5 transition-all"
                    />
                  </div>
                </div>
              )}
            </div>

          </form>
        </div>

        {/* Footer */}
        <div className="p-6 pt-4 mt-auto">
          <button
            form="create-payment-link-form"
            type="submit"
            disabled={isSubmitting}
            className="w-full h-14 bg-black text-white font-bold text-sm rounded-full hover:bg-black/90 active:scale-[0.98] transition-all flex items-center justify-center disabled:opacity-50"
          >
            {isSubmitting ? 'Creating...' : 'Create'}
          </button>
        </div>
      </div>
    </div>
  );
}
