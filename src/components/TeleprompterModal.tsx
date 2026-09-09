import React, { useState, useEffect, useRef } from 'react';
import { PecaConteudo } from '../types';
import { 
  X, 
  Play, 
  Pause, 
  RotateCcw, 
  Type, 
  Gauge, 
  FlipHorizontal,
  Clock,
  Clapperboard
} from 'lucide-react';

interface TeleprompterModalProps {
  peca: PecaConteudo | null;
  onClose: () => void;
}

export const TeleprompterModal: React.FC<TeleprompterModalProps> = ({
  peca,
  onClose,
}) => {
  if (!peca || !peca.conteudo_reels) return null;

  const reels = peca.conteudo_reels;
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [speed, setSpeed] = useState<number>(2); // 1 a 5
  const [fontSize, setFontSize] = useState<number>(28); // px
  const [isMirrored, setIsMirrored] = useState<boolean>(false);
  const [elapsedSeconds, setElapsedSeconds] = useState<number>(0);

  const scrollRef = useRef<HTMLDivElement>(null);

  // Auto-scroll loop
  useEffect(() => {
    let animationFrameId: number;

    const scrollLoop = () => {
      if (isPlaying && scrollRef.current) {
        scrollRef.current.scrollTop += speed * 0.8;
      }
      if (isPlaying) {
        animationFrameId = requestAnimationFrame(scrollLoop);
      }
    };

    if (isPlaying) {
      animationFrameId = requestAnimationFrame(scrollLoop);
    }

    return () => {
      if (animationFrameId) cancelAnimationFrame(animationFrameId);
    };
  }, [isPlaying, speed]);

  // Cronômetro
  useEffect(() => {
    let timer: any;
    if (isPlaying) {
      timer = setInterval(() => {
        setElapsedSeconds(prev => prev + 1);
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [isPlaying]);

  const handleReset = () => {
    setIsPlaying(false);
    setElapsedSeconds(0);
    if (scrollRef.current) {
      scrollRef.current.scrollTop = 0;
    }
  };

  const formatTime = (secs: number) => {
    const m = Math.floor(secs / 60);
    const s = secs % 60;
    return `${m < 10 ? '0' + m : m}:${s < 10 ? '0' + s : s}`;
  };

  return (
    <div className="fixed inset-0 z-50 bg-black text-white flex flex-col animate-in fade-in duration-200 select-none">
      {/* Barra Superior de Controle */}
      <div className="p-4 bg-slate-950 border-b border-slate-800 flex items-center justify-between shrink-0">
        <div className="flex items-center gap-3">
          <Clapperboard className="w-5 h-5 text-purple-400" />
          <div>
            <h3 className="font-bold text-sm sm:text-base line-clamp-1">{peca.titulo}</h3>
            <span className="text-xs text-slate-400">
              Alvo: {reels.duracao_alvo} • {peca.empresa}
            </span>
          </div>
        </div>

        {/* Controles Centrais */}
        <div className="flex items-center gap-3">
          {/* Cronômetro */}
          <div className="flex items-center gap-1.5 px-3 py-1 bg-slate-900 rounded-lg border border-slate-800 font-mono text-sm font-bold text-sky-400">
            <Clock className="w-4 h-4" />
            <span>{formatTime(elapsedSeconds)}</span>
          </div>

          {/* Play / Pause */}
          <button
            onClick={() => setIsPlaying(!isPlaying)}
            className={`px-4 py-2 rounded-xl font-bold text-xs sm:text-sm flex items-center gap-2 shadow-lg transition-transform active:scale-95 ${
              isPlaying
                ? 'bg-amber-500 hover:bg-amber-600 text-slate-950'
                : 'bg-emerald-500 hover:bg-emerald-600 text-slate-950'
            }`}
          >
            {isPlaying ? <Pause className="w-4 h-4 fill-current" /> : <Play className="w-4 h-4 fill-current" />}
            <span>{isPlaying ? 'Pausar' : 'Gravar / Rolar'}</span>
          </button>

          {/* Reset */}
          <button
            onClick={handleReset}
            className="p-2 bg-slate-900 hover:bg-slate-800 text-slate-300 rounded-lg transition-colors border border-slate-800"
            title="Reiniciar posição e cronômetro"
          >
            <RotateCcw className="w-4 h-4" />
          </button>
        </div>

        {/* Controles de Configuração e Fechar */}
        <div className="flex items-center gap-2">
          {/* Velocidade */}
          <div className="hidden sm:flex items-center gap-1.5 px-2 py-1 bg-slate-900 rounded-lg border border-slate-800 text-xs">
            <Gauge className="w-3.5 h-3.5 text-slate-400" />
            <span className="text-slate-400 font-medium">Vel:</span>
            <select
              value={speed}
              onChange={e => setSpeed(Number(e.target.value))}
              className="bg-transparent text-white font-bold outline-hidden"
            >
              <option value="1" className="bg-slate-900">1x</option>
              <option value="2" className="bg-slate-900">2x</option>
              <option value="3" className="bg-slate-900">3x</option>
              <option value="4" className="bg-slate-900">4x</option>
            </select>
          </div>

          {/* Tamanho da Fonte */}
          <div className="hidden sm:flex items-center gap-1 px-2 py-1 bg-slate-900 rounded-lg border border-slate-800 text-xs">
            <Type className="w-3.5 h-3.5 text-slate-400" />
            <button
              onClick={() => setFontSize(prev => Math.max(18, prev - 4))}
              className="px-1 text-slate-300 hover:text-white font-bold"
            >
              A-
            </button>
            <span className="font-bold text-slate-200">{fontSize}</span>
            <button
              onClick={() => setFontSize(prev => Math.min(48, prev + 4))}
              className="px-1 text-slate-300 hover:text-white font-bold"
            >
              A+
            </button>
          </div>

          {/* Espelhar */}
          <button
            onClick={() => setIsMirrored(!isMirrored)}
            className={`p-2 rounded-lg border transition-colors ${
              isMirrored
                ? 'bg-sky-600 border-sky-500 text-white'
                : 'bg-slate-900 border-slate-800 text-slate-400 hover:text-white'
            }`}
            title="Espelhar texto horizontalmente (para vidro teleprompter)"
          >
            <FlipHorizontal className="w-4 h-4" />
          </button>

          {/* Fechar */}
          <button
            onClick={onClose}
            className="p-2 bg-slate-900 hover:bg-slate-800 text-slate-300 hover:text-white rounded-lg transition-colors border border-slate-800 ml-2"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Linha Guia de Olhar (Eye-level cue) */}
      <div className="w-full h-0.5 bg-sky-500/40 relative z-10">
        <div className="absolute left-4 -top-2.5 px-2 py-0.5 rounded bg-sky-500 text-[10px] font-bold text-slate-950 uppercase tracking-widest">
          Linha de Olhar
        </div>
      </div>

      {/* Área de Texto com Auto-scroll */}
      <div
        ref={scrollRef}
        className={`flex-1 overflow-y-auto px-6 sm:px-20 py-24 space-y-16 max-w-4xl mx-auto text-center ${
          isMirrored ? '-scale-x-100' : ''
        }`}
        style={{ fontSize: `${fontSize}px`, lineHeight: 1.6 }}
      >
        {/* Marcador Inicial */}
        <div className="text-slate-600 text-sm font-mono uppercase tracking-widest pb-8">
          --- INÍCIO DA GRAVAÇÃO ---
        </div>

        {reels.cenas.map((cena) => (
          <div key={cena.cena_numero} className="space-y-4">
            <div className="inline-block px-3 py-1 rounded-full bg-purple-950/80 border border-purple-800 text-purple-300 font-mono text-xs uppercase tracking-wider">
              CENA {cena.cena_numero} • {cena.tempo} • {cena.plano}
            </div>

            <p className="font-bold text-slate-100 drop-shadow-sm">
              "{cena.fala_ator}"
            </p>

            {cena.b_roll && (
              <div className="text-sm font-medium text-slate-400 italic">
                [B-Roll: {cena.b_roll.join(', ')}]
              </div>
            )}
          </div>
        ))}

        {/* Fechamento */}
        <div className="space-y-4 pt-8">
          <div className="inline-block px-3 py-1 rounded-full bg-sky-950/80 border border-sky-800 text-sky-300 font-mono text-xs uppercase tracking-wider">
            FECHAMENTO INSTITUCIONAL
          </div>

          <p className="font-bold text-slate-100">
            "{reels.fechamento.fala_ator}"
          </p>

          <div className="text-sm text-sky-400 font-medium">
            [Logo na Tela: {reels.fechamento.texto_tela_logo}]
          </div>

          <div className="text-xs text-slate-500">
            CTA: {reels.fechamento.cta_sutil}
          </div>
        </div>

        <div className="text-slate-600 text-sm font-mono uppercase tracking-widest pt-16 pb-32">
          --- FIM DO ROTEIRO ---
        </div>
      </div>
    </div>
  );
};
