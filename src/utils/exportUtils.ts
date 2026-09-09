import { CronogramaEmpresa, PecaConteudo } from '../types';

export function exportarJsonSchema(cronograma: CronogramaEmpresa): string {
  // Limpa campos internos de UI como status se desejado, mantendo a estrutura pura do schema
  const schemaFormatado = {
    empresa: cronograma.empresa,
    mes_referencia: cronograma.mes_referencia,
    total_conteudos: cronograma.total_conteudos,
    cronograma: cronograma.cronograma.map(peca => {
      const item: any = {
        empresa: peca.empresa,
        id: peca.id,
        data_publicacao: peca.data_publicacao,
        titulo: peca.titulo,
        formato: peca.formato,
        categoria: peca.categoria,
        tipo_conteudo: peca.tipo_conteudo,
        linha_editorial: peca.linha_editorial,
        canais: peca.canais,
        direcionamento_criativo: peca.direcionamento_criativo,
        legenda: peca.legenda,
        hashtags: peca.hashtags,
      };

      if (peca.formato === 'Reels') {
        item.conteudo_reels = peca.conteudo_reels;
      } else {
        item.conteudo_cards = peca.conteudo_cards;
      }

      return item;
    }),
  };

  return JSON.stringify(schemaFormatado, null, 2);
}

export function baixarArquivoJson(cronograma: CronogramaEmpresa) {
  const jsonStr = exportarJsonSchema(cronograma);
  const blob = new Blob([jsonStr], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `cronograma-${cronograma.empresa.toLowerCase().replace(/\s+/g, '-')}-${cronograma.mes_referencia.toLowerCase().replace(/\s+/g, '-')}.json`;
  a.click();
  URL.revokeObjectURL(url);
}

export function exportarMarkdown(cronograma: CronogramaEmpresa): string {
  let md = `# CRONOGRAMA DE MARKETING & BRIEFINGS OPERACIONAIS\n`;
  md += `**Empresa:** ${cronograma.empresa}\n`;
  md += `**Mês de Referência:** ${cronograma.mes_referencia}\n`;
  md += `**Total de Peças:** ${cronograma.total_conteudos}\n\n`;
  md += `---\n\n`;

  cronograma.cronograma.forEach((peca, idx) => {
    md += `## [${peca.id}] ${peca.titulo}\n\n`;
    md += `- **Data de Publicação:** ${peca.data_publicacao}\n`;
    md += `- **Formato:** ${peca.formato}\n`;
    md += `- **Pilar / Categoria:** ${peca.categoria}\n`;
    md += `- **Linha Editorial:** ${peca.linha_editorial}\n`;
    md += `- **Tipo de Conteúdo:** ${peca.tipo_conteudo}\n`;
    md += `- **Canais:** ${peca.canais.join(', ')}\n\n`;

    md += `### 🎨 Direcionamento Criativo\n${peca.direcionamento_criativo}\n\n`;

    if (peca.formato === 'Reels' && peca.conteudo_reels) {
      const reels = peca.conteudo_reels;
      md += `### 🎬 Roteiro de Gravação (Reels - ${reels.duracao_alvo})\n`;
      md += `*Tom:* ${reels.tom}\n\n`;
      md += `| Cena | Tempo | Plano | Fala do Ator | B-Roll / Imagens Reais | Texto na Tela |\n`;
      md += `|---|---|---|---|---|---|\n`;
      reels.cenas.forEach(c => {
        md += `| Cena ${c.cena_numero} | ${c.tempo} | ${c.plano} | "${c.fala_ator.replace(/\n/g, ' ')}" | ${c.b_roll ? c.b_roll.join('; ') : '-'} | ${c.texto_tela || '-'} |\n`;
      });
      md += `\n**Fechamento:**\n`;
      md += `- *Plano:* ${reels.fechamento.plano}\n`;
      md += `- *Fala:* "${reels.fechamento.fala_ator}"\n`;
      md += `- *Texto na Tela / Logo:* ${reels.fechamento.texto_tela_logo}\n`;
      md += `- *CTA Sutil:* ${reels.fechamento.cta_sutil}\n\n`;
    } else if (peca.conteudo_cards && peca.conteudo_cards.length > 0) {
      md += `### 📑 Conteúdo dos Cards (${peca.formato})\n\n`;
      peca.conteudo_cards.forEach(c => {
        md += `#### Card ${c.numero_card}${c.destaque ? ` [${c.destaque}]` : ''}\n`;
        md += `**${c.headline}**\n\n`;
        md += `${c.subheadline}\n\n`;
      });
    }

    md += `### ✍️ Legenda\n\n\`\`\`\n${peca.legenda}\n\`\`\`\n\n`;
    md += `**Hashtags:** ${peca.hashtags.join(' ')}\n\n`;
    md += `---\n\n`;
  });

  return md;
}

export function baixarArquivoMarkdown(cronograma: CronogramaEmpresa) {
  const mdStr = exportarMarkdown(cronograma);
  const blob = new Blob([mdStr], { type: 'text/markdown;charset=utf-8' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `briefing-${cronograma.empresa.toLowerCase().replace(/\s+/g, '-')}-${cronograma.mes_referencia.toLowerCase().replace(/\s+/g, '-')}.md`;
  a.click();
  URL.revokeObjectURL(url);
}

export function baixarArquivoCsv(cronograma: CronogramaEmpresa) {
  const headers = ['ID', 'Data', 'Título', 'Formato', 'Pilar', 'Linha Editorial', 'Tipo', 'Canais', 'Status'];
  const rows = cronograma.cronograma.map(p => [
    `"${p.id}"`,
    `"${p.data_publicacao}"`,
    `"${p.titulo.replace(/"/g, '""')}"`,
    `"${p.formato}"`,
    `"${p.categoria.replace(/"/g, '""')}"`,
    `"${p.linha_editorial.replace(/"/g, '""')}"`,
    `"${p.tipo_conteudo}"`,
    `"${p.canais.join(', ')}"`,
    `"${p.status || 'Planejado'}"`,
  ]);

  const csvContent = [headers.join(';'), ...rows.map(r => r.join(';'))].join('\n');
  const blob = new Blob(['\uFEFF' + csvContent], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `planejamento-${cronograma.empresa.toLowerCase().replace(/\s+/g, '-')}.csv`;
  a.click();
  URL.revokeObjectURL(url);
}

export async function copiarTexto(texto: string): Promise<boolean> {
  try {
    await navigator.clipboard.writeText(texto);
    return true;
  } catch {
    const textarea = document.createElement('textarea');
    textarea.value = texto;
    document.body.appendChild(textarea);
    textarea.select();
    document.execCommand('copy');
    document.body.removeChild(textarea);
    return true;
  }
}
