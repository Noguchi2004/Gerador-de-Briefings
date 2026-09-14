import { CronogramaEmpresa, ParametrosProducao, PecaConteudo } from '../types';
import { GUARDRAILS } from '../data/guardrails';
import { INITIAL_SCHEDULES } from '../data/initialSchedules';

export async function gerarCronogramaCompleto(parametros: ParametrosProducao): Promise<CronogramaEmpresa> {
  const { empresa, mes_referencia, total_conteudos, distribuicao_formatos, pilares_selecionados } = parametros;

  // Tenta chamada ao backend com Gemini API
  try {
    const response = await fetch('/api/generate-schedule', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(parametros),
    });

    if (response.ok) {
      const data = await response.json();
      if (data && data.cronograma && Array.isArray(data.cronograma) && data.cronograma.length > 0) {
        return {
          empresa,
          mes_referencia,
          total_conteudos: data.cronograma.length,
          cronograma: data.cronograma.map((item: any, idx: number) => ({
            ...item,
            id: item.id || `${empresa.replace(/\s+/g, '')}-${idx + 1}`,
            status: item.status || 'Planejado',
          })),
        };
      }
    }
  } catch (e) {
    console.warn('API local offline ou fallback acionado, gerando via motor institucional:', e);
  }

  // Motor Institucional de Síntese Guardrail-Compliant
  return sintetizarCronogramaLocal(parametros);
}

