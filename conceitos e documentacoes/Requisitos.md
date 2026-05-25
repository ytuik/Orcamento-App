# Documento de Requisitos — Orcamento App

**Versão:** 1.0  
**Data:** 2026-05-25  
**Tipo:** Aplicativo web de finanças pessoais para uso individual

---

## Visão Geral

Aplicativo web para acompanhamento financeiro pessoal do dia a dia. Permite registrar gastos, acompanhar saldos de contas, visualizar relatórios de gastos e controlar parcelamentos de cartão de crédito. Desenvolvido para um único usuário, sem necessidade de autenticação multi-usuário.

**Stack atual:** Kotlin/Spring Boot (backend) + React/TypeScript (frontend) + PostgreSQL

---

## Status das Features

| Símbolo | Significado |
|---|---|
| ✅ | Implementado |
| 🟡 | Parcialmente implementado |
| ❌ | Não implementado |
| 🔮 | Nice to have — sem prazo |

---

## Nível 1 — MVP (Essencial)

### RF-01 · Lançamento de Transações ✅

Registrar movimentações financeiras com os seguintes campos:

| Campo | Obrigatoriedade | Detalhes |
|---|---|---|
| Descrição | Obrigatório | Mín. 3, máx. 100 caracteres |
| Valor | Obrigatório | Maior que R$ 0,01 |
| Tipo | Obrigatório | Receita ou Despesa |
| Data | Obrigatório | Default: hoje. Não pode ser futura |
| Categoria | Obrigatório | Filtrada pelo tipo (Receita/Despesa) |
| Conta | Obrigatório | Conta de origem/destino |
| Comentário | Opcional | Campo livre de observação |

**Ações disponíveis:** Criar, Editar, Excluir.  
**UX:** Modal centralizado com toggle visual Receita/Despesa. Botão de salvar muda de cor conforme o tipo selecionado (verde = receita, vermelho = despesa).

---

### RF-02 · Gerenciamento de Contas 🟡

Gerenciar carteiras, contas bancárias e outros meios de pagamento.

**Campos da Conta:**
- Nome (obrigatório)
- Saldo Inicial (obrigatório, para quem já tem saldo ao começar)
- Cor do cartão (opcional — para identificação visual)

**Ações:** Criar, Editar nome e cor, Atualizar saldo base, Desativar (soft delete).  
**Lógica:** Saldo atual = Saldo inicial + Σ(Receitas) − Σ(Despesas). Nunca persistido diretamente — sempre calculado.

**Pendente de implementação:** modal de criação/edição no frontend.

---

### RF-03 · Categorização ✅

Gerenciar categorias para classificar transações.

**Campos da Categoria:**
- Nome
- Ícone (chave do ícone da biblioteca Lucide)
- Cor
- Tipo (Receita ou Despesa)
- Limite de orçamento (opcional — usado em RF-06)
- Ativo/Inativo

**Regras:**
- Categorias de sistema (`isSystem = true`) vêm pré-cadastradas e não podem ser excluídas.
- Categorias são filtradas por tipo no formulário de transação.

**Pendente de implementação:** página de gerenciamento de categorias no frontend.

---

### RF-04 · Gerenciamento de Cartão de Crédito / Parcelamentos ❌

**Prioridade alta — maior feature pendente do MVP.**

#### RF-04.1 · Lançamento de Compras Parceladas
Ao registrar uma despesa no cartão de crédito, o usuário pode informar que a compra é parcelada:
- Campo: "É parcelado?" (sim/não)
- Campo: "Em quantas vezes?" (ex: 10)
- O sistema gera automaticamente 1 lançamento na fatura atual + (N-1) pré-lançamentos nas faturas futuras.
- Exemplo: R$ 2.000 em 10x → R$ 200 no mês atual + R$ 200 em cada um dos próximos 9 meses.

