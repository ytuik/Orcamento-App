// types/CategoryDto.ts

import type {TransactionTypeString} from "../transactionDto/transactionType.ts";
import type {CategoryColorTypeString} from "./categoryColorType.ts";

export interface CategoryDto {
    id: number;
    name: string;
    iconKey: string;
    color: CategoryColorTypeString;
    type: TransactionTypeString;
    isSystem: boolean;
    isActive: boolean;
    budgetLimit?: number;
}

export interface CreateCategoryDto {
    name: string;
    iconKey: string;
    color: CategoryColorTypeString;
    type: TransactionTypeString;
    budgetLimit?: number;
}