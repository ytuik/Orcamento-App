import { useQuery } from "@tanstack/react-query";
import { useMemo } from 'react';

import { transactionService } from "../../../services/transactionService.ts";
import type {TransactionDto} from "../../../types/transactionDto";
import {useAccounts} from "../../../hooks/useAccounts.ts";
import type {TransactionCategory} from "../../../types/transactionDto/transactionCategory.ts";
import {getCategoryEnum} from "../../../utils/transactionUtils.tsx";

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

        const expensesTransactions = currentMonthTransactions.filter(t => t.type.toString() === "EXPENSE");
        const monthTotalExpense = currentMonthTransactions
            .filter(t=>t.type.toString() === "EXPENSE")
            .reduce((sum, t) => sum + t.amount, 0);

        const monthBalance = monthTotalIncome - monthTotalExpense;

        const categoryMap = new Map<TransactionCategory, { amount: number; count: number }>();

        expensesTransactions.forEach(t => {
            const category = getCategoryEnum(t.category)
            const existing = categoryMap.get(category);
            if (existing) {
                existing.amount += t.amount;
                existing.count += 1;
            } else {
                categoryMap.set(category, { amount: t.amount, count: 1 });
            }
        });

        const expensesByCategory = Array.from(categoryMap.entries()).map(([category, data]) => ({
            category,
            amount: data.amount,
            count: data.count,
            percentage: (data.amount / monthTotalExpense) * 100,
        }) ).sort((a, b) => b.amount - a.amount);



        return {
            accounts,
            currentMonthTransactions,
            expensesByCategory,
            summary: {
                sumAllAccountBalances,
                monthTotalIncome,
                monthTotalExpense,
                monthBalance,
                activeCategoriesCount: expensesByCategory.length,
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

            },

            data: dashboardData
    }
}