#### RF-04.2 · Visão de Fatura
Tela dedicada para visualizar faturas do cartão:
- Navegar entre meses (fatura atual, meses futuros)
- Ver o total comprometido em cada fatura (parcelas futuras já lançadas)
- Distinguir entre lançamentos já efetivados e pré-lançamentos

---

### RF-05 · Dashboard / Visão Geral 🟡

Tela principal com visão rápida da saúde financeira do mês.

**Componentes implementados:**
- Seletor de mês (navegar entre meses anteriores e futuros)
- 3 cards de resumo: Saldo do Mês, Total de Receitas, Total de Despesas
- Carrossel horizontal de contas com saldo atual
- Lista das últimas transações do mês
- Gráfico de rosca (donut) de gastos por categoria — clicável, navega para Extratos filtrado

**Pendente de implementação:**
- Widget "Contas Fixas do Mês": total de despesas recorrentes pagas no período
- Widget "Cartão de Crédito": box mostrando Fatura Atual e Próxima Fatura (depende de RF-04)

---

## Nível 2 — Controle e Hábito

### RF-06 · Limites de Gastos por Categoria 🟡

Definir um teto de gastos por categoria e acompanhar o progresso visualmente.

**Comportamento esperado:**
- No Dashboard ou em Relatórios: barra de progresso por categoria mostrando "R$ 150,00 de R$ 400,00"
- Alerta visual quando o gasto se aproximar ou ultrapassar o limite

**Status:** campo `budgetLimit` já existe na entidade `Category` no backend. Falta a UI de acompanhamento.

---

### RF-07 · Relatórios Visuais 🟡

Página dedicada de relatórios financeiros.

**Relatórios planejados:**
- Gastos por categoria (gráfico de pizza/rosca) — já existe parcialmente no Dashboard
- Evolução de receitas vs. despesas ao longo dos meses
- Categorias que mais consumiram o orçamento

---

### RF-08 · Lembretes de Lançamento ❌

Notificação (push ou in-app) em horário configurável para lembrar o usuário de registrar os gastos do dia.

**Comportamento:**
- Horário padrão: 20h
- Configurável pelo usuário
- Mensagem: "E aí, algum gasto para lançar hoje?"
- Objetivo: criar hábito diário de registro

---

### RF-09 · Transações Recorrentes (Contas a Pagar) ❌

Cadastrar despesas fixas que se repetem mensalmente (Aluguel, Luz, Internet, etc.).

**Fluxos possíveis:**
- Lançamento automático todo mês na data configurada
- Ou: lembrete mensal para o usuário confirmar o pagamento

---

## Nível 3 — Personalização

### RF-10 · Controle de Empréstimos / Contas a Receber ❌

Área para registrar valores emprestados a terceiros.

**Campos:** Descrição, Valor, Data, Nome do devedor  
**Ações:** Registrar, Marcar como "Recebido" (a receita entra na conta automaticamente)  
**Objetivo:** retirar esse controle de bloco de notas / memória e centralizar no app.

---

## Feature Nova — Gastos Pendentes

### RF-11 · Fila de Revisão de Gastos Pendentes ❌

Registrar gastos em estado "pendente" para revisão e aprovação posterior. Desenhada para suportar futura automação via captura de notificações do celular.

#### RF-11.1 · Criação de Gasto Pendente
- No modal de Nova Transação, toggle "Deixar como pendente"
- Campos obrigatórios reduzidos: apenas **Valor** e **Descrição**
- Categoria e Conta são opcionais — podem ser preenchidos na revisão

#### RF-11.2 · Impacto no Saldo
- Pendentes já afetam o saldo, mas de forma sinalizada
- Exibição: "Saldo: R$ 1.000,00 *(R$ 200,00 pendentes)*"

#### RF-11.3 · Página de Revisão
- Rota dedicada (ex: `/pending`) com link na sidebar
- Lista todos os gastos pendentes em ordem cronológica
- Cada item exibe: valor, descrição, data, conta e categoria (se já preenchidos)

