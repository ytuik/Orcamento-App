import { useMemo } from "react";
import { endOfMonth, format, startOfMonth } from "date-fns";
import { TrendingDownIcon, TrendingUpIcon, WalletIcon } from "../../components/icons";
import { LoadingSpinner } from "../../components/ui/LoadingSpinner/LoadingSpinner";

// Components
import { DashboardHeader } from "./components/DashboardHeader";
import { StatCard } from "./components/StatCard/StatCard.tsx";
import { AccountsCarousel } from "./components/AccountsCarousel/AccountsCarrousel.tsx";
import { TransactionList } from "./components/TransactionList/TransactionList.tsx";
import { MonthlySpendingSummary } from "./components/MonthlySpendingSummary/MonthlySpendingSummary.tsx";

// Hooks e Styles
import { useDashboardData } from "./hooks/useDashboardData";
import './DashboardPage.scss';

function DashboardPage() {
    const dateRange = useMemo(() => {
        const now = new Date();
        return {
            start: format(startOfMonth(now), 'yyyy-MM-dd'),
            end: format(endOfMonth(now), 'yyyy-MM-dd')
        };
    }, []);

    const { isLoading, isError, data, refetch } = useDashboardData(dateRange.start, dateRange.end);

    if (isLoading) {
        return (
            <div className="d-flex justify-content-center align-items-center vh-100 bg-zinc-900">
                <LoadingSpinner />
            </div>
        );
    }

    if (isError || !data) {
        return (
            <div className="d-flex justify-content-center align-items-center vh-100 bg-zinc-900">
                <div className="text-center">
                    <h2 className="text-zinc-100 text-xl mb-2">Ops! Algo deu errado.</h2>
                    <p className="text-zinc-400 mb-4">Não conseguimos carregar os dados do dashboard.</p>
                    {/* Botão suave que tenta buscar apenas os dados novamente */}
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
        <div className="dashboard-container py-4">
            <div className="container">
                <DashboardHeader/>

                <div className="row g-4 mb-4">
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
                            description="Entradas este mês"
                            colorVariant="green"
                        />
                    </div>
                    <div className="col-12 col-md-4">
                        <StatCard
                            className=''
                            title="Despesas"
                            value={data.summary.monthTotalExpense}
                            icon={<TrendingDownIcon/>}
                            description="Saídas este mês"
                            colorVariant="red"
                        />
                    </div>
                </div>
                <div className="row mb-4">
                    <div className="col-12">
                        <AccountsCarousel accounts={data.accounts}/>
                    </div>
                </div>

                <div className="row g-4">
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