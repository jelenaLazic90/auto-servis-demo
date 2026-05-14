'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { NAV_SECTIONS } from '@/lib/constants';
import { cn } from '@/lib/utils';

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

const sectionStyles = [
  { labelColor: 'text-blue-400/60', activeColor: 'bg-blue-500/15 text-blue-300', activeBorder: 'border-l-blue-400' },
  { labelColor: 'text-purple-400/60', activeColor: 'bg-purple-500/15 text-purple-300', activeBorder: 'border-l-purple-400' },
  { labelColor: 'text-emerald-400/60', activeColor: 'bg-emerald-500/15 text-emerald-300', activeBorder: 'border-l-emerald-400' },
  { labelColor: 'text-amber-400/60', activeColor: 'bg-amber-500/15 text-amber-300', activeBorder: 'border-l-amber-400' },
];

export default function Sidebar({ isOpen, onClose }: SidebarProps) {
  const pathname = usePathname();

  return (
    <>
      {/* Mobile overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 lg:hidden"
          onClick={onClose}
        />
      )}

      <aside
        className={cn(
          'fixed top-0 left-0 z-40 h-full w-64',
          'bg-gradient-to-b from-slate-900 to-slate-950 border-r border-slate-800/60',
          'transform transition-transform duration-200 ease-in-out',
          'lg:translate-x-0 lg:static lg:z-auto',
          'overflow-y-auto',
          isOpen ? 'translate-x-0' : '-translate-x-full'
        )}
      >
        {/* Logo */}
        <div className="flex items-center gap-3 px-5 py-5 border-b border-slate-800/60">
          <div className="icon-bg icon-bg-blue" style={{ width: 40, height: 40, borderRadius: 12, fontSize: 20 }}>🔧</div>
          <div>
            <h1 className="text-base font-bold text-gradient inline-block">Auto Servis</h1>
            <p className="text-xs text-slate-500">Demo & Learn</p>
          </div>
        </div>

        {/* Navigation */}
        <nav className="p-3 space-y-5">
          {NAV_SECTIONS.map((section, sIdx) => {
            const style = sectionStyles[sIdx] || sectionStyles[0];
            return (
              <div key={section.title}>
                <h2 className={cn('px-3 mb-2 text-[11px] font-bold uppercase tracking-widest', style.labelColor)}>
                  {section.title}
                </h2>
                <ul className="space-y-0.5">
                  {section.items.map((item) => {
                    const isActive = pathname === item.href;
                    return (
                      <li key={item.href}>
                        <Link
                          href={item.href}
                          onClick={onClose}
                          className={cn(
                            'flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-all border-l-2 border-transparent',
                            isActive
                              ? cn(style.activeColor, style.activeBorder, 'font-medium')
                              : 'text-slate-400 hover:bg-slate-800/50 hover:text-slate-200'
                          )}
                        >
                          <span className="text-base">{item.icon}</span>
                          <span>{item.label}</span>
                        </Link>
                      </li>
                    );
                  })}
                </ul>
              </div>
            );
          })}
        </nav>
      </aside>
    </>
  );
}
