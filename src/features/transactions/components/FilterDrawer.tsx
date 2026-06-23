import { X, Calendar } from 'lucide-react';
import { useState, useEffect } from 'react';

interface FilterDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  activeFilters: {
    status?: string;
    network?: string;
    token?: string;
    startDate?: string;
    endDate?: string;
  };
  onApplyFilters: (filters: {
    status?: string;
    network?: string;
    token?: string;
    startDate?: string;
    endDate?: string;
  }) => void;
}

export default function FilterDrawer({
  isOpen,
  onClose,
  activeFilters,
  onApplyFilters,
}: FilterDrawerProps) {
  const [status, setStatus] = useState(activeFilters.status || '');
  const [network, setNetwork] = useState(activeFilters.network || '');
  const [token, setToken] = useState(activeFilters.token || '');
  const [startDate, setStartDate] = useState(activeFilters.startDate || '');
  const [endDate, setEndDate] = useState(activeFilters.endDate || '');

  // Sync state when drawer opens or active filters change
  useEffect(() => {
    if (isOpen) {
      setStatus(activeFilters.status || '');
      setNetwork(activeFilters.network || '');
      setToken(activeFilters.token || '');
      setStartDate(activeFilters.startDate || '');
      setEndDate(activeFilters.endDate || '');
    }
  }, [isOpen, activeFilters]);

  const handleApply = () => {
    onApplyFilters({
      status: status || undefined,
      network: network || undefined,
      token: token || undefined,
      startDate: startDate || undefined,
      endDate: endDate || undefined,
    });
    onClose();
  };

  const handleClearAll = () => {
    setStatus('');
    setNetwork('');
    setToken('');
    setStartDate('');
    setEndDate('');
    onApplyFilters({});
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/30 backdrop-blur-xs transition-opacity duration-300"
        onClick={onClose}
      />

      {/* Drawer Container */}
      <div 
        role="dialog"
        aria-modal="true"
        aria-labelledby="filter-title"
        className="absolute inset-y-0 right-0 pl-10 max-w-full flex"
      >
        <div className="w-screen max-w-md bg-white shadow-2xl flex flex-col justify-between border-l border-black/5 animate-slide-in">
          {/* Header */}
          <div className="p-6 border-b border-black/5 flex justify-between items-center bg-[#F8F8FA]">
            <div>
              <h2 id="filter-title" className="text-base font-extrabold text-black tracking-tight">Filters</h2>
              <p className="text-[10px] text-muted-foreground font-semibold mt-0.5">
                Refine transaction history
              </p>
            </div>
            <button
              onClick={onClose}
              className="h-8 w-8 rounded-full border border-black/5 flex items-center justify-center text-muted-foreground hover:text-black hover:bg-black/5 transition-all"
            >
              <X className="h-4 w-4" />
            </button>
          </div>

          {/* Body */}
          <div className="flex-1 overflow-y-auto p-6 space-y-6">
            {/* Status */}
            <div className="space-y-2">
              <label className="text-[10px] font-extrabold uppercase tracking-wider text-muted-foreground">
                Payment Status
              </label>
              <select
                value={status}
                onChange={(e) => setStatus(e.target.value)}
                className="w-full h-11 px-4 text-xs font-semibold rounded-xl border border-black/5 bg-white text-black focus:outline-hidden focus:border-black transition-all appearance-none cursor-pointer"
                style={{
                  backgroundImage: `url("data:image/svg+xml;charset=UTF-8,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='currentColor' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3e%3cpolyline points='6 9 12 15 18 9'%3e%3c/polyline%3e%3c/svg%3e")`,
                  backgroundRepeat: 'no-repeat',
                  backgroundPosition: 'right 16px center',
                  backgroundSize: '12px',
                }}
              >
                <option value="">All Statuses</option>
                <option value="PENDING">Pending</option>
                <option value="COMPLETED">Confirmed</option>
                <option value="FAILED">Failed</option>
                <option value="EXPIRED">Expired</option>
              </select>
            </div>

            {/* Network */}
            <div className="space-y-2">
              <label className="text-[10px] font-extrabold uppercase tracking-wider text-muted-foreground">
                Network
              </label>
              <select
                value={network}
                onChange={(e) => setNetwork(e.target.value)}
                className="w-full h-11 px-4 text-xs font-semibold rounded-xl border border-black/5 bg-white text-black focus:outline-hidden focus:border-black transition-all appearance-none cursor-pointer"
                style={{
                  backgroundImage: `url("data:image/svg+xml;charset=UTF-8,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='currentColor' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3e%3cpolyline points='6 9 12 15 18 9'%3e%3c/polyline%3e%3c/svg%3e")`,
                  backgroundRepeat: 'no-repeat',
                  backgroundPosition: 'right 16px center',
                  backgroundSize: '12px',
                }}
              >
                <option value="">All Networks</option>
                <option value="ETHEREUM">Ethereum</option>
                <option value="POLYGON">Polygon</option>
                <option value="SOLANA">Solana</option>
                <option value="BITCOIN">Bitcoin</option>
                <option value="TRON">Tron</option>
              </select>
            </div>

            {/* Currency/Token */}
            <div className="space-y-2">
              <label className="text-[10px] font-extrabold uppercase tracking-wider text-muted-foreground">
                Currency
              </label>
              <select
                value={token}
                onChange={(e) => setToken(e.target.value)}
                className="w-full h-11 px-4 text-xs font-semibold rounded-xl border border-black/5 bg-white text-black focus:outline-hidden focus:border-black transition-all appearance-none cursor-pointer"
                style={{
                  backgroundImage: `url("data:image/svg+xml;charset=UTF-8,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='currentColor' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3e%3cpolyline points='6 9 12 15 18 9'%3e%3c/polyline%3e%3c/svg%3e")`,
                  backgroundRepeat: 'no-repeat',
                  backgroundPosition: 'right 16px center',
                  backgroundSize: '12px',
                }}
              >
                <option value="">All Currencies</option>
                <option value="USDC">USDC</option>
                <option value="USDT">USDT</option>
                <option value="ETH">ETH</option>
                <option value="SOL">SOL</option>
                <option value="BTC">BTC</option>
              </select>
            </div>

            {/* Date Range */}
            <div className="space-y-3">
              <label className="text-[10px] font-extrabold uppercase tracking-wider text-muted-foreground">
                Date Range
              </label>
              <div className="grid grid-cols-2 gap-4">
                <div className="relative">
                  <span className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-muted-foreground">
                    <Calendar className="h-3.5 w-3.5" />
                  </span>
                  <input
                    type="date"
                    value={startDate}
                    onChange={(e) => setStartDate(e.target.value)}
                    className="w-full h-11 pl-9 pr-3 text-xs font-semibold rounded-xl border border-black/5 bg-white text-black focus:outline-hidden focus:border-black transition-all cursor-pointer"
                  />
                </div>
                <div className="relative">
                  <span className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-muted-foreground">
                    <Calendar className="h-3.5 w-3.5" />
                  </span>
                  <input
                    type="date"
                    value={endDate}
                    onChange={(e) => setEndDate(e.target.value)}
                    className="w-full h-11 pl-9 pr-3 text-xs font-semibold rounded-xl border border-black/5 bg-white text-black focus:outline-hidden focus:border-black transition-all cursor-pointer"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Footer Actions */}
          <div className="p-6 border-t border-black/5 bg-[#F8F8FA] grid grid-cols-2 gap-4">
            <button
              onClick={handleClearAll}
              className="h-11 border border-black/5 bg-white text-black hover:bg-black/5 active:scale-[0.98] transition-all text-xs font-bold rounded-xl flex items-center justify-center shadow-xs"
            >
              Clear All
            </button>
            <button
              onClick={handleApply}
              className="h-11 bg-black text-white hover:bg-black/90 active:scale-[0.98] transition-all text-xs font-bold rounded-xl flex items-center justify-center shadow-xs"
            >
              Apply Filter
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
