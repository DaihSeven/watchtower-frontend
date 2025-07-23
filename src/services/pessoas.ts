import { api } from "./api";
import { PessoaDesaparecida } from "../types/pessoas";

export type CriarPessoaData = Omit<PessoaDesaparecida, "id" | "userId" | "usuario">;

export async function getPessoas(): Promise<PessoaDesaparecida[]> {
  const res = await api.get("/pessoas");
  console.log("Resposta da API:", res.data);
  return res.data.pessoas;
}

export async function cadastrarPessoa(data: CriarPessoaData, imagem?: File): Promise<PessoaDesaparecida> {
  const formData = new FormData();
  
  Object.keys(data).forEach(key => {
    const value = data[key as keyof typeof data];
    if (value !== undefined) {
      formData.append(key, value.toString());
    }
  });
  
  if (imagem) {
    formData.append('imagem', imagem);
  }

  const res = await api.post("/pessoas/cadastrar", formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
  return res.data.pessoa;
}

export async function cadastrarPessoaSemImagem(data: CriarPessoaData): Promise<PessoaDesaparecida> {
  const res = await api.post("/pessoas/cadastrar", data);
  return res.data.pessoa;
}

export async function deletarPessoa(id: number): Promise<void> {
  await api.delete(`/pessoas/deletar/${id}`);
}

export async function atualizarPessoa(id: number, data: Partial<CriarPessoaData>): Promise<PessoaDesaparecida> {
  const res = await api.patch(`/pessoas/atualizar/${id}`, data);
  return res.data.pessoa;
}