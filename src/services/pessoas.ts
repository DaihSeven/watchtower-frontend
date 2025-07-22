import { api } from "./api";

export type Pessoa = {
  id: number;
  nome: string;
  idade: number;
  descricao?: string;
  status: "ATIVO" | "ENCONTRADO";
  dataDesaparecimento: string;
};

export async function getPessoas(): Promise<Pessoa[]> {
  const res = await api.get("/pessoas");
  return res.data.pessoas;
}

export async function cadastrarPessoa(data: Omit<Pessoa, "id">): Promise<Pessoa> {
  const res = await api.post("/pessoas/cadastrar", data);
  return res.data.pessoa;
}

export async function deletarPessoa(id: number): Promise<void> {
  await api.delete(`/pessoas/deletar/${id}`);
}

export async function atualizarPessoa(id: number, data: Partial<Omit<Pessoa, "id">>): Promise<Pessoa> {
  const res = await api.put(`/pessoas/atualizar/${id}`, data);
  return res.data.pessoa;
}
