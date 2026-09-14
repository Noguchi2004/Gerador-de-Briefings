import React, { useState, useEffect } from 'react';
import { EmpresaNome, ParametrosProducao } from '../types';
import { GUARDRAILS } from '../data/guardrails';
import { 
  X, 
  Sparkles, 
  Layers, 
  Sliders, 
  Check, 
  RotateCcw,
  Film,
  Image as ImageIcon,
  Copy,
  Info
} from 'lucide-react';

interface ProductionPanelModalProps {
  isOpen: boolean;
  onClose: () => void;
  empresaAtiva: EmpresaNome;
  onGerar: (params: ParametrosProducao) => Promise<void>;
  isGenerating: boolean;
}

export const ProductionPanelModal: React.FC<ProductionPanelModalProps> = ({
  isOpen,
  onClose,
  empresaAtiva,
  onGerar,
  isGenerating,
}) => {
  const [empresa, setEmpresa] = useState<EmpresaNome>(empresaAtiva);
  const [mesReferencia, setMesReferencia] = useState<string>('Novembro 2026');
  const [totalConteudos, setTotalConteudos] = useState<number>(6);
  const [carrosseis, setCarrosseis] = useState<number>(2);
  const [estaticos, setEstaticos] = useState<number>(2);
  const [reels, setReels] = useState<number>(2);
  const [pilaresSelecionados, setPilaresSelecionados] = useState<string[]>([]);
  const [estagioLancamento, setEstagioLancamento] = useState<'Pré-abertura' | 'Abertura' | 'Operação madura'>('Operação madura');
  const [focoMes, setFocoMes] = useState<string>('');
  const [observacoes, setObservacoes] = useState<string>('');

  useEffect(() => {
    setEmpresa(empresaAtiva);
    const g = GUARDRAILS[empresaAtiva];
    // Seleciona os 3 primeiros pilares por padrão
    setPilaresSelecionados(g.pilares.slice(0, 3));
    aplicarMixRecomendado(empresaAtiva, totalConteudos);
  }, [empresaAtiva, isOpen]);

  const aplicarMixRecomendado = (emp: EmpresaNome, total: number) => {
    const g = GUARDRAILS[emp];
    const nReels = Math.max(1, Math.round((total * g.mix_recomendado.reels) / 100));
    const nCarrosseis = Math.max(1, Math.round((total * g.mix_recomendado.carrosseis) / 100));
    const nEstaticos = Math.max(1, total - (nReels + nCarrosseis));

    setReels(nReels);
    setCarrosseis(nCarrosseis);
    setEstaticos(nEstaticos);
  };

  const togglePilar = (pilar: string) => {
    if (pilaresSelecionados.includes(pilar)) {
      if (pilaresSelecionados.length <= 2) {
        alert('Selecione pelo menos 2 pilares para garantir a diversidade editorial.');
        return;
      }
      setPilaresSelecionados(pilaresSelecionados.filter(p => p !== pilar));
    } else {
      setPilaresSelecionados([...pilaresSelecionados, pilar]);
    }
  };

  const handleTotalChange = (novoTotal: number) => {
    setTotalConteudos(novoTotal);
    aplicarMixRecomendado(empresa, novoTotal);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (pilaresSelecionados.length < 2) {
      alert('Selecione pelo menos 2 pilares diferentes conforme as regras de produção.');
      return;
    }

    const params: ParametrosProducao = {
      empresa,
      mes_referencia: mesReferencia,
      total_conteudos: totalConteudos,
      distribuicao_formatos: {
        carrosseis: Number(carrosseis),
        estaticos: Number(estaticos),
        reels: Number(reels),
      },
      pilares_selecionados: pilaresSelecionados,
      estagio_lancamento: empresa === 'Armazena Mais' ? estagioLancamento : undefined,
      foco_mes: focoMes,
      observacoes,
    };

    await onGerar(params);
    onClose();
  };

  if (!isOpen) return null;

  const guardrailAtual = GUARDRAILS[empresa];
  const somaFormatos = Number(carrosseis) + Number(estaticos) + Number(reels);

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-white w-full max-w-2xl rounded-2xl shadow-2xl border border-slate-200 overflow-hidden animate-in fade-in zoom-in-95 duration-150">
        {/* Cabeçalho */}
        <div className="p-6 bg-slate-900 text-white flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-slate-800 flex items-center justify-center text-sky-400">
              <Sliders className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-lg font-bold">Parâmetros de Produção Editorial</h2>
              <p className="text-xs text-slate-300">Configuração de Cronograma e Briefings Operacionais</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white flex items-center justify-center transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Formulário */}
        <form onSubmit={handleSubmit} className="p-6 space-y-5 max-h-[75vh] overflow-y-auto text-xs sm:text-sm">
          {/* Empresa */}
          <div>
            <label className="block font-bold text-slate-700 mb-1.5">
              Empresa / Marca
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              {(['CLRC', 'Mais Armazém', 'Armazena Mais', 'Belmir Menegatti'] as EmpresaNome[]).map(emp => (
                <button
                  type="button"
                  key={emp}
                  onClick={() => {
                    setEmpresa(emp);
                    setPilaresSelecionados(GUARDRAILS[emp].pilares.slice(0, 3));
                    aplicarMixRecomendado(emp, totalConteudos);
                  }}
                  className={`p-2.5 rounded-xl border text-center font-bold text-xs transition-all ${
                    empresa === emp
                      ? 'bg-slate-900 text-white border-slate-900 shadow-xs'
                      : 'bg-slate-50 text-slate-700 hover:bg-slate-100 border-slate-200'
                  }`}
                >
                  {emp}
                </button>
              ))}
            </div>
          </div>

          {/* Mês e Total */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block font-bold text-slate-700 mb-1">
                Mês de Referência
              </label>
              <input
                type="text"
                value={mesReferencia}
                onChange={e => setMesReferencia(e.target.value)}
                placeholder="Ex: Novembro 2026"
                className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-slate-900 focus:border-slate-900 outline-hidden font-medium"
                required
              />
            </div>

            <div>
              <label className="block font-bold text-slate-700 mb-1">
                Quantidade Total de Peças
              </label>
              <div className="flex items-center gap-2">
                <input
                  type="number"
                  min="2"
                  max="20"
                  value={totalConteudos}
                  onChange={e => handleTotalChange(Math.max(2, parseInt(e.target.value) || 2))}
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-slate-900 focus:border-slate-900 outline-hidden font-medium"
                  required
                />
                <button
                  type="button"
                  onClick={() => aplicarMixRecomendado(empresa, totalConteudos)}
                  className="px-3 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg font-medium text-xs whitespace-nowrap flex items-center gap-1.5 border border-slate-300"
                  title="Ajustar automaticamente os formatos conforme as diretrizes da empresa"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  Auto Mix
                </button>
              </div>
            </div>
          </div>

          {/* Distribuição de Formatos */}
          <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-3">
            <div className="flex items-center justify-between">
              <span className="font-bold text-slate-800 flex items-center gap-1.5">
                <Film className="w-4 h-4 text-sky-600" />
                Distribuição de Formatos
              </span>
              <span className={`text-xs font-semibold px-2 py-0.5 rounded ${
                somaFormatos === totalConteudos 
                  ? 'bg-emerald-100 text-emerald-800' 
                  : 'bg-amber-100 text-amber-800'
              }`}>
                Soma: {somaFormatos} / {totalConteudos} peças
              </span>
            </div>

            <div className="grid grid-cols-3 gap-3">
              <div>
                <label className="block text-xs font-semibold text-slate-600 mb-1">
                  Carrosséis
                </label>
                <input
                  type="number"
                  min="0"
                  max="20"
                  value={carrosseis}
                  onChange={e => setCarrosseis(parseInt(e.target.value) || 0)}
                  className="w-full px-3 py-1.5 border border-slate-300 rounded-lg text-center font-bold"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-600 mb-1">
                  Estáticos
                </label>
                <input
                  type="number"
                  min="0"
                  max="20"
                  value={estaticos}
                  onChange={e => setEstaticos(parseInt(e.target.value) || 0)}
                  className="w-full px-3 py-1.5 border border-slate-300 rounded-lg text-center font-bold"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-600 mb-1">
                  Reels (30-40s)
                </label>
                <input
                  type="number"
                  min="0"
                  max="20"
                  value={reels}
                  onChange={e => setReels(parseInt(e.target.value) || 0)}
                  className="w-full px-3 py-1.5 border border-slate-300 rounded-lg text-center font-bold"
                />
              </div>
            </div>
            {empresa === 'Belmir Menegatti' && (
              <p className="text-[11px] text-slate-500 italic">
                * Guardrail Belmir Menegatti: ~2/3 das peças devem ser em Reels com roteiro de fala direta e B-roll real.
              </p>
            )}
          </div>

          {/* Seleção de Pilares da Empresa (Mínimo 2) */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="font-bold text-slate-700 flex items-center gap-1.5">
                <Layers className="w-4 h-4 text-indigo-600" />
                Pilares Estratégicos (Selecione ao menos 2)
              </label>
              <span className="text-xs text-slate-500 font-medium">
                {pilaresSelecionados.length} selecionados
              </span>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {guardrailAtual.pilares.map(pilar => {
                const isChecked = pilaresSelecionados.includes(pilar);
                return (
                  <button
                    type="button"
                    key={pilar}
                    onClick={() => togglePilar(pilar)}
                    className={`p-2.5 rounded-lg border text-left flex items-start gap-2 text-xs font-medium transition-colors ${
                      isChecked
                        ? 'bg-sky-50 border-sky-300 text-sky-950 font-semibold'
                        : 'bg-white border-slate-200 text-slate-600 hover:bg-slate-50'
                    }`}
                  >
                    <div className={`w-4 h-4 rounded mt-0.5 flex items-center justify-center shrink-0 border ${
                      isChecked ? 'bg-sky-600 border-sky-600 text-white' : 'border-slate-300'
                    }`}>
                      {isChecked && <Check className="w-3 h-3 stroke-3" />}
                    </div>
                    <span className="leading-tight">{pilar}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Estágio de Lançamento (apenas Armazena Mais) */}
          {empresa === 'Armazena Mais' && (
            <div className="p-3 rounded-xl bg-teal-50 border border-teal-200">
              <label className="block font-bold text-teal-950 mb-1.5">
                Estágio de Lançamento da Operação
              </label>
              <div className="grid grid-cols-3 gap-2">
                {(['Pré-abertura', 'Abertura', 'Operação madura'] as const).map(est => (
                  <button
                    type="button"
                    key={est}
                    onClick={() => setEstagioLancamento(est)}
                    className={`p-2 rounded-lg text-xs font-bold border transition-colors ${
                      estagioLancamento === est
                        ? 'bg-teal-700 text-white border-teal-700'
                        : 'bg-white text-teal-900 border-teal-200 hover:bg-teal-100/50'
                    }`}
                  >
                    {est}
                  </button>
                ))}
              </div>
              <p className="text-[11px] text-teal-800 mt-2">
                {estagioLancamento === 'Pré-abertura' && 'Foco em expectativa, diário da obra e educação sobre a categoria.'}
                {estagioLancamento === 'Abertura' && 'Foco em tour pela unidade, contratação simples e simulação de tamanhos.'}
                {estagioLancamento === 'Operação madura' && 'Foco em casos de uso práticos, organização, e-commerce e comparativos.'}
              </p>
            </div>
          )}

          {/* Foco do Mês (Opcional) */}
          <div>
            <label className="block font-bold text-slate-700 mb-1">
              Foco Temático / Campanha do Mês (Opcional)
            </label>
            <input
              type="text"
              value={focoMes}
              onChange={e => setFocoMes(e.target.value)}
              placeholder="Ex: Desmitificação de custos de piso; Preparação para Black Friday; Expansão rodoviária..."
              className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-slate-900 focus:border-slate-900 outline-hidden font-medium"
            />
          </div>

          {/* Botões de Ação */}
          <div className="pt-3 border-t border-slate-200 flex items-center justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-slate-600 hover:text-slate-900 font-semibold transition-colors"
            >
              Cancelar
            </button>
            <button
              type="submit"
              disabled={isGenerating}
              className="px-5 py-2.5 bg-slate-900 hover:bg-slate-800 active:bg-black text-white font-bold rounded-xl shadow-md transition-all flex items-center gap-2 disabled:opacity-50"
            >
              <Sparkles className="w-4 h-4 text-sky-400" />
              {isGenerating ? 'Gerando Cronograma Oficial...' : 'Gerar Cronograma Oficial'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
