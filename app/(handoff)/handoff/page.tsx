'use client';

import React, { useEffect } from 'react';
import FlowDiagram from '@/components/learn/FlowDiagram';
import { markCompleted } from '@/lib/store';

export default function HandoffPage() {
  useEffect(() => {
    markCompleted('handoff-intro');
  }, []);

  return (
    <div className="max-w-4xl mx-auto space-y-12">
      <div className="bg-hero rounded-3xl py-10 px-6 text-center animate-fade-in-up bg-grid overflow-hidden relative">
        <span className="section-header section-header-purple mb-4">Handoff sistem</span>
        <h1 className="text-3xl font-bold text-white mt-4 mb-3">Šta je handoff sistem</h1>
        <p className="text-slate-400 max-w-2xl mx-auto leading-relaxed text-lg">
          Skup agenata, skillova i komandi koji automatizuju razvojni proces —
          od planiranja do deploy-a. Umesto da sve radiš ručno, sistem te vodi.
        </p>
        <div className="absolute top-6 left-8 text-3xl animate-float opacity-15">🤖</div>
        <div className="absolute bottom-6 right-10 text-3xl animate-float opacity-15" style={{ animationDelay: '1s' }}>⚡</div>
      </div>

      {/* 3 principa */}
      <section className="space-y-5">
        <h2 className="text-xl font-bold text-gradient-purple inline-block">Tri principa</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 stagger-children">
          {[
            { icon: '📋', iconBg: 'icon-bg-blue', title: 'Plan pre koda', desc: 'Nikad ne pišeš kod bez plana. Planner analizira zahtev, kreira plan, ti ga odobriš.', gradient: 'from-blue-500/15 to-indigo-500/5' },
            { icon: '🔄', iconBg: 'icon-bg-green', title: 'Automatska verifikacija', desc: 'Testovi, review, lint — sve se proverava automatski pre commit-a.', gradient: 'from-emerald-500/15 to-teal-500/5' },
            { icon: '🚧', iconBg: 'icon-bg-pink', title: 'Tvrde granice', desc: 'Neka pravila se NIKAD ne krše — push na main, force push, brisanje testova.', gradient: 'from-pink-500/15 to-rose-500/5' },
          ].map((p) => (
            <div key={p.title} className={`p-6 rounded-2xl bg-gradient-to-br ${p.gradient} border border-slate-700/30 text-center space-y-4 hover:-translate-y-1 transition-all hover:shadow-xl hover:shadow-black/20`}>
              <div className={`icon-bg ${p.iconBg} mx-auto`}>{p.icon}</div>
              <h3 className="text-lg font-bold text-white">{p.title}</h3>
              <p className="text-sm text-slate-400 leading-relaxed">{p.desc}</p>
            </div>
          ))}
        </div>
      </section>

      <hr className="divider-gradient" />

      {/* Flow dijagram */}
      <section className="space-y-5">
        <h2 className="text-xl font-bold text-gradient-purple inline-block">Tok razvoja</h2>
        <FlowDiagram
          title="Od ideje do deploy-a"
          nodes={[
            { label: 'Student', icon: '🧑‍🎓', color: 'blue' },
            { label: 'Planner', icon: '📋', color: 'yellow' },
            { label: 'Implementer', icon: '⌨️', color: 'green' },
            { label: 'Tester', icon: '🧪', color: 'purple' },
            { label: 'Reviewer', icon: '🔍', color: 'yellow' },
            { label: 'Shipper', icon: '🚀', color: 'green' },
          ]}
        />
      </section>

      {/* Pre/posle tabela */}
      <section className="space-y-5">
        <h2 className="text-xl font-bold text-gradient-purple inline-block">Pre i posle handoff sistema</h2>
        <div className="overflow-x-auto rounded-2xl border border-slate-700/30">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-slate-700/30 bg-slate-900/50">
                <th className="text-left py-3 px-4 text-slate-400 font-semibold">Aspekt</th>
                <th className="text-left py-3 px-4 text-red-400 font-semibold">Bez handoff-a</th>
                <th className="text-left py-3 px-4 text-emerald-400 font-semibold">Sa handoff-om</th>
              </tr>
            </thead>
            <tbody className="text-slate-400">
              {[
                ['Planiranje', 'Odmah pišeš kod, pa se vrtiš u krug', 'Plan → odobrenje → pa tek onda kod'],
                ['Code review', 'Nema ga, ili je površan', 'Automatski, pre svakog commit-a'],
                ['Testovi', 'Ručno testiranje ili "radi na mom računaru"', 'Automatski testovi, 1000+ pass/fail'],
                ['Commit poruke', '"fix stuff", "asdf", "radi valjda"', 'feat: add user auth, fix: resolve token bug'],
                ['Git workflow', 'Push na main, --force kad zapne', 'feature → PR → review → develop → main'],
                ['Debugging', 'console.log svuda, nadaj se', '5 faza: reproduce → isolate → identify → fix → verify'],
              ].map(([aspect, before, after], i) => (
                <tr key={i} className="border-b border-slate-800/30 hover:bg-slate-800/20 transition-colors">
                  <td className="py-3 px-4 font-medium text-slate-300">{aspect}</td>
                  <td className="py-3 px-4 text-red-400/80">{before}</td>
                  <td className="py-3 px-4 text-emerald-400/80">{after}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* Stats */}
      <section className="space-y-5">
        <h2 className="text-xl font-bold text-gradient-purple inline-block">Auto Servis u brojevima</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 stagger-children">
          {[
            { value: '1093', label: 'testova prolazi', icon: '✅', gradient: 'from-emerald-500/20 to-green-500/5' },
            { value: '17', label: 'agenata', icon: '🤖', gradient: 'from-blue-500/20 to-indigo-500/5' },
            { value: '15', label: 'skillova', icon: '🎯', gradient: 'from-purple-500/20 to-pink-500/5' },
            { value: '5', label: 'komandi', icon: '⚡', gradient: 'from-amber-500/20 to-orange-500/5' },
          ].map((stat) => (
            <div key={stat.label} className={`p-5 rounded-2xl bg-gradient-to-br ${stat.gradient} border border-slate-700/30 text-center hover:-translate-y-1 transition-all`}>
              <span className="text-2xl">{stat.icon}</span>
              <p className="text-3xl font-extrabold text-white mt-2">{stat.value}</p>
              <p className="text-xs text-slate-400 mt-1">{stat.label}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
