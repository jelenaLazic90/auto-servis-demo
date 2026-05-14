'use client';

import React, { useEffect, useState } from 'react';
import AgentCard from '@/components/learn/AgentCard';
import { AGENTS, AGENT_CATEGORIES } from '@/lib/learn-data/agents';
import { markCompleted } from '@/lib/store';

const catStyles: Record<string, { active: string; icon: string }> = {
  Sve: { active: 'bg-indigo-500/20 text-indigo-300 border-indigo-500/30', icon: '🔮' },
  Workflow: { active: 'bg-blue-500/20 text-blue-300 border-blue-500/30', icon: '🔄' },
  Kvalitet: { active: 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30', icon: '✨' },
  Verifikacija: { active: 'bg-amber-500/20 text-amber-300 border-amber-500/30', icon: '🧪' },
  'Održavanje': { active: 'bg-purple-500/20 text-purple-300 border-purple-500/30', icon: '🔧' },
};

export default function AgentsPage() {
  const [filter, setFilter] = useState('Sve');

  useEffect(() => {
    markCompleted('agents');
  }, []);

  const filtered = filter === 'Sve' ? AGENTS : AGENTS.filter((a) => a.category === filter);

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <div className="animate-fade-in-up">
        <span className="section-header-purple">Handoff sistem</span>
        <h1 className="text-3xl font-bold text-white mt-3 mb-2">Agenti</h1>
        <p className="text-slate-400">
          17 specijalizovanih agenata — svaki ima svoju ulogu u razvojnom procesu.
          Klikni na karticu za detalje.
        </p>
      </div>

      {/* Filter */}
      <div className="flex flex-wrap gap-2">
        {['Sve', ...AGENT_CATEGORIES].map((cat) => {
          const style = catStyles[cat] || catStyles.Sve;
          return (
            <button
              key={cat}
              onClick={() => setFilter(cat)}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium border transition-all ${
                filter === cat
                  ? `${style.active} shadow-lg`
                  : 'bg-slate-800/50 text-slate-400 border-slate-700/30 hover:bg-slate-800/80 hover:text-slate-200'
              }`}
            >
              <span>{style.icon}</span>
              {cat}
            </button>
          );
        })}
      </div>

      <div className="divider-gradient" />

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 stagger-children">
        {filtered.map((agent) => (
          <AgentCard key={agent.name} agent={agent} />
        ))}
      </div>

      <p className="text-center text-sm text-slate-500">
        Prikazano {filtered.length} od {AGENTS.length} agenata
      </p>
    </div>
  );
}
