import {useTransactionData} from "../../hooks/useTransactionData.ts";
import './TransactionsPage.scss'
import {useCategoryData} from "../../hooks/useCategoryData.ts";

import {useEffect, useMemo} from "react";
import {useInView} from "react-intersection-observer";
import {ptBR} from "date-fns/locale";
import {format, isThisWeek, isToday, isYesterday} from "date-fns";
import {TransactionFilters} from "./components/TransactionFilters.tsx";
import {TransactionItem} from "./components/TransactionItem.tsx";

export const TransactionsPage = () => {
    const {
        transactions,
        filters,
        setFilters,
        setDateFilterType,
        clearFilters,
        fetchNextPage,
        hasNextPage,
        isLoading
    } = useTransactionData();

    const {allCategories} = useCategoryData();
    const {ref, inView} = useInView();

    useEffect(() => {
        if (inView && hasNextPage && !isLoading) {
            fetchNextPage();
        }
    }, [inView, hasNextPage, isLoading, fetchNextPage]);

    const groupedTransactions = useMemo(() => {
        const groups: Record<string, typeof transactions> = {};

        transactions.forEach( t => {

            const date = new Date(t.transactionDate)
            let header = format(date, "MMMM yyyy", { locale: ptBR });

            if (isToday(date)) {
                header = "Hoje";
            } else if (isYesterday(date)) {
                header = "Ontem";
            } else if (isThisWeek(date)) {
                header = "Esta Semana";
            }

            if (!groups[header]) {
                groups[header] = [];
            }
            groups[header].push(t);
        });
        return groups
    }, [transactions]);

    return (
        <div className={"transaction-page container"}>

            <div className={"header-section"}>
                <h2>Transações</h2>
                <p>Todas as Transações</p>
            </div>

            <TransactionFilters
                filters={filters}
                setFilters={setFilters}
                setDateFilter={setDateFilterType}
                clearFilters={clearFilters}
                categories={allCategories}
            />

            <div className="list-container">
                {Object.entries(groupedTransactions).map(([header, items]) => (
                    <div key={header} className="group-section">
                        <h3 className="group-header capitalize">{header}</h3>
                        <div className="group-items">
                            {items.map(t => (
                                <TransactionItem key={t.id} data={t}/>
                            ))}
                        </div>
                    </div>
                ))}

                <div ref={ref} className="loading-sentinel">
                    {isLoading && <p>Carregando transações...</p>}
                    {!hasNextPage && !isLoading && transactions.length > 0 &&
                        <p className="end-text">Você chegou ao fim.</p>
                    }
                    {!isLoading && transactions.length === 0 &&
                        <p className="empty-text">Nenhuma transação encontrada.</p>
                    }
                </div>
            </div>
        </div>
    )
}