import { useState } from 'react';
import { Menu, Search, Bell, Download } from 'lucide-react';

interface DashboardHeaderProps {
  onOpenSidebar: () => void;
}

export default function DashboardHeader({ onOpenSidebar }: DashboardHeaderProps) {
  const [isSandbox, setIsSandbox] = useState(true);

  return (
    <header className="h-20 bg-black text-white px-8 flex items-center justify-between border-b border-white/5 sticky top-0 z-20">
      {/* Page Title & Mobile toggle */}
      <div className="flex items-center space-x-4">
        <button
          onClick={onOpenSidebar}
          className="lg:hidden p-2 text-white hover:bg-white/5 rounded-lg transition-colors"
          aria-label="Open sidebar"
        >
          <Menu className="h-5 w-5" />
        </button>
        <h1 className="text-xl font-bold tracking-tight text-white hidden sm:block">
          Dashboard
        </h1>
      </div>

      {/* Center Search Input */}
      <div className="flex-1 max-w-md mx-8 relative hidden md:block">
        <span className="absolute inset-y-0 left-4 flex items-center pointer-events-none text-muted-foreground">
          <Search className="h-4 w-4" />
        </span>
        <input
          type="text"
          placeholder="Search for anything"
          className="w-full bg-[#141417]/80 text-white placeholder-muted-foreground/60 text-sm pl-11 pr-4 py-2.5 rounded-full border border-white/5 focus:outline-none focus:border-primary/50 transition-colors"
        />
      </div>

      {/* Right Controls */}
      <div className="flex items-center space-x-6">
        {/* Sandbox Switch */}
        <div className="flex items-center space-x-3">
          <span className="text-xs font-medium text-muted-foreground">Sandbox</span>
          <button
            onClick={() => setIsSandbox(!isSandbox)}
            className={`w-10 h-6 rounded-full p-0.5 transition-colors duration-200 focus:outline-none ${
              isSandbox ? 'bg-primary' : 'bg-white/20'
            }`}
            aria-label="Toggle sandbox mode"
          >
            <div
              className={`bg-white w-5 h-5 rounded-full shadow-md transform duration-200 ease-in-out ${
                isSandbox ? 'translate-x-4' : 'translate-x-0'
              }`}
            />
          </button>
        </div>

        {/* Notifications */}
        <button className="relative p-2 text-muted-foreground hover:text-white rounded-full hover:bg-white/5 transition-colors">
          <Bell className="h-5 w-5" />
          <div className="absolute top-1.5 right-1.5 h-2 w-2 rounded-full bg-[#F2C94C] border border-black" />
        </button>

        {/* Withdraw Button */}
        <button className="bg-white hover:bg-white/90 text-black text-xs font-semibold px-5 py-2.5 rounded-full flex items-center space-x-2 transition-all hover:scale-[1.02] shadow-sm">
          <Download className="h-3.5 w-3.5 rotate-180" />
          <span>Withdraw</span>
        </button>
      </div>
    </header>
  );
}
