import { useEffect, useMemo } from "react";
import { useInView } from "react-intersection-observer";
import { format, isThisWeek, isToday, isYesterday } from "date-fns";
import { ptBR } from "date-fns/locale";

import { useTransactionData } from "../../hooks/useTransactionData";
import { useCategoryData } from "../../hooks/useCategoryData";
import { TransactionFilters } from "./components/TransactionFilters";
import { TransactionItem } from "./components/TransactionItem";

import './TransactionsPage.scss';

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

    const { ref, inView } = useInView({
        threshold: 0.1,
        rootMargin: '100px',
    });

    useEffect(() => {
        if (inView && hasNextPage && !isLoading) {
            fetchNextPage();
        }
    }, [inView, hasNextPage, isLoading, fetchNextPage]);

    const groupedTransactions = useMemo(() => {
        const groups: Record<string, typeof transactions> = {};

        // Sort by date descending
        const sortedTransactions = [...transactions].sort((a, b) =>
            new Date(b.transactionDate).getTime() - new Date(a.transactionDate).getTime()
        );

        sortedTransactions.forEach(t => {
            const date = new Date(t.transactionDate);
            let groupKey: string;

            if (isToday(date)) {
                groupKey = 'today';
            } else if (isYesterday(date)) {
                groupKey = 'yesterday';
            } else if (isThisWeek(date)) {
                groupKey = `week-${format(date, 'w-yyyy')}`;
            } else {
                groupKey = format(date, 'MM-yyyy');
            }

            if (!groups[groupKey]) {
                groups[groupKey] = [];
            }
            groups[groupKey].push(t);
        });

        const displayGroups: Record<string, typeof transactions> = {};

        Object.entries(groups).forEach(([key, items]) => {
            const sampleDate = new Date(items[0].transactionDate);
            let displayHeader: string;

            if (key === 'today') {
                displayHeader = 'Hoje';
            } else if (key === 'yesterday') {
                displayHeader = 'Ontem';
            } else if (key.startsWith('week-')) {
                displayHeader = 'Esta Semana';
            } else {
                displayHeader = format(sampleDate, "MMMM yyyy", { locale: ptBR });
            }

            displayGroups[displayHeader] = items;
        });

        return displayGroups;
    }, [transactions]);

    if (isError) {
        return (
            <div className="transaction-page container">
                <div className="error-state">
                    <h2>Erro ao carregar transações</h2>
                    <p>{error?.message || "Ocorreu um erro inesperado"}</p>
                    <div className="error-actions">
                        <button onClick={() => refetch()} className="button primary">
                            Tentar novamente
                        </button>
                        <button onClick={clearFilters} className="button secondary">
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
                {Object.entries(groupedTransactions).map(([header, items]) => (
                    <div key={header} className="group-section">
                        <h3 className="group-header capitalize">{header}</h3>
                        <div className="group-items">
                            {items.map(t => (
                                <TransactionItem key={t.id} data={t}/>
                            ))}
                        </div>
                    </div>
                ))}

                <div ref={ref}
                     className="loading-sentinel"
                     role="status"
                     aria-live="polite"
                     aria-label="Carregando transações"
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