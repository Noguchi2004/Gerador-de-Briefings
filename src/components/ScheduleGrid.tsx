import React from 'react';
import { PecaConteudo, StatusProducao } from '../types';
import { 
  Calendar, 
  Film, 
  Layers, 
  Image as ImageIcon, 
  Clock, 
  CheckCircle2, 
  AlertTriangle, 
  ArrowRight,
  Copy,
  FileText,
  Share2,
  SlidersHorizontal
} from 'lucide-react';
import { copiarTexto } from '../utils/exportUtils';

interface ScheduleGridProps {
  pecas: PecaConteudo[];
  onSelectPeca: (peca: PecaConteudo) => void;
  onUpdateStatus: (id: string, status: StatusProducao) => void;
}

export const ScheduleGrid: React.FC<ScheduleGridProps> = ({
  pecas,
  onSelectPeca,
  onUpdateStatus,
}) => {
  const [copiadoId, setCopiadoId] = React.useState<string | null>(null);

  const handleCopiarLegenda = async (e: React.MouseEvent, peca: PecaConteudo) => {
    e.stopPropagation();
    const texto = `${peca.legenda}\n\n${peca.hashtags.join(' ')}`;
    await copiarTexto(texto);
    setCopiadoId(peca.id);
    setTimeout(() => setCopiadoId(null), 2000);
  };

  if (pecas.length === 0) {
    return (
      <div className="text-center py-16 bg-white rounded-2xl border border-dashed border-slate-300 p-8">
        <p className="text-slate-500 font-medium text-sm">
          Nenhuma peça encontrada com os filtros selecionados.
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
      {pecas.map((peca) => {
        const hasDadoPendente = (
          peca.titulo.includes('[INSERIR DADO:') ||
          peca.legenda.includes('[INSERIR DADO:') ||
          JSON.stringify(peca.conteudo_cards || {}).includes('[INSERIR DADO:') ||
          JSON.stringify(peca.conteudo_reels || {}).includes('[INSERIR DADO:')
        );

        return (
          <div
            key={peca.id}
            onClick={() => onSelectPeca(peca)}
            className="group bg-white rounded-2xl border border-slate-200 hover:border-slate-400 hover:shadow-md transition-all cursor-pointer flex flex-col justify-between overflow-hidden relative"
          >
            {/* Topo do Card */}
            <div className="p-5 space-y-3">
              {/* Linha 1: ID, Data, Formato */}
              <div className="flex items-center justify-between gap-2 text-xs">
                <span className="font-mono font-bold text-slate-400 group-hover:text-slate-700 transition-colors">
                  {peca.id}
                </span>

                <div className="flex items-center gap-1.5">
                  <span className="inline-flex items-center gap-1 font-semibold text-slate-600 bg-slate-100 px-2 py-0.5 rounded-md">
                    <Calendar className="w-3 h-3 text-slate-400" />
                    {peca.data_publicacao}
                  </span>

                  {/* Badge de Formato */}
                  {peca.formato === 'Reels' ? (
                    <span className="inline-flex items-center gap-1 font-bold text-purple-700 bg-purple-50 px-2 py-0.5 rounded-md border border-purple-200">
                      <Film className="w-3 h-3 text-purple-600" />
                      Reels ({peca.conteudo_reels?.duracao_alvo || '35s'})
                    </span>
                  ) : peca.formato === 'Carrossel' ? (
                    <span className="inline-flex items-center gap-1 font-bold text-sky-700 bg-sky-50 px-2 py-0.5 rounded-md border border-sky-200">
                      <Layers className="w-3 h-3 text-sky-600" />
                      Carrossel ({peca.conteudo_cards?.length || 0} cards)
                    </span>
                  ) : (
                    <span className="inline-flex items-center gap-1 font-bold text-amber-700 bg-amber-50 px-2 py-0.5 rounded-md border border-amber-200">
                      <ImageIcon className="w-3 h-3 text-amber-600" />
                      Estático
                    </span>
                  )}
                </div>
              </div>

              {/* Título da Peça */}
              <h3 className="font-bold text-slate-900 text-base leading-snug group-hover:text-sky-700 transition-colors line-clamp-2">
                {peca.titulo}
              </h3>

              {/* Linha Editorial & Pilar */}
              <div className="space-y-1 text-xs">
                <div className="flex items-center gap-1.5 text-slate-500">
                  <span className="font-semibold text-slate-700 truncate">
                    {peca.linha_editorial}
                  </span>
                  <span>•</span>
                  <span className="truncate">{peca.categoria}</span>
                </div>
              </div>

              {/* Tag de Alerta se houver [INSERIR DADO] */}
              {hasDadoPendente && (
                <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-[11px] font-semibold bg-amber-50 text-amber-900 border border-amber-200">
                  <AlertTriangle className="w-3.5 h-3.5 text-amber-600 shrink-0" />
                  <span>Dado numérico pendente de validação</span>
                </div>
              )}

              {/* Canais e Tipo */}
              <div className="flex flex-wrap items-center gap-1.5 pt-1">
                <span className={`px-2 py-0.5 rounded-md text-[10px] font-bold uppercase tracking-wider ${
                  peca.tipo_conteudo === 'Educativo'
                    ? 'bg-emerald-50 text-emerald-800 border border-emerald-200'
                    : peca.tipo_conteudo === 'Institucional'
                    ? 'bg-blue-50 text-blue-800 border border-blue-200'
                    : 'bg-purple-50 text-purple-800 border border-purple-200'
                }`}>
                  {peca.tipo_conteudo}
                </span>

                {peca.canais.map((canal, i) => (
                  <span key={i} className="px-1.5 py-0.5 rounded text-[10px] font-medium bg-slate-100 text-slate-600">
                    {canal}
                  </span>
                ))}
              </div>
            </div>

            {/* Rodapé com Seletor de Status e Ações */}
            <div className="p-3.5 bg-slate-50 border-t border-slate-100 flex items-center justify-between text-xs">
              {/* Dropdown de Status */}
              <select
                value={peca.status || 'Planejado'}
                onClick={e => e.stopPropagation()}
                onChange={e => onUpdateStatus(peca.id, e.target.value as StatusProducao)}
                className="px-2 py-1 rounded-md font-semibold text-xs border border-slate-200 bg-white text-slate-700 outline-hidden hover:border-slate-400 focus:ring-1 focus:ring-slate-900"
              >
                <option value="Planejado">Planejado</option>
                <option value="Em Roteiro">Em Roteiro</option>
                <option value="Em Produção">Em Produção</option>
                <option value="Gravado / Desenhado">Gravado / Desenhado</option>
                <option value="Aprovado">Aprovado</option>
                <option value="Publicado">Publicado</option>
              </select>

              {/* Botões Rápidos */}
              <div className="flex items-center gap-1">
                <button
                  onClick={e => handleCopiarLegenda(e, peca)}
                  className="p-1.5 text-slate-500 hover:text-slate-900 hover:bg-slate-200 rounded-md transition-colors"
                  title="Copiar Legenda"
                >
                  <Copy className="w-4 h-4" />
                </button>
                <span className="text-sky-600 font-semibold flex items-center gap-1 group-hover:translate-x-0.5 transition-transform pl-1">
                  Briefing
                  <ArrowRight className="w-3.5 h-3.5" />
                </span>
              </div>
            </div>

            {/* Feedback de Copiado */}
            {copiadoId === peca.id && (
              <div className="absolute inset-x-0 top-0 bg-emerald-600 text-white text-center text-xs font-bold py-1 animate-in fade-in">
                Legenda copiada para a área de transferência!
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
};
