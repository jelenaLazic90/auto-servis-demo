'use client';

import React, { useEffect, useState } from 'react';
import TechCard from '@/components/learn/TechCard';
import { TECH_STACK } from '@/lib/learn-data/tech-stack';
import { markCompleted } from '@/lib/store';

const CATEGORIES = ['Sve', 'Frontend', 'Backend', 'Alati'];

const catColors: Record<string, { active: string; icon: string }> = {
  Sve: { active: 'bg-indigo-500/20 text-indigo-300 border-indigo-500/30 shadow-lg shadow-indigo-500/10', icon: '🔮' },
  Frontend: { active: 'bg-blue-500/20 text-blue-300 border-blue-500/30 shadow-lg shadow-blue-500/10', icon: '🎨' },
  Backend: { active: 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30 shadow-lg shadow-emerald-500/10', icon: '⚙️' },
  Alati: { active: 'bg-amber-500/20 text-amber-300 border-amber-500/30 shadow-lg shadow-amber-500/10', icon: '🔧' },
};

export default function TechStackPage() {
  const [filter, setFilter] = useState('Sve');
  const [expandedRow, setExpandedRow] = useState<number | null>(null);

  useEffect(() => {
    markCompleted('tech-stack');
  }, []);

  const filtered = filter === 'Sve' ? TECH_STACK : TECH_STACK.filter((t) => t.category === filter);

  // Which row does card index belong to (2 columns)
  const getRow = (index: number) => Math.floor(index / 2);

  const toggleRow = (index: number) => {
    const row = getRow(index);
    setExpandedRow(expandedRow === row ? null : row);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <div className="animate-fade-in-up">
        <span className="section-header-blue">Učenje</span>
        <h1 className="text-3xl font-bold text-white mt-3 mb-2">Naš tech stack</h1>
        <p className="text-slate-400">
          Svaka tehnologija ima svoju ulogu. Klikni na karticu da vidiš analogiju, gde se koristi u kodu, i detaljnije objašnjenje.
        </p>
      </div>

      {/* Filter */}
      <div className="flex gap-2 flex-wrap">
        {CATEGORIES.map((cat) => (
          <button
            key={cat}
            onClick={() => { setFilter(cat); setExpandedRow(null); }}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium border transition-all ${
              filter === cat
                ? catColors[cat].active
                : 'bg-slate-800/50 text-slate-400 border-slate-700/30 hover:bg-slate-800/80 hover:text-slate-200'
            }`}
          >
            <span>{catColors[cat].icon}</span>
            {cat}
          </button>
        ))}
      </div>

      <div className="divider-gradient" />

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 stagger-children">
        {filtered.map((tech, i) => (
          <TechCard
            key={tech.name}
            tech={tech}
            expanded={expandedRow === getRow(i)}
            onToggle={() => toggleRow(i)}
          />
        ))}
      </div>

      {/* Count */}
      <p className="text-center text-sm text-slate-500">
        Prikazano {filtered.length} od {TECH_STACK.length} tehnologija
      </p>
    </div>
  );
}
