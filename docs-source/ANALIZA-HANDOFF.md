# Analiza: AS projekat vs Handoff sistem

Ovaj dokument objašnjava šta je handoff sistem, šta je tvoj AS projekat
imao, šta mu je falilo, i šta je dodato. Napisano je tako da razumeš
ZAŠTO svaka stvar postoji — ne samo šta je.

---

## 1. Šta je handoff sistem?

Handoff je **sistem pravila, agenata i alata** koji pomaže studentima
da prave ozbiljne aplikacije uz Claude Code. Zamišljen je kao
"profesionalni asistent sa disciplinom" — ne dozvoljava prečice koje
vode u loš kod.

### Tri ključna principa:

1. **Plan pre koda** — nikad ne počinješ da kucaš dok ne znaš šta praviš
2. **Automatska verifikacija** — testovi, review i security provera pre svakog commit-a
3. **Tvrde granice** — postoje stvari koje sistem ne dozvoljava, tačka

### Kako funkcioniše:

```
Student kaže "treba mi novi feature"
    ↓
/start-feature — planner agent istražuje kod i pravi plan
    ↓
Student pregleda i odobrava plan
    ↓
implementer agent kodira po planu, korak po korak
    ↓
test-writer piše testove
    ↓
/review — code-reviewer + security-auditor + performance-analyzer
    ↓
/ship — testovi → popravke → commit → push → PR
```

Umesto da Claude Code radi šta hoće, **svaki korak ima svog
specijalistu** (agenta) i **jasna pravila** (skill-ove).

---

## 2. Šta je tvoj AS projekat već imao

Tvoj projekat je imao **solidnu osnovu**. CLAUDE.md od 39KB sa detaljnim
vodičem za razvoj je retko dobar za studentski projekat.

### Ono što si imala ✓

| Kategorija | Detalji |
|-----------|---------|
| **CLAUDE.md** | Detaljan vodič sa 4 koraka razvoja, tech stack tabela, 13 backend standarda, 8 frontend standarda, konvencije za kod, git workflow |
| **Struktura projekta** | Odvojeni frontend (Next.js) i backend (Express), documentation/ sa 4 faze |
| **Backend standardi** | Error handler, Winston logger, paginacija, soft delete, rate limiting, CORS, health check, graceful shutdown, env validacija |
| **Frontend standardi** | Axios instanca, AuthContext, protected routes, Tailwind, loading/error stanja, toast notifikacije |
| **Testovi** | Jest + Supertest (32 test fajlova backend), React Testing Library (26 test fajlova frontend) |
| **Dokumentacija** | 4 faze: analiza, plan, implementacija, testiranje |
| **Agenti (2)** | docs-writer, docs-reviewer — za dokumentaciju |
| **Skill (1)** | tech-writing-style — stilski vodič za tehničko pisanje |
| **Komanda (1)** | /docs-update — pipeline za pisanje i pregled dokumentacije |

### Zaključak

Tvoj CLAUDE.md pokriva **šta treba da se radi** (standardi, konvencije,
koraci). Ali nije pokrivao **kako to automatizovati** (agenti za svaki
korak) i **šta sprečiti** (formalne zabrane, deny lista u settings-u).

---

## 3. Šta je falilo — i zašto je bitno

### 3.1 Agenti — falilo 15 od 17

**Šta su agenti?**
Agent je specijalizovani AI pomoćnik za JEDAN zadatak. Umesto da Claude
Code bude "generalni radnik koji radi sve", imaš tIM specijalista:
- Planner koji SAMO planira (ne piše kod)
- Implementer koji SAMO kodira (ne planira)
- Debugger koji SAMO traži uzrok problema (ne pogađa)

**Zašto su bitni?**
Kad imaš jednog radnika koji radi sve, kvalitet opada jer nema fokus.
Kad imaš specijaliste, svaki radi samo ono u čemu je dobar:
- Planner istražuje kod pre nego što bilo ko piše
- Code-reviewer traži probleme pre commit-a
- Security-auditor traži sigurnosne propuste

**Šta ti je falilo:**

