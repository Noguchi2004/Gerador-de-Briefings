import { PecaConteudo, EmpresaNome } from '../types';
import { GUARDRAILS } from '../data/guardrails';

export interface AuditResult {
  passes: boolean;
  score: number; // 0 to 100
  warnings: string[];
  errors: string[];
  dadosParaValidar: string[];
  destaquesPositivos: string[];
}

const PALAVRAS_PROIBIDAS_GERAIS = ['incrível', 'o melhor', 'fantástico', 'maravilhoso', 'fórmula mágica', 'supercharge', 'empower'];

const PALAVRAS_PROIBIDAS_POR_EMPRESA: Record<EmpresaNome, string[]> = {
  'CLRC': ['aluguel de galpão', 'aluguel de galpões', 'depósito simples', 'incrível', 'o melhor', 'sensacional'],
  'Mais Armazém': ['só armazenagem', 'apenas armazenar', 'depósito simples', 'galpão vazio'],
  'Armazena Mais': ['depósito barato', 'depósito velho', 'galpãozão'],
  'Belmir Menegatti': ['fórmula mágica', 'arrasta pra cima', 'fique rico', 'mentalidade milionária', 'coach de sucesso'],
};

export function auditarPeca(peca: PecaConteudo): AuditResult {
  const guardrail = GUARDRAILS[peca.empresa];
  const warnings: string[] = [];
  const errors: string[] = [];
  const dadosParaValidar: string[] = [];
  const destaquesPositivos: string[] = [];

  let score = 100;

  // 1. Categoria e Linha Editorial pertencem à empresa?
  if (!guardrail.pilares.includes(peca.categoria)) {
    errors.push(`Categoria "${peca.categoria}" não pertence aos pilares oficiais da empresa ${peca.empresa}.`);
    score -= 25;
  } else {
    destaquesPositivos.push(`Pilar editorial alinhado: "${peca.categoria}"`);
  }

  if (!guardrail.linhas_editoriais.includes(peca.linha_editorial)) {
    errors.push(`Linha editorial "${peca.linha_editorial}" não pertence aos quadros permitidos de ${peca.empresa}.`);
    score -= 25;
  } else {
    destaquesPositivos.push(`Linha editorial oficial: "${peca.linha_editorial}"`);
  }

  // 2. Busca por palavras proibidas
  const textoCompleto = `${peca.titulo} ${peca.legenda} ${peca.direcionamento_criativo} ${
    peca.conteudo_cards?.map(c => `${c.headline} ${c.subheadline}`).join(' ') || ''
  } ${
    peca.conteudo_reels?.cenas?.map(s => `${s.fala_ator} ${s.descricao_cena}`).join(' ') || ''
  }`.toLowerCase();

  const proibidas = PALAVRAS_PROIBIDAS_POR_EMPRESA[peca.empresa] || PALAVRAS_PROIBIDAS_GERAIS;
  for (const termo of proibidas) {
    if (textoCompleto.includes(termo.toLowerCase())) {
      errors.push(`Uso de termo vedado pelos guardrails: "${termo}"`);
      score -= 20;
    }
  }

  // 3. Busca por tags [INSERIR DADO: ...]
  const regexDado = /\[INSERIR DADO:\s*([^\]]+)\]/gi;
  let match;
  while ((match = regexDado.exec(textoCompleto)) !== null) {
    dadosParaValidar.push(match[1].trim());
  }

  if (dadosParaValidar.length > 0) {
    warnings.push(`${dadosParaValidar.length} dado(s) quantitativo(s) aguardando validação técnica antes do disparo.`);
    destaquesPositivos.push(`Conformidade com a diretriz: Dados sem validação estão devidamente tagueados.`);
  }

  // 4. Formato e campos obrigatórios
  if (peca.formato === 'Reels') {
    if (!peca.conteudo_reels) {
      errors.push('Peça classificada como Reels sem objeto `conteudo_reels` definido.');
      score -= 30;
    } else {
      const reels = peca.conteudo_reels;
      if (!reels.cenas || reels.cenas.length === 0) {
        errors.push('Roteiro de Reels sem cenas detalhadas.');
        score -= 20;
      } else {
        destaquesPositivos.push(`Roteiro com ${reels.cenas.length} cenas decupadas com marcação de tempo.`);
        // Verifica se há marcação de B-roll
        const temBroll = reels.cenas.some(c => c.b_roll && c.b_roll.length > 0);
        if (temBroll) {
          destaquesPositivos.push('Marcação minuciosa de B-roll operacional inclusa.');
        } else {
          warnings.push('Nenhuma cena possui marcação explícita de B-roll.');
          score -= 10;
        }
      }

      if (!reels.fechamento || !reels.fechamento.fala_ator) {
        warnings.push('Fechamento do Reels sem fala do ator estruturada.');
        score -= 5;
      }
    }
  } else {
    // Carrossel ou Estático
    if (!peca.conteudo_cards || peca.conteudo_cards.length === 0) {
      errors.push(`Formato ${peca.formato} exige pelo menos 1 card em \`conteudo_cards\`.`);
      score -= 30;
    } else {
      destaquesPositivos.push(`${peca.conteudo_cards.length} card(s) com headline e subheadline estruturadas.`);
      if (peca.formato === 'Carrossel' && peca.conteudo_cards.length < 3) {
        warnings.push('Carrossel com menos de 3 cards pode ter retenção reduzida.');
      }
    }
  }

  // 5. Verificação de canais
  if (!peca.canais || peca.canais.length === 0) {
    warnings.push('Nenhum canal de veiculação especificado.');
  }

  return {
    passes: errors.length === 0,
    score: Math.max(0, score),
    warnings,
    errors,
    dadosParaValidar,
    destaquesPositivos,
  };
}
