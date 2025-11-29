import type { TransactionTypeString} from "./transactionType.ts";

export interface TransactionDto {
    id: number;
    accountId: number;
    amount: number;
    type: TransactionTypeString;
    transactionDate: string,
    categoryId: number,
    description: string;
    comment: string | null;
}

export interface CreateTransactionDto {
    accountId: number;
    amount: number;
    type: TransactionTypeString;
    categoryId: number,
    transactionDate: string,
    description: string;
    comment?: string | null;
}
