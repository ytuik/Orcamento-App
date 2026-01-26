import type {AvailableColorsTypeString} from "@/types/common/AvailableColorsType.ts";

export interface AccountDto {
    id: number;
    name: string;
    isActive: boolean;
    currentBalance: number;
    color: AvailableColorsTypeString;
    createdAt: string;
    updatedAt: string | null;
}

export interface CreateAccountDto {
    name: string;
    balance: number;
    color: AvailableColorsTypeString;
}