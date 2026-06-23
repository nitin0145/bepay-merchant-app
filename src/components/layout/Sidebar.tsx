import { NavLink } from 'react-router-dom';
import { Home, Receipt, Link2, X } from 'lucide-react';
import { PATHS } from '@/routes/paths';

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function Sidebar({ isOpen, onClose }: SidebarProps) {
  const navItems = [
    { label: 'Home', path: PATHS.DASHBOARD, icon: Home },
    { label: 'Payment History', path: PATHS.TRANSACTIONS, icon: Receipt },
    { label: 'Payment Link', path: PATHS.PAYMENT_LINKS.LIST, icon: Link2 },
  ];

  const sidebarContent = (
    <div className="flex flex-col h-full bg-[#0B0B0D] text-white">
      {/* Brand logo */}
      <div className="h-20 flex items-center px-8 border-b border-white/5 space-x-3">
        <div className="h-8 w-8 rounded-lg bg-white/10 flex items-center justify-center border border-white/10">
          <span className="font-bold text-primary text-lg">b</span>
        </div>
        <div className="flex flex-col">
          <span className="font-semibold tracking-tight text-sm">bepay</span>
          <span className="text-[10px] text-muted-foreground leading-none">business</span>
        </div>
      </div>

      {/* Navigation links */}
      <nav className="flex-1 px-4 py-8 space-y-2">
        {navItems.map((item) => (
          <NavLink
            key={item.label}
            to={item.path}
            onClick={onClose}
            className={({ isActive }) =>
              `flex items-center space-x-4 px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200 group ${
                isActive
                  ? 'bg-white/10 text-white shadow-lg border border-white/5'
                  : 'text-muted-foreground hover:text-white hover:bg-white/5'
              }`
            }
          >
            {({ isActive }) => (
              <>
                <item.icon
                  className={`h-5 w-5 transition-transform duration-200 group-hover:scale-105 ${
                    isActive ? 'text-primary' : 'text-muted-foreground group-hover:text-white'
                  }`}
                />
                <span>{item.label}</span>
              </>
            )}
          </NavLink>
        ))}
      </nav>

      {/* User profile section at the bottom */}
      <div className="p-6 border-t border-white/5 bg-black/40">
        <div className="flex items-center space-x-4">
          <div className="relative">
            <img
              src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
              alt="Arshi Kohli"
              className="h-10 w-10 rounded-full object-cover border border-white/10"
            />
            <div className="absolute bottom-0 right-0 h-2.5 w-2.5 rounded-full bg-emerald-500 border border-black" />
          </div>
          <div className="flex flex-col min-w-0">
            <span className="text-sm font-medium truncate text-white">Arshi Kohli</span>
            <span className="text-xs text-muted-foreground truncate">Berlin, Germany</span>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <>
      {/* Mobile Drawer Backdrop */}
      {isOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm lg:hidden"
          onClick={onClose}
          aria-hidden="true"
        />
      )}

      {/* Desktop Sidebar (persistent) */}
      <aside className="hidden lg:block w-64 h-screen fixed left-0 top-0 z-30 border-r border-white/5">
        {sidebarContent}
      </aside>

      {/* Mobile Sidebar (drawer) */}
      <aside
        className={`fixed inset-y-0 left-0 z-50 w-64 transform bg-[#0B0B0D] transition-transform duration-300 ease-in-out lg:hidden ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-white hover:text-muted-foreground lg:hidden p-1 rounded-lg hover:bg-white/5"
          aria-label="Close menu"
        >
          <X className="h-5 w-5" />
        </button>
        {sidebarContent}
      </aside>
    </>
  );
}
