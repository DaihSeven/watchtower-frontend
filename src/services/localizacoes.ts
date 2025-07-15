import { Localizacao, LocalizacaoComAvistamento } from "@/types/localizacao";
import { Pessoa } from "@/types/pessoas";
import { Avistamento } from "@/types/avistamento";
import { api } from "./api";

export async function getAllLocalizacoes(): Promise<Localizacao[]> {
  const response = await api.get("/local");
  return response.data;
}

export async function getAllAvistamentos(): Promise<Avistamento[]> {
  const response = await api.get("/avistamentamentos");
  return response.data;
}

export async function getLocalizacoesComAvistamentos(): Promise<LocalizacaoComAvistamento[]> {
  try {
    const [localizacoes, avistamentos] = await Promise.all([
      getAllLocalizacoes(),
      getAllAvistamentos()
    ]);

    return localizacoes.map(localizacao => {
      const avistamentoRelacionado = avistamentos.find(av => av.idPessoaDesaparecida === localizacao.pessoaId);
      return {
        ...localizacao,
        avistamento: avistamentoRelacionado ? {
          id: avistamentoRelacionado.id,
          dataAvistamento: avistamentoRelacionado.dataHora || '',
          confirmado: true, // Assumindo que se existe um avistamento, é confirmado
          descricao: avistamentoRelacionado.comentario
        } : undefined
      };
    });
  } catch (error) {
    console.error('Erro ao carregar localizações com avistamentos:', error);
    throw error;
  }
}

export async function getPessoaDesaparecida(id: number): Promise<Pessoa> {
  const response = await api.get(`/pessoa/${id}`);
  return response.data;
} 