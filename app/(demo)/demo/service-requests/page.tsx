'use client';

import React, { useEffect, useState, useCallback } from 'react';
import Button from '@/components/ui/Button';
import Input from '@/components/ui/Input';
import Select from '@/components/ui/Select';
import Textarea from '@/components/ui/Textarea';
import Modal from '@/components/ui/Modal';
import Table from '@/components/ui/Table';
import type { Column } from '@/components/ui/Table';
import Pagination from '@/components/ui/Pagination';
import Badge from '@/components/ui/Badge';
import type { BadgeVariant } from '@/components/ui/Badge';
import {
  initializeStore, getServiceRequests, getVehicles, getClients,
  createServiceRequest, updateServiceRequest, deleteServiceRequest,
  searchServiceRequests, paginate, resetStore,
} from '@/lib/store';
import { STATUS_LABELS, STATUS_COLORS, STATUS_TRANSITIONS, PRIORITY_LABELS, PRIORITY_COLORS, ALL_STATUSES } from '@/lib/constants';
import { formatDate } from '@/lib/utils';
import type { ServiceRequest, Vehicle, Client, ServiceStatus } from '@/lib/types';

type SRRecord = ServiceRequest & Record<string, unknown>;

export default function ServiceRequestsPage() {
  const [requests, setRequests] = useState<ServiceRequest[]>([]);
  const [vehicles, setVehicles] = useState<Vehicle[]>([]);
  const [clients, setClients] = useState<Client[]>([]);
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [editing, setEditing] = useState<ServiceRequest | null>(null);
  const [form, setForm] = useState({
    vehicleId: '', clientId: '', description: '', status: 'na_cekanju' as ServiceStatus,
    priority: 'medium' as 'low' | 'medium' | 'high', estimatedCost: '',
  });

  const loadData = useCallback(() => {
    initializeStore();
    setClients(getClients());
    setVehicles(getVehicles());
    let all = search ? searchServiceRequests(search) : getServiceRequests();
    if (statusFilter) all = all.filter((r) => r.status === statusFilter);
    setRequests(all);
  }, [search, statusFilter]);

  useEffect(() => {
    loadData();
  }, [loadData]);

  const { data, pagination: pag } = paginate(requests, page, 10);
  const vehicleMap = new Map(vehicles.map((v) => [v.id, `${v.brand} ${v.model} (${v.plate})`]));
  const clientMap = new Map(clients.map((c) => [c.id, c.name]));

  const openCreate = () => {
    setEditing(null);
    setForm({
      vehicleId: vehicles[0]?.id || '', clientId: clients[0]?.id || '', description: '',
      status: 'na_cekanju', priority: 'medium', estimatedCost: '',
    });
    setShowModal(true);
  };

  const openEdit = (sr: ServiceRequest) => {
    setEditing(sr);
    setForm({
      vehicleId: sr.vehicleId, clientId: sr.clientId, description: sr.description,
      status: sr.status, priority: sr.priority, estimatedCost: sr.estimatedCost?.toString() || '',
    });
    setShowModal(true);
  };

  const handleSave = () => {
    if (!form.description || !form.vehicleId) return;
    const payload = {
      ...form,
      estimatedCost: form.estimatedCost ? parseInt(form.estimatedCost) : undefined,
    };
    if (editing) {
      updateServiceRequest(editing.id, payload);
    } else {
      createServiceRequest(payload);
    }
    setShowModal(false);
    loadData();
  };

  const handleStatusChange = (id: string, newStatus: ServiceStatus) => {
    updateServiceRequest(id, { status: newStatus });
    loadData();
  };

  const columns: Column<SRRecord>[] = [
    {
      key: 'description',
      label: 'Opis',
      render: (item) => <span className="text-slate-200 truncate block max-w-[200px]">{item.description as string}</span>,
    },
    {
      key: 'vehicleId',
      label: 'Vozilo',
      render: (item) => <span className="text-slate-400 text-sm">{vehicleMap.get(item.vehicleId as string) || '-'}</span>,
    },
    {
      key: 'clientId',
      label: 'Klijent',
      render: (item) => <span className="text-slate-400 text-sm">{clientMap.get(item.clientId as string) || '-'}</span>,
    },
    {
      key: 'status',
      label: 'Status',
      render: (item) => {
        const status = item.status as ServiceStatus;
        const transitions = STATUS_TRANSITIONS[status];
        return (
          <div className="flex items-center gap-2">
            <Badge variant={STATUS_COLORS[status] as BadgeVariant}>{STATUS_LABELS[status]}</Badge>
            {transitions.length > 0 && (
              <select
                className="bg-slate-800/50 border border-slate-700/30 rounded-lg text-xs px-1.5 py-0.5 text-slate-400"
                value=""
                onChange={(e) => { if (e.target.value) handleStatusChange(item.id as string, e.target.value as ServiceStatus); }}
              >
                <option value="">→</option>
                {transitions.map((t) => (
                  <option key={t} value={t}>{STATUS_LABELS[t]}</option>
                ))}
              </select>
            )}
          </div>
        );
      },
    },
    {
      key: 'priority',
      label: 'Prioritet',
      render: (item) => (
        <Badge variant={PRIORITY_COLORS[item.priority as string] as BadgeVariant}>
          {PRIORITY_LABELS[item.priority as string]}
        </Badge>
      ),
    },
    {
      key: 'createdAt',
      label: 'Datum',
      render: (item) => <span className="text-slate-500 text-sm">{formatDate(item.createdAt as string)}</span>,
    },
    {
      key: 'actions',
      label: '',
      render: (item) => (
        <div className="flex gap-2">
          <button onClick={() => openEdit(item as unknown as ServiceRequest)} className="text-blue-400 hover:text-blue-300 text-sm">Izmeni</button>
          <button onClick={() => { deleteServiceRequest(item.id as string); loadData(); }} className="text-red-400 hover:text-red-300 text-sm">Obriši</button>
        </div>
      ),
    },
  ];

  return (
    <div className="max-w-5xl mx-auto space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <span className="section-header-orange">CRUD Demo</span>
          <h1 className="text-3xl font-bold text-white mt-2">Servisni nalozi</h1>
        </div>
        <div className="flex gap-2">
          <Button onClick={() => { resetStore(); setSearch(''); setStatusFilter(''); setPage(1); loadData(); }} variant="ghost" size="sm">Resetuj</Button>
          <Button onClick={openCreate} size="sm">+ Dodaj</Button>
        </div>
      </div>

      <div className="flex gap-3">
        <div className="flex-1">
          <Input id="search" placeholder="Pretraži po opisu..." value={search} onChange={(e) => { setSearch(e.target.value); setPage(1); }} />
        </div>
        <select
          className="bg-slate-800/50 border border-slate-700/30 rounded-xl px-4 py-2 text-slate-300 text-sm"
          value={statusFilter}
          onChange={(e) => { setStatusFilter(e.target.value); setPage(1); }}
        >
          <option value="">Svi statusi</option>
          {ALL_STATUSES.map((s) => (
            <option key={s} value={s}>{STATUS_LABELS[s]}</option>
          ))}
        </select>
      </div>

      <Table columns={columns} data={data as unknown as SRRecord[]} emptyMessage="Nema naloga" />

      <div className="flex justify-center">
        <Pagination currentPage={pag.currentPage} totalPages={pag.totalPages} onPageChange={setPage} />
      </div>

      {/* Status workflow info */}
      <div className="p-5 rounded-2xl bg-gradient-to-br from-amber-500/10 to-orange-500/5 border border-amber-500/20">
        <h3 className="text-sm font-semibold text-amber-300 mb-3">Status workflow</h3>
        <div className="flex flex-wrap items-center gap-2 text-sm">
          {ALL_STATUSES.map((s, i) => (
            <React.Fragment key={s}>
              <Badge variant={STATUS_COLORS[s] as BadgeVariant}>{STATUS_LABELS[s]}</Badge>
              {i < ALL_STATUSES.length - 1 && <span className="text-amber-400/40">→</span>}
            </React.Fragment>
          ))}
        </div>
      </div>

      <Modal isOpen={showModal} onClose={() => setShowModal(false)} title={editing ? 'Izmeni nalog' : 'Novi nalog'} size="lg">
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <Select id="clientId" label="Klijent" value={form.clientId} onChange={(e) => setForm({ ...form, clientId: e.target.value })} options={clients.map((c) => ({ value: c.id, label: c.name }))} />
            <Select id="vehicleId" label="Vozilo" value={form.vehicleId} onChange={(e) => setForm({ ...form, vehicleId: e.target.value })} options={vehicles.map((v) => ({ value: v.id, label: `${v.brand} ${v.model} (${v.plate})` }))} />
          </div>
          <Textarea id="description" label="Opis problema" value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} />
          <div className="grid grid-cols-3 gap-4">
            <Select id="priority" label="Prioritet" value={form.priority} onChange={(e) => setForm({ ...form, priority: e.target.value as 'low' | 'medium' | 'high' })} options={[{ value: 'low', label: 'Nizak' }, { value: 'medium', label: 'Srednji' }, { value: 'high', label: 'Visok' }]} />
            {editing && (
              <Select id="status" label="Status" value={form.status} onChange={(e) => setForm({ ...form, status: e.target.value as ServiceStatus })} options={ALL_STATUSES.map((s) => ({ value: s, label: STATUS_LABELS[s] }))} />
            )}
            <Input id="estimatedCost" label="Procena (RSD)" type="number" value={form.estimatedCost} onChange={(e) => setForm({ ...form, estimatedCost: e.target.value })} />
          </div>
          <div className="flex justify-end gap-3 pt-4">
            <Button variant="secondary" onClick={() => setShowModal(false)}>Otkaži</Button>
            <Button onClick={handleSave}>{editing ? 'Sačuvaj' : 'Kreiraj'}</Button>
          </div>
        </div>
      </Modal>
    </div>
  );
}
