'use client';

import React, { useState } from 'react';

export interface DiagramNode {
  id: string;
  label: string;
  icon: string;
  description: string;
  details: string;
}

interface InteractiveDiagramProps {
  nodes: DiagramNode[];
  title?: string;
}

const nodeColors = [
  'from-blue-500/20 to-indigo-500/10 border-blue-500/30 hover:border-blue-400/50',
  'from-purple-500/20 to-pink-500/10 border-purple-500/30 hover:border-purple-400/50',
  'from-emerald-500/20 to-teal-500/10 border-emerald-500/30 hover:border-emerald-400/50',
  'from-amber-500/20 to-orange-500/10 border-amber-500/30 hover:border-amber-400/50',
  'from-pink-500/20 to-rose-500/10 border-pink-500/30 hover:border-pink-400/50',
  'from-cyan-500/20 to-blue-500/10 border-cyan-500/30 hover:border-cyan-400/50',
];

export default function InteractiveDiagram({ nodes, title }: InteractiveDiagramProps) {
  const [activeNode, setActiveNode] = useState<string | null>(null);

  const active = nodes.find((n) => n.id === activeNode);

  return (
    <div className="space-y-6">
      {title && <h3 className="text-lg font-semibold text-slate-200">{title}</h3>}
      <div className="flex flex-wrap items-center justify-center gap-3 md:gap-4">
        {nodes.map((node, i) => (
          <React.Fragment key={node.id}>
            <button
              onClick={() => setActiveNode(activeNode === node.id ? null : node.id)}
              className={`flex flex-col items-center gap-2 p-5 rounded-2xl border transition-all min-w-[110px] bg-gradient-to-br ${
                nodeColors[i % nodeColors.length]
              } ${
                activeNode === node.id
                  ? 'scale-110 shadow-xl shadow-black/30 ring-2 ring-white/10'
                  : 'hover:scale-105 hover:shadow-lg hover:shadow-black/20'
              }`}
            >
              <span className="text-3xl">{node.icon}</span>
              <span className="text-sm font-semibold text-slate-200">{node.label}</span>
            </button>
            {i < nodes.length - 1 && (
              <span className="text-indigo-400/50 text-2xl hidden md:block">→</span>
            )}
          </React.Fragment>
        ))}
      </div>

      {active && (
        <div className="callout callout-purple animate-fade-in-scale">
          <h4 className="text-lg font-semibold text-white mb-2">
            {active.icon} {active.label}
          </h4>
          <p className="text-slate-200 font-medium">{active.description}</p>
          <p className="text-sm text-slate-400 mt-2 leading-relaxed">{active.details}</p>
        </div>
      )}
    </div>
  );
}
