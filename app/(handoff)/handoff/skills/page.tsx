'use client';

import React, { useEffect, useState } from 'react';
import SkillCard from '@/components/learn/SkillCard';
import { SKILLS, SKILL_GROUPS } from '@/lib/learn-data/skills';
import { markCompleted } from '@/lib/store';

const groupStyles: Record<string, { active: string; icon: string }> = {
  Sve: { active: 'bg-indigo-500/20 text-indigo-300 border-indigo-500/30', icon: '🔮' },
  Git: { active: 'bg-orange-500/20 text-orange-300 border-orange-500/30', icon: '📂' },
  'Pisanje koda': { active: 'bg-blue-500/20 text-blue-300 border-blue-500/30', icon: '💻' },
  Sigurnost: { active: 'bg-red-500/20 text-red-300 border-red-500/30', icon: '🔒' },
  Testiranje: { active: 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30', icon: '🧪' },
  Dokumentacija: { active: 'bg-purple-500/20 text-purple-300 border-purple-500/30', icon: '📝' },
};

export default function SkillsPage() {
  const [filter, setFilter] = useState('Sve');

  useEffect(() => {
    markCompleted('skills');
  }, []);

  const filtered = filter === 'Sve' ? SKILLS : SKILLS.filter((s) => s.group === filter);

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <div className="animate-fade-in-up">
        <span className="section-header-purple">Handoff sistem</span>
        <h1 className="text-3xl font-bold text-white mt-3 mb-2">Skillovi</h1>
        <p className="text-slate-400">
          15 skillova — pravila koja se automatski primenjuju u odgovarajućim situacijama.
          Klikni na skill za detalje.
        </p>
      </div>

      {/* Filter */}
      <div className="flex flex-wrap gap-2">
        {['Sve', ...SKILL_GROUPS].map((group) => {
          const style = groupStyles[group] || groupStyles.Sve;
          return (
            <button
              key={group}
              onClick={() => setFilter(group)}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium border transition-all ${
                filter === group
                  ? `${style.active} shadow-lg`
                  : 'bg-slate-800/50 text-slate-400 border-slate-700/30 hover:bg-slate-800/80 hover:text-slate-200'
              }`}
            >
              <span>{style.icon}</span>
              {group}
            </button>
          );
        })}
      </div>

      <div className="divider-gradient" />

      {/* Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 stagger-children">
        {filtered.map((skill) => (
          <SkillCard key={skill.name} skill={skill} />
        ))}
      </div>

      <p className="text-center text-sm text-slate-500">
        Prikazano {filtered.length} od {SKILLS.length} skillova
      </p>
    </div>
  );
}
