import {useDashboardData} from "./hooks/useDashboardData.ts";
import {formatToLocalDate} from "../../utils/formatToLocalDate.ts";
import {LoadingSpinner} from "../../components/ui/LoadingSpinner/LoadingSpinner.tsx";
import {TrendingDownIcon, TrendingUpIcon, WalletIcon} from "../../components/icons";
import {DashboardHeader} from "./components/DashboardHeader.tsx";
import {formatCurrency} from "../../utils/formatCurrency.ts";
import './DashboardPage.scss'
import {StatCard} from "./components/StatCard.tsx";

function DashboardPage() {
    const date = new Date()
    const startDate =formatToLocalDate( new Date(date.getFullYear(), date.getMonth(), 1));
    const endDate = formatToLocalDate( new Date(date.getFullYear(), date.getMonth() + 1, 0));
    const {isLoading, isError, data} = useDashboardData(startDate, endDate);

    if (isLoading) {
        return <LoadingSpinner />
    }

    if (isError || !data) {
        return (
            <div className="flex items-center justify-center h-screen bg-gray-900">
                <p className="text-red-500 text-lg">Erro ao carregar os dados.</p>
            </div>
        );
    }

    return (
        <div className="d-flex align-items-center flex-column">
            <DashboardHeader/>
            <div className="d-grid col-2 gap-2 mt-3">

              <StatCard title={"Receita"} value={data.monthTotalIncome} icon={<TrendingUpIcon></TrendingUpIcon>} description={"Total de Income"} />
            </div>

            {/*<div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">*/}

            {/*    <Card>*/}
            {/*        <CardContent>*/}
            {/*            <div className="flex items-center space-x-4">*/}
            {/*                <div className="p-3 rounded-full bg-blue-100 text-blue-700">*/}
            {/*                    <TrendingUpIcon />*/}
            {/*                </div>*/}
            {/*                <div>*/}
            {/*                    <h4 className="text-lg font-medium">Lucro</h4>*/}
            {/*                    <p className="text-2xl font-semibold">*/}
            {/*                        {formatCurrency(data.monthTotalIncome)}*/}
            {/*                    </p>*/}
            {/*                </div>*/}
            {/*            </div>*/}
            {/*        </CardContent>*/}
            {/*    </Card>*/}
            {/*    <Card>*/}
            {/*        <CardContent>*/}
            {/*            <div className="flex items-center space-x-4">*/}
            {/*                <div className="p-3 rounded-full bg-red-100 text-red-700">*/}
            {/*                    <TrendingDownIcon />*/}
            {/*                </div>*/}
            {/*                <div>*/}
            {/*                    <h4 className="text-lg font-medium">Despesas</h4>*/}
            {/*                    <p className="text-2xl font-semibold">*/}
            {/*                        {formatCurrency(data.monthTotalExpense)}*/}
            {/*                    </p>*/}
            {/*                </div>*/}
            {/*            </div>*/}
            {/*        </CardContent>*/}
            {/*    </Card>*/}
            {/*</div>*/}
        </div>
    );
}

export default DashboardPage