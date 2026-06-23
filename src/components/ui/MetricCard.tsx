import type { ReactNode } from 'react';

interface MetricCardProps {
  title: string;
  subtitle?: string;
  value: string | number;
  icon: ReactNode;
  trend?: {
    value: string | number;
    isPositive: boolean;
  };
  className?: string;
  loading?: boolean;
}

export default function MetricCard({
  title,
  subtitle,
  value,
  icon,
  trend,
  className = '',
  loading = false,
}: MetricCardProps) {
  if (loading) {
    return (
      <div className={`bg-[#F8F8FA] border border-black/5 rounded-3xl p-6 flex flex-col justify-between h-[156px] animate-pulse ${className}`}>
        <div className="flex items-start justify-between">
          <div className="h-10 w-10 bg-black/5 rounded-2xl" />
        </div>
        <div className="space-y-2">
          <div className="h-3 w-16 bg-black/5 rounded" />
          <div className="h-6 w-28 bg-black/5 rounded" />
        </div>
      </div>
    );
  }

  return (
    <div className={`bg-[#F8F8FA] border border-black/5 rounded-3xl p-6 flex flex-col justify-between h-[156px] transition-all duration-300 hover:-translate-y-1.5 hover:shadow-lg hover:border-black/10 group ${className}`}>
      {/* Icon header */}
      <div className="flex items-start justify-between">
        <div className="h-10 w-10 bg-black rounded-2xl flex items-center justify-center text-white shadow-sm transition-all duration-300 group-hover:scale-110 group-hover:bg-primary group-hover:rotate-6">
          {icon}
        </div>
        {trend && (
          <span
            className={`text-xs font-semibold px-2.5 py-1 rounded-full transition-transform duration-300 group-hover:scale-105 ${
              trend.isPositive
                ? 'bg-emerald-500/10 text-emerald-600'
                : 'bg-rose-500/10 text-rose-600'
            }`}
          >
            {trend.value}
          </span>
        )}
      </div>

      {/* Label and Value */}
      <div className="mt-4">
        <div className="flex flex-col">
          <span className="text-xs font-semibold text-black leading-tight group-hover:text-primary transition-colors duration-200">{title}</span>
          {subtitle && (
            <span className="text-[10px] text-muted-foreground font-medium leading-none mt-0.5">
              {subtitle}
            </span>
          )}
        </div>
        <div className="text-xl font-bold tracking-tight text-black mt-2 font-numeric">
          {value}
        </div>
      </div>
    </div>
  );
}
