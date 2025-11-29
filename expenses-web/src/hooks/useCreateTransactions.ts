import {useMutation, useQueryClient} from "@tanstack/react-query";
import type {TransactionFormData} from "../lib/validators/transactionSchema.ts";
import {transactionService} from "../services/transactionService.ts";

export const useCreateTransaction = (onSuccessCallback?: () => void) => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (data: TransactionFormData) => transactionService.createTransaction(data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['transactions'] });
            queryClient.invalidateQueries({ queryKey: ['accounts'] });

            if (onSuccessCallback) {
                onSuccessCallback();
            }
        },
        onError: (error) => {
            console.error(error);
             //TODO: conectar com um Toast/Notification service global
        }
    });
}