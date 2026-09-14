import {
  Document,
  Packer,
  Paragraph,
  TextRun,
  HeadingLevel,
  AlignmentType,
  convertInchesToTwip,
  PageBreak,
} from 'docx';
import { CronogramaEmpresa, PecaConteudo, EmpresaNome } from '../types';
import { GUARDRAILS } from '../data/guardrails';
import { auditarPeca } from './guardrailAuditor';

interface BrandTheme {
  primary: string;       // Hex without #
  secondary: string;
  accent: string;
  lightBg: string;
  border: string;
  textDark: string;
  textMuted: string;
}

const BRAND_THEMES: Record<EmpresaNome, BrandTheme> = {
  'CLRC': {
    primary: '0F172A',     // Slate 900
    secondary: '1E3A8A',   // Blue 900
    accent: '0284C7',      // Sky 600
    lightBg: 'F8FAFC',
    border: '94A3B8',
    textDark: '0F172A',
    textMuted: '475569',
  },
  'Mais Armazém': {
    primary: '78350F',     // Amber 900
    secondary: 'B45309',   // Amber 700
    accent: 'D97706',      // Amber 600
    lightBg: 'FFFBEB',
    border: 'D97706',
    textDark: '451A03',
    textMuted: '78350F',
  },
  'Armazena Mais': {
    primary: '064E3B',     // Emerald 900
    secondary: '047857',   // Emerald 700
    accent: '059669',      // Emerald 600
    lightBg: 'ECFDF5',
    border: '059669',
    textDark: '064E3B',
    textMuted: '065F46',
  },
  'Belmir Menegatti': {
    primary: '1E1B4B',     // Indigo 950
    secondary: '3730A3',   // Indigo 800
    accent: '4F46E5',      // Indigo 600
    lightBg: 'EEF2FF',
    border: '4F46E5',
    textDark: '1E1B4B',
    textMuted: '3730A3',
  },
};

const DEFAULT_THEME: BrandTheme = {
  primary: '0F172A',
  secondary: '334155',
  accent: '2563EB',
  lightBg: 'F8FAFC',
  border: '64748B',
  textDark: '0F172A',
  textMuted: '475569',
};

function getTheme(empresa: EmpresaNome): BrandTheme {
  return BRAND_THEMES[empresa] || DEFAULT_THEME;
}

/**
 * Cria parágrafo divisor sutil entre seções no documento em texto corrido
 */
function createSectionDivider(theme: BrandTheme): Paragraph {
  return new Paragraph({
    spacing: { before: 200, after: 200 },
    alignment: AlignmentType.CENTER,
    children: [
      new TextRun({
        text: '— • — • — • — • — • — • — • — • — • —',
        color: theme.border,
        size: 20,
        font: 'Arial',
      }),
    ],
  });
}

/**
 * Cria a seção inicial / capa e metadados estratégicos em texto corrido
 */
