import {apiRequest} from "../lib/apiClient.ts";
import type {TransactionDto, CreateTransactionDto} from "../types/transactionDto/index.ts";

const API_URL = '/api/transaction';

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

const getTransactionsFiltered = (
    accountId : number | null,
    categoryId : number | null,
    typeId : number | null,
) : Promise<TransactionDto[]> => {
    const queryParams = new URLSearchParams();
    if (accountId !== null) queryParams.append('accountId', accountId.toString());
    if (categoryId !== null) queryParams.append('categoryId', categoryId.toString());
    if (typeId !== null) queryParams.append('typeId', typeId.toString());

    const queryString = queryParams.toString() ? `?${queryParams.toString()}` : '';
    return apiRequest<TransactionDto[]>(`${API_URL}/filter${queryString}`, 'GET');
}

const getTransactionsByPeriod = (startDate: string, endDate: string): Promise<TransactionDto[]> => {
    const queryParams = new URLSearchParams();
    queryParams.append('startDate', startDate);
    queryParams.append('endDate', endDate);

    return apiRequest<TransactionDto[]>(`${API_URL}/period?${queryParams.toString()}`, 'GET');

}

export const transactionApi = {
    createTransaction,
    getTransactionById,
    updateTransaction,
    deleteTransaction,
    getTransactionsFiltered,
    getTransactionsByPeriod,
}