import { QuizData } from '@/components/learn/QuizQuestion';

export const SCENARIOS: QuizData[] = [
  {
    id: 'q1',
    situation: 'Menadžer ti kaže: "Trebamo dodati mogućnost da korisnik menja svoju profilnu sliku."',
    question: 'Šta je tvoj prvi korak?',
    options: [
      { text: 'Pokreni /start-feature da planner napravi plan', correct: true, explanation: 'Tačno! Svaki feature počinje planom. Planner analizira zahtev, predlaže implementaciju, i student odobrava pre pisanja koda.' },
      { text: 'Odmah počni da pišeš kod za upload slike', correct: false, explanation: 'Nikad ne počinji kodiranje bez plana. Možda postoje pitanja — gde se čuva slika? Koji formati? Max veličina?' },
      { text: 'Pošalji email sa procenom vremena', correct: false, explanation: 'Procena je korisna, ali pre toga ti treba plan da razumeš šta tačno treba uraditi.' },
      { text: 'Napravi novu tabelu u bazi za slike', correct: false, explanation: 'Baza je deo rešenja, ali bez plana ne znaš da li ti treba zasebna tabela ili samo kolona u postojećoj.' },
    ],
  },
  {
    id: 'q2',
    situation: 'Napisao/la si kod za nov endpoint. Spremaš se da commituješ.',
    question: 'Šta radiš PRE commit-a?',
    options: [
      { text: 'git add . && git commit && git push', correct: false, explanation: 'Nikad ne commituj bez review-a! Možeš imati console.log, sigurnosni propust, ili anti-pattern.' },
      { text: 'Pokreni /review da code-reviewer pregleda kod', correct: true, explanation: 'Tačno! /review proverava kvalitet, čitljivost, i uslovno pokreće security i performance audit.' },
      { text: 'Samo pokreni testove i commituj', correct: false, explanation: 'Testovi su bitni, ali code review proverava stvari koje testovi ne mogu — čitljivost, konvencije, sigurnost.' },
      { text: 'Pošalji kod kolegi na review putem email-a', correct: false, explanation: '/review automatizuje code review — brže, doslednije, i ne zavisi od dostupnosti kolege.' },
    ],
  },
  {
    id: 'q3',
    situation: 'Testovi su prošli, review je OK. Spreman/na si za commit i PR.',
    question: 'Koju komandu koristiš?',
    options: [
      { text: '/ship', correct: true, explanation: 'Tačno! /ship pokreće ceo pipeline: verifikacija → commit → push → PR. Sve u jednom.' },
      { text: 'git commit -m "fix stuff"', correct: false, explanation: 'Commit poruka ne prati Conventional Commits format. /ship automatski formatira poruku.' },
      { text: 'git push --force origin main', correct: false, explanation: 'NIKAD push --force na main! I nikad push direktno na main — uvek kroz PR.' },
      { text: '/start-feature opet', correct: false, explanation: '/start-feature je za NOVI feature, ne za završavanje postojećeg.' },
    ],
  },
  {
    id: 'q4',
    situation: 'Korisnik prijavi: "Login ne radi, dobijem beli ekran."',
    question: 'Šta je tvoj pristup?',
    options: [
      { text: 'Dodaj try-catch svuda u login kod', correct: false, explanation: 'Nasumično dodavanje try-catch ne rešava problem — moraš prvo naći uzrok.' },
      { text: 'Pokreni /debug "login ne radi, beli ekran"', correct: true, explanation: 'Tačno! Debugger sistematski prolazi 5 faza: reproduce → isolate → identify → propose → verify.' },
      { text: 'Obriši login stranicu i napravi novu', correct: false, explanation: 'Prepisivanje celog koda je nuklearna opcija. Gotovo uvek postoji specifičan bug koji se može popraviti.' },
      { text: 'Reci korisniku da očisti keš', correct: false, explanation: 'Možda pomogne, ali ne rešava pravi problem. Ako je bug u kodu, vratiće se.' },
    ],
  },
  {
    id: 'q5',
    situation: 'Treba nova tabela u bazi podataka za čuvanje komentara na servisne naloge.',
    question: 'Kako dodaješ novu tabelu?',
    options: [
      { text: 'Napiši SQL ručno: CREATE TABLE comments...', correct: false, explanation: 'Nikad ručni SQL za šemu baze. Koristi Sequelize migracije da promene budu verzionisane i ponovljive.' },
      { text: 'Dodaj sequelize.sync({ force: true }) da se sve osveži', correct: false, explanation: 'NIKAD sync force — briše SVE podatke! Ovo je zabranjeno u CLAUDE.md.' },
      { text: 'Kreiraj novu Sequelize migraciju i model', correct: true, explanation: 'Tačno! npx sequelize-cli migration:generate i model:generate. Migracije su verzionisanje baze — svaka promena ima svoju migraciju.' },
      { text: 'Edituj postojeću migraciju da dodaš tabelu', correct: false, explanation: 'Nikad menjati migraciju koja je već pokrenuta! Napiši NOVU migraciju.' },
    ],
  },
  {
    id: 'q6',
    situation: 'Dodao/la si novi npm paket za date formatting. Gde ga instaliraš?',
    question: 'U koji package.json ide novi paket?',
    options: [
      { text: 'Root package.json (zajednički)', correct: false, explanation: 'Nema root package.json! Frontend i backend su odvojeni projekti, svaki sa svojim zavisnostima.' },
      { text: 'U frontend/package.json jer se datumi prikazuju na UI-u', correct: true, explanation: 'Tačno! Paket za date formatting se koristi na frontendu, pa ide u frontend/package.json.' },
      { text: 'U oba — i frontend i backend', correct: false, explanation: 'Instaliraj samo tamo gde se koristi. Dupliranje zavisnosti je anti-pattern.' },
      { text: 'Svejedno, bitno je da radi', correct: false, explanation: 'NIJE svejedno. Mešanje zavisnosti pravi probleme sa build-om, deploy-em i veličinom bundle-a.' },
    ],
  },
  {
    id: 'q7',
    situation: 'Test pada: "expected status 200, got 401". Prethodno je prolazio.',
    question: 'Šta radiš?',
    options: [
      { text: 'Promeni test da očekuje 401 umesto 200', correct: false, explanation: 'NIKAD menjati očekivanu vrednost testa! Test je istina — popravi KOD, ne test.' },
      { text: 'Obriši taj test', correct: false, explanation: 'NIKAD brisati test da bi kod prošao! To je maskiranje baga.' },
      { text: 'Istraži zašto se status promenio — debug', correct: true, explanation: 'Tačno! 401 = Unauthorized. Verovatno je promenjen auth middleware ili token format. Nađi pravi uzrok.' },
      { text: 'Dodaj --skip flag za taj test', correct: false, explanation: 'Preskakanje testa samo sakriva problem. Bug i dalje postoji u kodu.' },
    ],
  },
  {
    id: 'q8',
    situation: 'Imaš .env fajl sa JWT_SECRET i DB_PASS. Commituješ kod.',
    question: 'Šta moraš proveriti?',
    options: [
      { text: 'Da je .env u .gitignore (da se NE commituje)', correct: true, explanation: 'Tačno! .env NIKAD ne ide u git. Sadrži tajne podatke. Samo .env.example (bez pravih vrednosti) se commituje.' },
      { text: 'Da su lozinke dovoljno jake', correct: false, explanation: 'Jake lozinke su bitne, ali ključno je da se UOPŠTE ne commituju. .env mora biti u .gitignore.' },
      { text: 'Da baza radi pre commit-a', correct: false, explanation: 'Baza ne mora raditi za commit. Ali .env u gitu = sigurnosni propust!' },
      { text: 'Ništa posebno, samo commituj', correct: false, explanation: 'Commitovanje .env fajla je ozbiljan sigurnosni propust. Tajne podatke nikad ne stavljaj u git.' },
    ],
  },
  {
    id: 'q9',
    situation: 'Kolega ti pošalje kod u kojem piše: response.json({ error: err.stack })',
    question: 'Šta je problem?',
    options: [
      { text: 'Nema problema, stack trace je koristan za debugging', correct: false, explanation: 'Stack trace je koristan u DEVELOPMENT-u, ali u produkciji otkriva unutrašnju strukturu aplikacije napadaču!' },
      { text: 'Stack trace se šalje korisniku — sigurnosni rizik u produkciji', correct: true, explanation: 'Tačno! U produkciji korisnik treba da vidi "Došlo je do greške", ne tehničke detalje. Error handler razlikuje dev/prod mode.' },
      { text: 'Treba koristiti res.send umesto res.json', correct: false, explanation: 'json vs send nije problem. Problem je što se stack trace šalje korisniku umesto da se loguje interno.' },
      { text: 'Nedostaje status kod', correct: false, explanation: 'Status kod jeste bitan, ali glavni problem je izlaganje stack trace-a korisniku.' },
    ],
  },
  {
    id: 'q10',
    situation: 'Tvoj list endpoint vraća 10.000 stavki odjednom. Stranica se učitava 15 sekundi.',
    question: 'Kako rešavaš ovaj problem?',
    options: [
      { text: 'Dodaj paginaciju — vraćaj po 20 stavki po stranici', correct: true, explanation: 'Tačno! Svaki list endpoint MORA imati paginaciju. ?page=1&limit=20. To je standard definisan u CLAUDE.md.' },
      { text: 'Kupi brži server', correct: false, explanation: 'Brži server ne rešava arhitektonski problem. Paginacija je pravilno rešenje bez obzira na hardware.' },
      { text: 'Dodaj loading spinner da korisnik čeka', correct: false, explanation: 'Spinner poboljšava UX ali ne rešava problem. 15 sekundi je predugo. Paginacija smanjuje na < 1 sekundu.' },
      { text: 'Keširaj podatke u browser', correct: false, explanation: 'Keširanje pomaže za ponovne zahteve, ali prvi put i dalje traje 15 sekundi. Paginacija je pravo rešenje.' },
    ],
  },
  {
    id: 'q11',
    situation: 'Trebaš da obrišeš korisnika iz baze. Koristite Sequelize sa paranoid: true.',
    question: 'Šta se dešava kada pozoveš User.destroy()?',
    options: [
      { text: 'Korisnik se fizički briše iz baze (DELETE FROM users...)', correct: false, explanation: 'Sa paranoid: true, Sequelize NE briše red. Samo postavlja deleted_at timestamp.' },
      { text: 'Sequelize postavlja deleted_at timestamp (soft delete)', correct: true, explanation: 'Tačno! Paranoid mode = soft delete. Red ostaje u bazi ali sa deleted_at datumom. Svi budući upiti ga automatski preskaču.' },
      { text: 'Javlja grešku jer brisanje nije dozvoljeno', correct: false, explanation: 'Paranoid ne zabranjuje brisanje — samo ga pretvara u soft delete.' },
      { text: 'Briše korisnika i sve povezane podatke (cascade)', correct: false, explanation: 'Paranoid nema veze sa cascade. Soft delete samo stavlja timestamp, ne briše ništa.' },
    ],
  },
  {
    id: 'q12',
    situation: 'Na frontendu trebaš da dohvatiš listu klijenata sa backend API-ja.',
    question: 'Kako pravilno dohvataš podatke?',
    options: [
      { text: 'fetch("http://localhost:5000/api/v1/clients") u komponenti', correct: false, explanation: 'Nikad hardkodovati URL. Koristimo centralnu axios instancu iz lib/api.js sa env varijablom za URL.' },
      { text: 'import axios from "axios" i pozovi direktno', correct: false, explanation: 'Nikad importovati axios direktno u komponente! Koristimo lib/api.js instancu koja ima interceptore za auth.' },
      { text: 'Koristiti centralnu axios instancu iz lib/api.js', correct: true, explanation: 'Tačno! lib/api.js ima konfigurisan baseURL, auth interceptor (dodaje token), i error interceptor (hendluje 401).' },
      { text: 'Koristiti jQuery $.ajax()', correct: false, explanation: 'jQuery se ne koristi u React ekosistemu. Koristimo axios sa interceptorima.' },
    ],
  },
  {
    id: 'q13',
    situation: 'Implementiraš login stranicu. Gde čuvaš JWT token posle uspešnog logina?',
    question: 'Gde se čuva token?',
    options: [
      { text: 'U localStorage + cookie sync za Next.js middleware', correct: true, explanation: 'Tačno! Token u localStorage za API pozive, sinhronizovan u cookie za Next.js middleware (server-side route protection).' },
      { text: 'U globalnoj JavaScript varijabli', correct: false, explanation: 'Globalna varijabla se gubi pri refresh-u stranice. Token mora preživeti refresh.' },
      { text: 'U URL parametru (?token=...)', correct: false, explanation: 'NIKAD token u URL-u! Vidljiv je u browser historiji, logovima, i referer header-ima.' },
      { text: 'U bazi podataka na frontendu', correct: false, explanation: 'Frontend nema bazu podataka. localStorage ili sessionStorage su opcije za browser.' },
    ],
  },
  {
    id: 'q14',
    situation: 'Pravio/la si feature granu "feature/user-profile". Završio/la si. Šta sad?',
    question: 'Kako šalješ kod u develop granu?',
    options: [
      { text: 'git checkout main && git merge feature/user-profile', correct: false, explanation: 'Nikad merge direktno u main! I nikad bez PR-a i review-a.' },
      { text: 'git push --force origin develop', correct: false, explanation: 'NIKAD --force push! Može obrisati tuđe promene.' },
      { text: 'Napravi Pull Request iz feature/user-profile u develop', correct: true, explanation: 'Tačno! PR omogućava code review pre merge-a. Kolege pregledaju, komentarišu, i odobravaju.' },
      { text: 'Kopiraj fajlove ručno u develop granu', correct: false, explanation: 'Ručno kopiranje je potpuno pogrešno. Git merge/PR hendluje spajanje koda automatski.' },
    ],
  },
  {
    id: 'q15',
    situation: 'Praviš komponentu za prikaz liste servisnih naloga. Lista može biti prazna.',
    question: 'Koja stanja moraš pokriti u komponenti?',
    options: [
      { text: 'Samo prikaz liste — ako je prazna, ništa se ne prikazuje', correct: false, explanation: 'Korisnik ne zna da li se stranica još učitava ili nema podataka. Sva 3 stanja su obavezna.' },
      { text: 'Loading (učitavanje), Error (greška), Empty (prazno) + Data (podaci)', correct: true, explanation: 'Tačno! Svaka stranica koja dohvata podatke MORA imati: Loading spinner, Error poruku, Empty state ("Nema naloga"), i prikaz podataka.' },
      { text: 'Loading i Data — greške hendluje error.tsx', correct: false, explanation: 'error.tsx hvata NEOČEKIVANE greške. Ali API greške (npr. 403) trebaš hendlovati u komponenti sa user-friendly porukom.' },
      { text: 'Samo Data i Error', correct: false, explanation: 'Bez Loading stanja korisnik vidi prazan ekran dok se podaci učitavaju — loš UX.' },
    ],
  },
];