function buildCoverSectionCorrido(cronograma: CronogramaEmpresa, theme: BrandTheme): Paragraph[] {
  const guardrail = GUARDRAILS[cronograma.empresa];
  const paragraphs: Paragraph[] = [];

  // Supertítulo do cabeçalho
  paragraphs.push(
    new Paragraph({
      alignment: AlignmentType.LEFT,
      spacing: { before: 100, after: 60 },
      children: [
        new TextRun({
          text: 'SISTEMA ROTEIRISTA INSTITUCIONAL • DOCUMENTO OFICIAL DE PRODUÇÃO',
          bold: true,
          size: 18,
          color: theme.accent,
          font: 'Arial',
        }),
      ],
    })
  );

  // Título Principal do Cronograma
  paragraphs.push(
    new Paragraph({
      alignment: AlignmentType.LEFT,
      spacing: { before: 60, after: 100 },
      children: [
        new TextRun({
          text: 'BRIEFING OPERACIONAL & CRONOGRAMA EDITORIAL',
          bold: true,
          size: 36, // 18pt
          color: theme.primary,
          font: 'Arial',
        }),
      ],
    })
  );

  // Subtítulo: Empresa e Mês
  paragraphs.push(
    new Paragraph({
      alignment: AlignmentType.LEFT,
      spacing: { before: 0, after: 240 },
      children: [
        new TextRun({
          text: `${cronograma.empresa.toUpperCase()} — MÊS DE REFERÊNCIA: ${cronograma.mes_referencia.toUpperCase()}`,
          bold: true,
          size: 24, // 12pt
          color: theme.textMuted,
          font: 'Arial',
        }),
        new TextRun({
          text: ` (${cronograma.total_conteudos} conteúdos planejados)`,
          size: 22,
          color: '64748B',
          font: 'Arial',
        }),
      ],
    })
  );

  paragraphs.push(createSectionDivider(theme));

  // SEÇÃO: DIRETRIZES ESTRATÉGICAS DA MARCA
  paragraphs.push(
    new Paragraph({
      spacing: { before: 240, after: 120 },
      heading: HeadingLevel.HEADING_2,
      children: [
        new TextRun({
          text: 'DIRETRIZES ESTRATÉGICAS & METADADOS DA MARCA',
          bold: true,
          size: 26, // 13pt
          color: theme.primary,
          font: 'Arial',
        }),
      ],
    })
  );

  // Posicionamento
  paragraphs.push(
    new Paragraph({
      spacing: { before: 80, after: 80 },
      children: [
        new TextRun({ text: '• Empresa / Conta: ', bold: true, size: 22, color: theme.primary, font: 'Arial' }),
        new TextRun({ text: `${cronograma.empresa} (${cronograma.mes_referencia})`, size: 22, color: '1E293B', font: 'Arial' }),
      ],
    })
  );

  paragraphs.push(
    new Paragraph({
      spacing: { before: 80, after: 80 },
      children: [
        new TextRun({ text: '• Posicionamento Estratégico: ', bold: true, size: 22, color: theme.primary, font: 'Arial' }),
        new TextRun({ text: guardrail?.posicionamento || '-', size: 22, color: '1E293B', font: 'Arial' }),
      ],
    })
  );

  // Tom de Voz
  paragraphs.push(
    new Paragraph({
      spacing: { before: 80, after: 80 },
      children: [
        new TextRun({ text: '• Tom de Voz Oficial: ', bold: true, size: 22, color: theme.primary, font: 'Arial' }),
        new TextRun({ text: guardrail?.tom || '-', size: 22, color: '1E293B', font: 'Arial' }),
      ],
    })
  );

  // Framework de Copywriting
  paragraphs.push(
    new Paragraph({
      spacing: { before: 80, after: 80 },
      children: [
        new TextRun({ text: '• Framework de Copywriting: ', bold: true, size: 22, color: theme.primary, font: 'Arial' }),
        new TextRun({
          text: guardrail ? `${guardrail.estrutura_copy.nome} (${guardrail.estrutura_copy.etapas.join(' → ')})` : '-',
          size: 22,
          color: '1E293B',
          font: 'Arial',
        }),
      ],
    })
  );

  // Canais Oficiais
  paragraphs.push(
    new Paragraph({
      spacing: { before: 80, after: 80 },
      children: [
        new TextRun({ text: '• Canais de Veiculação: ', bold: true, size: 22, color: theme.primary, font: 'Arial' }),
        new TextRun({ text: guardrail?.canais_padrao?.join(', ') || 'Instagram, LinkedIn', size: 22, color: '1E293B', font: 'Arial' }),
      ],
    })
  );

  // Proibições e Guardrails
  if (guardrail?.proibicoes && guardrail.proibicoes.length > 0) {
    paragraphs.push(
      new Paragraph({
        spacing: { before: 140, after: 60 },
        children: [
          new TextRun({
            text: '• Guardrails Inegociáveis & Proibições:',
            bold: true,
            size: 22,
            color: '991B1B', // Alerta vermelho
            font: 'Arial',
          }),
        ],
      })
    );

    guardrail.proibicoes.forEach((proibicao) => {
      paragraphs.push(
        new Paragraph({
          spacing: { before: 40, after: 40 },
          indent: { left: convertInchesToTwip(0.3) },
          children: [
            new TextRun({ text: '— ', bold: true, size: 21, color: '991B1B', font: 'Arial' }),
            new TextRun({ text: proibicao, size: 21, color: '7F1D1D', font: 'Arial' }),
          ],
        })
      );
    });
  }

  paragraphs.push(createSectionDivider(theme));

  // SEÇÃO: RESUMO DO CRONOGRAMA EDITORIAL EM TEXTO CORRIDO
  paragraphs.push(
    new Paragraph({
      spacing: { before: 240, after: 120 },
      heading: HeadingLevel.HEADING_2,
      children: [
        new TextRun({
          text: 'QUADRO RESUMO DO CRONOGRAMA EDITORIAL',
          bold: true,
          size: 26,
          color: theme.primary,
          font: 'Arial',
        }),
      ],
    })
  );

  paragraphs.push(
    new Paragraph({
      spacing: { before: 0, after: 160 },
      children: [
        new TextRun({
          text: `Relação sequencial das ${cronograma.cronograma.length} peças planejadas para o período:`,
          size: 22,
          italics: true,
          color: '64748B',
          font: 'Arial',
        }),
      ],
    })
  );

  cronograma.cronograma.forEach((peca, idx) => {
    paragraphs.push(
      new Paragraph({
        spacing: { before: 60, after: 60 },
        children: [
          new TextRun({ text: `${idx + 1}. `, bold: true, size: 22, color: theme.accent, font: 'Arial' }),
          new TextRun({ text: `[${peca.id}] `, bold: true, size: 22, color: theme.primary, font: 'Arial' }),
          new TextRun({ text: `${peca.data_publicacao} • `, bold: true, size: 22, color: '475569', font: 'Arial' }),
          new TextRun({ text: `${peca.formato.toUpperCase()}: `, bold: true, size: 22, color: theme.accent, font: 'Arial' }),
          new TextRun({ text: `"${peca.titulo}" `, bold: true, size: 22, color: '0F172A', font: 'Arial' }),
          new TextRun({ text: `(Pilar: ${peca.categoria} | Linha: ${peca.linha_editorial})`, size: 20, color: '64748B', font: 'Arial' }),
        ],
      })
    );
  });

  // Quebra de página para iniciar o detalhamento das peças
  paragraphs.push(
    new Paragraph({
      children: [new PageBreak()],
    })
  );

  return paragraphs;
}

