import {useMutation, useQuery, useQueryClient} from "@tanstack/react-query";
import type {CategoryDto} from "../types/categoryDto";
import {categoryService} from "../services/categoryService.ts";

export const useCategory = () => {
    const queryClient = useQueryClient();
    const query = useQuery<CategoryDto[]>({
        queryKey : ['categories'],
        queryFn: categoryService.getAllCategories,
        staleTime: 1000 * 60 * 5,
    })

    const allCategories = query.data ?? [];

    const incomeCategories = query.data?.filter(c => c.type === 'INCOME' && c.isActive) ?? [];
    const expenseCategories = query.data?.filter(c => c.type === 'EXPENSE' && c.isActive) ?? [];

    const createMutation = useMutation({
        mutationFn: categoryService.createCategory,
        onSuccess: () => {
            queryClient.invalidateQueries({queryKey: ['categories']});
        }
    })

    const updateMutations = useMutation({
        mutationFn: ({id, data}: {id: number, data: CategoryDto}) => categoryService.updateCategory(id, data),
        onSuccess: () => {
            queryClient.invalidateQueries({queryKey: ['categories']});
            queryClient.invalidateQueries({queryKey: ['transactions']})
        }
    })

    const deleteMutation = useMutation({
        mutationFn: (id: number) => categoryService.deactivateCategory(id),
        onSuccess: () => {
            queryClient.invalidateQueries({queryKey: ['categories']});
            queryClient.invalidateQueries({queryKey: ['transactions']})
        }
    })
    return {
        allCategories,
        incomeCategories,
        expenseCategories,
        createCategory: createMutation,
        updateCategory: updateMutations,
        deleteCategory: deleteMutation
    }
}