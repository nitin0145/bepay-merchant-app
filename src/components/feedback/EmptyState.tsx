import { HelpCircle } from 'lucide-react';

interface EmptyStateProps {
  title?: string;
  message?: string;
}

export default function EmptyState({
  title = 'No records found',
  message = 'There are no active metrics or transactions available for display at this moment.',
}: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center p-12 text-center border border-black/5 rounded-[2rem] bg-[#F8F8FA] max-w-lg mx-auto my-12">
      <div className="h-12 w-12 rounded-full bg-black/5 flex items-center justify-center text-muted-foreground mb-4">
        <HelpCircle className="h-6 w-6" />
      </div>
      <h3 className="text-base font-bold text-black tracking-tight">{title}</h3>
      <p className="text-xs text-muted-foreground mt-2 max-w-sm font-medium leading-relaxed">
        {message}
      </p>
    </div>
  );
}
