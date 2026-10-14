# 💰 Expenses Web

> Aplicação web moderna, intuitiva e responsiva para gestão financeira pessoal, controle de fluxo de caixa, orçamento e organização de contas e categorias.

---

## 📌 Sumário

- [Visão Geral e Propósito](#-visão-geral-e-propósito)
- [Principais Funcionalidades](#-principais-funcionalidades)
- [Tecnologias e Bibliotecas](#-tecnologias-e-bibliotecas)
- [Arquitetura e Padrões de Código](#-arquitetura-e-padrões-de-código)
- [Estrutura de Diretórios](#-estrutura-de-diretórios)
- [Guia de Execução Local](#-guia-de-execução-local)
- [Containerização com Docker](#-containerização-com-docker)
- [Variáveis de Ambiente e Integração](#-variáveis-de-ambiente-e-integração)
- [Rotas da Aplicação e Endpoints da API](#-rotas-da-aplicação-e-endpoints-da-api)
- [Scripts Disponíveis](#-scripts-disponíveis)

---

## 🎯 Visão Geral e Propósito

O **Expenses Web** é a interface frontend do ecossistema de orçamento pessoal. Ele foi concebido para entregar uma experiência de uso ágil e visualmente refinada (com tema *dark* elegante no estilo *zinc*), permitindo que o usuário tenha clareza total sobre suas finanças:

- Onde o dinheiro está sendo gasto;
- Quais categorias demandam maior atenção;
- O saldo real distribuído entre diferentes contas bancárias e carteiras;
- Um histórico detalhado de movimentações com busca instantânea e paginação contínua.

---

## ✨ Principais Funcionalidades

### 📊 1. Dashboard Financeiro
- **Métricas do Mês**: Resumo visual dos totais de saldo do mês, receitas (entradas) e despesas (saídas).
- **Navegação Temporal**: Transição fluida entre meses anteriores e posteriores com recálculo automático das métricas.
- **Gráfico Interativo de Gastos**: Gráfico de rosca (*Doughnut*) renderizado com Chart.js exibindo a fatia de cada categoria no orçamento.
- **Navegação a partir do Gráfico**: Ao clicar em uma fatia do gráfico ou na lista de categorias do dashboard, o usuário é direcionado diretamente para o extrato de transações com o filtro daquela categoria e mês pré-selecionado.
- **Carrossel de Contas**: Exibição dos saldos consolidados de cada conta bancária cadastrada com botão de acesso rápido à criação de novas contas.
- **Últimas Transações**: Listagem enxuta dos lançamentos mais recentes do mês em visualização.

### 💸 2. Gestão e Extrato de Transações
- **Modal Global de Lançamento**: Acesso rápido a qualquer momento pela barra lateral (*Sidebar*) para registrar uma nova despesa ou receita.
- **Scroll Infinito com Detecção de Viewport**: Paginação contínua mês a mês retroativo (até 24 meses) acionada automaticamente conforme a rolagem do usuário via Intersection Observer.
- **Filtros Avançados e Busca em Tempo Real**:
  - Busca textual com *debounce* de 500ms;
  - Filtro por tipo de movimentação (*Todas*, *Entradas/Receitas*, *Saídas/Despesas*);
  - Filtro por categoria específica;
  - Filtro de datas com múltiplos modos: *Todo o período*, *Por Mês/Ano específico*, *Data Exata* ou *Intervalo customizado (de/até)*.
- **Persistência de Filtros na URL**: Todos os filtros aplicados são sincronizados com a *Query String* da URL, permitindo recarregar a página sem perder o contexto filtrado e compartilhar links diretos de buscas.
- **Agrupamento Temporal Amigável**: Lançamentos agrupados visualmente por "Hoje", "Ontem", "Esta Semana" e "Mês e Ano".
- **Edição e Exclusão**: Modais para alteração dos dados da transação ou confirmação de exclusão com atualização otimizada do cache.

### 🏦 3. Gerenciamento de Contas Bancárias
- Listagem em formato de cartões com indicação de saldo atual formatado em padrão monetário nacional (BRL `R$`).
- Criação e edição de contas personalizando nome, saldo inicial e cor temática (azul, verde, roxo, vermelho, etc.) com pré-visualização em tempo real.
- Desativação / exclusão lógica de contas com atualização imediata no dashboard.

### 🏷️ 4. Gerenciamento de Categorias
- Divisão em abas entre categorias de **Despesa** e **Receita**.
- Personalização de nome, cor e ícone representativo (selecionável a partir de uma biblioteca visual de ícones).
- Definição de limite de orçamento mensal (*Budget Limit*) opcional por categoria.
- Proteção de integridade para categorias do sistema (`isSystem`), prevenindo exclusão acidental.

---

## 🛠️ Tecnologias e Bibliotecas

| Categoria | Tecnologia / Biblioteca | Versão | Propósito no Projeto |
| :--- | :--- | :--- | :--- |
| **Core** | [React](https://react.dev/) | `^19.2.0` | Biblioteca base para construção da interface de usuário. |
| **Linguagem** | [TypeScript](https://www.typescriptlang.org/) | `~5.9.3` | Tipagem estática rigorosa para segurança em tempo de compilação. |
| **Build Tool** | [Vite](https://vite.dev/) | `^7.2.2` | Ferramenta de build de alta performance com Fast Refresh e proxy em desenvolvimento. |
| **Roteamento** | [React Router DOM](https://reactrouter.com/) | `^7.9.6` | Gerenciamento de rotas SPA e controle de navegação com layouts. |
| **Server State & Cache** | [TanStack React Query](https://tanstack.com/query/latest) | `^5.90.10` | Cache de dados da API, `useInfiniteQuery`, mutações e sincronização de estado assíncrono. |
| **Devtools** | TanStack Query Devtools | `^5.90.2` | Painel de depuração de queries e cache em ambiente de desenvolvimento. |
| **Formulários** | [React Hook Form](https://react-hook-form.com/) | `^7.67.0` | Gerenciamento leve e performático de formulários sem re-renderizações desnecessárias. |
| **Validação** | [Zod](https://zod.dev/) | `^4.1.12` | Declaração de schemas e validação rigorosa de dados com inferência de tipos (`z.infer`). |
| **Integração Zod** | `@hookform/resolvers` | `^5.2.2` | Adaptador para conectar schemas do Zod ao React Hook Form. |
| **Comunicação HTTP** | [Axios](https://axios-http.com/) | `^1.13.2` | Cliente HTTP com suporte a interceptors (injeção de token JWT Bearer) e instâncias reutilizáveis. |
| **Gráficos** | [Chart.js](https://www.chartjs.org/) & `react-chartjs-2` | `^4.5.1` / `^5.3.1` | Renderização do gráfico de rosca interativo com tooltips customizados. |
| **Estilização** | [Sass](https://sass-lang.com/) | `^1.94.1` | Pré-processador SCSS para arquitetura de estilos modular e variáveis de tema. |
| **Base CSS** | [Bootstrap 5](https://getbootstrap.com/) | `^5.3.8` | Utilitários de grid, espaçamento e responsividade. |
| **Ícones** | [Lucide React](https://lucide.dev/) & [Bootstrap Icons](https://icons.getbootstrap.com/) | `^0.555.0` / `^1.13.1` | Conjunto abrangente de ícones modernos para navegação, categorias e ações. |
| **Animações** | [Framer Motion](https://www.framer.com/motion/) | `^12.23.24` | Animações dinâmicas nas barras de progresso do dashboard e transições. |
| **Notificações** | [Sonner](https://sonner.emilkowal.ski/) | `^2.0.7` | Notificações em formato Toast modernas e estilizadas no tema *dark*. |
| **Datas** | [date-fns](https://date-fns.org/) | `^4.1.0` | Manipulação e formatação robusta de datas com suporte ao locale `pt-BR`. |
| **Scroll / Viewport** | `react-intersection-observer` | `^10.0.0` | Gatilho para carregamento de páginas adicionais no scroll infinito. |
| **Utilitários de Classe** | `clsx` & `classnames` | `^2.1.1` / `^2.5.1` | Concatenação condicional de classes CSS. |

---

## 🏛️ Arquitetura e Padrões de Código

O projeto segue princípios de **Clean Architecture**, alta coesão e baixo acoplamento:

### 1. Camada de Comunicação HTTP (`src/lib/apiClient.ts`)
- Configuração centralizada do Axios com timeout padrão de 5s e cabeçalhos JSON.
- Interceptor de requisições que automaticamente injeta o token JWT (`Authorization: Bearer <token>`) a partir do `localStorage`.
- Função utilitária genérica `apiRequest<T>(url, method, data)` que garante tipagem estrita nas respostas.

### 2. Camada de Serviços (`src/services/`)
- Cada entidade de negócio (`accountService`, `transactionService`, `categoryService`) possui seu próprio serviço isolado.
- Os componentes e hooks nunca chamam o Axios diretamente; eles consomem apenas essa camada de serviço.

### 3. Camada de Estado e Cache (`src/hooks/`)
- Uso avançado do **TanStack React Query**:
  - `staleTime` global de 5 minutos configurado em `src/lib/queryClient.ts` para evitar requisições redundantes.
  - Atualizações otimizadas e manipulação direta de cache com `queryClient.setQueryData<InfiniteData<TransactionDto[]>>` nas mutações de criação, edição e exclusão de transações.
  - Invalidação automática e cruzada de queries (`invalidateQueries({ queryKey: ['accounts'] })` após registrar uma transação, garantindo que os saldos reflitam a movimentação imediatamente).
  - Hook `useDebounce` dedicado para evitar disparos desnecessários de pesquisa a cada tecla digitada.

### 4. Camada de Validação (`src/lib/validators/`)
- Schemas do **Zod** (`accountSchema.ts`, `transactionSchema.ts`) mantidos separados da interface visual.
- Mensagens de erro amigáveis em português e inferência de tipos TypeScript diretamente dos schemas (`z.infer<typeof schema>`).

### 5. Design System e SCSS Modular (`src/styles/`)
- Organização em camadas estruturadas:
  - `core/`: Variáveis de paleta de cores (Zinc 100-950, Emerald, Violet, Red), raios de borda, sombras e mixins utilitários (ex: scrollbars customizadas).
  - `base/`: Tipografia e animações globais.
  - `layout/`: Estilos da barra lateral fixa e regras de adaptação para diferentes tamanhos de tela.
  - `components/`: Estilos de cards, botões, formulários e widgets.
  - `utilities/`: Classes utilitárias temáticas e customizadas.

### 6. Componentes de UI Atômicos (`src/components/ui/`)
- Componente `Select` acessível e extensível implementado com React Context API e `forwardRef`, suportando posicionamento absoluto automático e fechamento ao clicar fora ou pressionar `Escape`.
- Componente `Modal` que utiliza `createPortal` anexado ao `document.body` e bloqueia o scroll da página enquanto aberto.

---

## 📂 Estrutura de Diretórios

```text
expenses-web/
├── public/                     # Arquivos estáticos públicos
├── src/
│   ├── app/
│   │   └── App.tsx             # Definição de rotas (BrowserRouter) e Toaster
│   ├── components/             # Componentes reutilizáveis
│   │   ├── accounts/           # Componentes específicos de contas (ex: AccountCard)
│   │   ├── icons/              # Componentes de ícones SVG customizados
│   │   ├── layout/             # Componentes de layout (MainLayout, Sidebar)
│   │   ├── transactions/       # Componentes de transação (TransactionItem, modais de form e delete)
│   │   └── ui/                 # Primitivas de UI (Modal, Card, Select, LoadingSpinner)
│   ├── hooks/                  # Hooks customizados para regras de negócio e dados
│   │   ├── useAccounts.ts
│   │   ├── useAccountMutations.ts
│   │   ├── useCategoryData.ts
│   │   ├── useDebounce.ts
│   │   ├── useTransactionData.ts
│   │   └── useTransactionMutations.ts
│   ├── lib/                    # Configurações de bibliotecas de terceiros
│   │   ├── apiClient.ts        # Instância Axios e interceptor de autenticação
│   │   ├── queryClient.ts      # Instância configurada do React Query
│   │   └── validators/         # Schemas de validação Zod
│   ├── pages/                  # Telas da aplicação (Rotas)
│   │   ├── accounts/           # Tela de listagem e gestão de contas
│   │   ├── categories/         # Tela de listagem e gestão de categorias
│   │   ├── dashboard/          # Tela principal (gráficos, resumos e carrossel)
│   │   │   ├── components/     # Subcomponentes do Dashboard (StatCard, MonthlySpendingSummary...)
│   │   │   └── hooks/          # Hook de agregação de dados do dashboard (useDashboardData)
│   │   └── transactions/       # Tela de extrato com filtros e scroll infinito
│   │       └── components/     # Subcomponentes de filtro de transação
│   ├── services/               # Camada de comunicação com a API backend
│   │   ├── accountService.ts
│   │   ├── categoryService.ts
│   │   └── transactionService.ts
│   ├── styles/                 # Folhas de estilo SCSS estruturadas
│   │   ├── base/               # Tipografia e animações
│   │   ├── components/         # Botões, cards, formulários e widgets
│   │   ├── core/               # Variáveis e mixins
│   │   ├── layout/             # Sidebar e responsividade
│   │   └── utilities/          # Cores de tema, espaçamentos e bordas
│   ├── types/                  # Tipagens e DTOs TypeScript
│   │   ├── accountDto/
│   │   ├── categoryDto/
│   │   ├── common/
│   │   └── transactionDto/
│   ├── utils/                  # Utilitários puros (formatadores de moeda, datas, ícones)
│   ├── main.scss               # Arquivo mestre de estilos SCSS
│   └── main.tsx                # Ponto de entrada React com QueryClientProvider
├── Dockerfile.dev              # Configuração Docker para desenvolvimento com hot-reload
├── Dockerfile.prod             # Build multi-stage para produção com Nginx Alpine
├── nginx.conf                  # Configuração do Nginx com Gzip e proxy reverso para API
├── package.json                # Dependências e scripts do projeto
├── tsconfig.json               # Configurações do compilador TypeScript
└── vite.config.ts              # Configurações do Vite (porta 3000, alias `@`, proxy `/api`)
```

---

## 🚀 Guia de Execução Local

### Pré-requisitos
- [Node.js](https://nodejs.org/) versão **20+** (recomendado Node.js 22 LTS);
- [npm](https://www.npmjs.com/) ou gerenciador de pacotes equivalente;
- API backend em execução (por padrão em `http://localhost:8080` ou container `backend:8080`).

### Passo a Passo

1. **Clone o repositório e acesse a pasta:**
   ```bash
   git clone <URL_DO_REPOSITORIO>
   cd expenses-web
   ```

2. **Instale as dependências:**
   ```bash
   npm install
   ```

3. **Inicie o servidor de desenvolvimento:**
   ```bash
   npm run dev
   ```

4. **Acesse a aplicação:**
   Abra o navegador em [http://localhost:3000](http://localhost:3000).

---

## 🐳 Containerização com Docker

O projeto já disponibiliza configurações prontas para desenvolvimento e produção com contêineres Docker.

### Ambiente de Desenvolvimento (Hot Reload)
Usa o `Dockerfile.dev` que monta a pasta e executa o servidor Vite com polling ativado:

```bash
docker build -f Dockerfile.dev -t expenses-web:dev .
docker run -p 3000:3000 -v $(pwd):/app -v /app/node_modules expenses-web:dev
```

### Ambiente de Produção (Nginx Alpine)
Usa o `Dockerfile.prod` com *multi-stage build*:
1. **Stage 1 (Builder)**: Compila o projeto TypeScript e gera o bundle estático minificado com `npm run build` na pasta `/dist`.
2. **Stage 2 (Runner)**: Serve os arquivos estáticos através do servidor Nginx Alpine ultraleve, com compressão Gzip ativa e headers de segurança HTTP.

```bash
docker build -f Dockerfile.prod -t expenses-web:prod .
docker run -p 80:80 expenses-web:prod
```

---

## ⚙️ Variáveis de Ambiente e Integração

O Vite está configurado para direcionar chamadas iniciadas em `/api` para o backend via proxy reverso.

| Variável | Valor Padrão | Descrição |
| :--- | :--- | :--- |
| `VITE_API_URL` | `http://backend:8080` | URL base do backend de API REST para onde as requisições `/api` são encaminhadas durante o desenvolvimento. |

Para customizar localmente sem Docker, basta definir no seu terminal ou criar um arquivo `.env`:
```env
VITE_API_URL=http://localhost:8080
```

---

## 🧭 Rotas da Aplicação e Endpoints da API

### Rotas no Navegador (SPA)
- `/` — **Dashboard**: Painel geral com indicadores, gráficos e carrossel de contas.
- `/transactions` — **Transações**: Extrato completo, filtros avançados e busca com rolagem infinita.
- `/accounts` — **Contas**: Gerenciamento de bancos, carteiras e saldos.
- `/categories` — **Categorias**: Gerenciamento de categorias de receita e despesa com limites de gastos.

### Endpoints da API REST Consumidos
| Domínio | Método | Endpoint | Descrição |
| :--- | :--- | :--- | :--- |
| **Contas** | `GET` | `/api/account` | Lista todas as contas cadastradas. |
| | `GET` | `/api/account/:id` | Obtém detalhes de uma conta por ID. |
| | `POST` | `/api/account` | Cria uma nova conta. |
| | `PATCH` | `/api/account/:id/edit` | Atualiza dados de uma conta existente. |
| | `PATCH` | `/api/account/:id/deactivate` | Desativa uma conta. |
| | `PATCH` | `/api/account/:id/balance` | Atualiza o saldo de uma conta. |
| **Categorias** | `GET` | `/api/category` | Lista todas as categorias. |
| | `GET` | `/api/category/type/:type` | Filtra categorias por tipo (`INCOME` ou `EXPENSE`). |
| | `POST` | `/api/category` | Cria uma nova categoria com ícone e cor. |
| | `PATCH` | `/api/category/:id` | Atualiza os dados de uma categoria. |
| | `PATCH` | `/api/category/:id/deactivate` | Desativa uma categoria. |
| **Transações** | `POST` | `/api/transaction` | Registra uma nova movimentação financeira. |
| | `GET` | `/api/transaction/:id` | Obtém dados de uma transação. |
| | `PATCH` | `/api/transaction/:id/update` | Atualiza dados de uma transação existente. |
| | `DELETE` | `/api/transaction/:id/delete` | Exclui uma transação. |
| | `GET` | `/api/transaction/search?...` | Busca filtrada com parâmetros de data, tipo, categoria e texto. |

---

## 📜 Scripts Disponíveis

No arquivo `package.json`, estão configurados os seguintes comandos:

- `npm run dev`: Inicializa o servidor de desenvolvimento na porta `3000` com HMR (*Hot Module Replacement*).
- `npm run build`: Executa a compilação do TypeScript (`tsc -b`) e o empacotamento para produção com o Vite (`vite build`).
- `npm run lint`: Executa a verificação estática de código com o ESLint.
- `npm run preview`: Inicia um servidor local para inspecionar a versão de produção gerada na pasta `dist/`.

---

## 💡 Próximas Evoluções (Roadmap)
- [ ] Módulo de **Cartão de Crédito** (Faturas, limite disponível e parcelamentos).
- [ ] Exportação de extratos e relatórios em PDF / CSV.
- [ ] Metas de economia com acompanhamento de evolução mensal.
