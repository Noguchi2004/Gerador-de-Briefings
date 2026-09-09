import React from 'react';
import { PecaConteudo } from '../types';
import { Film, Layers, Image as ImageIcon, Calendar as CalendarIcon } from 'lucide-react';

interface ScheduleCalendarProps {
  pecas: PecaConteudo[];
  mesReferencia: string;
  onSelectPeca: (peca: PecaConteudo) => void;
}

export const ScheduleCalendar: React.FC<ScheduleCalendarProps> = ({
  pecas,
  mesReferencia,
  onSelectPeca,
}) => {
  // Mapeia as peças por dia (1 a 31)
  const pecasPorDia: Record<number, PecaConteudo[]> = {};
  pecas.forEach(p => {
    const parts = p.data_publicacao.split('/');
    if (parts.length >= 1) {
      const dia = parseInt(parts[0], 10);
      if (!isNaN(dia)) {
        if (!pecasPorDia[dia]) pecasPorDia[dia] = [];
        pecasPorDia[dia].push(p);
      }
    }
  });

  const diasSemana = ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'];
  // Grid padrão de 31 dias para demonstração e navegação ágil
  const dias = Array.from({ length: 31 }, (_, i) => i + 1);

  return (
    <div className="bg-white rounded-2xl border border-slate-200 shadow-2xs overflow-hidden">
      {/* Topo do Calendário */}
      <div className="p-4 bg-slate-50 border-b border-slate-200 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <CalendarIcon className="w-5 h-5 text-slate-700" />
          <h3 className="font-bold text-slate-900 text-sm">
            Calendário Operacional de Postagens — {mesReferencia}
          </h3>
        </div>
        <span className="text-xs text-slate-500 font-medium">
          {pecas.length} publicações programadas
        </span>
      </div>

      {/* Cabeçalho dos dias da semana */}
      <div className="grid grid-cols-7 border-b border-slate-200 bg-slate-100 text-center text-xs font-bold text-slate-600 py-2">
        {diasSemana.map((d, i) => (
          <div key={i}>{d}</div>
        ))}
      </div>

      {/* Grid de Dias */}
      <div className="grid grid-cols-7 auto-rows-fr divide-x divide-y divide-slate-100 bg-slate-50 text-xs">
        {dias.map(dia => {
          const itensDoDia = pecasPorDia[dia] || [];
          const temItens = itensDoDia.length > 0;

          return (
            <div
              key={dia}
              className={`min-h-[110px] p-2 transition-colors ${
                temItens ? 'bg-white' : 'bg-slate-50/60'
              }`}
            >
              <div className="flex items-center justify-between mb-1.5">
                <span
                  className={`w-6 h-6 rounded-full flex items-center justify-center font-bold text-xs ${
                    temItens
                      ? 'bg-slate-900 text-white'
                      : 'text-slate-400'
                  }`}
                >
                  {dia}
                </span>
                {temItens && (
                  <span className="text-[10px] font-semibold text-sky-600">
                    {itensDoDia.length} post{itensDoDia.length > 1 ? 's' : ''}
                  </span>
                )}
              </div>

              {/* Lista de publicações no dia */}
              <div className="space-y-1.5">
                {itensDoDia.map(item => (
                  <div
                    key={item.id}
                    onClick={() => onSelectPeca(item)}
                    className="p-1.5 rounded-lg border border-slate-200 hover:border-slate-400 bg-white hover:shadow-xs transition-all cursor-pointer text-left group"
                  >
                    <div className="flex items-center gap-1 mb-1">
                      {item.formato === 'Reels' ? (
                        <Film className="w-3 h-3 text-purple-600 shrink-0" />
                      ) : item.formato === 'Carrossel' ? (
                        <Layers className="w-3 h-3 text-sky-600 shrink-0" />
                      ) : (
                        <ImageIcon className="w-3 h-3 text-amber-600 shrink-0" />
                      )}
                      <span className="text-[10px] font-bold text-slate-800 truncate group-hover:text-sky-700">
                        {item.titulo}
                      </span>
                    </div>
                    <span className="text-[9px] text-slate-400 block truncate">
                      {item.linha_editorial}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
