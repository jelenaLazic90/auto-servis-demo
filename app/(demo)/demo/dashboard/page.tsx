'use client';

import React, { useEffect, useState } from 'react';
import Badge from '@/components/ui/Badge';
import type { BadgeVariant } from '@/components/ui/Badge';
import { initializeStore, getClients, getVehicles, getServiceRequests } from '@/lib/store';
import { STATUS_LABELS, STATUS_COLORS } from '@/lib/constants';
import { formatDate } from '@/lib/utils';
import type { ServiceRequest } from '@/lib/types';

const cardStyles = [
  { gradient: 'from-blue-500/15 to-indigo-500/5', border: 'border-blue-500/20', text: 'text-blue-300' },
  { gradient: 'from-emerald-500/15 to-teal-500/5', border: 'border-emerald-500/20', text: 'text-emerald-300' },
  { gradient: 'from-amber-500/15 to-orange-500/5', border: 'border-amber-500/20', text: 'text-amber-300' },
  { gradient: 'from-purple-500/15 to-pink-500/5', border: 'border-purple-500/20', text: 'text-purple-300' },
];

export default function DashboardPage() {
  const [stats, setStats] = useState({ clients: 0, vehicles: 0, requests: 0, completed: 0 });
  const [recent, setRecent] = useState<ServiceRequest[]>([]);

  useEffect(() => {
    initializeStore();
    const clients = getClients();
    const vehicles = getVehicles();
    const requests = getServiceRequests();

    setStats({
      clients: clients.length,
      vehicles: vehicles.length,
      requests: requests.length,
      completed: requests.filter((r) => r.status === 'zavrseno' || r.status === 'isporuceno').length,
    });

    setRecent(requests.slice(0, 5));
  }, []);

  const cards = [
    { label: 'Klijenti', value: stats.clients, icon: '👥' },
    { label: 'Vozila', value: stats.vehicles, icon: '🚗' },
    { label: 'Nalozi', value: stats.requests, icon: '📋' },
    { label: 'Završeni', value: stats.completed, icon: '✅' },
  ];

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <div className="animate-fade-in-up">
        <span className="section-header-orange">CRUD Demo</span>
        <h1 className="text-3xl font-bold text-white mt-3 mb-2">Dashboard</h1>
        <p className="text-slate-400">Pregled statistika iz localStorage demo podataka.</p>
      </div>

      {/* Stat cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 stagger-children">
        {cards.map((card, i) => {
          const style = cardStyles[i];
          return (
            <div key={card.label} className={`p-5 rounded-2xl bg-gradient-to-br ${style.gradient} border ${style.border} hover:scale-105 transition-transform`}>
              <div className="flex items-center justify-between">
                <span className="text-2xl">{card.icon}</span>
                <span className={`text-3xl font-extrabold ${style.text}`}>{card.value}</span>
              </div>
              <p className="text-sm text-slate-400 mt-2 font-medium">{card.label}</p>
            </div>
          );
        })}
      </div>

      {/* Recent service requests */}
      <div className="space-y-4">
        <h2 className="text-xl font-semibold text-white">Skorašnji nalozi</h2>
        <div className="space-y-2">
          {recent.length === 0 ? (
            <p className="text-slate-500 text-center py-8">Nema naloga</p>
          ) : (
            recent.map((sr) => (
              <div key={sr.id} className="flex items-center justify-between p-4 rounded-xl bg-slate-800/30 border border-slate-700/20 hover:bg-slate-800/50 transition-colors">
                <div className="flex-1 min-w-0">
                  <p className="text-slate-200 truncate">{sr.description}</p>
                  <p className="text-xs text-slate-500 mt-1">{formatDate(sr.createdAt)}</p>
                </div>
                <Badge variant={STATUS_COLORS[sr.status] as BadgeVariant}>
                  {STATUS_LABELS[sr.status]}
                </Badge>
              </div>
            ))
          )}
        </div>
      </div>

      {/* Info */}
      <div className="callout callout-blue">
        <p className="text-blue-300 font-semibold">Ovo je demo sekcija</p>
        <p className="text-slate-300 mt-1 text-sm">
          Svi podaci žive u localStorage tvog browsera. Možeš dodavati, menjati i brisati —
          ništa se ne šalje na server. Resetuj dugme na stranicama vraća originalne demo podatke.
        </p>
      </div>
    </div>
  );
}
