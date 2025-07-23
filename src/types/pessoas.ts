export type Status = "ATIVO" | "ENCONTRADO";

export interface PessoaDesaparecida {
  id: number;
  userId: number;
  nome: string;
  idade: number;
  dataDesaparecimento: string;
  descricao?: string;
  status: Status;
  imagemUrl?: string;
  usuario?: {
    id: number;
    nome: string;
    email: string;
  };
}
