import { useDashboardData } from "./hooks/useDashboardData";
import { formatToLocalDate } from "../../utils/formatToLocalDate";
import { LoadingSpinner } from "../../components/ui/LoadingSpinner/LoadingSpinner"; // Assumindo que existe
import { TrendingDownIcon, TrendingUpIcon, WalletIcon } from "../../components/icons";
import { DashboardHeader } from "./components/DashboardHeader";
import { StatCard } from "./components/StatCard/StatCard.tsx";
import { AccountsCarousel } from "./components/AccountsCarousel/AccountsCarrousel.tsx";
import './DashboardPage.scss';
import {TransactionList} from "./components/TransactionList/TransactionList.tsx";

function DashboardPage() {
    const today = new Date();
    const startDate = formatToLocalDate(new Date(today.getFullYear(), today.getMonth(), 1));
    const endDate = formatToLocalDate(new Date(today.getFullYear(), today.getMonth() + 1, 0));

    const { isLoading, isError, data } = useDashboardData(startDate, endDate);

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
                    <p className="text-red-400 text-lg mb-2">Erro ao carregar dados.</p>
                    <button onClick={() => window.location.reload()} className="btn btn-outline-light btn-sm">
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

                <div className="row g-4 mb-5">
                    <div className="col-12 col-md-4">
                        <StatCard
                            title="Saldo Total"
                            value={data.summary.monthBalance}
                            icon={<WalletIcon/>}
                            description="Balanço do mês atual"
                            colorVariant="purple"
                            className=''
                        />
                    </div>
                    <div className="col-12 col-md-4">
                        <StatCard
                            title="Receitas"
                            value={data.summary.monthTotalIncome}
                            icon={<TrendingUpIcon/>}
                            description="Entradas este mês"
                            colorVariant="green"
                            className=''
                        />
                    </div>
                    <div className="col-12 col-md-4">
                        <StatCard
                            title="Despesas"
                            value={data.summary.monthTotalExpense}
                            icon={<TrendingDownIcon/>}
                            description="Saídas este mês"
                            colorVariant="red"
                            className=''
                        />
                    </div>
                </div>

                <div className="row g-4">
                    <div className="col-12 col-lg-7">
                        <AccountsCarousel accounts={data.accounts}/>

                        <div
                            className="p-4 rounded border border-zinc-700 bg-zinc-800 mt-4 text-center text-muted-custom">
                            Espaço para Gráfico de Despesas
                        </div>
                    </div>


                    <div className="col-12 col-lg-5">
                        <TransactionList transactions={data.currentMonthTransactions}
                                         onViewAll={() => console.log('Ver todas')}
                                         maxItems={5}
                        />
                    </div>
                </div>

            </div>
        </div>
    );
}

export default DashboardPage;