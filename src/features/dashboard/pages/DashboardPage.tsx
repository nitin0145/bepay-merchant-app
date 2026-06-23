import { useState } from 'react';
import { useDashboardSummary } from '../hooks/useDashboardSummary';
import { useTransactions } from '@/features/transactions/hooks/useTransactions';
import MetricCard from '@/components/ui/MetricCard';
import ChartCard from '../components/ChartCard';
import ProgressCard from '../components/ProgressCard';
import QuickActionCard from '../components/QuickActionCard';
import RecentTransactionsTable from '../components/RecentTransactionsTable';
import PaymentDistributionCard from '../components/PaymentDistributionCard';
import LoadingSkeleton from '@/components/feedback/LoadingSkeleton';
import ErrorState from '@/components/feedback/ErrorState';
import EmptyState from '@/components/feedback/EmptyState';
import { CheckCircle, Clock, XCircle, RefreshCw, Copy, Eye, Upload } from 'lucide-react';
import { formatFiatAmount } from '@/utils/format';

export default function DashboardPage() {
  const [statusFilter, setStatusFilter] = useState<'ALL' | 'PENDING' | 'COMPLETED' | 'FAILED' | 'EXPIRED'>('ALL');

  const {
    data: summary,
    isLoading: isSummaryLoading,
    isError: isSummaryError,
    refetch: refetchSummary,
  } = useDashboardSummary();

  const {
    data: transactions,
    isLoading: isTxLoading,
    isError: isTxError,
    refetch: refetchTx,
  } = useTransactions({
    status: statusFilter === 'ALL' ? undefined : statusFilter,
    limit: 7,
  });

  const handleRetry = () => {
    refetchSummary();
    refetchTx();
  };

  if (isSummaryLoading || isTxLoading) {
    return <LoadingSkeleton />;
  }

  if (isSummaryError || isTxError) {
    return <ErrorState onRetry={handleRetry} />;
  }

  if (!summary) {
    return <EmptyState />;
  }

  return (
    <div className="space-y-8">
      {/* Top dashboard control bar */}
      <div className="flex justify-between items-center pb-6 border-b border-black/5">
        <h2 className="text-xl font-extrabold tracking-tight text-black">Merchant Payments</h2>
        <button
          onClick={handleRetry}
          className="flex items-center space-x-2 px-5 py-2.5 bg-black text-white hover:bg-black/90 active:scale-[0.98] transition-all text-xs font-bold rounded-full shadow-sm"
        >
          <RefreshCw className="h-3.5 w-3.5" />
          <span>Refresh Dashboard</span>
        </button>
      </div>

      {/* Main Grid Layout: Left Column (2/3) and Right Column (1/3) */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        
        {/* LEFT COLUMN: Premium Card, Metrics, Account Info, Loyalty Banners, Transactions */}
        <div className="md:col-span-1 lg:col-span-2 space-y-10">
          
          {/* Card & Metrics Header Row */}
          <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
            {/* Bepay Premium Card */}
            <div className="relative bg-gradient-to-br from-[#1E1E22] to-[#0A0A0C] text-white rounded-3xl p-6 h-[156px] flex flex-col justify-between overflow-hidden shadow-lg border border-white/5">
              {/* Subtle world map SVG overlay */}
              <div className="absolute inset-0 opacity-10 pointer-events-none">
                <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 450">
                  <path fill="currentColor" d="M150,220 C180,180 220,180 250,220 S320,260 350,220 S450,180 500,220 S600,260 650,220" stroke="currentColor" strokeWidth="1" fill-opacity="0" />
                  <circle cx="200" cy="150" r="2" fill="currentColor" />
                  <circle cx="450" cy="250" r="3" fill="currentColor" />
                  <circle cx="600" cy="180" r="1.5" fill="currentColor" />
                </svg>
              </div>

              {/* Card microchip */}
              <div className="flex justify-between items-start">
                <div className="h-8 w-11 bg-gradient-to-br from-amber-200 to-amber-400/60 rounded-md border border-amber-300/40 relative">
                  <div className="absolute inset-1 border border-amber-200/20 rounded-sm grid grid-cols-3 gap-0.5 opacity-40">
                    {Array.from({ length: 9 }).map((_, i) => (
                      <div key={i} className="bg-black/20" />
                    ))}
                  </div>
                </div>
                <span className="text-[10px] uppercase font-bold tracking-widest opacity-40">debit</span>
              </div>

              {/* bepay Logo */}
              <div className="flex items-center space-x-2">
                <div className="h-7 w-7 rounded bg-white/10 flex items-center justify-center border border-white/20">
                  <span className="font-extrabold text-primary text-sm">b</span>
                </div>
                <span className="font-bold tracking-tight text-base">bepay</span>
              </div>

              <div className="flex justify-between items-end">
                <span className="text-[10px] font-semibold tracking-wider text-muted-foreground">**** 8824</span>
                <span className="text-[9px] uppercase font-bold tracking-wider text-muted-foreground/80">Premium Card</span>
              </div>
            </div>

            {/* Metrics cards grid (spans 2 columns) */}
            <div className="xl:col-span-2 grid grid-cols-2 gap-4">
              <MetricCard
                title="Total Received"
                subtitle="All time volume"
                value={formatFiatAmount(summary.totalReceived.value, 'USD')}
                icon={<Upload className="h-5 w-5" />}
                trend={{ value: `+${summary.totalReceived.changePercentage}%`, isPositive: true }}
              />
              <MetricCard
                title="Successful Payments"
                subtitle="Confirmed counts"
                value={summary.successfulPayments.value}
                icon={<CheckCircle className="h-5 w-5" />}
                trend={{ value: `+${summary.successfulPayments.changePercentage}%`, isPositive: true }}
              />
              <MetricCard
                title="Pending Payments"
                subtitle="Awaiting settlement"
                value={summary.pendingPayments.value}
                icon={<Clock className="h-5 w-5" />}
                trend={{ value: `+${summary.pendingPayments.changePercentage}%`, isPositive: true }}
              />
              <MetricCard
                title="Failed Payments"
                subtitle="Declined & expired"
                value={summary.failedPayments.value}
                icon={<XCircle className="h-5 w-5" />}
                trend={{ value: `${summary.failedPayments.changePercentage}%`, isPositive: summary.failedPayments.changePercentage >= 0 }}
              />
            </div>
          </div>

          {/* Account Balance and Quick Actions */}
          <div className="border border-black/5 bg-[#F8F8FA] rounded-[2.5rem] p-8">
            <span className="text-xs font-bold text-muted-foreground uppercase tracking-wider">
              My Account Info
            </span>
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mt-2 gap-4">
              <div className="flex flex-col">
                <span className="text-xs font-bold text-muted-foreground flex items-center space-x-2">
                  <span>Arshi's Wallets balance</span>
                  <button className="text-muted-foreground/60 hover:text-black transition-colors" aria-label="Copy address">
                    <Copy className="h-3.5 w-3.5" />
                  </button>
                  <button className="text-muted-foreground/60 hover:text-black transition-colors" aria-label="Toggle visibility">
                    <Eye className="h-3.5 w-3.5" />
                  </button>
                </span>
                <div className="flex items-baseline space-x-3 mt-1">
                  <h2 className="text-3xl font-extrabold tracking-tight text-black">
                    $ 6,53,877.09
                  </h2>
                  <span className="text-[10px] font-bold text-emerald-600 bg-emerald-500/10 px-2 py-0.5 rounded-full flex items-center space-x-1">
                    <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
                    <span>Today • +$2.56</span>
                  </span>
                </div>
              </div>
            </div>

            {/* Send, Receive, Pay Link, Swap quick action buttons */}
            <QuickActionCard />
          </div>

          {/* Loyalty Banners */}
          <div className="space-y-4">
            <h3 className="text-sm font-bold uppercase tracking-wider text-muted-foreground">
              Loyalty program coming soon for the merchants
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                { img: '/images/loyalty-1.jpg', title: 'Soon launching the loyalty program', desc: 'Loyalty program coming soon for the merchants' },
                { img: '/images/loyalty-2.jpg', title: 'Soon launching the loyalty program', desc: 'Loyalty program coming soon for the merchants' },
                { img: '/images/loyalty-3.jpg', title: 'Soon launching the loyalty program', desc: 'Loyalty program coming soon for the merchants' },
              ].map((card, i) => (
                <div
                  key={i}
                  className="bg-[#F8F8FA] border border-black/5 rounded-[2rem] overflow-hidden group hover:shadow-md transition-all duration-200"
                >
                  <div className="h-32 bg-black/5 relative overflow-hidden">
                    <img
                      src={card.img}
                      alt={card.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      onError={(e) => {
                        e.currentTarget.style.display = 'none';
                        const parent = e.currentTarget.parentElement;
                        if (parent) {
                          parent.className = 'w-full h-full bg-gradient-to-br from-primary/30 to-purple-600/10 flex items-center justify-center text-white/40 text-xs font-medium';
                          parent.innerHTML = 'Loyalty Rewards';
                        }
                      }}
                    />
                  </div>
                  <div className="p-5 space-y-1">
                    <h4 className="text-xs font-bold text-black leading-snug">{card.desc}</h4>
                    <p className="text-[10px] text-muted-foreground font-medium">{card.title}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Recent Payments Section with Status Filter */}
          <div className="space-y-4">
            {/* Status Filter Tabs Row */}
            <div className="flex flex-wrap gap-2 items-center bg-[#F8F8FA] border border-black/5 p-1 rounded-2xl self-start text-xs font-semibold max-w-max">
              {[
                { id: 'ALL', label: 'All' },
                { id: 'PENDING', label: 'Pending' },
                { id: 'COMPLETED', label: 'Confirmed' },
                { id: 'FAILED', label: 'Failed' },
                { id: 'EXPIRED', label: 'Expired' },
              ].map((filter) => (
                <button
                  key={filter.id}
                  onClick={() => setStatusFilter(filter.id as any)}
                  className={`px-4 py-2 rounded-xl transition-all ${
                    statusFilter === filter.id
                      ? 'bg-white text-black shadow-sm'
                      : 'text-muted-foreground hover:text-black'
                  }`}
                >
                  {filter.label}
                </button>
              ))}
            </div>

            <RecentTransactionsTable transactions={transactions?.transactions || []} />
          </div>
        </div>

        {/* RIGHT COLUMN: Turnover Chart, Progress circle, Token donut widget */}
        <div className="md:col-span-1 lg:col-span-1 space-y-8">
          {/* Total Monthly Turnover Chart */}
          <ChartCard
            title="Total Monthly Turnover"
            value={`$ ${summary.totalReceived.value.toLocaleString()}`}
            trend={`+${summary.totalReceived.changePercentage}%`}
          />

          {/* Plan circular gauge card */}
          <ProgressCard
            title="Plan for May"
            subtitle="Completed"
            percentage={72}
          />

          {/* Monthly tokens breakdown donut widget */}
          <PaymentDistributionCard
            totalValue={`$ ${summary.totalReceived.value.toLocaleString()}`}
            totalTokensCount={46}
          />
        </div>
      </div>
    </div>
  );
}
