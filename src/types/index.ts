export type EmpresaNome = 'CLRC' | 'Mais Armazém' | 'Armazena Mais' | 'Belmir Menegatti';

export type FormatoConteudo = 'Carrossel' | 'Estático' | 'Reels';

export type TipoConteudo = 'Educativo' | 'Institucional' | 'Comercial';

export type StatusProducao = 
  | 'Planejado' 
  | 'Em Roteiro' 
  | 'Em Produção' 
  | 'Gravado / Desenhado' 
  | 'Aprovado' 
  | 'Publicado';

export interface ConteudoCard {
  numero_card: number;
  headline: string;
  subheadline: string;
  destaque?: string;
}

export interface CenaReels {
  cena_numero: number;
  tempo: string;
  descricao_cena?: string;
  plano: string;
  fala_ator: string;
  b_roll?: string[];
  texto_tela?: string;
  som?: string;
}

export interface FechamentoReels {
  plano: string;
  fala_ator: string;
  texto_tela_logo: string;
  cta_sutil: string;
}

export interface ConteudoReels {
  duracao_alvo: string;
  tom: string;
  cenas: CenaReels[];
  fechamento: FechamentoReels;
}

export interface PecaConteudo {
  empresa: EmpresaNome;
  id: string;
  data_publicacao: string;
  titulo: string;
  formato: FormatoConteudo;
  categoria: string;
  tipo_conteudo: TipoConteudo;
  linha_editorial: string;
  canais: string[];
  direcionamento_criativo: string;
  legenda: string;
  hashtags: string[];
  conteudo_cards?: ConteudoCard[];
  conteudo_reels?: ConteudoReels;
  // UI helpers
  status?: StatusProducao;
}

export interface CronogramaEmpresa {
  empresa: EmpresaNome;
  mes_referencia: string;
  total_conteudos: number;
  cronograma: PecaConteudo[];
}

export interface ParametrosProducao {
  empresa: EmpresaNome;
  mes_referencia: string;
  total_conteudos: number;
  distribuicao_formatos: {
    carrosseis: number;
    estaticos: number;
    reels: number;
  };
  pilares_selecionados: string[];
  estagio_lancamento?: 'Pré-abertura' | 'Abertura' | 'Operação madura';
  foco_mes?: string;
  observacoes?: string;
}

export interface GuardrailInfo {
  empresa: EmpresaNome;
  posicionamento: string;
  pilares: string[];
  linhas_editoriais: string[];
  tom: string;
  proibicoes: string[];
  estrutura_copy: {
    nome: string;
    etapas: string[];
  };
  mix_recomendado: {
    educativo: number;
    institucional: number;
    comercial: number;
    reels: number;
    estaticos: number;
    carrosseis: number;
  };
  canais_padrao: string[];
  cor_tema: {
    primary: string;
    badge: string;
    border: string;
    accent: string;
  };
}
