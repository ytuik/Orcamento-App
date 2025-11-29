// types/CategoryDto.ts

import type {TransactionTypeString} from "../transactionDto/transactionType.ts";

export interface CategoryDto {
    id: number;
    name: string;
    iconKey: string;
    color: string;
    type: TransactionTypeString;
    isSystem: boolean;
    isActive: boolean;
    budgetLimit?: number;
}

export interface CreateCategoryDto {
    name: string;
    iconKey: string;
    color: string;
    type: TransactionTypeString;
    budgetLimit?: number;
}