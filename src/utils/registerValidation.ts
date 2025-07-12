import { z } from "zod";

export const registerValidation = z.object({
    nome: z.string().min(3, 'Nome obrigatorio'),
    email: z.string().email('Email inválido'),
    senha: z.string().min(6, 'Senha precisa ter no mínimo 6 caracteres'),
    tipo_usuario: z.string().min(1, 'Tipo de usuário obrigatório'),

    //mudança
    senha_admin: z.string().optional()
});

export type RegisterValidation = z.infer<typeof registerValidation>