import { AlertCircle, RefreshCw } from 'lucide-react';

interface ErrorStateProps {
  title?: string;
  message?: string;
  onRetry?: () => void;
}

export default function ErrorState({
  title = 'Something went wrong',
  message = 'We encountered an error while fetching your dashboard metrics. Please check your network and try again.',
  onRetry,
}: ErrorStateProps) {
  return (
    <div className="flex flex-col items-center justify-center p-8 text-center border border-rose-500/10 rounded-[2rem] bg-rose-500/5 max-w-lg mx-auto my-12">
      <div className="h-12 w-12 rounded-full bg-rose-500/10 flex items-center justify-center text-rose-600 mb-4 animate-bounce">
        <AlertCircle className="h-6 w-6" />
      </div>
      <h3 className="text-base font-bold text-black tracking-tight">{title}</h3>
      <p className="text-xs text-muted-foreground mt-2 max-w-sm font-medium leading-relaxed">
        {message}
      </p>
      {onRetry && (
        <button
          onClick={onRetry}
          className="mt-6 inline-flex items-center space-x-2 px-5 py-2.5 bg-black text-white hover:bg-black/90 text-xs font-semibold rounded-full transition-all hover:scale-[1.02] shadow-sm"
        >
          <RefreshCw className="h-3.5 w-3.5 animate-spin-hover" />
          <span>Try Again</span>
        </button>
      )}
    </div>
  );
}
