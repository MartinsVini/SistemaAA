export interface Processo {
  id: string; // Guid
  numeroProcesso?: string;
  tipoAcao: string;
  status: ProcessoStatus;
  dataCriacao: Date;
  dataAtualizacao?: Date;
  clienteIds?: string[];
  clientes?: Cliente[];
  parteContrariaIds?: string[];
  partesContrarias?: ParteContraria[];
  documentos?: Documento[];
  // Other fields mapped from dto
  faseDoProcesso?: string;
  admissao?: Date;
  demissao?: Date;
  sindicato?: boolean;
  pedidos?: string[];
  varaDoTrabalho?: string;
  uf?: string;
  valorCausa?: number;
  dataDeProcuracao?: Date;
  dataDeProtocolo?: Date;
  dataArquivamento?: Date;
  motivoArquivamento?: string;
  mesDoMarketing?: string;
  captadorId?: string;
  responsavelId?: string;
  advogadoResponsavelId?: string;
}

export enum ProcessoStatus {
  Entrada = 0,
  Triagem = 1,
  RedacaoInicial = 2,
  Revisao = 3,
  Protocolado = 4,
  Concluido = 5,
  Arquivado = 6
}

export interface Cliente {
  id: string;
  nome: string;
  email: string;
  cpfCnpj: string;
  telefone?: string;
  endereco?: string;
}

export interface ParteContraria {
  id: string;
  nome: string;
  cnpjCpf: string;
  observacoes?: string;
  tipo: string;
  setor?: string;
}

export interface Documento {
  id: string;
  nomeOriginal: string;
  urlAcesso: string;
  tipoConteudo: string;
  tamanhoBytes: number;
  dataUpload: Date;
}

export interface CreateProcessoDto {
  tipoAcao: string;
  numeroProcesso?: string;
  status?: ProcessoStatus;
  clienteIds: string[];
  parteContrariaIds: string[];
  captadorId: string;
  responsavelId: string;
  faseDoProcesso?: string;
  admissao?: string; // YYYY-MM-DD
  demissao?: string; // YYYY-MM-DD
  sindicato?: boolean;
  varaDoTrabalho?: string;
  uf?: string;
  valorCausa?: number;
}

export interface UpdateProcessoStatusDto {
  status: ProcessoStatus;
}
