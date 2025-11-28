import type { TransactionTypeString} from "./transactionType.ts";
import type { TransactionCategoryString} from "./transactionCategory.ts";

export interface TransactionDto {
    id: number;
    accountId: number;
    amount: number;
    type: TransactionTypeString;
    transactionDate: string,
    category: TransactionCategoryString,
    description: string;
    comment: string | null;
}

export interface CreateTransactionDto {
    accountId: number;
    amount: number;
    type: TransactionTypeString;
    category: TransactionCategoryString,
    transactionDate: string,
    description: string;
    comment?: string | null;
}
