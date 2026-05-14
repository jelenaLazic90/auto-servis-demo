'use client';

import React, { useState } from 'react';

export interface SkillData {
  name: string;
  group: string;
  description: string;
  whenActivated: string;
  rules: string[];
  example: string;
}

const groupGradients: Record<string, string> = {
  Git: 'from-orange-500/15 to-red-500/5',
  'Pisanje koda': 'from-blue-500/15 to-indigo-500/5',
  Sigurnost: 'from-red-500/15 to-pink-500/5',
  Testiranje: 'from-emerald-500/15 to-teal-500/5',
  Dokumentacija: 'from-purple-500/15 to-violet-500/5',
};

export default function SkillCard({ skill }: { skill: SkillData }) {
  const [expanded, setExpanded] = useState(false);
  const gradient = groupGradients[skill.group] || 'from-slate-500/15 to-slate-500/5';

  return (
    <div
      className={`p-5 rounded-2xl bg-gradient-to-br ${gradient} border border-slate-700/30 transition-all cursor-pointer hover:-translate-y-0.5 ${
        expanded ? 'shadow-xl shadow-black/20 border-slate-600/50' : 'hover:border-slate-600/50'
      }`}
      onClick={() => setExpanded(!expanded)}
    >
      <div className="flex items-center justify-between">
        <div>
          <h3 className="font-bold text-white">{skill.name}</h3>
          <p className="text-xs text-slate-500 mt-0.5 font-medium">{skill.group}</p>
        </div>
        <span className={`text-slate-500 transition-transform text-xs ${expanded ? 'rotate-180' : ''}`}>
          ▼
        </span>
      </div>
      <p className="text-sm text-slate-400 mt-2 leading-relaxed">{skill.description}</p>

      {expanded && (
        <div className="mt-4 pt-4 border-t border-slate-700/20 space-y-4 text-sm animate-fade-in">
          <div>
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wide">Kada se aktivira</span>
            <p className="text-slate-300 mt-1 leading-relaxed">{skill.whenActivated}</p>
          </div>
          <div>
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wide">Pravila</span>
            <ul className="mt-2 space-y-1.5">
              {skill.rules.map((rule, i) => (
                <li key={i} className="text-slate-300 flex items-start gap-2">
                  <span className="text-indigo-400 mt-0.5">•</span> {rule}
                </li>
              ))}
            </ul>
          </div>
          <div>
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wide">Primer</span>
            <p className="text-slate-300 mt-1 bg-slate-950/80 p-3 rounded-xl font-mono text-xs border border-slate-700/30">{skill.example}</p>
          </div>
        </div>
      )}
    </div>
  );
}
