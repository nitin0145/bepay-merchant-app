
interface PaymentDistributionCardProps {
  totalValue: string;
  totalTokensCount: number;
  loading?: boolean;
}

export default function PaymentDistributionCard({
  totalValue,
  totalTokensCount,
  loading = false,
}: PaymentDistributionCardProps) {
  const tokenBreakdown = [
    { name: 'Litecoin', ticker: 'LTC', amount: '0.25 LTC', fiatVal: '$1,190', color: '#3A70E2', time: 'Added 2 days ago' },
    { name: 'Ethereum Classic', ticker: 'ETC', amount: '2.50 ETC', fiatVal: '$580', color: '#27AE60', time: 'Added 5 days ago' },
    { name: 'HOdlcoin', ticker: 'HODL', amount: '124.0 HODL', fiatVal: '$350', color: '#F2C94C', time: 'Added 6 days ago' },
  ];

  if (loading) {
    return (
      <div className="bg-white border border-black/5 rounded-[2rem] p-6 h-[400px] flex flex-col justify-between animate-pulse">
        <div className="space-y-2">
          <div className="h-3 w-32 bg-black/5 rounded" />
          <div className="h-6 w-24 bg-black/5 rounded" />
        </div>
        <div className="h-28 w-28 mx-auto bg-black/5 rounded-full" />
        <div className="space-y-3">
          <div className="h-10 bg-black/5 rounded-xl" />
          <div className="h-10 bg-black/5 rounded-xl" />
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white border border-black/5 rounded-[2rem] p-6 transition-all duration-300 hover:-translate-y-1 hover:border-black/10 hover:shadow-lg flex flex-col">
      {/* Title section */}
      <div className="flex flex-col">
        <span className="text-xs text-muted-foreground font-semibold uppercase tracking-wider">
          Total Monthly Tokens
        </span>
        <span className="text-2xl font-bold tracking-tight text-black mt-1">
          {totalValue}
        </span>
      </div>

      {/* SVG Donut Chart */}
      <div className="relative flex items-center justify-center my-6 h-32">
        <svg className="w-28 h-28 transform -rotate-95">
          {/* Section 1: Litecoin (Blue) - 45% */}
          <circle
            cx="56"
            cy="56"
            r="44"
            fill="transparent"
            stroke="#3A70E2"
            strokeWidth="10"
            strokeDasharray={`${2 * Math.PI * 44}`}
            strokeDashoffset={`${(1 - 0.45) * 2 * Math.PI * 44}`}
            strokeLinecap="round"
          />
          {/* Section 2: ETC (Green) - 25% */}
          <circle
            cx="56"
            cy="56"
            r="44"
            fill="transparent"
            stroke="#27AE60"
            strokeWidth="10"
            strokeDasharray={`${2 * Math.PI * 44}`}
            strokeDashoffset={`${(1 - 0.25) * 2 * Math.PI * 44}`}
            transform="rotate(162, 56, 56)"
          />
          {/* Section 3: HODL (Yellow) - 20% */}
          <circle
            cx="56"
            cy="56"
            r="44"
            fill="transparent"
            stroke="#F2C94C"
            strokeWidth="10"
            strokeDasharray={`${2 * Math.PI * 44}`}
            strokeDashoffset={`${(1 - 0.2) * 2 * Math.PI * 44}`}
            transform="rotate(252, 56, 56)"
          />
          {/* Section 4: Rest (Purple/Gray) - 10% */}
          <circle
            cx="56"
            cy="56"
            r="44"
            fill="transparent"
            stroke="#BB6BD9"
            strokeWidth="10"
            strokeDasharray={`${2 * Math.PI * 44}`}
            strokeDashoffset={`${(1 - 0.1) * 2 * Math.PI * 44}`}
            transform="rotate(324, 56, 56)"
          />
        </svg>
        {/* Centered Total label */}
        <div className="absolute flex flex-col items-center justify-center">
          <span className="text-[10px] text-muted-foreground uppercase font-bold tracking-wider">
            Total Tokens
          </span>
          <span className="text-lg font-bold text-black leading-none mt-0.5">
            {totalTokensCount}
          </span>
        </div>
      </div>

      {/* Breakdowns list */}
      <div className="space-y-4 flex-1">
        <div className="flex justify-between items-center text-[10px] font-bold text-muted-foreground tracking-wider uppercase border-b border-black/5 pb-1">
          <span>Coins</span>
          <span>Amount</span>
        </div>
        {tokenBreakdown.map((t) => (
          <div key={t.name} className="flex justify-between items-center group">
            <div className="flex items-center space-x-3 min-w-0">
              {t.ticker === 'LTC' && (
                <div className="h-8 w-8 rounded-xl flex items-center justify-center text-white bg-[#3A70E2] font-semibold text-xs select-none shadow-sm">
                  Ł
                </div>
              )}
              {t.ticker === 'ETC' && (
                <div className="h-8 w-8 rounded-xl flex items-center justify-center text-white bg-[#27AE60] shadow-sm">
                  <svg className="h-4.5 w-4.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                    <path d="M12 2L4 12l8 10 8-10z" />
                    <path d="M12 2v20" />
                    <path d="M4 12h16" />
                  </svg>
                </div>
              )}
              {t.ticker === 'HODL' && (
                <div className="h-8 w-8 rounded-xl flex items-center justify-center text-black bg-[#F2C94C] font-extrabold text-[10px] select-none shadow-sm">
                  HODL
                </div>
              )}
              <div className="flex flex-col min-w-0">
                <span className="text-xs font-semibold text-black truncate group-hover:text-primary transition-colors">
                  {t.name}
                </span>
                <span className="text-[10px] text-muted-foreground font-medium">{t.time}</span>
              </div>
            </div>
            <div className="flex flex-col items-end">
              <span className="text-xs font-bold text-black">{t.amount}</span>
              <span className="text-[10px] text-muted-foreground font-semibold">{t.fiatVal}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
