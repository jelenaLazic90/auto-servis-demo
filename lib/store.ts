import { Client, Vehicle, ServiceRequest, PaginatedResult } from './types';
import { SEED_CLIENTS, SEED_VEHICLES, SEED_SERVICE_REQUESTS } from './mock-data';
import { generateId } from './utils';

const STORAGE_KEYS = {
  clients: 'demo_clients',
  vehicles: 'demo_vehicles',
  serviceRequests: 'demo_service_requests',
  progress: 'demo_progress',
};

function isClient(): boolean {
  return typeof window !== 'undefined';
}

export function initializeStore(): void {
  if (!isClient()) return;
  if (!localStorage.getItem(STORAGE_KEYS.clients)) {
    localStorage.setItem(STORAGE_KEYS.clients, JSON.stringify(SEED_CLIENTS));
  }
  if (!localStorage.getItem(STORAGE_KEYS.vehicles)) {
    localStorage.setItem(STORAGE_KEYS.vehicles, JSON.stringify(SEED_VEHICLES));
  }
  if (!localStorage.getItem(STORAGE_KEYS.serviceRequests)) {
    localStorage.setItem(STORAGE_KEYS.serviceRequests, JSON.stringify(SEED_SERVICE_REQUESTS));
  }
  if (!localStorage.getItem(STORAGE_KEYS.progress)) {
    localStorage.setItem(STORAGE_KEYS.progress, JSON.stringify({}));
  }
}

function getAll<T>(key: string): T[] {
  if (!isClient()) return [];
  const data = localStorage.getItem(key);
  return data ? JSON.parse(data) : [];
}

function getById<T extends { id: string }>(key: string, id: string): T | null {
  const items = getAll<T>(key);
  return items.find((item) => item.id === id) || null;
}

function create<T extends { id: string }>(key: string, item: Omit<T, 'id'> & { id?: string }): T {
  const items = getAll<T>(key);
  const newItem = { ...item, id: item.id || generateId() } as T;
  items.push(newItem);
  localStorage.setItem(key, JSON.stringify(items));
  return newItem;
}

function update<T extends { id: string }>(key: string, id: string, data: Partial<T>): T | null {
  const items = getAll<T>(key);
  const index = items.findIndex((item) => item.id === id);
  if (index === -1) return null;
  items[index] = { ...items[index], ...data };
  localStorage.setItem(key, JSON.stringify(items));
  return items[index];
}

function remove(key: string, id: string): boolean {
  const items = getAll<{ id: string }>(key);
  const filtered = items.filter((item) => item.id !== id);
  if (filtered.length === items.length) return false;
  localStorage.setItem(key, JSON.stringify(filtered));
  return true;
}

function search<T>(items: T[], query: string, searchFields: (keyof T)[]): T[] {
  if (!query.trim()) return items;
  const q = query.toLowerCase();
  return items.filter((item) =>
    searchFields.some((field) => {
      const value = item[field];
      return typeof value === 'string' && value.toLowerCase().includes(q);
    })
  );
}

export function paginate<T>(items: T[], page: number = 1, limit: number = 10): PaginatedResult<T> {
  const totalItems = items.length;
  const totalPages = Math.max(1, Math.ceil(totalItems / limit));
  const currentPage = Math.min(Math.max(1, page), totalPages);
  const start = (currentPage - 1) * limit;
  const data = items.slice(start, start + limit);

  return {
    data,
    pagination: {
      currentPage,
      totalPages,
      totalItems,
      itemsPerPage: limit,
    },
  };
}

// Client operations
export function getClients(): Client[] {
  return getAll<Client>(STORAGE_KEYS.clients);
}

export function getClientById(id: string): Client | null {
  return getById<Client>(STORAGE_KEYS.clients, id);
}

export function createClient(data: Omit<Client, 'id' | 'createdAt'>): Client {
  return create<Client>(STORAGE_KEYS.clients, {
    ...data,
    createdAt: new Date().toISOString(),
  } as Client);
}

