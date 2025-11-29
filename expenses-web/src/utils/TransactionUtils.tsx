import { TransactionCategory } from '../types/transactionDto/transactionCategory.ts';

const categoryLabelMap: Record<TransactionCategory, string> = {
    [TransactionCategory.SHOPPING]: 'Compras',
    [TransactionCategory.FOOD]: 'Alimentação',
    [TransactionCategory.TRANSPORT]: 'Transporte',
    [TransactionCategory.UTILITIES]: 'Casa & Utilidades',
    [TransactionCategory.SALARY]: 'Salário',
    [TransactionCategory.ENTERTAINMENT]: 'Entretenimento',
    [TransactionCategory.HEALTHCARE]: 'Saúde',
    [TransactionCategory.EDUCATION]: 'Educação',
    [TransactionCategory.INVESTMENT]: 'Investimentos',
    [TransactionCategory.OTHER]: 'Geral',
} as const;

export const getCategoryOptions = () => {
    return Object.values(TransactionCategory).map(value => ({
        value,
        label: categoryLabelMap[value]
    }));
};

export const getCategoryEnum = (categoryString: string): TransactionCategory => {
    return Object.values(TransactionCategory).includes(categoryString as TransactionCategory)
        ? categoryString as TransactionCategory
        : TransactionCategory.OTHER;
};

export const getCategoryLabel = (categoryString: string): string => {
    try {
        const categoryEnum = getCategoryEnum(categoryString);
        return categoryLabelMap[categoryEnum];
    } catch (error) {
        console.error('Error getting category label:', error);
        return categoryLabelMap[TransactionCategory.OTHER];
    }
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