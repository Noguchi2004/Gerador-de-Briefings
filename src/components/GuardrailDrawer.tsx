import React from 'react';
import { EmpresaNome } from '../types';
import { GUARDRAILS } from '../data/guardrails';
import { 
  X, 
  ShieldCheck, 
  AlertOctagon, 
  Layers, 
  FileText, 
  PieChart, 
  Sparkles,
  CheckCircle,
  Hash
} from 'lucide-react';

interface GuardrailDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  empresa: EmpresaNome;
}

export const GuardrailDrawer: React.FC<GuardrailDrawerProps> = ({
  isOpen,
  onClose,
  empresa,
}) => {
  if (!isOpen) return null;

  const g = GUARDRAILS[empresa];

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-xs flex justify-end animate-in fade-in duration-200">
      <div className="w-full max-w-2xl bg-white min-h-screen shadow-2xl flex flex-col">
        {/* Topo */}
        <div className="p-6 bg-slate-900 text-white flex items-center justify-between border-b border-slate-800">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-slate-800 flex items-center justify-center text-sky-400">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div>
              <h2 className="text-lg font-bold">Guardrails da Marca: {empresa}</h2>
              <p className="text-xs text-slate-300">Diretrizes de Roteirização e Linha Editorial</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white flex items-center justify-center transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Conteúdo */}
        <div className="p-6 space-y-6 flex-1 overflow-y-auto">
          {/* Posicionamento */}
          <div className="p-4 rounded-xl bg-sky-50 border border-sky-200">
            <div className="flex items-center gap-2 text-sky-900 font-bold text-xs uppercase tracking-wider mb-1">
              <Sparkles className="w-4 h-4 text-sky-600" />
              Posicionamento Institucional
            </div>
            <p className="text-sm font-semibold text-sky-950">
              {g.posicionamento}
            </p>
          </div>

          {/* Tom de Voz */}
          <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
            <div className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-1">
              Tom de Voz Mandatório
            </div>
            <p className="text-sm text-slate-800 leading-relaxed font-medium">
              {g.tom}
            </p>
          </div>

          {/* Proibições Absolutas */}
          <div className="p-4 rounded-xl bg-red-50 border border-red-200">
            <div className="flex items-center gap-2 text-red-900 font-bold text-xs uppercase tracking-wider mb-2">
              <AlertOctagon className="w-4 h-4 text-red-600" />
              O que Evitar e Proibições Rígidas
            </div>
            <ul className="space-y-1.5 text-xs text-red-900">
              {g.proibicoes.map((p, idx) => (
                <li key={idx} className="flex items-start gap-2">
                  <span className="text-red-500 font-bold">•</span>
                  <span>{p}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Estrutura de Copy */}
          <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
            <div className="flex items-center gap-2 text-slate-900 font-bold text-xs uppercase tracking-wider mb-3">
              <FileText className="w-4 h-4 text-indigo-600" />
              Estrutura de Copy da Legenda ({g.estrutura_copy.nome})
            </div>
            <div className="space-y-2">
              {g.estrutura_copy.etapas.map((etapa, idx) => (
                <div key={idx} className="flex items-center gap-2.5 text-xs bg-white p-2.5 rounded-lg border border-slate-200 shadow-xs">
                  <span className="w-5 h-5 rounded-full bg-slate-900 text-white flex items-center justify-center font-bold text-[10px] shrink-0">
                    {idx + 1}
                  </span>
                  <span className="font-semibold text-slate-800">{etapa}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Mix Recomendado */}
          <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
            <div className="flex items-center gap-2 text-slate-900 font-bold text-xs uppercase tracking-wider mb-3">
              <PieChart className="w-4 h-4 text-emerald-600" />
              Mix Recomendado de Formatos & Conteúdo
            </div>
            <div className="grid grid-cols-2 gap-4 text-xs">
              <div className="space-y-2 bg-white p-3 rounded-lg border border-slate-200">
                <span className="font-bold text-slate-700 block text-[11px] uppercase">Mix de Conteúdo:</span>
                <div className="flex justify-between text-slate-600">
                  <span>Educativo:</span>
                  <strong className="text-slate-900">~{g.mix_recomendado.educativo}%</strong>
                </div>
                <div className="flex justify-between text-slate-600">
                  <span>Institucional:</span>
                  <strong className="text-slate-900">~{g.mix_recomendado.institucional}%</strong>
                </div>
                <div className="flex justify-between text-slate-600">
                  <span>Comercial:</span>
                  <strong className="text-slate-900">~{g.mix_recomendado.comercial}%</strong>
                </div>
              </div>

              <div className="space-y-2 bg-white p-3 rounded-lg border border-slate-200">
                <span className="font-bold text-slate-700 block text-[11px] uppercase">Formatos:</span>
                <div className="flex justify-between text-slate-600">
                  <span>Reels (30s-40s):</span>
                  <strong className="text-slate-900">~{g.mix_recomendado.reels}%</strong>
                </div>
                <div className="flex justify-between text-slate-600">
                  <span>Estáticos:</span>
                  <strong className="text-slate-900">~{g.mix_recomendado.estaticos}%</strong>
                </div>
                <div className="flex justify-between text-slate-600">
                  <span>Carrosséis:</span>
                  <strong className="text-slate-900">~{g.mix_recomendado.carrosseis}%</strong>
                </div>
              </div>
            </div>
          </div>

          {/* Pilares Oficiais */}
          <div>
            <div className="flex items-center gap-2 text-slate-900 font-bold text-xs uppercase tracking-wider mb-2">
              <Layers className="w-4 h-4 text-slate-600" />
              Pilares Oficiais ({g.pilares.length})
            </div>
            <div className="flex flex-wrap gap-1.5">
              {g.pilares.map((pilar, idx) => (
                <span
                  key={idx}
                  className="px-2.5 py-1 rounded-md text-xs font-medium bg-slate-100 text-slate-800 border border-slate-200"
                >
                  {pilar}
                </span>
              ))}
            </div>
          </div>

          {/* Linhas Editoriais */}
          <div>
            <div className="flex items-center gap-2 text-slate-900 font-bold text-xs uppercase tracking-wider mb-2">
              <Hash className="w-4 h-4 text-slate-600" />
              Linhas Editoriais / Quadros ({g.linhas_editoriais.length})
            </div>
            <div className="flex flex-wrap gap-1.5">
              {g.linhas_editoriais.map((linha, idx) => (
                <span
                  key={idx}
                  className="px-2.5 py-1 rounded-md text-xs font-medium bg-sky-50 text-sky-900 border border-sky-200"
                >
                  {linha}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Rodapé */}
        <div className="p-4 bg-slate-100 border-t border-slate-200 flex justify-end">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-slate-900 hover:bg-slate-800 text-white text-xs font-semibold rounded-lg transition-colors"
          >
            Entendido, Fechar
          </button>
        </div>
      </div>
    </div>
  );
};
