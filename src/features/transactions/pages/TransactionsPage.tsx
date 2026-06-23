import { useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Search, SlidersHorizontal, Download, RefreshCw, X } from 'lucide-react';
import { useTransactions } from '../hooks/useTransactions';
import TransactionsTable from '../components/TransactionsTable';
import FilterDrawer from '../components/FilterDrawer';
import TransactionDetailDrawer from '../components/TransactionDetailDrawer';
import Pagination from '@/components/ui/Pagination';

export default function TransactionsPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [selectedTxId, setSelectedTxId] = useState<string | null>(null);
  const [exportMessage, setExportMessage] = useState<string | null>(null);

  // Sync state parameters from URL search query
  const page = parseInt(searchParams.get('page') || '1', 10);
  const limit = parseInt(searchParams.get('limit') || '10', 10);
  const status = searchParams.get('status') || '';
  const network = searchParams.get('network') || '';
  const token = searchParams.get('token') || '';
  const startDate = searchParams.get('startDate') || '';
  const endDate = searchParams.get('endDate') || '';
  const searchQuery = searchParams.get('q') || '';

  // Local search input state before syncing with URL
  const [searchInput, setSearchInput] = useState(searchQuery);

  // TanStack Query list fetch
  const {
    data,
    isLoading,
    isError,
    refetch,
    isRefetching,
  } = useTransactions({
    page,
    limit,
    status: status || undefined,
    network: network || undefined,
    token: token || undefined,
    startDate: startDate || undefined,
    endDate: endDate || undefined,
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
    nextParams.set('page', '1'); // reset page back to 1 on search change
    setSearchParams(nextParams);
  };

  const handleClearSearch = () => {
    setSearchInput('');
    const nextParams = new URLSearchParams(searchParams);
    nextParams.delete('q');
    nextParams.set('page', '1');
    setSearchParams(nextParams);
  };

  const handleApplyFilters = (filters: {
    status?: string;
    network?: string;
    token?: string;
    startDate?: string;
    endDate?: string;
  }) => {
    const nextParams = new URLSearchParams(searchParams);
    
    // Status
    if (filters.status) nextParams.set('status', filters.status);
    else nextParams.delete('status');

    // Network
    if (filters.network) nextParams.set('network', filters.network);
    else nextParams.delete('network');

    // Currency/Token
    if (filters.token) nextParams.set('token', filters.token);
    else nextParams.delete('token');

    // Date Range
    if (filters.startDate) nextParams.set('startDate', filters.startDate);
    else nextParams.delete('startDate');

    if (filters.endDate) nextParams.set('endDate', filters.endDate);
    else nextParams.delete('endDate');

    // Reset pagination to first page
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
    nextParams.set('page', '1'); // Reset to first page
    setSearchParams(nextParams);
  };

  const handleExport = () => {
    setExportMessage('Preparing transaction export...');
    setTimeout(() => {
      // Simulate file download trigger
      const dummyData = JSON.stringify(data?.transactions || [], null, 2);
      const blob = new Blob([dummyData], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `bepay-transactions-${new Date().toISOString().split('T')[0]}.json`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);

      setExportMessage('Transactions successfully exported!');
      setTimeout(() => setExportMessage(null), 3000);
    }, 1000);
  };

  const activeFiltersCount = [
    status,
    network,
    token,
    startDate,
    endDate,
  ].filter(Boolean).length;

  return (
    <div className="space-y-8">
      {/* Top dashboard control bar */}
      <div className="flex justify-between items-center pb-6 border-b border-black/5">
        <div>
          <h2 className="text-xl font-extrabold tracking-tight text-black">Payment History</h2>
          <p className="text-xs text-muted-foreground font-semibold mt-1">
            Audit and filter all merchant settlements
          </p>
        </div>
        <button
          onClick={() => refetch()}
          disabled={isLoading || isRefetching}
          className="flex items-center space-x-2 px-5 py-2.5 bg-black text-white hover:bg-black/90 active:scale-[0.98] disabled:opacity-50 transition-all text-xs font-bold rounded-full shadow-sm"
        >
          <RefreshCw className={`h-3.5 w-3.5 ${isRefetching ? 'animate-spin' : ''}`} />
          <span>Refresh Feed</span>
        </button>
      </div>

      {/* Main Search and Action row */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        {/* Title */}
        <h3 className="text-lg font-extrabold text-black tracking-tight">Payments</h3>

        {/* Filters and export button pack */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
          {/* Search bar form */}
          <form onSubmit={handleSearchSubmit} className="relative flex-1 sm:w-64">
            <span className="absolute inset-y-0 left-3.5 flex items-center pointer-events-none text-muted-foreground">
              <Search className="h-4 w-4" />
            </span>
            <input
              type="text"
              placeholder="Search ID, description..."
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

          {/* Filters toggle */}
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

          {/* Export action */}
          <button
            onClick={handleExport}
            className="flex items-center justify-center space-x-2 px-4 py-3 bg-white border border-black/5 text-black hover:bg-[#F8F8FA] active:scale-[0.98] transition-all text-xs font-bold rounded-xl shadow-xs"
          >
            <Download className="h-3.5 w-3.5" />
            <span>Export</span>
          </button>
        </div>
      </div>

      {/* Export status notifier toast */}
      {exportMessage && (
        <div className="bg-emerald-500 text-white px-4 py-3 rounded-xl text-xs font-bold flex items-center justify-between shadow-md transition-all duration-300">
          <span>{exportMessage}</span>
          <button onClick={() => setExportMessage(null)}>
            <X className="h-4 w-4" />
          </button>
        </div>
      )}

      {/* Table grid area */}
      {isLoading ? (
        <div className="border border-black/5 rounded-[2rem] overflow-hidden">
          <div className="bg-[#F8F8FA] h-12 w-full border-b border-black/5" />
          <div className="p-6 space-y-4 bg-white">
            {Array.from({ length: 6 }).map((_, idx) => (
              <div key={idx} className="flex justify-between items-center h-10 animate-pulse">
                <div className="h-4 bg-black/5 rounded w-1/4" />
                <div className="h-4 bg-black/5 rounded w-12" />
                <div className="h-4 bg-black/5 rounded w-20" />
                <div className="h-4 bg-black/5 rounded w-16" />
                <div className="h-4 bg-black/5 rounded w-24" />
              </div>
            ))}
          </div>
        </div>
      ) : isError ? (
        <div className="text-center py-16 border border-red-100 rounded-[2rem] bg-red-50/10 space-y-4">
          <p className="text-sm font-semibold text-red-500">
            Failed to load payment history feed.
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
          <TransactionsTable
            transactions={data?.transactions || []}
            onSelectRow={(tx) => setSelectedTxId(tx.id)}
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

      {/* Slide-out drawer interfaces */}
      <FilterDrawer
        isOpen={isFilterOpen}
        onClose={() => setIsFilterOpen(false)}
        activeFilters={{ status, network, token, startDate, endDate }}
        onApplyFilters={handleApplyFilters}
      />

      <TransactionDetailDrawer
        transactionId={selectedTxId}
        onClose={() => setSelectedTxId(null)}
      />
    </div>
  );
}
