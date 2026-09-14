import React from 'react';
import { 
  FileCode, 
  Sparkles, 
  Download, 
  FileText, 
  Table, 
  ShieldCheck,
  Building2,
  Sliders,
  FileDown,
  Loader2
} from 'lucide-react';
import { EmpresaNome } from '../types';
import { GUARDRAILS } from '../data/guardrails';

interface NavbarProps {
  empresaAtiva: EmpresaNome;
  mesReferencia: string;
  totalPecas: number;
  onOpenParametros: () => void;
  onOpenSchema: () => void;
  onOpenGuardrails: () => void;
  onBaixarMarkdown: () => void;
  onBaixarCsv: () => void;
  onBaixarDocx: () => void;
  isDownloadingDocx?: boolean;
}

export const Navbar: React.FC<NavbarProps> = ({
  empresaAtiva,
  mesReferencia,
  totalPecas,
  onOpenParametros,
  onOpenSchema,
  onOpenGuardrails,
  onBaixarMarkdown,
  onBaixarCsv,
  onBaixarDocx,
  isDownloadingDocx = false,
}) => {
  const guardrail = GUARDRAILS[empresaAtiva];

  return (
    <header className="bg-white border-b border-slate-200 sticky top-0 z-30 shadow-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo / Marca */}
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-slate-900 text-white flex items-center justify-center font-bold text-lg shadow-sm">
              <Building2 className="w-5 h-5 text-sky-400" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-base sm:text-lg font-bold text-slate-900 tracking-tight">
                  Roteirista Institucional
                </h1>
                <span className="hidden sm:inline-flex items-center px-2 py-0.5 rounded text-xs font-semibold bg-sky-100 text-sky-800">
                  v2.0 Schema
                </span>
              </div>
              <p className="text-xs text-slate-500 hidden md:block">
                Cronogramas & Briefings Operacionais com Guardrails Rígidos
              </p>
            </div>
          </div>

          {/* Status & Botões de Ação */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Botão Guardrails */}
            <button
              onClick={onOpenGuardrails}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs sm:text-sm font-medium text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors border border-slate-200"
              title="Ver diretrizes e guardrails da empresa ativa"
            >
              <ShieldCheck className="w-4 h-4 text-emerald-600" />
              <span className="hidden sm:inline">Guardrails da Marca</span>
            </button>

            {/* Menu Exportações */}
            <div className="flex items-center gap-1">
              <button
                onClick={onBaixarDocx}
                disabled={isDownloadingDocx}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs sm:text-sm font-semibold text-blue-700 bg-blue-50 hover:bg-blue-100 rounded-lg transition-colors border border-blue-200 shadow-2xs disabled:opacity-50"
                title="Fazer download do Briefing Completo destrinchado e formatado em Word (.docx)"
              >
                {isDownloadingDocx ? (
                  <Loader2 className="w-4 h-4 text-blue-600 animate-spin" />
                ) : (
                  <FileDown className="w-4 h-4 text-blue-600" />
                )}
                <span>DOCX</span>
              </button>
              <button
                onClick={onOpenSchema}
                className="inline-flex items-center gap-1.5 px-2.5 py-1.5 text-xs sm:text-sm font-medium text-slate-700 bg-white hover:bg-slate-50 rounded-lg transition-colors border border-slate-200"
                title="Visualizar e exportar JSON Schema"
              >
                <FileCode className="w-4 h-4 text-indigo-600" />
                <span className="hidden md:inline">JSON</span>
              </button>
              <button
                onClick={onBaixarMarkdown}
                className="inline-flex items-center gap-1.5 px-2.5 py-1.5 text-xs sm:text-sm font-medium text-slate-700 bg-white hover:bg-slate-50 rounded-lg transition-colors border border-slate-200"
                title="Exportar documento Markdown para Notion/ClickUp"
              >
                <FileText className="w-4 h-4 text-amber-600" />
                <span className="hidden md:inline">Markdown</span>
              </button>
              <button
                onClick={onBaixarCsv}
                className="inline-flex items-center gap-1.5 px-2.5 py-1.5 text-xs sm:text-sm font-medium text-slate-700 bg-white hover:bg-slate-50 rounded-lg transition-colors border border-slate-200"
                title="Exportar planilha CSV"
              >
                <Table className="w-4 h-4 text-emerald-600" />
                <span className="hidden md:inline">CSV</span>
              </button>
            </div>

            {/* Botão Gerar / Ajustar Parâmetros */}
            <button
              onClick={onOpenParametros}
              className="inline-flex items-center gap-2 px-3.5 py-2 text-xs sm:text-sm font-semibold text-white bg-slate-900 hover:bg-slate-800 active:bg-black rounded-lg shadow-sm transition-colors"
            >
              <Sliders className="w-4 h-4 text-sky-400" />
              <span>Configurar / Gerar</span>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};
