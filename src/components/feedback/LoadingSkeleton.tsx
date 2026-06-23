export function MetricSkeleton() {
  return (
    <div className="bg-[#F8F8FA] border border-black/5 rounded-3xl p-6 flex flex-col justify-between h-[156px] animate-pulse">
      <div className="h-10 w-10 bg-black/5 rounded-2xl" />
      <div className="space-y-2 mt-4">
        <div className="h-3 w-16 bg-black/5 rounded" />
        <div className="h-6 w-24 bg-black/5 rounded" />
      </div>
    </div>
  );
}

export function ChartSkeleton() {
  return (
    <div className="bg-[#F8F8FA] border border-black/5 rounded-3xl p-6 h-[340px] flex flex-col justify-between animate-pulse">
      <div className="flex justify-between items-start">
        <div className="space-y-2">
          <div className="h-3 w-32 bg-black/5 rounded" />
          <div className="h-6 w-40 bg-black/5 rounded" />
        </div>
        <div className="h-8 w-40 bg-black/5 rounded-full" />
      </div>
      <div className="flex items-end justify-between h-40 mt-6 px-4">
        {Array.from({ length: 7 }).map((_, idx) => (
          <div key={idx} className="flex flex-col items-center space-y-2 w-full">
            <div className="w-8 bg-black/5 rounded-t-lg" style={{ height: `${(idx + 1) * 24}px` }} />
            <div className="h-3 w-8 bg-black/5 rounded" />
          </div>
        ))}
      </div>
    </div>
  );
}

export function TableSkeleton() {
  return (
    <div className="bg-white border border-black/5 rounded-[2rem] overflow-hidden animate-pulse">
      <div className="bg-[#F8F8FA] h-12 w-full border-b border-black/5" />
      <div className="p-6 space-y-4">
        {Array.from({ length: 4 }).map((_, idx) => (
          <div key={idx} className="flex justify-between items-center h-10 border-b border-black/5 pb-4 last:border-b-0">
            <div className="h-6 bg-black/5 rounded w-1/3" />
            <div className="h-6 bg-black/5 rounded w-12" />
            <div className="h-6 bg-black/5 rounded w-20" />
            <div className="h-6 bg-black/5 rounded w-24" />
            <div className="h-6 bg-black/5 rounded w-16" />
          </div>
        ))}
      </div>
    </div>
  );
}

export default function LoadingSkeleton() {
  return (
    <div className="space-y-8">
      {/* Metric Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <MetricSkeleton />
        <MetricSkeleton />
        <MetricSkeleton />
        <MetricSkeleton />
      </div>
      {/* Analytics row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <ChartSkeleton />
        </div>
        <div>
          <MetricSkeleton />
        </div>
      </div>
      {/* Table Skeleton */}
      <TableSkeleton />
    </div>
  );
}
