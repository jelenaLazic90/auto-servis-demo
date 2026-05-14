'use client';

import React, { useEffect } from 'react';
import InteractiveDiagram from '@/components/learn/InteractiveDiagram';
import { markCompleted } from '@/lib/store';

const restaurantNodes = [
  {
    id: 'guest',
    label: 'Gost',
    icon: '🧑',
    description: 'Gost u restoranu = Korisnik u browseru',
    details: 'Ti otvoriš sajt (sedneš u restoran) i klikneš na "Prikaži klijente" (naručiš jelo). Tvoj browser je tvoj sto u restoranu.',
  },
  {
    id: 'waiter',
    label: 'Konobar',
    icon: '🤵',
    description: 'Konobar = Frontend (React / Next.js)',
    details: 'Frontend ti prikazuje meni (stranicu), prima tvoju narudžbinu (klik na dugme), i nosi je u kuhinju (šalje zahtev na backend). Kada jelo bude gotovo, konobar ti ga donosi (prikazuje podatke).',
  },
  {
    id: 'chef',
    label: 'Kuvar',
    icon: '👨‍🍳',
    description: 'Kuvar = Backend (Express.js)',
    details: 'Backend prima zahtev od frontenda, obrađuje ga (proverava dozvole, validira podatke), izvlači podatke iz baze, i šalje odgovor nazad. Kao kuvar koji čita narudžbinu, priprema jelo, i stavlja ga na pult.',
  },
  {
    id: 'fridge',
    label: 'Hladnjak',
    icon: '🗄️',
    description: 'Hladnjak = Baza podataka (MySQL)',
    details: 'Baza čuva sve podatke — korisnike, vozila, naloge. Kuvar (backend) uzima sastojke (podatke) iz hladnjaka (baze) i pravi jelo (response). Podatke ne čuvaš u kuhinjskim elementima (kod) već u hladnjaku (bazi).',
  },
];

const httpNodes = [
  {
    id: 'request',
    label: 'HTTP Request',
    icon: '📤',
    description: 'Zahtev koji browser šalje serveru',
    details: 'Svaki zahtev ima: METOD (GET, POST, PUT, DELETE), URL (/api/v1/clients), HEADERS (Authorization token), i opciono BODY (podaci za kreiranje/izmenu).',
  },
  {
    id: 'server',
    label: 'Server procesira',
    icon: '⚙️',
    description: 'Express prima zahtev i obrađuje ga kroz middleware lanac',
    details: 'Zahtev prolazi kroz: Helmet (sigurnost) → CORS (dozvole) → JSON parser → Logger (beleženje) → Rate limiter (zaštita) → Auth (provera tokena) → Route → Controller → Model → Response.',
  },
  {
    id: 'response',
    label: 'HTTP Response',
    icon: '📥',
    description: 'Odgovor koji server šalje browseru',
    details: 'Svaki odgovor ima: STATUS KOD (200 OK, 404 Not Found, 500 Error), HEADERS, i BODY (JSON podaci). Frontend čita status kod i prikazuje podatke ili grešku.',
  },
];

const httpMethods = [
  { method: 'GET', desc: 'Dohvati podatke', example: 'GET /api/v1/clients → lista svih klijenata', gradient: 'from-emerald-500/15 to-green-500/5', badgeColor: 'bg-emerald-500/20 text-emerald-300' },
  { method: 'POST', desc: 'Kreiraj novo', example: 'POST /api/v1/clients → kreiraj novog klijenta', gradient: 'from-blue-500/15 to-indigo-500/5', badgeColor: 'bg-blue-500/20 text-blue-300' },
  { method: 'PUT', desc: 'Izmeni postojeće', example: 'PUT /api/v1/clients/5 → izmeni klijenta #5', gradient: 'from-amber-500/15 to-yellow-500/5', badgeColor: 'bg-amber-500/20 text-amber-300' },
  { method: 'DELETE', desc: 'Obriši', example: 'DELETE /api/v1/clients/5 → obriši klijenta #5', gradient: 'from-red-500/15 to-pink-500/5', badgeColor: 'bg-red-500/20 text-red-300' },
];

