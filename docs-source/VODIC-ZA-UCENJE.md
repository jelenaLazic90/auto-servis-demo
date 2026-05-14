# Vodic za ucenje — od pocetnika do programera

> Ovaj dokument je napisan za tebe, na osnovu projekta koji si vec napravila (Auto Servis AI).
> Svaki koncept je objasnjen na primeru iz tvog koda — ne apstraktno.
> Citaj redom, ne preskaci. Svaka sekcija gradi na prethodnoj.

---

## Sadrzaj

1. [Kako uopste radi web aplikacija](#1-kako-uopste-radi-web-aplikacija)
2. [Nas tehnoloski stek — sta je sta i zasto](#2-nas-tehnoloski-stek)
3. [Kako nas projekat radi — put jednog klika](#3-kako-nas-projekat-radi)
4. [JavaScript — jezik koji povezuje sve](#4-javascript)
5. [Backend detaljno — Express, Sequelize, MySQL](#5-backend-detaljno)
6. [Frontend detaljno — React, Next.js, Tailwind](#6-frontend-detaljno)
7. [Redosled ucenja — sta prvo, sta posle](#7-redosled-ucenja)
8. [Vezbe na projektu — probaj sama](#8-vezbe-na-projektu)
9. [Svakodnevni rad programera](#9-svakodnevni-rad-programera)
10. [Resursi — samo najbitnije](#10-resursi)
11. [Poboljsanja v3 — sta smo popravili i zasto](#11-poboljsanja-v3)
12. [Detaljna analiza koda — sigurnosni i kvalitetski audit](#12-detaljna-analiza-koda)

---

## 1. Kako uopste radi web aplikacija

Zamisli restoran:

```
GOST (korisnik)          →  KONOBAR (frontend)      →  KUVAR (backend)       →  HLADNJAK (baza podataka)
Gleda meni, bira jelo       Prima narudzbu,              Prima narudzbu,          Cuva sve sastojke
                             prikazuje je lepo            priprema jelo            (podatke)
```

**Frontend** je ono sto korisnik VIDI — dugmici, forme, tabele, boje. Kao konobar — prima zahteve od gosta i prikazuje rezultate lepo.

**Backend** je ono sto korisnik NE VIDI — logika, pravila, obrada podataka. Kao kuvar — radi posao iza scene.

**Baza podataka** je skladiste gde se cuvaju SVI podaci — korisnici, vozila, narudzbe. Kao hladnjak — cuva sastojke za kuvara.

### Kako komuniciraju?

```
Korisnik klikne "Prijavi se"
        ↓
Frontend salje zahtev na backend: POST /api/v1/auth/login { email, password }
        ↓
Backend proveri: da li korisnik postoji? da li je lozinka tacna?
        ↓
Backend pita bazu: SELECT * FROM users WHERE email = 'admin@autoservis.rs'
        ↓
Baza vraca podatke
        ↓
Backend generise JWT token i salje ga nazad
        ↓
Frontend primi token, sacuva ga, i preusmeri korisnika na dashboard
```

Ova komunikacija se zove **HTTP** — to je jezik kojim frontend i backend pricaju. Svaki zahtev ima:
- **Metod** — GET (daj mi podatke), POST (kreiraj nesto), PUT (izmeni), DELETE (obrisi)
- **URL** — adresa endpointa (npr. `/api/v1/clients`)
- **Body** — podaci koje saljes (npr. email i lozinka)
- **Headers** — dodatne informacije (npr. JWT token za autentifikaciju)

---

## 2. Nas tehnoloski stek

Ovo su SVE tehnologije u projektu. Za svaku cu objasniti: STA je, ZASTO je koristimo, i GDE je u kodu.

### Frontend tehnologije

| Tehnologija | Sta je | Analogija | Gde je u kodu |
|-------------|--------|-----------|---------------|
| **React** | Biblioteka za pravljenje korisnickog interfejsa | Lego kockice — pravis stranicu od manjih delova (komponenti) | Svaki `.tsx` fajl u `frontend/` |
| **Next.js** | Framework koji dodaje React-u supermoce (routing, SSR) | Kuci (React) dodaje krov, vrata, prozore | `frontend/app/` — svaki folder je stranica |
| **Tailwind CSS** | CSS framework — stilizujes pisanjem klasa direktno u HTML | Umesto da pises CSS fajl, pises `className="bg-blue-500 text-white p-4"` | Svaki `className` u komponentama |
| **Axios** | HTTP klijent — salje zahteve na backend | Telefon kojim frontend zove backend | `frontend/lib/api.js` |
| **React Context** | Nacin da delis podatke izmedju komponenti bez propsa | Oglasna tabla u kancelariji — svi vide iste podatke | `frontend/lib/AuthContext.js` |
| **react-hot-toast** | Biblioteka za notifikacije (popup poruke) | One male poruke "Uspesno sacuvano!" ili "Greska!" | Svaki `toast.success()` ili `toast.error()` |

### Backend tehnologije

| Tehnologija | Sta je | Analogija | Gde je u kodu |
|-------------|--------|-----------|---------------|
| **Node.js** | JavaScript runtime — omogucava da JS radi van browsera | Motor koji pokrece backend | Ceo `backend/` folder |
| **Express.js** | Web framework za Node.js — hendluje HTTP zahteve | GPS za zahteve — zna gde koji zahtev treba da ode | `backend/app.js`, `backend/routes/` |
| **Sequelize** | ORM — pises JavaScript umesto SQL-a za rad sa bazom | Prevodilac izmedju JavaScript-a i MySQL-a | `backend/models/`, `backend/migrations/` |
| **MySQL** | Relaciona baza podataka | Excel na steroidima — tabele sa vezama izmedju njih | Baza `auto_servis_dev` |
| **JWT** | JSON Web Token — sistem za autentifikaciju | Propusnica sa rokom trajanja | `backend/utils/tokenHelper.js` |
| **bcryptjs** | Biblioteka za hashovanje lozinki | Masina za seckanje — od lozinke pravi neprepoznatljiv string | `backend/controllers/authController.js` |
| **express-validator** | Validacija ulaznih podataka | Cuvar na ulazu — proverava da li su podaci ispravni | `backend/routes/` (u svakom route fajlu) |
| **Winston** | Logger — beleži sve sto se desava u aplikaciji | Dnevnik dogadjaja | `backend/config/logger.js`, `backend/logs/` |
| **Helmet** | Sigurnosni middleware — dodaje zastite HTTP headerima | Kaciga za server | `backend/app.js` |
| **Swagger** | Automatska API dokumentacija | Meni restorana — lista svih dostupnih "jela" (endpointa) | `http://localhost:5000/api-docs` |

### Alati za razvoj

| Alat | Sta je | Zasto ga koristimo |
|------|--------|---------------------|
| **Git** | Sistem za verzionisanje koda | Cuva istoriju svih promena — mozes se "vratiti u proslost" |
| **npm** | Package manager za Node.js | Instalira biblioteke (kao app store za kod) |
| **Jest** | Testing framework | Pokrece automatizovane testove |
| **Supertest** | Testira API endpointe | Simulira HTTP zahteve u testovima |
| **ESLint** | Linter — pronalazi greske u kodu | Automatski ti kaze "ej, ovo ne valja" |
| **Prettier** | Code formatter | Automatski formatira kod da bude citljiv |
| **nodemon** | Automatski restartuje server kad sacuvas fajl | Ne moras rucno gasiti i paliti server |

---

## 3. Kako nas projekat radi — put jednog klika

Hajde da pratimo STA SE DESAVA kad korisnik klikne "Dodaj klijenta" u nasem projektu:

### Korak po korak:

```
1. KORISNIK klikne dugme "Sacuvaj" na formi za novog klijenta
   → frontend/app/(dashboard)/clients/page.tsx

2. REACT hvata podatke iz forme (ime, prezime, telefon, email...)
   → useState hook cuva podatke forme

3. AXIOS salje POST zahtev na backend
   → frontend/lib/api.js automatski dodaje JWT token u header
   → POST http://localhost:5000/api/v1/clients { first_name: "Marko", ... }

4. EXPRESS prima zahtev i usmerava ga
   → backend/routes/clientRoutes.js → aha, POST /clients, idi na controller

5. MIDDLEWARE se pokrece PRE controllera:
   → authMiddleware.js → da li ima validan token? DA → nastavi
   → express-validator → da li su podaci ispravni? DA → nastavi

6. CONTROLLER izvrsava logiku
   → backend/controllers/clientController.js → Client.create({ first_name: "Marko", ... })

7. SEQUELIZE prevodi na SQL
   → INSERT INTO clients (first_name, ..., created_at) VALUES ("Marko", ..., NOW())

8. MYSQL cuva podatke u tabeli `clients`

9. BACKEND vraca odgovor:
   → { success: true, data: { id: 15, first_name: "Marko", ... }, message: "Klijent kreiran" }

10. FRONTEND prima odgovor:
    → Prikazuje zeleni toast "Klijent uspesno kreiran!"
    → Osvezava listu klijenata
    → Zatvara formu
```

### Vizuelno:

```
[Browser]  →  [Next.js Frontend]  →  [Express Backend]  →  [Sequelize ORM]  →  [MySQL]
  klik          axios POST             route → middleware       JS → SQL            tabela
                                        → controller                               clients
```

**Ovo je OSNOVA svega** — svaka operacija u aplikaciji (dodavanje vozila, promena statusa, brisanje) radi po istom principu. Razlikuju se samo podaci i endpointi.

---

## 4. JavaScript — jezik koji povezuje sve

I frontend i backend koriste **JavaScript** (frontend koristi TypeScript — to je JS sa tipovima, o tome kasnije). Zato je JS najvaznija stvar koju moras da znas.

### Sta MORAS znati iz JS-a (po prioritetu):

#### Nivo 1 — Osnove (bez ovoga ne mozes nista)
```javascript
// Varijable
let name = "Marko";           // moze da se menja
const age = 30;               // ne moze da se menja
// 'var' — ne koristi, zastarelo

// Tipovi podataka
"tekst"                       // string
42                            // number
true / false                  // boolean
null                          // namerno prazno
undefined                     // nije definisano
[1, 2, 3]                    // array (niz)
{ name: "Marko", age: 30 }   // object (objekat)

// If/else
if (age >= 18) {
  console.log("Punoletan");
} else {
  console.log("Maloletan");
}

// Petlje
for (let i = 0; i < 5; i++) {
  console.log(i);   // 0, 1, 2, 3, 4
}

// Funkcije
function pozdrav(ime) {
  return `Zdravo, ${ime}!`;
}

// Arrow funkcije (isto, samo krace)
const pozdrav = (ime) => `Zdravo, ${ime}!`;
```

#### Nivo 2 — Rad sa nizovima i objektima (koristis STALNO)
```javascript
// Ovo su operacije koje ces vidjati u SVAKOM fajlu naseg projekta

const klijenti = [
  { id: 1, name: "Marko", active: true },
  { id: 2, name: "Ana", active: false },
  { id: 3, name: "Jovan", active: true },
];

// .map() — transformisi svaki element
const imena = klijenti.map(k => k.name);
// ["Marko", "Ana", "Jovan"]

// .filter() — filtriraj po uslovu
const aktivni = klijenti.filter(k => k.active === true);
// [{ id: 1, name: "Marko"... }, { id: 3, name: "Jovan"... }]

// .find() — nadji PRVI koji zadovoljava uslov
const marko = klijenti.find(k => k.name === "Marko");
// { id: 1, name: "Marko", active: true }

// Destructuring — izvlacenje vrednosti iz objekta
const { name, active } = marko;
// name = "Marko", active = true

// Spread operator — kopiranje/spajanje
const noviKlijent = { ...marko, name: "Marko Jr." };
// kopira sve iz marko, ali menja name
```

#### Nivo 3 — Asinhrono programiranje (KLJUCNO za web)
```javascript
// Problem: kad pitas bazu za podatke, odgovor ne stize ODMAH.
// Moras SACEKATI. To je asinhrono programiranje.

// async/await — OVAKO radimo u nasem projektu:
const getClients = async () => {
  try {
    const response = await api.get('/clients');  // sacekaj odgovor
    return response.data;                        // vrati podatke
  } catch (error) {
    console.error('Greska:', error);             // ako ne uspe
  }
};

// 'await' kaze: "stani ovde dok ne dobijes odgovor"
// 'async' kaze: "ova funkcija koristi await"
// 'try/catch' kaze: "probaj ovo, a ako pukne — uradi ono"

// BEZ async/await bi morala da koristis .then() lance — ruznije i teze za citanje
```

#### Nivo 4 — Moduli (import/export)
```javascript
// Svaki fajl u projektu je "modul" — ima svoj scope

// EXPORT — nudis nesto drugima
// backend/utils/responseHelper.js
const sendSuccess = (res, data, message) => { ... };
module.exports = { sendSuccess };  // backend koristi CommonJS

// IMPORT — koristis nesto od drugih
// backend/controllers/clientController.js
const { sendSuccess } = require('../utils/responseHelper');

// Frontend koristi ES Modules (moderniji):
// frontend/lib/api.js
export const api = axios.create({ ... });

// frontend/app/.../page.tsx
import { api } from '@/lib/api';
```

---

## 5. Backend detaljno

### Express.js — kako radi

Express je kao telefonska centrala. Svaki poziv (HTTP zahtev) dolazi na centralu, i ona ga usmerava na pravo mesto.

```javascript
// backend/app.js — ULAZNA TACKA cele backend aplikacije

const express = require('express');
const app = express();

// Middleware — stvari koje se desavaju ZA SVAKI zahtev
app.use(express.json());        // parsira JSON iz body-ja
app.use(cors(corsOptions));     // dozvoljava frontend da prica sa backendom
app.use(helmet());              // sigurnosni headeri
app.use(requestLogger);         // loguje svaki zahtev

// Rute — usmerava zahteve na prave handlere
app.use('/api/v1/auth', authRoutes);
app.use('/api/v1/clients', clientRoutes);
app.use('/api/v1/vehicles', vehicleRoutes);

// Error handler — hvata SVE greske
app.use(errorHandler);

// Pokreni server
app.listen(5000, () => console.log('Server radi na portu 5000'));
```

### MVC pattern — kako organizujemo kod

```
ROUTE → CONTROLLER → MODEL

Svaki ima svoju odgovornost:
```

**Route** — definise PUTANJU i METOD, poziva controller:
```javascript
// backend/routes/clientRoutes.js
router.get('/', authMiddleware, clientController.getAll);
router.post('/', authMiddleware, clientController.create);
router.put('/:id', authMiddleware, clientController.update);
router.delete('/:id', authMiddleware, adminMiddleware, clientController.delete);
```

**Controller** — sadrzi LOGIKU, koristi model:
```javascript
// backend/controllers/clientController.js
const create = async (req, res, next) => {
  try {
    const client = await Client.create(req.body);
    sendSuccess(res, client, 'Klijent kreiran', 201);
  } catch (error) {
    next(error);  // prosledi error handleru
  }
};
```

**Model** — definise STRUKTURU podataka u bazi:
```javascript
// backend/models/Client.js
Client.init({
  first_name: { type: DataTypes.STRING, allowNull: false },
  last_name: { type: DataTypes.STRING, allowNull: false },
  email: { type: DataTypes.STRING, unique: true },
  phone: { type: DataTypes.STRING },
  client_type: { type: DataTypes.ENUM('fizicko_lice', 'pravno_lice') }
}, {
  timestamps: true,    // created_at, updated_at
  paranoid: true,      // soft delete (deleted_at)
  underscored: true,   // snake_case u bazi
});
```

### Sequelize — ORM (prevodilac za bazu)

Umesto da pises SQL direktno, pises JavaScript:

```javascript
// BEZ Sequelize-a (cist SQL):
// SELECT * FROM clients WHERE client_type = 'fizicko_lice' ORDER BY created_at DESC LIMIT 20

// SA Sequelize-om (JavaScript):
const clients = await Client.findAll({
  where: { client_type: 'fizicko_lice' },
  order: [['created_at', 'DESC']],
  limit: 20
});

// Kreiranje:
// INSERT INTO clients (first_name, last_name) VALUES ('Marko', 'Markovic')
const client = await Client.create({ first_name: 'Marko', last_name: 'Markovic' });

// Izmena:
// UPDATE clients SET first_name = 'Ana' WHERE id = 5
await Client.update({ first_name: 'Ana' }, { where: { id: 5 } });

// Brisanje (soft delete jer imamo paranoid):
// UPDATE clients SET deleted_at = NOW() WHERE id = 5
await Client.destroy({ where: { id: 5 } });
```

### Migracije — verzionisanje baze

Migracije su kao Git za bazu. Svaka migracija opisuje JEDNU promenu:

```javascript
// backend/migrations/20240115-create-clients.js
module.exports = {
  up: async (queryInterface, Sequelize) => {
    // STA SE RADI kad pokrenemo migraciju
    await queryInterface.createTable('clients', {
      id: { type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true },
      first_name: { type: Sequelize.STRING, allowNull: false },
      // ...
    });
  },
  down: async (queryInterface) => {
    // KAKO SE PONISTAVA (rollback)
    await queryInterface.dropTable('clients');
  }
};
```

```bash
npx sequelize-cli db:migrate        # pokreni sve nove migracije
npx sequelize-cli db:migrate:undo   # ponisti poslednju
```

**Zlatno pravilo:** NIKAD ne menjas migraciju koja je vec pokrenuta. Pravi NOVU migraciju za izmene.

### JWT autentifikacija — kako radi

```
1. Korisnik salje email + lozinku
2. Backend proveri: da li je lozinka ispravna? (bcrypt.compare)
3. Ako jeste → generisi Access Token (traje 15 min) + Refresh Token (traje 7 dana)
4. Posalji tokene korisniku
5. Korisnik salje Access Token uz SVAKI zahtev (u Authorization headeru)
6. Backend proverava token: da li je validan? da li je istekao?
7. Ako je Access Token istekao → korisnik salje Refresh Token → dobija novi Access Token
8. Ako je i Refresh Token istekao → korisnik mora ponovo da se uloguje
```

Zasto DVA tokena?
- **Access Token** — kratko traje (15 min) jer se salje uz svaki zahtev. Ako ga neko ukrade, moze ga koristiti samo 15 min.
- **Refresh Token** — dugo traje (7 dana) ali se salje SAMO kad treba novi Access Token. Manja sansa da bude ukraden.

---

## 6. Frontend detaljno

### React — kako razmislja

React razmislja u **komponentama**. Svaka komponenta je JEDAN deo stranice:

```
Stranica "Klijenti"
├── Header (navigacija)
├── Sidebar (meni)
├── ClientTable (tabela klijenata)
│   ├── TableHeader (zaglavlje)
│   └── TableRow (svaki red) × N
├── Pagination (navigacija po stranicama)
├── CreateClientModal (forma za novog klijenta)
│   ├── Input (polje za ime)
│   ├── Input (polje za email)
│   └── Button (sacuvaj)
└── Toast (notifikacija)
```

Svaka komponenta je **funkcija** koja vraca **JSX** (HTML u JavaScript-u):

```jsx
// Primer jednostavne komponente
function UserCard({ name, email, role }) {
  return (
    <div className="bg-gray-900 p-4 rounded-lg">
      <h3 className="text-white font-bold">{name}</h3>
      <p className="text-gray-400">{email}</p>
      <span className="text-blue-400">{role}</span>
    </div>
  );
}

// Koriscenje:
<UserCard name="Marko" email="marko@test.com" role="Admin" />
```

### React Hooks — "supermoci" komponenti

**useState** — pamti podatke unutar komponente:
```jsx
const [clients, setClients] = useState([]);      // lista klijenata
const [loading, setLoading] = useState(false);    // da li se ucitava
const [search, setSearch] = useState('');          // tekst pretrage

// Kada pozoves setClients(noviPodaci) — React automatski ponovo renderuje komponentu
```

**useEffect** — radi nesto kad se komponenta ucita ili kad se nesto promeni:
```jsx
useEffect(() => {
  // Ovo se pokrene JEDNOM kad se stranica ucita
  fetchClients();
}, []);  // [] znaci "samo jednom"

useEffect(() => {
  // Ovo se pokrene SVAKI PUT kad se 'search' promeni
  fetchClients(search);
}, [search]);  // [search] znaci "kad se search promeni"
```

**useContext** — koristi deljene podatke (npr. auth):
```jsx
const { user, logout } = useAuth();  // dobija usera i logout funkciju iz AuthContext-a

if (!user) return <LoginPage />;     // ako nije ulogovan — prikazi login
```

### Next.js App Router — kako radi routing

U Next.js-u, **folder struktura = URL struktura**:

```
frontend/app/
├── page.tsx                    → /              (pocetna)
├── login/page.tsx              → /login         (login stranica)
├── (dashboard)/
│   ├── layout.tsx              → layout za sve dashboard stranice
│   ├── clients/
│   │   └── page.tsx            → /clients       (lista klijenata)
│   ├── vehicles/
│   │   ├── page.tsx            → /vehicles      (lista vozila)
│   │   └── [id]/page.tsx       → /vehicles/5    (detalj vozila sa ID=5)
│   └── service-requests/
│       └── page.tsx            → /service-requests
```

- **page.tsx** = stranica na toj putanji
- **layout.tsx** = omotac koji se deli izmedju vise stranica (header, sidebar)
- **loading.tsx** = prikaz dok se stranica ucitava
- **error.tsx** = prikaz kad nesto pukne
- **[id]** = dinamicki parametar (npr. ID vozila)

### Tailwind CSS — kako stilizujemo

Umesto da pises CSS u posebnom fajlu, pises klase direktno:

```jsx
// BEZ Tailwinda (klasican CSS):
// .card { background: #1a1a1a; padding: 16px; border-radius: 8px; }
// <div class="card">

// SA Tailwindom:
<div className="bg-gray-900 p-4 rounded-lg">

// Objasnjenje klasa:
// bg-gray-900   → pozadina tamno siva
// p-4           → padding 16px (4 × 4px)
// rounded-lg    → zaobljeni uglovi
// text-white    → beli tekst
// flex          → flexbox layout
// gap-2         → razmak izmedju elemenata 8px
// hover:bg-gray-800  → kad predjes mišem, svetlija pozadina
// md:grid-cols-2      → na srednje velikom ekranu, 2 kolone
```

Tailwind "recnik" koji ces najcesce koristiti:

```
VELICINE:       1=4px, 2=8px, 3=12px, 4=16px, 6=24px, 8=32px
BOJE:           gray-900 (tamno), gray-400 (svetlo), blue-500 (plava)
TEKST:          text-sm (mali), text-lg (veci), font-bold (debeo)
LAYOUT:         flex, grid, gap-2, items-center, justify-between
SPACING:        p-4 (padding), m-2 (margin), px-6 (padding levo-desno)
GRANICE:        border, rounded-lg, border-gray-700
RESPONSIVNO:    sm: (640px+), md: (768px+), lg: (1024px+)
```

---

## 7. Redosled ucenja — sta prvo, sta posle

### Faza 1 — Temelj (2-3 nedelje)
**Cilj:** Razumeti JavaScript dovoljno da mozes da citas i menjas kod.

- [ ] JavaScript osnove: varijable, tipovi, if/else, petlje, funkcije
- [ ] Array metode: `.map()`, `.filter()`, `.find()`, `.forEach()`
- [ ] Objekti i destructuring
- [ ] Arrow funkcije
- [ ] Template literals (`` `Zdravo, ${ime}!` ``)
- [ ] Async/await i try/catch

**Kako da vezbas:** Otvori bilo koji fajl u projektu i probaj da procitas sta radi. Ako ne razumes neki deo — pitaj Claude Code.

### Faza 2 — React osnove (2-3 nedelje)
**Cilj:** Razumeti kako React komponente rade.

- [ ] Sta je komponenta i kako se pravi
- [ ] JSX sintaksa (HTML u JavaScript-u)
- [ ] Props — prosledjivanje podataka komponenti
- [ ] useState — cuvanje stanja u komponenti
- [ ] useEffect — pokretanje koda pri ucitavanju
- [ ] Dogadjaji: onClick, onChange, onSubmit
- [ ] Uslovno renderovanje (prikazuj X ako je Y)
- [ ] Renderovanje liste (.map() u JSX-u)

**Kako da vezbas:** Otvori `frontend/components/ui/` i citaj komponente. Probaj da napravis novu komponentu — npr. `Badge.tsx` koja prikazuje tekst u obojenom pravougaoniku.

### Faza 3 — Backend osnove (2-3 nedelje)
**Cilj:** Razumeti kako Express i Sequelize rade.

- [ ] Sta je server i kako Express prima zahteve
- [ ] Rute i metode (GET, POST, PUT, DELETE)
- [ ] Middleware — sta je i kako radi
- [ ] Sequelize modeli — definisanje tabela
- [ ] CRUD operacije u Sequelize-u
- [ ] Migracije — kreiranje i pokretanje
- [ ] Validacija podataka (express-validator)

**Kako da vezbas:** Pokusaj da dodas novo polje u neki model (npr. `notes` polje u `Client` model). To zahteva: novu migraciju, izmenu modela, izmenu controllera, izmenu frontenda.

### Faza 4 — Next.js i fullstack (2-3 nedelje)
**Cilj:** Razumeti kako frontend i backend rade ZAJEDNO.

- [ ] Next.js App Router — kako folderi postaju stranice
- [ ] Layout i ugnjezdeni layout-i
- [ ] Loading i error stanja
- [ ] Middleware (zastita ruta)
- [ ] Axios interceptori — automatski token
- [ ] AuthContext — upravljanje login stanjem

### Faza 5 — Napredne teme (tekuce)
**Cilj:** Postati samostalna u resavanju problema.

- [ ] Git — branching, commit, merge, konflikti
- [ ] Debugging — kako naci i popraviti bag
- [ ] Testiranje — pisanje i pokretanje testova
- [ ] TypeScript osnove
- [ ] Deployment — kako postaviti projekat online
- [ ] Performanse — optimizacija upita, lazy loading

---

## 8. Vezbe na projektu — probaj sama

Ove vezbe su poredjane od laksiih ka tezim. Svaka te uci nesto novo.

### Vezba 1 — Procitaj i razumi (lagano)
Otvori `backend/controllers/clientController.js` i pokusaj da razumes SVAKI red. Za sve sto ne razumes — pitaj Claude Code: "Objasni mi sta radi linija X u fajlu Y".

### Vezba 2 — Promeni boju (lagano)
U frontendu, promeni primarnu boju sa plave na zelenu. Zameni sve `blue-500`, `blue-600` itd. sa `green-500`, `green-600`. Ovo te uci da se snadjes u kodu i koristis pretragu.

### Vezba 3 — Dodaj novo polje (srednje)
Dodaj polje `nickname` (nadimak) u tabelu `clients`. Ovo zahteva:
1. Novu migraciju (`npx sequelize-cli migration:generate --name add-nickname-to-clients`)
2. Izmenu modela (`backend/models/Client.js`)
3. Izmenu controllera (da prima i vraca nickname)
4. Izmenu frontend forme (novo polje u formi)
5. Izmenu frontend tabele (nova kolona)

Ovo je ODLICNA vezba jer prolazis kroz CEO stack.

### Vezba 4 — Napravi novu stranicu (srednje-tesko)
Napravi stranicu `/about` koja prikazuje informacije o auto servisu. Ovo te uci:
- Kako Next.js routing radi (kreiraj `frontend/app/(dashboard)/about/page.tsx`)
- Kako da napravis React komponentu
- Kako da stilizujes sa Tailwindom

### Vezba 5 — Napravi novi entitet (tesko)
Dodaj entitet "Kategorija usluge" (npr. "Zamena ulja", "Geometrija", "Limarija"). Ovo zahteva:
1. Model + migracija u backendu
2. Controller sa CRUD operacijama
3. Rute
4. Frontend stranicu sa tabelom i formom
5. Povezivanje sa servisnim zahtevima

Ovo je PUNA fullstack vezba — kad ovo zavrsis, vec si junior developer.

### Vezba 6 — Popravi "bag" (srednje)
Namerno pokvari nesto u kodu (npr. promeni ime kolone u controlleru) i onda probaj da nadjes i popravi bug koristeci:
- Error poruke u browseru
- Error poruke u terminalu (backend)
- Console log za debugging

Ovo te uci NAJVAZNIJU vestinu programera — debugging.

---

## 9. Svakodnevni rad programera

### Sta programer STVARNO radi ceo dan

Mnogi misle da programeri samo kucaju kod. Realnost:

```
10% — Pisanje novog koda
30% — Citanje i razumevanje TUDJEG koda (ili svog starog)
20% — Debugging (trazenje i popravljanje bagova)
15% — Testiranje (da li radi? a sta ako...)
10% — Planiranje (kako da resim ovaj problem?)
10% — Komunikacija (standup, code review, pitanja)
 5% — Ucenje novih stvari
```

### Dnevna rutina

```
1. Otvori terminal, pokreni projekat (backend + frontend)
2. Pogledaj sta treba da radis (task/issue)
3. Napravi novu git granu: git checkout -b feature/moj-task
4. Pisi kod, testiraj u browseru
5. Kad zavrsis: pokreni testove (npm test)
6. Commit: git add . && git commit -m "feat: opis izmene"
7. Push: git push origin feature/moj-task
8. Otvori Pull Request — neko pregleda tvoj kod
9. Ispravi komentare ako ih ima
10. Merge u develop granu
```

### Alati koje programeri koriste svaki dan

| Alat | Cemu sluzi |
|------|------------|
| **VS Code** | Editor za pisanje koda (ili Cursor/Windsurf sa AI) |
| **Terminal** | Pokretanje komandi (git, npm, testovi) |
| **Browser DevTools** | F12 — inspekcija elemenata, mrezni zahtevi, konzola |
| **Postman / Insomnia** | Testiranje API endpointa bez frontenda |
| **Git / GitHub** | Verzionisanje koda i saradnja |
| **Claude Code** | AI asistent za kodiranje |

### Browser DevTools — tvoj NAJBOLJI prijatelj

Pritisni **F12** u browseru i istrazuj:

- **Console** tab — ovde vidis greske i console.log poruke
- **Network** tab — ovde vidis SVE zahteve ka backendu (sta je poslato, sta je vraceno)
- **Elements** tab — ovde vidis HTML strukturu stranice i mozes menjati stilove uzivo

**Pro tip:** Kad nesto ne radi na frontendu, UVEK prvo proveri Console i Network tab. 90% odgovora je tamo.

---

## 10. Resursi — samo najbitnije

Ne treba ti 50 kurseva. Treba ti JEDAN dobar resurs po temi i praksa.

### JavaScript (obavezno PRVO)
- **javascript.info** (https://javascript.info/) — NAJBOLJI besplatni resurs za JS. Citaj od pocetka, radi vezbe.
- Fokusiraj se na: Part 1 (The JavaScript language) — poglavlja 1-6, i 11 (Promises, async/await)

### React
- **React docs** (https://react.dev/learn) — zvanicna dokumentacija, odlicna za pocetnike
- Proradji ceo "Learn React" deo — interaktivne vezbe, zabavno

### Next.js
- **Next.js docs** (https://nextjs.org/docs) — zvanicna dokumentacija
- Fokusiraj se na: App Router sekciju

### Tailwind CSS
- **Tailwind docs** (https://tailwindcss.com/docs) — najvaznija referenca
- Ne ucis napamet — pretrazujes kad ti treba (npr. "tailwind flexbox")

### Express.js
- **Express docs** (https://expressjs.com/en/guide/routing.html) — kratko i jasno
- MDN Web Docs za HTTP osnove

### Sequelize
- **Sequelize docs** (https://sequelize.org/docs/v6/) — referenca kad ti treba
- Neces ovo citati od pocetka — koristices kad ti zatreba nesto specificno

### Git
- **Oh My Git!** (https://ohmygit.org/) — interaktivna igra za ucenje Git-a
- **git - the simple guide** (https://rogerdudler.github.io/git-guide/) — jedna stranica sa svim sto ti treba

### YouTube (ako ipak zelis video)
- **Fireship** — kratki, brzi videi (5-10 min) koji objasne koncept. Odlicni za pregled.
- **Web Dev Simplified** — detaljniji tutorijali, odlican za React i JS

---

## Zavrsna rec

Programiranje se NE UCI citanjem — uci se RADOM. Najgora stvar koju mozes da uradis je da gledas 200 sati tutorijala bez da napises ni red koda.

Tvoj pristup (rad sa Claude Code-om na pravom projektu) je zapravo ODLICAN. Evo zasto:
- Imas pravi projekat koji radi — ne "todo app" iz tutorijala
- Mozes da eksperimentises bez straha — imas Git, mozes se vratiti
- Imas AI asistenta koji ti objasnjava u realnom vremenu
- Ucis u kontekstu (ne apstraktno, vec na svom kodu)

**Moj savet za tebe:**
1. Posveti 1h dnevno ucenju JavaScript-a na javascript.info
2. Paralelno — svaki dan otvori jedan fajl iz projekta i pokusaj da ga procitas
3. Kad nesto ne razumes — pitaj Claude Code, ne guglaj satima
4. Svake nedelje probaj jednu vezbu iz Sekcije 8
5. Posle mesec dana — probaj da dodas novi feature SAMA (uz pomoc Claude Code-a ako zatreba)

Nema precice. Ali sa pravim pristupom, za 2-3 meseca ces moci sama da dodajes feature-e i popravljas bagove. Za 6 meseci ces razumeti ceo stack. Za godinu dana ces biti sposobna da napravis projekat od nule.

**Najbitnija vestina programera nije pisanje koda — vec resavanje problema.** Kod je samo alat. Ako znas da razmisljas logicki i da razbijes veliki problem na manje delove — vec si na pola puta.

---

## 11. Poboljsanja v3 — sta smo popravili i zasto

Ovo poglavlje opisuje 7 poboljsanja koja su uradjena POSLE v2. Nisu novi feature-i — vec su to popravke i poboljsanja POSTOJECEG koda. Ovako izgleda profesionalni razvoj: ne pises samo novi kod, vec se vratis i popravis ono sto moze bolje.

> Zasto se ovo radi? Zamisli da zivis u kuci godinu dana. Posle godinu dana primecujes: ova vrata skrpe, ovaj prozor propusta, ovaj kabl je neuredno provucen. Nista nije "pokvareno", ali moze bolje. To je v3.

---

### 11.1 Paginacija za fajlove (attachment controller)

**Problem:** Svaki endpoint u nasoj aplikaciji koji vraca LISTU podataka (klijenti, vozila, nalozi...) ima paginaciju — tj. prikazuje podatke stranica po stranica (po 20), umesto da vrati SVE podatke odjednom. To je pravilo iz CLAUDE.md fajla. Ali jedan controller se provukao BEZ paginacije — `attachmentController.js` (onaj koji upravlja uploadovanim fajlovima).

**Zasto je to problem?** Zamisli da imas 10.000 uploadovanih fajlova. Bez paginacije, kad otvoris listu fajlova, backend pokusa da ucita SVIH 10.000 odjednom. To je sporo, trosi puno memorije, i moze da zakoce celu aplikaciju. Sa paginacijom ucitavas samo 20 po 20 — mnogo brze i efikasnije.

**Sta smo promenili:**

```javascript
// PRE (attachmentController.js) — vraca SVE odjednom:
const getAll = async (req, res, next) => {
  const attachments = await Attachment.findAll({ where });
  sendSuccess(res, attachments);   // vraca CELU listu
};

// POSLE — vraca stranicu po stranicu:
const getAll = async (req, res, next) => {
  const { page, limit, offset } = paginate(req.query);   // izvuci page i limit iz URL-a
  const order = getSortOptions(req.query, ['created_at', 'file_name', 'file_size_bytes']);

  const { count, rows } = await Attachment.findAndCountAll({
    where, limit, offset, order   // vrati samo 'limit' rezultata, pocevsi od 'offset'
  });

  sendPaginated(res, rows, buildPaginationResponse(page, limit, count));
};
```

**Objasnjenje kljucnih pojmova:**

- `paginate(req.query)` — Cita URL parametre `?page=2&limit=20` i racuna: "ako je stranica 2 i po 20 rezultata, onda treba da preskocim prvih 20 (offset=20) i uzmem sledecih 20"
- `findAndCountAll()` — umesto `findAll()`, ova Sequelize metoda vraca DVE stvari: ukupan broj rezultata (`count`) I listu za tu stranicu (`rows`). Bez `count` ne bismo znali koliko stranica ukupno ima
- `getSortOptions()` — omogucava sortiranje po koloni (npr. `?sort=file_name&order=ASC` — po imenu fajla, rastuci)
- `sendPaginated()` — umesto obicnog `sendSuccess()`, vraca i informacije o paginaciji (trenutna stranica, ukupno stranica, ukupno stavki, da li postoji sledeca stranica...)

**Fajlovi:**
- `backend/controllers/attachmentController.js` — izmenjen
- `backend/routes/attachmentRoutes.js` — izmenjen (dodata Swagger dokumentacija za nove parametre)

---

### 11.2 Popravka "trke" kod osvezavanja tokena

**Problem:** Ovo je PRAVI bag koji je mogao da izazove probleme u produkciji. Setis se da JWT access token traje 15 minuta? Kad istekne, frontend automatski koristi refresh token da dobije novi access token. Problem nastaje ovako:

```
Zamisli da imas otvorenu stranicu koja ucitava 3 stvari istovremeno:
- Listu klijenata     → API poziv #1
- Listu vozila        → API poziv #2
- Statistiku          → API poziv #3

Sva tri zahteva idu na backend u isto vreme.
Sva tri dobiju odgovor: "401 — token je istekao!"

Sta se desava BEZ popravke:
- Zahtev #1 → vidi 401 → posalje refresh token → dobije NOVI access token ✓
- Zahtev #2 → vidi 401 → posalje refresh token → ALI stari refresh token je vec iskoriscen! → FAIL ✗
- Zahtev #3 → isto pukne ✗
→ Korisnik bude izlogovan bez razloga!
```

**Analogija:** Zamisli da ti i 3 kolege sticete na posao i svi vidite da je brava promenjena. Svi istovremeno pozovete domara da vam da novi kljuc. Domar da kljuc prvom — ali kad drugi pozove, domar kaze "vec sam dao kljuc". Resenje? JEDAN pozove domara, ostali cekaju da ON dobije kljuc i onda svi koriste isti.

**Sta smo promenili:**

```javascript
// frontend/lib/api.js — novi mehanizam za refresh token

let isRefreshing = false;      // Da li NEKO vec osvezava token?
let failedQueue = [];           // Red cekanja za zahteve koji cekaju novi token

// Kad zahtev dobije 401:
if (isRefreshing) {
  // Neko VEC osvezava token — sacekaj u redu
  return new Promise((resolve, reject) => {
    failedQueue.push({ resolve, reject });
  }).then(token => {
    // Kad se token dobije — ponovi zahtev sa novim tokenom
    originalRequest.headers['Authorization'] = 'Bearer ' + token;
    return api(originalRequest);
  });
}

// Ako NIKO ne osvezava — ja cu:
isRefreshing = true;
const response = await axios.post('/auth/refresh-token', { refreshToken });
const newToken = response.data.data.accessToken;

// Javi SVIMA u redu: "evo novog tokena!"
failedQueue.forEach(prom => prom.resolve(newToken));
failedQueue = [];
isRefreshing = false;
```

**Ovaj pattern se zove "Promise Queue"** — kao red u pekari. Samo jedna osoba govori sa pekarom, ostali cekaju u redu. Kad pekar da hleb (token), svi u redu dobiju.

**Fajl:** `frontend/lib/api.js` — prepisan response interceptor

---

### 11.3 Indeksi baze podataka (performance)

**Problem:** Baza podataka cesto pretrazuje podatke po odredjenim kolonama — npr. "daj mi sve aktivne firme" pretrazuje kolonu `status`. Bez INDEKSA, baza mora da prodje kroz SVAKI red u tabeli da proveri da li je `status = 'active'`. Sa indeksom — nalazi rezultat MNOGO brze.

**Analogija:** Zamisli da imas knjigu od 500 strana. Trazis poglavlje o motorima. BEZ indeksa (sadrzaja) moras da listas stranu po stranu. SA indeksom, otvoris sadrzaj, vidis "Motori — strana 245" i odmah otvoris pravu stranu.

**Sta smo dodali:** Novu migraciju sa 12 indeksa za kolone koje se cesto pretrazuju ili sortiraju:

```javascript
// backend/migrations/20260511000002-add-missing-indexes.js

// Primer: kolona 'status' u tabeli 'companies' — cesto filtriramo po statusu
await queryInterface.addIndex('companies', ['status'], {
  name: 'idx_companies_status'
});

// Primer: kolona 'company_id' u tabeli 'company_contacts' — ovo je "foreign key"
// Svaki put kad otvoris firmu i zelis da vidis njene kontakte,
// baza trazi: SELECT * FROM company_contacts WHERE company_id = 5
// Indeks ubrzava ovo trazenje
await queryInterface.addIndex('company_contacts', ['company_id'], {
  name: 'idx_company_contacts_company_id'
});
```

**Kompletna lista indeksa:**

| Tabela | Kolona | Zasto |
|--------|--------|-------|
| companies | status | Filtriramo "aktivne" vs "neaktivne" |
| companies | created_at | Sortiramo po datumu |
| company_contacts | company_id | Trazimo kontakte za firmu |
| service_items | service_request_id | Trazimo stavke za nalog |
| client_communications | client_id | Trazimo poruke za klijenta |
| client_communications | service_request_id | Trazimo poruke za nalog |
| message_logs | service_request_id | Trazimo logove za nalog |
| message_logs | delivery_status | Filtriramo "poslato" vs "neuspelo" |
| my_vehicles | status | Filtriramo po statusu |
| my_vehicle_expenses | my_vehicle_id | Trazimo rashode za vozilo |
| users | role | Filtriramo "admin" vs "worker" |
| users | is_active | Filtriramo aktivne korisnike |

**Fajl:** `backend/migrations/20260511000002-add-missing-indexes.js` — novi

**Bitno:** Indeksi zauzimaju malo vise prostora u bazi, ali DRASTICNO ubrzavaju pretrage. Na malim tabelama (100 redova) razlika je zanemarljiva. Na velikim (10.000+ redova) moze biti razlika izmedju 2 sekunde i 2 milisekunde.

---

### 11.4 DRY princip — centralizacija konstanti

**Problem:** U frontendu smo imali ISTE stvari kopirane u vise fajlova. Na primer, `inputClass` (CSS klase za input polja) je bio kopiran u **17 razlicitih fajlova** — isti identican string. Takodje, statusne labele za servisne naloge su bile kopirane u 6 fajlova.

**Zasto je to problem?** DRY = "Don't Repeat Yourself" (Ne Ponavljaj Se). Ako imas isti string na 17 mesta i treba da ga promenis — moras da nadjes i promenis na SVA 17 mesta. Ako zaboravis jedno — imas bag. Ako ga imas na JEDNOM mestu, menjas jednom i gotovo.

**Analogija:** Zamisli da imas recept za kolace napisan na 17 papira po kuci. Treba da promenis kolicinu secera. Menjas na 17 papira — na jednom zaboravis. Sledeci put kad pravis kolace po TOM papiru — previse secera! Bolje: imaj JEDAN recept na zidu, svi gledaju u njega.

**Sta smo napravili:**

```typescript
// frontend/lib/constants.ts — JEDNO MESTO za sve zajednicke konstante

// CSS klase za input polja (ranije kopirano u 17 fajlova!)
export const inputClass = 'w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-lg ...';

// Status labele za servisne naloge (ranije kopirano u 6 fajlova!)
export const serviceRequestStatusLabels: Record<string, string> = {
  na_cekanju: 'Na čekanju',
  dijagnostika: 'Dijagnostika',
  u_procesu: 'U procesu',
  ceka_deo: 'Čeka deo',
  zavrseno: 'Završeno',
  isporuceno: 'Isporučeno',
  preuzeto: 'Preuzeto',
};

// Boje za statuse
export const serviceRequestStatusColors: Record<string, string> = {
  na_cekanju: 'warning',
  dijagnostika: 'info',
  u_procesu: 'purple',
  // ...
};

// ... i jos mnogo konstanti: partStatusLabels, myVehicleStatusLabels, itd.
```

**Kako se koristi u stranicama:**

```typescript
// PRE (u svakom fajlu posebno):
const statusLabels: Record<string, string> = {
  na_cekanju: 'Na čekanju',
  dijagnostika: 'Dijagnostika',
  // ... 7 redova kopiranog koda
};

// POSLE (jedan import):
import { serviceRequestStatusLabels as statusLabels } from '@/lib/constants';
// Gotovo! Koristi statusLabels kao i pre.
```

**Sta je `as statusLabels`?** To je alias — dajes importovanoj konstanti KRACE ime. Umesto da svuda pises `serviceRequestStatusLabels` (27 karaktera), pises `statusLabels` (12 karaktera). Funkcionalnost je ista.

**Fajlovi:**
- `frontend/lib/constants.ts` — novi (centralno mesto za konstante)
- ~17 frontend stranica — uklonjene lokalne kopije, zamenjene importom

---

### 11.5 Custom Hook — useCRUD (najvece poboljsanje)

**Problem:** 8 stranica u frontendu imaju SKORO IDENTICAN kod. Svaka stranica za CRUD (Create, Read, Update, Delete) radi isto: ucitava listu, ima pretragu, paginaciju, modal za kreiranje/izmenu, brisanje. Razlikuju se samo PODACI i KOLONE TABELE. Ali struktura koda je ista — ~75 linija istog koda na svakoj stranici.

**Analogija:** Zamisli da u 8 razlicitih soba postavljas ISTU klimu: razvaljas zid, provuces cev, stavis spoljnu jedinicu, unutrasnju jedinicu, povuces kabl... Umesto da ponavljas isti posao 8 puta, pravis "klimatski paket" — jednom definises postupak, pa ga primenjas na svaku sobu sa malim prilagodjavanjima (velicina sobe, pozicija).

**Sta je "custom hook"?** U React-u, hook je funkcija koja pocinje sa `use` i koja ti daje neku "superrmoc". Vec znas `useState` (pamti podatke) i `useEffect` (radi nesto pri ucitavanju). Mi smo napravili SVOJ hook — `useCRUD` — koji kombinuje SVE sto ti treba za CRUD stranicu.

**Sta smo napravili:**

```typescript
// frontend/lib/hooks/useCRUD.ts

// Ovaj hook ti daje SVE sto ti treba za CRUD stranicu:
function useCRUD<T, F>(options) {
  // ---- STATE (podaci koje hook pamti) ----
  const [data, setData] = useState([]);           // lista podataka iz baze
  const [loading, setLoading] = useState(true);    // da li se ucitava
  const [searchInput, setSearchInput] = useState('');  // tekst pretrage
  const [search, setSearch] = useState('');         // debounced pretraga
  const [page, setPage] = useState(1);             // trenutna stranica
  const [pagination, setPagination] = useState(null);  // info o stranicama
  const [showModal, setShowModal] = useState(false);   // da li je modal otvoren
  const [editingId, setEditingId] = useState(null);    // ID stavke koja se menja
  const [form, setForm] = useState(emptyForm);         // podaci forme
  const [saving, setSaving] = useState(false);          // da li se cuva
  const [deleteId, setDeleteId] = useState(null);       // ID za brisanje

  // ---- LOGIKA (funkcije) ----
  // fetchData() — ucitaj podatke iz baze
  // openCreate() — otvori modal za novo
  // openEdit(id, data) — otvori modal za izmenu
  // handleSave(payloadOverride?) — sacuvaj (kreira ili menja)
  // handleDelete() — obrisi
  // search debounce — ceka 400ms pre pretrage (da ne salje zahtev na svako slovo)

  return { data, loading, ..., fetchData, openCreate, handleSave, ... };
}
```

**Kako izgleda stranica PRE i POSLE:**

```typescript
// ═══════════════════════════════════════
// PRE (npr. suppliers/page.tsx) — ~200 linija
// ═══════════════════════════════════════
export default function SuppliersPage() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchInput, setSearchInput] = useState('');
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);
  const [pagination, setPagination] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [form, setForm] = useState(emptyForm);
  const [saving, setSaving] = useState(false);
  const [deleteId, setDeleteId] = useState(null);

  useEffect(() => {
    const t = setTimeout(() => { setSearch(searchInput); setPage(1); }, 400);
    return () => clearTimeout(t);
  }, [searchInput]);

  const fetchData = useCallback(async () => {
    try {
      setLoading(true);
      const res = await api.get(`/suppliers?page=${page}&limit=20&search=${search}`);
      setData(res.data.data);
      setPagination(res.data.pagination);
    } catch { toast.error('Greška pri učitavanju dobavljača'); }
    finally { setLoading(false); }
  }, [page, search]);

  useEffect(() => { fetchData(); }, [fetchData]);

  const handleSave = async () => { /* ... 15 linija ... */ };
  const handleDelete = async () => { /* ... 5 linija ... */ };
  // ...ukupno ~75 linija "infrastrukture" pre nego sto dodjes do pravih kolona i JSX-a
}

// ═══════════════════════════════════════
// POSLE — istih ~200 linija, ali 75 manje ponavljanja
// ═══════════════════════════════════════
export default function SuppliersPage() {
  const crud = useCRUD<Supplier, typeof emptyForm>({
    endpoint: '/suppliers',
    entityLabel: 'Dobavljač',
    emptyForm,
    queryParams,  // opcioni parametri za filtriranje
  });

  // Sve sto pre imas u 75 linija — sada je u jednom redu!
  // crud.data, crud.loading, crud.searchInput, crud.setSearchInput,
  // crud.fetchData, crud.openCreate, crud.handleSave, crud.handleDelete...
}
```

**Sta je `<Supplier, typeof emptyForm>`?** To su "generici" u TypeScript-u — kazes hook-u: "podaci su tipa Supplier, a forma je tipa kao emptyForm". Hook onda ZNA koje tipove podataka da ocekuje. Zamisi to kao kalupi za kolace — isti proces (hook), ali razlicit oblik (tip podataka) za svaku stranicu.

**8 stranica koje koriste useCRUD:**
1. `clients/page.tsx` — klijenti
2. `vehicles/page.tsx` — vozila
3. `suppliers/page.tsx` — dobavljaci
4. `ordered-parts/page.tsx` — naruceni delovi
5. `communications/page.tsx` — komunikacije
6. `my-vehicles/page.tsx` — nasa vozila
7. `reminders/page.tsx` — podsetnici
8. `users/page.tsx` — korisnici

Svaka stranica ZADRZAVA sve sto je specificno za nju — kolone tabele, filtere, JSX layout. Hook preuzima samo ponavljajucu infrastrukturu.

**Fajl:** `frontend/lib/hooks/useCRUD.ts` — novi

---

### 11.6 TypeScript tipovi — zamena `any` tipova

**Problem:** TypeScript je JavaScript sa tipovima. Tipovi ti kazu: "ova varijabla je string", "ova je number", "ova je objekat sa poljem `name`". To ti pomaze da uhvatis greske PRE nego sto pokrenes kod. Ali u nasem kodu smo na nekim mestima koristili `any` — sto znaci "moze da bude BILO STA". To ponistava celu poentu TypeScript-a.

**Analogija:** Zamisli da imas kutiju sa oznakom "NESTO". Kad je otvoris, moze da bude knjiga, macka, ili bomba. Bolje je da na kutiji pise "KNJIGA" — onda znas sta ocekujes i neces da se iznenadis.

**Sta smo promenili:**

```typescript
// ═══════════ PRE ═══════════
// 'any' — TypeScript ne zna sta je ovo, ignorise sve provere
catch (err: any) {
  toast.error(err.response?.data?.message || 'Greška');
}
// Problem: sta ako 'err' NEMA '.response'? Sta ako je obican string?
// TypeScript ne upozorava jer je 'any'.

// ═══════════ POSLE ═══════════
// 'unknown' — TypeScript zna da ne zna, ali ZAHTEVA proveru pre koriscenja
catch (err: unknown) {
  if (axios.isAxiosError(err)) {
    // TypeScript SADA ZNA da je 'err' axios error — ima .response
    toast.error(err.response?.data?.message || 'Greška');
  } else {
    toast.error('Greška');
  }
}
// Bezbednije! Ako err NIJE axios error, nece pucati.
```

```typescript
// ═══════════ PRE ═══════════
// U tabeli, render callback sa 'any':
render: (_: any, row: ServiceRequest) => row.client?.full_name || '—'

// ═══════════ POSLE ═══════════
// 'unknown' je ispravniji jer prvi argument NE KORISTIMO:
render: (_: unknown, row: ServiceRequest) => row.client?.full_name || '—'
// '_' znaci "ne koristim ovu varijablu" (konvencija sa donjom crtom)
// 'unknown' je bolji od 'any' jer ne "zakljucava vrata" tip sistema
```

**Sta je razlika izmedju `any` i `unknown`?**
- `any` = "pusti me da radim STA HOCU, ne proveravaj nista" — opasno
- `unknown` = "ne znam sta je, ali MORAM da proverim pre koriscenja" — bezbedno

**Fajlovi:** ~9 frontend stranica gde su zamenjeni `any` sa `unknown` + odgovarajuce type guard provere

---

### 11.7 Testovi za attachment endpoint

**Problem:** Kad smo popravili paginaciju za attachment endpoint (11.1), trebalo je da napisemo i TESTOVE koji proveravaju da ta paginacija radi ispravno. Testovi su tu da GARANTUJU da ce nesto raditi — i danas i za 6 meseci kad neko promeni nesto drugo u kodu.

**Sta smo testirali (15 testova):**

```
POST /api/v1/attachments (upload fajla):
  ✓ Uploaduje fajl sa validnim podacima (201 Created)
  ✓ Worker takodje moze da uploaduje
  ✓ Odbija zahtev bez fajla (404)
  ✓ Odbija neautentifikovan zahtev (401)

GET /api/v1/attachments (lista fajlova):
  ✓ Vraca listu sa paginacijom
  ✓ Paginacija radi (page, limit)
  ✓ Filtrira po attachable_type (npr. samo "vehicle")
  ✓ Filtrira po attachable_type I attachable_id
  ✓ Pretrazuje po nazivu fajla
  ✓ Pretrazuje po opisu
  ✓ Sortira po velicini fajla
  ✓ Odbija neautentifikovan zahtev (401)

DELETE /api/v1/attachments/:id (brisanje fajla):
  ✓ Brise fajl (soft delete — postavlja deleted_at)
  ✓ Vraca 404 za nepostojeci ID
  ✓ Odbija neautentifikovan zahtev (401)
```

**Primer jednog testa:**

```javascript
// backend/tests/endpoints/attachments.test.js

it('treba obrisati fajl (soft delete)', async () => {
  // 1. Posalji DELETE zahtev
  const res = await request(app)
    .delete(`/api/v1/attachments/${attachmentToDelete.id}`)
    .set('Authorization', `Bearer ${adminToken}`);

  // 2. Proveri da je odgovor 200 OK
  expect(res.status).toBe(200);
  expect(res.body.success).toBe(true);

  // 3. Proveri SOFT DELETE — red i dalje postoji u bazi, ali ima deleted_at
  const deleted = await db.Attachment.findByPk(attachmentToDelete.id, { paranoid: false });
  expect(deleted).not.toBeNull();         // red POSTOJI
  expect(deleted.deleted_at).not.toBeNull();  // ima deleted_at timestamp

  // 4. Proveri da ga normalan upit NE VRACA (jer je paranoid)
  const notFound = await db.Attachment.findByPk(attachmentToDelete.id);
  expect(notFound).toBeNull();  // vraca null — kao da ne postoji
});
```

**Sta je `paranoid: false`?** Normalno, Sequelize sa `paranoid: true` automatski filtrira soft-deleted redove (one sa `deleted_at`). Ali kad kazes `paranoid: false`, Sequelize pokazuje SVE — ukljucujuci obrisane. To koristimo u testu da PROVERIMO da red i dalje postoji, samo sa `deleted_at` popunjenim.

**Fajl:** `backend/tests/endpoints/attachments.test.js` — novi

---

### Ukupni rezultat v3

Posle svih poboljsanja:

```
Backend testovi:  371 testova (36 suites)  — SVI PROLAZE ✓
Frontend testovi: 238 testova (28 suites)  — SVI PROLAZE ✓
TypeScript:       0 gresaka u kodu aplikacije ✓
─────────────────────────────────────────
Ukupno:           609 testova — SVE ZELENO ✓
```

### Sta smo naucili iz v3?

1. **DRY (Don't Repeat Yourself)** — Ako isti kod vidis na 2+ mesta, napravi ga na jednom mestu i importuj. To vazi za konstante (11.4) i logiku (11.5).

2. **Indeksi** su mali trik koji DRASTICNO poboljsava performanse baze. Razmisljaj o njima kad dodajes novu tabelu ili novu kolonu po kojoj ces filtrirti.

3. **Tipovi** (TypeScript) nisu samo dosadna formalnost — oni te stite od bagova. `unknown` je UVEK bolji od `any`. Ako ne znas tip — stavi `unknown` i dodaj proveru.

4. **Testovi** nisu opcioni. Svaki put kad dodas ili promenis nesto — napisi test koji to pokriva. Buduci ti ce biti zahvalna.

5. **Race condition** (11.2) je primer baga koji se javlja RETKO i samo pod odredjenim okolnostima (vise zahteva u isto vreme). Ovakvi bagovi su najtezi za pronalazenje jer "obicno radi, ponekad pukne". Pattern sa redom cekanja (Promise Queue) je standardno resenje.

---

## 12. Detaljna analiza koda — sigurnosni i kvalitetski audit

Ovo poglavlje opisuje STA se desava kada profesionalni programer pregledava vec ZAVRSENU aplikaciju. Posle v2 (590 testova, svi prolaze, aplikacija radi) — uradili smo **9 rundi detaljne analize**. Pronadjeno je **67 problema** — NISTA od toga nije izazivalo greske u normalnom koriscenju, ali su to stvari koje bi mogle da izazovu probleme u buducnosti ili u specificnim situacijama.

> **Analogija:** Zamisli da si zavrsila gradnju kuce. Sve radi — vrata se otvaraju, svetlo svetli, voda tece. Ali onda pozoves inspektora. On ne zivi u kuci — on gleda STRUKTURU: "Ovaj kabl nije uzemljen", "Ovaj ventil nema povratni ventil", "Ovde fali izolacija". Kuca i dalje radi, ali inspektor vidi probleme koje STANOVNIK ne vidi.

### 12.1 Mass Assignment — zastita od neovlascenog upisivanja

**Sta je mass assignment?** Kad korisnik posalje podatke na server (npr. popuni formu i klikne "Sacuvaj"), server prima te podatke kao objekat. Pitanje je: DA LI SERVER VERUJE SVEMU STO KORISNIK POSALJE?

```javascript
// OPASAN KOD — prima SVE sto korisnik posalje:
const vehicle = await Vehicle.create({ ...req.body });
// Korisnik moze da posalje: { make: "BMW", model: "X5", id: 999, deleted_at: null }
// Server bi kreirao vozilo sa ID-jem 999 i ponistio soft delete!

// BEZBEDAN KOD — prima SAMO dozvoljenja polja:
const VEHICLE_FIELDS = ['plate_number', 'vin', 'make', 'model', 'year', 'engine', 'mileage_km'];

const data = {};
VEHICLE_FIELDS.forEach(f => {
  if (req.body[f] !== undefined) data[f] = req.body[f];
});
const vehicle = await Vehicle.create(data);
// Cak i da korisnik posalje id: 999 — server ga ignorise jer 'id' NIJE u listi
```

**Analogija:** Zamisli da imas formular za prijem vozila sa 7 polja (marka, model, godiste...). Klijent popuni formular i doda jos jedno polje koje sam napisao: "Popust: 100%". Ako automatski prihvatas SVE sto je napisao — dajes mu popust. Ako GLEDAS SAMO definisana polja — ignorises njegov dodati red.

**Sta je `forEach` i zasto ga koristimo ovde?**

`forEach` je JavaScript metoda koja prolazi kroz svaki element niza i radi nesto sa njim. U nasem slucaju:

```javascript
VEHICLE_FIELDS.forEach(f => {
  if (req.body[f] !== undefined) data[f] = req.body[f];
});
// Ovo je isto kao da rucno napises:
// if (req.body['plate_number'] !== undefined) data['plate_number'] = req.body['plate_number'];
// if (req.body['vin'] !== undefined) data['vin'] = req.body['vin'];
// ... i tako za svako polje
// Ali umesto da pises 7 redova, pises 1
```

**Gde je ovo popravljeno u nasem kodu?** U 7 kontrolera:
- `vehicleController.js` — `VEHICLE_FIELDS`
- `companyController.js` — `COMPANY_FIELDS` + `CONTACT_FIELDS`
- `serviceItemController.js` — `ITEM_FIELDS`
- `clientController.js` — `CLIENT_UPDATE_FIELDS`
- `supplierController.js` — `SUPPLIER_FIELDS`
- `myVehicleController.js` — `MY_VEHICLE_FIELDS`
- `orderedPartController.js` — vec imao whitelist ✓

---

### 12.2 Status tranzicije — state machine

**Sta je state machine?** Sistem sa definisanim stanjima i dozvoljenim prelazima izmedju njih. Servisni nalog ima 7 statusa i NE MOZE da ide iz bilo kog u bilo koji.

```
na_cekanju → dijagnostika → u_procesu → zavrseno → isporuceno → preuzeto
                                ↑              ↓
                            ceka_deo ──────────┘
```

**Zasto je ovo bitno?** Bez ogranicenja, neko moze da vrati nalog iz `preuzeto` (klijent vec preuzeo auto) nazad u `na_cekanju` — sto nema smisla i kvari podatke/statistiku.

**Kako smo to resili:**

```javascript
// Mapa dozvoljenih prelaza — za svaki status pise KOJI statusi su dozvoljeni kao sledeci
const STATUS_TRANSITIONS = {
  na_cekanju:   ['dijagnostika', 'u_procesu', 'ceka_deo', 'zavrseno'],
  dijagnostika: ['na_cekanju', 'u_procesu', 'ceka_deo', 'zavrseno'],
  u_procesu:    ['na_cekanju', 'dijagnostika', 'ceka_deo', 'zavrseno'],
  ceka_deo:     ['na_cekanju', 'dijagnostika', 'u_procesu', 'zavrseno'],
  zavrseno:     ['isporuceno', 'preuzeto', 'u_procesu'],    // moze nazad u rad
  isporuceno:   ['preuzeto', 'zavrseno'],                    // moze nazad
  preuzeto:     []    // ← TERMINALNI status — nema dalje!
};

// Pri promeni statusa:
const allowed = STATUS_TRANSITIONS[sr.status];  // npr. ['dijagnostika', 'u_procesu', ...]
if (!allowed.includes(noviStatus)) {
  throw new ValidationError('Status ne moze sa "na_cekanju" na "preuzeto"');
}
```

**Analogija:** Zamisli kartu za avion: Check-in → Security → Gate → Avion. Ne mozes da se vratis sa aviona nazad na check-in. I ne mozes da preskocis security i odes direktno na gate. Svaki korak dozvoljava samo odredjene sledece korake.

**Sta je "terminalni status"?** Status iz koga NEMA izlaza. `preuzeto` je terminalni — kad klijent preuzme auto, nalog je ZAVRSEN zauvek. Lista dozvoljenih prelaza je prazan niz `[]`.

**Fajl:** `controllers/serviceRequestController.js`

---

### 12.3 Transaction i Row Lock — zastita od istovremenog pristupa

**Sta je transakcija?** Grupa operacija koje se izvrsavaju kao JEDNA celina — ili SVE uspeju, ili se SVE poniste. Kao bankovski transfer: oduzimas 100 din sa jednog racuna i dodajes 100 din na drugi. Ako dodavanje padne — i oduzimanje se ponistava.

**Sta je row lock?** Zakljucavanje reda u bazi za vreme obrade — drugi korisnici CEKAJU dok ne zavrsim. Bez toga:

```
Korisnik A: Cita nalog (status: na_cekanju)
Korisnik B: Cita nalog (status: na_cekanju)   ← B cita STARI status
Korisnik A: Menja status u "u_procesu"         ← A uspe
Korisnik B: Menja status u "dijagnostika"      ← B PREPISUJE A!
```

**Sa row lock-om:**
```
Korisnik A: Cita nalog SA ZAKLJUCAVANJEM (status: na_cekanju)
Korisnik B: Pokusava da cita — ali A drzi lock — B CEKA...
Korisnik A: Menja status u "u_procesu", otpusta lock
Korisnik B: Sada cita nalog (status: u_procesu) — VIDI ISPRAVAN STATUS
```

**Kako izgleda u kodu:**

```javascript
const updateStatus = async (req, res, next) => {
  const t = await sequelize.transaction();    // Zapocni transakciju
  try {
    const sr = await ServiceRequest.findByPk(req.params.id, {
      lock: true,       // ← SELECT ... FOR UPDATE — zakljucaj red
      transaction: t     // ← deo transakcije
    });

    // ... provera tranzicije i azuriranje ...

    await t.commit();    // Sve je OK — sacuvaj promene
  } catch (error) {
    await t.rollback();  // Nesto je poslo naopako — ponisti SVE
    next(error);
  }
};
```

**Analogija:** Zamisli da u banci postoji samo jedna kasa. Kad dodjes na red, kasirka zakljuca tvoj racun (lock). Dok obraduje tvoju transakciju, NIKO DRUGI ne moze da pristupa tvom racunu. Kad zavrsi — otkljuca i sledeci klijent moze da pristupi.

**Gde koristimo transakcije u nasem kodu:**
- `serviceRequestController.js` — kreiranje naloga, promena statusa
- `orderedPartController.js` — promena statusa porucenog dela
- `expenseController.js` — procesiranje ponavljajucih rashoda

---

### 12.4 Foreign Key validacija — provera da li referencirana stavka postoji

**Sta je Foreign Key (FK)?** Veza izmedju dve tabele. Kada kreiras servisni nalog, navedes `client_id: 5` — to ZNACI "ovaj nalog pripada klijentu sa ID-jem 5". Ali sta ako klijent 5 NE POSTOJI?

**Bez FK validacije:**
```javascript
// Korisnik posalje: { client_id: 99999, vehicle_id: 88888 }
// Server pokusa da kreira nalog...
// Baza baci: SequelizeForeignKeyConstraintError
// Korisnik vidi: "Doslo je do greske" — NERAZUMLJIVO!
```

**Sa FK validacijom:**
```javascript
// Server PRVO proveri:
const client = await Client.findByPk(req.body.client_id);
if (!client) throw new NotFoundError('Klijent nije pronadjen');  // ← RAZUMLJIVA poruka

const vehicle = await Vehicle.findByPk(req.body.vehicle_id);
if (!vehicle) throw new NotFoundError('Vozilo nije pronadjeno');

// Sve postoji — sada kreiraj nalog
```

**Analogija:** Zamisli da narudzbenicu popunjavas sa brojem dobavljaca. Bez provere — salje se narudzbenica dobavljacu koji ne postoji. Sa proverom — PRVO pogledas u registar dobavljaca da li taj broj postoji.

**Bonus — Cross-validation (ukrstena provera):**

Ponekad nije dovoljno samo proveriti da li nesto POSTOJI — treba proveriti i da li PRIPADA pravom roditelju:

```javascript
// Proveri da vozilo pripada IZABRANOM klijentu:
if (vehicle.client_id !== client_id) {
  throw new ValidationError('Vozilo ne pripada izabranom klijentu');
}
// Bez ove provere — mogao bi da kreiras nalog za Markovo vozilo pod Petrovim imenom
```

**Gde je ovo popravljeno:**
- `serviceRequestController.js` — vehicle-client cross-validation
- `vehicleController.js` — client_id, company_id
- `orderedPartController.js` — supplier_id, vehicle_id, service_request_id
- `communicationController.js` — client_id, service_request_id
- `companyController.js` — provera firme pre dohvatanja kontakata

---

### 12.5 Deaktivirani korisnik i refresh token

**Problem:** Kad admin deaktivira korisnika (`is_active = false`), korisnik i dalje moze da koristi refresh token da dobije novi access token. Prakticno — nikad nije STVARNO izlogovan!

**Zasto se ovo desava?** Access token traje 15 minuta i NIJE povezan sa bazom — server ga samo verifikuje kriptografski. To znaci da cak i da deaktiviras korisnika, on moze da koristi postojeci access token JOS 15 minuta. Ali posle tih 15 minuta, korisnik bi trebalo da bude DEFINITIVNO izlogovan. Problem je bio sto refresh token flow NIJE proveravao `is_active`.

**Popravka:**
```javascript
const refreshToken = async (req, res, next) => {
  // ... verifikuj token i nadji korisnika u bazi ...

  // NOVA PROVERA:
  if (!user.is_active) {
    throw new AuthenticationError('Nalog je deaktiviran');
  }

  // ... generisi novi access token ...
};
```

**Analogija:** Zamisli radnika u firmi koji je dobio ottkaz. Njegova kartica za ulaz (access token) radi JOS do kraja dana. Ali SUTRA UJUTRU, kad pokusa da je produzi (refresh) — sistem kaze "Niste vise zaposleni" i kartica prestaje da vazi.

**Fajl:** `controllers/authController.js`

---

### 12.6 SequelizeForeignKeyConstraintError — sigurnosna mreza

Cak i sa svim FK validacijama, moze se desiti da nesto promaknne — edge case koji nismo predvideli. Za te slucajeve, dodali smo "sigurnosnu mrezu" u centralizovani error handler:

```javascript
// U middlewares/errorHandler.js:
if (err.name === 'SequelizeForeignKeyConstraintError') {
  statusCode = 400;
  errorCode = 'FK_CONSTRAINT_ERROR';
  message = 'Referencirana stavka ne postoji ili je obrisana';
}
```

Ovo NIKAD ne bi trebalo da se desi ako su FK validacije ispravne — ali ako se desi, korisnik ce dobiti razumljivu poruku umesto "500 Internal Server Error".

**Analogija:** Ako ti kuca ima alarm na vratima (FK validacija) i alarm na prozorima (FK validacija) — error handler je kao kamera na ulazu u dvoriste. Ne treba ti ako alarmi rade, ali ako neko nadje put oko alarma — kamera te obaveshtava.

---

### 12.7 Tiha izgubljena podatak — najsuptilniji bag

Ovo je mozda NAJBITNIJA lekcija iz cele analize.

**Problem:** Korisnik popuni polje "Potrebna usluga" (`needed_service`) za licno vozilo. Klikne "Sacuvaj". Dobije zelenu poruku "Vozilo kreirano". Otvori vozilo ponovo — polje je PRAZNO. Podatak je izgubljen bez ikakve greske.

**Zasto?** Kad smo dodavali whitelist pattern (12.1), popisali smo SVA polja vozila. Ali `needed_service` smo PROPUSTILI:

```javascript
// MY_VEHICLE_FIELDS NIJE imao 'needed_service':
const MY_VEHICLE_FIELDS = ['plate_number', 'vin', 'make', 'model', 'year',
  'engine', 'mileage_km', 'purchase_price_rsd', 'selling_price_rsd',
  'status', 'notes'];
// ← 'needed_service' FALI!

// Korisnik posalje: { make: "BMW", needed_service: "Mali servis" }
// Server uzme samo polja iz liste — 'needed_service' se TIHO IGNORISE
// Korisnik ne dobija gresku — jer je 'needed_service' OPCIONALNO polje
```

**Popravka:** Dodat `'needed_service'` u listu.

**Zasto je ovo toliko opasno?**
1. Korisnik NE DOBIJA gresku — misli da je sacuvano
2. Podatak je TRAJNO IZGUBLJEN — ne moze se vratiti
3. Greska se NIKAD NE POJAVI u logovima — server smatra da je sve OK
4. Bug je nastao UPRAVO ZBOG dodavanja zastite — nova zastita uvela novi problem

**Lekcija:** Svaka promena u kodu moze uvesti nove bagove — cak i promena koja POBOLJSAVA bezbednost. Zato se posle SVAKE promene treba vratiti i proveriti da li je sve pokriveno. Testovi pomazu — ali samo ako testiraju PRAVU stvar. U ovom slucaju, test bi morao da proveri da li se `needed_service` cuva — i TOGA NISMO IMALI.

---

### 12.8 JWT Refresh Secret — razdvajanje tajni

**Problem:** Access token i refresh token su se potpisivali ISTIM kljucem (`JWT_SECRET`). To znaci da bi neko ko ukrade access token mogao da ga iskoristi kao refresh token (i obrnuto).

**Popravka:** Dodata posebna env varijabla `JWT_REFRESH_SECRET`:

```javascript
// utils/tokenHelper.js:
const generateAccessToken = (user) => {
  return jwt.sign({ id: user.id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '15m' });
};

const generateRefreshToken = (user) => {
  return jwt.sign({ id: user.id, role: user.role },
    process.env.JWT_REFRESH_SECRET || process.env.JWT_SECRET,  // fallback za kompatibilnost
    { expiresIn: '7d' }
  );
};
```

**Sta je `|| process.env.JWT_SECRET`?** To je FALLBACK — ako `JWT_REFRESH_SECRET` ne postoji u `.env` fajlu, koristi `JWT_SECRET`. Ovo je bitno za kompatibilnost — postojeci refresh tokeni (potpisani sa starim kljucem) i dalje rade dok ne isteknu.

**Analogija:** Zamisli da kljuc od kancelarije otvara i garazni kontejner. Ako neko ukrade kljuc — pristupa svemu. Bolje: razliciti kljucevi za kancelariju i kontejner.

---

### 12.9 Frontend middleware — admin route check

**Problem:** Next.js middleware proveravao samo da li korisnik IMA token, ali NE koja je rola. Worker je mogao da pristupi admin-only stranicama (npr. /users, /finances) — samo frontend bi ga "sakrio" iz sidebar menija, ali direktnim URL-om mogao je pristupiti.

**Popravka:** Dodato citanje role iz JWT tokena u middleware-u:

```typescript
// frontend/middleware.ts:
function decodeTokenPayload(token: string) {
  try {
    const parts = token.split('.');
    const payload = JSON.parse(atob(parts[1]));  // JWT payload je base64 encoded
    return payload;
  } catch { return null; }
}

// Ako je admin-only ruta, proveri rolu:
const adminOnlyRoutes = ['/users', '/finances', '/exchange-rates', '/my-vehicles'];
if (adminOnlyRoutes.some(r => path.startsWith(r))) {
  const payload = decodeTokenPayload(token);
  if (payload?.role !== 'admin') {
    return NextResponse.redirect(new URL('/dashboard', req.url));
  }
}
```

**Sta je `atob()`?** Funkcija koja dekodira base64 string. JWT token ima 3 dela razdvojena tackama: `header.payload.signature`. Payload je base64-encoded JSON sa podacima korisnika (id, role, exp). `atob` ga pretvara nazad u citljiv JSON.

**BITNO:** Ovo je KLIJENTSKA provera — dodatan sloj zastite. Prava zastita je na BACKENDU (`requireRole('admin')` middleware). Cak i da neko zaobidje frontend middleware, backend ce ga odbiti. Ali frontend middleware sprecava nepotreban API poziv i daje bolji UX (instant redirect umesto greske posle ucitavanja).

---

### Ukupni rezultat detaljne analize

Posle svih 9 rundi:

```
Pronadjeno problema:    67
Reseno:                 67
Otvoreno:               0

Nove migracije:         4
Izmenjeni kontroleri:   16 od 18
Izmenjeni frontend:     ~15 fajlova
Novi testovi:           15

Testovi pre:            609/609 PASS ✓
Testovi posle:          609/609 PASS ✓
```

### Sta smo naucili iz detaljne analize?

1. **"Radi" nije isto sto i "bezbedno".** Aplikacija je savrseno funkcionisala za normalne korisnike — svi testovi prolazili. Ali detaljnom analizom pronadjeno je 67 problema, od kojih 8 kriticnih.

2. **Whitelist pattern je standard.** NIKAD ne veruj podacima koje korisnik salje. Defninisi listu dozvoljenih polja i SAMO ta polja prihvati. Ali pazi — proveri da su SVA legitimna polja u listi!

3. **State machine za statuse.** Svaki entitet sa statusom mora imati definisane dozvoljene prelaze. Terminalni statusi nemaju izlaz.

4. **Transakcije za vise operacija.** Kad menjas vise stvari odjednom — ili SVE uspe, ili se SVE ponisti.

5. **Row lock za konkurentnost.** Kad dva korisnika istovremeno menjaju isti red — `lock: true` sprecava konflikte.

6. **FK validacija pre kreiranje.** Uvek proveri da li referencirana stavka postoji pre nego sto je koristis. Korisnik zasluzuje razumljivu poruku, ne tehnicku Sequelize gresku. Ovo vazi i za polimorfne veze (reminder → client/vehicle/service_request).

7. **Svaka zastita moze uvesti novi bag.** Dodavanje whitelist-a zastitilo od mass assignment-a, ali prouzrokovalo data loss za `needed_service`. Proveravaj posledice svake promene.

8. **Deaktivacija korisnika != izlogovanje.** Access token radi do isteka (15 min), ali refresh MORA da proveri `is_active`.

9. **Dubina analize raste sa iskustvom.** Runda 1 nasla povrsinske probleme. Runda 7 nasla suptilne data loss bagove. Runde 8-9 nasle edge case-ove (polimorfni FK, orphan zapisi, bounds validation). Svaka runda ide dublje.

10. **Verifikacija nalaza je kljucna.** Automatska analiza moze dati lazne pozitive — od ~30 prijavljenih problema u rundama 8-9, samo 11 je bilo realno. Uvek proveri nalaze citanjem koda pre popravke.

11. **Orphan zapisi kvare integritet podataka.** Komunikacija bez klijenta I bez naloga je siroce — nema vezu ni sa kim. Uvek trazi minimum jednu vezu.

12. **Bounds checking za numerike.** `parseInt("13")` za mesec daje 13, a `new Date(2026, 12, 1)` je januar 2027 — tiho pogresan rezultat. Uvek validiraj opseg.

> **Za detaljan izvestaj svake runde sa brojevima, tabelama i hronologijom — pogledaj `documentation/AUDIT-REPORT.md`.**
