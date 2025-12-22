import { useMemo } from "react";
import { format, parseISO, setMonth, setYear, getMonth, getYear } from "date-fns";
import { ptBR } from "date-fns/locale";
import { Calendar, Search, X } from "lucide-react";

import type { DateFilterType, FilterState, TransactionTypeFilter } from "../../../hooks/useTransactionData.ts";
import type { CategoryDto } from "../../../types/categoryDto";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../../../components/ui/Select/Select.tsx";

interface TransactionFiltersProps {
    filters: FilterState;
    setFilters: (update: Partial<FilterState> | ((prev: FilterState) => FilterState)) => void;
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

    const getInputValue = (date: Date | null, type: DateFilterType) => {
        if (!date) return '';
        try {
            return format(date, type === 'MONTH' ? 'yyyy-MM' : 'yyyy-MM-dd');
        } catch (e) {
            return '';
        }
    };

    const handleDateChange = (value: string) => {
        if (!value) return null;
        return parseISO(value);
    };


    const months = useMemo(() => {
        return Array.from({ length: 12 }, (_, i) => {
            const date = new Date(2000, i, 1);
            const name = format(date, 'MMMM', { locale: ptBR });
            return {
                value: i.toString(),
                label: name.charAt(0).toUpperCase() + name.slice(1)
            };
        });
    }, []);

    const years = useMemo(() => {
        const currentYear = new Date().getFullYear();
        const startYear = currentYear - 5;
        const endYear = currentYear + 1;
        return Array.from({ length: endYear - startYear + 1 }, (_, i) => (startYear + i).toString());
    }, []);

    const updateMonth = (monthIndex: string) => {
        const currentDate = filters.initialDate || new Date();
        const newDate = setMonth(currentDate, parseInt(monthIndex));
        setFilters(prev => ({ ...prev, initialDate: newDate }));
    };

    const updateYear = (yearStr: string) => {
        const currentDate = filters.initialDate || new Date();
        const newDate = setYear(currentDate, parseInt(yearStr));
        setFilters(prev => ({ ...prev, initialDate: newDate }));
    };

    const currentMonthIndex = getMonth(filters.initialDate || new Date()).toString();
    const currentMonthLabel = months.find(m => m.value === currentMonthIndex)?.label;
    const typeLabel = filters.type === 'INCOME' ? 'Entradas' : filters.type === 'EXPENSE' ? 'Saídas' : 'Todas';

    return (
        <div className="filters-container">
            <div className="search-bar">
                <Search className="search-icon" size={20}/>
                <input
                    type="text"
                    placeholder="Buscar Transações..."
                    value={filters.searchTerms}
                    onChange={(e) => setFilters(prev => ({...prev, searchTerms: e.target.value}))}
                />
            </div>

            <div className="filters-row">
                <div className="filter-item">
                    <Select
                        value={filters.type}
                        onValueChange={(value) => setFilters(prev => ({...prev, type: value as TransactionTypeFilter}))}
                    >
                        <SelectTrigger>
                            <SelectValue placeholder="Tipo">{typeLabel}</SelectValue>
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="ALL">Todas</SelectItem>
                            <SelectItem value="INCOME">Entradas</SelectItem>
                            <SelectItem value="EXPENSE">Saídas</SelectItem>
                        </SelectContent>
                    </Select>
                </div>

                <div className="filter-item">
                    <Select
                        value={filters.category?.id.toString() || "ALL"}
                        onValueChange={(value) => {
                            const cat = value === "ALL" ? null : categories.find(c => c.id.toString() === value) || null;
                            setFilters(prev => ({...prev, category: cat}));
                        }}
                    >
                        <SelectTrigger>
                            <SelectValue placeholder="Todas Categorias">{filters.category?.name}</SelectValue>
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

                <div className="date-filter-group">
                    <Select
                        value={filters.dateFilterType}
                        onValueChange={(value) => setDateFilter(value as DateFilterType)}
                    >
                        <SelectTrigger>
                            <Calendar className="mr-2 h-4 w-4"/>
                            <SelectValue/>
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="ALL">Todo o período</SelectItem>
                            <SelectItem value="MONTH">Por Mês</SelectItem>
                            <SelectItem value="EXACTLY">Data Exata</SelectItem>
                            <SelectItem value="RANGE">Intervalo</SelectItem>
                        </SelectContent>
                    </Select>

                    {filters.dateFilterType !== 'ALL' && (
                        <div className={"date-inputs-floating"} style={filters.dateFilterType == 'EXACTLY' ? {left:0} : {}}>
                            <div className="date-inputs">

                                {filters.dateFilterType === 'MONTH' ? (
                                    <>
                                        <div>
                                            <Select
                                                value={currentMonthIndex}
                                                onValueChange={updateMonth}
                                            >
                                                <SelectTrigger
                                                    className="h-[30px] border-none bg-transparent focus:ring-0 px-0 ">
                                                    <SelectValue>{currentMonthLabel}</SelectValue>
                                                </SelectTrigger>
                                                <SelectContent>
                                                    {months.map((m) => (
                                                        <SelectItem key={m.value} value={m.value}>{m.label}</SelectItem>
                                                    ))}
                                                </SelectContent>
                                            </Select>
                                        </div>

                                        <div>
                                            <Select
                                                value={getYear(filters.initialDate || new Date()).toString()}
                                                onValueChange={updateYear}
                                            >
                                                <SelectTrigger
                                                    className="h-[30px] border-none bg-transparent focus:ring-0 px-0">
                                                    <SelectValue/>
                                                </SelectTrigger>
                                                <SelectContent>
                                                    {years.map((y) => (
                                                        <SelectItem key={y} value={y}>{y}</SelectItem>
                                                    ))}
                                                </SelectContent>
                                            </Select>
                                        </div>
                                    </>
                                ) : (
                                    <>
                                        <input
                                            type="date"
                                            className="date-input"
                                            value={getInputValue(filters.initialDate, 'EXACTLY')}
                                            onChange={(e) => {
                                                const date = handleDateChange(e.target.value);
                                                if (date) setFilters(prev => ({...prev, initialDate: date}));
                                            }}
                                        />

                                        {filters.dateFilterType === 'RANGE' && (
                                            <>
                                                <span className="text-muted">até</span>
                                                <input
                                                    type="date"
                                                    className="date-input"
                                                    value={getInputValue(filters.endDate, 'RANGE')}
                                                    onChange={(e) => {
                                                        const date = handleDateChange(e.target.value);
                                                        if (date) setFilters(prev => ({...prev, endDate: date}));
                                                    }}
                                                />
                                            </>
                                        )}
                                    </>
                                )}
                            </div>
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