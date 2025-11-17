export const TransactionCategory = {
    FOOD: 1,
    TRANSPORT: 2,
    ENTERTAINMENT: 3,
    UTILITIES: 4,
    HEALTHCARE: 5,
    EDUCATION: 6,
    SHOPPING: 7,
    SALARY: 8,
    INVESTMENT: 9,
    OTHER: 10
} as const;

export type TransactionCategory = typeof TransactionCategory[keyof typeof TransactionCategory];