export function updateClient(id: string, data: Partial<Client>): Client | null {
  return update<Client>(STORAGE_KEYS.clients, id, data);
}

export function deleteClient(id: string): boolean {
  return remove(STORAGE_KEYS.clients, id);
}

export function searchClients(query: string): Client[] {
  const clients = getClients();
  return search(clients, query, ['name', 'email', 'phone', 'company']);
}

// Vehicle operations
export function getVehicles(): Vehicle[] {
  return getAll<Vehicle>(STORAGE_KEYS.vehicles);
}

export function getVehicleById(id: string): Vehicle | null {
  return getById<Vehicle>(STORAGE_KEYS.vehicles, id);
}

export function getVehiclesByClient(clientId: string): Vehicle[] {
  return getVehicles().filter((v) => v.clientId === clientId);
}

export function createVehicle(data: Omit<Vehicle, 'id' | 'createdAt'>): Vehicle {
  return create<Vehicle>(STORAGE_KEYS.vehicles, {
    ...data,
    createdAt: new Date().toISOString(),
  } as Vehicle);
}

export function updateVehicle(id: string, data: Partial<Vehicle>): Vehicle | null {
  return update<Vehicle>(STORAGE_KEYS.vehicles, id, data);
}

export function deleteVehicle(id: string): boolean {
  return remove(STORAGE_KEYS.vehicles, id);
}

export function searchVehicles(query: string): Vehicle[] {
  const vehicles = getVehicles();
  return search(vehicles, query, ['brand', 'model', 'plate']);
}

// Service Request operations
export function getServiceRequests(): ServiceRequest[] {
  return getAll<ServiceRequest>(STORAGE_KEYS.serviceRequests);
}

export function getServiceRequestById(id: string): ServiceRequest | null {
  return getById<ServiceRequest>(STORAGE_KEYS.serviceRequests, id);
}

export function createServiceRequest(data: Omit<ServiceRequest, 'id' | 'createdAt' | 'updatedAt'>): ServiceRequest {
  const now = new Date().toISOString();
  return create<ServiceRequest>(STORAGE_KEYS.serviceRequests, {
    ...data,
    createdAt: now,
    updatedAt: now,
  } as ServiceRequest);
}

export function updateServiceRequest(id: string, data: Partial<ServiceRequest>): ServiceRequest | null {
  return update<ServiceRequest>(STORAGE_KEYS.serviceRequests, id, {
    ...data,
    updatedAt: new Date().toISOString(),
  });
}

export function deleteServiceRequest(id: string): boolean {
  return remove(STORAGE_KEYS.serviceRequests, id);
}

export function searchServiceRequests(query: string): ServiceRequest[] {
  const requests = getServiceRequests();
  return search(requests, query, ['description']);
}

// Progress tracking
export function getProgress(): Record<string, boolean> {
  if (!isClient()) return {};
  const data = localStorage.getItem(STORAGE_KEYS.progress);
  return data ? JSON.parse(data) : {};
}

export function markCompleted(lessonId: string): void {
  if (!isClient()) return;
  const progress = getProgress();
  progress[lessonId] = true;
  localStorage.setItem(STORAGE_KEYS.progress, JSON.stringify(progress));
}

export function getCompletedCount(): number {
  return Object.values(getProgress()).filter(Boolean).length;
}

export function isLessonCompleted(lessonId: string): boolean {
  return getProgress()[lessonId] === true;
}

// Reset
export function resetStore(): void {
  if (!isClient()) return;
  localStorage.setItem(STORAGE_KEYS.clients, JSON.stringify(SEED_CLIENTS));
  localStorage.setItem(STORAGE_KEYS.vehicles, JSON.stringify(SEED_VEHICLES));
  localStorage.setItem(STORAGE_KEYS.serviceRequests, JSON.stringify(SEED_SERVICE_REQUESTS));
}

export function resetProgress(): void {
  if (!isClient()) return;
  localStorage.setItem(STORAGE_KEYS.progress, JSON.stringify({}));
}
