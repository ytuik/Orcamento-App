import {useQuery} from "@tanstack/react-query";
import {accountService} from "../services/accountService.ts";

export const useAccounts = () => {
    const { data, isLoading, isError, refetch } = useQuery({
        queryKey: ['accounts'],
        queryFn: () => accountService.getAllAccounts(),
        staleTime: 1000 * 60 * 5
    });

    return {
        data,
        isLoading,
        isError,
        refetch
    } ;
}