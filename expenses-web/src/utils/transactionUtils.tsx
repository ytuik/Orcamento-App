import React from 'react';
import { TransactionCategory } from '../types/transactionDto/transactionCategory.ts';
import {Car, Heart, Home, ShoppingBag, Utensils, Zap} from "lucide-react";

interface CategoryConfig {
    icon: React.ReactNode;
    color: 'green' | 'blue' | 'purple' | 'yellow' | 'pink' | 'red' | 'gray';
    label: string;
}

export const categoryMap: Record<TransactionCategory, CategoryConfig> = {
    [TransactionCategory.FOOD]: { icon: <Utensils size={20} />, color: 'green', label: 'Alimentação'},
    [TransactionCategory.TRANSPORT]: { icon: <Car size={20} />, color: 'blue', label: 'Transporte'},
    [TransactionCategory.SHOPPING]: { icon: <ShoppingBag size={20} />, color: 'purple', label: 'Compras'},
    [TransactionCategory.UTILITIES]: { icon: <Zap size={20} />, color: 'yellow', label: 'Casa & Utilidades'},
    [TransactionCategory.ENTERTAINMENT]: { icon: <Heart size={20} />, color: 'pink', label: 'Entretenimento'},
    [TransactionCategory.OTHER]: { icon: <Home size={20} />, color: 'purple', label: 'Geral'},
    [TransactionCategory.SALARY]: { icon: <Zap size={20} />, color: 'green', label: 'Salário'},
    [TransactionCategory.HEALTHCARE]: { icon: <Heart size={20} />, color: 'red', label: 'Saúde'},
    [TransactionCategory.EDUCATION]: { icon: <Zap size={20} />, color: 'blue', label: 'Educação'},
    [TransactionCategory.INVESTMENT]: { icon: <Zap size={20} />, color: 'purple', label: 'Investimentos'}
} as const;

export const getCategoryEnum = (categoryString: string): TransactionCategory => {
    return Object.values(TransactionCategory).includes(categoryString as TransactionCategory)
        ? categoryString as TransactionCategory
        : TransactionCategory.OTHER;
};

export const getCategoryConfig = (category: string): CategoryConfig => {
    const enumVal = getCategoryEnum(category);
    return categoryMap[enumVal];
};

export const getCategoryOptions = () => {
    return Object.values(TransactionCategory).map(value => ({
        value,
        label: categoryMap[value].label
    }));
};

export const formatTransactionDate = (dateString: string): string => {
    return new Date(dateString).toLocaleDateString('pt-BR', {
        day: '2-digit',
        month: 'short'
    });
};

export const isValidTransactionType = (type: string): boolean => {
    return type === 'INCOME' || type === 'EXPENSE';
};

export const isValidTransactionCategory = (category: string): boolean => {
    return Object.values(TransactionCategory).includes(category as TransactionCategory);
};