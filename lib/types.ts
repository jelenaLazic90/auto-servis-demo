export interface Client {
  id: string;
  name: string;
  email: string;
  phone: string;
  type: 'b2c' | 'b2b';
  company?: string;
  createdAt: string;
}

export interface Vehicle {
  id: string;
  clientId: string;
  brand: string;
  model: string;
  year: number;
  plate: string;
  vin?: string;
  createdAt: string;
}

export interface ServiceRequest {
  id: string;
  vehicleId: string;
  clientId: string;
  description: string;
  status: ServiceStatus;
  priority: 'low' | 'medium' | 'high';
  estimatedCost?: number;
  createdAt: string;
  updatedAt: string;
}

export type ServiceStatus = 'na_cekanju' | 'u_procesu' | 'ceka_deo' | 'zavrseno' | 'isporuceno';

export type Priority = 'low' | 'medium' | 'high';

export interface PaginationInfo {
  currentPage: number;
  totalPages: number;
  totalItems: number;
  itemsPerPage: number;
}

export interface PaginatedResult<T> {
  data: T[];
  pagination: PaginationInfo;
}

export interface NavItem {
  label: string;
  href: string;
  icon: string;
}

export interface NavSection {
  title: string;
  items: NavItem[];
}
