import axios from 'axios';
import { Contato, ContactFormData } from '@/types/contato';
const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3002',
});

// GET /contato/listarContatos
export async function listarContatos(): Promise<Contato[]> {
  const res = await api.get('/contato/listarContatos');
   return res.data.contatos;
}

// POST /contato/criarContato
export async function criarContato(data: ContactFormData): Promise<Contato> {
  const response = await api.post('/contato', data);
  return response.data;
}

// GET /contato/buscarContatoPorId/{id}
export async function buscarContatoPorId(id: string): Promise<Contato> {
  const res = await api.get(`/contato/buscarContatoPorId/${id}`);
   return res.data.contato;
}

// PUT /contato/atualizarContato/{id}
export async function atualizarContato(id: string, data: Contato): Promise<Contato> {
  const res = await api.put(`/contato/atualizarContato/${id}`, data);
  return res.data;
}

// DELETE /contato/deletarContato/{id}
export async function deletaContato(id: string): Promise<boolean> {
  const res = await api.delete(`/contato/deletarContato/${id}`);
  return res.status === 200;
}