**Ações disponíveis por item:**

| Ação | Comportamento |
|---|---|
| Aprovar | O pendente se torna uma Transação normal |
| Editar + Aprovar | Abre formulário completo para ajustar campos opcionais; ao salvar já aprova |
| Rejeitar | Remove definitivamente (sem histórico) |
| Adiar | Mantém na fila sem ação |

#### RF-11.4 · Webhook de Automação (Fase Futura)
- Endpoint `POST /api/pending` público (ou com token fixo) para receber dados externos
- Um app externo captura a notificação do celular (ex: banco envia "Compra aprovada R$45,90") e chama o endpoint
- O sistema cria automaticamente um gasto pendente com os dados recebidos
- O usuário revisa e aprova pela página de revisão

---

## Nice to Have — Futuro sem prazo

### NTH-01 · Regras de Categorização Automática 🔮
Criar regras personalizadas que mapeiam estabelecimentos ou palavras-chave a categorias.  
Ex: qualquer transação com "iFood" → categoria "Alimentação".  
Especialmente útil quando o webhook de automação (RF-11.4) estiver ativo.

---

### NTH-02 · Orçamento (Budget) Mensal 🔮
Definir um limite de gastos **antes** do mês começar — total e/ou por categoria.  
Diferente de RF-06 (que monitora em relação a um limite fixo na categoria): este é um planejamento proativo feito pelo usuário no início de cada mês.

---

### NTH-03 · Controle de Investimentos 🔮
Registrar e acompanhar aplicações financeiras (CDB, Ações, Tesouro Direto, Fundos) separadamente do saldo das contas correntes.  
Objetivo: visão completa do patrimônio total, não apenas do dinheiro disponível.

---

### NTH-04 · Metas com "Cofrinhos" Virtuais 🔮
Criar metas de economia com nome e valor-alvo (ex: "Viagem ao Japão — R$ 20.000").  
O usuário "deposita" valores virtualmente na meta, separando esse montante do saldo disponível para uso no dia a dia e acompanhando o progresso.

---

### NTH-05 · Gerenciador de Assinaturas 🔮
Lista centralizada de todas as assinaturas recorrentes (streaming, apps, serviços) com:
- Nome do serviço
- Valor e periodicidade (mensal/anual)
- Data de cobrança
- Total mensal de assinaturas

Objetivo: combater "gastos invisíveis" que passam despercebidos mês a mês.  
Pode ser integrado com RF-09 (Transações Recorrentes) no futuro.

---

### NTH-06 · Backup & Exportação Local 🔮
Exportar todos os dados (transações, contas, categorias) para arquivo CSV ou JSON.  
Importar de volta para restaurar dados ou migrar entre ambientes.  
Objetivo: garantir que o usuário tenha autonomia sobre seus próprios dados e não fique refém do servidor.

---

## Resumo de Prioridades

```
Prioridade 1 — Corrigir o que está quebrado
  └─ Bugs no accountService (updateAccount, updateBalance)
  └─ Finalizar AccountFormModal (comentado)

Prioridade 2 — Completar o Nível 1
  └─ Página de Categorias (RF-03)
  └─ Cartão de Crédito / Parcelamentos (RF-04)
  └─ Dashboard: widgets de cartão e contas fixas (RF-05)

Prioridade 3 — Feature Nova
  └─ Gastos Pendentes / Fila de Revisão (RF-11)

Prioridade 4 — Nível 2
  └─ UI de Limites de Gastos por Categoria (RF-06)
  └─ Transações Recorrentes (RF-09)
  └─ Lembretes de Lançamento (RF-08)

Prioridade 5 — Nível 3
  └─ Controle de Empréstimos (RF-10)
  └─ Relatórios dedicados (RF-07)

Futuro sem prazo — Nice to Have
  └─ NTH-01 a NTH-06
```
