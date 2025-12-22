import { useMutation, useQueryClient, type InfiniteData } from "@tanstack/react-query";
import { transactionService } from "../services/transactionService";
import type {CreateTransactionDto, TransactionDto} from "../types/transactionDto";
import {toast} from "sonner";

export const useTransactionMutations = () => {
    const queryClient = useQueryClient();
    const QUERY_KEY = ['transactions', 'infinite']; // A chave do seu useInfiniteQuery

    const create = useMutation({
        mutationFn: transactionService.createTransaction,
        onSuccess: (newTransaction) => {
            queryClient.setQueryData<InfiniteData<TransactionDto[]>>(QUERY_KEY, (oldData) => {
                if (!oldData) return undefined;

                const newPages = oldData.pages.map((page, index) => {
                    if (index === 0) {
                        return [newTransaction, ...page];
                    }
                    return page;
                });

                return { ...oldData, pages: newPages };
            });

            toast.success("Transação criada com sucesso!", {
                duration: 4000,
            });

            queryClient.invalidateQueries({ queryKey: ['accounts'] });
        },
        onError: () => {
            toast.error("Erro ao criar transação.");
        }
    });

    // --- DELETE ---
    const remove = useMutation({
        mutationFn: transactionService.deleteTransaction,
        onSuccess: (_, deletedId) => {
            queryClient.setQueryData<InfiniteData<TransactionDto[]>>(QUERY_KEY, (oldData) => {
                if (!oldData) return undefined;
                const newPages = oldData.pages.map(page =>
                    page.filter(t => t.id !== deletedId)
                );

                return { ...oldData, pages: newPages };
            });

            toast.success("Transação removida com sucesso!", {
                duration: 4000,
            });

            queryClient.invalidateQueries({ queryKey: ['accounts'] });
        },
        onError: () => {
            toast.error("Erro ao remover transação.");
        }
    });

    const update = useMutation({
        mutationFn: ({ id, data }: { id: number, data: CreateTransactionDto }) =>{
            const transactionWithId = {...data, id} as TransactionDto;
            return transactionService.updateTransaction(id, transactionWithId)
        },

        onSuccess: (updatedTransaction) => {
            queryClient.setQueryData<InfiniteData<TransactionDto[]>>(QUERY_KEY, (oldData) => {
                if (!oldData) return undefined;
                const newPages = oldData.pages.map(page =>
                    page.map(t => t.id === updatedTransaction.id ? updatedTransaction : t)
                );

                return { ...oldData, pages: newPages };
            });

            toast.success("Transação editada com sucesso!", {
                duration: 4000,
            });

            queryClient.invalidateQueries({ queryKey: ['accounts'] });
        },
        onError: () => {
            toast.error("Erro ao editar transação.");
        }
    });

    return { create, remove, update };
};