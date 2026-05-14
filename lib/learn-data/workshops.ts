import { Workshop } from '@/components/learn/WorkshopStep';

export const WORKSHOPS: Workshop[] = [
  {
    id: 'workshop-1',
    title: 'Postavi backend od nule',
    goal: 'Napravi potpuno nov Express backend sa Claude Code-om — od praznog foldera do prvog API endpointa.',
    prerequisite: 'Instaliran Node.js, MySQL, i Claude Code na računaru.',
    intro: `Ovo je tvoja prva prava radionica. Napravićeš backend server koji može da prima zahteve i šalje odgovore.

Ne moraš znati da pišeš kod — Claude Code će to uraditi za tebe. Tvoj posao je da mu OBJASNIŠ šta želiš, pratiš šta radi, i proveriš da li radi kako treba.

Ključna veština: naučiti da KOMUNICIRAŠ sa AI alatom — jasno, precizno, korak po korak.`,
    steps: [
      {
        title: 'Napravi prazan folder za projekat',
        description: 'Otvori terminal (Command Prompt ili PowerShell) i napravi nov folder gde ćeš raditi.',
        claudePrompt: `mkdir moj-servis
cd moj-servis`,
        tip: 'Ime foldera neka bude kratko, bez razmaka i bez srpskih slova. "moj-servis" je savršeno.',
        expectedResult: 'Nalazite se u novom, praznom folderu "moj-servis".',
      },
      {
        title: 'Kopiraj CLAUDE.md i handoff sistem u projekat',
        description: `Ovo je NAJVAŽNIJI korak koji se nikad ne preskače!

CLAUDE.md je fajl sa svim pravilima, konvencijama i uputstvima za razvoj. Bez njega, Claude Code radi "na slepo" — ne zna koje tehnologije da koristi, ne prati MVC strukturu, ne piše testove kako treba.

Handoff folder (.claude/) sadrži konfiguraciju agenata, skillova i komandi — ceo sistem koji automatizuje razvoj.

Trebaš da kopiraš:
1. CLAUDE.md → u root tvog projekta (moj-servis/CLAUDE.md)
2. .claude/ folder → u root tvog projekta (moj-servis/.claude/)

Ovo dobijaš od mentora ili iz repozitorijuma tima. Bez ovog fajla, Claude Code NEĆE pratiti standarde iz ovog kursa.`,
        claudePrompt: `copy C:\\putanja\\do\\CLAUDE.md .
xcopy /E /I C:\\putanja\\do\\.claude .claude`,
        tip: `Zameni putanju sa stvarnom lokacijom gde se nalaze CLAUDE.md i .claude/ folder.

Kada Claude Code otvori projekat i vidi CLAUDE.md, automatski ga čita i prati sva pravila. To znači:
- Koristiće tačno tehnologije koje smo definisali (Express, Sequelize, MySQL...)
- Pratiće MVC strukturu (routes → controllers → models)
- Lozinke će uvek hashovati, nikad hardkodirati
- Koristiće migracije, nikad sync
- Pisaće testove po standardu
- Commit poruke će biti u Conventional Commits formatu

Bez CLAUDE.md → Claude radi šta hoće. Sa CLAUDE.md → Claude radi po NAŠIM pravilima.`,
        expectedResult: 'U folderu moj-servis/ se nalaze CLAUDE.md fajl i .claude/ folder. Možeš proveriti sa "dir" ili "ls".',
      },
      {
        title: 'Otvori Claude Code',
        description: 'Sada kada je CLAUDE.md na mestu, otvori Claude Code u tom folderu. Čim se pokrene, pročitaće CLAUDE.md i znaće sva pravila.',
        claudePrompt: 'claude',
        tip: 'Kada se Claude Code pokrene, u statusu ćeš videti da je pročitao CLAUDE.md. Od tog trenutka, on "zna" sve konvencije i standarde tvog tima.',
        expectedResult: 'Claude Code se otvorio, pročitao CLAUDE.md, i spreman je za rad po definisanim standardima.',
      },
      {
        title: 'Objasni Claude-u šta praviš',
        description: `Pre nego što kažeš "napravi mi backend", daj Claude-u KONTEKST. On radi bolje kada zna celinu.

Zamisi da si upravo zaposlio novog programera — ne bi mu rekao samo "napravi backend". Rekao bi mu o čemu se radi, šta treba da radi, koje tehnologije da koristi.`,
        claudePrompt: `Pravimo backend za jednostavan auto servis. Koristićemo Express.js, Sequelize ORM i MySQL bazu.

Za početak mi samo postavi projekat:
- Inicijalizuj npm projekat
- Instaliraj Express, Sequelize, mysql2, dotenv, cors, nodemon
- Napravi app.js sa osnovnim Express serverom na portu 5000
- Dodaj jedan GET /health endpoint koji vraća { status: "OK" }
- Napravi .env fajl sa PORT=5000
- Dodaj "dev" skriptu u package.json koja koristi nodemon

Nemoj ništa više od ovoga za sada.`,
        tip: `Primeti kako smo rekli "nemoj ništa više od ovoga". Ovo je BITNO — bez toga Claude može da napravi 20 fajlova odjednom. Vodi ga korak po korak.

Takođe, primeti da smo nabrojali TAČNO šta očekujemo. Što precizniji budeš, bolji rezultat dobijaš.`,
        expectedResult: 'Claude je kreirao package.json, instalirao pakete, napravio app.js i .env.',
      },
      {
        title: 'Pokreni server i proveri da radi',
        description: 'Reci Claude-u da pokrene server. Ili to možeš sam iz drugog terminala.',
        claudePrompt: 'Pokreni server sa npm run dev i probaj GET /health endpoint.',
        tip: 'Ako nešto ne radi, ne paničari. Kopiraj grešku i pošalji je Claude-u — on će je popraviti. To je normalan tok razvoja.',
        expectedResult: 'Server radi na localhost:5000. Kada otvoriš http://localhost:5000/health u browseru vidiš { "status": "OK" }.',
      },
      {
        title: 'Dodaj strukturu foldera',
        description: `Sada kada osnova radi, reci Claude-u da napravi strukturu foldera. U pravom projektu, svaka vrsta fajla ima svoje mesto.`,
        claudePrompt: `Napravi sledeću strukturu foldera za naš backend, ali za sada ostavi foldere prazne (samo napravi foldere):
- routes/ — ovde će ići definicije ruta
- controllers/ — ovde logika za svaki endpoint
- models/ — Sequelize modeli (tabele u bazi)
- middlewares/ — middleware funkcije (auth, error handling)
- config/ — konfiguracija (baza, logger)
- utils/ — pomoćne funkcije`,
        expectedResult: 'Imaš organizovanu strukturu foldera. Svaka vrsta koda ima svoje mesto.',
      },
      {
        title: 'Poveži se na MySQL bazu',
        description: `Sada trebamo da povežemo naš server sa bazom podataka. Claude treba da zna koje podatke za konekciju da koristi.`,
        claudePrompt: `Podesi Sequelize konekciju na MySQL bazu:
- Baza se zove: moj_servis_db (kreiraj je ako ne postoji)
- Host: localhost, Port: 3306
- User: root, Password: (prazan ili stavi moj password ovde)
- Koristi dotenv za čuvanje konfiguracije u .env fajlu
- Dodaj proveru konekcije pri pokretanju servera — da se vidi u konzoli da li je baza povezana ili ne
- Inicijalizuj Sequelize CLI (npx sequelize-cli init) da imamo config/, models/, migrations/, seeders/ foldere`,
        tip: `Ako imaš lozinku za MySQL, reci je Claude-u. On će je staviti u .env fajl koji se NE COMMITUJE u git. To je siguran način.

Ako nisi siguran/a koji su ti podaci za MySQL — pitaj Claude-a: "Kako da proverim da li mi MySQL radi i koji su mi podaci za pristup?"`,
        expectedResult: 'Server se pokrene i u konzoli vidiš poruku "Database connected successfully" ili sličnu.',
      },
    ],
    whatYouLearned: [
      'Zašto je CLAUDE.md fajl obavezan u svakom projektu — pravila i standardi za ceo tim',
      'Šta je handoff sistem (.claude/ folder) i kako automatizuje razvoj',
      'Kako započeti razgovor sa Claude Code-om — daj kontekst pre zahteva',
      'Kako voditi AI korak po korak umesto da tražiš sve odjednom',
      'Šta je Express server i kako se pokreće',
      'Šta je .env fajl i zašto se koristi za konfiguraciju',
      'Kako se Node.js projekat organizuje u foldere',
      'Kako povezati aplikaciju sa MySQL bazom',
    ],
  },
  {
    id: 'workshop-2',
    title: 'Napravi prvi model i API',
    goal: 'Kreiraj Client (klijent) tabelu u bazi i napravi CRUD API endpointe — sve kroz razgovor sa Claude Code-om.',
    prerequisite: 'Završena radionica 1 (imaš Express server povezan na MySQL, CLAUDE.md i .claude/ folder u projektu).',
    intro: `U ovoj radionici ćeš napraviti prvu "stvar" u sistemu — klijente auto servisa.

Naučićeš najvažniju veštinu rada sa Claude Code-om: kako da mu OPIŠEŠ podatke i ponašanje koje želiš, a on da to pretvori u kod.

Zapamti: ti si "menadžer projekta", Claude je "developer". Ti govoriš ŠTA, on radi KAKO.`,
    steps: [
      {
        title: 'Opiši Claude-u šta je klijent',
        description: `Pre nego što kažeš "napravi model", objasni Claude-u šta je klijent u kontekstu tvog auto servisa. Što više konteksta daš, bolji kod dobiješ.`,
        claudePrompt: `U našem auto servisu, klijent je osoba koja dovodi vozilo na popravku. Svaki klijent ima:
- Ime i prezime (obavezno)
- Email (obavezan, jedinstven — ne mogu dva klijenta imati isti email)
- Broj telefona (obavezan)
- Tip: fizičko lice (b2c) ili firma (b2b)
- Naziv firme (samo ako je tip b2b, inače prazno)

Napravi:
1. Sequelize model za Client sa svim ovim poljima
2. Migraciju koja kreira tabelu u bazi
3. Pokreni migraciju da se tabela stvarno kreira

Koristi timestamps (created_at, updated_at) i soft delete (paranoid: true, deleted_at).
Imena kolona u bazi neka budu snake_case (first_name, ne firstName).`,
        tip: `Primeti da smo objasnili POSLOVNO značenje ("osoba koja dovodi vozilo"), ne samo tehničke detalje. Ovo pomaže Claude-u da donese bolje odluke — npr. da email bude jedinstven.

Rekli smo i "pokreni migraciju" — inače bi je samo kreirao ali ne i pokrenuo.`,
        expectedResult: 'U bazi postoji tabela "clients" sa svim kolonama. Možeš proveriti u MySQL.',
      },
      {
        title: 'Zatraži CRUD endpointe',
        description: `CRUD = Create, Read, Update, Delete — četiri osnovne operacije sa podacima. Reci Claude-u da napravi API za sve četiri.`,
        claudePrompt: `Napravi kompletne CRUD API endpointe za klijente:

POST   /api/v1/clients      — kreiraj novog klijenta
GET    /api/v1/clients      — prikaži listu svih klijenata (sa paginacijom i pretragom)
GET    /api/v1/clients/:id  — prikaži jednog klijenta po ID-u
PUT    /api/v1/clients/:id  — izmeni podatke klijenta
DELETE /api/v1/clients/:id  — obriši klijenta (soft delete)

Napravi:
- Route fajl: routes/clientRoutes.js
- Controller fajl: controllers/clientController.js

Za listu klijenata dodaj:
- Paginacija: ?page=1&limit=20
- Pretraga: ?search=marko (pretražuje po imenu, emailu, telefonu)
- Sortiranje: ?sort=created_at&order=DESC

Za svaki response koristi format:
{ "success": true, "data": {...}, "message": "..." }

Povezi rute u app.js.`,
        tip: `Ovde smo bili VRLO precizni — nabrojali smo tačne URL-ove, query parametre, i format odgovora. Kad radiš sa AI-jem, preciznost je tvoj najbolji prijatelj.

Ako ovo izgleda kao puno teksta — ne brini, vremenom ćeš ove stvari pisati brže jer ćeš znati šta treba.`,
        expectedResult: 'Imaš fajlove routes/clientRoutes.js i controllers/clientController.js. Rute su povezane u app.js.',
      },
      {
        title: 'Testiraj ručno',
        description: `Sada proveri da li endpointi rade. Reci Claude-u da ti pomogne da ih testiraš.`,
        claudePrompt: `Testiraj CRUD endpointe za klijente:

1. Kreiraj klijenta — POST /api/v1/clients sa podacima:
   { "name": "Marko Petrović", "email": "marko@test.com", "phone": "065-111-2233", "type": "b2c" }

2. Dohvati listu — GET /api/v1/clients

3. Dohvati tog jednog klijenta po ID-u

4. Izmeni mu email na "marko.novo@test.com"

5. Obriši ga

Pokaži mi šta svaki endpoint vraća.`,
        tip: `Ovo je tvoja prva "mini provera kvaliteta". Navikni se da UVEK testiraš posle implementacije — ne veruj da radi dok ne vidiš da radi.

Ako neki endpoint vrati grešku, samo kopiraj grešku Claude-u i reci "ovo ne radi, popravi".`,
        expectedResult: 'Svih 5 operacija radi. Kreiranje vraća 201, čitanje 200, brisanje soft-deletuje (ne briše fizički).',
      },
      {
        title: 'Dodaj seed podatke',
        description: `Prazna baza je dosadna za testiranje. Zatraži od Claude-a da napravi test podatke.`,
        claudePrompt: `Napravi Sequelize seeder koji ubacuje 5 test klijenata u bazu:
- Marko Petrović (b2c)
- Ana Jovanović (b2c)
- Nikola Đorđević (b2b, firma: "ND Transport d.o.o.")
- Jelena Stanković (b2c)
- Dragan Milošević (b2b, firma: "AutoFlota Srbija")

Svi sa srpskim telefonima (065, 064, 069...) i raznim email adresama.
Posle napravi, pokreni seeder.`,
        expectedResult: 'GET /api/v1/clients sada vraća 5 klijenata. Paginacija pokazuje totalItems: 5.',
      },
      {
        title: 'Dodaj validaciju',
        description: `Trenutno, ako pošalješ prazan request na POST /api/v1/clients, verovatno ćeš dobiti ružnu grešku. Dodajmo validaciju — da API lepo kaže korisniku šta fali.`,
        claudePrompt: `Dodaj validaciju za klijent endpointe koristeći express-validator:

Za kreiranje (POST) i izmenu (PUT):
- name: obavezno, minimum 2 karaktera
- email: obavezan, mora biti validan email format, mora biti jedinstven (ne može dva klijenta sa istim emailom)
- phone: obavezan
- type: mora biti "b2c" ili "b2b"
- company: obavezno AKO je type "b2b"

Ako validacija ne prođe, vrati 400 sa jasnom porukom koja polja fale ili su neispravna.

Instaliraj express-validator ako već nije instaliran.`,
        tip: `Validacija je ono što razdvaja amaterski API od profesionalnog. Bez nje, korisnik može poslati besmislene podatke i pokvariti bazu.

Posle ovog koraka, probaj sam da pošalješ prazan request (bez podataka) i vidi kakvu poruku dobiješ.`,
        expectedResult: 'POST /api/v1/clients bez podataka vraća 400 sa listom grešaka: "name je obavezan", "email je obavezan", itd.',
      },
    ],
    whatYouLearned: [
      'Kako opisati entitet (podatke) Claude Code-u — poslovno + tehnički',
      'Šta je CRUD i kako se pravi API za svaku operaciju',
      'Šta je Sequelize model, migracija i seeder',
      'Zašto je paginacija bitna (nikad ne vraćaj SVE podatke odjednom)',
      'Šta je validacija i zašto je obavezna',
      'Kako testirati API — ne veruj da radi dok ne proveriš',
    ],
  },
  {
    id: 'workshop-3',
    title: 'Dodaj vozila sa relacijom',
    goal: 'Napravi Vehicle (vozilo) entitet koji je povezan sa klijentom — jedan klijent može imati više vozila.',
    prerequisite: 'Završena radionica 2 (imaš Client model i CRUD API, CLAUDE.md u projektu).',
    intro: `Sada dodaješ drugi entitet koji je POVEZAN sa prvim. Ovo je ključan koncept u bazama podataka — relacije.

Razmisli ovako: u auto servisu, klijent Marko ima Golf 7 i Octaviu. To znači da jedna osoba može imati VIŠE vozila. Ali svako vozilo pripada JEDNOM klijentu.

Ovo se u bazi rešava tako što u tabeli vozila postoji kolona "client_id" koja kaže "ovo vozilo pripada klijentu #3".`,
    steps: [
      {
        title: 'Objasni Claude-u šta je vozilo i kako je povezano sa klijentom',
        description: 'Kao i prošli put — prvo kontekst, pa tek onda tehnički zahtevi.',
        claudePrompt: `Sada dodajemo vozila u naš auto servis. Svako vozilo pripada jednom klijentu (jedan klijent može imati više vozila).

Vozilo ima:
- Marka (brand): npr. Volkswagen, Fiat, Toyota (obavezno)
- Model: npr. Golf 7, 500, Yaris (obavezno)
- Godište (year): npr. 2018 (obavezno, broj)
- Registarska oznaka (plate): npr. BG-123-AA (obavezno, jedinstvena)
- VIN broj: opciono (17 karaktera ako se unese)

Relacija: Vozilo PRIPADA jednom klijentu. Klijent MOŽE IMATI više vozila.

Napravi:
1. Sequelize model za Vehicle
2. Migraciju sa foreign key na clients tabelu
3. Definiši asocijacije: Client hasMany Vehicle, Vehicle belongsTo Client
4. Pokreni migraciju`,
        tip: `Obrati pažnju na to kako smo objasnili relaciju PROSTIM jezikom pre tehničkih termina. Claude razume oba, ali poslovni kontekst mu pomaže da napravi bolje odluke.

Rekli smo i "foreign key" i "hasMany/belongsTo" — ako ne znaš te termine, možeš reći samo: "Svako vozilo pripada jednom klijentu, klijent može imati više vozila" i Claude će shvatiti.`,
        expectedResult: 'U bazi postoji tabela "vehicles" sa kolonom client_id koja referencira clients tabelu.',
      },
      {
        title: 'Zatraži CRUD endpointe za vozila',
        description: 'Isti pattern kao za klijente, ali sa jednom razlikom — kada dohvataš vozilo, želiš da vidiš i podatke o klijentu.',
        claudePrompt: `Napravi CRUD API za vozila, isti pattern kao za klijente:

POST   /api/v1/vehicles      — kreiraj novo vozilo (mora imati client_id)
GET    /api/v1/vehicles      — lista svih vozila sa paginacijom i pretragom
GET    /api/v1/vehicles/:id  — jedno vozilo po ID-u
PUT    /api/v1/vehicles/:id  — izmeni vozilo
DELETE /api/v1/vehicles/:id  — obriši (soft delete)

BITNO:
- Kada prikazuješ vozilo, prikaži i IME klijenta kome pripada (Sequelize include)
- Pretraga pretražuje po marki, modelu i tablicama
- Dodaj i endpoint: GET /api/v1/clients/:id/vehicles — sva vozila jednog klijenta
- Dodaj validaciju (brand, model, year, plate obavezni; plate jedinstven)

Napravi routes/vehicleRoutes.js i controllers/vehicleController.js.`,
        tip: `Primeti novi endpoint: GET /api/v1/clients/:id/vehicles. Ovo je "ugnežđena ruta" — kaže "daj mi vozila klijenta sa ovim ID-jem".

Ovo je čest pattern u API dizajnu. Umesto da filtriraš listu svih vozila, imaš direktan endpoint za vozila jednog klijenta.`,
        expectedResult: 'CRUD za vozila radi. GET /api/v1/vehicles vraća vozila sa imenom klijenta.',
      },
      {
        title: 'Dodaj seed podatke za vozila',
        description: 'Napravi test podatke za vozila — poveži ih sa postojećim klijentima.',
        claudePrompt: `Napravi seeder za 6 test vozila, povezanih sa postojećim klijentima:
- Marko: Volkswagen Golf 7 (2018, BG-123-AA) i Škoda Octavia (2020, BG-456-BB)
- Ana: Fiat 500 (2019, NS-789-CC)
- Nikola: Mercedes Sprinter (2021, KG-012-DD)
- Jelena: Toyota Yaris (2022, NI-345-EE)
- Dragan: Renault Kangoo (2020, BG-678-FF)

Pokreni seeder posle kreiranja.`,
        expectedResult: 'GET /api/v1/vehicles vraća 6 vozila. GET /api/v1/clients/1/vehicles vraća 2 vozila (Markov Golf i Octavia).',
      },
      {
        title: 'Testiraj relaciju — obriši klijenta i vidi šta se desi sa vozilima',
        description: `Ovo je važan test — šta se dešava sa vozilima kada obrišeš klijenta? U dobro dizajniranom sistemu, vozila ne "vise" bez klijenta.`,
        claudePrompt: `Testiraj ovo: šta se desi sa vozilima kada obrišem klijenta?

Probaj da obrišeš klijenta koji ima vozila. Da li se vozila brišu? Da li ostaju bez klijenta?

Ako vozila ostanu "siročad" (bez klijenta), napravi zaštitu:
- Ne dozvoli brisanje klijenta koji ima vozila
- Vrati poruku: "Ne možete obrisati klijenta koji ima vozila. Prvo obrišite ili prebacite vozila."`,
        tip: 'Ovo se zove "referentni integritet" — baza podataka treba da bude KONZISTENTNA. Ne sme da postoji vozilo čiji klijent ne postoji. Ovo je česta greška u amaterskim projektima.',
        expectedResult: 'DELETE /api/v1/clients/:id vraća grešku ako klijent ima vozila. Prvo moraš obrisati vozila.',
      },
    ],
    whatYouLearned: [
      'Kako objasniti relaciju (vezu) između podataka Claude Code-u',
      'Šta je foreign key i zašto je bitan',
      'Šta su Sequelize asocijacije (hasMany, belongsTo)',
      'Kako prikazati povezane podatke u API odgovoru (include)',
      'Šta je referentni integritet i zašto se štiti',
      'Pattern: isti CRUD za svaki entitet, ali sa specifičnostima',
    ],
  },
  {
    id: 'workshop-4',
    title: 'Dodaj autentifikaciju (login sistem)',
    goal: 'Napravi User model, registraciju, login, JWT tokene, i zaštiti API endpointe — samo prijavljeni korisnici mogu pristupiti.',
    prerequisite: 'Završena radionica 3 (imaš Client i Vehicle sa relacijom, CLAUDE.md u projektu).',
    intro: `Do sada je tvoj API bio "otvoren" — svako je mogao da kreira, menja i briše klijente. U pravom svetu, to je ogroman problem.

Sada dodaješ ZAŠTITU:
1. Korisnik mora da se REGISTRUJE (napravi nalog)
2. Korisnik mora da se PRIJAVI (login) i dobije TOKEN
3. Token se šalje sa svakim zahtevom kao dokaz identiteta
4. Bez tokena → nema pristupa

Zamisli token kao propusnicu na koncertu. Jednom pokažeš ličnu kartu (login), dobiješ narukvicu (token), i posle samo pokazuješ narukvicu.`,
    steps: [
      {
        title: 'Napravi User model',
        description: 'Korisnički nalozi sa emailom, lozinkom i rolom (admin ili radnik).',
        claudePrompt: `Napravi User model za autentifikaciju:

Korisnik ima:
- email (obavezan, jedinstven)
- password (obavezan, minimum 6 karaktera) — MORA se hashovati pre čuvanja u bazu (nikad čuvati lozinku u čistom tekstu!)
- role: "admin" ili "worker" (default: "worker")
- first_name, last_name (obavezni)

Koristi bcryptjs za hashovanje lozinke.
Dodaj metodu na model: comparePassword(candidatePassword) — za proveru pri loginu.

Napravi migraciju i pokreni je.
Napravi seeder sa 2 korisnika:
- Admin: admin@servis.rs / admin123
- Radnik: radnik@servis.rs / radnik123`,
        tip: `NIKAD se ne čuva lozinka u čistom tekstu. Ako neko hakuje bazu, ne sme da vidi lozinke. bcrypt pretvara "admin123" u nešto kao "$2b$10$K7L1OJ45..." — ne može se dekriptovati nazad.`,
        expectedResult: 'U bazi postoji tabela users sa hashovanim lozinkama (kolona password sadrži hash, ne čist tekst).',
      },
      {
        title: 'Napravi register i login endpointe',
        description: 'Registracija kreira nalog, login proverava kredencijale i vraća JWT token.',
        claudePrompt: `Napravi auth endpointe:

POST /api/v1/auth/register
- Prima: email, password, first_name, last_name
- Proveri da email nije zauzet
- Hashuj lozinku
- Kreiraj korisnika
- Vrati JWT access token (istekne za 15 minuta) i refresh token (istekne za 7 dana)

POST /api/v1/auth/login
- Prima: email, password
- Proveri da korisnik postoji
- Proveri da je lozinka tačna (bcrypt compare)
- Vrati access token + refresh token

POST /api/v1/auth/refresh
- Prima: refresh token
- Verifikuj ga
- Vrati novi access token

Koristi jsonwebtoken biblioteku.
JWT_SECRET stavi u .env fajl.

Napravi routes/authRoutes.js i controllers/authController.js.`,
        tip: `Dva tokena imaju različite uloge:
- Access token: kratak (15 min), šalje se sa svakim zahtevom
- Refresh token: dug (7 dana), koristi se SAMO za dobijanje novog access tokena

Zašto dva? Ako neko ukrade access token, može ga koristiti samo 15 min. Refresh token se šalje retko, pa je teže ukrasti.`,
        expectedResult: 'POST /api/v1/auth/login sa admin@servis.rs / admin123 vraća token. POST sa pogrešnom lozinkom vraća 401.',
      },
      {
        title: 'Zaštiti postojeće endpointe',
        description: 'Sada dodaj zaštitu — svi client i vehicle endpointi zahtevaju token.',
        claudePrompt: `Napravi auth middleware koji štiti rute:

middlewares/authMiddleware.js:
- Čita "Authorization: Bearer <token>" header
- Verifikuje JWT token
- Ako je token validan — dodaj korisnikove podatke na req.user i propusti dalje
- Ako nema tokena → vrati 401 "Token nije prosleđen"
- Ako je token istekao → vrati 401 "Token je istekao"
- Ako je token nevažeći → vrati 401 "Nevažeći token"

Primeni ovaj middleware na SVE client i vehicle rute.
Auth rute (register, login, refresh) ne smeju imati ovaj middleware — one su javne.`,
        tip: `Posle ovog koraka, tvoji stari zahtevi (GET /api/v1/clients) neće više raditi bez tokena — dobijaš 401. To je OČEKIVANO — to znači da zaštita radi!

Da bi testirao, moraš prvo da se loginuješ, uzmeš token, pa ga šalješ u headeru.`,
        expectedResult: 'GET /api/v1/clients bez tokena → 401. Sa validnim tokenom iz login-a → 200 sa podacima.',
      },
      {
        title: 'Testiraj ceo auth flow',
        description: 'Proveri kompletnu priču: registracija → login → pristup zaštićenom endpointu → istekao token → refresh.',
        claudePrompt: `Testiraj kompletnu autentifikaciju:

1. Registruj novog korisnika: POST /api/v1/auth/register sa novim podacima
2. Loginuj se: POST /api/v1/auth/login sa tim podacima
3. Sa dobijenim tokenom pristupi: GET /api/v1/clients
4. Probaj pristup BEZ tokena — potvrdi da vraća 401
5. Probaj login sa POGREŠNOM lozinkom — potvrdi da vraća 401
6. Probaj refresh token endpoint

Pokaži mi rezultat svakog koraka.`,
        tip: 'Ovo je tvoja "security checklist". U pravom projektu, testirali bismo još: šta ako pošaljem tuđi token? Šta ako modifikujem token? Šta ako je token za obrisanog korisnika?',
        expectedResult: 'Svih 6 testova prolazi. Korisnik može pristupiti API-ju samo sa validnim tokenom.',
      },
    ],
    whatYouLearned: [
      'Kako objasniti Claude-u sigurnosne zahteve (hashovanje, tokeni)',
      'Šta je JWT i kako access + refresh token sistem radi',
      'Šta je middleware i kako štiti rute',
      'Zašto se lozinke NIKAD ne čuvaju u čistom tekstu',
      'Kako testirati autentifikaciju — uspešni i neuspešni scenariji',
      'Razlika između javnih i zaštićenih endpointa',
    ],
  },
  {
    id: 'workshop-5',
    title: 'Napravi frontend i poveži sa API-jem',
    goal: 'Napravi Next.js frontend koji prikazuje klijente iz tvog backend-a — login forma, lista klijenata, dodavanje novog.',
    prerequisite: 'Završena radionica 4 (imaš backend sa auth i CRUD endpointima, CLAUDE.md u projektu).',
    intro: `Do sada si radio/la samo sa backendom — slanje zahteva, dobijanje JSON odgovora. Ali korisnici ne koriste API direktno — oni koriste SAJT.

Sada praviš vizuelni deo — ono što korisnik vidi i sa čime interaguje. Frontend šalje zahteve na tvoj backend i prikazuje podatke u lepom formatu.

BITNO: Frontend i backend su ODVOJENI projekti. Frontend je u svom folderu sa svojim package.json. Pokrećeš ih u odvojenim terminalima.`,
    steps: [
      {
        title: 'Kreiraj Next.js projekat',
        description: 'Napravi frontend folder PORED backend-a (ne unutar njega). Claude Code treba da zna da su to dva odvojena projekta.',
        claudePrompt: `Sada pravimo frontend za naš auto servis. BITNO: frontend je ODVOJEN projekat od backenda.

Napravi Next.js projekat u folderu "frontend" (pored backend foldera):
- Koristi: npx create-next-app frontend --tailwind --app --ts
- Podesi tamnu temu (dark mode) u globals.css
- Napravi .env.local sa: NEXT_PUBLIC_API_URL=http://localhost:5000/api/v1

Struktura treba da bude:
moj-servis/
├── backend/    ← naš postojeći backend
├── frontend/   ← novi Next.js projekat
`,
        tip: `Dva terminala, dva projekta:
- Terminal 1: cd backend && npm run dev (port 5000)
- Terminal 2: cd frontend && npm run dev (port 3000)

Oba moraju raditi istovremeno da bi sajt radio.`,
        expectedResult: 'Frontend se pokreće na localhost:3000. Vidiš default Next.js stranicu sa tamnom temom.',
      },
      {
        title: 'Napravi axios instancu i login stranicu',
        description: 'Prvo napravimo centralno mesto za komunikaciju sa backendom, pa onda login formu.',
        claudePrompt: `Napravi dve stvari za frontend:

1. lib/api.ts — axios instanca:
- baseURL iz NEXT_PUBLIC_API_URL env varijable
- Request interceptor: automatski dodaje JWT token iz localStorage u Authorization header
- Response interceptor: ako dobije 401 — pokušaj refresh token, ako ne uspe — redirectuj na /login

2. app/login/page.tsx — Login stranica:
- Forma sa email i password poljem
- Dugme "Prijavi se"
- Kada korisnik klikne, pošalji POST /auth/login
- Ako uspe — sačuvaj token u localStorage, redirectuj na /dashboard
- Ako ne uspe — prikaži poruku greške
- Koristi Tailwind za styling (tamna tema, lepa forma po centru ekrana)

Napravi i lib/AuthContext.tsx — React Context za auth stanje:
- Čuva: user, token, isAuthenticated
- Funkcije: login(), logout()
- Wrap-uje celu app u layout.tsx`,
        tip: `Axios instanca je JEDNO mesto kroz koje prolazi SVA komunikacija sa backendom. Nikad ne importuj axios direktno u komponentama — uvek koristi ovu instancu.

Zašto? Jer interceptori automatski dodaju token i hendluju 401. Bez toga bi u SVAKOJ komponenti morao ručno da dodaješ token.`,
        expectedResult: 'Login stranica se prikazuje. Možeš se ulogovati sa admin@servis.rs / admin123 i bićeš redirektovan.',
      },
      {
        title: 'Napravi stranicu sa listom klijenata',
        description: 'Posle login-a, korisnik treba da vidi listu klijenata iz baze.',
        claudePrompt: `Napravi stranicu za prikaz klijenata:

app/dashboard/page.tsx — Dashboard sa linkom ka klijentima
app/clients/page.tsx — Lista klijenata

Na stranici klijenata:
- Dohvati klijente sa GET /clients (koristi lib/api.ts, NE direktno axios)
- Prikaži ih u tabeli: Ime, Email, Telefon, Tip (B2C/B2B)
- Dodaj search input iznad tabele za pretragu
- Dodaj paginaciju ispod tabele
- Tri stanja: Loading (spinner dok se učitavaju), Error (poruka ako nešto pukne), Empty ("Nema klijenata")

Koristi Tailwind za styling:
- Tamna tema (bg-gray-950, bg-gray-900 za kartice)
- Tabela sa hover efektom na redovima
- Responsive — da radi i na telefonu`,
        tip: `Tri stanja (Loading, Error, Empty) su OBAVEZNA za svaku stranicu koja dohvata podatke. Bez njih:
- Loading: korisnik vidi prazan ekran i misli da je sajt pokvaren
- Error: korisnik ne zna šta da radi
- Empty: korisnik ne zna da li se podaci još učitavaju ili ih stvarno nema`,
        expectedResult: 'Stranica /clients prikazuje 5 test klijenata iz baze. Pretraga i paginacija rade.',
      },
      {
        title: 'Dodaj formu za kreiranje novog klijenta',
        description: 'Dugme "Dodaj klijenta" otvara modal sa formom.',
        claudePrompt: `Dodaj mogućnost kreiranja novog klijenta na /clients stranici:

- Dugme "Dodaj klijenta" u gornjem desnom uglu
- Klikom se otvara modal (popup) sa formom:
  - Polja: Ime, Email, Telefon, Tip (dropdown: B2C/B2B), Naziv firme (prikaži samo ako je B2B)
  - Dugme "Sačuvaj" šalje POST /clients
  - Dugme "Otkaži" zatvara modal
- Posle uspešnog kreiranja:
  - Zatvori modal
  - Osveži listu klijenata (da se novi pojavi)
  - Prikaži zelenu notifikaciju "Klijent uspešno kreiran"
- Ako server vrati grešku (validacija):
  - Prikaži crvenu notifikaciju sa porukom greške

Za notifikacije instaliraj react-hot-toast ili sonner.`,
        tip: `Primeti da smo opisali i SRECAN i NESRECAN scenario:
- Uspesan: zatvori modal, osveži listu, zelena notifikacija
- Neuspesan: crvena notifikacija sa greškom

Uvek razmišljaj o oba scenarija kada opisuješ Claude-u šta želiš.`,
        expectedResult: 'Možeš dodati novog klijenta kroz formu. Pojavi se u tabeli odmah. Notifikacije rade za uspeh i grešku.',
      },
      {
        title: 'Zaštiti rute — neautentifikovani korisnici ne mogu da vide klijente',
        description: 'Ako korisnik nije ulogovan i ode na /clients — trebalo bi da ga redirektuje na /login.',
        claudePrompt: `Dodaj zaštitu frontend ruta:

Napravi Next.js middleware (middleware.ts u root-u frontend-a):
- Ako korisnik NIJE ulogovan (nema token) i pokušava da pristupi /dashboard ili /clients → redirektuj na /login
- Ako korisnik JESTE ulogovan i ide na /login → redirektuj na /dashboard
- /login stranica je jedina javna

Za proveru tokena u middleware-u, sinhronizuj token između localStorage i cookie-ja (middleware može čitati samo cookie-je, ne localStorage).`,
        tip: `Ovo je "frontend zaštita" — sprečava korisnika da VIDI stranicu. Ali prava zaštita je na BACKENDU (auth middleware koji proverava token). Frontend zaštita je samo UX poboljšanje — da korisnik ne vidi praznu stranicu.`,
        expectedResult: 'Bez login-a, /clients te redirektuje na /login. Posle login-a, /login te redirektuje na /dashboard.',
      },
    ],
    whatYouLearned: [
      'Kako objasniti Claude-u vizuelne i UX zahteve (tri stanja, modali, notifikacije)',
      'Šta je axios instanca i zašto se koristi centralno',
      'Kako React komunicira sa backendom (axios → Express → baza → nazad)',
      'Šta je AuthContext i kako čuva stanje prijave',
      'Razlika između frontend i backend zaštite ruta',
      'Kako opisivati i uspešne i neuspešne scenarije',
      'Da frontend i backend rade kao DVA odvojena projekta',
    ],
  },
];
