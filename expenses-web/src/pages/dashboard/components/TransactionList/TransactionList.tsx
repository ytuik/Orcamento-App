import React from 'react';
import type { TransactionDto } from '../../../../types/transactionDto';
import { TransactionItem } from './TransactionItem';
import './TransactionList.scss';

interface TransactionListProps {
    transactions: TransactionDto[];
    onViewAll?: () => void;
    maxItems?: number;
    title?: string;
    emptyStateMessage?: string;
}

export const TransactionList: React.FC<TransactionListProps> = ({
                                                                    transactions,
                                                                    onViewAll,
                                                                    maxItems = 10,
                                                                    title = "Últimas Transações",
                                                                    emptyStateMessage = "Nenhuma movimentação este mês."
                                                                }) => {
    const displayedTransactions = transactions.slice(0, maxItems);
    const hasTransactions = displayedTransactions.length > 0;

    return (
        <div
            className="transaction-list-container h-100"
            role="region"
            aria-label="Lista de transações"
        >
            <div className="d-flex justify-content-between align-items-center mb-4">
                <h5 className="text-white fw-bold mb-0">{title}</h5>

                {onViewAll && (
                    <button
                        onClick={onViewAll}
                        className="btn btn-link text-muted-custom text-decoration-none btn-sm"
                        aria-label="Ver todas as transações"
                    >
                        Ver todas
                    </button>
                )}
            </div>

            <div
                className="list-wrapper"
                role="list"
                aria-label="Itens da transação"
            >
                {hasTransactions ? (
                    displayedTransactions.map((transaction) => (
                        <TransactionItem
                            key={`transaction-${transaction.id}`}
                            transaction={transaction}
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