import { z } from 'zod';

export const contactSchema = z.object({
  nome: z.string().min(1, 'Nome obrigatório'),
  email: z.string().email('Email inválido'),
  telefone: z.string().optional(),
  mensagem: z.string().min(1, 'Mensagem obrigatória'),
});

export type ContactFormData = z.infer<typeof contactSchema>;

export interface Contato extends ContactFormData {
  id: string;
  userId: string;  
  criadoEm?: string;
  atualizadoEm?: string;
}

export type ContatoFormData = Omit<Contato, 'id' | 'userId' | 'criadoEm' | 'atualizadoEm'>;

