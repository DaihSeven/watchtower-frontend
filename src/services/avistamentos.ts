// services/avistamentos.ts

import { Avistamento } from "@/types/avistamento";
import { api } from "./api"; // instância axios, configurar URL

export async function getAllAvistamentos(): Promise<Avistamento[]> {
  const response = await api.get("/avistamento");
  return response.data.avistamentos;
}

export async function createAvistamento(data: Omit<Avistamento, "id" | "userId">): Promise<Avistamento> {
  const response = await api.post("/avistamento/cadastrar", data);
  return response.data.avistamento;
}

export async function updateAvistamento(id: number, data: Omit<Avistamento, "id" | "userId">):Promise<Avistamento> {
  const response = await api.patch(`/avistamento/atualizar/${id}`, data);
  return response.data.avistamento;
}


export async function deleteAvistamento(id: number): Promise<void> {
  await api.delete(`/avistamento/deletar/${id}`);
}
