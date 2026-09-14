import React, { useState } from 'react';
import { PecaConteudo, StatusProducao } from '../types';
import { GUARDRAILS } from '../data/guardrails';
import { auditarPeca } from '../utils/guardrailAuditor';
import { copiarTexto, baixarDocxPeca } from '../utils/exportUtils';
import { 
  X, 
  Calendar, 
  Film, 
  Layers, 
  Image as ImageIcon, 
  ShieldCheck, 
  AlertTriangle, 
  CheckCircle2, 
  Copy, 
  Play, 
  ChevronLeft, 
  ChevronRight, 
  Sparkles,
  Clapperboard,
  FileText,
  Eye,
  Check,
  FileDown,
  Loader2
} from 'lucide-react';

interface PieceDetailModalProps {
  peca: PecaConteudo | null;
  onClose: () => void;
  onUpdateStatus: (id: string, status: StatusProducao) => void;
  onOpenTeleprompter: (peca: PecaConteudo) => void;
}

export const PieceDetailModal: React.FC<PieceDetailModalProps> = ({
  peca,
  onClose,
  onUpdateStatus,
  onOpenTeleprompter,
}) => {
  if (!peca) return null;

  const [activeCardIndex, setActiveCardIndex] = useState<number>(0);
  const [copiadoTipo, setCopiadoTipo] = useState<string | null>(null);
  const [baixandoDocx, setBaixandoDocx] = useState<boolean>(false);

  const guardrail = GUARDRAILS[peca.empresa];
  const audit = auditarPeca(peca);

  const handleBaixarDocx = async () => {
    try {
      setBaixandoDocx(true);
      await baixarDocxPeca(peca);
    } catch (err) {
      console.error('Erro ao gerar DOCX da peça:', err);
      alert('Não foi possível gerar o arquivo Word da peça. Tente novamente.');
    } finally {
      setBaixandoDocx(false);
    }
  };

  const handleCopiar = async (tipo: 'legenda' | 'roteiro' | 'designer') => {
    let texto = '';
    if (tipo === 'legenda') {
      texto = `${peca.legenda}\n\n${peca.hashtags.join(' ')}`;
    } else if (tipo === 'roteiro' && peca.conteudo_reels) {
      const r = peca.conteudo_reels;
      texto = `ROTEIRO DE REELS: ${peca.titulo} (${r.duracao_alvo})\nTom: ${r.tom}\n\n`;
      r.cenas.forEach(c => {
        texto += `[CENA ${c.cena_numero}] (${c.tempo})\nPlano: ${c.plano}\nFala: "${c.fala_ator}"\nB-Roll: ${c.b_roll ? c.b_roll.join(', ') : 'Cenas reais'}\nTexto na tela: ${c.texto_tela || '-'}\nSom: ${c.som || '-'}\n\n`;
      });
      texto += `[FECHAMENTO]\nPlano: ${r.fechamento.plano}\nFala: "${r.fechamento.fala_ator}"\nLogo: ${r.fechamento.texto_tela_logo}\nCTA: ${r.fechamento.cta_sutil}`;
    } else if (tipo === 'designer') {
      texto = `BRIEFING DESIGNER - ${peca.id} (${peca.formato})\nTítulo: ${peca.titulo}\nDirecionamento: ${peca.direcionamento_criativo}\n\n`;
      if (peca.conteudo_cards) {
        peca.conteudo_cards.forEach(c => {
          texto += `Card ${c.numero_card}: ${c.headline}\nSub: ${c.subheadline}\nDestaque: ${c.destaque || '-'}\n\n`;
        });
      }
    }

    await copiarTexto(texto);
    setCopiadoTipo(tipo);
    setTimeout(() => setCopiadoTipo(null), 2000);
  };

  const cards = peca.conteudo_cards || [];
  const currentCard = cards[activeCardIndex] || cards[0];

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-xs flex items-center justify-center p-2 sm:p-4 animate-in fade-in duration-150">
      <div className="bg-white w-full max-w-4xl rounded-2xl shadow-2xl border border-slate-200 overflow-hidden flex flex-col max-h-[92vh]">
        {/* Cabeçalho */}
        <div className="p-5 bg-slate-900 text-white flex items-center justify-between border-b border-slate-800 shrink-0">
          <div className="flex items-center gap-3">
            <span className="font-mono text-xs font-bold text-sky-400 bg-slate-800 px-2.5 py-1 rounded-md border border-slate-700">
              {peca.id}
            </span>
            <div>
              <h2 className="text-base sm:text-lg font-bold line-clamp-1">{peca.titulo}</h2>
              <div className="flex items-center gap-2 text-xs text-slate-400 mt-0.5">
                <span>{peca.empresa}</span>
                <span>•</span>
                <span>{peca.data_publicacao}</span>
                <span>•</span>
                <span className="font-semibold text-slate-300">{peca.linha_editorial}</span>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {/* Status Selector */}
            <select
              value={peca.status || 'Planejado'}
              onChange={e => onUpdateStatus(peca.id, e.target.value as StatusProducao)}
              className="px-2.5 py-1 rounded-lg text-xs font-bold bg-slate-800 text-slate-200 border border-slate-700 outline-hidden hover:bg-slate-700 transition-colors"
            >
              <option value="Planejado">Planejado</option>
              <option value="Em Roteiro">Em Roteiro</option>
              <option value="Em Produção">Em Produção</option>
              <option value="Gravado / Desenhado">Gravado / Desenhado</option>
              <option value="Aprovado">Aprovado</option>
              <option value="Publicado">Publicado</option>
            </select>

            <button
              onClick={onClose}
              className="w-8 h-8 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white flex items-center justify-center transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Corpo Scrollável */}
        <div className="p-6 space-y-6 overflow-y-auto flex-1 text-xs sm:text-sm">
          {/* Card de Auditoria Guardrail */}
          <div className={`p-4 rounded-xl border flex flex-col md:flex-row md:items-center justify-between gap-3 ${
            audit.passes
              ? 'bg-emerald-50/70 border-emerald-200 text-emerald-950'
              : 'bg-amber-50/70 border-amber-200 text-amber-950'
          }`}>
            <div className="flex items-start gap-3">
              <div className={`w-9 h-9 rounded-lg flex items-center justify-center shrink-0 ${
                audit.passes ? 'bg-emerald-600 text-white' : 'bg-amber-600 text-white'
              }`}>
                {audit.passes ? <ShieldCheck className="w-5 h-5" /> : <AlertTriangle className="w-5 h-5" />}
              </div>
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className="font-bold text-sm">
                    Auditoria de Conformidade: {audit.score}/100
                  </span>
                  <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase ${
                    audit.passes ? 'bg-emerald-200 text-emerald-900' : 'bg-amber-200 text-amber-900'
                  }`}>
                    {audit.passes ? 'Aprovado nos Guardrails' : 'Requer Validação'}
                  </span>
                </div>
                <p className="text-xs opacity-90">
                  Pilar: <strong>{peca.categoria}</strong> | Tom: {guardrail.tom.split('.')[0]}.
                </p>
                {audit.dadosParaValidar.length > 0 && (
                  <div className="text-xs text-amber-900 font-semibold bg-amber-100/70 px-2 py-1 rounded mt-1 inline-block">
                    ⚠️ Métricas com tag [INSERIR DADO]: {audit.dadosParaValidar.join('; ')}
                  </div>
                )}
              </div>
            </div>

            {/* Ações Rápidas de Cópia e Exportação */}
            <div className="flex flex-wrap items-center gap-2 shrink-0">
              <button
                onClick={handleBaixarDocx}
                disabled={baixandoDocx}
                className="px-3 py-1.5 bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white rounded-lg font-bold text-xs flex items-center gap-1.5 shadow-2xs transition-colors disabled:opacity-50"
                title="Fazer download do briefing destrinchado e formatado desta peça em Word (.docx)"
              >
                {baixandoDocx ? (
                  <Loader2 className="w-3.5 h-3.5 animate-spin" />
                ) : (
                  <FileDown className="w-3.5 h-3.5" />
                )}
                <span>Baixar DOCX</span>
              </button>

              <button
                onClick={() => handleCopiar('legenda')}
                className="px-3 py-1.5 bg-white hover:bg-slate-50 text-slate-800 rounded-lg border border-slate-300 font-bold text-xs flex items-center gap-1.5 shadow-2xs transition-colors"
              >
                {copiadoTipo === 'legenda' ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                <span>Copiar Legenda</span>
              </button>

              {peca.formato === 'Reels' ? (
                <button
                  onClick={() => handleCopiar('roteiro')}
                  className="px-3 py-1.5 bg-purple-600 hover:bg-purple-700 text-white rounded-lg font-bold text-xs flex items-center gap-1.5 shadow-2xs transition-colors"
                >
                  {copiadoTipo === 'roteiro' ? <Check className="w-3.5 h-3.5 text-emerald-300" /> : <Clapperboard className="w-3.5 h-3.5" />}
                  <span>Copiar Roteiro</span>
                </button>
              ) : (
                <button
                  onClick={() => handleCopiar('designer')}
                  className="px-3 py-1.5 bg-sky-600 hover:bg-sky-700 text-white rounded-lg font-bold text-xs flex items-center gap-1.5 shadow-2xs transition-colors"
                >
                  {copiadoTipo === 'designer' ? <Check className="w-3.5 h-3.5 text-emerald-300" /> : <FileText className="w-3.5 h-3.5" />}
                  <span>Briefing Designer</span>
                </button>
              )}
            </div>
          </div>

          {/* Seção 1: Formato Específico */}
          {peca.formato === 'Reels' && peca.conteudo_reels ? (
            /* Estúdio de Roteiro de Reels */
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="font-bold text-slate-900 text-base flex items-center gap-2">
                  <Film className="w-4 h-4 text-purple-600" />
                  Roteiro de Produção (Reels — {peca.conteudo_reels.duracao_alvo})
                </h3>

                <button
                  onClick={() => onOpenTeleprompter(peca)}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-slate-900 hover:bg-slate-800 text-white rounded-lg font-bold text-xs shadow-xs transition-colors"
                >
                  <Play className="w-3.5 h-3.5 text-sky-400 fill-sky-400" />
                  Abrir Teleprompter de Gravação
                </button>
              </div>

              {/* Tabela / Grid de Cenas */}
              <div className="space-y-3">
                {peca.conteudo_reels.cenas.map((cena) => (
                  <div
                    key={cena.cena_numero}
                    className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-2 hover:border-slate-300 transition-colors"
                  >
                    <div className="flex items-center justify-between text-xs">
                      <div className="flex items-center gap-2">
                        <span className="w-6 h-6 rounded-full bg-purple-600 text-white font-bold flex items-center justify-center text-[11px]">
                          {cena.cena_numero}
                        </span>
                        <span className="font-bold text-slate-800">
                          Cena {cena.cena_numero} ({cena.tempo})
                        </span>
                      </div>
                      <span className="font-medium text-slate-500 bg-white px-2 py-0.5 rounded border border-slate-200">
                        {cena.plano}
                      </span>
                    </div>

                    {/* Descrição e Fala */}
                    <div className="bg-white p-3 rounded-lg border border-slate-200 space-y-1.5">
                      <p className="text-xs text-slate-500 italic">
                        {cena.descricao_cena}
                      </p>
                      <p className="text-sm font-semibold text-slate-900 leading-relaxed">
                        "{cena.fala_ator}"
                      </p>
                    </div>

                    {/* B-roll, Texto na tela e Som */}
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 text-xs pt-1">
                      <div className="bg-slate-100/80 p-2 rounded-md">
                        <span className="font-bold text-slate-600 block text-[10px] uppercase">
                          B-Roll Real:
                        </span>
                        <span className="text-slate-800 font-medium">
                          {cena.b_roll ? cena.b_roll.join('; ') : 'Cenas da operação'}
                        </span>
                      </div>
                      <div className="bg-slate-100/80 p-2 rounded-md">
                        <span className="font-bold text-slate-600 block text-[10px] uppercase">
                          Texto na Tela:
                        </span>
                        <span className="text-slate-800 font-medium font-mono text-[11px]">
                          {cena.texto_tela || 'Sem texto sobreposto'}
                        </span>
                      </div>
                      <div className="bg-slate-100/80 p-2 rounded-md">
                        <span className="font-bold text-slate-600 block text-[10px] uppercase">
                          Áudio & Trilha:
                        </span>
                        <span className="text-slate-800 font-medium">
                          {cena.som || 'Ambiente natural e voz limpa'}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}

                {/* Fechamento Institucional */}
                <div className="p-4 rounded-xl bg-purple-50/70 border border-purple-200 space-y-2 text-xs">
                  <span className="font-bold uppercase tracking-wider text-purple-900 block text-[11px]">
                    Fechamento Institucional (3s a 5s)
                  </span>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <span className="text-slate-500 block">Fala do Ator / Locução:</span>
                      <p className="font-bold text-slate-900 mt-0.5">
                        "{peca.conteudo_reels.fechamento.fala_ator}"
                      </p>
                    </div>
                    <div>
                      <span className="text-slate-500 block">Logo na Tela & CTA:</span>
                      <p className="font-bold text-purple-900 mt-0.5">
                        {peca.conteudo_reels.fechamento.texto_tela_logo} — {peca.conteudo_reels.fechamento.cta_sutil}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            /* Simulador de Deck de Cards (Carrossel / Estático) */
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="font-bold text-slate-900 text-base flex items-center gap-2">
                  <Layers className="w-4 h-4 text-sky-600" />
                  Simulador de Cards ({peca.formato} — {cards.length} card{cards.length > 1 ? 's' : ''})
                </h3>

                {cards.length > 1 && (
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => setActiveCardIndex(prev => Math.max(0, prev - 1))}
                      disabled={activeCardIndex === 0}
                      className="p-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 disabled:opacity-30 text-slate-700 transition-colors"
                    >
                      <ChevronLeft className="w-4 h-4" />
                    </button>
                    <span className="text-xs font-bold text-slate-700">
                      Card {activeCardIndex + 1} de {cards.length}
                    </span>
                    <button
                      onClick={() => setActiveCardIndex(prev => Math.min(cards.length - 1, prev + 1))}
                      disabled={activeCardIndex === cards.length - 1}
                      className="p-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 disabled:opacity-30 text-slate-700 transition-colors"
                    >
                      <ChevronRight className="w-4 h-4" />
                    </button>
                  </div>
                )}
              </div>

              {/* Preview do Card Ativo */}
              {currentCard && (
                <div className="p-6 rounded-2xl bg-slate-900 text-white shadow-xl relative min-h-[190px] flex flex-col justify-between border border-slate-800">
                  <div className="flex items-center justify-between text-xs text-slate-400">
                    <span className="font-bold tracking-wider uppercase text-[10px] bg-slate-800 px-2 py-0.5 rounded text-sky-400">
                      {peca.empresa} • {peca.linha_editorial}
                    </span>
                    <span className="font-mono font-bold">
                      {currentCard.numero_card}/{cards.length}
                    </span>
                  </div>

                  <div className="py-4 space-y-2">
                    {currentCard.destaque && (
                      <span className="inline-block px-2.5 py-1 rounded-md text-[11px] font-bold uppercase tracking-wider bg-amber-500/20 text-amber-300 border border-amber-400/30">
                        {currentCard.destaque}
                      </span>
                    )}
                    <h4 className="text-lg sm:text-xl font-extrabold text-white leading-tight">
                      {currentCard.headline}
                    </h4>
                    <p className="text-sm text-slate-300 leading-relaxed font-medium">
                      {currentCard.subheadline}
                    </p>
                  </div>

                  <div className="text-[10px] text-slate-500 border-t border-slate-800 pt-2 flex justify-between items-center">
                    <span>Arraste para o lado ›</span>
                    <span>Salvar este post</span>
                  </div>
                </div>
              )}

              {/* Tabela de Todos os Cards */}
              <div className="space-y-2 pt-2">
                <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                  Visão Geral de Todos os Cards:
                </span>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {cards.map((c, i) => (
                    <div
                      key={c.numero_card}
                      onClick={() => setActiveCardIndex(i)}
                      className={`p-3 rounded-xl border text-left cursor-pointer transition-all ${
                        activeCardIndex === i
                          ? 'bg-sky-50 border-sky-400 shadow-2xs ring-1 ring-sky-400'
                          : 'bg-white border-slate-200 hover:bg-slate-50'
                      }`}
                    >
                      <div className="flex items-center justify-between text-xs font-bold text-slate-600 mb-1">
                        <span>Card {c.numero_card}</span>
                        {c.destaque && (
                          <span className="text-[10px] text-amber-700 bg-amber-50 px-1.5 py-0.5 rounded border border-amber-200">
                            {c.destaque}
                          </span>
                        )}
                      </div>
                      <h5 className="font-bold text-slate-900 text-xs line-clamp-1">{c.headline}</h5>
                      <p className="text-[11px] text-slate-500 line-clamp-2 mt-0.5">{c.subheadline}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Seção 2: Direcionamento Criativo para o Time de Arte */}
          <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-1">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500 block">
              🎨 Direcionamento Criativo (Briefing Técnico)
            </span>
            <p className="text-xs text-slate-800 leading-relaxed font-medium">
              {peca.direcionamento_criativo}
            </p>
          </div>

          {/* Seção 3: Legenda e Estrutura de Copy */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <h3 className="font-bold text-slate-900 text-base flex items-center gap-2">
                <FileText className="w-4 h-4 text-indigo-600" />
                Legenda Formatada ({guardrail.estrutura_copy.nome})
              </h3>
              <button
                onClick={() => handleCopiar('legenda')}
                className="text-xs font-bold text-sky-600 hover:text-sky-800 flex items-center gap-1"
              >
                <Copy className="w-3.5 h-3.5" />
                Copiar
              </button>
            </div>

            <div className="p-4 rounded-xl bg-slate-900 text-slate-100 font-mono text-xs leading-relaxed whitespace-pre-wrap selection:bg-sky-600">
              {peca.legenda}
            </div>

            {/* Hashtags */}
            <div className="flex flex-wrap gap-1.5">
              {peca.hashtags.map((tag, i) => (
                <span
                  key={i}
                  className="px-2 py-0.5 rounded-md text-xs font-medium bg-slate-100 text-slate-700 border border-slate-200"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Rodapé do Modal */}
        <div className="p-4 bg-slate-100 border-t border-slate-200 flex items-center justify-between gap-3 shrink-0">
          <div className="text-xs text-slate-500 font-medium hidden sm:block">
            Canais: <strong className="text-slate-800">{peca.canais.join(', ')}</strong>
          </div>
          <div className="flex items-center gap-2 w-full sm:w-auto justify-end">
            <button
              onClick={handleBaixarDocx}
              disabled={baixandoDocx}
              className="px-3.5 py-2 bg-blue-50 hover:bg-blue-100 text-blue-700 border border-blue-200 font-bold text-xs rounded-xl shadow-2xs transition-colors flex items-center gap-1.5 disabled:opacity-50"
            >
              {baixandoDocx ? (
                <Loader2 className="w-3.5 h-3.5 animate-spin text-blue-600" />
              ) : (
                <FileDown className="w-3.5 h-3.5 text-blue-600" />
              )}
              <span>Exportar DOCX</span>
            </button>
            <button
              onClick={onClose}
              className="px-5 py-2 bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs rounded-xl shadow-xs transition-colors"
            >
              Concluir Visualização
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
