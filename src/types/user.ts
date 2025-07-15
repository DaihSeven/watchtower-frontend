export type TipoUsuario = 'ADMIN' | 'USUARIO';

export interface User {
  id: number;
  nome: string;
  email: string;
  tipo_usuario: TipoUsuario;
}

export interface JWTPayload {
  id: number | string;
  nome: string;
  email: string;
  tipo_usuario: TipoUsuario;
}

