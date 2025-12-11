import React, {useState} from "react";
import type {DateFilterType, FilterState, TransactionTypeFilter} from "../../../hooks/useTransactionData.ts";
import type {CategoryDto} from "../../../types/categoryDto";
import {Calendar, Search, X} from "lucide-react";
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from "../../../components/ui/Select/Select.tsx";

interface TransactionFiltersProps {
    filters : FilterState;
    setFilters: React.Dispatch<React.SetStateAction<FilterState>>;
    setDateFilter: (type: DateFilterType) => void;
    clearFilters: () => void;
    categories: CategoryDto[];
}

export const TransactionFilters = ({
    filters,
    setFilters,
    setDateFilter,
    clearFilters,
    categories,
}: TransactionFiltersProps) => {

    return (
        <div className={"filters-container"}>
            <div className={"search-bar"}>
                <Search className={"search-icon"} size={20}/>
                <input
                    type={"text"}
                    placeholder={"Buscar Transações..."}
                    value={filters.searchTerms}
                    onChange={(e) => setFilters(prev => ({...prev, searchTerms: e.target.value}))}
                />
            </div>

            <div className={"filters-row"}>
                <div className={"filter-item"}>
                    <Select
                        value={filters.type}
                        onValueChange={(value) => setFilters(prev => ({...prev, type: value as TransactionTypeFilter}))}
                    >
                        <SelectTrigger className="w-[140px]">
                            <SelectValue placeholder="Tipo"/>
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="ALL" label="Todas">Todas</SelectItem>
                            <SelectItem value="INCOME" label="Entradas">Entradas</SelectItem>
                            <SelectItem value="EXPENSE" label="Saídas">Saídas</SelectItem>
                        </SelectContent>
                    </Select>
                </div>
                <div className={"filter-item"}>
                    <Select
                        value={filters.category?.toString() || "ALL"}
                        onValueChange={(value) => {
                            const cat = value === "ALL" ? null : categories.find(c => c.id.toString() === value) || null;
                            setFilters(prev => ({...prev, category: cat}));
                        }}
                    >
                        <SelectTrigger className="w-[180px]">
                            <SelectValue placeholder="Todas Categorias"/>
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="ALL">Todas Categorias</SelectItem>
                            {categories.map(category => (
                                <SelectItem key={category.id} value={category.id.toString()}>
                                    {category.name}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                </div>
                <div className={"date-filter-group"}>
                    <Select
                        value={filters.dateFilterType}
                        onValueChange={(value) => setDateFilter(value as DateFilterType)}
                    >
                        <SelectTrigger className="w-[150px]">
                            <Calendar className="mr-2 h-4 w-4"/>
                            <SelectValue/>
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="ALL" >Tudo Tudinho</SelectItem>
                            <SelectItem value="MONTH">Por Mês</SelectItem>
                            <SelectItem value="EXACTLY">Data Exata</SelectItem>
                            <SelectItem value="RANGE">Intervalo</SelectItem>
                        </SelectContent>
                    </Select>

                    {filters.dateFilterType !== 'ALL' && (
                        <div className="date-inputs">
                            <input
                                type={filters.dateFilterType === 'MONTH' ? "month" : "date"}
                                className="date-input"
                                value={filters.initialDate ? filters.initialDate.toISOString().split('T')[0].slice(0, filters.dateFilterType === 'MONTH' ? 7 : 10) : ''}
                                onChange={(e) => setFilters(prev => ({...prev, initialDate: new Date(e.target.value)}))}
                            />

                            {filters.dateFilterType === 'RANGE' && (
                                <>
                                    <span className="text-muted">até</span>
                                    <input
                                        type="date"
                                        className="date-input"
                                        value={filters.endDate ? filters.endDate.toISOString().split('T')[0] : ''}
                                        onChange={(e) => setFilters(prev => ({
                                            ...prev,
                                            endDate: new Date(e.target.value)
                                        }))}
                                    />
                                </>
                            )}
                        </div>
                    )}
                </div>
                <button onClick={clearFilters} className="clear-btn" title="Limpar Filtros">
                    <X size={18}/>
                </button>
            </div>
        </div>
    );
}