import React, {useMemo} from 'react';
import type { TransactionDto } from '../../../../types/transactionDto';
import { TransactionItem } from '../../../../components/transactions/TransactionItem/TransactionItem.tsx';
import './TransactionList.scss';
import {useNavigate} from "react-router-dom";
import {useCategoryData} from "../../../../hooks/useCategoryData.ts";
import {useAccounts} from "../../../../hooks/useAccounts.ts";

interface TransactionListProps {
    transactions: TransactionDto[];
    maxItems?: number;
    title?: string;
    emptyStateMessage?: string;
}

export const TransactionList: React.FC<TransactionListProps> = ({
                                                                    transactions,
                                                                    maxItems = 10,
                                                                    title = "Últimas Transações",
                                                                    emptyStateMessage = "Nenhuma movimentação este mês."
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
            className="transaction-list-container h-100"
            role="region"
            aria-label="Lista de transações"
        >
            <div className="d-flex justify-content-between align-items-center mb-4 transaction-list-header">
                <h5 className="text-white fw-bold mb-0">{title}</h5>
                    <button
                        onClick={() => navigate('/transactions')}
                        className="btn btn-link text-muted-custom text-decoration-none btn-sm"
                        aria-label="Ver todas as transações"
                    >
                        Ver todas
                    </button>
            </div>

            <div
                className="list-wrapper"
                role="list"
                aria-label="Itens da transação"
            >
                {hasTransactions ? (
                    displayedTransactions.map((transaction) => (
                        <TransactionItem
                            data={transaction}
                            category={categoryMap.get(transaction.categoryId) || null}
                            account={accountsMap.get(transaction.accountId) || null}
                            onDelete={() => {}}
                            onEdit={() => {}}
                            actionButtonsVisible={false}
                        />
                    ))
                ) : (
                    <div
                        className="empty-state text-center py-5"
                        role="status"
                        aria-label="Estado vazio"
                    >
                        <div className="mb-3 text-zinc-600">
                            <i
                                className="bi bi-receipt"
                                style={{ fontSize: '2rem' }}
                                aria-hidden="true"
                            />
                        </div>
                        <p className="text-muted-custom mb-0">{emptyStateMessage}</p>
                    </div>
                )}
            </div>
        </div>
    );
};