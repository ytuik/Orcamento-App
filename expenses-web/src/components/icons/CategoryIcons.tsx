import React from "react";
import clsx from "clsx";
import {TransactionCategory} from "../../types/transactionDto/transactionCategory";


interface CategoryConfig {
    icon: string;
    label: string;
}

const categoryConfigMap: Record<TransactionCategory, CategoryConfig> = {
    [TransactionCategory.SHOPPING]: {
        icon: 'bi-bag',
        label: 'Compras'
    },
    [TransactionCategory.FOOD]: {
        icon: 'bi-basket-fill',
        label: 'Alimentação'
    },
    [TransactionCategory.TRANSPORT]: {
        icon: 'bi-bus-front',
        label: 'Transporte'
    },
    [TransactionCategory.UTILITIES]: {
        icon: 'bi-house',
        label: 'Casa & Utilidades'
    },
    [TransactionCategory.SALARY]: {
        icon: 'bi-cash-coin',
        label: 'Salário'
    },
    [TransactionCategory.ENTERTAINMENT]: {
        icon: 'bi-controller',
        label: 'Entretenimento'
    },
    [TransactionCategory.HEALTHCARE]: {
        icon: 'bi-heart-pulse',
        label: 'Saúde'
    },
    [TransactionCategory.EDUCATION]: {
        icon: 'bi-book',
        label: 'Educação'
    },
    [TransactionCategory.INVESTMENT]: {
        icon: 'bi-graph-up',
        label: 'Investimentos'
    },
    [TransactionCategory.OTHER]: {
        icon: 'bi-question-circle',
        label: 'Outros'
    },
};

const categoryColorMap: Record<TransactionCategory, string> = {
    [TransactionCategory.SHOPPING]: 'bg-primary',
    [TransactionCategory.FOOD]: 'bg-warning',
    [TransactionCategory.TRANSPORT]: 'bg-orange',
    [TransactionCategory.UTILITIES]: 'bg-info',
    [TransactionCategory.SALARY]: 'bg-success',
    [TransactionCategory.ENTERTAINMENT]: 'bg-primary',
    [TransactionCategory.HEALTHCARE]: 'bg-purple',
    [TransactionCategory.EDUCATION]: 'bg-info',
    [TransactionCategory.INVESTMENT]: 'bg-success',
    [TransactionCategory.OTHER]: 'bg-secondary',
};

interface CategoryIconProps {
    category: string;
    className?: string;
    size?: 'sm' | 'md' | 'lg';
}

export const CategoryIcon: React.FC<CategoryIconProps> = ({
                                                              category,
                                                              className,
                                                              size = 'md'
                                                          }) => {

    const categoryEnum = Object.values(TransactionCategory).includes(category as TransactionCategory)
        ? category as TransactionCategory
        : TransactionCategory.OTHER;

    const config = categoryConfigMap[categoryEnum] || categoryConfigMap[TransactionCategory.OTHER];
    const colorClass = categoryColorMap[categoryEnum] || categoryColorMap[TransactionCategory.OTHER];

    const sizeClasses = {
        sm: 'category-icon-sm',
        md: 'category-icon-md',
        lg: 'category-icon-lg'
    };

    return (
        <div
            className={clsx(
                "category-icon-wrapper",
                colorClass,
                sizeClasses[size],
                className
            )}
            title={config.label}
            aria-label={config.label}
            role="img"
        >
            <i className={`bi ${config.icon}`} aria-hidden="true" />
        </div>
    );
};