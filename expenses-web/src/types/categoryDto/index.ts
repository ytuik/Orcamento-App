// types/CategoryDto.ts

import type {TransactionTypeString} from "../transactionDto/transactionType.ts";
import type {AvailableColorsTypeString} from "../common/AvailableColorsType.ts";

export interface CategoryDto {
    id: number;
    name: string;
    iconKey: string;
    color: AvailableColorsTypeString;
    type: TransactionTypeString;
    isSystem: boolean;
    isActive: boolean;
    budgetLimit?: number;
}

export interface CreateCategoryDto {
    name: string;
    iconKey: string;
    color: AvailableColorsTypeString;
    type: TransactionTypeString;
    budgetLimit?: number;
}