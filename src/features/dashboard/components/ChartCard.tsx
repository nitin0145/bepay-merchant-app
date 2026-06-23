import { useState } from 'react';

interface ChartCardProps {
  title: string;
  value: string;
  trend: string;
  loading?: boolean;
}

export default function ChartCard({
  title,
  value,
  trend,
  loading = false,
}: ChartCardProps) {
  const [activeTab, setActiveTab] = useState<'week' | 'month' | 'year' | 'custom'>('month');

  const chartData = [
    { label: 'Jan', value: 45, displayVal: '$389.20' },
    { label: 'Feb', value: 85, displayVal: '$740.10' },
    { label: 'Mar', value: 35, displayVal: '$305.50' },
    { label: 'Apr', value: 60, displayVal: '$520.40' },
    { label: 'May', value: 75, displayVal: '$653.09', active: true },
    { label: 'Jun', value: 25, displayVal: '$215.30' },
    { label: 'Jul', value: 40, displayVal: '$350.00' },
  ];

  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);

  if (loading) {
    return (
      <div className="bg-[#F8F8FA] border border-black/5 rounded-3xl p-6 flex flex-col justify-between h-[340px] animate-pulse">
        <div className="flex justify-between items-start">
          <div className="space-y-2">
            <div className="h-3 w-32 bg-black/5 rounded" />
            <div className="h-6 w-40 bg-black/5 rounded" />
          </div>
          <div className="h-8 w-44 bg-black/5 rounded-full" />
        </div>
        <div className="flex items-end justify-between h-48 px-4 mt-6">
          {Array.from({ length: 7 }).map((_, idx) => (
            <div key={idx} className="flex flex-col items-center space-y-2 w-full">
              <div className="w-8 bg-black/5 rounded-full" style={{ height: `${(idx + 2) * 20}px` }} />
              <div className="h-3 w-8 bg-black/5 rounded" />
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="bg-[#F8F8FA] border border-black/5 rounded-3xl p-6 flex flex-col justify-between h-[340px] hover:shadow-md transition-all duration-300 hover:-translate-y-1 hover:border-black/10">
      {/* Header and filters */}
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start space-y-4 sm:space-y-0">
        <div className="flex flex-col">
          <span className="text-xs text-muted-foreground font-semibold uppercase tracking-wider">{title}</span>
          <div className="flex items-baseline space-x-3 mt-1">
            <span className="text-2xl font-bold tracking-tight text-black font-numeric">{value}</span>
            <span className="text-xs font-bold text-emerald-600 bg-emerald-500/10 px-2.5 py-0.5 rounded-full">
              {trend}
            </span>
          </div>
        </div>

        {/* Tab Filters */}
        <div className="bg-black/5 p-0.5 rounded-full flex items-center self-start text-xs font-semibold">
          {(['week', 'month', 'year', 'custom'] as const).map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-3 py-1.5 rounded-full capitalize transition-all ${
                activeTab === tab
                  ? 'bg-white text-black shadow-sm'
                  : 'text-muted-foreground hover:text-black'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>

      {/* Grid Bar Visualizer */}
      <div className="relative flex-1 flex items-end justify-between px-2 sm:px-4 mt-8 h-44">
        {/* Horizontal gridlines */}
        <div className="absolute inset-y-0 left-0 right-0 flex flex-col justify-between pointer-events-none opacity-40">
          <div className="border-b border-black/5 w-full h-0" />
          <div className="border-b border-black/5 w-full h-0" />
          <div className="border-b border-black/5 w-full h-0" />
          <div className="border-b border-black/5 w-full h-0" />
        </div>

        {chartData.map((bar, idx) => {
          const isCurrentlyActive = (hoveredIdx === null && bar.active) || (hoveredIdx === idx);

          return (
            <div
              key={bar.label}
              className="relative flex flex-col items-center group w-full cursor-pointer"
              onMouseEnter={() => setHoveredIdx(idx)}
              onMouseLeave={() => setHoveredIdx(null)}
            >
              {/* Tooltip on active or hover */}
              <div
                className={`absolute -top-10 z-10 bg-black text-white text-[10px] font-bold px-2 py-1 rounded-lg shadow-md transition-all duration-200 pointer-events-none whitespace-nowrap ${
                  isCurrentlyActive
                    ? 'opacity-100 transform translate-y-0 scale-100'
                    : 'opacity-0 transform translate-y-2 scale-95'
                }`}
              >
                {bar.displayVal}
                <div className="absolute left-1/2 bottom-[-4px] transform -translate-x-1/2 w-2 h-2 bg-black rotate-45" />
              </div>

              {/* Vertical Rounded Gradient Bar */}
              <div className="w-6 sm:w-8 bg-black/5 rounded-full h-32 flex items-end relative overflow-hidden">
                <div
                  className={`w-full rounded-full transition-all duration-500 ease-out ${
                    isCurrentlyActive
                      ? 'bg-gradient-to-t from-black via-black/80 to-black/60 shadow-[0_0_12px_rgba(0,0,0,0.15)]'
                      : 'bg-gradient-to-t from-black/40 to-black/20 group-hover:from-black/60 group-hover:to-black/40'
                  }`}
                  style={{ height: `${bar.value}%` }}
                />
              </div>

              {/* Bar Label */}
              <span
                className={`text-[10px] font-bold mt-2.5 transition-all duration-200 ${
                  isCurrentlyActive ? 'text-white bg-black px-2 py-0.5 rounded-full' : 'text-muted-foreground'
                }`}
              >
                {bar.label}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
