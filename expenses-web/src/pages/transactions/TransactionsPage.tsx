import { useEffect, useMemo } from "react";
import { useInView } from "react-intersection-observer";
import { format, isThisWeek, isToday, isYesterday, parseISO } from "date-fns"; // Importe parseISO
import { ptBR } from "date-fns/locale";

import { useTransactionData } from "../../hooks/useTransactionData";
import { useCategoryData } from "../../hooks/useCategoryData";
import { TransactionFilters } from "./components/TransactionFilters";
import { TransactionItem } from "./components/TransactionItem";

import './TransactionsPage.scss';
import type {TransactionDto} from "../../types/transactionDto";
import {useAccounts} from "../../hooks/useAccounts.ts";

type TransactionGroup = {
    title: string;
    items: TransactionDto[];
}

export const TransactionsPage = () => {
    const {
        transactions,
        filters,
        setFilters,
        setDateFilterType,
        clearFilters,
        fetchNextPage,
        hasNextPage,
        isLoading,
        isSearchMode,
        error,
        isError,
        refetch
    } = useTransactionData();

    const { allCategories } = useCategoryData();
    const {allAccounts} = useAccounts()

    const { ref, inView } = useInView({
        threshold: 0.1,
        rootMargin: '100px',
    });

    useEffect(() => {
        if (inView && hasNextPage && !isLoading) {
            fetchNextPage();
        }
    }, [inView, hasNextPage, isLoading, fetchNextPage]);

    const accountsMap = useMemo(() => {
        const map = new Map();
        allAccounts.forEach(acc => map.set(acc.id, acc));
        return map;

    }, [allAccounts])

    const categoryMap = useMemo(() => {
        const map = new Map();
        allCategories.forEach(cat => map.set(cat.id, cat));
        return map;
    }, [allCategories]);

    const groupedTransactions = useMemo(() => {
        const sortedTransactions = [...transactions].sort((a, b) =>
            parseISO(b.transactionDate).getTime() - parseISO(a.transactionDate).getTime()
        );

        const groups: TransactionGroup[] = [];

        sortedTransactions.forEach(t => {
            const date = parseISO(t.transactionDate); // Correção Crítica de Fuso
            let header = "";

            if (isToday(date)) {
                header = 'Hoje';
            } else if (isYesterday(date)) {
                header = 'Ontem';
            } else if (isThisWeek(date)) {
                header = 'Esta Semana';
            } else {
                header = format(date, "MMMM yyyy", { locale: ptBR });
            }

            const lastGroup = groups[groups.length - 1];

            if (lastGroup && lastGroup.title === header) {
                lastGroup.items.push(t);
            } else {
                groups.push({ title: header, items: [t] });
            }
        });

        return groups;
    }, [transactions]);

    if (isError) {
        return (
            <div className="transaction-page container">
                <div className="flex flex-col items-center justify-center py-10 gap-4">
                    <h2 className="text-xl font-semibold text-zinc-100">Erro ao carregar transações</h2>
                    <p className="text-zinc-400">{error?.message || "Ocorreu um erro inesperado"}</p>
                    <div className="flex gap-2">
                        <button onClick={() => refetch()} className="px-4 py-2 bg-violet-600 rounded text-white hover:bg-violet-700 transition">
                            Tentar novamente
                        </button>
                        <button onClick={clearFilters} className="px-4 py-2 bg-zinc-800 rounded text-zinc-300 hover:bg-zinc-700 transition">
                            Limpar filtros
                        </button>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="transaction-page container">

            <div className="header-section">
                <h1>Transações</h1>
                <p>Extrato completo de movimentações</p>
            </div>

            <TransactionFilters
                filters={filters}
                setFilters={setFilters}
                setDateFilter={setDateFilterType}
                clearFilters={clearFilters}
                categories={allCategories}
            />

            <div className="list-container">
                {groupedTransactions.map((group) => (
                    <div key={group.title} className="group-section">
                        <h3 className="group-header capitalize">{group.title}</h3>
                        <div className="group-items">
                            {group.items.map(t => (
                                <TransactionItem
                                    key={t.id}
                                    data={t}
                                    category={categoryMap.get(t.categoryId) || null}
                                    account={accountsMap.get(t.accountId) || null}
                                />
                            ))}
                        </div>
                    </div>
                ))}

                <div
                    ref={ref}
                    className="loading-sentinel"
                    role="status"
                    aria-live="polite"
                >
                    {isLoading && (
                        <div className="flex justify-center py-4">
                            <span className="loader">Carregando...</span>
                        </div>
                    )}

                    {!hasNextPage && !isLoading && transactions.length > 0 && !isSearchMode &&
                        <p className="end-text">Você chegou ao fim da lista.</p>
                    }

                    {!isLoading && transactions.length === 0 &&
                        <div className="empty-state">
                            <p className="empty-title">Nenhuma transação encontrada</p>
                            <p className="empty-subtitle">Tente ajustar os filtros ou busque por outro termo.</p>
                        </div>
                    }
                </div>
            </div>
        </div>
    );
};