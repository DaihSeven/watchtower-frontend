export interface Localizacao {
  id: number;
  nome: string;
  descricao?: string;
  latitude: number;
  longitude: number;
  pessoaId?: number;
  dataCadastro?: string;
  dataAtualizacao?: string;
}

export interface LocalizacaoComAvistamento extends Localizacao {
  avistamento?: {
    id: number;
    dataAvistamento: string;
    confirmado: boolean;
    descricao: string;
  };
}

export interface PessoaDesaparecida {
  id: number;
  nome: string;
  idade: number;
  desaparecidoDesde: string;
  ultimoAvistamento?: string;
  descricao: string;
  contato: string;
  foto?: string;
} 