import React, { useState, useEffect } from 'react';
import { 
  EmpresaNome, 
  CronogramaEmpresa, 
  PecaConteudo, 
  StatusProducao, 
  ParametrosProducao 
} from './types';
import { INITIAL_SCHEDULES } from './data/initialSchedules';
import { Navbar } from './components/Navbar';
import { CompanySelector } from './components/CompanySelector';
import { ScheduleMetricsBar } from './components/ScheduleMetricsBar';
import { ScheduleGrid } from './components/ScheduleGrid';
import { ScheduleCalendar } from './components/ScheduleCalendar';
import { PieceDetailModal } from './components/PieceDetailModal';
import { ProductionPanelModal } from './components/ProductionPanelModal';
import { GuardrailDrawer } from './components/GuardrailDrawer';
import { SchemaViewerModal } from './components/SchemaViewerModal';
import { TeleprompterModal } from './components/TeleprompterModal';
import { gerarCronogramaCompleto } from './utils/scheduleGenerator';
import { baixarArquivoMarkdown, baixarArquivoCsv } from './utils/exportUtils';
import { Sparkles, Sliders } from 'lucide-react';

const STORAGE_KEY = 'roteirista_institucional_schedules_v2';

export default function App() {
  const [schedules, setSchedules] = useState<Record<EmpresaNome, CronogramaEmpresa>>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        return JSON.parse(saved);
      }
    } catch (e) {
      console.error('Erro ao ler schedules do localStorage:', e);
    }
    return INITIAL_SCHEDULES;
  });

  const [empresaAtiva, setEmpresaAtiva] = useState<EmpresaNome>('CLRC');
  const [selectedPeca, setSelectedPeca] = useState<PecaConteudo | null>(null);
  const [teleprompterPeca, setTeleprompterPeca] = useState<PecaConteudo | null>(null);

  const [isParametrosOpen, setIsParametrosOpen] = useState<boolean>(false);
  const [isSchemaOpen, setIsSchemaOpen] = useState<boolean>(false);
  const [isGuardrailsOpen, setIsGuardrailsOpen] = useState<boolean>(false);
  const [isGenerating, setIsGenerating] = useState<boolean>(false);

  // Filtros
  const [busca, setBusca] = useState<string>('');
  const [formatoFiltro, setFormatoFiltro] = useState<string>('Todos');
  const [tipoFiltro, setTipoFiltro] = useState<string>('Todos');
  const [statusFiltro, setStatusFiltro] = useState<string>('Todos');
  const [viewMode, setViewMode] = useState<'grid' | 'calendar'>('grid');

  // Salva no localStorage sempre que houver alteração
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(schedules));
    } catch (e) {
      console.warn('Erro ao salvar no localStorage:', e);
    }
  }, [schedules]);

  const cronogramaAtivo = schedules[empresaAtiva] || INITIAL_SCHEDULES[empresaAtiva];

  // Atualiza status de uma peça específica
  const handleUpdateStatus = (id: string, novoStatus: StatusProducao) => {
    setSchedules(prev => {
      const current = prev[empresaAtiva];
      if (!current) return prev;

      const updatedCronograma = current.cronograma.map(p => 
        p.id === id ? { ...p, status: novoStatus } : p
      );

      const novo = {
        ...prev,
        [empresaAtiva]: {
          ...current,
          cronograma: updatedCronograma,
        },
      };

      // Atualiza também se a peça selecionada for esta
      if (selectedPeca && selectedPeca.id === id) {
        setSelectedPeca({ ...selectedPeca, status: novoStatus });
      }

      return novo;
    });
  };

  // Gerador de Cronograma
  const handleGerarCronograma = async (params: ParametrosProducao) => {
    setIsGenerating(true);
    try {
      const novoCronograma = await gerarCronogramaCompleto(params);
      setSchedules(prev => ({
        ...prev,
        [params.empresa]: novoCronograma,
      }));
      setEmpresaAtiva(params.empresa);
    } catch (err) {
      console.error('Falha ao gerar cronograma:', err);
      alert('Ocorreu um erro ao gerar o cronograma. Tente novamente.');
    } finally {
      setIsGenerating(false);
    }
  };

  // Filtragem das peças ativas
  const pecasFiltradas = cronogramaAtivo.cronograma.filter(p => {
    if (busca.trim()) {
      const term = busca.toLowerCase();
      const match = (
        p.titulo.toLowerCase().includes(term) ||
        p.categoria.toLowerCase().includes(term) ||
        p.linha_editorial.toLowerCase().includes(term) ||
        p.legenda.toLowerCase().includes(term) ||
        p.id.toLowerCase().includes(term)
      );
      if (!match) return false;
    }

    if (formatoFiltro !== 'Todos' && p.formato !== formatoFiltro) return false;
    if (tipoFiltro !== 'Todos' && p.tipo_conteudo !== tipoFiltro) return false;
    if (statusFiltro !== 'Todos' && (p.status || 'Planejado') !== statusFiltro) return false;

    return true;
  });

  return (
    <div className="min-h-screen bg-slate-100/70 text-slate-900 flex flex-col antialiased">
      {/* Barra de Navegação Superior */}
      <Navbar
        empresaAtiva={empresaAtiva}
        mesReferencia={cronogramaAtivo.mes_referencia}
        totalPecas={cronogramaAtivo.total_conteudos}
        onOpenParametros={() => setIsParametrosOpen(true)}
        onOpenSchema={() => setIsSchemaOpen(true)}
        onOpenGuardrails={() => setIsGuardrailsOpen(true)}
        onBaixarMarkdown={() => baixarArquivoMarkdown(cronogramaAtivo)}
        onBaixarCsv={() => baixarArquivoCsv(cronogramaAtivo)}
      />

      {/* Seletor de Empresas */}
      <CompanySelector
        empresaAtiva={empresaAtiva}
        onSelectEmpresa={emp => setEmpresaAtiva(emp)}
      />

      {/* Área Principal de Conteúdo */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6">
        {/* Barra de Métricas, Mix e Filtros */}
        <ScheduleMetricsBar
          cronograma={cronogramaAtivo}
          busca={busca}
          onBuscaChange={setBusca}
          formatoFiltro={formatoFiltro}
          onFormatoFiltroChange={setFormatoFiltro}
          tipoFiltro={tipoFiltro}
          onTipoFiltroChange={setTipoFiltro}
          statusFiltro={statusFiltro}
          onStatusFiltroChange={setStatusFiltro}
          viewMode={viewMode}
          onViewModeChange={setViewMode}
        />

        {/* Visualização: Grade vs Calendário */}
        {viewMode === 'grid' ? (
          <ScheduleGrid
            pecas={pecasFiltradas}
            onSelectPeca={p => setSelectedPeca(p)}
            onUpdateStatus={handleUpdateStatus}
          />
        ) : (
          <ScheduleCalendar
            pecas={pecasFiltradas}
            mesReferencia={cronogramaAtivo.mes_referencia}
            onSelectPeca={p => setSelectedPeca(p)}
          />
        )}
      </main>

      {/* Rodapé Institucional */}
      <footer className="bg-white border-t border-slate-200 py-6 mt-12 text-xs text-slate-500">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <span className="font-bold text-slate-800">Roteirista Institucional</span>
            <span>•</span>
            <span>CLRC | Mais Armazém | Armazena Mais | Belmir Menegatti</span>
          </div>
          <div>
            Em estrita conformidade com os guardrails institucionais e JSON Schema.
          </div>
        </div>
      </footer>

      {/* Modal de Briefing Completo da Peça */}
      <PieceDetailModal
        peca={selectedPeca}
        onClose={() => setSelectedPeca(null)}
        onUpdateStatus={handleUpdateStatus}
        onOpenTeleprompter={p => {
          setSelectedPeca(null);
          setTeleprompterPeca(p);
        }}
      />

      {/* Modal de Configuração e Parâmetros de Produção */}
      <ProductionPanelModal
        isOpen={isParametrosOpen}
        onClose={() => setIsParametrosOpen(false)}
        empresaAtiva={empresaAtiva}
        onGerar={handleGerarCronograma}
        isGenerating={isGenerating}
      />

      {/* Drawer de Guardrails da Marca */}
      <GuardrailDrawer
        isOpen={isGuardrailsOpen}
        onClose={() => setIsGuardrailsOpen(false)}
        empresa={empresaAtiva}
      />

      {/* Modal de Inspeção do JSON Schema */}
      <SchemaViewerModal
        isOpen={isSchemaOpen}
        onClose={() => setIsSchemaOpen(false)}
        cronograma={cronogramaAtivo}
      />

      {/* Modal de Teleprompter para Gravação de Reels */}
      <TeleprompterModal
        peca={teleprompterPeca}
        onClose={() => setTeleprompterPeca(null)}
      />
    </div>
  );
}