/**
 * Constrói a seção de uma única peça de conteúdo completamente em texto corrido estruturado
 */
function buildPieceDetailedCorrido(
  peca: PecaConteudo,
  index: number,
  total: number,
  theme: BrandTheme,
  addPageBreakAfter: boolean = true
): Paragraph[] {
  const paragraphs: Paragraph[] = [];
  const audit = auditarPeca(peca);

  // 1. CABEÇALHO DO ITEM
  paragraphs.push(
    new Paragraph({
      spacing: { before: 240, after: 60 },
      children: [
        new TextRun({
          text: `ITEM ${index + 1} DE ${total} • ${peca.id} • ${peca.formato.toUpperCase()}`,
          bold: true,
          size: 20,
          color: theme.accent,
          font: 'Arial',
        }),
      ],
    })
  );

  // Título da Peça
  paragraphs.push(
    new Paragraph({
      spacing: { before: 0, after: 140 },
      heading: HeadingLevel.HEADING_1,
      children: [
        new TextRun({
          text: peca.titulo,
          bold: true,
          size: 30, // 15pt
          color: theme.primary,
          font: 'Arial',
        }),
      ],
    })
  );

  // Ficha Técnica em Texto Corrido
  paragraphs.push(
    new Paragraph({
      spacing: { before: 60, after: 60 },
      children: [
        new TextRun({ text: '• Data de Publicação: ', bold: true, size: 22, color: theme.primary, font: 'Arial' }),
        new TextRun({ text: peca.data_publicacao, size: 22, bold: true, color: '0F172A', font: 'Arial' }),
        new TextRun({ text: '    |    ', color: 'CBD5E1', size: 22, font: 'Arial' }),
        new TextRun({ text: 'Formato: ', bold: true, size: 22, color: theme.primary, font: 'Arial' }),
        new TextRun({ text: peca.formato, size: 22, bold: true, color: theme.accent, font: 'Arial' }),
      ],
    })
  );

  paragraphs.push(
    new Paragraph({
      spacing: { before: 60, after: 60 },
      children: [
        new TextRun({ text: '• Pilar / Categoria: ', bold: true, size: 22, color: theme.primary, font: 'Arial' }),
        new TextRun({ text: peca.categoria, size: 22, color: '1E293B', font: 'Arial' }),
        new TextRun({ text: '    |    ', color: 'CBD5E1', size: 22, font: 'Arial' }),
        new TextRun({ text: 'Linha Editorial: ', bold: true, size: 22, color: theme.primary, font: 'Arial' }),
        new TextRun({ text: peca.linha_editorial, size: 22, color: '1E293B', font: 'Arial' }),
      ],
    })
  );

  paragraphs.push(
    new Paragraph({
      spacing: { before: 60, after: 160 },
      children: [
        new TextRun({ text: '• Tipo de Conteúdo: ', bold: true, size: 22, color: theme.primary, font: 'Arial' }),
        new TextRun({ text: peca.tipo_conteudo, size: 22, color: '1E293B', font: 'Arial' }),
        new TextRun({ text: '    |    ', color: 'CBD5E1', size: 22, font: 'Arial' }),
        new TextRun({ text: 'Canais Oficiais: ', bold: true, size: 22, color: theme.primary, font: 'Arial' }),
        new TextRun({ text: peca.canais.join(', '), size: 22, color: '1E293B', font: 'Arial' }),
      ],
    })
  );

  // 2. DIRECIONAMENTO CRIATIVO / BRIEFING TÉCNICO (Texto Corrido)
  paragraphs.push(
    new Paragraph({
      spacing: { before: 180, after: 80 },
      heading: HeadingLevel.HEADING_2,
      children: [
        new TextRun({
          text: '1. DIRECIONAMENTO CRIATIVO (BRIEFING PARA DESIGNER / FILMMAKER)',
          bold: true,
          size: 24,
          color: theme.primary,
          font: 'Arial',
        }),
      ],
    })
  );

  // Parágrafos do direcionamento criativo
  const criativoLinhas = peca.direcionamento_criativo.split('\n');
  criativoLinhas.forEach((linha) => {
    if (linha.trim()) {
      paragraphs.push(
        new Paragraph({
          spacing: { before: 60, after: 60 },
          children: [
            new TextRun({
              text: linha,
              size: 22,
              color: '1E293B',
              font: 'Arial',
            }),
          ],
        })
      );
    }
  });

  // 3. ROTEIRO DE GRAVAÇÃO (SE REELS) EM TEXTO CORRIDO
  if (peca.formato === 'Reels' && peca.conteudo_reels) {
    const reels = peca.conteudo_reels;

    paragraphs.push(
      new Paragraph({
        spacing: { before: 220, after: 80 },
        heading: HeadingLevel.HEADING_2,
        children: [
          new TextRun({
            text: `2. ROTEIRO DE GRAVAÇÃO (REELS • DURAÇÃO ALVO: ${reels.duracao_alvo.toUpperCase()})`,
            bold: true,
            size: 24,
            color: theme.primary,
            font: 'Arial',
          }),
        ],
      })
    );

    paragraphs.push(
      new Paragraph({
        spacing: { before: 0, after: 160 },
        children: [
          new TextRun({ text: '• Tom de Interpretação / Atuação: ', bold: true, size: 22, color: theme.primary, font: 'Arial' }),
          new TextRun({ text: reels.tom, italics: true, size: 22, color: '1E293B', font: 'Arial' }),
        ],
      })
    );

    // Cenas em texto corrido sequencial
    reels.cenas.forEach((cena) => {
      paragraphs.push(
        new Paragraph({
          spacing: { before: 180, after: 60 },
          heading: HeadingLevel.HEADING_3,
          children: [
            new TextRun({
              text: `Cena ${cena.cena_numero} (${cena.tempo}) — ${cena.plano}`,
              bold: true,
              size: 22,
              color: theme.accent,
              font: 'Arial',
            }),
          ],
        })
      );

      if (cena.descricao_cena) {
        paragraphs.push(
          new Paragraph({
            spacing: { before: 40, after: 60 },
            indent: { left: convertInchesToTwip(0.2) },
            children: [
              new TextRun({ text: 'Direção de Cena / Ambientação: ', bold: true, size: 21, color: '475569', font: 'Arial' }),
              new TextRun({ text: cena.descricao_cena, italics: true, size: 21, color: '334155', font: 'Arial' }),
            ],
          })
        );
      }

      paragraphs.push(
        new Paragraph({
          spacing: { before: 60, after: 60 },
          indent: { left: convertInchesToTwip(0.2) },
          children: [
            new TextRun({ text: 'Fala do Ator / Locução: ', bold: true, size: 22, color: theme.primary, font: 'Arial' }),
            new TextRun({ text: `"${cena.fala_ator}"`, bold: true, size: 22, color: '0F172A', font: 'Arial' }),
          ],
        })
      );

      paragraphs.push(
        new Paragraph({
          spacing: { before: 40, after: 40 },
          indent: { left: convertInchesToTwip(0.2) },
          children: [
            new TextRun({ text: 'Visual de Apoio / B-Roll: ', bold: true, size: 21, color: '475569', font: 'Arial' }),
            new TextRun({
              text: cena.b_roll && cena.b_roll.length > 0 ? cena.b_roll.join('; ') : 'Imagens operacionais reais',
              size: 21,
              color: '334155',
              font: 'Arial',
            }),
          ],
        })
      );

      paragraphs.push(
        new Paragraph({
          spacing: { before: 40, after: 40 },
          indent: { left: convertInchesToTwip(0.2) },
          children: [
            new TextRun({ text: 'Texto na Tela: ', bold: true, size: 21, color: '475569', font: 'Arial' }),
            new TextRun({
              text: cena.texto_tela ? `[${cena.texto_tela}]` : 'Sem texto na tela',
              bold: !!cena.texto_tela,
              size: 21,
              color: cena.texto_tela ? theme.accent : '64748B',
              font: 'Arial',
            }),
          ],
        })
      );

      paragraphs.push(
        new Paragraph({
          spacing: { before: 40, after: 80 },
          indent: { left: convertInchesToTwip(0.2) },
          children: [
            new TextRun({ text: 'Áudio / Trilha: ', bold: true, size: 21, color: '475569', font: 'Arial' }),
            new TextRun({
              text: cena.som || 'Áudio ambiente natural com captação clara da voz',
              italics: true,
              size: 21,
              color: '64748B',
              font: 'Arial',
            }),
          ],
        })
      );
    });

    // Fechamento Institucional
    paragraphs.push(
      new Paragraph({
        spacing: { before: 200, after: 60 },
        heading: HeadingLevel.HEADING_3,
        children: [
          new TextRun({
            text: 'Fechamento Institucional (Últimos 3 a 5 Segundos):',
            bold: true,
            size: 22,
            color: theme.primary,
            font: 'Arial',
          }),
        ],
      })
    );

    paragraphs.push(
      new Paragraph({
        spacing: { before: 40, after: 40 },
        indent: { left: convertInchesToTwip(0.2) },
        children: [
          new TextRun({ text: '• Plano Final: ', bold: true, size: 21, color: '475569', font: 'Arial' }),
          new TextRun({ text: reels.fechamento.plano, size: 21, color: '1E293B', font: 'Arial' }),
        ],
      })
    );

    paragraphs.push(
      new Paragraph({
        spacing: { before: 40, after: 40 },
        indent: { left: convertInchesToTwip(0.2) },
        children: [
          new TextRun({ text: '• Fala de Encerramento: ', bold: true, size: 21, color: theme.primary, font: 'Arial' }),
          new TextRun({ text: `"${reels.fechamento.fala_ator}"`, bold: true, size: 21, color: '0F172A', font: 'Arial' }),
        ],
      })
    );

    paragraphs.push(
      new Paragraph({
        spacing: { before: 40, after: 40 },
        indent: { left: convertInchesToTwip(0.2) },
        children: [
          new TextRun({ text: '• Assinatura na Tela: ', bold: true, size: 21, color: '475569', font: 'Arial' }),
          new TextRun({ text: reels.fechamento.texto_tela_logo, bold: true, size: 21, color: theme.accent, font: 'Arial' }),
        ],
      })
    );

    paragraphs.push(
      new Paragraph({
        spacing: { before: 40, after: 120 },
        indent: { left: convertInchesToTwip(0.2) },
        children: [
          new TextRun({ text: '• Chamada para Ação (CTA Sutil): ', bold: true, size: 21, color: '475569', font: 'Arial' }),
          new TextRun({ text: `"${reels.fechamento.cta_sutil}"`, italics: true, size: 21, color: '1E293B', font: 'Arial' }),
        ],
      })
    );

  } else if (peca.conteudo_cards && peca.conteudo_cards.length > 0) {
    // 3. ESTRUTURA DOS CARDS (CARROSSEL OU ESTÁTICO) EM TEXTO CORRIDO
    paragraphs.push(
      new Paragraph({
        spacing: { before: 220, after: 80 },
        heading: HeadingLevel.HEADING_2,
        children: [
          new TextRun({
            text: `2. ESTRUTURA DOS CARDS (${peca.formato.toUpperCase()} • ${peca.conteudo_cards.length} CARDS)`,
            bold: true,
            size: 24,
            color: theme.primary,
            font: 'Arial',
          }),
        ],
      })
    );

    peca.conteudo_cards.forEach((card) => {
      const badge = card.destaque || (card.numero_card === 1 ? 'CAPA' : 'CONTEÚDO');
      paragraphs.push(
        new Paragraph({
          spacing: { before: 140, after: 40 },
          heading: HeadingLevel.HEADING_3,
          children: [
            new TextRun({
              text: `Card ${card.numero_card} [${badge.toUpperCase()}]`,
              bold: true,
              size: 22,
              color: theme.accent,
              font: 'Arial',
            }),
          ],
        })
      );

      paragraphs.push(
        new Paragraph({
          spacing: { before: 40, after: 40 },
          indent: { left: convertInchesToTwip(0.2) },
          children: [
            new TextRun({ text: 'Headline Principal: ', bold: true, size: 22, color: '0F172A', font: 'Arial' }),
            new TextRun({ text: card.headline, bold: true, size: 22, color: theme.primary, font: 'Arial' }),
          ],
        })
      );

      paragraphs.push(
        new Paragraph({
          spacing: { before: 40, after: 100 },
          indent: { left: convertInchesToTwip(0.2) },
          children: [
            new TextRun({ text: 'Subheadline / Apoio: ', bold: true, size: 21, color: '475569', font: 'Arial' }),
            new TextRun({ text: card.subheadline, size: 21, color: '334155', font: 'Arial' }),
          ],
        })
      );
    });
  }

  // 4. LEGENDA & COPYWRITING (TEXTO CORRIDO COMPLETO)
  paragraphs.push(
    new Paragraph({
      spacing: { before: 220, after: 80 },
      heading: HeadingLevel.HEADING_2,
      children: [
        new TextRun({
          text: '3. LEGENDA FORMATADA (COPYWRITING COMPLETO)',
          bold: true,
          size: 24,
          color: theme.primary,
          font: 'Arial',
        }),
      ],
    })
  );

  // Emite cada linha da legenda como parágrafos de texto corrido preservando a leitura
  const linhasLegenda = peca.legenda.split('\n');
  linhasLegenda.forEach((linha) => {
    paragraphs.push(
      new Paragraph({
        spacing: { before: 30, after: 30 },
        children: [
          new TextRun({
            text: linha.trim() ? linha : ' ',
            size: 22, // 11pt
            color: '1E293B',
            font: 'Arial',
          }),
        ],
      })
    );
  });

  // 5. HASHTAGS ESTRATÉGICAS
  paragraphs.push(
    new Paragraph({
      spacing: { before: 160, after: 60 },
      children: [
        new TextRun({ text: 'Hashtags Estratégicas: ', bold: true, size: 22, color: theme.primary, font: 'Arial' }),
        new TextRun({ text: peca.hashtags.join('  '), size: 22, color: theme.accent, font: 'Arial' }),
      ],
    })
  );

  // 6. AUDITORIA E CONFORMIDADE DE GUARDRAILS
  paragraphs.push(
    new Paragraph({
      spacing: { before: 140, after: 60 },
      children: [
        new TextRun({ text: 'Conformidade de Marca: ', bold: true, size: 21, color: '475569', font: 'Arial' }),
        new TextRun({
          text: audit.passes ? 'APROVADO NOS GUARDRAILS • 100% EM CONFORMIDADE' : 'ATENÇÃO REQUERIDA • VALIDAR DADOS QUANTITATIVOS',
          bold: true,
          size: 21,
          color: audit.passes ? '059669' : 'D97706',
          font: 'Arial',
        }),
      ],
    })
  );

  if (audit.dadosParaValidar.length > 0) {
    paragraphs.push(
      new Paragraph({
        spacing: { before: 40, after: 60 },
        indent: { left: convertInchesToTwip(0.2) },
        children: [
          new TextRun({
            text: `⚠️ Dados que requerem validação prévia da diretoria: ${audit.dadosParaValidar.join('; ')}`,
            bold: true,
            size: 20,
            color: 'B45309',
            font: 'Arial',
          }),
        ],
      })
    );
  }

  // Divisão ou Quebra de página para o próximo item
  if (addPageBreakAfter) {
    paragraphs.push(
      new Paragraph({
        children: [new PageBreak()],
      })
    );
  } else {
    paragraphs.push(createSectionDivider(theme));
  }

  return paragraphs;
}