| Agent | Šta radi | Zašto je bitan |
|-------|----------|---------------|
| `planner` | Pravi plan pre koda | BEZ PLANA = haos. Plan definiše šta, gde, kako. |
| `implementer` | Kodira po planu | Odbija da radi bez plana — forsira disciplinu |
| `test-writer` | Piše testove | Specijalizovan za testiranje — zna šta pokriva |
| `debugger` | Traži uzrok problema | 5 faza umesto pogađanja — efikasniji debug |
| `code-reviewer` | Pregleda kod | Hvata probleme PRE nego što uđu u repo |
| `security-auditor` | Sigurnosni pregled | OWASP, tajne, auth — stvari koje lako promaknu |
| `performance-analyzer` | Performance pregled | N+1 upiti, nedostajući indeksi — problemi koji se vide tek u produkciji |
| `verification-orchestrator` | Test-fix petlja | Automatski: test → analiza → popravka → ponovo (max 3 puta) |
| `test-runner` | Pokreće testove | Strukturiran izveštaj umesto sirovog output-a |
| `failure-analyzer` | Analizira padajuće testove | Traži ROOT CAUSE, ne simptom |
| `bug-fixer` | Minimalne popravke | Samo risk:low — ne riskira velike promene |
| `regression-tester` | Puna verifikacija | Testovi + lint + build pre commit-a |
| `repo-explorer` | Navigacija kroz kod | Brzi odgovori bez zagađivanja konteksta |
| `commit-message-formatter` | Formatira commit poruke | Conventional Commits automatski |
| `pr-description-writer` | Piše PR opis | Konzistentan format, konkretan test plan |

### 3.2 Skill-ovi — falilo 12 od 13

**Šta su skill-ovi?**
Skill je **skup pravila** koji se automatski primenjuje kada radiš nešto
specifično. Za razliku od agenta (koji se eksplicitno poziva), skill
se aktivira sam kad je relevantan.

Primer: kad pišeš Sequelize model, `sequelize-patterns` skill se
automatski aktivira i Claude Code zna da mora staviti `paranoid: true`,
`underscored: true`, eksplicitan `foreignKey` na asocijacije, itd.

**Šta ti je falilo:**

| Skill | Šta pokriva | Zašto je bitan |
|-------|------------|---------------|
| `git-workflow` | Branching, commit, merge | Sprečava push na main, WIP commit-e |
| `error-handling-patterns` | Error handler, kodovi | Konzistentan error format svuda |
| `dependency-management` | npm install provere | Sprečava instalaciju nesigurnih paketa |
| `debugging-methodology` | 5 faza debug-a | Sprečava pogađanje i trial-and-error |
| `changelog-updater` | CHANGELOG format | Korisnik-orijentisan changelog |
| `docs-validator` | Tačnost dokumentacije | Hvata broken linkove i zastarele komande |
| `commit-message-style` | Commit poruke | Conventional Commits automatski |
| `pr-description-style` | PR opis | Konzistentan, konkretan format |
| `sequelize-patterns` | Modeli, migracije | Sprečava sync({ force: true }), editovanje migracija |
| `express-mvc-patterns` | MVC razdvajanje | Sprečava logiku u rutama, direktne response-ove |
| `api-security-patterns` | JWT, CORS, validacija | Sprečava hardkodirane tajne, slab JWT |
| `nextjs-patterns` | App Router best practices | Sprečava alert(), direktan axios, vanilla CSS |
| `test-conventions` | Imenovanje i struktura testova | Čitljivi testovi koji opisuju ponašanje |

### 3.3 Slash komande — falilo 4 od 5

**Šta su slash komande?**
Slash komanda je **prečica za kompleksan workflow**. Umesto da ručno
pozivaš agente jednog po jednog, komanda to radi za tebe.

| Komanda | Šta radi | Zašto je bitna |
|---------|----------|---------------|
| `/start-feature <opis>` | Plan → odobrenje → implementacija → testovi | Forsira disciplinu: nema koda bez plana |
| `/review` | Code review + sigurnosni/performance audit | Hvata probleme pre commit-a |
| `/ship` | Test → popravka → review → docs → commit → push → PR | Kompletan tok do PR-a — ništa se ne preskače |
| `/debug <problem>` | 5 faza debug-ovanja | Sistematski pristup umesto pogađanja |

### 3.4 Settings — deny lista i ask lista

**Šta je deny lista?**
Lista komandi koje Claude Code NE SME da izvrši. Čak i ako pogrešno
zaključi da treba — sistem to blokira.

**Pre (tvoj settings):**
```json
{
  "allow": [ ... lista od 30 komandi ... ]
}
```
Nije imao deny listu. Claude Code je mogao (u teoriji) da izvrši
`rm -rf`, `git push --force`, `DROP TABLE` — sve destruktivne komande.

**Posle (novi settings):**
```json
{
  "allow": [ ... čitanje, testovi, lint ... ],
  "ask":   [ ... git add, commit, push, install — traži potvrdu ... ],
  "deny":  [ ... rm -rf, force push, hard reset, DROP, chmod 777 ... ]
}
```

Tri nivoa:
- **allow** — izvršava se automatski (čitanje, testovi, lint)
- **ask** — pita te pre izvršenja (commit, push, install)
- **deny** — NIKAD se ne izvršava (destruktivne operacije)

