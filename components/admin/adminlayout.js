// components/AdminLayout.tsx
import React from 'react';
import { LayoutDashboard, ShieldCheck, Settings, LogOut } from 'lucide-react';

export default function AdminLayout({ children}) {
  return (
    <div className="min-h-screen bg-[#0a0a0a] text-gray-100 flex">
      {/* Sidebar */}
      <aside className="w-64 border-r border-white/10 hidden md:flex flex-col p-6 space-y-8">
        <h1 className="text-xl font-bold bg-gradient-to-r from-blue-400 to-emerald-400 bg-clip-text text-transparent">
          AdminCore
        </h1>
        <nav className="flex-1 space-y-2">
          <NavItem icon={<LayoutDashboard size={20} />} label="Dashboard" active />
          <NavItem icon={<ShieldCheck size={20} />} label="Verifications" />
          <NavItem icon={<Settings size={20} />} label="Settings" />
        </nav>
        <button className="flex items-center gap-3 text-gray-400 hover:text-red-400 transition-colors">
          <LogOut size={20} /> Logout
        </button>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col">
        <header className="h-16 border-b border-white/10 flex items-center justify-between px-8 bg-[#0a0a0a]/50 backdrop-blur-md sticky top-0">
          <h2 className="text-sm font-medium text-gray-400">Manage / Unverified Subjects</h2>
          <div className="h-8 w-8 rounded-full bg-gradient-to-tr from-blue-500 to-purple-500" />
        </header>
        <div className="p-8 overflow-y-auto">
          {children}
        </div>
      </main>
    </div>
  );
}

function NavItem({ icon, label, active = false }) {
  return (
    <div className={`flex items-center gap-3 px-4 py-3 rounded-xl cursor-pointer transition-all ${
      active ? 'bg-white/10 text-white' : 'text-gray-400 hover:bg-white/5 hover:text-white'
    }`}>
      {icon}
      <span className="font-medium">{label}</span>
    </div>
  );
}