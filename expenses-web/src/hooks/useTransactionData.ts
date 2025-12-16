import {
    startOfMonth,
    endOfMonth,
    format,
    isValid,
    subMonths,
    isAfter
} from "date-fns";
import type { CategoryDto } from "../types/categoryDto";
import { useCallback, useEffect, useMemo, useState } from "react";
import { useInfiniteQuery, useQuery } from "@tanstack/react-query";
import { type TransactionFilterParams, transactionService } from "../services/transactionService.ts";
import { useDebounce } from "./useDebounce.ts";

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

const STORAGE_KEY = 'transaction-filters';

const loadFiltersFromStorage = (): Partial<FilterState> | null => {
    try {
        const stored = localStorage.getItem(STORAGE_KEY);
        if (!stored) return null;

        const parsed = JSON.parse(stored);
        return {
            ...parsed,
            initialDate: parsed.initialDate ? new Date(parsed.initialDate) : new Date(),
            endDate: parsed.endDate ? new Date(parsed.endDate) : null,
            category: parsed.category || null,
        };
    } catch {
        return null;
    }
};

const saveFiltersToStorage = (filters: FilterState) => {
    try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify({
            type: filters.type,
            dateFilterType: filters.dateFilterType,
            category: filters.category,
            initialDate: format(filters.initialDate, 'yyyy-MM-dd'),
            endDate: filters.endDate && format(filters.endDate, 'yyyy-MM-dd') || null,
            searchTerms: filters.searchTerms,
        }));
    } catch (error) {
        console.warn('Failed to save filters to localStorage', error);
    }
};

export const useTransactionData = () => {
    const [filters, setFilters] = useState<FilterState>(() => {
        const storedFilters = loadFiltersFromStorage();
        return {
            type: 'ALL',
            category: null,
            dateFilterType: 'ALL',
            initialDate: new Date(),
            endDate: null,
            searchTerms: '',
            ...storedFilters
        }
    });

    useEffect(() => {
        saveFiltersToStorage(filters);
    }, [filters]);

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

                const MAX_MONTHS_BACK = 24;
                if (allPages.length >= MAX_MONTHS_BACK) return undefined;

                // Calculate next month to fetch
                return subMonths(new Date(), allPages.length);
            },
            enabled: !isSearchMode,
            staleTime: 1000 * 60 * 5,
            placeholderData: (previousData) => previousData
        }
    )

    const searchQuery = useQuery({
        queryKey: [
            'transactions',
            'search',
            filters.type,
            filters.category?.id,
            filters.dateFilterType,
            format(filters.initialDate, 'yyyy-MM-dd'),
            filters.endDate ? format(filters.endDate, 'yyyy-MM-dd') : null,
            debouncedSearch,
        ],
        queryFn: async () => {
            const params: TransactionFilterParams = {};

            // Mapped 'searchTerms' to 'search' to match Service/Backend
            if (debouncedSearch) params.searchTerms = debouncedSearch;
            if (filters.type !== 'ALL') params.type = filters.type;
            if (filters.category) params.categoryId = filters.category.id;

            // Date Logic
            if (filters.initialDate && isValid(filters.initialDate)) {
                if (filters.dateFilterType === 'MONTH') {
                    params.startDate = format(startOfMonth(filters.initialDate), 'yyyy-MM-dd');
                    params.endDate = format(endOfMonth(filters.initialDate), 'yyyy-MM-dd');
                }
                else if (filters.dateFilterType === 'EXACTLY') {
                    params.startDate = format(filters.initialDate, 'yyyy-MM-dd');
                    params.endDate = format(filters.initialDate, 'yyyy-MM-dd');
                }
                else if (filters.dateFilterType === 'RANGE' && filters.endDate && isValid(filters.endDate)) {
                    const start = filters.initialDate;
                    const end = filters.endDate;

                    // Swap if start is after end
                    if (isAfter(start, end)) {
                        params.startDate = format(end, 'yyyy-MM-dd');
                        params.endDate = format(start, 'yyyy-MM-dd');
                    } else {
                        params.startDate = format(start, 'yyyy-MM-dd');
                        params.endDate = format(end, 'yyyy-MM-dd');
                    }
                }
            }

            return transactionService.searchTransactions(params);
        },
        enabled: isSearchMode
    });

    // 7. Unify Data
    const transactionsList = useMemo(() => {
        if (isSearchMode) {
            return searchQuery.data || [];
        } else {
            return infiniteQuery.data?.pages.flat() || [];
        }
    }, [isSearchMode, searchQuery.data, infiniteQuery.data]);

    // 8. Helpers
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

    const setFiltersCallback = useCallback((newFilters: Partial<FilterState> | ((prev: FilterState) => FilterState)) => {
        setFilters(prev => {
            if (typeof newFilters === 'function') {
                return newFilters(prev);
            }
            return { ...prev, ...newFilters };
        });
    }, []);

    return {
        transactions: transactionsList,
        isEmpty: transactionsList.length === 0,

        isLoading: isSearchMode ? searchQuery.isLoading : infiniteQuery.isLoading,
        isFetchingNextPage: infiniteQuery.isFetchingNextPage,

        hasNextPage: infiniteQuery.hasNextPage && !isSearchMode,
        fetchNextPage: infiniteQuery.fetchNextPage,

        error: isSearchMode ? searchQuery.error : infiniteQuery.error,
        isError: isSearchMode ? searchQuery.isError : infiniteQuery.isError,
        refetch: isSearchMode ? searchQuery.refetch : infiniteQuery.refetch,

        filters,
        setFilters: setFiltersCallback,
        setDateFilterType,
        clearFilters,
        isSearchMode
    };
}