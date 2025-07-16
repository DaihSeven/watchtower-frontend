import { z } from 'zod';

export const loginValidation = z.object({
  email: z.string().email('Email inválido'),
  senha: z.string().min(6, 'Senha precisa ter no mínimo 6 caracteres'),
});

export type LoginValidation = z.infer<typeof loginValidation>;