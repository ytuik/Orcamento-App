import { useQuery } from "@tanstack/react-query";
import { useMemo } from 'react';

import { accountService } from "../../../services/accountService.ts";
import { transactionService } from "../../../services/transactionService.ts";
import type {AccountDto} from "../../../types/accountDto";
import type {TransactionDto} from "../../../types/transactionDto";

export const useDashboardData = (startDate: string, endDate: string) => {

    const accountsQuery = useQuery<AccountDto[]>({
        queryKey: ['accounts'],
        queryFn: accountService.getAllAccounts,
        staleTime: 5 * 60 * 1000,
    });

    const currentMonthTransactionsQuery = useQuery<TransactionDto[]>({
        queryKey: ['transactions', {startDate, endDate}],
        queryFn: () => transactionService.getTransactionsByPeriod(startDate, endDate),
        enabled: !!startDate && !!endDate,
    });

    //Criar a query do cartao de credito

    const dashboardData = useMemo(() => {
        const accounts = accountsQuery.data ?? [];
        const currentMonthTransactions = currentMonthTransactionsQuery.data ?? [];

        const sumAllAccountBalances = accounts.reduce((sum, account) => sum + account.currentBalance, 0);

        const monthTotalIncome = currentMonthTransactions
            .filter(t => t.type.toString() === "INCOME")
            .reduce((sum, t) => sum + t.amount, 0);

        /*
        Adicionar os gastos de cartao de credito como despesas
        */

        const monthTotalExpense = currentMonthTransactions
            .filter(t=>t.type.toString() === "EXPENSE")
            .reduce((sum, t) => sum + t.amount, 0);

        const monthBalance = monthTotalIncome - monthTotalExpense;

        return {
            accounts,
            sumAllAccountBalances,
            currentMonthTransactions,
            monthTotalIncome,
            monthTotalExpense,
            monthBalance,
        };
        },[accountsQuery.data, currentMonthTransactionsQuery.data]);

        return {
            isLoading:
                accountsQuery.isLoading ||
                currentMonthTransactionsQuery.isLoading,

            isError:
                accountsQuery.isError ||
                currentMonthTransactionsQuery.isError,

            refetch: () => {
              accountsQuery.refetch().then(r => r.data);
                currentMonthTransactionsQuery.refetch().then(r => r.data);
            },

            data: dashboardData
    }
}