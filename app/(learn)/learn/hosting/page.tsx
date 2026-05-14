'use client';

import React, { useEffect } from 'react';
import FlowDiagram from '@/components/learn/FlowDiagram';
import { markCompleted } from '@/lib/store';

export default function HostingPage() {
  useEffect(() => {
    markCompleted('hosting');
  }, []);

  return (
    <div className="max-w-4xl mx-auto space-y-10">
      <div className="animate-fade-in-up">
        <span className="section-header-blue">Učenje</span>
        <h1 className="text-3xl font-bold text-white mt-3 mb-2">Hosting & produkcija</h1>
        <p className="text-slate-400">
          Hosting je postavljanje tvoje aplikacije na internet — da je bilo ko može koristiti, ne samo ti na svom računaru.
        </p>
      </div>

      {/* Šta je hosting */}
      <section className="space-y-4">
        <h2 className="text-xl font-semibold"><span className="text-gradient-blue inline-block">Šta je hosting?</span></h2>
        <p className="text-slate-400">
          Tvoj računar je tvoja kuća — aplikacija radi samo dok je tvoj laptop upaljen.
          Hosting je stan na internetu — aplikacija radi 24/7, dostupna svima sa linkom.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-5 rounded-2xl bg-gradient-to-br from-amber-500/15 to-orange-500/5 border border-amber-500/20">
            <h3 className="font-semibold text-amber-300 mb-3">Development (tvoj računar)</h3>
            <ul className="text-sm text-slate-400 space-y-2">
              <li className="flex items-start gap-2"><span className="text-amber-400">•</span> localhost:3000 / localhost:5000</li>
              <li className="flex items-start gap-2"><span className="text-amber-400">•</span> Radi samo dok je laptop upaljen</li>
              <li className="flex items-start gap-2"><span className="text-amber-400">•</span> Samo ti možeš pristupiti</li>
              <li className="flex items-start gap-2"><span className="text-amber-400">•</span> Debug mode, detaljne greške</li>
            </ul>
          </div>
          <div className="p-5 rounded-2xl bg-gradient-to-br from-emerald-500/15 to-teal-500/5 border border-emerald-500/20">
            <h3 className="font-semibold text-emerald-300 mb-3">Production (hosting)</h3>
            <ul className="text-sm text-slate-400 space-y-2">
              <li className="flex items-start gap-2"><span className="text-emerald-400">•</span> mojsajt.com</li>
              <li className="flex items-start gap-2"><span className="text-emerald-400">•</span> Radi 24/7 (server nikad ne spava)</li>
              <li className="flex items-start gap-2"><span className="text-emerald-400">•</span> Svako sa linkom može pristupiti</li>
              <li className="flex items-start gap-2"><span className="text-emerald-400">•</span> Optimizovano, bez debug info</li>
            </ul>
          </div>
        </div>
      </section>

      <div className="divider-gradient" />

      {/* Opcije */}
      <section className="space-y-4">
        <h2 className="text-xl font-semibold"><span className="text-gradient-purple inline-block">Opcije za hosting</span></h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 stagger-children">
          <div className="p-5 rounded-2xl bg-gradient-to-br from-blue-500/15 to-indigo-500/5 border border-blue-500/20 hover:-translate-y-0.5 transition-transform">
            <h3 className="font-semibold text-white mb-1">Vercel</h3>
            <p className="text-xs text-blue-300 mb-3 font-medium">Frontend (Next.js)</p>
            <p className="text-sm text-slate-400">Idealno za Next.js. Automatski deploy iz GitHub-a. Besplatan za male projekte.</p>
          </div>
          <div className="p-5 rounded-2xl bg-gradient-to-br from-emerald-500/15 to-teal-500/5 border border-emerald-500/20 hover:-translate-y-0.5 transition-transform">
            <h3 className="font-semibold text-white mb-1">Railway / Render</h3>
            <p className="text-xs text-emerald-300 mb-3 font-medium">Backend (Express + MySQL)</p>
            <p className="text-sm text-slate-400">Hostuje Node.js server i bazu podataka. Jeftin ili besplatan za development.</p>
          </div>
          <div className="p-5 rounded-2xl bg-gradient-to-br from-purple-500/15 to-pink-500/5 border border-purple-500/20 hover:-translate-y-0.5 transition-transform">
            <h3 className="font-semibold text-white mb-1">VPS</h3>
            <p className="text-xs text-purple-300 mb-3 font-medium">Potpuna kontrola</p>
            <p className="text-sm text-slate-400">Virtualni server (DigitalOcean, Hetzner). Više kontrole, više posla. Nginx + PM2.</p>
          </div>
        </div>
      </section>

      <div className="divider-gradient" />

      {/* Pre-production checklist */}
      <section className="space-y-4">
        <h2 className="text-xl font-semibold"><span className="text-gradient-green inline-block">Pre-produkcija checklist</span></h2>
        <p className="text-slate-400">Pre nego što pustiš aplikaciju u svet — proveri sve sa ove liste.</p>
        <div className="space-y-2">
          {[
            { text: 'Svi testovi prolaze (npm test)', cat: 'Testiranje', color: 'emerald' },
            { text: 'Build prolazi bez grešaka (npm run build)', cat: 'Build', color: 'blue' },
            { text: '.env fajlovi NISU u git-u', cat: 'Sigurnost', color: 'red' },
            { text: 'JWT_SECRET je jak (min 256 bita)', cat: 'Sigurnost', color: 'red' },
            { text: 'CORS je konfigurisan samo za produkcioni domen', cat: 'Sigurnost', color: 'red' },
            { text: 'Rate limiting je aktiviran', cat: 'Sigurnost', color: 'red' },
            { text: 'Nema console.log u produkcijskom kodu', cat: 'Kvalitet', color: 'purple' },
            { text: 'Error handler ne šalje stack trace u produkciji', cat: 'Sigurnost', color: 'red' },
            { text: 'Baza ima backup strategiju', cat: 'Infrastruktura', color: 'amber' },
            { text: 'SSL/HTTPS je aktiviran', cat: 'Sigurnost', color: 'red' },
          ].map((item, i) => (
            <div key={i} className="flex items-center gap-3 p-3.5 rounded-xl bg-slate-800/30 border border-slate-700/20 hover:bg-slate-800/50 transition-colors">
              <span className="text-emerald-400">✅</span>
              <span className="text-sm text-slate-300 flex-1">{item.text}</span>
              <span className={`text-xs font-medium px-2 py-0.5 rounded-lg bg-${item.color}-500/10 text-${item.color}-400`}>{item.cat}</span>
            </div>
          ))}
        </div>
      </section>

      <div className="divider-gradient" />

      {/* Deploy flow */}
      <section className="space-y-4">
        <h2 className="text-xl font-semibold"><span className="text-gradient-blue inline-block">CI/CD — automatski deploy</span></h2>
        <p className="text-slate-400">
          CI/CD (Continuous Integration / Continuous Deployment) automatizuje proces: push kod → testovi se pokrenu → deploy na server.
        </p>
        <FlowDiagram
          title="Automatski deploy flow"
          nodes={[
            { label: 'git push', icon: '📤', color: 'blue' },
            { label: 'CI testovi', icon: '🧪', color: 'yellow' },
            { label: 'Build', icon: '🔨', color: 'gray' },
            { label: 'Deploy', icon: '🚀', color: 'green' },
            { label: 'Monitoring', icon: '📊', color: 'purple' },
          ]}
        />
      </section>

      <div className="divider-gradient" />

      {/* DNS / SSL */}
      <section className="space-y-4">
        <h2 className="text-xl font-semibold"><span className="text-gradient-purple inline-block">Domen, DNS i SSL</span></h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 stagger-children">
          <div className="p-5 rounded-2xl bg-gradient-to-br from-blue-500/15 to-indigo-500/5 border border-blue-500/20">
            <h3 className="font-semibold text-white mb-2">Domen</h3>
            <p className="text-sm text-slate-400">
              Ime tvog sajta (mojservis.rs). Kupuješ ga kod registrara (Loopia, Namecheap).
            </p>
          </div>
          <div className="p-5 rounded-2xl bg-gradient-to-br from-emerald-500/15 to-teal-500/5 border border-emerald-500/20">
            <h3 className="font-semibold text-white mb-2">DNS</h3>
            <p className="text-sm text-slate-400">
              Sistem koji prevodi domen u IP adresu. Kao telefonski imenik za internet.
            </p>
          </div>
          <div className="p-5 rounded-2xl bg-gradient-to-br from-amber-500/15 to-orange-500/5 border border-amber-500/20">
            <h3 className="font-semibold text-white mb-2">SSL / HTTPS</h3>
            <p className="text-sm text-slate-400">
              Šifruje komunikaciju između browsera i servera. Katanac u address bar-u. Let&apos;s Encrypt = besplatan SSL.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