**Zašto su `taskkill` i `cmd.exe` premešteni iz allow u ask?**
Obe komande mogu napraviti štetu — `taskkill` može ugasiti pogrešan
proces, `cmd.exe` može izvršiti bilo šta. Bolje je da te pita.

### 3.5 CLAUDE.md — tri nove sekcije

**Šta je falilo:**

1. **"Šta NIKAD ne raditi"** (16 zabrana)
   - Git zabrane (force push, reset --hard, push na main)
   - Sigurnosne zabrane (hardkodirane tajne, commitovanje .env)
   - Kodne zabrane (brisanje testova, rucno editovanje lock fajla)
   - Baza zabrane (menjanje starih migracija, DROP/TRUNCATE)
   - Dokumentacione zabrane (API bez docs update-a)

   **Zašto:** Tvoj CLAUDE.md je govorio šta TREBA raditi, ali nije
   eksplicitno zabranjivao šta NE TREBA. Claude Code poštuje
   eksplicitne zabrane — ako nešto nije zabranjeno, može da ga uradi.

2. **Eskalacija** (tabela situacija kada sistem staje)
   - Kad Claude Code ne zna šta želiš → pita
   - Kad popravka može da pokvari nešto → pita
   - Kad treba arhitektonska odluka → pita
   - Signal `needs_human` = "Stao sam, trebaš mi"

   **Zašto:** Bez eskalacije, Claude Code može da pogađa umesto da pita.
   Sa eskalacijom — staje i traži tvoju odluku kad nije siguran.

3. **Reference** (tabele agenata, skill-ova, komandi)
   - Claude Code iz CLAUDE.md sada ZNA koje agente ima na raspolaganju
   - Zna kada da pozove planner-a, kada security-auditor-a

   **Zašto:** Bez reference tabele, Claude Code ne zna da ti agenti
   postoje i neće ih koristiti.

---

## 4. Šta je konkretno dodato

### 4.1 Novi agenti (13 fajlova u `.claude/agents/`)

| Fajl | Agent | Sloj |
|------|-------|------|
| `planner.md` | Pravi plan pre koda | Workflow |
| `implementer.md` | Kodira po planu | Workflow |
| `test-writer.md` | Piše testove | Workflow |
| `debugger.md` | Sistematski debug | Workflow |
| `code-reviewer.md` | Kvalitet koda | Kvalitet |
| `security-auditor.md` | Sigurnosni pregled | Kvalitet |
| `performance-analyzer.md` | Performance pregled | Kvalitet |
| `verification-orchestrator.md` | Test-fix petlja | Verifikacija |
| `test-runner.md` | Pokretanje testova | Verifikacija |
| `failure-analyzer.md` | Analiza padajućih testova | Verifikacija |
| `bug-fixer.md` | Minimalne popravke | Verifikacija |
| `regression-tester.md` | Puna verifikacija | Verifikacija |
| `repo-explorer.md` | Navigacija kroz kod | Navigacija |
| `commit-message-formatter.md` | Commit poruke | Održavanje |
| `pr-description-writer.md` | PR opis | Održavanje |

**Postojeći agenti (zadržani, nepromenjeni):**
- `docs-writer.md`
- `docs-reviewer.md`

### 4.2 Novi skill-ovi (12 foldera u `.claude/skills/`)

| Folder | Skill | Kategorija |
|--------|-------|-----------|
| `git-workflow/` | Git pravila | Git/workflow |
| `error-handling-patterns/` | Error handling | Pisanje koda |
| `dependency-management/` | npm upravljanje | Zavisnosti |
| `debugging-methodology/` | 5 faza debug-a | Debug |
| `changelog-updater/` | CHANGELOG format | Dokumentacija |
| `docs-validator/` | Provera tačnosti docs | Dokumentacija |
| `commit-message-style/` | Commit format | Git/workflow |
| `pr-description-style/` | PR opis format | Git/workflow |
| `sequelize-patterns/` | Sequelize pravila | Pisanje koda |
| `express-mvc-patterns/` | MVC razdvajanje | Pisanje koda |
| `api-security-patterns/` | Sigurnosni obrasci | Sigurnost |
| `nextjs-patterns/` | Next.js best practices | Pisanje koda |
| `test-conventions/` | Test konvencije | Testiranje |

**Postojeći skill (zadržan, nepromenjen):**
- `tech-writing-style/`

### 4.3 Nove slash komande (4 fajla u `.claude/commands/`)

| Fajl | Komanda | Šta radi |
|------|---------|----------|
| `start-feature.md` | `/start-feature <opis>` | Plan → odobrenje → implementacija → testovi |
| `review.md` | `/review` | Code review + uslovni auditori |
| `ship.md` | `/ship` | Verifikacija → commit → push → PR |
| `debug.md` | `/debug <problem>` | Sistematski debug u 5 faza |

