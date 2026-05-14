'use client';

import React, { useEffect } from 'react';
import FlowDiagram from '@/components/learn/FlowDiagram';
import CodeBlock from '@/components/learn/CodeBlock';
import { markCompleted } from '@/lib/store';

export default function GitPage() {
  useEffect(() => {
    markCompleted('git');
  }, []);

  return (
    <div className="max-w-4xl mx-auto space-y-10">
      <div className="animate-fade-in-up">
        <span className="section-header-blue">Učenje</span>
        <h1 className="text-3xl font-bold text-white mt-3 mb-2">Git & verzionisanje</h1>
        <p className="text-slate-400">
          Git je sistem za verzionisanje koda — kao Ctrl+Z za ceo projekat, ali mnogo moćniji.
        </p>
      </div>

      {/* Šta je Git */}
      <section className="space-y-4">
        <h2 className="text-xl font-semibold"><span className="text-gradient-blue inline-block">Šta je Git?</span></h2>
        <p className="text-slate-400">
          Zamisli da pišeš roman. Svaki dan napišeš novu glavu. Git ti omogućava da:
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 stagger-children">
          <div className="p-5 rounded-2xl bg-gradient-to-br from-blue-500/15 to-indigo-500/5 border border-blue-500/20 hover:-translate-y-0.5 transition-transform">
            <span className="text-2xl">⏪</span>
            <h3 className="font-semibold text-blue-300 mt-2">Vratiš se u prošlost</h3>
            <p className="text-sm text-slate-400 mt-1">Pokvariš nešto? Vrati se na verziju od pre 2 dana.</p>
          </div>
          <div className="p-5 rounded-2xl bg-gradient-to-br from-emerald-500/15 to-teal-500/5 border border-emerald-500/20 hover:-translate-y-0.5 transition-transform">
            <span className="text-2xl">🌿</span>
            <h3 className="font-semibold text-emerald-300 mt-2">Radiš paralelno</h3>
            <p className="text-sm text-slate-400 mt-1">Ti radiš na glavi 5, kolega na glavi 6 — istovremeno, bez konflikta.</p>
          </div>
          <div className="p-5 rounded-2xl bg-gradient-to-br from-purple-500/15 to-pink-500/5 border border-purple-500/20 hover:-translate-y-0.5 transition-transform">
            <span className="text-2xl">👀</span>
            <h3 className="font-semibold text-purple-300 mt-2">Pregledaš promene</h3>
            <p className="text-sm text-slate-400 mt-1">Pre nego što spojiš promene, kolege ih pregledaju (code review).</p>
          </div>
        </div>
      </section>

      <div className="divider-gradient" />

      {/* Git flow */}
      <section className="space-y-4">
        <h2 className="text-xl font-semibold"><span className="text-gradient-purple inline-block">Git tok rada</span></h2>
        <FlowDiagram
          title="Od editovanja do push-a"
          nodes={[
            { label: 'Edituj fajl', icon: '✏️', color: 'gray' },
            { label: 'git add', icon: '📋', color: 'yellow' },
            { label: 'git commit', icon: '💾', color: 'blue' },
            { label: 'git push', icon: '☁️', color: 'green' },
            { label: 'PR / Review', icon: '👀', color: 'purple' },
          ]}
        />
        <div className="space-y-3">
          <div className="p-4 rounded-xl bg-gradient-to-r from-amber-500/10 to-transparent border border-amber-500/20">
            <span className="text-amber-300 font-mono text-sm font-bold">git add</span>
            <span className="text-slate-400 text-sm ml-3">Označava koje fajlove želiš da uključiš u sledeći snimak (staging).</span>
          </div>
          <div className="p-4 rounded-xl bg-gradient-to-r from-blue-500/10 to-transparent border border-blue-500/20">
            <span className="text-blue-300 font-mono text-sm font-bold">git commit</span>
            <span className="text-slate-400 text-sm ml-3">Pravi snimak (snapshot) svih stage-ovanih promena sa porukom šta si uradio.</span>
          </div>
          <div className="p-4 rounded-xl bg-gradient-to-r from-emerald-500/10 to-transparent border border-emerald-500/20">
            <span className="text-emerald-300 font-mono text-sm font-bold">git push</span>
            <span className="text-slate-400 text-sm ml-3">Šalje tvoje commit-e na udaljeni server (GitHub) da ih drugi vide.</span>
          </div>
        </div>
      </section>

      <div className="divider-gradient" />

      {/* Branching */}
      <section className="space-y-4">
        <h2 className="text-xl font-semibold"><span className="text-gradient-green inline-block">Branching — paralelni razvoj</span></h2>
        <p className="text-slate-400">
          Branch (grana) je kopija koda gde možeš slobodno raditi bez da utičeš na glavnu verziju.
        </p>
        <div className="p-5 rounded-2xl bg-gradient-to-br from-slate-800/50 to-slate-900/50 border border-slate-700/30 space-y-3">
          <div className="flex items-center gap-3">
            <span className="px-3 py-1.5 bg-red-500/20 text-red-300 rounded-xl text-sm font-mono font-bold border border-red-500/20">main</span>
            <span className="text-slate-600">←</span>
            <span className="text-slate-400 text-sm">Produkcija. Uvek stabilan. NIKAD direktan push.</span>
          </div>
          <div className="flex items-center gap-3">
            <span className="px-3 py-1.5 bg-blue-500/20 text-blue-300 rounded-xl text-sm font-mono font-bold border border-blue-500/20">develop</span>
            <span className="text-slate-600">←</span>
            <span className="text-slate-400 text-sm">Aktivni razvoj. Ovde se spajaju feature grane.</span>
          </div>
          <div className="flex items-center gap-3">
            <span className="px-3 py-1.5 bg-emerald-500/20 text-emerald-300 rounded-xl text-sm font-mono font-bold border border-emerald-500/20">feature/*</span>
            <span className="text-slate-600">←</span>
            <span className="text-slate-400 text-sm">Nova funkcionalnost. feature/user-auth, feature/dashboard</span>
          </div>
          <div className="flex items-center gap-3">
            <span className="px-3 py-1.5 bg-amber-500/20 text-amber-300 rounded-xl text-sm font-mono font-bold border border-amber-500/20">bugfix/*</span>
            <span className="text-slate-600">←</span>
            <span className="text-slate-400 text-sm">Ispravka baga. bugfix/login-error</span>
          </div>
        </div>
      </section>

      <div className="divider-gradient" />

      {/* Conventional commits */}
      <section className="space-y-4">
        <h2 className="text-xl font-semibold"><span className="text-gradient-blue inline-block">Conventional Commits</span></h2>
        <p className="text-slate-400">Standard format za commit poruke — da svako u timu zna šta se menjalo.</p>
        <CodeBlock
          language="bash"
          code={`feat: add user registration endpoint     # nova funkcionalnost
fix: resolve token expiration bug         # ispravka baga
docs: update API documentation            # dokumentacija
refactor: extract auth middleware          # refaktorisanje
test: add unit tests for user model       # testovi
chore: update dependencies                # održavanje`}
        />
      </section>

      <div className="divider-gradient" />

      {/* Šta NIKAD */}
      <section className="space-y-4">
        <h2 className="text-xl font-semibold text-red-400">Šta NIKAD ne raditi sa Git-om</h2>
        <div className="space-y-2">
          {[
            'NIKAD push direktno na main — uvek kroz PR',
            'NIKAD git push --force — može obrisati tuđe promene',
            'NIKAD git reset --hard sa uncommitted izmenama — gubiš rad',
            'NIKAD preskakati hookove (--no-verify)',
            'NIKAD commitovati .env fajl — sadrži tajne podatke',
          ].map((rule, i) => (
            <div key={i} className="flex items-start gap-3 p-4 rounded-xl bg-gradient-to-r from-red-500/10 to-transparent border border-red-500/20">
              <span className="text-red-400 font-bold">✕</span>
              <span className="text-sm text-slate-300">{rule}</span>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
