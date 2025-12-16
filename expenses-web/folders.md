src/
├── app/                     # Configuração central e provedores
│   ├── main.tsx             # Ponto de entrada, renderiza o App
│   ├── App.tsx              # Define Rotas e Provedores globais
│   └── routes.tsx           # Definição das rotas da aplicação
│
├── lib/                     # Configurações de bibliotecas e utilitários
│   ├── apiClient.ts         # Configuração do Axios (ou fetch) com base URL, interceptors
│   ├── queryClient.ts       # Instância do QueryClient do React Query
│   └── utils.ts             # Funções utilitárias (formatação de moeda, datas)
│
├── services/                # Camada de comunicação com a API (backend)
│   ├── accounts.api.ts      # Funções: getAccounts, createAccount, etc.
│   ├── transactions.api.ts  # Funções: getTransactions, createTransaction, etc.
│   ├── categories.api.ts    # Funções: getCategories, etc.
│   └── creditcard.api.ts    # Funções: getInvoices, payInvoice, etc.
│
├── store/                   # Estado global da UI (Zustand)
│   └── ui.store.ts          # Ex: isSidebarOpen, selectedMonth
│
├── types/                   # Tipos e interfaces globais (se houver)
│   └── index.ts             # Tipos de Transação, Conta, Categoria, etc.
│
├── components/              # Componentes de UI reusáveis
│   ├── ui/                  # Componentes do Shadcn (Button, Input, Card...)
│   ├── shared/              # Componentes específicos do app (ex: PageHeader)
│   └── layout/              # Componentes de layout (Sidebar, MainLayout)
│
└── features/                # O CORAÇÃO DO APP - Módulos de negócio
    │
    ├── dashboard/           # Feature 5: Dashboard
    │   ├── components/      # Widgets (TotalBalance, MonthlyChart, etc.)
    │   ├── hooks/           #
    │   │   └── useDashboardData.ts # Hook que busca e computa dados (RN 5.1, 5.2)
    │   └── DashboardPage.tsx  # A página do Dashboard
    │
    ├── transactions/        # Feature 1: Lançamento de Transações
    │   ├── components/      #
    │   │   ├── TransactionForm.tsx  # Formulário (React Hook Form + Zod)
    │   │   ├── TransactionsList.tsx # Lista de transações
    │   │   └── TransactionDialog.tsx # Modal para criar/editar
    │   ├── hooks/           #
    │   │   ├── useTransactionMutations.ts   # React Query (useQuery) para buscar transações
    │   │   └── useCreateTransaction.ts # React Query (useMutation) (RN 1, 2.3, 4.2)
    │   └── TransactionsPage.tsx # A página de transações
    │
    ├── accounts/            # Feature 2: Gerenciamento de Contas
    │   ├── components/      # AccountForm, AccountList
    │   ├── hooks/           # useAccounts, useCreateAccount
    │   └── AccountsPage.tsx   # A página de contas
    │
    ├── categories/          # Feature 3: Categorização
    │   ├── components/      # CategoryForm, CategoryList
    │   ├── hooks/           # useCategories, useCreateCategory
    │   └── CategoriesPage.tsx # A página de categorias
    │
    └── credit-card/         # Feature 4: Cartão de Crédito
        ├── components/      # InvoiceView, InstallmentFields
        ├── hooks/           # useInvoices
        └── InvoicesPage.tsx   # A página para ver faturas (RN 4.3)