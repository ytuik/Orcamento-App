import { useMemo, useState} from "react";
import {addMonths, endOfMonth, format, startOfMonth, subMonths} from "date-fns";
import { TrendingDownIcon, TrendingUpIcon, WalletIcon } from "@/components/icons";
import { LoadingSpinner } from "../../components/ui/LoadingSpinner/LoadingSpinner";

// Components
import { DashboardHeader } from "./components/DashboardHeader";
import { StatCard } from "./components/StatCard/StatCard.tsx";
import { AccountsCarousel } from "./components/AccountsCarousel/AccountsCarrousel.tsx";
import { TransactionList } from "./components/TransactionList/TransactionList.tsx";
import { MonthlySpendingSummary } from "./components/MonthlySpendingSummary/MonthlySpendingSummary.tsx";

import { useDashboardData } from "./hooks/useDashboardData";
import {capitalizeFirstLetter} from "@/utils/stringUtils.ts";
import {ptBR} from "date-fns/locale";

function DashboardPage() {
    const [currentDate, setCurrentDate] = useState(new Date())

    const dateRange = useMemo(() => {
        return {
            start: format(startOfMonth(currentDate), 'yyyy-MM-dd'),
            end: format(endOfMonth(currentDate), 'yyyy-MM-dd')
        };
    }, [currentDate]);

    const { isLoading, isError, data, refetch } = useDashboardData(dateRange.start, dateRange.end);

    const handleMonthChange = (direction: 'previous' | 'next') => {
        setCurrentDate(prevDate => {
    if(direction == 'previous'){
        return subMonths(prevDate, 1)
    } else {
        return addMonths(prevDate, 1)
    }
        });
    }

    if (isLoading) {
        return (
            <div className="d-flex justify-content-center align-items-center min-vh-100 bg-zinc-900">
                <LoadingSpinner />
            </div>
        );
    }

    if (isError || !data) {
        return (
            <div className="d-flex justify-content-center align-items-center min-vh-100 bg-zinc-900">
                <div className="text-center">
                    <h2 className="text-zinc-100 fs-1 mb-2">Ops! Algo deu errado.</h2>
                    <p className="text-zinc-400 mb-4">Não conseguimos carregar os dados do dashboard.</p>
                    <button
                        onClick={() => refetch()}
                        className="btn btn-outline-light btn-sm px-4"
                    >
                        Tentar Novamente
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="dashboard-container min-vh-100 bg-zinc-950">
            <div className="container">
                <DashboardHeader/>
                <div className="d-flex align-items-center justify-content-between my-4">
                    <button
                        onClick={() => handleMonthChange('previous')}
                        className="btn btn-outline-secondary btn-sm"
                    >
                        ← Mês Anterior
                    </button>

                    <span className="text-zinc-100 fw-bold text-capitalize fs-5">
                <p className={"text-white-50"}>{capitalizeFirstLetter(format(currentDate, "MMMM y", {locale:ptBR, }))}</p>
                    </span>

                    <button
                        onClick={() => handleMonthChange('next')}
                        className="btn btn-outline-secondary btn-sm"
                    >
                        Próximo Mês →
                    </button>
                </div>

                <div className="row g-4 my-4">
                    <div className="col-12 col-md-4">
                        <StatCard
                            className=''
                            title="Saldo Total"
                            value={data.summary.monthBalance}
                            icon={<WalletIcon/>}
                            description="Balanço do mês atual"
                            colorVariant="purple"
                        />
                    </div>
                    <div className="col-12 col-md-4">
                        <StatCard
                            className=''
                            title="Receitas"
                            value={data.summary.monthTotalIncome}
                            icon={<TrendingUpIcon/>}
                            description="Entradas do mês"
                            colorVariant="green"
                        />
                    </div>
                    <div className="col-12 col-md-4">
                        <StatCard
                            className=''
                            title="Despesas"
                            value={data.summary.monthTotalExpense}
                            icon={<TrendingDownIcon/>}
                            description="Saídas do mês"
                            colorVariant="red"
                        />
                    </div>
                </div>
                <div className="row g-4 my-4">
                    <div className="col-12">
                        <AccountsCarousel accounts={data.accounts}/>
                    </div>
                </div>
                <div className="row g-4 my-4">
                    <div className="col-12 col-xl-6">
                        <TransactionList
                            transactions={data.currentMonthTransactions}
                            maxItems={5}
                        />
                    </div>

                    <div className="col-12 col-xl-6">
                        <div>
                            <MonthlySpendingSummary
                                expensesByCategory={data.expensesByCategory}
                                summary={data.summary}
                            />
                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
}

export default DashboardPage;