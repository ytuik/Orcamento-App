import React from 'react';
import clsx from 'clsx';
import { formatCurrency } from '../../../../utils/formatCurrency';
import type { TransactionDto } from '../../../../types/transactionDto';
import { TransactionType } from '../../../../types/transactionDto/transactionType';
import { CategoryIcon } from '../../../../components/icons/CategoryIcons';
import {format} from "date-fns";
import {ptBR} from "date-fns/locale";
import {useCategory} from "../../../../hooks/useCategory.ts";

interface TransactionItemProps {
    transaction: TransactionDto;
}

export const TransactionItem: React.FC<TransactionItemProps> = ({ transaction }) => {
    const isExpense = transaction.type === TransactionType.EXPENSE;
    const transactionDate = new Date(transaction.transactionDate);

    const formattedDate = format(transactionDate, "dd 'de' MMM", { locale: ptBR })

    const {allCategories} = useCategory();
    const categoryLabel = allCategories.find(c => c.id === transaction.categoryId)?.name || 'Categoria Desconhecida';
    return (
        <div
            className="transaction-item d-flex align-items-center justify-content-between py-3"
            role="listitem"
        >
            <div className="d-flex align-items-center gap-3">
                <CategoryIcon
                    categoryId={transaction.categoryId}
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