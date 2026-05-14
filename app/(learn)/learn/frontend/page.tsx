'use client';

import React, { useEffect, useState } from 'react';
import CodeBlock from '@/components/learn/CodeBlock';
import { markCompleted } from '@/lib/store';

export default function FrontendPage() {
  const [activeStrategy, setActiveStrategy] = useState<string | null>(null);

  useEffect(() => {
    markCompleted('frontend');
  }, []);

  const strategies = [
    {
      id: 'csr',
      name: 'CSR',
      fullName: 'Client-Side Rendering',
      icon: '🖥️',
      gradient: 'from-blue-500/15 to-indigo-500/5',
      border: 'border-blue-500/30',
      text: 'text-blue-300',
      analogy: 'Dobiješ prazan tanjir i sam serviraš iz švedskog stola',
      when: 'Dashboardi, interaktivne forme, privatni podaci',
      how: 'Browser preuzima prazan HTML + JavaScript. JS renderuje stranicu u browseru.',
      example: 'CRUD Demo sekcija ove platforme (localStorage, useState)',
      pros: ['Bogata interakcija', 'Ne opterećuje server', 'Odlično za SPA'],
      cons: ['Spor prvi load', 'Loš SEO', 'Korisnik vidi prazan ekran dok se JS učita'],
    },
    {
      id: 'ssr',
      name: 'SSR',
      fullName: 'Server-Side Rendering',
      icon: '🍽️',
      gradient: 'from-emerald-500/15 to-teal-500/5',
      border: 'border-emerald-500/30',
      text: 'text-emerald-300',
      analogy: 'Konobar ti donese gotovo jelo po porudžbini',
      when: 'Personalizovan sadržaj, SEO + sveži podaci',
      how: 'Server renderuje HTML za svaki zahtev. Browser dobija gotovu stranicu.',
      example: 'Auto Servis — stranice sa podacima iz baze (klijenti, nalozi)',
      pros: ['Odličan SEO', 'Brz prvi prikaz', 'Uvek sveži podaci'],
      cons: ['Opterećuje server', 'Sporije od keširanih stranica', 'TTFB zavisi od servera'],
    },
    {
      id: 'ssg',
      name: 'SSG',
      fullName: 'Static Site Generation',
      icon: '📄',
      gradient: 'from-amber-500/15 to-yellow-500/5',
      border: 'border-amber-500/30',
      text: 'text-amber-300',
      analogy: 'Jelo spremljeno unapred, servira se sa pulta',
      when: 'Blog, dokumentacija, landing page',
      how: 'HTML se generiše JEDNOM pri build-u. Servira se kao statički fajl.',
      example: 'OVA platforma za učenje! Sadržaj se ne menja često.',
      pros: ['Najbrže moguće', 'Besplatno hostovanje (Vercel)', 'Odličan SEO'],
      cons: ['Podaci zastareli do sledećeg builda', 'Nije za dinamičan sadržaj'],
    },
    {
      id: 'isr',
      name: 'ISR',
      fullName: 'Incremental Static Regeneration',
      icon: '🔄',
      gradient: 'from-purple-500/15 to-pink-500/5',
      border: 'border-purple-500/30',
      text: 'text-purple-300',
      analogy: 'Jelo sa pulta, kuvar pravi novo svakih 30 minuta',
      when: 'Cene, katalog, stranice koje se menjaju povremeno',
      how: 'SSG + automatsko osvežavanje na definisan interval (revalidate).',
      example: 'Blog sa novim postom svakog dana — stranica se osveži svakih sat vremena',
      pros: ['Brzina SSG-a', 'Relativno sveži podaci', 'Dobar SEO'],
      cons: ['Podaci nisu real-time', 'Kompleksnost keširanje'],
    },
  ];

  const activeStrategyData = strategies.find((s) => s.id === activeStrategy);

  return (
    <div className="max-w-4xl mx-auto space-y-10">
      <div className="animate-fade-in-up">
        <span className="section-header-blue">Učenje</span>
        <h1 className="text-3xl font-bold text-white mt-3 mb-2">Frontend detaljno</h1>
        <p className="text-slate-400">
          React, Next.js, Tailwind CSS, i najvažnije — rendering strategije (SSR, CSR, SSG, ISR).
        </p>
      </div>

      {/* React osnove */}
      <section className="space-y-4">
        <h2 className="text-xl font-semibold"><span className="text-gradient-blue inline-block">React — Komponente</span></h2>
        <p className="text-slate-400">
          React razlaže UI na male, samostalne celine — komponente. Svaka komponenta ima svoj izgled (JSX) i ponašanje (state, events).
        </p>
        <CodeBlock
          language="tsx"
          filename="components/ui/Button.tsx"
          code={`function Button({ children, onClick, variant = "primary" }) {
  return (
    <button
      onClick={onClick}
      className={\`px-4 py-2 rounded-lg \${
        variant === "primary" ? "bg-blue-600" : "bg-gray-700"
      }\`}
    >
      {children}
    </button>
  );
}

// Korišćenje:
<Button onClick={() => alert("Klik!")} variant="primary">
  Sačuvaj
</Button>`}
        />
      </section>

      <div className="divider-gradient" />

      {/* Hooks */}
      <section className="space-y-4">
        <h2 className="text-xl font-semibold"><span className="text-gradient-purple inline-block">React Hooks</span></h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-5 rounded-2xl bg-gradient-to-br from-blue-500/15 to-indigo-500/5 border border-blue-500/20">
            <h3 className="font-semibold text-blue-300 mb-2">useState</h3>
            <p className="text-sm text-slate-400 mb-3">Čuva stanje komponente (podaci koji se menjaju).</p>
            <CodeBlock code={`const [count, setCount] = useState(0);\n// count = trenutna vrednost\n// setCount = funkcija za promenu`} language="tsx" />
          </div>
          <div className="p-5 rounded-2xl bg-gradient-to-br from-emerald-500/15 to-teal-500/5 border border-emerald-500/20">
            <h3 className="font-semibold text-emerald-300 mb-2">useEffect</h3>
            <p className="text-sm text-slate-400 mb-3">Izvršava kod kada se komponenta učita ili promeni.</p>
            <CodeBlock code={`useEffect(() => {\n  fetchClients(); // pozovi API\n}, []); // [] = samo jednom`} language="tsx" />
          </div>
        </div>
      </section>

      <div className="divider-gradient" />

      {/* Rendering strategies */}
      <section className="space-y-6">
        <h2 className="text-xl font-semibold"><span className="text-gradient-green inline-block">Rendering strategije (SSR / CSR / SSG / ISR)</span></h2>
        <p className="text-slate-400">
          Ovo je jedna od najvažnijih Next.js tema. Četiri načina da se stranica renderuje — svaki ima svoje prednosti.
          Klikni na strategiju za detalje.
        </p>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {strategies.map((s) => (
            <button
              key={s.id}
              onClick={() => setActiveStrategy(activeStrategy === s.id ? null : s.id)}
              className={`p-4 rounded-2xl border text-center transition-all hover:-translate-y-0.5 ${
                activeStrategy === s.id
                  ? `bg-gradient-to-br ${s.gradient} ${s.border} shadow-lg`
                  : 'bg-slate-800/50 border-slate-700/30 hover:border-slate-600/50'
              }`}
            >
              <span className="text-3xl block mb-2">{s.icon}</span>
              <span className={`font-bold ${activeStrategy === s.id ? s.text : 'text-slate-200'}`}>{s.name}</span>
              <p className="text-xs text-slate-500 mt-1">{s.fullName}</p>
            </button>
          ))}
        </div>

        {activeStrategyData && (
          <div className={`p-6 rounded-2xl bg-gradient-to-br ${activeStrategyData.gradient} border ${activeStrategyData.border} space-y-4 animate-fade-in`}>
            <h3 className={`text-xl font-semibold ${activeStrategyData.text}`}>
              {activeStrategyData.icon} {activeStrategyData.fullName}
            </h3>
            <div className="callout callout-blue">
              <p className="text-sm text-blue-300 font-semibold">Analogija:</p>
              <p className="text-slate-200">{activeStrategyData.analogy}</p>
            </div>
            <div>
              <p className="text-sm text-slate-500 font-medium">Kako radi:</p>
              <p className="text-slate-300">{activeStrategyData.how}</p>
            </div>
            <div>
              <p className="text-sm text-slate-500 font-medium">Kada koristiti:</p>
              <p className="text-slate-300">{activeStrategyData.when}</p>
            </div>
            <div>
              <p className="text-sm text-slate-500 font-medium">Primer:</p>
              <p className="text-slate-300">{activeStrategyData.example}</p>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/20">
                <p className="text-sm text-emerald-300 font-semibold mb-2">Prednosti:</p>
                <ul className="space-y-1">
                  {activeStrategyData.pros.map((p, i) => (
                    <li key={i} className="text-sm text-slate-300 flex items-start gap-2">
                      <span className="text-emerald-400">+</span> {p}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="p-3 rounded-xl bg-red-500/10 border border-red-500/20">
                <p className="text-sm text-red-300 font-semibold mb-2">Mane:</p>
                <ul className="space-y-1">
                  {activeStrategyData.cons.map((c, i) => (
                    <li key={i} className="text-sm text-slate-300 flex items-start gap-2">
                      <span className="text-red-400">-</span> {c}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        )}

        {/* Comparison table */}
        <div className="overflow-x-auto rounded-2xl border border-slate-700/30">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-slate-800/80">
                <th className="text-left py-3 px-4 text-slate-400 font-medium">Kriterijum</th>
                <th className="text-center py-3 px-4 text-blue-300 font-medium">CSR</th>
                <th className="text-center py-3 px-4 text-emerald-300 font-medium">SSR</th>
                <th className="text-center py-3 px-4 text-amber-300 font-medium">SSG</th>
                <th className="text-center py-3 px-4 text-purple-300 font-medium">ISR</th>
              </tr>
            </thead>
            <tbody className="text-slate-400">
              <tr className="border-t border-slate-700/30 hover:bg-slate-800/30">
                <td className="py-3 px-4 text-slate-300">Brzina</td>
                <td className="text-center py-3 px-4">⭐⭐</td>
                <td className="text-center py-3 px-4">⭐⭐⭐</td>
                <td className="text-center py-3 px-4">⭐⭐⭐⭐⭐</td>
                <td className="text-center py-3 px-4">⭐⭐⭐⭐</td>
              </tr>
              <tr className="border-t border-slate-700/30 hover:bg-slate-800/30">
                <td className="py-3 px-4 text-slate-300">SEO</td>
                <td className="text-center py-3 px-4">⭐</td>
                <td className="text-center py-3 px-4">⭐⭐⭐⭐⭐</td>
                <td className="text-center py-3 px-4">⭐⭐⭐⭐⭐</td>
                <td className="text-center py-3 px-4">⭐⭐⭐⭐</td>
              </tr>
              <tr className="border-t border-slate-700/30 hover:bg-slate-800/30">
                <td className="py-3 px-4 text-slate-300">Svežina podataka</td>
                <td className="text-center py-3 px-4">⭐⭐⭐⭐⭐</td>
                <td className="text-center py-3 px-4">⭐⭐⭐⭐⭐</td>
                <td className="text-center py-3 px-4">⭐</td>
                <td className="text-center py-3 px-4">⭐⭐⭐</td>
              </tr>
              <tr className="border-t border-slate-700/30 hover:bg-slate-800/30">
                <td className="py-3 px-4 text-slate-300">Serversko opterećenje</td>
                <td className="text-center py-3 px-4">⭐⭐⭐⭐⭐</td>
                <td className="text-center py-3 px-4">⭐⭐</td>
                <td className="text-center py-3 px-4">⭐⭐⭐⭐⭐</td>
                <td className="text-center py-3 px-4">⭐⭐⭐⭐</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      <div className="divider-gradient" />

      {/* Tailwind */}
      <section className="space-y-4">
        <h2 className="text-xl font-semibold"><span className="text-gradient-blue inline-block">Tailwind CSS — Utility-first</span></h2>
        <p className="text-slate-400">
          Umesto pisanja CSS pravila u posebnom fajlu, Tailwind daje gotove klase koje kačiš direktno na elemente.
        </p>
        <CodeBlock
          language="html"
          code={`<!-- Bez Tailwinda (vanilla CSS) -->
<div class="card">
  <h2 class="card-title">Naslov</h2>
</div>
<!-- + 15 linija CSS-a u posebnom fajlu -->

<!-- Sa Tailwindom -->
<div class="p-4 bg-gray-900 border border-gray-800 rounded-xl">
  <h2 class="text-lg font-semibold text-white">Naslov</h2>
</div>
<!-- CSS? Nema ga. Sve je u klasama. -->`}
        />
      </section>
    </div>
  );
}