/**
 * Gera o documento DOCX do cronograma completo em TEXTO CORRIDO (sem tabelas)
 */
export async function gerarDocxCronogramaCompleto(cronograma: CronogramaEmpresa): Promise<Blob> {
  const theme = getTheme(cronograma.empresa);

  // 1. Capa & Metadados Estratégicos
  const coverElements = buildCoverSectionCorrido(cronograma, theme);

  // 2. Detalhamento de cada peça em texto corrido
  const piecesElements: Paragraph[] = [];
  cronograma.cronograma.forEach((peca, idx) => {
    const isLast = idx === cronograma.cronograma.length - 1;
    const pieceElements = buildPieceDetailedCorrido(
      peca,
      idx,
      cronograma.cronograma.length,
      theme,
      !isLast
    );
    piecesElements.push(...pieceElements);
  });

  const doc = new Document({
    creator: 'Roteirista Institucional v2.0',
    title: `Briefing e Cronograma Editorial - ${cronograma.empresa}`,
    description: `Briefings detalhados, roteiros de gravação e copies em texto corrido para ${cronograma.empresa} (${cronograma.mes_referencia})`,
    sections: [
      {
        properties: {
          page: {
            margin: {
              top: convertInchesToTwip(0.8),
              bottom: convertInchesToTwip(0.8),
              left: convertInchesToTwip(0.9),
              right: convertInchesToTwip(0.9),
            },
          },
        },
        children: [...coverElements, ...piecesElements],
      },
    ],
  });

  return await Packer.toBlob(doc);
}

