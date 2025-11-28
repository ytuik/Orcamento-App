import React from 'react';
import clsx from 'clsx';
import { formatCurrency } from '../../../../utils/formatCurrency';
import type { TransactionDto } from '../../../../types/transactionDto';
import { TransactionType } from '../../../../types/transactionDto/transactionType';
import { CategoryIcon } from '../../../../components/icons/CategoryIcons';
import { getCategoryLabel } from '../../../../utils/TransactionUtils.tsx';

interface TransactionItemProps {
    transaction: TransactionDto;
}

export const TransactionItem: React.FC<TransactionItemProps> = ({ transaction }) => {
    const isExpense = transaction.type === TransactionType.EXPENSE;

    const formattedDate = new Date(transaction.transactionDate).toLocaleDateString('pt-BR', {
        day: '2-digit',
        month: 'short'
    });

    const categoryLabel = getCategoryLabel(transaction.category);

    return (
        <div
            className="transaction-item d-flex align-items-center justify-content-between py-3"
            role="listitem"
        >
            <div className="d-flex align-items-center gap-3">
                <CategoryIcon
                    category={transaction.category}
                    size="md"
                />

                <div className="d-flex flex-column">
                    <span
                        className="fw-semibold text-white transaction-desc"
                        title={transaction.description}
                    >
                        {transaction.description}
                    </span>
                    <small
                        className="text-muted-custom transaction-date"
                        title={`${formattedDate} • ${categoryLabel}`}
                    >
                        {formattedDate} • {categoryLabel}
                    </small>
                </div>
            </div>

            <div
                className={clsx(
                    "fw-bold transaction-amount",
                    isExpense ? "text-expense" : "text-income"
                )}
                aria-label={`Valor: ${formatCurrency(transaction.amount)}`}
            >
                {isExpense ? "- " : "+ "}
                {formatCurrency(Math.abs(transaction.amount))}
            </div>
        </div>
    );
};