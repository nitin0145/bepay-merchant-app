import { useNavigate } from 'react-router-dom';
import { Send, Download, Link2, RefreshCw } from 'lucide-react';
import { PATHS } from '@/routes/paths';

export default function QuickActionCard() {
  const navigate = useNavigate();

  const actions = [
    { label: 'Send', icon: Send, onClick: () => alert('Send feature coming soon!') },
    { label: 'Receive', icon: Download, onClick: () => alert('Receive details coming soon!') },
    { label: 'Pay Link', icon: Link2, onClick: () => navigate(PATHS.PAYMENT_LINKS.LIST), highlight: true },
    { label: 'Swap', icon: RefreshCw, onClick: () => alert('Token swap feature coming soon!') },
  ];

  return (
    <div className="flex flex-wrap gap-3 sm:gap-4 items-center mt-6">
      {actions.map((act) => (
        <button
          key={act.label}
          onClick={act.onClick}
          className={`flex items-center space-x-3 px-6 py-3 rounded-2xl border text-xs font-semibold tracking-wide transition-all hover:scale-[1.02] active:scale-[0.98] shadow-sm ${
            act.highlight
              ? 'bg-black text-white border-black hover:bg-black/95'
              : 'bg-white text-black border-black/10 hover:border-black/20 hover:bg-black/5'
          }`}
        >
          <act.icon className={`h-4 w-4 ${act.highlight ? 'text-white' : 'text-black'}`} />
          <span>{act.label}</span>
        </button>
      ))}
    </div>
  );
}
