'use client';

import React, { useState } from 'react';
import Badge from '@/components/ui/Badge';
import type { BadgeVariant } from '@/components/ui/Badge';
import Modal from '@/components/ui/Modal';

export interface AgentData {
  name: string;
  icon: string;
  description: string;
  category: string;
  whenUsed: string;
  example: string;
  calledBy: string;
}

const categoryColors: Record<string, BadgeVariant> = {
  Workflow: 'blue',
  Kvalitet: 'green',
  Verifikacija: 'yellow',
  'Održavanje': 'purple',
};

const categoryGradients: Record<string, string> = {
  Workflow: 'from-blue-500/15 to-indigo-500/5',
  Kvalitet: 'from-emerald-500/15 to-teal-500/5',
  Verifikacija: 'from-amber-500/15 to-yellow-500/5',
  'Održavanje': 'from-purple-500/15 to-pink-500/5',
};

export default function AgentCard({ agent }: { agent: AgentData }) {
  const [showModal, setShowModal] = useState(false);
  const gradient = categoryGradients[agent.category] || 'from-slate-500/15 to-slate-500/5';

  return (
    <>
      <div
        onClick={() => setShowModal(true)}
        className={`p-5 rounded-2xl bg-gradient-to-br ${gradient} border border-slate-700/30 hover:border-slate-600/50 cursor-pointer transition-all hover:-translate-y-1 hover:shadow-xl hover:shadow-black/20 group`}
      >
        <div className="flex items-start gap-4">
          <span className="text-3xl">{agent.icon}</span>
          <div className="flex-1 min-w-0">
            <h3 className="font-bold text-white group-hover:text-blue-300 transition-colors">
              {agent.name}
            </h3>
            <Badge variant={categoryColors[agent.category] || 'gray'} className="mt-1">
              {agent.category}
            </Badge>
            <p className="text-sm text-slate-400 mt-2 line-clamp-2 leading-relaxed">{agent.description}</p>
          </div>
        </div>
      </div>

      <Modal isOpen={showModal} onClose={() => setShowModal(false)} title={`${agent.icon} ${agent.name}`}>
        <div className="space-y-4">
          <div>
            <Badge variant={categoryColors[agent.category] || 'gray'}>{agent.category}</Badge>
          </div>
          <div>
            <h4 className="text-xs font-bold text-slate-500 uppercase tracking-wide mb-1">Opis</h4>
            <p className="text-slate-300 leading-relaxed">{agent.description}</p>
          </div>
          <div>
            <h4 className="text-xs font-bold text-slate-500 uppercase tracking-wide mb-1">Kada se koristi</h4>
            <p className="text-slate-300 leading-relaxed">{agent.whenUsed}</p>
          </div>
          <div>
            <h4 className="text-xs font-bold text-slate-500 uppercase tracking-wide mb-1">Primer</h4>
            <p className="text-slate-300 bg-slate-950/80 p-3 rounded-xl font-mono text-sm border border-slate-700/30">{agent.example}</p>
          </div>
          <div>
            <h4 className="text-xs font-bold text-slate-500 uppercase tracking-wide mb-1">Ko ga poziva</h4>
            <p className="text-slate-300">{agent.calledBy}</p>
          </div>
        </div>
      </Modal>
    </>
  );
}
