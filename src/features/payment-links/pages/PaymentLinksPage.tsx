import { useState } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { Search, SlidersHorizontal, Plus, X } from 'lucide-react';
import { usePaymentLinks } from '../hooks/usePaymentLinks';
import PaymentLinksTable from '../components/PaymentLinksTable';
import PaymentLinksFilterDrawer from '../components/PaymentLinksFilterDrawer';
import CreatePaymentLinkModal from '../components/CreatePaymentLinkModal';
import SuccessModal from '../components/SuccessModal';
import Pagination from '@/components/ui/Pagination';
import type { PaymentLink } from '@/types/domain';

export default function PaymentLinksPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();

  // Modals & Drawers state
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [successLink, setSuccessLink] = useState<PaymentLink | null>(null);

  // Sync state parameters from URL search query
  const page = parseInt(searchParams.get('page') || '1', 10);
  const limit = parseInt(searchParams.get('limit') || '10', 10);
  const status = searchParams.get('status') || '';
  const searchQuery = searchParams.get('q') || '';

  // Local search input state before syncing with URL
  const [searchInput, setSearchInput] = useState(searchQuery);

  // TanStack Query list fetch
  const { data, isLoading, isError, refetch } = usePaymentLinks({
    page,
    limit,
    status: status || undefined,
    search: searchQuery || undefined,
  });

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const nextParams = new URLSearchParams(searchParams);
    if (searchInput) {
      nextParams.set('q', searchInput);
    } else {
      nextParams.delete('q');
    }
    nextParams.set('page', '1');
    setSearchParams(nextParams);
  };

  const handleClearSearch = () => {
    setSearchInput('');
    const nextParams = new URLSearchParams(searchParams);
    nextParams.delete('q');
    nextParams.set('page', '1');
    setSearchParams(nextParams);
  };

  const handleApplyFilters = (filters: { status?: string }) => {
    const nextParams = new URLSearchParams(searchParams);
    if (filters.status) nextParams.set('status', filters.status);
    else nextParams.delete('status');
    nextParams.set('page', '1');
    setSearchParams(nextParams);
  };

  const handlePageChange = (newPage: number) => {
    const nextParams = new URLSearchParams(searchParams);
    nextParams.set('page', String(newPage));
    setSearchParams(nextParams);
  };

  const handleLimitChange = (newLimit: number) => {
    const nextParams = new URLSearchParams(searchParams);
    nextParams.set('limit', String(newLimit));
    nextParams.set('page', '1');
    setSearchParams(nextParams);
  };

  const handleSelectRow = (pl: PaymentLink) => {
    navigate(`/payment-links/${pl.id}`);
  };

  const handleCreationSuccess = (link: PaymentLink) => {
    setSuccessLink(link);
    refetch(); // Ensure the table updates
  };

  const activeFiltersCount = [status].filter(Boolean).length;

  return (
    <div className="space-y-8">
      {/* Top dashboard control bar */}
      <div className="flex justify-between items-center pb-6 border-b border-black/5">
        <h2 className="text-xl font-extrabold tracking-tight text-black">Payment Link</h2>
      </div>

      {/* Main Search and Action row */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        {/* Search */}
        <form onSubmit={handleSearchSubmit} className="relative flex-1 max-w-[400px]">
          <span className="absolute inset-y-0 left-3.5 flex items-center pointer-events-none text-muted-foreground">
            <Search className="h-4 w-4" />
          </span>
          <input
            type="text"
            placeholder="Search"
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
            className="w-full bg-[#F8F8FA] border border-black/5 text-xs font-semibold pl-10 pr-8 py-3 rounded-xl focus:outline-hidden focus:border-black text-black placeholder-muted-foreground/60 transition-all"
          />
          {searchInput && (
            <button
              type="button"
              onClick={handleClearSearch}
              className="absolute inset-y-0 right-3 flex items-center text-muted-foreground hover:text-black transition-colors"
            >
              <X className="h-3.5 w-3.5" />
            </button>
          )}
        </form>

        {/* Action Buttons */}
        <div className="flex items-center gap-3">
          {/* Filters */}
          <button
            onClick={() => setIsFilterOpen(true)}
            className={`flex items-center justify-center space-x-2 px-4 py-3 border border-black/5 rounded-xl text-xs font-bold transition-all relative ${
              activeFiltersCount > 0
                ? 'bg-black text-white hover:bg-black/90'
                : 'bg-white text-black hover:bg-[#F8F8FA]'
            }`}
          >
            <SlidersHorizontal className="h-3.5 w-3.5" />
            <span>Filters</span>
            {activeFiltersCount > 0 && (
              <span className="flex items-center justify-center h-4 min-w-4 px-1 rounded-full text-[9px] font-extrabold bg-[#F2C94C] text-black">
                {activeFiltersCount}
              </span>
            )}
          </button>

          {/* Create Button */}
          <button
            onClick={() => setIsCreateModalOpen(true)}
            className="flex items-center justify-center space-x-2 px-4 py-3 bg-black text-white hover:bg-black/90 active:scale-[0.98] transition-all text-xs font-bold rounded-xl shadow-xs"
          >
            <Plus className="h-4 w-4" />
            <span>Create Payment Link</span>
          </button>
        </div>
      </div>

      {/* Table grid area */}
      {isLoading ? (
        <div className="border border-black/5 rounded-[2rem] overflow-hidden">
          <div className="bg-[#F8F8FA] h-12 w-full border-b border-black/5" />
          <div className="p-6 space-y-4 bg-white">
            {Array.from({ length: 6 }).map((_, idx) => (
              <div key={idx} className="flex justify-between items-center h-10 animate-pulse">
                <div className="h-4 bg-black/5 rounded w-1/4" />
                <div className="h-4 bg-black/5 rounded w-1/4" />
                <div className="h-4 bg-black/5 rounded w-1/4" />
              </div>
            ))}
          </div>
        </div>
      ) : isError ? (
        <div className="text-center py-16 border border-red-100 rounded-[2rem] bg-red-50/10 space-y-4">
          <p className="text-sm font-semibold text-red-500">
            Failed to load payment links feed.
          </p>
          <button
            onClick={() => refetch()}
            className="px-6 py-2.5 bg-black text-white hover:bg-black/90 transition-all text-xs font-bold rounded-xl"
          >
            Try Again
          </button>
        </div>
      ) : (
        <div className="space-y-6">
          <PaymentLinksTable
            paymentLinks={data?.paymentLinks || []}
            onSelectRow={handleSelectRow}
          />

          <Pagination
            currentPage={data?.page || 1}
            totalPages={data?.totalPages || 1}
            onPageChange={handlePageChange}
            limit={data?.limit || 10}
            onLimitChange={handleLimitChange}
          />
        </div>
      )}

      {/* Filter Drawer */}
      <PaymentLinksFilterDrawer
        isOpen={isFilterOpen}
        onClose={() => setIsFilterOpen(false)}
        activeFilters={{ status }}
        onApplyFilters={handleApplyFilters}
      />

      {/* Create Modal */}
      <CreatePaymentLinkModal
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
        onSuccess={handleCreationSuccess}
      />

      {/* Success Modal */}
      <SuccessModal
        isOpen={!!successLink}
        onClose={() => setSuccessLink(null)}
        paymentLink={successLink}
      />
    </div>
  );
}
