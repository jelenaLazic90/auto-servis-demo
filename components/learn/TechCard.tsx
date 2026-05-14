'use client';

import React, { useState } from 'react';

export interface TechCardData {
  name: string;
  icon: string;
  category: string;
  shortDescription: string;
  analogy: string;
  whereInCode: string;
  details: string;
}

const categoryGradients: Record<string, string> = {
  Frontend: 'from-blue-500/15 to-indigo-500/5',
  Backend: 'from-emerald-500/15 to-teal-500/5',
  Alati: 'from-amber-500/15 to-orange-500/5',
};

const categoryAccents: Record<string, string> = {
  Frontend: 'border-l-blue-400',
  Backend: 'border-l-emerald-400',
  Alati: 'border-l-amber-400',
};

export default function TechCard({ tech }: { tech: TechCardData }) {
  const [expanded, setExpanded] = useState(false);
  const gradient = categoryGradients[tech.category] || 'from-slate-500/15 to-slate-500/5';
  const accent = categoryAccents[tech.category] || 'border-l-slate-400';

  return (
    <div
      onClick={() => setExpanded(!expanded)}
      className={`p-5 rounded-2xl border-l-4 ${accent} cursor-pointer transition-all bg-gradient-to-br ${gradient} border border-l-4 border-slate-700/30 hover:border-slate-600/50 ${
        expanded ? 'shadow-lg shadow-black/20 scale-[1.01]' : 'hover:-translate-y-1'
      }`}
    >
      <div className="flex items-start gap-4">
        <span className="text-3xl">{tech.icon}</span>
        <div className="flex-1 min-w-0">
          <h3 className="font-bold text-white text-base">{tech.name}</h3>
          <span className="text-xs text-slate-500 font-medium">{tech.category}</span>
          <p className="text-sm text-slate-400 mt-1.5 leading-relaxed">{tech.shortDescription}</p>
        </div>
        <span className={`text-slate-500 transition-transform text-xs ${expanded ? 'rotate-180' : ''}`}>▼</span>
      </div>

      {expanded && (
        <div className="mt-5 pt-4 border-t border-slate-700/30 space-y-4 text-sm animate-fade-in">
          <div className="callout callout-blue">
            <span className="text-blue-300 font-semibold text-xs uppercase tracking-wide">Analogija</span>
            <p className="text-slate-300 mt-1 leading-relaxed">{tech.analogy}</p>
          </div>
          <div>
            <span className="text-slate-500 font-medium text-xs uppercase tracking-wide">Gde u kodu</span>
            <p className="text-blue-400 mt-1 font-mono text-xs bg-slate-900/50 px-3 py-2 rounded-lg">{tech.whereInCode}</p>
          </div>
          <div>
            <span className="text-slate-500 font-medium text-xs uppercase tracking-wide">Detaljnije</span>
            <p className="text-slate-300 mt-1 leading-relaxed">{tech.details}</p>
          </div>
        </div>
      )}
    </div>
  );
}
