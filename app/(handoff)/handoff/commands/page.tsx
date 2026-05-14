'use client';

import React, { useEffect, useState } from 'react';
import { COMMANDS, DAILY_FLOW } from '@/lib/learn-data/commands';
import { markCompleted } from '@/lib/store';

export default function CommandsPage() {
  const [activeCommand, setActiveCommand] = useState<string | null>(null);

  useEffect(() => {
    markCompleted('commands');
  }, []);

  const active = COMMANDS.find((c) => c.name === activeCommand);

  return (
    <div className="max-w-4xl mx-auto space-y-10">
      <div className="animate-fade-in-up">
        <span className="section-header-purple">Handoff sistem</span>
        <h1 className="text-3xl font-bold text-white mt-3 mb-2">Komande & Workflow</h1>
        <p className="text-slate-400">
          5 komandi koje pokreću cele workflow-e — od planiranja do deploy-a. Svaka komanda koordinira više agenata.
        </p>
      </div>

      {/* Commands */}
      <section className="space-y-4">
        <h2 className="text-xl font-semibold"><span className="text-gradient-purple inline-block">Komande</span></h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 stagger-children">
          {COMMANDS.map((cmd) => (
            <button
              key={cmd.name}
              onClick={() => setActiveCommand(activeCommand === cmd.name ? null : cmd.name)}
              className={`p-5 rounded-2xl border text-left transition-all hover:-translate-y-0.5 ${
                activeCommand === cmd.name
                  ? 'bg-gradient-to-br from-purple-500/15 to-indigo-500/5 border-purple-500/30 shadow-lg shadow-purple-500/10'
                  : 'bg-slate-800/50 border-slate-700/30 hover:border-slate-600/50'
              }`}
            >
              <h3 className="font-mono font-bold text-purple-300 text-lg">{cmd.name}</h3>
              <p className="text-sm text-slate-400 mt-1">{cmd.description}</p>
            </button>
          ))}
        </div>

        {active && (
          <div className="p-6 rounded-2xl bg-gradient-to-br from-purple-500/10 to-indigo-500/5 border border-purple-500/20 space-y-5 animate-fade-in">
            <h3 className="text-xl font-semibold text-purple-300 font-mono">{active.name}</h3>

            <div>
              <p className="text-xs text-slate-500 font-bold uppercase tracking-wide mb-2">Primer:</p>
              <p className="bg-slate-950/80 px-4 py-2.5 rounded-xl font-mono text-sm text-emerald-300 border border-slate-700/30">{active.example}</p>
            </div>

            <div>
              <p className="text-xs text-slate-500 font-bold uppercase tracking-wide mb-3">Koraci:</p>
              <div className="space-y-2">
                {active.steps.map((step, i) => (
                  <div key={i} className="flex items-start gap-3">
                    <span className="w-7 h-7 flex items-center justify-center rounded-lg bg-purple-500/20 text-purple-300 text-xs font-bold shrink-0">
                      {i + 1}
                    </span>
                    <p className="text-sm text-slate-300 pt-1">{step}</p>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <p className="text-xs text-slate-500 font-bold uppercase tracking-wide mb-2">Agenti koji učestvuju:</p>
              <div className="flex flex-wrap gap-2">
                {active.agents.map((agent) => (
                  <span key={agent} className="px-3 py-1.5 bg-indigo-500/15 text-indigo-300 rounded-xl text-sm border border-indigo-500/20 font-medium">
                    {agent}
                  </span>
                ))}
              </div>
            </div>
          </div>
        )}
      </section>

      <div className="divider-gradient" />

      {/* Daily flow */}
      <section className="space-y-4">
        <h2 className="text-xl font-semibold"><span className="text-gradient-blue inline-block">Dnevni tok razvoja</span></h2>
        <p className="text-slate-400">Tipičan dan sa handoff sistemom — od jutarnjeg feature zahteva do večernjeg deploy-a.</p>
        <div className="space-y-0">
          {DAILY_FLOW.map((item, i) => (
            <div key={i} className="flex items-center gap-4 p-4 border-l-2 border-purple-500/30 ml-4 hover:bg-slate-800/20 transition-colors rounded-r-xl">
              <div className="w-20 text-right">
                <span className="text-sm font-medium text-slate-500">{item.time}</span>
              </div>
              <div className="flex-1">
                <p className="text-slate-300">{item.action}</p>
                <p className="text-sm text-purple-300 font-mono mt-0.5 font-medium">{item.command}</p>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
