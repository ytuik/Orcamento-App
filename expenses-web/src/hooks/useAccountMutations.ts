import {useMutation, useQueryClient} from "@tanstack/react-query";
import {accountService} from "@/services/accountService.ts";
import {toast} from "sonner";
import type {AccountDto} from "@/types/accountDto";

export const useAccountMutations = () => {
    const queryClient = useQueryClient();

    const invalidateAccounts = () => {
        queryClient.invalidateQueries({ queryKey: ['accounts'] });
    };

    const create = useMutation({
        mutationFn: accountService.createAccount,
        onSuccess: () => {
            toast.success("Conta criada com sucesso!", {
                duration: 4000,
            });
            invalidateAccounts();
        },
        onError: () => {
            toast.error("Erro ao criar conta.", {
                duration: 5000,
            });
        }
    })

    const remove = useMutation({
        mutationFn: accountService.deactivateAccount,

        onSuccess: () => {
            toast.success("Conta removida com sucesso!", {
                duration: 4000,
            });
            invalidateAccounts();
        },

        onError: () => {
            toast.error("Erro ao remover conta.", {
                duration: 5000,
            });
        }
    });

    const update = useMutation({
        mutationFn: ({id, data}: {id: number, data: AccountDto}) => {
           return accountService.updateAccount(id, data)
        },

        onSuccess: () => {
            toast.success("Conta atualizada com sucesso!", {
                duration: 4000,
            });
            invalidateAccounts();
        },

        onError: () => {
            toast.error("Erro ao atualizar conta.", {
                duration: 5000,
            });
        }
    });

    return {
        create,
        remove,
        update
    };

}