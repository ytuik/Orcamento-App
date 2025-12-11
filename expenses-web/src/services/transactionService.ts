import {apiRequest} from "../lib/apiClient.ts";
import type {TransactionDto, CreateTransactionDto} from "../types/transactionDto";
import type {TransactionTypeString} from "../types/transactionDto/transactionType.ts";

const API_URL = '/api/transaction';

export interface TransactionFilterParams {
    startDate?: string,
    endDate?: string,
    searchTerms?: string,
    accountId?: number,
    categoryId?: number,
    type?: TransactionTypeString,
}

const createTransaction = (transactionData: CreateTransactionDto): Promise<TransactionDto> => {
    return apiRequest<TransactionDto>(API_URL, 'POST', transactionData);
}

const getTransactionById = (id: number): Promise<TransactionDto> => {
    return apiRequest<TransactionDto>(`${API_URL}/${id}`, 'GET');
}

const updateTransaction = (id: number, transactionData: TransactionDto): Promise<TransactionDto> => {
    return apiRequest<TransactionDto>(`${API_URL}/${id}/update`, 'PATCH', transactionData);
}

const deleteTransaction = (id: number): Promise<void> => {
    return apiRequest<void>(`${API_URL}/${id}/delete`, 'DELETE');
}

const searchTransactions = (params: TransactionFilterParams): Promise<TransactionDto[]> => {
    const queryParams = new URLSearchParams();

    if (params.startDate) queryParams.append('startDate', params.startDate);
    if (params.endDate) queryParams.append('endDate', params.endDate);
    if (params.searchTerms) queryParams.append('searchTerms', params.searchTerms);
    if (params.accountId) queryParams.append('accountId', params.accountId.toString());
    if (params.categoryId) queryParams.append('categoryId', params.categoryId.toString());
    if (params.type) queryParams.append('type', params.type);

    const queryString = queryParams.toString();
    const url = queryString ? `${API_URL}/search?${queryString}` : `${API_URL}/search`;

    return apiRequest<TransactionDto[]>(url, 'GET');
}

const getTransactionsByPeriod = (startDate: string, endDate: string): Promise<TransactionDto[]> => {
    return searchTransactions({ startDate, endDate });
};

export const transactionService = {
    createTransaction,
    getTransactionById,
    updateTransaction,
    deleteTransaction,
    searchTransactions,
    getTransactionsByPeriod,
};