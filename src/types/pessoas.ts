export interface Pessoa {
   id: number;
  nome: string;
  idade: number;
  descricao?: string;
  status: "ATIVO" | "ENCONTRADO";
  dataDesaparecimento: string;
}
