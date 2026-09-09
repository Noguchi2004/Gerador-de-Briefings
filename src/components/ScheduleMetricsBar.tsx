import React from 'react';
import { 
  CronogramaEmpresa, 
  FormatoConteudo, 
  TipoConteudo, 
  StatusProducao 
} from '../types';
import { GUARDRAILS } from '../data/guardrails';
import { 
  Search, 
  Filter, 
  LayoutGrid, 
  Calendar as CalendarIcon, 
  AlertCircle, 
  CheckCircle2, 
  Film, 
  Layers, 
  Image as ImageIcon,
  BarChart3
} from 'lucide-react';

interface ScheduleMetricsBarProps {
  cronograma: CronogramaEmpresa;
  busca: string;
  onBuscaChange: (v: string) => void;
  formatoFiltro: string;
  onFormatoFiltroChange: (v: string) => void;
  tipoFiltro: string;
  onTipoFiltroChange: (v: string) => void;
  statusFiltro: string;
  onStatusFiltroChange: (v: string) => void;
  viewMode: 'grid' | 'calendar';
  onViewModeChange: (v: 'grid' | 'calendar') => void;
}

export const ScheduleMetricsBar: React.FC<ScheduleMetricsBarProps> = ({
  cronograma,
  busca,
  onBuscaChange,
  formatoFiltro,
  onFormatoFiltroChange,
  tipoFiltro,
  onTipoFiltroChange,
  statusFiltro,
  onStatusFiltroChange,
  viewMode,
  onViewModeChange,
}) => {
  const pecas = cronograma.cronograma;
  const total = pecas.length;

  // Contagens de formatos
  const numCarrosseis = pecas.filter(p => p.formato === 'Carrossel').length;
  const numEstaticos = pecas.filter(p => p.formato === 'Estático').length;
  const numReels = pecas.filter(p => p.formato === 'Reels').length;

  // Contagens de tipo
  const numEducativo = pecas.filter(p => p.tipo_conteudo === 'Educativo').length;
  const numInstitucional = pecas.filter(p => p.tipo_conteudo === 'Institucional').length;
  const numComercial = pecas.filter(p => p.tipo_conteudo === 'Comercial').length;

  const pctEducativo = total > 0 ? Math.round((numEducativo / total) * 100) : 0;
  const pctInstitucional = total > 0 ? Math.round((numInstitucional / total) * 100) : 0;
  const pctComercial = total > 0 ? Math.round((numComercial / total) * 100) : 0;

  // Contagem de tags de dados pendentes [INSERIR DADO: ...]
  let totalDadosPendentes = 0;
  pecas.forEach(p => {
    const txt = `${p.titulo} ${p.legenda} ${JSON.stringify(p.conteudo_cards || {})} ${JSON.stringify(p.conteudo_reels || {})}`;
    const matches = txt.match(/\[INSERIR DADO:/gi);
    if (matches) totalDadosPendentes += matches.length;
  });

  const guardrail = GUARDRAILS[cronograma.empresa];

  return (
    <div className="space-y-4">
      {/* Barra de Métricas e Mix */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
        {/* Card Formatos */}
        <div className="bg-white p-3.5 rounded-xl border border-slate-200 shadow-2xs">
          <div className="flex items-center justify-between text-xs text-slate-500 font-semibold mb-2">
            <span>Distribuição de Formatos</span>
            <span className="font-bold text-slate-900">{total} Peças</span>
          </div>
          <div className="flex items-center gap-2 text-xs">
            <span className="inline-flex items-center gap-1 px-2 py-1 rounded-md bg-sky-50 text-sky-800 font-semibold border border-sky-200">
              <Layers className="w-3 h-3 text-sky-600" />
              {numCarrosseis} Carrosséis
            </span>
            <span className="inline-flex items-center gap-1 px-2 py-1 rounded-md bg-amber-50 text-amber-800 font-semibold border border-amber-200">
              <ImageIcon className="w-3 h-3 text-amber-600" />
              {numEstaticos} Estáticos
            </span>
            <span className="inline-flex items-center gap-1 px-2 py-1 rounded-md bg-purple-50 text-purple-800 font-semibold border border-purple-200">
              <Film className="w-3 h-3 text-purple-600" />
              {numReels} Reels
            </span>
          </div>
        </div>

        {/* Card Mix de Conteúdo */}
        <div className="bg-white p-3.5 rounded-xl border border-slate-200 shadow-2xs md:col-span-2">
          <div className="flex items-center justify-between text-xs text-slate-500 font-semibold mb-2">
            <span className="flex items-center gap-1.5">
              <BarChart3 className="w-3.5 h-3.5 text-slate-600" />
              Mix de Conteúdo (Alvo: ~{guardrail.mix_recomendado.educativo}% Edu | ~{guardrail.mix_recomendado.institucional}% Inst | ~{guardrail.mix_recomendado.comercial}% Com)
            </span>
          </div>
          {/* Barra de progresso multi-cor */}
          <div className="w-full h-3 rounded-full bg-slate-100 flex overflow-hidden mb-2">
            <div 
              style={{ width: `${pctEducativo}%` }} 
              className="bg-emerald-500 transition-all" 
              title={`Educativo: ${pctEducativo}% (${numEducativo})`}
            />
            <div 
              style={{ width: `${pctInstitucional}%` }} 
              className="bg-blue-500 transition-all" 
              title={`Institucional: ${pctInstitucional}% (${numInstitucional})`}
            />
            <div 
              style={{ width: `${pctComercial}%` }} 
              className="bg-purple-500 transition-all" 
              title={`Comercial: ${pctComercial}% (${numComercial})`}
            />
          </div>
          <div className="flex items-center justify-between text-[11px] text-slate-600 font-medium">
            <span className="flex items-center gap-1">
              <span className="w-2 h-2 rounded-full bg-emerald-500 inline-block" />
              Educativo: <strong>{pctEducativo}%</strong> ({numEducativo})
            </span>
            <span className="flex items-center gap-1">
              <span className="w-2 h-2 rounded-full bg-blue-500 inline-block" />
              Institucional: <strong>{pctInstitucional}%</strong> ({numInstitucional})
            </span>
            <span className="flex items-center gap-1">
              <span className="w-2 h-2 rounded-full bg-purple-500 inline-block" />
              Comercial: <strong>{pctComercial}%</strong> ({numComercial})
            </span>
          </div>
        </div>

        {/* Card Validação Técnica */}
        <div className="bg-white p-3.5 rounded-xl border border-slate-200 shadow-2xs">
          <div className="text-xs text-slate-500 font-semibold mb-1">
            Validação de Dados
          </div>
          {totalDadosPendentes > 0 ? (
            <div className="flex items-center gap-2 text-xs font-semibold text-amber-800 bg-amber-50 p-2 rounded-lg border border-amber-200">
              <AlertCircle className="w-4 h-4 text-amber-600 shrink-0" />
              <span>{totalDadosPendentes} métrica(s) com tag [INSERIR DADO]</span>
            </div>
          ) : (
            <div className="flex items-center gap-2 text-xs font-semibold text-emerald-800 bg-emerald-50 p-2 rounded-lg border border-emerald-200">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>Todas as métricas validadas</span>
            </div>
          )}
        </div>
      </div>

      {/* Barra de Filtros e Busca */}
      <div className="bg-white p-3 rounded-xl border border-slate-200 shadow-2xs flex flex-col md:flex-row items-center justify-between gap-3 text-xs">
        {/* Campo de Busca */}
        <div className="relative w-full md:w-72">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
          <input
            type="text"
            value={busca}
            onChange={e => onBuscaChange(e.target.value)}
            placeholder="Buscar por título, pilar ou linha..."
            className="w-full pl-9 pr-3 py-2 border border-slate-200 rounded-lg text-xs focus:ring-2 focus:ring-slate-900 focus:border-slate-900 outline-hidden font-medium"
          />
        </div>

        {/* Seletores de Filtro */}
        <div className="flex flex-wrap items-center gap-2 w-full md:w-auto">
          {/* Formato */}
          <select
            value={formatoFiltro}
            onChange={e => onFormatoFiltroChange(e.target.value)}
            className="px-2.5 py-1.5 border border-slate-200 rounded-lg bg-white font-medium text-slate-700 outline-hidden focus:ring-2 focus:ring-slate-900"
          >
            <option value="Todos">Todos os Formatos</option>
            <option value="Carrossel">Carrossel</option>
            <option value="Estático">Estático</option>
            <option value="Reels">Reels</option>
          </select>

          {/* Tipo de Conteúdo */}
          <select
            value={tipoFiltro}
            onChange={e => onTipoFiltroChange(e.target.value)}
            className="px-2.5 py-1.5 border border-slate-200 rounded-lg bg-white font-medium text-slate-700 outline-hidden focus:ring-2 focus:ring-slate-900"
          >
            <option value="Todos">Todos os Tipos</option>
            <option value="Educativo">Educativo</option>
            <option value="Institucional">Institucional</option>
            <option value="Comercial">Comercial</option>
          </select>

          {/* Status */}
          <select
            value={statusFiltro}
            onChange={e => onStatusFiltroChange(e.target.value)}
            className="px-2.5 py-1.5 border border-slate-200 rounded-lg bg-white font-medium text-slate-700 outline-hidden focus:ring-2 focus:ring-slate-900"
          >
            <option value="Todos">Todos os Status</option>
            <option value="Planejado">Planejado</option>
            <option value="Em Roteiro">Em Roteiro</option>
            <option value="Em Produção">Em Produção</option>
            <option value="Aprovado">Aprovado</option>
            <option value="Publicado">Publicado</option>
          </select>

          {/* Switcher Grade vs Calendário */}
          <div className="flex items-center bg-slate-100 p-0.5 rounded-lg border border-slate-200 ml-auto md:ml-2">
            <button
              onClick={() => onViewModeChange('grid')}
              className={`p-1.5 rounded-md transition-colors ${
                viewMode === 'grid'
                  ? 'bg-white text-slate-900 shadow-2xs font-bold'
                  : 'text-slate-500 hover:text-slate-800'
              }`}
              title="Visualização em Grade de Cards"
            >
              <LayoutGrid className="w-4 h-4" />
            </button>
            <button
              onClick={() => onViewModeChange('calendar')}
              className={`p-1.5 rounded-md transition-colors ${
                viewMode === 'calendar'
                  ? 'bg-white text-slate-900 shadow-2xs font-bold'
                  : 'text-slate-500 hover:text-slate-800'
              }`}
              title="Visualização em Calendário Mensal"
            >
              <CalendarIcon className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
