export interface Command {
  name: string;
  description: string;
  agents: string[];
  example: string;
  steps: string[];
}

export const COMMANDS: Command[] = [
  {
    name: '/start-feature',
    description: 'Pokretanje rada na novom feature-u. Planner pravi plan, student odobrava, implementer kodira.',
    agents: ['planner', 'implementer', 'test-writer'],
    example: '/start-feature "dodaj logout dugme na header"',
    steps: [
      'Planner analizira zahtev i codebase',
      'Planner kreira detaljan implementacioni plan',
      'Student pregleda i odobrava plan (ili traži izmene)',
      'Implementer piše kod prema planu',
      'Test-writer piše testove za novi kod',
    ],
  },
  {
    name: '/review',
    description: 'Pred-commit pregled koda. Proverava kvalitet, sigurnost i performanse.',
    agents: ['code-reviewer', 'security-auditor', 'performance-analyzer'],
    example: '/review',
    steps: [
      'Code-reviewer pregleda sve izmene',
      'Proverava čitljivost, anti-paterne, konvencije',
      'Ako izmene dodiruju auth/API → security-auditor se aktivira',
      'Ako izmene mogu uticati na performanse → performance-analyzer',
      'Izveštaj sa nalazima i preporukama',
    ],
  },
  {
    name: '/ship',
    description: 'Kompletan tok od verifikacije do otvorenog PR-a.',
    agents: ['verification-orchestrator', 'test-runner', 'regression-tester', 'commit-message-formatter', 'pr-description-writer'],
    example: '/ship',
    steps: [
      'Verification-orchestrator pokreće test suite',
      'Ako testovi padaju → failure-analyzer → bug-fixer → ponovo',
      'Regression-tester proverava da ništa nije pokvareno',
      'Lint + build provera',
      'Commit-message-formatter formatira poruku',
      'PR-description-writer piše opis',
      'Commit → Push → PR kreiran',
    ],
  },
  {
    name: '/debug',
    description: 'Sistematsko debugovanje runtime problema kroz 5 faza.',
    agents: ['debugger'],
    example: '/debug "login vraća 500 error"',
    steps: [
      'REPRODUCE — ponovi problem konzistentno',
      'ISOLATE — suzi opseg (frontend? backend? baza?)',
      'IDENTIFY — nađi tačan uzrok (koji fajl, koja linija)',
      'PROPOSE — predloži fix sa procenom rizika',
      'VERIFY — primeni fix i potvrdi da radi',
    ],
  },
  {
    name: '/docs-update',
    description: 'Pisanje ili ažuriranje dokumentacije za dati fajl/modul.',
    agents: ['docs-writer', 'docs-reviewer'],
    example: '/docs-update backend/routes/authRoutes.js',
    steps: [
      'Docs-writer analizira fajl i postojeću dokumentaciju',
      'Piše/ažurira dokumentaciju',
      'Docs-reviewer pregleda napisano',
      'Feedback → ispravke → finalna verzija',
    ],
  },
];

export interface DailyFlow {
  time: string;
  action: string;
  command: string;
}

export const DAILY_FLOW: DailyFlow[] = [
  { time: 'Jutro', action: 'Novi feature zahtev', command: '/start-feature' },
  { time: 'Pre podne', action: 'Implementacija po planu', command: '(implementer radi)' },
  { time: 'Posle podne', action: 'Pregled koda', command: '/review' },
  { time: 'Pre commit-a', action: 'Testovi + commit + PR', command: '/ship' },
  { time: 'Kad nešto pukne', action: 'Debugovanje', command: '/debug' },
];
