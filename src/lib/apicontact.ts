import axios from 'axios';
import { Contato } from '../types/contact';

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000',
});

// GET /contato/listarContatos
export async function listContacts(): Promise<Contato[]> {
  const res = await api.get('/contato/listarContatos');
   return res.data.contatos;
}

// POST /contato/criarContato
export async function createContact(data: Contato): Promise<Contato> {
  const res = await api.post('/contato/criarContato', data);
  return res.data;
}

// GET /contato/buscarContatoPorId/{id}
export async function searchContactForId(id: string): Promise<Contato> {
  const res = await api.get(`/contato/buscarContatoPorId/${id}`);
   return res.data.contato;
}

// PUT /contato/atualizarContato/{id}
export async function updateContact(id: string, data: Contato): Promise<Contato> {
  const res = await api.put(`/contato/atualizarContato/${id}`, data);
  return res.data;
}

// DELETE /contato/deletarContato/{id}
export async function deleteContact(id: string): Promise<boolean> {
  const res = await api.delete(`/contato/deletarContato/${id}`);
  return res.status === 200;
}
