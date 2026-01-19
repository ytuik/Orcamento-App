import {apiRequest} from "../lib/apiClient.ts";
import type {TransactionTypeString} from "@/types/transactionDto/transactionType.ts";
import type {CategoryDto, CreateCategoryDto} from "@/types/categoryDto";

const API_URL = '/api/category';

const getAllCategories = (): Promise<CategoryDto[]> => {
    return apiRequest<CategoryDto[]>(API_URL, 'GET');
};

const getCategoriesByType = (type: TransactionTypeString): Promise<CategoryDto[]> => {
    return apiRequest<CategoryDto[]>(`${API_URL}/type/${type}`, 'GET');
};

const createCategory = (categoryData: CreateCategoryDto): Promise<CategoryDto> => {
    return apiRequest<CategoryDto>(API_URL, 'POST', categoryData);
};

const updateCategory = (id: number, categoryData: Partial<CreateCategoryDto>): Promise<CategoryDto> => {
    return apiRequest<CategoryDto>(`${API_URL}/${id}`, 'PATCH', categoryData);
}

const deactivateCategory = (id: number): Promise<CategoryDto> => {
    return apiRequest<CategoryDto>(`${API_URL}/${id}/deactivate`, 'PATCH');
}

export const categoryService = {
    getAllCategories,
    getCategoriesByType,
    createCategory,
    updateCategory,
    deactivateCategory
}