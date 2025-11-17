import {apiRequest} from "../lib/apiClient.ts";
import type {AccountDto, CreateAccountDto} from "../types/accountDto";

const API_URL = '/api/account';

const getAllAccounts = (): Promise<AccountDto[]> => {
    return apiRequest<AccountDto[]>(API_URL, 'GET');
};

const getAccountById = (id: number): Promise<AccountDto> => {
    return apiRequest<AccountDto>(`${API_URL}/${id}`, 'GET');
};

const createAccount = (accountData: CreateAccountDto): Promise<AccountDto> => {
    return apiRequest<AccountDto>(API_URL, 'POST', accountData);
};

const deactivateAccount = (id: number): Promise<AccountDto> => {
    return apiRequest<AccountDto>(`${API_URL}/${id}/deactivate`, 'PATCH');
}

const healthCheck = (): Promise<string> => {
    return apiRequest<string>(`${API_URL}/health`, 'GET');
}

export const accountApi = {
    getAllAccounts,
    getAccountById,
    createAccount,
    deactivateAccount,
    healthCheck
}