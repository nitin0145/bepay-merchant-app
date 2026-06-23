import { ChevronLeft, ChevronRight } from 'lucide-react';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  limit: number;
  onLimitChange: (limit: number) => void;
}

export default function Pagination({
  currentPage,
  totalPages,
  onPageChange,
  limit,
  onLimitChange,
}: PaginationProps) {
  if (totalPages <= 1 && limit === 10) {
    // If there's only 1 page and default limit, we can still show the limit selector or just hide numerical indicators.
    // Let's still show the layout so the user has the size selector control.
  }

  const pages = Array.from({ length: totalPages }, (_, idx) => idx + 1);

  return (
    <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-4 border-t border-black/5 text-xs text-muted-foreground font-semibold">
      {/* Page Size Selector */}
      <div className="flex items-center space-x-2">
        <span>Show</span>
        <select
          value={limit}
          onChange={(e) => onLimitChange(Number(e.target.value))}
          className="h-8 px-3 rounded-lg border border-black/5 bg-white text-black text-xs font-bold focus:outline-hidden cursor-pointer"
        >
          <option value={5}>5 per page</option>
          <option value={10}>10 per page</option>
          <option value={20}>20 per page</option>
          <option value={50}>50 per page</option>
        </select>
        <span>records</span>
      </div>

      {/* Numerical buttons and indicators */}
      <div className="flex items-center space-x-2">
        <button
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className="h-8 w-8 rounded-lg border border-black/5 flex items-center justify-center bg-white text-black hover:bg-[#F8F8FA] active:scale-95 disabled:opacity-50 disabled:pointer-events-none transition-all shadow-xs"
          aria-label="Previous page"
        >
          <ChevronLeft className="h-4 w-4" />
        </button>

        <div className="flex items-center space-x-1.5">
          {pages.map((p) => {
            const isSelected = p === currentPage;
            return (
              <button
                key={p}
                onClick={() => onPageChange(p)}
                className={`h-8 min-w-8 px-2 rounded-lg text-xs font-bold transition-all ${
                  isSelected
                    ? 'bg-black text-white'
                    : 'bg-white text-black border border-black/5 hover:bg-[#F8F8FA] active:scale-95'
                }`}
              >
                {p}
              </button>
            );
          })}
        </div>

        <button
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage === totalPages || totalPages === 0}
          className="h-8 w-8 rounded-lg border border-black/5 flex items-center justify-center bg-white text-black hover:bg-[#F8F8FA] active:scale-95 disabled:opacity-50 disabled:pointer-events-none transition-all shadow-xs"
          aria-label="Next page"
        >
          <ChevronRight className="h-4 w-4" />
        </button>
      </div>

      {/* Showing indicator */}
      <div>
        <span>
          Page {currentPage} of {totalPages || 1}
        </span>
      </div>
    </div>
  );
}
