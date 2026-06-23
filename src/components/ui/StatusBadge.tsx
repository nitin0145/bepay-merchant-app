import type { TransactionStatus, PaymentLinkStatus } from '@/types/domain';

interface StatusBadgeProps {
  status: TransactionStatus | PaymentLinkStatus;
}

export default function StatusBadge({ status }: StatusBadgeProps) {
  const configs: Record<string, { label: string; classes: string }> = {
    COMPLETED: {
      label: 'Completed',
      classes: 'bg-emerald-500/10 text-emerald-600 border border-emerald-500/20',
    },
    PENDING: {
      label: 'Pending',
      classes: 'bg-[#F2C94C]/10 text-[#C48E00] border border-[#F2C94C]/20',
    },
    FAILED: {
      label: 'Failed',
      classes: 'bg-rose-500/10 text-rose-600 border border-rose-500/20',
    },
    EXPIRED: {
      label: 'Expired',
      classes: 'bg-neutral-500/10 text-neutral-500 border border-neutral-500/20',
    },
    ACTIVE: {
      label: 'Active',
      classes: 'bg-emerald-500/10 text-emerald-600 border border-emerald-500/20',
    },
    INACTIVE: {
      label: 'Inactive',
      classes: 'bg-neutral-500/10 text-neutral-500 border border-neutral-500/20',
    },
    PAID: {
      label: 'Paid',
      classes: 'bg-blue-500/10 text-blue-600 border border-blue-500/20',
    },
  };

  const config = configs[status] || { label: status, classes: 'bg-neutral-500/10 text-neutral-500' };

  return (
    <span className={`inline-flex items-center justify-center px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${config.classes}`}>
      {config.label}
    </span>
  );
}
