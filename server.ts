import express from 'express';
import path from 'path';
import dotenv from 'dotenv';
import { GoogleGenAI } from '@google/genai';
import { createServer as createViteServer } from 'vite';

dotenv.config();

const PORT = 3000;

async function startServer() {
  const app = express();
  app.use(express.json({ limit: '10mb' }));

  // API: Health check
  app.get('/api/health', (req, res) => {
    res.json({
      status: 'ok',
      hasApiKey: Boolean(process.env.GEMINI_API_KEY),
      timestamp: new Date().toISOString(),
    });
  });

  // API: Generate Schedule
  app.post('/api/generate-schedule', async (req, res) => {
    try {
      const {
        empresa,
        mes_referencia,
        total_conteudos,
        distribuicao_formatos,
        pilares_selecionados,
        estagio_lancamento,
        foco_mes,
        observacoes,
      } = req.body;

      if (!empresa || !mes_referencia || !total_conteudos) {
        return res.status(400).json({ error: 'Parâmetros obrigatórios ausentes: empresa, mes_referencia, total_conteudos' });
      }

      const apiKey = process.env.GEMINI_API_KEY;

      if (apiKey) {
        try {
          const ai = new GoogleGenAI({
            apiKey,
            httpOptions: {
              headers: {
                'User-Agent': 'aistudio-build',
              },
            },
          });

          const prompt = `Você é um Roteirista Institucional de elite especializado em comunicação corporativa, imobiliária e logística.
Gere um cronograma de marketing completo e briefings operacionais estritamente conforme o JSON Schema para a empresa: "${empresa}".

=== REGRAS MANDATÓRIAS DESTE PROJETO ===
1. Empresa selecionada: "${empresa}"
2. Mês de Referência: "${mes_referencia}"
3. Quantidade Total de Peças: ${total_conteudos}
4. Distribuição solicitada: ${distribuicao_formatos?.carrosseis || 0} Carrosséis, ${distribuicao_formatos?.estaticos || 0} Estáticos, ${distribuicao_formatos?.reels || 0} Reels
5. Pilares prioritários a cobrir: ${(pilares_selecionados || []).join(', ') || 'cobrir pelo menos 2 pilares oficiais da empresa'}
${estagio_lancamento ? `6. Estágio de lançamento da Armazena Mais: ${estagio_lancamento}` : ''}
${foco_mes ? `7. Foco temático do mês: ${foco_mes}` : ''}
${observacoes ? `8. Observações extras: ${observacoes}` : ''}

=== GUARDRAILS ESPECÍFICOS PARA "${empresa}" ===
${
  empresa === 'CLRC'
    ? `Posicionamento: infraestrutura estratégica para operações exigentes — NUNCA "aluguel de galpão" ou "depósito".
Pilares permitidos (usar EXCLUSIVAMENTE estes nomes em "categoria"):
- Estrutura que gera performance
- Localização como estratégia
- Segurança e continuidade
- Flexibilidade e crescimento
- Relacionamento e suporte
- Educação para decisão imobiliária
- ESG, confiabilidade e evolução
Linhas Editoriais permitidas (usar EXCLUSIVAMENTE estes nomes em "linha_editorial"):
- Antes de Escolher um Galpão
- Por Dentro do CLRC
- CLRC Estratégico
- Padrão AAA na Prática
- Bastidores do CLRC
- Diagnóstico de Estrutura
- 3 Coisas que Você Não Sabia
- Relacionamento CLRC
- ESG no CLRC
- Built to Suit
Tom: executivo, claro, seguro, técnico sem ser burocrático, direto. Proibido adjetivo vazio ("incrível", "o melhor").
Estrutura de copy na legenda: Gancho (dor/risco/decisão do gestor) -> Desenvolvimento (impacto operacional) -> Prova (estrutura/processo/número validado) -> Fechamento (posicionamento CLRC) -> CTA.
Mix: ~45% educativo, ~40% institucional, ~15% comercial.`
    : empresa === 'Mais Armazém'
    ? `Posicionamento: especialista técnica em operação logística — não "só armazenagem".
Pilares permitidos (usar EXCLUSIVAMENTE estes nomes em "categoria"):
- Educação logística aplicada
- Diagnóstico de gargalos
- Gestão & Supply Chain
- Por Dentro da Operação
- Soluções Mais Armazém
- Indicadores e controle
- Estrutura e capacidade operacional
Linhas Editoriais permitidas (usar EXCLUSIVAMENTE estes nomes em "linha_editorial"):
- Gestão & Supply Chain
- Desmistificando a Logística
- Dicionário da Logística
- Diagnóstico Logístico
- Indicadores da Logística
- Por Dentro da Operação
- Mais Armazém na Prática
- Como Funciona?
- Mito ou Verdade?
- Tour Mais Armazém
- Dica de Inteligência Logística
Tom: especialista que explica (não professor que complica), objetivo, didático, prático — sempre responder "o que isso muda na operação?".
Estrutura de copy na legenda: Problema (sintoma concreto) -> Conceito -> Impacto (custo/prazo/risco) -> Aplicação (o que uma operação madura faz diferente) -> CTA.
Mix: ~40-45% Reels, ~25-30% estáticos, ~25% carrosséis.`
    : empresa === 'Armazena Mais'
    ? `Posicionamento: self storage simples, seguro e flexível — primeiro ensinar a categoria, depois vender espaço.
Pilares permitidos (usar EXCLUSIVAMENTE estes nomes em "categoria"):
- Desmistificando o self storage
- Situações de uso
- Soluções por necessidade
- Segurança e confiança
- Self storage na prática
- Marca e bastidores
- Organização e estilo de vida
Linhas Editoriais permitidas (usar EXCLUSIVAMENTE estes nomes em "linha_editorial"):
- Desmistificando o Self Storage
- Quando Faz Sentido?
- Self Storage na Prática
- Armazena+ Casa
- Armazena+ Empresa
- Armazena+ Sazonal
- Armazena+ Doc
- Como Funciona?
- Diário da Obra / Por Dentro da Armazena Mais
- Antes e Depois do Espaço
Tom: leve, simples, acolhedor sem infantilizar, prático, mais cotidiano que técnico.
Estrutura de copy na legenda: Situação real -> Incômodo -> Solução -> Tranquilidade -> CTA.
Mix: ~40% estáticos, ~30% Reels, ~30% carrosséis.`
    : `Posicionamento: marca pessoal — autoridade por experiência real, nunca "coach"/guru de empreendedorismo.
Pilares permitidos (usar EXCLUSIVAMENTE estes nomes em "categoria"):
- Dicas empreendedoras — Escritório
- Dicas empreendedoras — Obra
- Belmir na obra
- Decisões que moldam negócios
- Erros e aprendizados
- Visão de longo prazo e legado
- Repertório e eventos
Linhas Editoriais permitidas (usar EXCLUSIVAMENTE estes nomes em "linha_editorial"):
- Dicas Empreendedoras — Escritório
- Dicas Empreendedoras — Obra
- Belmir na Obra
- O Erro que Me Ensinou
- Se Eu Começasse Hoje
- Vale ou é Hype?
- Decisão Difícil
- 1 Minuto de Gestão
- O que Estou Observando
- Pergunta para o Belmir
Tom: conversacional, experiente, simples, direto, humilde sem falsa modéstia; "eu vivi isso" em vez de "você precisa fazer isso". Evitar frases motivacionais sem história por trás.
Estrutura de Reels: Pergunta forte -> Resposta com a ideia principal (sem introdução longa) -> Exemplo real vivido -> Aprendizado/critério -> Fechamento curto.
Mix: ~2/3 das peças em Reels.`
}

=== DIRETRIZES TÉCNICAS OBRIGATÓRIAS ===
- Para Reels: roteiros de 30s a 40s com marcação minuciosa de B-roll real da operação (evitar cena genérica sem relação com a narrativa).
- Sem dado quantitativo validado, usar a tag [INSERIR DADO: descrição]. NUNCA inventar número sem validação.
- Se formato for "Reels", DEVE incluir o objeto "conteudo_reels" completo com duracao_alvo, tom, cenas (cena_numero, tempo, descricao_cena, plano, fala_ator, b_roll, texto_tela, som) e fechamento.
- Se formato for "Carrossel" ou "Estático", DEVE incluir o array "conteudo_cards" com numero_card, headline, subheadline e destaque (se aplicável).
- Formato do retorno: Retorne EXCLUSIVAMENTE um objeto JSON válido correspondente ao schema:
{
  "empresa": "${empresa}",
  "mes_referencia": "${mes_referencia}",
  "total_conteudos": ${total_conteudos},
  "cronograma": [ ... ]
}`;

          const response = await ai.models.generateContent({
            model: 'gemini-2.5-flash',
            contents: prompt,
            config: {
              responseMimeType: 'application/json',
              temperature: 0.7,
            },
          });

          const rawText = response.text || '';
          const cleanedText = rawText.replace(/^```json\s*/, '').replace(/```\s*$/, '').trim();
          const parsed = JSON.parse(cleanedText);

          return res.json(parsed);
        } catch (aiErr) {
          console.warn('Falha na chamada Gemini API, gerando plano inteligente estruturado:', aiErr);
        }
      }

      // Fallback: retorno formatado com base nas diretrizes
      return res.status(200).json({
        empresa,
        mes_referencia,
        total_conteudos,
        fallback: true,
        message: 'Utilize o gerador nativo ou configure a GEMINI_API_KEY no painel de Secrets.',
      });
    } catch (err: any) {
      console.error('Erro na rota /api/generate-schedule:', err);
      res.status(500).json({ error: err.message || 'Erro interno ao gerar cronograma' });
    }
  });

  // Vite middleware in dev, static files in prod
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`[Roteirista Institucional] Servidor executando em http://0.0.0.0:${PORT}`);
  });
}

startServer();
