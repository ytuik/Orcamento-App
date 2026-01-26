import { useQuery } from "@tanstack/react-query";
import { useMemo } from 'react';

import { transactionService } from "@/services/transactionService.ts";
import { categoryService } from "@/services/categoryService.ts";
import { useAccounts } from "@/hooks/useAccounts.ts";
import type { TransactionDto } from "@/types/transactionDto";
import type {AvailableColorsTypeString} from "@/types/common/AvailableColorsType.ts";

export interface CategoryExpenseSummary {
    categoryId: number;
    name: string;
    color: AvailableColorsTypeString;
    iconKey: string;
    amount: number;
    count: number;
    percentage: number;
}

export const useDashboardData = (startDate: string, endDate: string) => {

    const accountsQuery = useAccounts();

    const currentMonthTransactionsQuery = useQuery<TransactionDto[]>({
        queryKey: ['transactions', { startDate, endDate }],
        queryFn: () => transactionService.getTransactionsByPeriod(startDate, endDate),
        enabled: !!startDate && !!endDate,
    });

    const categoriesQuery = useQuery({
        queryKey: ['categories'],
        queryFn: categoryService.getAllCategories,
        staleTime: 1000 * 60 * 30,
    });

    // Todo: Criar a query do cartao de credito

    const dashboardData = useMemo(() => {
        const accounts = accountsQuery.allAccounts ?? [];
        const transactions = currentMonthTransactionsQuery.data ?? [];
        const categoriesList = categoriesQuery.data ?? [];

        const categoriesLookup = new Map(
            categoriesList.map(c => [c.id, c])
        );

        const sumAllAccountBalances = accounts.reduce((sum, acc) => sum + acc.currentBalance, 0);

        const incomeTransactions = transactions.filter(t => t.type === "INCOME");
        const expenseTransactions = transactions.filter(t => t.type === "EXPENSE");

        const monthTotalIncome = incomeTransactions.reduce((sum, t) => sum + t.amount, 0);
        const monthTotalExpense = expenseTransactions.reduce((sum, t) => sum + t.amount, 0);

        const monthBalance = monthTotalIncome - monthTotalExpense;

        const groupedExpenses = new Map<number, CategoryExpenseSummary>();

        expenseTransactions.forEach(t => {
            if (!groupedExpenses.has(t.categoryId)) {
                const catDetails = categoriesLookup.get(t.categoryId);

                groupedExpenses.set(t.categoryId, {
                    categoryId: t.categoryId,
                    name: catDetails?.name || 'Categoria Desconhecida',
                    color: catDetails?.color || 'gray',
                    iconKey: catDetails?.iconKey || 'OTHER',
                    amount: 0,
                    count: 0,
                    percentage: 0
                });
            }

            // Soma
            const current = groupedExpenses.get(t.categoryId)!;
            current.amount += t.amount;
            current.count += 1;
        });

        const expensesByCategory = Array.from(groupedExpenses.values())
            .map(item => ({
                ...item,
                percentage: monthTotalExpense > 0
                    ? (item.amount / monthTotalExpense) * 100
                    : 0
            }))
            .sort((a, b) => b.amount - a.amount);

        return {
            accounts,
            currentMonthTransactions: transactions,
            expensesByCategory,
            summary: {
                sumAllAccountBalances,
                monthTotalIncome,
                monthTotalExpense,
                monthBalance,
                activeCategoriesCount: expensesByCategory.length,
            }
        };

    }, [
        accountsQuery.allAccounts,
        currentMonthTransactionsQuery.data,
        categoriesQuery.data
    ]);

    return {
        isLoading:
            accountsQuery.isLoading ||
            currentMonthTransactionsQuery.isLoading ||
            categoriesQuery.isLoading,

        isError:
            accountsQuery.isError ||
            currentMonthTransactionsQuery.isError ||
            categoriesQuery.isError,

        refetch: async () => {
            await Promise.all([
                accountsQuery.refetch(),
                currentMonthTransactionsQuery.refetch(),
                categoriesQuery.refetch()
            ]);
        },

        data: dashboardData
    }
}