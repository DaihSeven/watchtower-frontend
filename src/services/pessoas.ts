import { Pessoa } from "@/types/pessoas";
import { api } from "./api";

export async function getAllPessoas(): Promise<Pessoa[]> {
  const response = await api.get("/pessoas");
  return response.data.pessoas;
}

export async function createPessoa(data: Omit<Pessoa, "id">): Promise<Pessoa> {
  const response = await api.post("/pessoas/cadastrar", data);
  return response.data.pessoa;
}

export async function updatePessoa(id: number, data: Omit<Pessoa, "id">): Promise<Pessoa> {
  const response = await api.patch(`/pessoas/atualizar/${id}`, data);
  return response.data.pessoa;
}

export async function deletePessoa(id: number): Promise<void> {
  await api.delete(`/pessoas/deletar/${id}`);
}

