'use client';

import React, { useEffect } from 'react';
import StepByStep from '@/components/learn/StepByStep';
import { markCompleted } from '@/lib/store';

const requestFlowSteps = [
  {
    title: 'Korisnik klikne "Dodaj klijenta"',
    description: 'Na frontend stranici /clients, korisnik klikne dugme "Dodaj". React otvara modal sa formom za unos podataka (ime, email, telefon).',
    file: 'frontend/app/(dashboard)/clients/page.tsx',
  },
  {
    title: 'Korisnik popuni formu i klikne "Sačuvaj"',
    description: 'React prikuplja podatke iz forme i poziva axios instancu da pošalje POST zahtev na backend.',
    file: 'frontend/lib/api.js',
    code: 'const response = await api.post("/clients", { name, email, phone });',
  },
  {
    title: 'Axios interceptor dodaje token',
    description: 'Pre slanja zahteva, axios request interceptor automatski dodaje JWT token iz localStorage u Authorization header. Ovo se dešava automatski — developer ne mora ručno da dodaje token.',
    file: 'frontend/lib/api.js',
    code: 'config.headers.Authorization = `Bearer ${token}`;',
  },
  {
    title: 'Express prima zahtev',
    description: 'Backend (Express server na portu 5000) prima HTTP POST zahtev. Zahtev prolazi kroz middleware lanac: Helmet → CORS → JSON parser → Logger → Rate limiter.',
    file: 'backend/app.js',
  },
  {
    title: 'Auth middleware proverava token',
    description: 'authMiddleware čita Authorization header, verifikuje JWT token, i iz tokena izvlači podatke o korisniku (ko je, koja rola). Ako token ne postoji ili je istekao — vraća 401.',
    file: 'backend/middlewares/authMiddleware.js',
    code: 'const decoded = jwt.verify(token, process.env.JWT_SECRET);',
  },
  {
    title: 'Router usmerava na controller',
    description: 'Express router prepoznaje PUT /clients i poziva odgovarajuću controller funkciju: clientController.create.',
    file: 'backend/routes/clientRoutes.js',
    code: 'router.post("/", authMiddleware, validate(createClientRules), clientController.create);',
  },
  {
    title: 'Validacija ulaznih podataka',
    description: 'express-validator proverava da li su podaci ispravni: da li je email validan format, da li ime nije prazno, da li telefon ima pravilan format. Ako validacija ne prođe — vraća 400 sa listom grešaka.',
    file: 'backend/routes/clientRoutes.js',
  },
  {
    title: 'Controller obrađuje zahtev',
    description: 'Controller prima validirane podatke i koristi Sequelize model da kreira novog klijenta u bazi. Poziva Client.create() sa podacima iz request body-ja.',
    file: 'backend/controllers/clientController.js',
    code: 'const client = await Client.create({ name, email, phone, type });',
  },
  {
    title: 'Sequelize šalje SQL u MySQL',
    description: 'Sequelize prevodi JavaScript poziv u SQL upit: INSERT INTO clients (name, email, phone, type, created_at, updated_at) VALUES (...)  MySQL izvršava upit i vraća kreiran red.',
    file: 'backend/models/Client.js',
    code: 'INSERT INTO clients (name, email, phone, type, created_at) VALUES ("Marko", "marko@gmail.com", "065-111-2233", "b2c", NOW())',
  },
  {
    title: 'Response putuje nazad',
    description: 'Controller šalje response kroz responseHelper: sendSuccess(res, client, "Klijent uspešno kreiran", 201). Express šalje HTTP response sa statusom 201 i JSON podacima. Axios na frontendu prima response. React ažurira listu klijenata i prikazuje toast: "Klijent uspešno kreiran!"',
    file: 'backend/utils/responseHelper.js',
    code: '{ "success": true, "data": { "id": 6, "name": "Marko", ... }, "message": "Klijent uspešno kreiran" }',
  },
];

export default function RequestFlowPage() {
  useEffect(() => {
    markCompleted('request-flow');
  }, []);

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <div className="animate-fade-in-up">
        <span className="section-header-blue">Učenje</span>
        <h1 className="text-3xl font-bold text-white mt-3 mb-2">Put jednog klika</h1>
        <p className="text-slate-400">
          Prati korak po korak šta se dešava kada korisnik klikne &quot;Dodaj klijenta&quot; — od klika u browseru,
          kroz frontend, backend, sve do baze podataka i nazad.
        </p>
      </div>

      <StepByStep steps={requestFlowSteps} title="10 koraka HTTP zahteva" />

      {/* Summary */}
      <div className="p-6 rounded-2xl bg-gradient-to-br from-indigo-500/10 to-purple-500/5 border border-indigo-500/20">
        <h3 className="text-lg font-semibold text-white mb-4">Rezime toka</h3>
        <div className="flex flex-wrap items-center gap-2 text-sm">
          {['Klik', 'React', 'Axios', 'Express', 'Auth', 'Validator', 'Controller', 'Sequelize', 'MySQL', 'Response'].map((step, i) => (
            <React.Fragment key={step}>
              <span className="px-3 py-1.5 bg-indigo-500/20 text-indigo-300 rounded-xl border border-indigo-500/20 hover:bg-indigo-500/30 transition-colors font-medium">{step}</span>
              {i < 9 && <span className="text-indigo-400/40 animate-pulse">→</span>}
            </React.Fragment>
          ))}
        </div>
      </div>
    </div>
  );
}
