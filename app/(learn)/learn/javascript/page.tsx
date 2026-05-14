'use client';

import React, { useEffect } from 'react';
import CodeBlock from '@/components/learn/CodeBlock';
import { markCompleted } from '@/lib/store';

export default function JavaScriptPage() {
  useEffect(() => {
    markCompleted('javascript');
  }, []);

  return (
    <div className="max-w-4xl mx-auto space-y-10">
      <div className="animate-fade-in-up">
        <span className="section-header-blue">Učenje</span>
        <h1 className="text-3xl font-bold text-white mt-3 mb-2">JavaScript osnove</h1>
        <p className="text-slate-400">
          JavaScript je jezik koji pokreće i frontend i backend u našem projektu.
          Evo ključnih koncepata koje trebaš razumeti.
        </p>
      </div>

      {/* Level 1 - Osnove */}
      <section className="space-y-4">
        <h2 className="text-xl font-semibold"><span className="text-gradient-blue inline-block">Nivo 1: Osnove</span></h2>

        <div className="p-5 rounded-2xl bg-gradient-to-br from-blue-500/10 to-indigo-500/5 border border-slate-700/30 space-y-3">
          <h3 className="font-semibold text-white">Varijable</h3>
          <p className="text-sm text-slate-400">
            Varijabla je kao kutija sa etiketom — čuva neku vrednost pod određenim imenom.
          </p>
          <CodeBlock
            language="javascript"
            code={`const name = "Marko";        // ne menja se (konstanta)
let age = 25;               // može se menjati
let isAdmin = false;         // boolean (true/false)

age = 26;                   // OK — let dozvoljava promenu
// name = "Ana";            // GREŠKA — const ne dozvoljava`}
          />
        </div>

        <div className="p-5 rounded-2xl bg-gradient-to-br from-purple-500/10 to-pink-500/5 border border-slate-700/30 space-y-3">
          <h3 className="font-semibold text-white">Funkcije</h3>
          <p className="text-sm text-slate-400">
            Funkcija je komad koda koji radi nešto specifično. Zoveš je kad ti zatreba.
          </p>
          <CodeBlock
            language="javascript"
            code={`// Obična funkcija
function pozdrav(ime) {
  return "Zdravo, " + ime + "!";
}

// Arrow funkcija (moderna sintaksa)
const pozdrav2 = (ime) => \`Zdravo, \${ime}!\`;

console.log(pozdrav("Marko"));   // "Zdravo, Marko!"
console.log(pozdrav2("Ana"));    // "Zdravo, Ana!"`}
          />
        </div>

        <div className="p-5 rounded-2xl bg-gradient-to-br from-emerald-500/10 to-teal-500/5 border border-slate-700/30 space-y-3">
          <h3 className="font-semibold text-white">If / Else</h3>
          <CodeBlock
            language="javascript"
            code={`const role = "admin";

if (role === "admin") {
  console.log("Imaš sve dozvole");
} else if (role === "worker") {
  console.log("Imaš ograničene dozvole");
} else {
  console.log("Nemaš pristup");
}`}
          />
        </div>
      </section>

      <div className="divider-gradient" />

      {/* Level 2 - Nizovi i Objekti */}
      <section className="space-y-4">
        <h2 className="text-xl font-semibold"><span className="text-gradient-purple inline-block">Nivo 2: Nizovi i objekti</span></h2>

        <div className="p-5 rounded-2xl bg-gradient-to-br from-amber-500/10 to-orange-500/5 border border-slate-700/30 space-y-3">
          <h3 className="font-semibold text-white">Nizovi (Arrays)</h3>
          <p className="text-sm text-slate-400">
            Niz je lista stvari — kao spisak za kupovinu.
          </p>
          <CodeBlock
            language="javascript"
            code={`const clients = ["Marko", "Ana", "Nikola"];

// Dodaj na kraj
clients.push("Jelena");

// Filtriraj
const saA = clients.filter(c => c.startsWith("A")); // ["Ana"]

// Map — transformiši svaki element
const velika = clients.map(c => c.toUpperCase());
// ["MARKO", "ANA", "NIKOLA", "JELENA"]

// Find — nađi prvi koji zadovoljava uslov
const nadjen = clients.find(c => c === "Ana"); // "Ana"`}
          />
        </div>

        <div className="p-5 rounded-2xl bg-gradient-to-br from-cyan-500/10 to-blue-500/5 border border-slate-700/30 space-y-3">
          <h3 className="font-semibold text-white">Objekti</h3>
          <p className="text-sm text-slate-400">
            Objekat je kolekcija podataka — kao profil korisnika sa različitim poljima.
          </p>
          <CodeBlock
            language="javascript"
            code={`const client = {
  name: "Marko Petrović",
  email: "marko@gmail.com",
  type: "b2c",
  vehicles: ["Golf 7", "Octavia"]
};

// Pristup polju
console.log(client.name);       // "Marko Petrović"
console.log(client["email"]);   // "marko@gmail.com"

// Destrukturiranje (izvlačenje)
const { name, email } = client;
console.log(name);              // "Marko Petrović"`}
          />
        </div>
      </section>

      <div className="divider-gradient" />

      {/* Level 3 - Async */}
      <section className="space-y-4">
        <h2 className="text-xl font-semibold"><span className="text-gradient-green inline-block">Nivo 3: Asinhroni kod</span></h2>

        <div className="p-5 rounded-2xl bg-gradient-to-br from-rose-500/10 to-pink-500/5 border border-slate-700/30 space-y-3">
          <h3 className="font-semibold text-white">async / await</h3>
          <p className="text-sm text-slate-400">
            Kada tvoj kod treba da čeka na nešto (API odgovor, čitanje fajla) — koristiš async/await.
            Kao da naručiš kafu i čekaš da bude gotova pre nego što nastaviš.
          </p>
          <CodeBlock
            language="javascript"
            code={`// Bez async — kod ne čeka, IDE dalje
fetch("/api/clients");  // ne čeka odgovor!

// Sa async/await — kod čeka odgovor
const getClients = async () => {
  try {
    const response = await fetch("/api/v1/clients");
    const data = await response.json();
    console.log(data);  // tek kad podaci stignu
  } catch (error) {
    console.error("Greška:", error.message);
  }
};`}
          />
        </div>
      </section>

      <div className="divider-gradient" />

      {/* Level 4 - Moduli */}
      <section className="space-y-4">
        <h2 className="text-xl font-semibold"><span className="text-gradient-blue inline-block">Nivo 4: Moduli</span></h2>

        <div className="p-5 rounded-2xl bg-gradient-to-br from-indigo-500/10 to-violet-500/5 border border-slate-700/30 space-y-3">
          <h3 className="font-semibold text-white">import / export</h3>
          <p className="text-sm text-slate-400">
            Moduli ti dozvoljavaju da podelite kod u više fajlova i koristiš delove iz jednog fajla u drugom.
          </p>
          <CodeBlock
            language="javascript"
            filename="utils/helpers.js"
            code={`// Named export — možeš imati više u jednom fajlu
export function formatDate(date) { ... }
export function generateId() { ... }

// Default export — samo jedan po fajlu
export default function logger(msg) { ... }`}
          />
          <CodeBlock
            language="javascript"
            filename="controllers/userController.js"
            code={`// Importuj named exporte
import { formatDate, generateId } from '../utils/helpers.js';

// Importuj default export
import logger from '../config/logger.js';

// Koristi ih
logger("Korisnik kreiran");
const id = generateId();`}
          />
        </div>
      </section>
    </div>
  );
}
