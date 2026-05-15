'use client';

import React, { useEffect, useRef } from 'react';
import CodeBlock from '@/components/learn/CodeBlock';
import FlowDiagram from '@/components/learn/FlowDiagram';
import { markCompleted } from '@/lib/store';

const middlewareChain = [
  { label: 'Helmet', icon: '🛡️', color: 'red' },
  { label: 'CORS', icon: '🌐', color: 'yellow' },
  { label: 'JSON Parser', icon: '📦', color: 'gray' },
  { label: 'Logger', icon: '📝', color: 'blue' },
  { label: 'Rate Limiter', icon: '🚦', color: 'yellow' },
  { label: 'Routes', icon: '🔀', color: 'green' },
  { label: 'Error Handler', icon: '⚠️', color: 'red' },
];

const mvcFlow = [
  { label: 'Route', icon: '🔀', color: 'blue' },
  { label: 'Controller', icon: '🎮', color: 'green' },
  { label: 'Model', icon: '🗃️', color: 'purple' },
];

const MIDDLEWARE_IDS = ['helmet', 'cors', 'json-parser', 'logger', 'rate-limiter', 'routes', 'error-handler'];

export default function BackendPage() {
  const middlewareRefs = useRef<Record<string, HTMLDivElement | null>>({});

  useEffect(() => {
    markCompleted('backend');
  }, []);

  const scrollToMiddleware = (index: number) => {
    const id = MIDDLEWARE_IDS[index];
    if (id && middlewareRefs.current[id]) {
      middlewareRefs.current[id]?.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
      // Flash highlight
      const el = middlewareRefs.current[id];
      if (el) {
        el.classList.add('ring-2', 'ring-indigo-400/60');
        setTimeout(() => el.classList.remove('ring-2', 'ring-indigo-400/60'), 1500);
      }
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-10">
      <div className="animate-fade-in-up">
        <span className="section-header-blue">Učenje</span>
        <h1 className="text-3xl font-bold text-white mt-3 mb-2">Backend detaljno</h1>
        <p className="text-slate-400">
          Express.js, MVC pattern, Sequelize ORM, migracije, JWT autentifikacija — sve što backend radi pod haubom.
        </p>
      </div>

      {/* Express */}
      <section className="space-y-4">
        <h2 className="text-xl font-semibold"><span className="text-gradient-blue inline-block">Express.js — Web server</span></h2>
        <p className="text-slate-400">
          Express je minimalistički framework koji pravi HTTP server. Prima zahteve, obrađuje ih, i šalje odgovore.
          Cela magija je u <strong className="text-slate-200">middleware</strong> funkcijama — svaki zahtev prolazi kroz lanac funkcija.
        </p>
        <FlowDiagram nodes={middlewareChain} title="Middleware lanac" onNodeClick={scrollToMiddleware} />

        {/* Middleware explanations */}
        <div className="space-y-3">
          <h3 className="text-base font-semibold text-slate-300">Šta radi svaki middleware?</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div ref={(el) => { middlewareRefs.current['helmet'] = el; }} className="p-4 rounded-xl bg-gradient-to-br from-red-500/10 to-red-500/5 border border-red-500/20 transition-all">
              <div className="flex items-center gap-2 mb-2">
                <span>🛡️</span>
                <h4 className="font-semibold text-red-300 text-sm">Helmet</h4>
              </div>
              <p className="text-xs text-slate-400 leading-relaxed">
                Automatski dodaje sigurnosne HTTP header-e na svaki odgovor. Sprečava XSS napade, clickjacking,
                MIME-type sniffing i druge česte napade. Kao zaštitna kaciga za tvoj server.
              </p>
            </div>
            <div ref={(el) => { middlewareRefs.current['cors'] = el; }} className="p-4 rounded-xl bg-gradient-to-br from-yellow-500/10 to-amber-500/5 border border-yellow-500/20 transition-all">
              <div className="flex items-center gap-2 mb-2">
                <span>🌐</span>
                <h4 className="font-semibold text-yellow-300 text-sm">CORS</h4>
              </div>
              <p className="text-xs text-slate-400 leading-relaxed">
                Cross-Origin Resource Sharing — kontroliše ko sme da pristupa tvom API-ju.
                Browser podrazumevano blokira zahteve sa drugih domena. CORS definiše da frontend
                na localhost:3000 sme da pristupi backendu na localhost:5000.
              </p>
            </div>
            <div ref={(el) => { middlewareRefs.current['json-parser'] = el; }} className="p-4 rounded-xl bg-gradient-to-br from-slate-500/10 to-slate-500/5 border border-slate-600/20 transition-all">
              <div className="flex items-center gap-2 mb-2">
                <span>📦</span>
                <h4 className="font-semibold text-slate-300 text-sm">JSON Parser</h4>
              </div>
              <p className="text-xs text-slate-400 leading-relaxed">
                Express sam po sebi ne razume JSON body u zahtevima. <code className="text-blue-400">express.json()</code> parsira
                JSON iz request body-ja i stavlja ga u <code className="text-blue-400">req.body</code> objekat,
                tako da u kontroleru možeš čitati podatke koje je frontend poslao.
              </p>
            </div>
            <div ref={(el) => { middlewareRefs.current['logger'] = el; }} className="p-4 rounded-xl bg-gradient-to-br from-blue-500/10 to-indigo-500/5 border border-blue-500/20 transition-all">
              <div className="flex items-center gap-2 mb-2">
                <span>📝</span>
                <h4 className="font-semibold text-blue-300 text-sm">Logger (Morgan + Winston)</h4>
              </div>
              <p className="text-xs text-slate-400 leading-relaxed">
                Automatski loguje svaki HTTP zahtev — metod, URL, status kod, vreme trajanja.
                Morgan ispisuje u konzoli (dev), Winston čuva u fajlove (produkcija).
                Bez toga ne bi znao šta se dešava na serveru.
              </p>
            </div>
            <div ref={(el) => { middlewareRefs.current['rate-limiter'] = el; }} className="p-4 rounded-xl bg-gradient-to-br from-amber-500/10 to-orange-500/5 border border-amber-500/20 transition-all">
              <div className="flex items-center gap-2 mb-2">
                <span>🚦</span>
                <h4 className="font-semibold text-amber-300 text-sm">Rate Limiter</h4>
              </div>
              <p className="text-xs text-slate-400 leading-relaxed">
                Ograničava broj zahteva po IP adresi — npr. max 100 zahteva po minutu.
                Za login endpoint još strože: 5 pokušaja po minutu. Štiti od brute-force
                napada i sprečava da neko preoptereti server.
              </p>
            </div>
            <div ref={(el) => { middlewareRefs.current['routes'] = el; }} className="p-4 rounded-xl bg-gradient-to-br from-emerald-500/10 to-teal-500/5 border border-emerald-500/20 transition-all">
              <div className="flex items-center gap-2 mb-2">
                <span>🔀</span>
                <h4 className="font-semibold text-emerald-300 text-sm">Routes</h4>
              </div>
              <p className="text-xs text-slate-400 leading-relaxed">
                Definišu koji kod se izvršava za koji URL. <code className="text-blue-400">GET /api/v1/clients</code> poziva
                controller koji vraća listu klijenata. Svaka grupa resursa ima svoj fajl ruta.
              </p>
            </div>
            <div ref={(el) => { middlewareRefs.current['error-handler'] = el; }} className="p-4 rounded-xl sm:col-span-2 bg-gradient-to-br from-red-500/10 to-rose-500/5 border border-red-500/20 transition-all">
              <div className="flex items-center gap-2 mb-2">
                <span>⚠️</span>
                <h4 className="font-semibold text-red-300 text-sm">Error Handler</h4>
              </div>
              <p className="text-xs text-slate-400 leading-relaxed">
                MORA biti poslednji middleware. Hvata sve greške koje nastanu bilo gde u lancu
                i šalje korisniku razumljivu poruku umesto da server "pukne". Loguje grešku kroz Winston,
                u dev modu vraća stack trace, u produkciji samo poruku. Bez njega — beli ekran smrti.
              </p>
            </div>
          </div>
        </div>

        <CodeBlock
          language="javascript"
          filename="app.js"
          code={`const express = require('express');
const app = express();

// Middleware se dodaje redom — zahtev prolazi kroz svaki
app.use(helmet());           // Sigurnosni headeri
app.use(cors(corsConfig));   // CORS pravila
app.use(express.json());     // Parsira JSON body
app.use(requestLogger);      // Loguje svaki zahtev
app.use(rateLimiter);        // Ograničava broj zahteva

// Rute
app.use('/api/v1/auth', authRoutes);
app.use('/api/v1/clients', clientRoutes);

// Error handler (MORA biti poslednji)
app.use(errorHandler);`}
        />
      </section>

      <div className="divider-gradient" />

      {/* MVC */}
      <section className="space-y-4">
        <h2 className="text-xl font-semibold"><span className="text-gradient-purple inline-block">MVC Pattern</span></h2>
        <p className="text-slate-400">
          MVC (Model-View-Controller) razdvaja kod u 3 sloja. Svaki ima svoju odgovornost.
          Nikad ne mešamo — SQL ne ide u controller, response ne ide u model.
        </p>
        <FlowDiagram nodes={mvcFlow} title="Tok zahteva kroz MVC" />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 stagger-children">
          <div className="p-5 rounded-2xl bg-gradient-to-br from-blue-500/15 to-indigo-500/5 border border-blue-500/20 hover:scale-[1.02] transition-transform">
            <h3 className="font-semibold text-blue-300 mb-2">🔀 Route</h3>
            <p className="text-sm text-slate-400">Definiše URL putanje i koji middleware/controller se poziva.</p>
            <p className="text-xs text-slate-600 mt-3 font-mono bg-slate-900/50 px-2 py-1 rounded">routes/clientRoutes.js</p>
          </div>
          <div className="p-5 rounded-2xl bg-gradient-to-br from-emerald-500/15 to-teal-500/5 border border-emerald-500/20 hover:scale-[1.02] transition-transform">
            <h3 className="font-semibold text-emerald-300 mb-2">🎮 Controller</h3>
            <p className="text-sm text-slate-400">Sadrži logiku — prima request, poziva model, šalje response.</p>
            <p className="text-xs text-slate-600 mt-3 font-mono bg-slate-900/50 px-2 py-1 rounded">controllers/clientController.js</p>
          </div>
          <div className="p-5 rounded-2xl bg-gradient-to-br from-purple-500/15 to-pink-500/5 border border-purple-500/20 hover:scale-[1.02] transition-transform">
            <h3 className="font-semibold text-purple-300 mb-2">🗃️ Model</h3>
            <p className="text-sm text-slate-400">Definiše strukturu tabele i komunikaciju sa bazom.</p>
            <p className="text-xs text-slate-600 mt-3 font-mono bg-slate-900/50 px-2 py-1 rounded">models/Client.js</p>
          </div>
        </div>
      </section>

      <div className="divider-gradient" />

      {/* Sequelize */}
      <section className="space-y-4">
        <h2 className="text-xl font-semibold"><span className="text-gradient-green inline-block">Sequelize — ORM</span></h2>
        <p className="text-slate-400">
          ORM (Object-Relational Mapping) ti dozvoljava da radiš sa bazom koristeći JavaScript objekte umesto sirovih SQL upita.
        </p>
        <CodeBlock
          language="javascript"
          filename="models/Client.js"
          code={`module.exports = (sequelize, DataTypes) => {
  const Client = sequelize.define('Client', {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: { notEmpty: true }
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },
    type: {
      type: DataTypes.ENUM('b2c', 'b2b'),
      defaultValue: 'b2c'
    }
  }, {
    timestamps: true,     // created_at, updated_at
    paranoid: true,       // soft delete (deleted_at)
    underscored: true,    // snake_case kolone
    tableName: 'clients'
  });

  return Client;
};`}
        />
      </section>

      <div className="divider-gradient" />

      {/* Migracije */}
      <section className="space-y-4">
        <h2 className="text-xl font-semibold"><span className="text-gradient-blue inline-block">Migracije — verzionisanje baze</span></h2>
        <p className="text-slate-400">
          Migracije su kao Git za bazu podataka. Svaka promena u strukturi baze (nova tabela, nova kolona)
          se zapisuje u migraciju — tako svi u timu imaju istu strukturu baze.
        </p>
        <div className="callout callout-yellow">
          <p className="font-semibold text-amber-300">Zlatno pravilo:</p>
          <p className="text-slate-300 mt-1">NIKAD ne menjaj migraciju koja je već pokrenuta. Uvek piši NOVU migraciju za nove promene.</p>
        </div>
      </section>

      <div className="divider-gradient" />

      {/* JWT */}
      <section className="space-y-4">
        <h2 className="text-xl font-semibold"><span className="text-gradient-purple inline-block">JWT Autentifikacija</span></h2>
        <p className="text-slate-400">
          JWT (JSON Web Token) je kao propusnica na koncertu. Jednom se verifikuješ (login), dobiješ propusnicu (token),
          i pokazuješ je na svakom ulazu bez ponovnog dokazivanja identiteta.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-5 rounded-2xl bg-gradient-to-br from-emerald-500/15 to-teal-500/5 border border-emerald-500/20">
            <h3 className="font-semibold text-emerald-300 mb-2">Access Token</h3>
            <p className="text-sm text-slate-400">Kratkotrajan (15 min). Šalje se sa svakim API zahtevom u Authorization header-u.</p>
          </div>
          <div className="p-5 rounded-2xl bg-gradient-to-br from-blue-500/15 to-indigo-500/5 border border-blue-500/20">
            <h3 className="font-semibold text-blue-300 mb-2">Refresh Token</h3>
            <p className="text-sm text-slate-400">Dugotrajan (7 dana). Koristi se za dobijanje novog access tokena kada stari istekne.</p>
          </div>
        </div>
      </section>
    </div>
  );
}
