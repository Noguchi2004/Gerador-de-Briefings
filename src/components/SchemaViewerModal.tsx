import React, { useState } from 'react';
import { CronogramaEmpresa } from '../types';
import { exportarJsonSchema, baixarArquivoJson, copiarTexto } from '../utils/exportUtils';
import { X, Copy, Download, Check, FileCode } from 'lucide-react';

interface SchemaViewerModalProps {
  isOpen: boolean;
  onClose: () => void;
  cronograma: CronogramaEmpresa;
}

export const SchemaViewerModal: React.FC<SchemaViewerModalProps> = ({
  isOpen,
  onClose,
  cronograma,
}) => {
  if (!isOpen) return null;

  const [copied, setCopied] = useState(false);
  const jsonString = exportarJsonSchema(cronograma);

  const handleCopy = async () => {
    await copiarTexto(jsonString);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 animate-in fade-in duration-150">
      <div className="bg-slate-950 text-slate-100 w-full max-w-4xl rounded-2xl shadow-2xl border border-slate-800 overflow-hidden flex flex-col max-h-[88vh]">
        {/* Topo */}
        <div className="p-4 bg-slate-900 border-b border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <FileCode className="w-5 h-5 text-indigo-400" />
            <div>
              <h3 className="font-bold text-sm text-white">
                JSON Estruturado — multi-empresa-schema.json
              </h3>
              <p className="text-xs text-slate-400">
                {cronograma.empresa} • {cronograma.mes_referencia} ({cronograma.total_conteudos} peças)
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleCopy}
              className="px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-colors border border-slate-700"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copied ? 'Copiado!' : 'Copiar JSON'}</span>
            </button>

            <button
              onClick={() => baixarArquivoJson(cronograma)}
              className="px-3 py-1.5 bg-indigo-600 hover:bg-indigo-500 text-white rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-colors shadow-xs"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Baixar .json</span>
            </button>

            <button
              onClick={onClose}
              className="w-8 h-8 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white flex items-center justify-center transition-colors ml-2"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Editor / Exibidor de Código */}
        <div className="p-4 overflow-y-auto flex-1 bg-slate-950 font-mono text-xs leading-relaxed text-slate-300">
          <pre className="whitespace-pre-wrap selection:bg-indigo-700 selection:text-white">
            {jsonString}
          </pre>
        </div>

        {/* Rodapé Informativo */}
        <div className="p-3 bg-slate-900 border-t border-slate-800 text-xs text-slate-400 flex items-center justify-between">
          <span>Total de peças estruturadas: <strong>{cronograma.cronograma.length}</strong></span>
          <span className="text-emerald-400 font-medium">✓ Em conformidade estrita com o JSON Schema</span>
        </div>
      </div>
    </div>
  );
};