/**
 * Faz download do arquivo DOCX do cronograma completo em texto corrido
 */
export async function baixarDocxCronograma(cronograma: CronogramaEmpresa): Promise<void> {
  const blob = await gerarDocxCronogramaCompleto(cronograma);
  const cleanEmpresa = cronograma.empresa.toLowerCase().replace(/\s+/g, '-');
  const cleanMes = cronograma.mes_referencia.toLowerCase().replace(/\s+/g, '-');
  const filename = `briefing-completo-${cleanEmpresa}-${cleanMes}.docx`;

  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}

/**
 * Gera e faz download do arquivo DOCX de uma única peça de conteúdo em TEXTO CORRIDO (sem tabelas)
 */
export async function baixarDocxPeca(peca: PecaConteudo): Promise<void> {
  const theme = getTheme(peca.empresa);
  const pieceElements = buildPieceDetailedCorrido(peca, 0, 1, theme, false);

  // Cabeçalho institucional da peça individual
  const headerElements: Paragraph[] = [
    new Paragraph({
      alignment: AlignmentType.LEFT,
      spacing: { before: 100, after: 60 },
      children: [
        new TextRun({
          text: `BRIEFING OPERACIONAL • ${peca.empresa.toUpperCase()}`,
          size: 18,
          bold: true,
          color: theme.accent,
          font: 'Arial',
        }),
      ],
    }),
    new Paragraph({
      alignment: AlignmentType.LEFT,
      spacing: { before: 0, after: 180 },
      children: [
        new TextRun({
          text: `DOCUMENTO DE PRODUÇÃO — ${peca.id}`,
          size: 32,
          bold: true,
          color: theme.primary,
          font: 'Arial',
        }),
      ],
    }),
    createSectionDivider(theme),
  ];

  const doc = new Document({
    creator: 'Roteirista Institucional v2.0',
    title: `Briefing ${peca.id} - ${peca.titulo}`,
    description: `Briefing operacional destrinchado em texto corrido para a peça ${peca.id} (${peca.formato})`,
    sections: [
      {
        properties: {
          page: {
            margin: {
              top: convertInchesToTwip(0.8),
              bottom: convertInchesToTwip(0.8),
              left: convertInchesToTwip(0.9),
              right: convertInchesToTwip(0.9),
            },
          },
        },
        children: [...headerElements, ...pieceElements],
      },
    ],
  });

  const blob = await Packer.toBlob(doc);
  const cleanId = peca.id.toLowerCase().replace(/[^a-z0-9_-]/g, '-');
  const filename = `briefing-${cleanId}.docx`;

  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}
