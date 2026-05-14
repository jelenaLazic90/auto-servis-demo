import { ServiceStatus, NavSection } from './types';

export const STATUS_LABELS: Record<ServiceStatus, string> = {
  na_cekanju: 'Na čekanju',
  u_procesu: 'U procesu',
  ceka_deo: 'Čeka deo',
  zavrseno: 'Završeno',
  isporuceno: 'Isporučeno',
};

export const STATUS_COLORS: Record<ServiceStatus, string> = {
  na_cekanju: 'yellow',
  u_procesu: 'blue',
  ceka_deo: 'purple',
  zavrseno: 'green',
  isporuceno: 'gray',
};

export const STATUS_TRANSITIONS: Record<ServiceStatus, ServiceStatus[]> = {
  na_cekanju: ['u_procesu', 'ceka_deo'],
  u_procesu: ['zavrseno', 'ceka_deo'],
  ceka_deo: ['na_cekanju', 'u_procesu'],
  zavrseno: ['isporuceno', 'u_procesu'],
  isporuceno: [],
};

export const PRIORITY_LABELS: Record<string, string> = {
  low: 'Nizak',
  medium: 'Srednji',
  high: 'Visok',
};

export const PRIORITY_COLORS: Record<string, string> = {
  low: 'gray',
  medium: 'yellow',
  high: 'red',
};

export const ALL_STATUSES: ServiceStatus[] = [
  'na_cekanju',
  'u_procesu',
  'ceka_deo',
  'zavrseno',
  'isporuceno',
];

export const NAV_SECTIONS: NavSection[] = [
  {
    title: 'Učenje',
    items: [
      { label: 'Dobrodošli', href: '/learn', icon: '👋' },
      { label: 'Kako radi web app', href: '/learn/how-web-works', icon: '🌐' },
      { label: 'Naš tech stack', href: '/learn/tech-stack', icon: '🧱' },
      { label: 'Put jednog klika', href: '/learn/request-flow', icon: '🔄' },
      { label: 'JavaScript osnove', href: '/learn/javascript', icon: '📜' },
      { label: 'Backend detaljno', href: '/learn/backend', icon: '⚙️' },
      { label: 'Frontend detaljno', href: '/learn/frontend', icon: '🎨' },
      { label: 'Git & verzionisanje', href: '/learn/git', icon: '📦' },
      { label: 'Hosting & produkcija', href: '/learn/hosting', icon: '☁️' },
    ],
  },
  {
    title: 'Handoff sistem',
    items: [
      { label: 'Šta je handoff', href: '/handoff', icon: '🤝' },
      { label: 'Agenti', href: '/handoff/agents', icon: '🤖' },
      { label: 'Skillovi', href: '/handoff/skills', icon: '🎯' },
      { label: 'Komande & Workflow', href: '/handoff/commands', icon: '⚡' },
    ],
  },
  {
    title: 'Vežbe',
    items: [
      { label: 'Scenariji', href: '/exercises/scenarios', icon: '🧩' },
      { label: 'Radionice', href: '/exercises/workshops', icon: '🔧' },
    ],
  },
  {
    title: 'CRUD Demo',
    items: [
      { label: 'Dashboard', href: '/demo/dashboard', icon: '📊' },
      { label: 'Klijenti', href: '/demo/clients', icon: '👥' },
      { label: 'Vozila', href: '/demo/vehicles', icon: '🚗' },
      { label: 'Servisni nalozi', href: '/demo/service-requests', icon: '📋' },
    ],
  },
];

export const LESSON_IDS = [
  'welcome',
  'how-web-works',
  'tech-stack',
  'request-flow',
  'javascript',
  'backend',
  'frontend',
  'git',
  'hosting',
  'handoff-intro',
  'agents',
  'skills',
  'commands',
  'scenarios',
  'workshops',
] as const;

export const TOTAL_LESSONS = LESSON_IDS.length;
