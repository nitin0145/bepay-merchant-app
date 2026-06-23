interface ProgressCardProps {
  title: string;
  subtitle: string;
  percentage: number;
  loading?: boolean;
}

export default function ProgressCard({
  title,
  subtitle,
  percentage,
  loading = false,
}: ProgressCardProps) {
  const radius = 32;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (percentage / 100) * circumference;

  if (loading) {
    return (
      <div className="bg-[#141416] text-white border border-white/5 rounded-3xl p-6 h-[120px] flex items-center justify-between animate-pulse">
        <div className="space-y-2">
          <div className="h-3.5 w-24 bg-white/5 rounded" />
          <div className="h-5 w-16 bg-white/5 rounded" />
        </div>
        <div className="h-16 w-16 bg-white/5 rounded-full" />
      </div>
    );
  }

  return (
    <div className="bg-[#141416] text-white border border-white/5 rounded-3xl p-6 h-[120px] flex items-center justify-between transition-all duration-300 hover:-translate-y-1 hover:border-white/20 hover:shadow-[0_0_20px_rgba(255,255,255,0.05)] group">
      <div className="flex flex-col">
        <span className="text-xs text-muted-foreground font-medium">{title}</span>
        <span className="text-lg font-bold mt-1 text-white tracking-tight">{subtitle}</span>
      </div>

      {/* Circle progress indicator */}
      <div className="relative flex items-center justify-center h-18 w-18">
        <svg className="transform -rotate-90 w-16 h-16">
          {/* Background track circle */}
          <circle
            cx="32"
            cy="32"
            r={radius}
            className="text-white/10"
            strokeWidth="5"
            stroke="currentColor"
            fill="transparent"
          />
          {/* Foreground progress circle */}
          <circle
            cx="32"
            cy="32"
            r={radius}
            className="text-white transition-all duration-500 ease-out"
            strokeWidth="5"
            strokeDasharray={circumference}
            strokeDashoffset={strokeDashoffset}
            strokeLinecap="round"
            stroke="currentColor"
            fill="transparent"
          />
        </svg>
        <span className="absolute text-xs font-bold text-white">{percentage}%</span>
      </div>
    </div>
  );
}