**Postojeća komanda (zadržana, nepromenjena):**
- `docs-update.md`

### 4.4 Izmenjen settings.local.json

**Promene:**
- Dodata **ask lista** — git operacije, install, migrate, taskkill, cmd.exe
  traže tvoju potvrdu pre izvršenja
- Dodata **deny lista** — rm -rf, force push, hard reset, DROP, TRUNCATE,
  chmod 777, curl|sh blokirani potpuno
- `taskkill` i `cmd.exe` premešteni iz allow u ask (sigurnije)
- Dodati git read komande u allow (git status, log, diff, branch)
- Dodati lint komande u allow (eslint, prettier)

### 4.5 Dopunjen CLAUDE.md

**Dodato na kraj postojećeg fajla (ništa nije obrisano):**
- Sekcija **"Šta NIKAD ne raditi"** — 16 eksplicitnih zabrana
- Sekcija **"Eskalacija"** — tabela situacija kada sistem staje
- Sekcija **"Reference"** — tabele svih agenata, skill-ova i komandi

---

## 5. Šta NIJE menjano (tvoj kod je netaknut)

| Folder/fajl | Status |
|------------|--------|
| `backend/` (sav kod) | Netaknut |
| `frontend/` (sav kod) | Netaknut |
| `documentation/` (sva dokumentacija) | Netaknut |
| `.claude/agents/docs-writer.md` | Netaknut |
| `.claude/agents/docs-reviewer.md` | Netaknut |
| `.claude/skills/tech-writing-style/` | Netaknut |
| `.claude/commands/docs-update.md` | Netaknut |
| `CLAUDE.md` (postojeći sadržaj) | Netaknut — samo DODATO na kraj |

---

## 6. Kako sada koristiti sistem

### Tipičan dnevni tok:

```
Jutro:
  /start-feature "dodaj mogućnost pretrage po datumu"
  → planner istražuje, pravi plan
  → pregledaš plan, odobriš ili koriguj
  → implementer kodira po planu
  → test-writer piše testove

Sredina dana:
  → radiš na implementaciji
  → ako nešto ne radi: /debug "GET /api/v1/clients vraća 500"

Pre commit-a:
  /review
  → code-reviewer pregleda kvalitet
  → security-auditor (ako je auth/API menjano)
  → performance-analyzer (ako su upiti menjani)

Pred kraj:
  /ship
  → testovi (automatski popravlja risk:low probleme)
  → commit sa Conventional Commits porukom
  → push na feature granu
  → otvara PR ka develop
```

### Zlatna pravila (ponovljena iz KAKO-KORISTITI.md):

1. **Plan pre koda.** `/start-feature` uvek.
2. **Test pre commit-a.** `/review` pre svakog commit-a.
3. **Granica je granica.** "Šta NIKAD ne raditi" se ne preskače.
4. **Eskalacija nije slabost.** `needs_human` je ispravan signal.
5. **Mali commit-ovi.** Max 3 logičke promene.
6. **Kratki PR-ovi.** Max 500 linija diff-a.

---

## 7. Tehnološke razlike: tvoj stack vs handoff stack

Handoff je pisan za React + Vite + TanStack Query + Zod. Tvoj projekat
koristi Next.js + Axios + express-validator. **Ovo nije greška** — tvoj
CLAUDE.md definiše tvoj stack i to je validno.

Svi agenti i skill-ovi su **adaptirani za tvoj stack**:

| Handoff originalno | Tvoj AS projekat |
|-------------------|-----------------|
| React + Vite | Next.js (App Router) |
| TanStack Query | Axios sa interceptorima |
| Zod (validacija) | express-validator |
| React Hook Form | Standardne forme |
| TypeScript svuda | JavaScript (backend), TypeScript (frontend) |
| vitest | Jest |

Svaki agent i skill koristi terminologiju i primere iz TVOG stack-a,
ne iz handoff originala.

---

## 8. Sumarni pregled

| Kategorija | Pre | Posle | Promena |
|-----------|-----|-------|---------|
| Agenti | 2 | 17 | +15 novih |
| Skill-ovi | 1 | 14 | +13 novih (u zasebnim folderima) |
| Slash komande | 1 | 5 | +4 nove |
| Settings deny lista | 0 stavki | 16 stavki | Nova sekcija |
| Settings ask lista | 0 stavki | 14 stavki | Nova sekcija |
| CLAUDE.md zabrane | 0 | 16 | Nova sekcija |
| CLAUDE.md eskalacija | 0 | 8 situacija | Nova sekcija |
| CLAUDE.md reference | 0 | 3 tabele | Nova sekcija |
| **Kod (backend/frontend)** | **Netaknut** | **Netaknut** | **Nema promena** |
