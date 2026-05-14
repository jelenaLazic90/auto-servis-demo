'use client';

import React, { useEffect, useState, useCallback } from 'react';
import Button from '@/components/ui/Button';
import Input from '@/components/ui/Input';
import Select from '@/components/ui/Select';
import Modal from '@/components/ui/Modal';
import Table from '@/components/ui/Table';
import type { Column } from '@/components/ui/Table';
import Pagination from '@/components/ui/Pagination';
import Badge from '@/components/ui/Badge';
import {
  initializeStore, getClients, createClient, updateClient, deleteClient, searchClients, paginate, resetStore,
} from '@/lib/store';
import { formatDate } from '@/lib/utils';
import type { Client } from '@/lib/types';

type ClientRecord = Client & Record<string, unknown>;

export default function ClientsPage() {
  const [clients, setClients] = useState<Client[]>([]);
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [editing, setEditing] = useState<Client | null>(null);
  const [form, setForm] = useState({ name: '', email: '', phone: '', type: 'b2c' as 'b2c' | 'b2b', company: '' });

  const loadClients = useCallback(() => {
    initializeStore();
    const all = search ? searchClients(search) : getClients();
    setClients(all);
  }, [search]);

  useEffect(() => {
    loadClients();
  }, [loadClients]);

  const { data, pagination } = paginate(clients, page, 10);

  const openCreate = () => {
    setEditing(null);
    setForm({ name: '', email: '', phone: '', type: 'b2c', company: '' });
    setShowModal(true);
  };

  const openEdit = (client: Client) => {
    setEditing(client);
    setForm({ name: client.name, email: client.email, phone: client.phone, type: client.type, company: client.company || '' });
    setShowModal(true);
  };

  const handleSave = () => {
    if (!form.name || !form.email) return;
    if (editing) {
      updateClient(editing.id, form);
    } else {
      createClient(form);
    }
    setShowModal(false);
    loadClients();
  };

  const handleDelete = (id: string) => {
    deleteClient(id);
    loadClients();
  };

  const handleReset = () => {
    resetStore();
    setSearch('');
    setPage(1);
    loadClients();
  };

  const columns: Column<ClientRecord>[] = [
    { key: 'name', label: 'Ime' },
    { key: 'email', label: 'Email' },
    { key: 'phone', label: 'Telefon' },
    {
      key: 'type',
      label: 'Tip',
      render: (item) => (
        <Badge variant={item.type === 'b2b' ? 'purple' : 'blue'}>
          {item.type === 'b2b' ? 'B2B' : 'B2C'}
        </Badge>
      ),
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
          <button onClick={() => openEdit(item as unknown as Client)} className="text-blue-400 hover:text-blue-300 text-sm">Izmeni</button>
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
          <h1 className="text-3xl font-bold text-white mt-2">Klijenti</h1>
        </div>
        <div className="flex gap-2">
          <Button onClick={handleReset} variant="ghost" size="sm">Resetuj</Button>
          <Button onClick={openCreate} size="sm">+ Dodaj</Button>
        </div>
      </div>

      {/* Search */}
      <Input
        id="search"
        placeholder="Pretraži po imenu, emailu, telefonu..."
        value={search}
        onChange={(e) => { setSearch(e.target.value); setPage(1); }}
      />

      {/* Table */}
      <Table columns={columns} data={data as unknown as ClientRecord[]} emptyMessage="Nema klijenata" />

      {/* Pagination */}
      <div className="flex justify-center">
        <Pagination currentPage={pagination.currentPage} totalPages={pagination.totalPages} onPageChange={setPage} />
      </div>

      {/* Modal */}
      <Modal isOpen={showModal} onClose={() => setShowModal(false)} title={editing ? 'Izmeni klijenta' : 'Novi klijent'}>
        <div className="space-y-4">
          <Input id="name" label="Ime i prezime" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
          <Input id="email" label="Email" type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} />
          <Input id="phone" label="Telefon" value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} />
          <Select
            id="type"
            label="Tip klijenta"
            value={form.type}
            onChange={(e) => setForm({ ...form, type: e.target.value as 'b2c' | 'b2b' })}
            options={[
              { value: 'b2c', label: 'Fizičko lice (B2C)' },
              { value: 'b2b', label: 'Firma (B2B)' },
            ]}
          />
          {form.type === 'b2b' && (
            <Input id="company" label="Naziv firme" value={form.company} onChange={(e) => setForm({ ...form, company: e.target.value })} />
          )}
          <div className="flex justify-end gap-3 pt-4">
            <Button variant="secondary" onClick={() => setShowModal(false)}>Otkaži</Button>
            <Button onClick={handleSave}>{editing ? 'Sačuvaj' : 'Kreiraj'}</Button>
          </div>
        </div>
      </Modal>
    </div>
  );
}
