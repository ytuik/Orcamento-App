export interface AccountDto {
    id: number;
    name: string;
    isActive: boolean;
    createdAt: string;
    updatedAt: string | undefined;
}

export interface CreateAccountDto {
    name: string;
    balance: number;
}