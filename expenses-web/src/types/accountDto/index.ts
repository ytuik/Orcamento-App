export interface AccountDto {
    id: number;
    name: string;
    isActive: boolean;
    currentBalance: number;
    createdAt: string;
    updatedAt: string | null;
}

export interface CreateAccountDto {
    name: string;
    balance: number;
}