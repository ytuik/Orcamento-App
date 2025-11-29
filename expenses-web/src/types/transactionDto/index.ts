import type { TransactionTypeString} from "./transactionType.ts";
import type { TransactionCategoryType} from "./transactionCategory.ts";

export interface TransactionDto {
    id: number;
    accountId: number;
    amount: number;
    type: TransactionTypeString;
    transactionDate: string,
    category: TransactionCategoryType,
    description: string;
    comment: string | null;
}

export interface CreateTransactionDto {
    accountId: number;
    amount: number;
    type: TransactionTypeString;
    category: TransactionCategoryType,
    transactionDate: string,
    description: string;
    comment?: string | null;
}
