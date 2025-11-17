import type {TransactionType} from "./transactionType.ts";
import type {TransactionCategory} from "./transactionCategory.ts";

export interface TransactionDto {
    id: number;
    accountId: number;
    amount: number;
    type: TransactionType;
    transactionDate: string,
    category: TransactionCategory,
    description: string;
    comment: string | null;
}

export interface CreateTransactionDto {
    accountId: number;
    amount: number;
    type: number;
    transactionDate: Date,
    categoryId: number,
    description: string;
    comment?: string | null;
}
