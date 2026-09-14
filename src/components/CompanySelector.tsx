import React from 'react';
import { EmpresaNome } from '../types';
import { GUARDRAILS } from '../data/guardrails';
import { 
  Building2, 
  Warehouse, 
  Box, 
  UserCheck, 
  CheckCircle2,
  AlertTriangle
} from 'lucide-react';

interface CompanySelectorProps {
  empresaAtiva: EmpresaNome;
  onSelectEmpresa: (empresa: EmpresaNome) => void;
}

export const CompanySelector: React.FC<CompanySelectorProps> = ({
  empresaAtiva,
  onSelectEmpresa,
}) => {
  const empresas: { id: EmpresaNome; label: string; icon: React.ReactNode; tag: string }[] = [
    {
      id: 'CLRC',
      label: 'CLRC',
      icon: <Building2 className="w-5 h-5" />,
      tag: 'Infraestrutura AAA',
    },
    {
      id: 'Mais Armazém',
      label: 'Mais Armazém',
      icon: <Warehouse className="w-5 h-5" />,
      tag: 'Operador Logístico',
    },
    {
      id: 'Armazena Mais',
      label: 'Armazena Mais',
      icon: <Box className="w-5 h-5" />,
      tag: 'Self Storage',
    },
    {
      id: 'Belmir Menegatti',
      label: 'Belmir Menegatti',
      icon: <UserCheck className="w-5 h-5" />,
      tag: 'Marca Pessoal',
    },
  ];

  const infoAtiva = GUARDRAILS[empresaAtiva];

  return (
    <div className="bg-white border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        {/* Tabs das Empresas */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {empresas.map((item) => {
            const isSelected = empresaAtiva === item.id;
            return (
              <button
                key={item.id}
                onClick={() => onSelectEmpresa(item.id)}
                className={`relative flex items-center gap-3 p-3 rounded-xl text-left transition-all border ${
                  isSelected
                    ? 'bg-slate-900 text-white border-slate-900 shadow-md ring-2 ring-slate-900 ring-offset-2'
                    : 'bg-white text-slate-700 hover:bg-slate-50 border-slate-200'
                }`}
              >
                <div
                  className={`w-10 h-10 rounded-lg flex items-center justify-center shrink-0 ${
                    isSelected ? 'bg-slate-800 text-sky-400' : 'bg-slate-100 text-slate-600'
                  }`}
                >
                  {item.icon}
                </div>
                <div className="min-w-0 flex-1">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-sm tracking-tight truncate">
                      {item.label}
                    </span>
                    {isSelected && (
                      <CheckCircle2 className="w-4 h-4 text-sky-400 shrink-0 ml-1" />
                    )}
                  </div>
                  <span
                    className={`inline-block text-xs font-medium truncate ${
                      isSelected ? 'text-slate-300' : 'text-slate-500'
                    }`}
                  >
                    {item.tag}
                  </span>
                </div>
              </button>
            );
          })}
        </div>

        {/* Faixa de Posicionamento e Guardrail Rápido */}
        <div className="mt-4 p-3.5 rounded-xl bg-slate-50 border border-slate-200 flex flex-col md:flex-row md:items-center justify-between gap-3 text-xs">
          <div className="flex items-start md:items-center gap-2.5">
            <span className="px-2 py-0.5 rounded font-bold uppercase tracking-wider bg-slate-200 text-slate-700 shrink-0">
              Posicionamento Ativo
            </span>
            <p className="text-slate-700 font-medium leading-relaxed">
              <strong className="text-slate-900 font-semibold">{empresaAtiva}:</strong> {infoAtiva.posicionamento}
            </p>
          </div>
          <div className="flex items-center gap-2 text-amber-800 bg-amber-50 px-2.5 py-1 rounded-md border border-amber-200 shrink-0">
            <AlertTriangle className="w-3.5 h-3.5 shrink-0 text-amber-600" />
            <span className="font-medium">
              Tom: {infoAtiva.tom.split('.')[0]}.
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
