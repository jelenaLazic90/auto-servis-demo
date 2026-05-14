'use client';

import React, { useEffect, useState, useCallback } from 'react';
import Button from '@/components/ui/Button';
import Input from '@/components/ui/Input';
import Select from '@/components/ui/Select';
import Modal from '@/components/ui/Modal';
import Table from '@/components/ui/Table';
import type { Column } from '@/components/ui/Table';
import Pagination from '@/components/ui/Pagination';
import {
  initializeStore, getVehicles, getClients, createVehicle, updateVehicle, deleteVehicle, searchVehicles, paginate, resetStore,
} from '@/lib/store';
import { formatDate } from '@/lib/utils';
import type { Vehicle, Client } from '@/lib/types';

type VehicleRecord = Vehicle & Record<string, unknown>;

export default function VehiclesPage() {
  const [vehicles, setVehicles] = useState<Vehicle[]>([]);
  const [clients, setClients] = useState<Client[]>([]);
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [editing, setEditing] = useState<Vehicle | null>(null);
  const [form, setForm] = useState({ clientId: '', brand: '', model: '', year: new Date().getFullYear(), plate: '', vin: '' });

  const loadData = useCallback(() => {
    initializeStore();
    const allClients = getClients();
    setClients(allClients);
    const all = search ? searchVehicles(search) : getVehicles();
    setVehicles(all);
  }, [search]);

  useEffect(() => {
    loadData();
  }, [loadData]);

  const { data, pagination: pag } = paginate(vehicles, page, 10);
  const clientMap = new Map(clients.map((c) => [c.id, c.name]));

  const openCreate = () => {
    setEditing(null);
    setForm({ clientId: clients[0]?.id || '', brand: '', model: '', year: new Date().getFullYear(), plate: '', vin: '' });
    setShowModal(true);
  };

  const openEdit = (v: Vehicle) => {
    setEditing(v);
    setForm({ clientId: v.clientId, brand: v.brand, model: v.model, year: v.year, plate: v.plate, vin: v.vin || '' });
    setShowModal(true);
  };

  const handleSave = () => {
    if (!form.brand || !form.plate || !form.clientId) return;
    if (editing) {
      updateVehicle(editing.id, form);
    } else {
      createVehicle(form);
    }
    setShowModal(false);
    loadData();
  };

  const handleDelete = (id: string) => {
    deleteVehicle(id);
    loadData();
  };

  const columns: Column<VehicleRecord>[] = [
    {
      key: 'vehicle',
      label: 'Vozilo',
      render: (item) => (
        <span className="text-slate-200 font-medium">{item.brand as string} {item.model as string}</span>
      ),
    },
    { key: 'year', label: 'Godina' },
    {
      key: 'plate',
      label: 'Tablice',
      render: (item) => <span className="font-mono text-blue-400">{item.plate as string}</span>,
    },
    {
      key: 'clientId',
      label: 'Klijent',
      render: (item) => <span className="text-slate-400">{clientMap.get(item.clientId as string) || '-'}</span>,
    },
    {
      key: 'createdAt',
      label: 'Datum',
      render: (item) => <span className="text-slate-500">{formatDate(item.createdAt as string)}</span>,
    },
    {
      key: 'actions',
      label: '',
      render: (item) => (
        <div className="flex gap-2">
          <button onClick={() => openEdit(item as unknown as Vehicle)} className="text-blue-400 hover:text-blue-300 text-sm">Izmeni</button>
          <button onClick={() => handleDelete(item.id as string)} className="text-red-400 hover:text-red-300 text-sm">Obriši</button>
        </div>
      ),
    },
  ];

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <span className="section-header-orange">CRUD Demo</span>
          <h1 className="text-3xl font-bold text-white mt-2">Vozila</h1>
        </div>
        <div className="flex gap-2">
          <Button onClick={() => { resetStore(); setSearch(''); setPage(1); loadData(); }} variant="ghost" size="sm">Resetuj</Button>
          <Button onClick={openCreate} size="sm">+ Dodaj</Button>
        </div>
      </div>

      <Input id="search" placeholder="Pretraži po marki, modelu, tablicama..." value={search} onChange={(e) => { setSearch(e.target.value); setPage(1); }} />

      <Table columns={columns} data={data as unknown as VehicleRecord[]} emptyMessage="Nema vozila" />

      <div className="flex justify-center">
        <Pagination currentPage={pag.currentPage} totalPages={pag.totalPages} onPageChange={setPage} />
      </div>

      <Modal isOpen={showModal} onClose={() => setShowModal(false)} title={editing ? 'Izmeni vozilo' : 'Novo vozilo'}>
        <div className="space-y-4">
          <Select
            id="clientId"
            label="Klijent"
            value={form.clientId}
            onChange={(e) => setForm({ ...form, clientId: e.target.value })}
            options={clients.map((c) => ({ value: c.id, label: c.name }))}
          />
          <div className="grid grid-cols-2 gap-4">
            <Input id="brand" label="Marka" value={form.brand} onChange={(e) => setForm({ ...form, brand: e.target.value })} />
            <Input id="model" label="Model" value={form.model} onChange={(e) => setForm({ ...form, model: e.target.value })} />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <Input id="year" label="Godina" type="number" value={form.year} onChange={(e) => setForm({ ...form, year: parseInt(e.target.value) || 0 })} />
            <Input id="plate" label="Tablice" value={form.plate} onChange={(e) => setForm({ ...form, plate: e.target.value })} />
          </div>
          <Input id="vin" label="VIN (opciono)" value={form.vin} onChange={(e) => setForm({ ...form, vin: e.target.value })} />
          <div className="flex justify-end gap-3 pt-4">
            <Button variant="secondary" onClick={() => setShowModal(false)}>Otkaži</Button>
            <Button onClick={handleSave}>{editing ? 'Sačuvaj' : 'Kreiraj'}</Button>
          </div>
        </div>
      </Modal>
    </div>
  );
}
