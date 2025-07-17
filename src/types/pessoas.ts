export interface Pessoa {
  id?: number;
  nome: string;
  idade?: number;
  desaparecidoDesde: string; // COLOCAR NO FORM
  descricao?: string;
  fotoUrl?: string;
  criadoEm?: string;
  atualizadoEm?: string;
  userId?: number;
  ultimaLocalizacao?: string;

  //novas tipagens pra ver se resolve o problema
  status?: Status;
}

type Status = 'ATIVO' | 'ENCONTRADO'
