import { CronogramaEmpresa } from '../types';

export const INITIAL_SCHEDULES: Record<string, CronogramaEmpresa> = {
  'CLRC': {
    empresa: 'CLRC',
    mes_referencia: 'Outubro 2026',
    total_conteudos: 6,
    cronograma: [
      {
        empresa: 'CLRC',
        id: 'CLRC-2026-10-01',
        data_publicacao: '03/10/2026',
        titulo: 'O Custo Invisível do Piso Irregular na Sua Operação',
        formato: 'Carrossel',
        categoria: 'Estrutura que gera performance',
        tipo_conteudo: 'Educativo',
        linha_editorial: 'Antes de Escolher um Galpão',
        canais: ['LinkedIn', 'Instagram'],
        direcionamento_criativo: 'Design técnico de alta precisão. Fundo grafite profundo com linhas estruturais de engenharia, tipografia limpa em caixa alta para tópicos e diagramas vetoriais de nivelamento a laser.',
        legenda: `Um desnível milimétrico no piso parece detalhe na vistoria. Na rotina operacional com empilhadeiras trilaterais a 12 metros de altura, ele vira vibração, desgaste precoce de pneus e redução de até 25% na velocidade de movimentação.

A escolha de um centro logístico não é sobre "onde guardar pallets". É sobre a matemática de vazão e segurança da sua carga. No CLRC, o piso é nivelado com tecnologia a laser e capacidade de carga pontual de [INSERIR DADO: capacidade de carga do piso em ton/m²], garantindo linearidade absoluta para equipamentos de alta performance.

Antes de fechar o seu próximo contrato de locação, audite o nivelamento técnico do piso.

Compartilhe com o diretor de Supply Chain ou com o responsável pela expansão imobiliária da sua empresa.`,
        hashtags: ['#CLRC', '#LogisticaEstruturante', '#PadrãoAAA', '#ImobiliarioCorporativo', '#SupplyChain'],
        status: 'Planejado',
        conteudo_cards: [
          {
            numero_card: 1,
            headline: 'O que 3mm de desnível no piso fazem com a sua frota de empilhadeiras?',
            subheadline: 'O erro mais caro na decisão de um centro de distribuição acontece antes mesmo da primeira carga entrar.',
            destaque: 'Alerta Operacional'
          },
          {
            numero_card: 2,
            headline: 'A física da verticalização',
            subheadline: 'Em alturas elevadas de armazenagem, uma imperfeição imperceptível no solo amplifica a oscilação do mastro em até 4x no topo.',
            destaque: 'Oscilação amplificada'
          },
          {
            numero_card: 3,
            headline: 'Impacto direto no Opex',
            subheadline: 'Redução forçada de velocidade das máquinas, maior fadiga mecânica dos eixos e risco de micro-colisões nas longarinas.',
            destaque: '[INSERIR DADO: estimativa de custo anual de manutenção preventiva por piso irregular]'
          },
          {
            numero_card: 4,
            headline: 'A especificação necessária: Padrão AAA',
            subheadline: 'Piso de concreto protendido com nivelamento a laser (índices FF/FL controlados) e juntas tratadas contra esborcinamento.',
            destaque: 'FF/FL Auditado'
          },
          {
            numero_card: 5,
            headline: 'CLRC: Engenharia planejada para continuidade',
            subheadline: 'Módulos desenhados com pé-direito livre de 12m e pavimentação de alta resistência projetada para fluxos ininterruptos.',
            destaque: 'Zero gargalo de solo'
          },
          {
            numero_card: 6,
            headline: 'Decisão imobiliária é decisão de balanço',
            subheadline: 'Agende uma vistoria técnica com o comitê de engenharia e operações da sua empresa no CLRC.',
            destaque: 'Fale com nossos especialistas'
          }
        ]
      },
      {
        empresa: 'CLRC',
        id: 'CLRC-2026-10-02',
        data_publicacao: '08/10/2026',
        titulo: 'Raio de Escoamento: Por que Minutos na Rodovia Definem o SLA',
        formato: 'Estático',
        categoria: 'Localização como estratégia',
        tipo_conteudo: 'Institucional',
        linha_editorial: 'CLRC Estratégico',
        canais: ['LinkedIn', 'Instagram'],
        direcionamento_criativo: 'Foto aérea real do CLRC integrada a um mapa infográfico elegante destacando eixos rodoviários de alta velocidade sem gargalos urbanos.',
        legenda: `Estar a 10 km de um polo consumidor parece perfeito no mapa. Mas se esses 10 km exigirem transpor dois semáforos pesados e uma restrição municipal de circulação de carretas, seu caminhão perde o slot de descarga.

Localização logística estratégica não é distância linear: é fluidez de saída. O CLRC foi implantado estrategicamente com acesso imediato às principais artérias viárias, permitindo escoamento direto sem travamentos de tráfego local.

Uma infraestrutura concebida para quem opera com janelas rígidas de entrega e tolerância zero a atrasos de frota.

Conheça os detalhes de acesso e malha viária do CLRC no link da bio.`,
        hashtags: ['#CLRC', '#LocalizacaoEstrategica', '#MalhaRodoviaria', '#SupplyChainBR', '#GalpoesLogisticos'],
        status: 'Aprovado',
        conteudo_cards: [
          {
            numero_card: 1,
            headline: 'Não meça distância em quilômetros. Meça em tempo de ciclo.',
            subheadline: 'No CLRC, o acesso desimpedido às principais rodovias garante conexão direta entre doca e rota sem estrangulamento urbano.',
            destaque: '[INSERIR DADO: tempo médio de acesso ao eixo rodoviário principal em minutos]'
          }
        ]
      },
      {
        empresa: 'CLRC',
        id: 'CLRC-2026-10-03',
        data_publicacao: '15/10/2026',
        titulo: 'O que Realmente Significa Sprinklers ESFR e Isolamento NFPA?',
        formato: 'Reels',
        categoria: 'Segurança e continuidade',
        tipo_conteudo: 'Educativo',
        linha_editorial: 'Padrão AAA na Prática',
        canais: ['Instagram', 'LinkedIn'],
        direcionamento_criativo: 'Vídeo institucional dinâmico gravado in loco no galpão, com lente grande-angular mostrando a altura das tesouras de cobertura e o sistema de sprinklers instalado.',
        legenda: `Muitos contratos tratam combate a incêndio como mera exigência burocrática de seguradora. Na prática, a diferença entre um sistema comum e a tecnologia ESFR é a capacidade de extinguir o foco na origem em segundos, sem inundar o estoque inteiro.

No CLRC, a segurança contra incêndio e a redundância de bombas não são opcionais: são pré-requisitos de engenharia para que operações globais operem com taxa de risco reduzida e apólices seguras.

Assista ao vídeo e entenda como auditamos cada detalhe de proteção patrimonial. Salve este post para usar de checklist na sua próxima vistoria técnica.`,
        hashtags: ['#CLRC', '#SegurancaPatrimonial', '#ESFR', '#EngenhariaLogistica', '#GestaoDeRisco'],
        status: 'Em Produção',
        conteudo_reels: {
          duracao_alvo: '35s',
          tom: 'Executivo, seguro e esclarecedor',
          cenas: [
            {
              cena_numero: 1,
              tempo: '00:00 - 00:06',
              descricao_cena: 'Engenheiro caminha no corredor central amplo com prancheta técnica e tablet, câmera em contra-plongée revelando o teto com tubulações de combate a incêndio.',
              plano: 'Plano médio em movimento (steadycam)',
              fala_ator: 'Quando a sua seguradora audita um galpão logístico, o valor da sua apólice depende do que está instalado bem aqui no teto.',
              b_roll: [
                'Close-up na cabeça de sprinkler ESFR com iluminação natural',
                'Visão panorâmica das tesouras metálicas e iluminação zenital'
              ],
              texto_tela: 'SISTEMA ESFR & NORMAS NFPA',
              som: 'Ambiente industrial limpo, trilha minimalista executiva sem batida exagerada'
            },
            {
              cena_numero: 2,
              tempo: '00:07 - 00:18',
              descricao_cena: 'Corte rápido para a central de bombas de incêndio e tanques de reserva técnica de água com tubulações vermelhas impecáveis.',
              plano: 'Plano detalhe fixo com rack de manômetros e válvulas',
              fala_ator: 'A tecnologia ESFR não apenas controla fumaça: ela lança gotas de alta densidade que furam a coluna térmica e apagam o fogo antes dele se espalhar pelas estruturas verticais.',
              b_roll: [
                'Painel de acionamento automatizado com display digital',
                'Tanque de reserva de água com sinalização técnica'
              ],
              texto_tela: 'EXTINÇÃO DIRETA NO FOCO | ZERO PROPAGAÇÃO',
              som: 'Foco sonoro no clique de manômetro e voz com clareza'
            },
            {
              cena_numero: 3,
              tempo: '00:19 - 00:28',
              descricao_cena: 'Retorno ao engenheiro olhando diretamente para a lente, com galpão em perspectiva ao fundo mostrando piso polido e docas niveladas.',
              plano: 'Primeiro plano executivo com fundo desfocado',
              fala_ator: 'Isso significa continuidade de negócio. Seus produtos, sua equipe e sua operação protegidos por padrão internacional.',
              b_roll: [
                'Carreta manobrando com segurança no pátio externo iluminado'
              ],
              texto_tela: 'RESILIÊNCIA OPERACIONAL AUDITADA',
              som: 'Subida sutil da trilha'
            }
          ],
          fechamento: {
            plano: 'Plano geral da fachada moderna do condomínio CLRC com luz de fim de tarde',
            fala_ator: 'CLRC. Infraestrutura estratégica para operações exigentes.',
            texto_tela_logo: 'CLRC | Infraestrutura Estratégica',
            cta_sutil: 'Agende uma visita técnica pelo link da bio.'
          }
        }
      },
      {
        empresa: 'CLRC',
        id: 'CLRC-2026-10-04',
        data_publicacao: '20/10/2026',
        titulo: 'Pátio de Manobra: O Estrangulador Silencioso de Docas',
        formato: 'Carrossel',
        categoria: 'Estrutura que gera performance',
        tipo_conteudo: 'Educativo',
        linha_editorial: 'Diagnóstico de Estrutura',
        canais: ['LinkedIn', 'Instagram'],
        direcionamento_criativo: 'Infográfico comparativo em slides mostrando ângulo de giro de carretas bitrem em pátios subdimensionados vs. pátio com raio de giro ampliado no CLRC.',
        legenda: `De que adianta ter 20 docas se os caminhões precisam fazer 5 manobras para encostar em uma delas?

Pátios curtos geram fila na portaria, risco de abalroamento em manobras de ré e perda de horas úteis da equipe de conferência. No CLRC, o dimensionamento de pátio foi projetado para veículos longos, com área de espera e circulação segregada.

A eficiência da doca começa muito antes da abertura do baú.

Confira os pontos de atenção para avaliar no seu próximo CD no carrossel.`,
        hashtags: ['#CLRC', '#PatioDeManobra', '#OperacoesLogisticas', '#CondominioLogistico', '#Eficiencia'],
        status: 'Planejado',
        conteudo_cards: [
          {
            numero_card: 1,
            headline: 'Quantos minutos seus motoristas perdem apenas manobrando?',
            subheadline: 'O gargalo das docas muitas vezes não está na esteira, mas no raio de giro do pátio externo.',
            destaque: 'Gargalo oculto'
          },
          {
            numero_card: 2,
            headline: 'O erro do cálculo apertado',
            subheadline: 'Pátios com menos de 35 metros de profundidade forçam manobras travadas e bloqueiam a passagem de outras carretas.',
            destaque: 'Risco de colisão'
          },
          {
            numero_card: 3,
            headline: 'Dimensionamento CLRC',
            subheadline: 'Pátio projetado para carretas de grande porte, permitindo manobra contínua sem interrupção de fluxo nas docas vizinhas.',
            destaque: '[INSERIR DADO: profundidade do pátio de manobras em metros]'
          },
          {
            numero_card: 4,
            headline: 'Segurança viária interna',
            subheadline: 'Fluxos segregados entre veículos pesados, veículos leves de funcionários e pedestres.',
            destaque: 'Segregação total'
          },
          {
            numero_card: 5,
            headline: 'O impacto no lead time',
            subheadline: 'Menos tempo no pátio significa menor tempo de permanência no complexo e mais viagens por dia útil.',
            destaque: 'Giro de frota acelerado'
          }
        ]
      },
      {
        empresa: 'CLRC',
        id: 'CLRC-2026-10-05',
        data_publicacao: '24/10/2026',
        titulo: 'Eficiência Energética e Iluminação Zenital: Custos que Não Entram na Conta',
        formato: 'Estático',
        categoria: 'ESG, confiabilidade e evolução',
        tipo_conteudo: 'Institucional',
        linha_editorial: 'ESG no CLRC',
        canais: ['LinkedIn', 'Instagram'],
        direcionamento_criativo: 'Foto de alta qualidade do interior do galpão banhado por luz natural vinda das claraboias prismáticas com lâmpadas LED apagadas em pleno meio-dia.',
        legenda: `Um galpão logístico moderno não pode ser uma estufa escura que depende de lâmpadas incandescentes acesas 24 horas por dia.

A iluminação zenital prismática do CLRC permite operar durante boa parte do turno diurno com aproveitamento integral da luz natural, sem aquecer o ambiente interno. Isso reduz o consumo de energia elétrica em até [INSERIR DADO: percentual de economia estimado na conta de luz dos módulos] e proporciona conforto térmico real para os operadores de piso.

Sustentabilidade prática que impacta a fatura mensal e a saúde ocupacional da sua equipe.

Descubra os atributos de eficiência do CLRC.`,
        hashtags: ['#CLRC', '#ESGLogistica', '#EficienciaEnergetica', '#GalpaoSustentavel', '#PadrãoAAA'],
        status: 'Planejado',
        conteudo_cards: [
          {
            numero_card: 1,
            headline: 'Luz natural, temperatura controlada e fatura de energia reduzida.',
            subheadline: 'A iluminação zenital do CLRC alia redução direta de consumo elétrico diurno a melhores condições de trabalho para sua equipe.',
            destaque: '[INSERIR DADO: percentual de área de cobertura com iluminação zenital]'
          }
        ]
      },
      {
        empresa: 'CLRC',
        id: 'CLRC-2026-10-06',
        data_publicacao: '29/10/2026',
        titulo: 'Built to Suit vs. Módulo Padrão AAA Pronto: Como Decidir?',
        formato: 'Carrossel',
        categoria: 'Educação para decisão imobiliária',
        tipo_conteudo: 'Comercial',
        linha_editorial: 'Built to Suit',
        canais: ['LinkedIn', 'Instagram'],
        direcionamento_criativo: 'Visual corporativo em split-screen comparando cronograma de implantação de BTS (18-24 meses) com ocupação rápida de módulo AAA flexível.',
        legenda: `Sua empresa precisa de uma estrutura sob medida ou de velocidade de implantação para não perder o timing de mercado?

A decisão entre Built to Suit (BTS) e ocupação modular imediata envolve análise de capex, prazo de go-to-market e flexibilidade contratual. No CLRC, oferecemos tanto módulos prontos com especificações técnicas topo de linha quanto soluções customizadas de expansão.

Entenda qual modalidade melhor protege o fluxo de caixa da sua empresa.

Entre em contato com nossa diretoria comercial para um estudo de viabilidade customizado.`,
        hashtags: ['#CLRC', '#BuiltToSuit', '#LocacaoCorporativa', '#PlanejamentoImobiliario', '#Galpoes'],
        status: 'Planejado',
        conteudo_cards: [
          {
            numero_card: 1,
            headline: 'Built to Suit ou Módulo Imediato?',
            subheadline: 'A matriz de decisão para operações que precisam expandir sem imobilizar capital desnecessário.',
            destaque: 'Matriz de decisão'
          },
          {
            numero_card: 2,
            headline: 'Quando o BTS é mandatório',
            subheadline: 'Exigências severas de automação dedicada, câmaras frias extremas ou fluxos fabris específicos que não admitem adaptações.',
            destaque: 'Customização total'
          },
          {
            numero_card: 3,
            headline: 'Quando o módulo pronto vence',
            subheadline: 'Velocidade de ativação em semanas, menor exposição a atrasos de obra e flexibilidade para aumentar módulos conforme a demanda cresce.',
            destaque: 'Go-to-market imediato'
          },
          {
            numero_card: 4,
            headline: 'Como o CLRC atende aos dois cenários',
            subheadline: 'Módulos escaláveis já operacionais e equipe técnica especializada para projetos Built to Suit integrados ao condomínio.',
            destaque: 'Flexibilidade real'
          }
        ]
      }
    ]
  },
  'Mais Armazém': {
    empresa: 'Mais Armazém',
    mes_referencia: 'Outubro 2026',
    total_conteudos: 6,
    cronograma: [
      {
        empresa: 'Mais Armazém',
        id: 'MA-2026-10-01',
        data_publicacao: '02/10/2026',
        titulo: 'Acuracidade de Estoque: O Número que Fatura ou Quebra a Operação',
        formato: 'Carrossel',
        categoria: 'Indicadores e controle',
        tipo_conteudo: 'Educativo',
        linha_editorial: 'Indicadores da Logística',
        canais: ['LinkedIn', 'Instagram'],
        direcionamento_criativo: 'Fundo escuro com acentos em laranja operacional vibrante, telas de WMS estilizadas com percentuais de acuracidade e fluxogramas de contagem cíclica.',
        legenda: `Seu sistema diz que há 100 unidades no endereço A-14. O operador vai até lá e só encontra 92. Esse hiato de 8 peças acabou de atrasar uma expedição inteira e gerar um pedido faturado incompleto.

Acuracidade de estoque não é um relatório para guardar em gaveta: é o indicador de saúde de toda a cadeia de suprimentos. Quando ela cai abaixo de 98%, os custos com retrabalho, fretes de reenvio e cancelamentos de pedidos disparam silenciosamente.

Uma operação logística madura adota contagem cíclica diária por amostragem e auditoria cega de recebimento com WMS integrado, mantendo acuracidade sustentada em [INSERIR DADO: índice de acuracidade da Mais Armazém, ex: 99,8%].

Como está o índice de acuracidade do seu inventário hoje? Converse com nossa equipe para um diagnóstico operacional.`,
        hashtags: ['#MaisArmazem', '#AcuracidadeDeEstoque', '#WMS', '#IndicadoresLogisticos', '#SupplyChainBR'],
        status: 'Aprovado',
        conteudo_cards: [
          {
            numero_card: 1,
            headline: 'O sistema diz que tem. O estoque diz que não.',
            subheadline: 'O sintoma silencioso que drena a margem das empresas antes do produto sequer sair da doca.',
            destaque: 'Divergência de inventário'
          },
          {
            numero_card: 2,
            headline: 'O que é Acuracidade de Estoque?',
            subheadline: 'A relação exata entre a quantidade física encontrada no endereço e o saldo registrado no software de gestão.',
            destaque: 'Fórmula: (Itens Corretos / Total) x 100'
          },
          {
            numero_card: 3,
            headline: 'O custo oculto de 2% de erro',
            subheadline: 'Ruptura de vendas no e-commerce, pedidos parados na esteira de conferência e chamados no SAC de clientes frustrados.',
            destaque: 'Impacto em cadeia'
          },
          {
            numero_card: 4,
            headline: 'O método da Mais Armazém',
            subheadline: 'Inventário rotativo diário com conferência via coletores de radiofrequência e bloqueio sistêmico de discrepâncias.',
            destaque: 'Auditoria contínua'
          },
          {
            numero_card: 5,
            headline: 'Qual é a sua taxa de acuracidade?',
            subheadline: 'Se sua empresa ainda sofre com divergências no fechamento de mês, fale com os especialistas da Mais Armazém.',
            destaque: 'Solicite um diagnóstico'
          }
        ]
      },
      {
        empresa: 'Mais Armazém',
        id: 'MA-2026-10-02',
        data_publicacao: '07/10/2026',
        titulo: 'Gargalo no Picking: Onde Seus Operadores Estão Perdendo Tempo?',
        formato: 'Reels',
        categoria: 'Diagnóstico de gargalos',
        tipo_conteudo: 'Educativo',
        linha_editorial: 'Diagnóstico Logístico',
        canais: ['Instagram', 'LinkedIn'],
        direcionamento_criativo: 'Gravação dinâmica na área de separação mostrando trajeto otimizado de coleta com coletor de dados portátil vs. movimentação desordenada.',
        legenda: `Em operações de armazenagem desorganizadas, até 55% do tempo de um operador de picking é gasto apenas andando de um lado para o outro no corredor.

Isso acontece quando o estoque não segue uma curva ABC de giro real: os produtos mais vendidos ficam guardados longe das docas e dos postos de embalagem.

O que uma operação logística especializada faz diferente? Mapeia o mapa de calor de pedidos, posiciona o Top 20% de SKUs no nível ergonômico ideal e traça rotas de coleta inteligentes no WMS. O resultado é tempo de ciclo reduzido pela metade.

Identificou esse sintoma na sua empresa? Comente "DIAGNÓSTICO" para falar com nossos consultores técnicos.`,
        hashtags: ['#MaisArmazem', '#Picking', '#EficienciaOperacional', '#CurvaABC', '#InteligenciaLogistica'],
        status: 'Em Produção',
        conteudo_reels: {
          duracao_alvo: '38s',
          tom: 'Especialista, didático e prático',
          cenas: [
            {
              cena_numero: 1,
              tempo: '00:00 - 00:08',
              descricao_cena: 'Especialista logístico da Mais Armazém com colete reflexivo e coletor de dados na mão, no início de um corredor de porta-paletes impecável.',
              plano: 'Plano médio frontal, caminhando com a câmera',
              fala_ator: 'Se o seu operador de picking anda quilômetros por turno para fechar uma caixa, você não tem um problema de equipe. Você tem um problema de layout.',
              b_roll: [
                'Câmera acelerada mostrando operador indo e voltando em corredor',
                'Cronômetro na tela marcando perda de segundos'
              ],
              texto_tela: 'O GARGALO SILENCIOSO DO PICKING',
              som: 'Bipe nítido de leitor de código de barras + trilha rítmica e moderna'
            },
            {
              cena_numero: 2,
              tempo: '00:09 - 00:20',
              descricao_cena: 'Especialista para em frente a um nível de picking baixo e aponta para as caixas de alto giro com etiquetas codificadas.',
              plano: 'Plano fechado no leitor lendo a etiqueta e confirmando na tela do WMS',
              fala_ator: 'Na Mais Armazém, aplicamos curva ABC dinâmica. O que mais gira fica no nível da cintura, perto da esteira de saída. O que gira menos vai para os níveis superiores.',
              b_roll: [
                'Gráfico animado sobreposto mostrando produtos curva A posicionados na zona quente',
                'Operador separando item com agilidade sem esticar os braços'
              ],
              texto_tela: 'CURVA ABC DINÂMICA | MENOS PASSOS, MAIS VAZÃO',
              som: 'Efeito sonoro sutil de transição tecnológica'
            },
            {
              cena_numero: 3,
              tempo: '00:21 - 00:30',
              descricao_cena: 'Plano geral da área de packing onde caixas são seladas com balança de pesagem dinâmica automática.',
              plano: 'Plano aberto lateral mostrando fluxo contínuo',
              fala_ator: 'O resultado? Redução drástica no tempo de separação e pedidos saindo no mesmo dia, sem erro de SKU.',
              b_roll: [
                'Etiqueta de expedição sendo impressa e colada com precisão'
              ],
              texto_tela: 'PEDIDO SEPARADO NO PRAZO | ZERO ERRO',
              som: 'Som de esteira e bip de conferência'
            }
          ],
          fechamento: {
            plano: 'Plano médio do especialista com logotipo da Mais Armazém na bancada de expedição',
            fala_ator: 'Logística de alta performance não é sorte. É processo. Siga a Mais Armazém.',
            texto_tela_logo: 'Mais Armazém | Inteligência em Operações',
            cta_sutil: 'Comente DIAGNÓSTICO para avaliar sua operação.'
          }
        }
      },
      {
        empresa: 'Mais Armazém',
        id: 'MA-2026-10-03',
        data_publicacao: '12/10/2026',
        titulo: 'Cross-docking na Prática: Quando Manter Estoque Parado é Desperdício',
        formato: 'Estático',
        categoria: 'Gestão & Supply Chain',
        tipo_conteudo: 'Educativo',
        linha_editorial: 'Desmistificando a Logística',
        canais: ['LinkedIn', 'Instagram'],
        direcionamento_criativo: 'Diagrama infográfico limpo ilustrando a mercadoria entrando na doca de recebimento, sendo conferida e transferida diretamente para a doca de expedição em menos de 24h.',
        legenda: `Estoque parado é capital de giro imobilizado, risco de avaria e custo de armazenagem acumulado a cada dia de permanência.

Para produtos de altíssimo giro ou operações de distribuição fracionada, o Cross-docking elimina a etapa de estocagem: o produto é recebido, conferido, roteirizado e expedido em questão de horas.

Mas implementar Cross-docking exige pontualidade cirúrgica nos agendamentos de doca e integração eletrônica com os fornecedores. Quando executado pela Mais Armazém, sua empresa reduz custos de estocagem e acelera o lead time de entrega para o cliente final.

Sua cadeia de suprimentos comporta essa operação? Converse com nosso time de engenharia logística.`,
        hashtags: ['#MaisArmazem', '#CrossDocking', '#SupplyChain', '#EficienciaLogistica', '#ArmazenagemInteligente'],
        status: 'Planejado',
        conteudo_cards: [
          {
            numero_card: 1,
            headline: 'Recebeu, conferiu, expediu. Sem parar no porta-paletes.',
            subheadline: 'O Cross-docking reduz custos de armazenagem e coloca o produto na mão do cliente até 48h mais rápido.',
            destaque: 'Operação Just-in-Time'
          }
        ]
      },
      {
        empresa: 'Mais Armazém',
        id: 'MA-2026-10-04',
        data_publicacao: '17/10/2026',
        titulo: 'Por Dentro da Operação: Como Gerenciamos Picos de Sazonalidade',
        formato: 'Reels',
        categoria: 'Por Dentro da Operação',
        tipo_conteudo: 'Institucional',
        linha_editorial: 'Por Dentro da Operação',
        canais: ['Instagram', 'LinkedIn'],
        direcionamento_criativo: 'Tour dinâmico pelos bastidores da operação mostrando equipe sincronizada em dia de alto volume de pedidos, com coletores e empilhadeiras em ritmo impecável.',
        legenda: `Na Black Friday ou em picos sazonais, o volume de pedidos pode multiplicar por 5 em 48 horas. A maioria das empresas trava no recebimento ou na conferência final.

Na Mais Armazém, a flexibilidade operacional é planejada com meses de antecedência: pulmão de posições dimensionado, equipe treinada em múltiplos postos e automação de conferência por peso que impede o envio de itens errados.

Não deixe que o sucesso das suas vendas vire um pesadelo de atendimento no pós-venda.

Assista aos bastidores e veja como sua operação pode escalar sem sustos.`,
        hashtags: ['#MaisArmazem', '#BlackFridayLogistica', '#PorDentroDaOperacao', '#Sazonalidade', '#Escalabilidade'],
        status: 'Planejado',
        conteudo_reels: {
          duracao_alvo: '36s',
          tom: 'Ágil, transparente e seguro',
          cenas: [
            {
              cena_numero: 1,
              tempo: '00:00 - 00:07',
              descricao_cena: 'Visão acelerada das docas cheias de pallets sendo conferidos rapidamente pela equipe da Mais Armazém.',
              plano: 'Plano geral dinâmico com movimentação de câmera',
              fala_ator: 'Quando a sua demanda quintuplica da noite para o dia, a sua estrutura interna aguenta o tranco ou vira gargalo?',
              b_roll: [
                'Empilhadeira descarregando pallet com precisão',
                'Operadora conferindo lacre de carreta com checklist digital'
              ],
              texto_tela: 'PICOS DE DEMANDA: PLANEJADOS OU CAÓTICOS?',
              som: 'Trilha industrial envolvente com ritmo acelerado'
            },
            {
              cena_numero: 2,
              tempo: '00:08 - 00:19',
              descricao_cena: 'Coordenador de turno apontando para tela do WMS com painel de indicadores em tempo real.',
              plano: 'Plano médio com monitor de controle e depois corte para bancadas de embalagem',
              fala_ator: 'Aqui nós balanceamos as linhas em tempo real. Se o picking avança mais rápido, reforçamos a checagem por pesagem para garantir 100% de precisão nos pacotes.',
              b_roll: [
                'Pacote passando na balança e bip verde acendendo',
                'Fita de arquear sendo colocada com velocidade'
              ],
              texto_tela: 'CONFERÊNCIA POR PESO | BALANCEAMENTO DINÂMICO',
              som: 'Bip duplo de aprovação no sistema'
            },
            {
              cena_numero: 3,
              tempo: '00:20 - 00:29',
              descricao_cena: 'Pallets prontos etiquetados enfileirados na doca de saída, com caminhão da transportadora encostado.',
              plano: 'Plano médio em movimento acompanhando pallet até o baú',
              fala_ator: 'Assim, sua empresa vende com tranquilidade sabendo que o cliente vai receber exatamente o que comprou, no prazo prometido.',
              b_roll: [
                'Carregamento coordenado e motorista assinando comprovante digital'
              ],
              texto_tela: 'SLA CUMPRIDO | CLIENTE SATISFEITO',
              som: 'Fechamento de porta de baú com firmeza'
            }
          ],
          fechamento: {
            plano: 'Logomarca Mais Armazém em destaque na entrada do centro de distribuição',
            fala_ator: 'Mais Armazém. Operação técnica para quem leva logística a sério.',
            texto_tela_logo: 'Mais Armazém | Operador Logístico Especialista',
            cta_sutil: 'Fale com nossos especialistas no link da bio.'
          }
        }
      },
      {
        empresa: 'Mais Armazém',
        id: 'MA-2026-10-05',
        data_publicacao: '23/10/2026',
        titulo: 'Terceirizar a Logística: Quando Chega o Momento da Virada?',
        formato: 'Carrossel',
        categoria: 'Soluções Mais Armazém',
        tipo_conteudo: 'Comercial',
        linha_editorial: 'Mais Armazém na Prática',
        canais: ['LinkedIn', 'Instagram'],
        direcionamento_criativo: 'Slides comparativos objetivos entre gerir estoque próprio (custo fixo alto) vs. operador logístico especializado (custo variável conforme demanda).',
        legenda: `Até que ponto faz sentido para o seu negócio imobilizar tempo de diretoria contratando empilhadeira, negociando pallet e gerenciando faltas em equipe de depósito?

O seu core business é vender, inovar e expandir mercado. A gestão física de armazenagem, separação e despacho exige tecnologia pesada, licenças operacionais e gestão contínua de risco.

Quando sua empresa migra para a Mais Armazém, seu custo fixo vira variável — você só paga pelo espaço e pelas movimentações que realmente utiliza.

Confira no carrossel os 4 sinais claros de que sua empresa está pronta para terceirizar com quem entende do assunto.`,
        hashtags: ['#MaisArmazem', '#TerceirizacaoLogistica', '#OperadorLogistico', '#ReducaoDeCustos', '#FocoNoCoreBusiness'],
        status: 'Planejado',
        conteudo_cards: [
          {
            numero_card: 1,
            headline: 'Sua empresa vende produtos ou gerencia galpão?',
            subheadline: 'Os 4 sinais de que a logística interna está travando o crescimento do seu negócio.',
            destaque: 'Momento de decisão'
          },
          {
            numero_card: 2,
            headline: 'Sinal 1: Custo fixo estrangulando na baixa temporada',
            subheadline: 'Aluguel, equipe ociosa e maquinário custam o mesmo, vendendo muito ou vendendo pouco.',
            destaque: 'Inflexibilidade financeira'
          },
          {
            numero_card: 3,
            headline: 'Sinal 2: Gargalo na conferência e erros de envio',
            subheadline: 'Clientes reclamando de itens trocados e devoluções comendo a margem do produto.',
            destaque: 'Perda de reputação'
          },
          {
            numero_card: 4,
            headline: 'Sinal 3: Falta de tecnologia especializada',
            subheadline: 'Operações em planilhas sem rastreamento de lote, validade ou integração via API com seu ERP.',
            destaque: 'Cegueira sistêmica'
          },
          {
            numero_card: 5,
            headline: 'A solução Mais Armazém',
            subheadline: 'Estrutura completa, WMS integrado e cobrança sob demanda. Deixe a operação com a gente e foque em vender.',
            destaque: 'Fale com nossos consultores'
          }
        ]
      },
      {
        empresa: 'Mais Armazém',
        id: 'MA-2026-10-06',
        data_publicacao: '28/10/2026',
        titulo: 'Dicionário da Logística: O que Significa SKU, WMS e FIFO?',
        formato: 'Estático',
        categoria: 'Educação logística aplicada',
        tipo_conteudo: 'Educativo',
        linha_editorial: 'Dicionário da Logística',
        canais: ['LinkedIn', 'Instagram'],
        direcionamento_criativo: 'Cartão informativo elegante em formato de ficha técnica com definições diretas e aplicadas ao dia a dia da empresa.',
        legenda: `No dia a dia da cadeia de suprimentos, siglas como SKU, WMS e FIFO são repetidas o tempo todo. Mas você sabe o impacto prático de cada uma no resultado financeiro da sua empresa?

- SKU (Stock Keeping Unit): o código único que diferencia tamanho, cor e lote.
- WMS (Warehouse Management System): o cérebro que comanda cada centímetro do galpão e cada tarefa dos operadores.
- FIFO (First In, First Out): o método que garante que o produto que entrou primeiro seja o primeiro a sair, evitando perdas por validade.

Na Mais Armazém, esses conceitos não são teoria: são processos automatizados que protegem o seu estoque diariamente.

Salve para consultar sempre que precisar descomplicar a logística.`,
        hashtags: ['#MaisArmazem', '#DicionarioLogistico', '#FIFO', '#WMS', '#EducacaoLogistica'],
        status: 'Planejado',
        conteudo_cards: [
          {
            numero_card: 1,
            headline: 'SKU, WMS e FIFO: 3 siglas que definem a saúde do seu estoque',
            subheadline: 'Entenda como a terminologia técnica se traduz em menos erros e mais lucro na operação.',
            destaque: 'Guia Rápido'
          }
        ]
      }
    ]
  },
  'Armazena Mais': {
    empresa: 'Armazena Mais',
    mes_referencia: 'Outubro 2026',
    total_conteudos: 6,
    cronograma: [
      {
        empresa: 'Armazena Mais',
        id: 'AM-2026-10-01',
        data_publicacao: '04/10/2026',
        titulo: 'Reforma em Casa sem Quebrar Seus Móveis: O Segredo do Box',
        formato: 'Carrossel',
        categoria: 'Situações de uso',
        tipo_conteudo: 'Educativo',
        linha_editorial: 'Armazena+ Casa',
        canais: ['Instagram', 'Facebook'],
        direcionamento_criativo: 'Visual acolhedor e limpo em tons de azul-petróleo e branco. Fotos reais de sofás e eletros protegidos em box limpo e iluminado, contrastando com poeira de obra.',
        legenda: `Quem já passou por reforma em casa sabe: a poeira de gesso e a tinta encontram qualquer fresta, estragando estofados, colchões e eletrodomésticos que custaram caro.

Ficar arrastando móveis de um cômodo para o outro durante semanas gera estresse diário, risco de arranhões e bloqueia os trabalhadores.

Com a Armazena Mais, você aluga um box privativo apenas pelo tempo que a reforma durar, sem burocracia ou fiador. Seus móveis ficam guardados em um espaço limpo, arejado e com monitoramento 24h. E você só leva de volta quando a casa estiver limpa e pronta para morar.

Vai reformar ou trocar o piso? Simule o tamanho do box ideal no link da bio e proteja o que é seu.`,
        hashtags: ['#ArmazenaMais', '#SelfStorage', '#ReformaEmCasa', '#Organizacao', '#MoveisProtegidos'],
        status: 'Aprovado',
        conteudo_cards: [
          {
            numero_card: 1,
            headline: 'A poeira da reforma não precisa arruinar o seu sofá novo.',
            subheadline: 'Como proteger seus móveis e manter a sanidade mental durante as obras em casa.',
            destaque: 'Dica de Reforma'
          },
          {
            numero_card: 2,
            headline: 'O drama de "arrastar móvel de um quarto pro outro"',
            subheadline: 'Móveis amontoados sofrem com riscos, poeira de gesso penetrante e tornam a rotina da casa inviável.',
            destaque: 'Estresse desnecessário'
          },
          {
            numero_card: 3,
            headline: 'A solução: seu box temporário',
            subheadline: 'Guarde tudo em um box privativo, trancado por você, em ambiente dedetizado, limpo e monitorado.',
            destaque: 'Contrato flexível'
          },
          {
            numero_card: 4,
            headline: 'Quanto tempo você precisa?',
            subheadline: 'Alugue por 1 mês, 2 meses ou pelo período que a obra durar, sem fiador e sem surpresas no valor.',
            destaque: 'Sem fidelidade longa'
          },
          {
            numero_card: 5,
            headline: 'Casa em reforma, móveis em paz',
            subheadline: 'Fale com nossa equipe pelo WhatsApp e descubra o tamanho exato de box para acomodar seus cômodos.',
            destaque: 'Fale no WhatsApp'
          }
        ]
      },
      {
        empresa: 'Armazena Mais',
        id: 'AM-2026-10-02',
        data_publicacao: '09/10/2026',
        titulo: 'O que Cabe em um Box de 3m²? Você Vai Se Surpreender',
        formato: 'Reels',
        categoria: 'Desmistificando o self storage',
        tipo_conteudo: 'Educativo',
        linha_editorial: 'Desmistificando o Self Storage',
        canais: ['Instagram', 'TikTok', 'Facebook'],
        direcionamento_criativo: 'Vídeo dinâmico e visualmente leve mostrando um box de 3m² vazio e sendo preenchido com caixas padronizadas, bicicleta e malas, com música alto astral.',
        legenda: `Muita gente ouve falar em "box de 3m²" e acha que só cabe meia dúzia de caixas. Mas quando você lembra que o box tem pé-direito de quase 3 metros, a mágica da verticalização acontece!

No vídeo de hoje, mostramos na prática tudo o que cabe em um espaço compacto: cama desmontada, armário, mais de 20 caixas organizadoras e até equipamentos esportivos.

Você não precisa alugar um espaço gigante para resolver o aperto da sua casa ou do seu pequeno comércio.

Quer saber qual tamanho atende sua necessidade? Comente "ESPAÇO" que enviamos o simulador direto no seu direct.`,
        hashtags: ['#ArmazenaMais', '#SelfStorageNaPratica', '#TamanhoDoBox', '#EspacoInteligente', '#MaisEspaco'],
        status: 'Em Produção',
        conteudo_reels: {
          duracao_alvo: '32s',
          tom: 'Leve, acolhedor, prático e surpreendente',
          cenas: [
            {
              cena_numero: 1,
              tempo: '00:00 - 00:06',
              descricao_cena: 'Apresentadora simpática parada na porta de um box de 3m² aberto, com piso limpo e paredes metálicas impecáveis.',
              plano: 'Plano médio com enquadramento do box',
              fala_ator: 'Você acha que um box de três metros quadrados é pequeno? Espera só até você ver o que cabe aqui dentro!',
              b_roll: [
                'Visão rápida do corredor amplo, bem iluminado e climatizado',
                'Porta roll-up abrindo suavemente'
              ],
              texto_tela: 'O QUE CABE EM UM BOX DE 3M²?',
              som: 'Trilha pop instrumental animada e alegre'
            },
            {
              cena_numero: 2,
              tempo: '00:07 - 00:18',
              descricao_cena: 'Corte em stop-motion ou time-lapse bem editado dos itens entrando no box de forma organizada.',
              plano: 'Plano geral fixo vendo os objetos se empilharem com ordem',
              fala_ator: 'O segredo é usar a altura: com quase três metros de pé-direito, você guarda uma geladeira, uma cama box, malas de viagem e mais de vinte caixas!',
              b_roll: [
                'Close na prateleira modular sendo encaixada',
                'Caixas plásticas transparentes identificadas empilhadas'
              ],
              texto_tela: 'PÉ-DIREITO ALTO | APROVEITAMENTO VERTICAL',
              som: 'Sons divertidos de pop/encaixe a cada item que aparece'
            },
            {
              cena_numero: 3,
              tempo: '00:19 - 00:26',
              descricao_cena: 'Apresentadora fecha a porta do box, coloca o cadeado próprio e sorri para a câmera com a chave na mão.',
              plano: 'Plano detalhe do cadeado sendo travado e plano médio da apresentadora',
              fala_ator: 'E o melhor: só você tem a chave e o acesso ao seu espaço.',
              b_roll: [
                'Câmera de segurança com luz verde piscando no corredor'
              ],
              texto_tela: 'SUA CHAVE | SEU ESPAÇO | SUA TRANQUILIDADE',
              som: 'Clique seguro do cadeado travando'
            }
          ],
          fechamento: {
            plano: 'Fachada moderna da Armazena Mais com estacionamento privativo para carga e descarga',
            fala_ator: 'Armazena Mais. O espaço extra que a sua vida precisa.',
            texto_tela_logo: 'Armazena Mais | Self Storage',
            cta_sutil: 'Comente ESPAÇO para simular seu tamanho.'
          }
        }
      },
      {
        empresa: 'Armazena Mais',
        id: 'AM-2026-10-03',
        data_publicacao: '14/10/2026',
        titulo: 'Seu Estoque Invadiu a Sala de Estar? O Self Storage para E-commerce',
        formato: 'Estático',
        categoria: 'Soluções por necessidade',
        tipo_conteudo: 'Comercial',
        linha_editorial: 'Armazena+ Empresa',
        canais: ['Instagram', 'LinkedIn', 'Facebook'],
        direcionamento_criativo: 'Foto dividida: lado esquerdo mostra sala de casa cheia de caixas de papelão e sacolas de envio; lado direito mostra um box da Armazena Mais com estantes organizadas e espaço para embalar.',
        legenda: `Seu e-commerce começou pequeno e agora as caixas de mercadoria tomaram conta do corredor, do quarto de hóspedes e da mesa de jantar?

Alugar um galpão comercial envolve fiador, IPTU, conta de luz e contratos de 3 anos que travam seu fluxo de caixa.

Na Armazena Mais, você tem o espaço ideal para centralizar o estoque da sua loja online:
- Acesso fácil todos os dias da semana;
- Carrinhos disponíveis para carga e descarga;
- Monitoramento por câmeras e controle eletrônico de acesso;
- Contratos mensais flexíveis: venda mais, mude para um box maior a qualquer momento.

Recupere o espaço da sua casa e profissionalize o seu negócio. Fale com a nossa equipe hoje mesmo.`,
        hashtags: ['#ArmazenaMais', '#EcommerceBR', '#EstoqueInteligente', '#PequenosNegocios', '#SelfStorageEmpresarial'],
        status: 'Planejado',
        conteudo_cards: [
          {
            numero_card: 1,
            headline: 'Sua loja online cresceu. Sua casa precisa respirar.',
            subheadline: 'Centralize seu estoque na Armazena Mais com total segurança, flexibilidade contratual e custo que cabe no seu fluxo de caixa.',
            destaque: 'Solução para E-commerce'
          }
        ]
      },
      {
        empresa: 'Armazena Mais',
        id: 'AM-2026-10-04',
        data_publicacao: '19/10/2026',
        titulo: 'Self Storage Não É Depósito Antigo: Entenda a Diferença',
        formato: 'Carrossel',
        categoria: 'Desmistificando o self storage',
        tipo_conteudo: 'Educativo',
        linha_editorial: 'Desmistificando o Self Storage',
        canais: ['Instagram', 'Facebook'],
        direcionamento_criativo: 'Comparativo visual moderno desmistificando o estigma de depósitos escuros e poeirentos vs. o padrão moderno e tecnológico do self storage da Armazena Mais.',
        legenda: `Quando alguém fala em "guardar coisas fora de casa", muita gente ainda imagina um galpão escuro, empoeirado e úmido onde ninguém sabe o que acontece.

O conceito moderno de self storage é exatamente o oposto disso. É uma extensão limpa, organizada e tecnológica da sua casa ou empresa.

Na Armazena Mais:
1. Os boxes são individuais e privativos;
2. O ambiente é iluminado, dedetizado e livre de umidade;
3. Só você tem a chave ou senha do seu box;
4. Monitoramento 24h por câmeras de alta resolução.

Descubra no carrossel por que o self storage virou rotina para famílias e empresas organizadas. Salve este post para consultar!`,
        hashtags: ['#ArmazenaMais', '#Desmistificando', '#SelfStorageModerno', '#SegurancaTotal', '#OrganizacaoPessoal'],
        status: 'Planejado',
        conteudo_cards: [
          {
            numero_card: 1,
            headline: 'Ainda acha que self storage é um "depósito escuro"?',
            subheadline: 'Conheça o padrão de segurança e conforto que transformou a forma como as pessoas guardam o que têm de mais valioso.',
            destaque: 'Mito vs. Realidade'
          },
          {
            numero_card: 2,
            headline: 'Depósito tradicional vs. Self Storage',
            subheadline: 'No depósito tradicional, terceiros mexem nos seus itens. No self storage, você tranca com seu cadeado e leva a chave.',
            destaque: 'Privacidade 100%'
          },
          {
            numero_card: 3,
            headline: 'Higiene e conservação',
            subheadline: 'Corredores climatizados, pisos limpos e controle rigoroso de pragas para que seus livros e tecidos fiquem intactos.',
            destaque: 'Ambiente controlado'
          },
          {
            numero_card: 4,
            headline: 'Acesso simples e autônomo',
            subheadline: 'Estacione com conforto, use nossos carrinhos de transporte e acesse seus pertences no seu ritmo.',
            destaque: 'Facilidade diária'
          }
        ]
      },
      {
        empresa: 'Armazena Mais',
        id: 'AM-2026-10-05',
        data_publicacao: '23/10/2026',
        titulo: 'Como Funciona na Prática? Do Primeiro Clique à Chave na Mão',
        formato: 'Reels',
        categoria: 'Self storage na prática',
        tipo_conteudo: 'Institucional',
        linha_editorial: 'Como Funciona?',
        canais: ['Instagram', 'TikTok', 'Facebook'],
        direcionamento_criativo: 'Vídeo em primeira pessoa (POV) mostrando a experiência completa do cliente chegando na unidade, passando na recepção, abrindo o portão e guardando seus pertences.',
        legenda: `Alugar um box na Armazena Mais é tão simples quanto pedir comida por aplicativo. Sem fiador, sem caução imobiliária absurda e sem burocracia interminável.

1. Você escolhe o tamanho do box que precisa (com a ajuda dos nossos consultores);
2. Faz o cadastro online rápido;
3. Recebe seu acesso, coloca o cadeado no seu box e pronto!

Seus pertences guardados com tranquilidade, e a sua casa ou empresa com espaço livre de verdade.

Veja o passo a passo completo no vídeo e venha tomar um café com a gente para conhecer os boxes de perto!`,
        hashtags: ['#ArmazenaMais', '#ComoFunciona', '#PassoAPasso', '#SemBurocracia', '#SelfStorage'],
        status: 'Planejado',
        conteudo_reels: {
          duracao_alvo: '35s',
          tom: 'Acolhedor, dinâmico e descomplicado',
          cenas: [
            {
              cena_numero: 1,
              tempo: '00:00 - 00:07',
              descricao_cena: 'Ponto de vista (POV) de um cliente chegando com o carro na doca de descarga coberta da Armazena Mais.',
              plano: 'Câmera na altura dos olhos acompanhando a entrada',
              fala_ator: 'Pensando em contratar um box mas não sabe como funciona? Vem comigo que eu te mostro em trinta segundos.',
              b_roll: [
                'Portão automático abrindo com tag de acesso',
                'Recepção moderna e iluminada com café e água'
              ],
              texto_tela: 'COMO FUNCIONA O SELF STORAGE?',
              som: 'Trilha acústica moderna, animada e calorosa'
            },
            {
              cena_numero: 2,
              tempo: '00:08 - 00:20',
              descricao_cena: 'Cliente pega um carrinho plataforma disponível na entrada, coloca três caixas grandes e sobe pelo elevador espaçoso.',
              plano: 'Plano médio em movimento mostrando o transporte suave',
              fala_ator: 'Primeiro, você escolhe o tamanho ideal. Depois, estaciona na nossa vaga de carga coberta e usa nossos carrinhos gratuitos para levar tudo até a porta do seu box.',
              b_roll: [
                'Painel de controle de acesso digitando senha',
                'Corredores brilhando e sinalizados por números'
              ],
              texto_tela: 'CARRINHOS GRATUITOS | VAGAS COBERTAS',
              som: 'Som suave das rodinhas de silicone rodando no piso nivelado'
            },
            {
              cena_numero: 3,
              tempo: '00:21 - 00:29',
              descricao_cena: 'Cliente abre a porta do box, guarda as caixas com tranquilidade, trava o cadeado e guarda a chave no bolso.',
              plano: 'Plano fechado no cadeado e sorriso de alívio do cliente',
              fala_ator: 'Você trava com o seu próprio cadeado, fica com a chave e volta quando quiser. Simples assim, sem fiador e sem dor de cabeça.',
              b_roll: [
                'Close na fechadura e chave no chaveiro Armazena Mais'
              ],
              texto_tela: 'SEM FIADOR | ACESSO LIVRE | ZERO COMPLICAÇÃO',
              som: 'Som de estalo do cadeado fechando'
            }
          ],
          fechamento: {
            plano: 'Recepção com atendente sorrindo e oferecendo um café',
            fala_ator: 'Armazena Mais. Venha fazer uma visita e escolha o seu box.',
            texto_tela_logo: 'Armazena Mais | O Seu Espaço Extra',
            cta_sutil: 'Agende uma visita pelo WhatsApp no link da bio.'
          }
        }
      },
      {
        empresa: 'Armazena Mais',
        id: 'AM-2026-10-06',
        data_publicacao: '29/10/2026',
        titulo: 'Árvore de Natal, Malas e Prancha de Surf: Onde Guardar Fora de Época?',
        formato: 'Estático',
        categoria: 'Soluções por necessidade',
        tipo_conteudo: 'Institucional',
        linha_editorial: 'Armazena+ Sazonal',
        canais: ['Instagram', 'Facebook'],
        direcionamento_criativo: 'Imagem clean e divertida mostrando itens sazonais (enfeites de fim de ano, prancha, equipamento de camping) organizados em caixas etiquetadas.',
        legenda: `Você usa a prancha de surf 3 vezes no ano. A árvore de Natal e os enfeites, apenas em dezembro. Mas durante os outros 11 meses, esses itens ocupam o armário mais nobre do quarto ou a vaga da garagem.

Guardar itens sazonais na Armazena Mais libera espaço útil dentro da sua rotina para as coisas que você realmente usa todo dia.

Quando a temporada de verão ou as festas de fim de ano chegarem, é só passar no seu box, pegar o que precisa e curtir.

Descubra como pequenos espaços geram grande alívio no dia a dia da família. Visite a Armazena Mais!`,
        hashtags: ['#ArmazenaMais', '#ItensSazonais', '#OrganizacaoDoLar', '#VidaPratica', '#SelfStorage'],
        status: 'Planejado',
        conteudo_cards: [
          {
            numero_card: 1,
            headline: 'Você usa 1 mês no ano. Mas ele ocupa seu armário o ano inteiro.',
            subheadline: 'Pranchas, malas gigantes e enfeites de Natal: guarde no box sazonal e recupere o espaço do seu guarda-roupa.',
            destaque: 'Espaço Sazonal'
          }
        ]
      }
    ]
  },
  'Belmir Menegatti': {
    empresa: 'Belmir Menegatti',
    mes_referencia: 'Outubro 2026',
    total_conteudos: 6,
    cronograma: [
      {
        empresa: 'Belmir Menegatti',
        id: 'BM-2026-10-01',
        data_publicacao: '01/10/2026',
        titulo: 'O Barato que Quase Custou Toda a Obra',
        formato: 'Reels',
        categoria: 'Erros e aprendizados',
        tipo_conteudo: 'Educativo',
        linha_editorial: 'O Erro que Me Ensinou',
        canais: ['Instagram', 'LinkedIn', 'YouTube'],
        direcionamento_criativo: 'Belmir falando direto para a câmera em uma obra real em andamento, capacete de proteção branco, luz natural e tom sincero de quem aprendeu na pele.',
        legenda: `No começo dos negócios, é natural querer economizar em cada linha de orçamento. Mas tem uma economia que cobra juros altíssimos: fornecedor sem histórico técnico comprovado.

No vídeo de hoje, conto uma decisão que tomei anos atrás ao contratar uma estrutura pré-moldada pelo menor preço. O atraso na entrega e o retrabalho me custaram 3 vezes o valor da suposta economia inicial.

Depois desse dia, criei um critério inegociável que uso até hoje para qualquer contratação de engenharia ou parceria comercial.

Assista e me diga: você já cometeu um erro parecido nos seus negócios?`,
        hashtags: ['#BelmirMenegatti', '#EmpreendedorismoReal', '#GestaoDeObras', '#LicoesDeNegocios', '#ConstrucaoCivil'],
        status: 'Aprovado',
        conteudo_reels: {
          duracao_alvo: '38s',
          tom: 'Conversacional, maduro, humilde e direto',
          cenas: [
            {
              cena_numero: 1,
              tempo: '00:00 - 00:08',
              descricao_cena: 'Belmir com capacete branco e camisa de botões com mangas dobradas, olhando firme nos olhos de quem assiste, no meio do canteiro de obras.',
              plano: 'Plano médio frontal, luz natural de fim de tarde',
              fala_ator: 'Sabe qual é a forma mais rápida de um empresário perder dinheiro em uma obra? Achar que a proposta mais barata na planilha é a que vai custar menos no final.',
              b_roll: [
                'Corte rápido para viga de concreto sendo erguida por guindaste',
                'Engenheiros analisando planta impressa no canteiro'
              ],
              texto_tela: 'O PREÇO MAIS BAIXO NA PLANILHA É MESMO O MAIS BARATO?',
              som: 'Som ambiente discreto de canteiro ao fundo, voz limpa e firme no microfone de lapela'
            },
            {
              cena_numero: 2,
              tempo: '00:09 - 00:22',
              descricao_cena: 'Belmir gesticula com calma, relembrando uma situação real vivida no início da carreira.',
              plano: 'Primeiro plano com profundidade de campo, pilares ao fundo',
              fala_ator: 'Lá atrás, eu fechei uma compra de ferragens com um fornecedor que deu 15% de desconto. O que ele não me contou foi que o prazo de entrega dele atrasou em quarenta dias. A obra parou, a equipe ficou ociosa e o prejuízo comeu toda a margem do projeto.',
              b_roll: [
                'Close na textura do concreto apurado e armações de aço',
                'Operários alinhando escoramentos com nível'
              ],
              texto_tela: '40 DIAS DE ATRASO | EQUIPE PARADA | MARGEM ZERADA',
              som: 'Pausa natural na fala para dar peso à lição'
            },
            {
              cena_numero: 3,
              tempo: '00:23 - 00:32',
              descricao_cena: 'Belmir dá um passo à frente, com expressão reflexiva e segura.',
              plano: 'Plano médio frontal',
              fala_ator: 'Naquele dia eu aprendi: pontualidade e capacidade de entrega valem muito mais do que desconto no papel. Se o parceiro falha na base, a conta sempre estoura no seu colo.',
              b_roll: [
                'Câmera aberta mostrando o galpão imponente em estágio avançado'
              ],
              texto_tela: 'PONTUALIDADE E REPUTAÇÃO VALEM MAIS QUE DESCONTO',
              som: 'Subida suave de violão instrumental discreto'
            }
          ],
          fechamento: {
            plano: 'Belmir sorri com serenidade, balança a cabeça afirmativamente',
            fala_ator: 'Critério antes de preço. Essa regra nunca falhou.',
            texto_tela_logo: 'Belmir Menegatti | Experiência de Campo',
            cta_sutil: 'Você já passou por isso? Deixa sua experiência nos comentários.'
          }
        }
      },
      {
        empresa: 'Belmir Menegatti',
        id: 'BM-2026-10-02',
        data_publicacao: '06/10/2026',
        titulo: 'Sócio ou Fornecedor? Como Eu Escolho com Quem Andar',
        formato: 'Estático',
        categoria: 'Decisões que moldam negócios',
        tipo_conteudo: 'Educativo',
        linha_editorial: 'Decisão Difícil',
        canais: ['LinkedIn', 'Instagram'],
        direcionamento_criativo: 'Foto documental espontânea de Belmir em mesa de reunião com caderno de anotações e caneta, iluminação quente e foco nas expressões maduras.',
        legenda: `Quando um negócio começa a crescer, aparecem dezenas de pessoas querendo sociedade ou parcerias "estratégicas".

Aprendi com as décadas que ter competência técnica é obrigação, mas o que sustenta um negócio no longo prazo é alinhamento de valores e resistência a momentos de crise. Quando a maré sobe, todo mundo é amigo. Quando a obra aperta e o fluxo de caixa oscila, você descobre com quem realmente está sentado à mesa.

Antes de colocar o nome da sua família em um contrato, pergunte a si mesmo: essa pessoa suporta um revés sem tentar transferir a culpa?

Salve este conselho para quando for tomar sua próxima decisão societária.`,
        hashtags: ['#BelmirMenegatti', '#SociedadeNosNegocios', '#TomadaDeDecisao', '#ValoresEmpresariais', '#LiderancaReal'],
        status: 'Aprovado',
        conteudo_cards: [
          {
            numero_card: 1,
            headline: 'Com quem você se sentaria à mesa em um dia de tempestade?',
            subheadline: 'Alinhar valores éticos antes do contrato salva anos de litígio e protege o seu legado.',
            destaque: 'Critério de Sociedade'
          }
        ]
      },
      {
        empresa: 'Belmir Menegatti',
        id: 'BM-2026-10-03',
        data_publicacao: '13/10/2026',
        titulo: 'O Canteiro de Obras Não Aceita Mentira',
        formato: 'Reels',
        categoria: 'Belmir na obra',
        tipo_conteudo: 'Institucional',
        linha_editorial: 'Belmir na Obra',
        canais: ['Instagram', 'LinkedIn', 'YouTube'],
        direcionamento_criativo: 'Belmir caminhando pelo piso recém-concretado, tocando na estrutura, conversando de forma autêntica com o encarregado e olhando para a câmera.',
        legenda: `Você pode criar a melhor apresentação em slides do mundo, com gráficos coloridos e projeções futuristas. Mas quando você pisa no canteiro de obras, a física fala mais alto.

Ou o nível do piso está correto, ou a empilhadeira não vai andar. Ou o concreto deu a resistência especificada no laboratório, ou a estrutura não aguenta a carga.

Essa é a grande escola que a engenharia e a construção me deram: a verdade das coisas não está no discurso, está na entrega feita. Se você quer liderar uma empresa com respeito, nunca tenha medo de ir até a ponta e conferir com os próprios olhos.

Assista ao vídeo e compartilhe com quem valoriza trabalho sério de campo.`,
        hashtags: ['#BelmirMenegatti', '#BelmirNaObra', '#CanteiroDeObras', '#EngenhariaPratica', '#LiderancaDeCampo'],
        status: 'Em Produção',
        conteudo_reels: {
          duracao_alvo: '35s',
          tom: 'Firme, experiente, visceral e inspirador sem clichês',
          cenas: [
            {
              cena_numero: 1,
              tempo: '00:00 - 00:07',
              descricao_cena: 'Belmir ajoelha perto de uma junta de dilatação do piso polido, passa a mão com calma e levanta olhando para o operador ao lado.',
              plano: 'Plano médio em contra-plongée, mostrando a amplitude do galpão',
              fala_ator: 'Sabe o que eu mais gosto na construção pesada? É que o canteiro de obras não aceita conversa fiada.',
              b_roll: [
                'Close na mão de Belmir sentindo a textura do concreto polido',
                'Operador conferindo prumo com régua de alumínio'
              ],
              texto_tela: 'O CANTEIRO DE OBRAS NÃO ACEITA CONVERSA FIADA',
              som: 'Eco natural de galpão amplo e passos firmes na botina de segurança'
            },
            {
              cena_numero: 2,
              tempo: '00:08 - 00:20',
              descricao_cena: 'Belmir caminha com o mestre de obras, apontando para o alinhamento das tesouras metálicas.',
              plano: 'Câmera acompanhando em plano americano lateral',
              fala_ator: 'No escritório você pode argumentar, negociar e justificar. Mas aqui no piso, ou o nível bate no milímetro ou o equipamento de doze metros de altura não opera. A realidade se impõe.',
              b_roll: [
                'Visão vertical das tesouras metálicas milimetricamente alinhadas',
                'Mestre de obras concordando com aceno de cabeça'
              ],
              texto_tela: 'NO PISO, O NÍVEL É EXATO OU A MÁQUINA NÃO OPERA',
              som: 'Subida de trilha instrumental sutil, sem excesso'
            },
            {
              cena_numero: 3,
              tempo: '00:21 - 00:29',
              descricao_cena: 'Belmir se posiciona no centro da estrutura, luz da tarde entrando pela iluminação zenital.',
              plano: 'Plano médio frontal firme',
              fala_ator: 'Por isso que eu faço questão de estar aqui toda semana. Liderança que não conhece o chão onde pisa é só teoria.',
              b_roll: [
                'Visão externa ampla do empreendimento tomando forma'
              ],
              texto_tela: 'LIDERANÇA QUE NÃO CONHECE O CHÃO É SÓ TEORIA',
              som: 'Som ambiente suave'
            }
          ],
          fechamento: {
            plano: 'Belmir ajeita o capacete e acena com respeito',
            fala_ator: 'Esteja presente naquilo que você constrói.',
            texto_tela_logo: 'Belmir Menegatti | No Chão da Obra',
            cta_sutil: 'Acompanhe os bastidores das nossas obras por aqui.'
          }
        }
      },
      {
        empresa: 'Belmir Menegatti',
        id: 'BM-2026-10-04',
        data_publicacao: '18/10/2026',
        titulo: 'Se Eu Perdesse Tudo Hoje e Tivesse que Começar do Zero',
        formato: 'Reels',
        categoria: 'Erros e aprendizados',
        tipo_conteudo: 'Educativo',
        linha_editorial: 'Se Eu Começasse Hoje',
        canais: ['Instagram', 'LinkedIn', 'YouTube'],
        direcionamento_criativo: 'Belmir em seu escritório simples, sentado à mesa de madeira maciça, café coado na xícara, luz suave, conversa intimista de mentor experiente.',
        legenda: `Se alguém tirasse todo o meu patrimônio e me deixasse apenas com a experiência que tenho hoje, sabe em qual negócio eu não entraria? Naquele que promete retorno fácil sem necessidade de construir ativos reais.

Muita gente nova nos negócios quer o caminho mais curto: a moeda digital da moda, o atalho de marketing, a intermediação sem risco. Mas riqueza duradoura sempre foi e sempre será sobre resolver problemas complexos para quem precisa de infraestrutura, produção e segurança.

O patrimônio que fica para os seus filhos é aquele lastreado em coisas que você pode ver, auditar e manter funcionando.

Qual é a base do patrimônio que você está construindo hoje?`,
        hashtags: ['#BelmirMenegatti', '#PatrimonioReal', '#VisaoDeLongoPrazo', '#ConstrucaoDeLegado', '#ConselhoEmpreendedor'],
        status: 'Planejado',
        conteudo_reels: {
          duracao_alvo: '36s',
          tom: 'Calmo, íntimo, reflexivo e despretensioso',
          cenas: [
            {
              cena_numero: 1,
              tempo: '00:00 - 00:07',
              descricao_cena: 'Belmir dá um gole de café na xícara de louça branca, coloca na mesa e olha com tranquilidade para o espectador.',
              plano: 'Plano médio em ambiente de escritório acolhedor',
              fala_ator: 'Se eu perdesse tudo amanhã e tivesse que começar do zero, sabe qual é a primeira coisa que eu faria?',
              b_roll: [
                'Close na xícara de café e na caneta clássica sobre o papel'
              ],
              texto_tela: 'SE EU PERDESSE TUDO AMANHÃ...',
              som: 'Som sutil da xícara tocando o pires, silêncio calmo'
            },
            {
              cena_numero: 2,
              tempo: '00:08 - 00:20',
              descricao_cena: 'Belmir se apoia nos cotovelos, falando como quem aconselha um sobrinho ou filho.',
              plano: 'Primeiro plano com foco nos olhos expressivos',
              fala_ator: 'Eu não iria atrás de promessas de dinheiro rápido na internet. Eu procuraria um problema real no setor produtivo — transporte, armazenagem, construção — e colocaria minha energia para resolver.',
              b_roll: [
                'Imagens de arquivos pessoais antigos e fotos de obras concluídas'
              ],
              texto_tela: 'RESOLVA PROBLEMAS DO SETOR PRODUTIVO',
              som: 'Trilha suave de piano ao fundo'
            },
            {
              cena_numero: 3,
              tempo: '00:21 - 00:30',
              descricao_cena: 'Belmir abre um sorriso discreto e conclui com convicção serena.',
              plano: 'Plano médio frontal',
              fala_ator: 'Porque quando a euforia do mercado passa, quem tem infraestrutura física e credibilidade na praça continua de pé. Dinheiro rápido some rápido. Ativo sólido fica para as próximas gerações.',
              b_roll: [
                'Carreta saindo de um CD moderno com o dia amanhecendo'
              ],
              texto_tela: 'ATIVO SÓLIDO FICA PARA AS PRÓXIMAS GERAÇÕES',
              som: 'Nota final de piano'
            }
          ],
          fechamento: {
            plano: 'Belmir fecha o caderno de couro e sorri',
            fala_ator: 'Pense sempre em vinte anos, não em vinte dias.',
            texto_tela_logo: 'Belmir Menegatti | Legado & Negócios',
            cta_sutil: 'Qual é a sua visão para os próximos anos?'
          }
        }
      },
      {
        empresa: 'Belmir Menegatti',
        id: 'BM-2026-10-05',
        data_publicacao: '22/10/2026',
        titulo: 'Alavancagem com Dívida: Remédio ou Veneno?',
        formato: 'Carrossel',
        categoria: 'Decisões que moldam negócios',
        tipo_conteudo: 'Educativo',
        linha_editorial: '1 Minuto de Gestão',
        canais: ['LinkedIn', 'Instagram'],
        direcionamento_criativo: 'Design editorial sóbrio em preto, branco e ocre. Frases curtas e reflexivas com peso de quem já atravessou diversas crises econômicas no Brasil.',
        legenda: `Dívida em empresa é como fogo: pode aquecer o forno da padaria ou incendiar a casa inteira.

Ao longo de 30 anos gerindo empresas e obras, vi muita gente boa quebrar não por falta de vendas, mas por excesso de otimismo financeiro em épocas de juros baixos. Quando a taxa de juros sobe e a vacância aumenta, o banco não quer saber se o seu projeto era bonito: ele quer a parcela.

Minha regra pessoal sempre foi: alavanque apenas aquilo que a sua geração de caixa mais pessimista consegue pagar com folga.

No carrossel, compartilho os 3 filtros que uso antes de tomar qualquer linha de financiamento.`,
        hashtags: ['#BelmirMenegatti', '#GestaoFinanceira', '#Alavancagem', '#PrudenciaEmpresarial', '#CriseEEvolucao'],
        status: 'Planejado',
        conteudo_cards: [
          {
            numero_card: 1,
            headline: 'Dívida em empresa: remédio ou veneno?',
            subheadline: 'O critério que separa o crescimento sustentável da quebra silenciosa em períodos de juros altos.',
            destaque: 'Filtro Financeiro'
          },
          {
            numero_card: 2,
            headline: 'O perigo do cenário ideal',
            subheadline: 'Nunca projete o pagamento da parcela com 100% de ocupação ou vendas no teto. Calcule sempre no pior cenário histórico.',
            destaque: 'Teste de estresse'
          },
          {
            numero_card: 3,
            headline: 'Prazo longo x Custo financeiro',
            subheadline: 'Prefira sempre prazos que respeitem o ciclo de maturação do ativo imobiliário ou logístico.',
            destaque: 'Casamento de prazos'
          },
          {
            numero_card: 4,
            headline: 'Dormir em paz vale mais que crescer a qualquer custo',
            subheadline: 'A empresa que sobrevive às tempestades é aquela que mantém reservas e não compromete seu patrimônio principal.',
            destaque: 'Preservação de capital'
          }
        ]
      },
      {
        empresa: 'Belmir Menegatti',
        id: 'BM-2026-10-06',
        data_publicacao: '27/10/2026',
        titulo: 'Como Eu Avalio um Profissional em 15 Minutos de Conversa',
        formato: 'Reels',
        categoria: 'Dicas empreendedoras — Escritório',
        tipo_conteudo: 'Educativo',
        linha_editorial: 'Dicas Empreendedoras — Escritório',
        canais: ['Instagram', 'LinkedIn', 'YouTube'],
        direcionamento_criativo: 'Belmir caminhando em um corredor corporativo com quadros de marcos históricos da empresa, falando naturalmente com pausas e olho no olho.',
        legenda: `Currículo impresso aceita qualquer palavra bonita. Já entrevistei centenas de pessoas para cargos de engenharia, gerência e liderança de campo.

Com o tempo, deixei de olhar primeiro para os diplomas e passei a fazer uma única pergunta: "Me conta uma vez em que deu tudo errado sob sua responsabilidade, e o que você fez para resolver?".

Quem começa a culpar o chefe anterior, a chuva ou a crise geralmente não tem estômago para assumir o rojão. Quem fala a verdade e assume a autoria é quem você quer ao seu lado no dia a dia.

Qual é a sua pergunta favorita na hora de contratar alguém?`,
        hashtags: ['#BelmirMenegatti', '#Contratacao', '#GestaoDePessoas', '#LiderancaAutentica', '#CulturaEmpresarial'],
        status: 'Planejado',
        conteudo_reels: {
          duracao_alvo: '34s',
          tom: 'Prático, sagaz, humano e sem firulas',
          cenas: [
            {
              cena_numero: 1,
              tempo: '00:00 - 00:07',
              descricao_cena: 'Belmir segura uma pasta de documentos, fecha e coloca sobre a mesa lateral com um sorriso de experiência.',
              plano: 'Plano médio em movimento suave',
              fala_ator: 'Eu parei de contratar pessoas pelo currículo há mais de quinze anos. E vou te contar o porquê.',
              b_roll: [
                'Visão rápida de uma sala de reunião com equipe focada discutindo projeto'
              ],
              texto_tela: 'POR QUE PAREI DE CONTRATAR POR CURRÍCULO?',
              som: 'Passos calmos em piso de madeira, voz natural'
            },
            {
              cena_numero: 2,
              tempo: '00:08 - 00:20',
              descricao_cena: 'Belmir olha direto para a câmera, gesticulando com a mão aberta.',
              plano: 'Primeiro plano com fundo levemente desfocado',
              fala_ator: 'Currículo bem escrito qualquer um faz. O que eu quero saber em quinze minutos de conversa é simples: como essa pessoa se comporta quando dá tudo errado e o plano inicial falha?',
              b_roll: [
                'Aperto de mão firme entre dois profissionais no canteiro',
                'Engenheiro jovem anotando orientações atentamente'
              ],
              texto_tela: 'COMO VOCÊ REAGE QUANDO O PLANO FALHA?',
              som: 'Subida suave de violão discreto'
            },
            {
              cena_numero: 3,
              tempo: '00:21 - 00:28',
              descricao_cena: 'Belmir apoia as mãos na cintura, com olhar perspicaz.',
              plano: 'Plano médio com iluminação natural lateral',
              fala_ator: 'Se ele joga a culpa na equipe, no tempo ou no cliente, eu já sei que não serve. Mas se ele assume a responsabilidade e traz a solução, eu trago para o time na hora.',
              b_roll: [
                'Equipe trabalhando unida com capacetes'
              ],
              texto_tela: 'AUTORRESPONSABILIDADE > DIPLOMA NA PAREDE',
              som: 'Trilha envolvente'
            }
          ],
          fechamento: {
            plano: 'Belmir sorri com franqueza',
            fala_ator: 'Gente boa atrai gente boa. Essa é a regra.',
            texto_tela_logo: 'Belmir Menegatti | Gestão & Pessoas',
            cta_sutil: 'Você concorda? Compartilhe com quem também lidera equipes.'
          }
        }
      }
    ]
  }
};
