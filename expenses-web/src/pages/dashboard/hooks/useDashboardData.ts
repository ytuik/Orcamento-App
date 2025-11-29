import { useQuery } from "@tanstack/react-query";
import { useMemo } from 'react';

import { transactionService } from "../../../services/transactionService.ts";
import type {TransactionDto} from "../../../types/transactionDto";
import {useAccounts} from "../../../hooks/useAccounts.ts";

export const useDashboardData = (startDate: string, endDate: string) => {

    const accountsQuery = useAccounts()

    const currentMonthTransactionsQuery = useQuery<TransactionDto[]>({
        queryKey: ['transactions', {startDate, endDate}],
        queryFn: () => transactionService.getTransactionsByPeriod(startDate, endDate),
        enabled: !!startDate && !!endDate,
    });

    //Todo: Criar a query do cartao de credito

    const dashboardData = useMemo(() => {
        const accounts = accountsQuery.data ?? [];
        const currentMonthTransactions = currentMonthTransactionsQuery.data ?? [];

        const sumAllAccountBalances = accounts.reduce((sum, account) => sum + account.currentBalance, 0);

        const monthTotalIncome = currentMonthTransactions
            .filter(t => t.type.toString() === "INCOME")
            .reduce((sum, t) => sum + t.amount, 0);

        /*
        Todo: Adicionar os gastos de cartao de credito como despesas
        */

        const monthTotalExpense = currentMonthTransactions
            .filter(t=>t.type.toString() === "EXPENSE")
            .reduce((sum, t) => sum + t.amount, 0);

        const monthBalance = monthTotalIncome - monthTotalExpense;

        return {
            accounts,
            currentMonthTransactions,
            summary: {
                sumAllAccountBalances,
                monthTotalIncome,
                monthTotalExpense,
                monthBalance,
            }
        };
        },[accountsQuery.data, currentMonthTransactionsQuery.data]);

        return {
            isLoading:
                accountsQuery.isLoading ||
                currentMonthTransactionsQuery.isLoading,

            isError:
                accountsQuery.isError ||
                currentMonthTransactionsQuery.isError,

            refetch: async () => {
                await Promise.all([
                    accountsQuery.refetch(),
                    currentMonthTransactionsQuery.refetch(),
                ]);
            },

            data: dashboardData
    }
}