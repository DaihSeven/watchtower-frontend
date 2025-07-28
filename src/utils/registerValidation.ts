import { z } from "zod";

export const registerValidation = z.object({
    nome: z.string()
      .min(3, 'Nome deve ter no mínimo 3 caracteres')
      .max(50, 'Nome deve ter no máximo 50 caracteres')
      .trim(),
    email: z.string()
      .email('Email inválido')
      .toLowerCase()
      .trim(),
    senha: z.string()
      .min(6, "Senha deve ter no mínimo 6 caracteres")
      .max(50, "Senha deve ter no máximo 50 caracteres"),
    tipo_usuario: z.string()
      .min(1, 'Tipo de usuário é obrigatório')
      .refine((val) => val === 'usuario' || val === 'admin', {
        message: 'Selecione um tipo de usuário válido'
      }),
    senha_admin: z.string().optional()
}).refine((data) => {
  if (data.tipo_usuario === 'admin') {
    return data.senha_admin && data.senha_admin.length >= 6;
  }
  return true;
}, {
  message: "Senha de administrador é obrigatória para usuários admin (mínimo 6 caracteres)",
  path: ["senha_admin"]
});

export type RegisterValidation = z.infer<typeof registerValidation>