const statusCodes = [
  { code: '200', label: 'OK', desc: 'Sve radi kako treba', color: 'text-emerald-400', bg: 'bg-emerald-500/10' },
  { code: '201', label: 'Created', desc: 'Uspešno kreiran novi resurs', color: 'text-emerald-400', bg: 'bg-emerald-500/10' },
  { code: '400', label: 'Bad Request', desc: 'Poslati su pogrešni podaci', color: 'text-amber-400', bg: 'bg-amber-500/10' },
  { code: '401', label: 'Unauthorized', desc: 'Nisi prijavljen / nevažeći token', color: 'text-red-400', bg: 'bg-red-500/10' },
  { code: '404', label: 'Not Found', desc: 'Traženi resurs ne postoji', color: 'text-amber-400', bg: 'bg-amber-500/10' },
  { code: '500', label: 'Server Error', desc: 'Nešto je puklo na serveru', color: 'text-red-400', bg: 'bg-red-500/10' },
];

export default function HowWebWorksPage() {
  useEffect(() => {
    markCompleted('how-web-works');
  }, []);

  return (
    <div className="max-w-4xl mx-auto space-y-12">
      <div className="animate-fade-in-up">
        <span className="section-header section-header-blue mb-3">Osnove</span>
        <h1 className="text-3xl font-bold text-white mt-3 mb-2">Kako radi web aplikacija</h1>
        <p className="text-slate-400 text-lg">Razumi osnove kroz analogiju sa restoranom — klikni na svaki deo za objašnjenje.</p>
      </div>

      <hr className="divider-gradient" />

      {/* Restaurant analogy */}
      <section className="space-y-5">
        <h2 className="text-xl font-bold text-gradient-blue inline-block">🍽️ Restoran analogija</h2>
        <p className="text-slate-400">
          Web aplikacija radi kao restoran. Svako ima svoju ulogu. Klikni na svakog &quot;učesnika&quot; da saznaš ko je ko.
        </p>
        <InteractiveDiagram nodes={restaurantNodes} />
      </section>

      {/* HTTP request/response */}
      <section className="space-y-5">
        <h2 className="text-xl font-bold text-gradient-purple inline-block">🔄 HTTP zahtev i odgovor</h2>
        <p className="text-slate-400">
          Svaka komunikacija između frontenda i backenda je HTTP zahtev → odgovor par. Evo kako to izgleda:
        </p>
        <InteractiveDiagram nodes={httpNodes} />
      </section>

      <hr className="divider-gradient" />

      {/* HTTP methods */}
      <section className="space-y-5">
        <h2 className="text-xl font-bold text-gradient-green inline-block">📋 HTTP metode</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 stagger-children">
          {httpMethods.map((m) => (
            <div key={m.method} className={`p-5 rounded-2xl bg-gradient-to-br ${m.gradient} border border-slate-700/30 hover:border-slate-600/50 transition-all hover:-translate-y-1`}>
              <div className="flex items-center gap-3 mb-3">
                <span className={`px-3 py-1 rounded-lg text-xs font-bold ${m.badgeColor}`}>
                  {m.method}
                </span>
                <span className="text-white font-semibold">{m.desc}</span>
              </div>
              <p className="text-sm text-slate-400 font-mono">{m.example}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Status codes */}
      <section className="space-y-5">
        <h2 className="text-xl font-bold text-gradient-warm inline-block">🚦 Status kodovi</h2>
        <p className="text-slate-400">Svaki odgovor sa servera ima status kod koji govori da li je sve OK ili je nešto pošlo po zlu.</p>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 stagger-children">
          {statusCodes.map((s) => (
            <div key={s.code} className={`p-4 rounded-xl ${s.bg} border border-slate-700/20 hover:border-slate-600/40 transition-all`}>
              <div className="flex items-center gap-2">
                <span className={`font-mono font-bold text-lg ${s.color}`}>{s.code}</span>
                <span className="text-slate-300 font-medium">{s.label}</span>
              </div>
              <p className="text-xs text-slate-400 mt-1.5">{s.desc}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
