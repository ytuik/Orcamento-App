import React, {useMemo} from 'react';
import type { TransactionDto } from '../../../../types/transactionDto';
import { TransactionItem } from '../../../../components/transactions/TransactionItem/TransactionItem.tsx';
import {useNavigate} from "react-router-dom";
import {useCategoryData} from "../../../../hooks/useCategoryData.ts";
import {useAccounts} from "../../../../hooks/useAccounts.ts";
import clsx from "clsx";

interface TransactionListProps {
    transactions: TransactionDto[];
    maxItems?: number;
    title?: string;
    emptyStateMessage?: string;
    className?: string
}

export const TransactionList: React.FC<TransactionListProps> = ({
                                                                    transactions,
                                                                    maxItems = 10,
                                                                    title = "Últimas Transações",
                                                                    emptyStateMessage = "Nenhuma movimentação este mês.",
                                                                    className
                                                                }) => {

    const displayedTransactions = transactions.slice(transactions.length - maxItems, transactions.length).reverse();
    const hasTransactions = displayedTransactions.length > 0;
    const navigate = useNavigate()

    const { allCategories } = useCategoryData();
    const { allAccounts} = useAccounts()

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

    return (
        <div
            className={clsx(
                "bg-zinc-900 border-f border-zinc-700 rounded-md p-4",
                className
            )}
            role="region"
            aria-label="Lista de transações"
        >
            <div className="d-flex justify-content-between align-items-center mb-4">
                <h5 className="text-white fw-bold mb-0">{title}</h5>
                <button
                    onClick={() => navigate('/transactions')}
                    className="btn btn-outline-secondary text-zinc-400 text-decoration-none btn-sm hover-text-zinc-100"
                    aria-label="Ver todas as transações"
                >
                    Ver todas
                </button>
            </div>

            <div
                className="scroll-container scroll-container-xl pe-2"
                role="list"
                aria-label="Itens da transação"
            >
                {hasTransactions ? (
                    displayedTransactions.map((transaction) => (
                        <div className={'pb-2'}>
                            <TransactionItem
                                key={transaction.id}
                                data={transaction}
                                category={categoryMap.get(transaction.categoryId) || null}
                                account={accountsMap.get(transaction.accountId) || null}
                                onDelete={() => {}}
                                onEdit={() => {}}
                                actionButtonsVisible={false}
                            />
                        </div>

                    ))
                ) : (
                    <div
                        className="text-center py-5"
                        role="status"
                        aria-label="Estado vazio"
                    >
                        <div className="mb-3">
                            <i
                                className="bi bi-receipt empty-state-icon"
                                aria-hidden="true"
                            />
                        </div>
                        <p className="text-zinc-400 mb-0">{emptyStateMessage}</p>
                    </div>
                )}
            </div>
        </div>
    );
};