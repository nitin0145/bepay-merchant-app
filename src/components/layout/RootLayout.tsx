import { useState } from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';
import DashboardHeader from './DashboardHeader';

export default function RootLayout() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen bg-black text-white flex flex-col font-sans">
      {/* Sidebar Navigation */}
      <Sidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />

      {/* Main container wrapper */}
      <div className="flex-1 flex flex-col lg:pl-64 min-h-screen">
        {/* Header bar */}
        <DashboardHeader onOpenSidebar={() => setIsSidebarOpen(true)} />

        {/* Dashboard white canvas section */}
        <div className="flex-1 bg-black p-4 sm:p-6 lg:p-8">
          <main className="h-full min-h-[calc(100vh-8.5rem)] bg-white text-black rounded-[2.5rem] shadow-2xl p-6 sm:p-8 lg:p-10 transition-all duration-300">
            <Outlet />
          </main>
        </div>
      </div>
    </div>
  );
}
