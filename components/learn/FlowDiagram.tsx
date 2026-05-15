'use client';

import React from 'react';

export interface FlowNode {
  label: string;
  icon: string;
  color: string;
}

interface FlowDiagramProps {
  nodes: FlowNode[];
  title?: string;
  onNodeClick?: (index: number) => void;
}

const colorMap: Record<string, string> = {
  blue: 'bg-gradient-to-br from-blue-500/20 to-indigo-500/10 border-blue-500/30 text-blue-300',
  green: 'bg-gradient-to-br from-emerald-500/20 to-teal-500/10 border-emerald-500/30 text-emerald-300',
  yellow: 'bg-gradient-to-br from-amber-500/20 to-yellow-500/10 border-amber-500/30 text-amber-300',
  purple: 'bg-gradient-to-br from-purple-500/20 to-pink-500/10 border-purple-500/30 text-purple-300',
  red: 'bg-gradient-to-br from-red-500/20 to-pink-500/10 border-red-500/30 text-red-300',
  gray: 'bg-gradient-to-br from-slate-500/20 to-slate-500/10 border-slate-500/30 text-slate-300',
};

export default function FlowDiagram({ nodes, title, onNodeClick }: FlowDiagramProps) {
  return (
    <div className="space-y-4">
      {title && <h3 className="text-lg font-semibold text-slate-200">{title}</h3>}
      <div className="flex flex-wrap items-center justify-center gap-3">
        {nodes.map((node, i) => (
          <React.Fragment key={i}>
            <div
              onClick={() => onNodeClick?.(i)}
              className={`flex items-center gap-2 px-5 py-3 rounded-xl border transition-all hover:scale-105 hover:shadow-lg hover:shadow-black/20 ${onNodeClick ? 'cursor-pointer' : ''} ${colorMap[node.color] || colorMap.gray}`}
            >
              <span className="text-xl">{node.icon}</span>
              <span className="text-sm font-semibold">{node.label}</span>
            </div>
            {i < nodes.length - 1 && (
              <span className="text-indigo-400/40 text-xl">→</span>
            )}
          </React.Fragment>
        ))}
      </div>
    </div>
  );
}
