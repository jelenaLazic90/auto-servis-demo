'use client';

import React from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { NAV_SECTIONS } from '@/lib/constants';
import { logout, getUser } from '@/lib/auth';

interface HeaderProps {
  onMenuToggle: () => void;
}

function getPageTitle(pathname: string): string {
  for (const section of NAV_SECTIONS) {
    for (const item of section.items) {
      if (item.href === pathname) return item.label;
    }
  }
  return 'Auto Servis Demo';
}

export default function Header({ onMenuToggle }: HeaderProps) {
  const pathname = usePathname();
  const router = useRouter();
  const title = getPageTitle(pathname);
  const user = getUser();

  const handleLogout = () => {
    logout();
    router.replace('/login');
  };

  return (
    <header className="sticky top-0 z-30 flex items-center gap-4 px-4 py-3 bg-slate-900/80 backdrop-blur-md border-b border-slate-700/30">
      <button
        type="button"
        onClick={onMenuToggle}
        className="lg:hidden p-2 rounded-xl text-slate-400 hover:bg-slate-800/50 hover:text-slate-200 transition-colors"
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <line x1="3" y1="6" x2="21" y2="6" />
          <line x1="3" y1="12" x2="21" y2="12" />
          <line x1="3" y1="18" x2="21" y2="18" />
        </svg>
      </button>
      <h1 className="text-lg font-semibold text-white flex-1">{title}</h1>
      {user && (
        <div className="flex items-center gap-3">
          <span className="text-sm text-slate-400 hidden sm:inline">{user.email}</span>
          <button
            onClick={handleLogout}
            className="px-3 py-1.5 text-sm text-slate-400 hover:text-white rounded-xl hover:bg-slate-800/50 border border-slate-700/30 transition-all"
          >
            Odjavi se
          </button>
        </div>
      )}
    </header>
  );
}
