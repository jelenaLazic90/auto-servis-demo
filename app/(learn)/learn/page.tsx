'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import ProgressBar from '@/components/learn/ProgressBar';
import { getCompletedCount } from '@/lib/store';
import { TOTAL_LESSONS, NAV_SECTIONS } from '@/lib/constants';

const features = [
  {
    icon: '🌐',
    iconBg: 'icon-bg-blue',
    title: 'Kako radi web',
    desc: 'Frontend, backend, baza — od klika do odgovora',
    color: 'from-blue-500/20 to-indigo-500/10',
    href: '/learn/how-web-works',
  },
  {
    icon: '⚡',
    iconBg: 'icon-bg-purple',
    title: 'Tech stack',
    desc: 'React, Next.js, Express, MySQL, Tailwind...',
    color: 'from-purple-500/20 to-pink-500/10',
    href: '/learn/tech-stack',
  },
  {
    icon: '🤖',
    iconBg: 'icon-bg-green',
    title: 'AI workflow',
    desc: 'Agenti, skillovi, komande — automatizuj razvoj',
    color: 'from-emerald-500/20 to-teal-500/10',
    href: '/handoff',
  },
  {
    icon: '🎯',
    iconBg: 'icon-bg-orange',
    title: 'Vežbe & kvizovi',
    desc: 'Testiraj znanje, vežbaj sa Claude Code-om',
    color: 'from-amber-500/20 to-orange-500/10',
    href: '/exercises/scenarios',
  },
];

export default function LearnPage() {
  const [completed, setCompleted] = useState(0);

  useEffect(() => {
    setCompleted(getCompletedCount());
  }, []);

  const allSections = NAV_SECTIONS;
  const learnItems = allSections[0].items.slice(1);

  return (
    <div className="max-w-5xl mx-auto space-y-14">
      {/* Hero */}
      <div className="relative text-center py-16 px-6 bg-hero rounded-3xl overflow-hidden bg-grid">
        <div className="animate-fade-in-up relative z-10">
          <div className="section-header section-header-blue mb-6">Platforma za učenje</div>
          <h1 className="text-5xl md:text-6xl font-extrabold tracking-tight leading-tight">
            <span className="text-white">Nauči web development</span>
            <br />
            <span className="text-gradient-rainbow">kroz pravi projekat</span>
          </h1>
          <p className="text-lg text-slate-400 max-w-2xl mx-auto mt-6 leading-relaxed">
            Interaktivna platforma koja te vodi od nule do punog stack-a.
            Bez dosadnih tutorijala — sve kroz <strong className="text-slate-200">pravi Auto Servis projekat</strong>.
          </p>
        </div>

        {/* Floating decorative elements */}
        <div className="absolute top-8 left-8 text-4xl animate-float opacity-20">💻</div>
        <div className="absolute top-12 right-12 text-3xl animate-float opacity-15" style={{ animationDelay: '1s' }}>🚀</div>
        <div className="absolute bottom-8 left-1/4 text-3xl animate-float opacity-15" style={{ animationDelay: '2s' }}>⚡</div>
        <div className="absolute bottom-12 right-1/4 text-4xl animate-float opacity-20" style={{ animationDelay: '0.5s' }}>🔧</div>
      </div>

      {/* Features grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 stagger-children">
        {features.map((f) => (
          <Link
            key={f.title}
            href={f.href}
            className={`block p-6 rounded-2xl bg-gradient-to-br ${f.color} border border-slate-700/30 hover:border-slate-600/50 transition-all hover:-translate-y-1 hover:shadow-xl hover:shadow-black/20`}
          >
            <div className={`icon-bg ${f.iconBg} mb-4`}>{f.icon}</div>
            <h3 className="text-lg font-bold text-white mb-1">{f.title}</h3>
            <p className="text-sm text-slate-400 leading-relaxed">{f.desc}</p>
          </Link>
        ))}
      </div>

      {/* Progress */}
      <div className="p-6 rounded-2xl bg-gradient-to-r from-indigo-500/10 via-purple-500/5 to-pink-500/10 border border-indigo-500/20">
        <ProgressBar completed={completed} total={TOTAL_LESSONS} label="Ukupan napredak" />
      </div>

      <hr className="divider-gradient" />

      {/* Sections overview */}
      <div className="space-y-8">
        {allSections.map((section, sectionIdx) => {
          const sectionColors = [
            { badge: 'section-header-blue', accent: 'text-blue-400', hoverBorder: 'hover:border-blue-500/30', iconBg: 'icon-bg-blue' },
            { badge: 'section-header-purple', accent: 'text-purple-400', hoverBorder: 'hover:border-purple-500/30', iconBg: 'icon-bg-purple' },
            { badge: 'section-header-green', accent: 'text-emerald-400', hoverBorder: 'hover:border-emerald-500/30', iconBg: 'icon-bg-green' },
            { badge: 'section-header-orange', accent: 'text-amber-400', hoverBorder: 'hover:border-amber-500/30', iconBg: 'icon-bg-orange' },
          ];
          const color = sectionColors[sectionIdx] || sectionColors[0];
          const items = sectionIdx === 0 ? learnItems : section.items;

          return (
            <div key={section.title} className="space-y-4">
              <div className="flex items-center gap-3">
                <span className={`section-header ${color.badge}`}>{section.title}</span>
                <span className="text-sm text-slate-500">{items.length} lekcija</span>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                {items.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={`flex items-center gap-4 p-4 rounded-xl border border-slate-700/30 ${color.hoverBorder} hover:bg-slate-800/30 transition-all group`}
                  >
                    <span className="text-2xl group-hover:scale-110 transition-transform">{item.icon}</span>
                    <span className={`text-slate-300 group-hover:${color.accent} transition-colors font-medium`}>{item.label}</span>
                  </Link>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
