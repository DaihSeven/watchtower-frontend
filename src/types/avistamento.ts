export interface Avistamento {
  id: number;
  idPessoaDesaparecida: number;
  comentario: string;
  localAvistamento?: string;
  latitude?: number;
  longitude?: number;
  nomeInformante?: string;
  contatoInformante?: string;
  userId: number;
  dataCadastro?: string;
  dataAtualizacao?: string;
}
