import {useEffect, useMemo, useState} from "react";
import { useInView } from "react-intersection-observer";
import { format, isThisWeek, isToday, isYesterday, parseISO } from "date-fns";
import { ptBR } from "date-fns/locale";

import { useTransactionData } from "../../hooks/useTransactionData";
import { useCategoryData } from "../../hooks/useCategoryData";
import {useTransactionMutations} from "../../hooks/useTransactionMutations.ts";
import {useAccounts} from "../../hooks/useAccounts.ts";

import { TransactionFilters } from "./components/TransactionFilters";
import { TransactionItem } from "../../components/transactions/TransactionItem/TransactionItem.tsx";
import {ConfirmDeleteTransactionModal} from "../../components/transactions/ConfirmDeleteTransactionModal/ConfirmDeleteTransactionModal.tsx";
import {TransactionFormModal} from "../../components/transactions/TransactionFormModal/TransactionFormModal.tsx";

import type {TransactionDto} from "../../types/transactionDto";
import './TransactionsPage.scss';

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

    const {remove} = useTransactionMutations()

    const { allCategories } = useCategoryData();
    const { allAccounts} = useAccounts()

    const { ref, inView } = useInView({
        threshold: 0.1,
        rootMargin: '100px',
    });

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

    useEffect(() => {
        if (inView && hasNextPage && !isLoading) {
            fetchNextPage();
        }
    }, [inView, hasNextPage, isLoading, fetchNextPage]);


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

    const [idToDelete, setIdToDelete] = useState<number | null>(null);
    const handleRequestDelete = (id: number) => {
        setIdToDelete(id)
    }
    const handleConfirmDelete = () => {
        if (idToDelete !== null) {
            remove.mutate(
                idToDelete,
                {
                    onSuccess: () => {
                        setIdToDelete(null)
                    }
            }
            )
        }
    }
    const handleCloseDeleteModal = () => {
        setIdToDelete(null);
}

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [transactionToEdit, setTransactionToEdit] = useState<TransactionDto | null>(null);

    const handleEditTransaction = (id: number) => {
        const transaction = transactions.find(t => t.id === id);
        if (transaction) {
            setTransactionToEdit(transaction);
            setIsModalOpen(true);
        }
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
        setTransactionToEdit(null);
    };

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
        <div className="transaction-page container min-vh-100 bg-zinc-950 text-zinc-100 p-6 p-lg-8">

            <div className="header-section mb-8">
                <h1 className={'fw-bold text-zinc-100 mb-2'}>Transações</h1>
                <p className={'text-zinc-500 fs-6'}>Extrato completo de movimentações</p>
            </div>

            <TransactionFilters
                filters={filters}
                setFilters={setFilters}
                setDateFilter={setDateFilterType}
                clearFilters={clearFilters}
                categories={allCategories}
            />

            <div className="list-container d-flex flex-column gap-5">
                {groupedTransactions.map((group) => (
                    <div key={group.title} className="group-section">
                        <h3 className="group-header group-header-base d-flex align-items-center gap-2 mb-4">{group.title}</h3>
                        <div className="group-items d-flex flex-column gap-3">
                            {group.items.map(t => (
                                <TransactionItem
                                    key={t.id}
                                    data={t}
                                    category={categoryMap.get(t.categoryId) || null}
                                    account={accountsMap.get(t.accountId) || null}
                                    onEdit={() => handleEditTransaction(t.id)}
                                    onDelete={() => handleRequestDelete(t.id)}
                                    actionButtonsVisible={true}
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


            <TransactionFormModal
                isOpen={isModalOpen}
                onClose={handleCloseModal}
                transactionToEdit={transactionToEdit}
            />

            {idToDelete && (
                <ConfirmDeleteTransactionModal
                    isOpen={!!idToDelete}
                    onClose={handleCloseDeleteModal}
                    onConfirm={handleConfirmDelete}
                    isLoading={remove.isPending} />
            )}
        </div>
    );
};