import {
    startOfMonth,
    endOfMonth,
    format,
    isValid,
    subMonths,
    isAfter
} from "date-fns";

import { useCallback, useEffect, useMemo, useState } from "react";
import { useInfiniteQuery, useQuery } from "@tanstack/react-query";
import { type TransactionFilterParams, transactionService } from "../services/transactionService.ts";
import { useDebounce } from "./useDebounce.ts";

export type DateFilterType = 'ALL' | 'MONTH' | 'RANGE' | 'EXACTLY';
export type TransactionTypeFilter = 'ALL' | 'INCOME' | 'EXPENSE';

export type FilterState = {
    type: TransactionTypeFilter,
    dateFilterType: DateFilterType,
    categoryId: number | null,
    initialDate: Date,
    endDate: Date | null
    searchTerms: string,
}

const getFiltersFromUrl = (): Partial<FilterState> => {
    const params = new URLSearchParams(window.location.search);
    const filters: Partial<FilterState> = {};

    const type = params.get('type') as TransactionTypeFilter;
    if (type) filters.type = type;

    const dateFilterType = params.get('dateFilterType') as DateFilterType;
    if (dateFilterType) filters.dateFilterType = dateFilterType;

    const categoryId = params.get('categoryId');
    if (categoryId) {
        filters.categoryId = parseInt(categoryId)
    }

    const initialDate = params.get('initialDate');
    if (initialDate) filters.initialDate = new Date(initialDate);

    const endDate = params.get('endDate');
    if (endDate) filters.endDate = new Date(endDate);

    const searchTerms = params.get('searchTerms');
    if (searchTerms) filters.searchTerms = searchTerms;

    return filters;

}

const saveFiltersOnUrl = (filters: FilterState) => {
    const params = new URLSearchParams();

    if (filters.type !== 'ALL') params.append('type', filters.type);
    if (filters.dateFilterType !== 'ALL') params.append('dateFilterType', filters.dateFilterType);
    if (filters.categoryId) params.append('categoryId', filters.categoryId.toString());
    if (filters.initialDate) params.append('initialDate', format(filters.initialDate, 'yyyy-MM-dd'));
    if (filters.endDate) params.append('endDate', format(filters.endDate, 'yyyy-MM-dd'));
    if (filters.searchTerms.trim().length > 0) params.append('searchTerms', filters.searchTerms.trim());

    const newUrl = `${window.location.pathname}?${params.toString()}`;
    window.history.replaceState({}, '', newUrl);

}

export const useTransactionData = () => {
    const [filters, setFilters] = useState<FilterState>(() => {
        const storedFilters = getFiltersFromUrl();
        return {
            type: 'ALL',
            categoryId: null,
            dateFilterType: 'ALL',
            initialDate: new Date(),
            endDate: null,
            searchTerms: '',
            ...storedFilters
        }
    });

    useEffect(() => {
        saveFiltersOnUrl(filters);
    }, [filters]);

    const debouncedSearch = useDebounce(filters.searchTerms, 500);

    const isSearchMode = useMemo(() => {
        return (
            debouncedSearch.trim().length > 0 ||
            filters.type !== 'ALL' ||
            filters.categoryId !== null ||
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
            filters.categoryId,
            filters.dateFilterType,
            format(filters.initialDate, 'yyyy-MM-dd'),
            filters.endDate ? format(filters.endDate, 'yyyy-MM-dd') : null,
            debouncedSearch,
        ],
        queryFn: async () => {
            const params: TransactionFilterParams = {};

            if (debouncedSearch) params.searchTerms = debouncedSearch;
            if (filters.type !== 'ALL') params.type = filters.type;
            if (filters.categoryId) params.categoryId = filters.categoryId;

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
            categoryId: null,
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