export function sintetizarCronogramaLocal(parametros: ParametrosProducao): CronogramaEmpresa {
  const { empresa, mes_referencia, total_conteudos, distribuicao_formatos, pilares_selecionados, estagio_lancamento, foco_mes } = parametros;
  const guardrail = GUARDRAILS[empresa];

  // Base existente para reutilização ou inspiração
  const basePre = INITIAL_SCHEDULES[empresa];
  const pecasBase = basePre ? [...basePre.cronograma] : [];

  const formatosList: ('Carrossel' | 'Estático' | 'Reels')[] = [];
  for (let i = 0; i < (distribuicao_formatos.carrosseis || 0); i++) formatosList.push('Carrossel');
  for (let i = 0; i < (distribuicao_formatos.estaticos || 0); i++) formatosList.push('Estático');
  for (let i = 0; i < (distribuicao_formatos.reels || 0); i++) formatosList.push('Reels');

  // Caso a soma dos formatos seja diferente do total, preenche ou ajusta conforme mix recomendado
  while (formatosList.length < total_conteudos) {
    if (empresa === 'Belmir Menegatti') {
      formatosList.push('Reels');
    } else if (empresa === 'CLRC') {
      formatosList.push(formatosList.length % 2 === 0 ? 'Carrossel' : 'Estático');
    } else if (empresa === 'Mais Armazém') {
      formatosList.push(formatosList.length % 2 === 0 ? 'Reels' : 'Estático');
    } else {
      formatosList.push('Estático');
    }
  }

  const pilaresDisponiveis = pilares_selecionados && pilares_selecionados.length >= 2 
    ? pilares_selecionados 
    : guardrail.pilares;

  const resultado: PecaConteudo[] = [];
  const diasMes = [2, 5, 8, 11, 14, 17, 20, 23, 26, 28, 30];

  for (let i = 0; i < total_conteudos; i++) {
    const formato = formatosList[i % formatosList.length];
    const categoria = pilaresDisponiveis[i % pilaresDisponiveis.length];
    const linhaEditorial = guardrail.linhas_editoriais[i % guardrail.linhas_editoriais.length];
    
    // Tipo de conteúdo baseado no mix
    let tipo: 'Educativo' | 'Institucional' | 'Comercial' = 'Educativo';
    if (i % 4 === 1) tipo = 'Institucional';
    if (i % 5 === 0 && i !== 0) tipo = 'Comercial';

    // Se houver peça base correspondente ao formato, aproveitamos a estrutura e customizamos
    const pecaExemplo = pecasBase.find(p => p.formato === formato) || pecasBase[i % pecasBase.length];

    const dia = diasMes[i % diasMes.length];
    const dataPub = `${dia < 10 ? '0' + dia : dia}/${mes_referencia.includes('10') || mes_referencia.toLowerCase().includes('out') ? '10' : '11'}/2026`;

    const idPrefix = empresa.split(' ').map(w => w[0]).join('').toUpperCase();
    const id = `${idPrefix}-${mes_referencia.slice(0, 3).toUpperCase()}-${i + 1 < 10 ? '0' + (i + 1) : i + 1}`;

    const peca: PecaConteudo = {
      empresa,
      id,
      data_publicacao: dataPub,
      titulo: pecaExemplo ? `${pecaExemplo.titulo}${i >= pecasBase.length ? ` (Módulo ${i + 1})` : ''}` : `Estratégia Operacional: ${linhaEditorial}`,
      formato,
      categoria,
      tipo_conteudo: tipo,
      linha_editorial: linhaEditorial,
      canais: [...guardrail.canais_padrao],
      direcionamento_criativo: pecaExemplo?.direcionamento_criativo || `Identidade visual em conformidade com o tom ${guardrail.tom}.`,
      legenda: pecaExemplo?.legenda || `Legenda estruturada conforme os guardrails da ${empresa}.`,
      hashtags: pecaExemplo?.hashtags || [`#${empresa.replace(/\s+/g, '')}`],
      status: 'Planejado',
    };

    if (formato === 'Reels') {
      peca.conteudo_reels = pecaExemplo?.conteudo_reels || {
        duracao_alvo: '35s',
        tom: guardrail.tom,
        cenas: [
          {
            cena_numero: 1,
            tempo: '00:00 - 00:08',
            descricao_cena: 'Abertura com foco direto na dor ou gargalo operacional',
            plano: 'Plano médio em movimento',
            fala_ator: 'Você sabe exatamente quanto tempo sua equipe perde diariamente neste processo?',
            b_roll: ['Cena real da operação em funcionamento sem encenações genéricas'],
            texto_tela: 'O GARGALO QUE NINGUÉM MEDE',
            som: 'Ambiente operacional limpo e voz nítida'
          },
          {
            cena_numero: 2,
            tempo: '00:09 - 00:22',
            descricao_cena: 'Demonstração da aplicação prática e do critério técnico',
            plano: 'Plano fechado com demonstração técnica',
            fala_ator: 'Quando a estrutura é planejada com critério, o fluxo acontece sem retrabalho.',
            b_roll: ['Detalhe do processo executado com método'],
            texto_tela: 'PROCESSO VALIDADO | RESULTADO MENSURÁVEL',
            som: 'Trilha discreta corporativa'
          },
          {
            cena_numero: 3,
            tempo: '00:23 - 00:32',
            descricao_cena: 'Fechamento com aprendizado e autoridade',
            plano: 'Plano médio frontal',
            fala_ator: 'Decisão madura se toma com dados na mesa, não com suposições.',
            b_roll: ['Visão ampla da estrutura moderna'],
            texto_tela: 'DECISÃO BASEADA EM CRITÉRIO TÉCNICO',
            som: 'Finalização sonora elegante'
          }
        ],
        fechamento: {
          plano: 'Plano da marca em perspectiva',
          fala_ator: `${empresa}. Excelência comprovada na prática.`,
          texto_tela_logo: `${empresa}`,
          cta_sutil: 'Acompanhe nossos conteúdos técnicos ou fale com nossos especialistas.'
        }
      };
    } else {
      peca.conteudo_cards = pecaExemplo?.conteudo_cards || [
        {
          numero_card: 1,
          headline: `O impacto da escolha técnica na sua operação`,
          subheadline: `Por que decisões imobiliárias e logísticas exigem análise de longo prazo.`,
          destaque: 'Fator Crítico'
        },
        {
          numero_card: 2,
          headline: `A métrica que precisa ser auditada`,
          subheadline: `Entenda como os detalhes estruturais protegem o fluxo de caixa.`,
          destaque: '[INSERIR DADO: índice de eficiência esperado]'
        },
        {
          numero_card: 3,
          headline: `${empresa}: Solução planejada para alta performance`,
          subheadline: `Converse com nossos especialistas e conheça as especificações completas.`,
          destaque: 'Fale com a equipe'
        }
      ];
    }

    resultado.push(peca);
  }

  return {
    empresa,
    mes_referencia,
    total_conteudos,
    cronograma: resultado,
  };
}
