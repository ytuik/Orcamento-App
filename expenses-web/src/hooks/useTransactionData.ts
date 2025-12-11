import {startOfMonth, endOfMonth, format, isValid, subMonths} from "date-fns";
import type {CategoryDto} from "../types/categoryDto";
import {useCallback, useMemo, useState} from "react";
import {useInfiniteQuery, useQuery} from "@tanstack/react-query";
import {type TransactionFilterParams, transactionService} from "../services/transactionService.ts";
import {useDebounce} from "./useDebounce.ts";

export type DateFilterType = 'ALL' | 'MONTH' | 'RANGE' | 'EXACTLY';
export type TransactionTypeFilter = 'ALL' | 'INCOME' | 'EXPENSE';
export type FilterState = {
    type: TransactionTypeFilter,
    dateFilterType: DateFilterType,
    category: CategoryDto | null,
    initialDate: Date,
    endDate: Date | null
    searchTerms: string,
}

export const useTransactionData = () => {
    const [filters, setFilters] = useState<FilterState>({
        type: 'ALL',
        category: null,
        dateFilterType: 'ALL',
        initialDate: new Date(),
        endDate: null,
        searchTerms: '',
    });
    
    const debouncedSearch = useDebounce(filters.searchTerms, 500);

    const isSearchMode = useMemo(() => {
        return (
            debouncedSearch.trim().length > 0 ||
            filters.type !== 'ALL' ||
            filters.category !== null ||
            filters.dateFilterType !== 'ALL'
        )
    }, [filters, debouncedSearch]);

    const infiniteQuery = useInfiniteQuery({
            queryKey : ['transactions', 'infinite'],
            initialPageParam: new Date(),
            queryFn: async ({ pageParam }) => {
                const start = startOfMonth(pageParam);
                const end = endOfMonth(pageParam);
                return transactionService.getTransactionsByPeriod(
                    format(start, 'yyyy-MM-dd'),
                    format(end, 'yyyy-MM-dd')
                );
            },
            getNextPageParam: (lastPage, allPages) => {
                if(!lastPage || lastPage.length === 0) return undefined;

                return subMonths(new Date(), allPages.length);
            },
            enabled: !isSearchMode,
            staleTime: 1000 * 60 * 5, // 5 minutes
        }
    )

    const searchQuery = useQuery({
        queryKey: ['transactions', 'search', {...filters, searchTerms: debouncedSearch}],
        queryFn: async () => {
            const params: TransactionFilterParams = {};

            if (debouncedSearch) params.searchTerms = debouncedSearch;
            if (filters.type !== 'ALL') params.type = filters.type;
            if (filters.category) params.categoryId = filters.category.id;

            if (filters.initialDate && isValid(filters.initialDate)) {
                console.log('Applying date filter', filters.dateFilterType)
                {console.log(filters.initialDate + " Initial date")}
                {console.log(filters.endDate + " End Date")}
                if (filters.dateFilterType === 'MONTH') {
                    params.startDate = format(startOfMonth(filters.initialDate), 'yyyy-MM-dd');
                    params.endDate = format(endOfMonth(filters.initialDate), 'yyyy-MM-dd');
                }
                else if (filters.dateFilterType === 'EXACTLY') {
                    params.startDate = format(filters.initialDate, 'yyyy-MM-dd');
                    params.endDate = format(filters.initialDate, 'yyyy-MM-dd');
                }
                else if (filters.dateFilterType === 'RANGE' && filters.endDate) {
                    params.startDate = format(filters.initialDate, 'yyyy-MM-dd');
                    params.endDate = format(filters.endDate, 'yyyy-MM-dd');
                }
            }

            console.log('Search params:', params);

            return transactionService.searchTransactions(params);
        },
        enabled: isSearchMode,
    });

    const transactionsList = useMemo(() => {
        if (isSearchMode) {
            return searchQuery.data || [];
        } else {
            return infiniteQuery.data?.pages.flat() || [];
        }
    }, [isSearchMode, searchQuery.data, infiniteQuery.data]);

    const setDateFilterType = useCallback((type: DateFilterType) => {
        setFilters(prev => ({
            ...prev,
            dateFilterType: type,
            initialDate: type === 'ALL' ? new Date() : prev.initialDate,
            endDate: null
        }));
    }, []);

    const clearFilters = useCallback(() => {
        setFilters({
            type: 'ALL',
            category: null,
            dateFilterType: 'ALL',
            initialDate: new Date(),
            endDate: null,
            searchTerms: '',
        });
    }, []);

    return {
        transactions: transactionsList,
        isLoading: isSearchMode ? searchQuery.isLoading : infiniteQuery.isLoading,
        isFetchingNextPage: infiniteQuery.isFetchingNextPage,
        hasNextPage: infiniteQuery.hasNextPage && !isSearchMode,
        fetchNextPage: infiniteQuery.fetchNextPage,

        filters,
        setFilters,
        setDateFilterType,
        clearFilters,
        isSearchMode
    };

}