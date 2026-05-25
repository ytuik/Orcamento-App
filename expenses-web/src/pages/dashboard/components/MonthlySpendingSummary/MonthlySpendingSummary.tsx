// MonthlySpendingSummary.tsx
import { motion } from "framer-motion";
import { getIconByKey } from "@/utils/iconUtils.tsx";
import type {CategoryExpenseSummary} from "@/pages/dashboard/hooks/useDashboardData.ts";
import {format} from "date-fns";
import {useNavigate} from "react-router-dom";
import clsx from "clsx";
import {MonthlySpendingChart} from "./MonthlySpendingChart.tsx";

interface MonthlySpendingSummaryProps {
    expensesByCategory: CategoryExpenseSummary[];
    summary: {
        sumAllAccountBalances: number;
        monthTotalIncome: number;
        monthTotalExpense: number;
        monthBalance: number;
        activeCategoriesCount: number;
    };
}

export const MonthlySpendingSummary = ({ expensesByCategory, summary }: MonthlySpendingSummaryProps) => {
    const navigate = useNavigate()
    const searchByCategory = (categoryId: number, month:Date) => {
        const params = new URLSearchParams()
        const initialDate = format(month, 'yyyy-MM-dd');
        params.append('dateFilterType', 'MONTH')
        params.append('initialDate', initialDate)
        params.append('categoryId', categoryId.toString())
        navigate(`/transactions?${params.toString()}`)
    }

    return (
        <div className="widget-base border-f border-zinc-700">
            {/* Header */}
            <div className="d-flex justify-content-between align-items-start pb-4">
                <div>
                    <h3 className="widget-title">Gastos por Categoria</h3>
                    <span className="widget-subtitle">Resumo do mês atual</span>
                </div>
                <div className="text-end">
                    <span className="widget-total-label">Total Gasto</span>
                    <h2 className="widget-total-value text-red">
                        R$ {summary.monthTotalExpense.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                    </h2>
                </div>
            </div>

            <MonthlySpendingChart data={expensesByCategory} searchByCategory={searchByCategory}/>

            <div className="d-flex flex-column gap-5 mt-6">
                {expensesByCategory.map((item) => {
                    const catName = item.name || 'Desconhecida';
                    const catColor = item.color || 'gray';
                    const catIconKey = item.iconKey || 'OTHER';
                    const catId = item.categoryId || 0;
                    const catMonth = item.month || new Date();

                    return (
                        <div
                            key={catId}
                            className="d-flex flex-column gap-3 cursor-pointer"
                            onClick={() => searchByCategory(catId, catMonth)}
                        >
                            <div className="d-flex justify-content-between align-items-center">
                                <div className="d-flex align-items-start gap-3">
                                    <div className={clsx(
                                        "category-icon-wrapper d-flex align-items-md-center justify-content-center category-icon-md",
                                        `category-icon-wrapper--${catColor}`
                                    )}>
                                        {getIconByKey(catIconKey)}
                                    </div>
                                    <div>
                                        <h4 className="text-zinc-100 fw-medium fs-6 mb-0">{catName}</h4>
                                        <span className="text-zinc-500 fs-8">
                                            {item.percentage.toFixed(1)}% do total
                                        </span>
                                    </div>
                                </div>
                                <span className={clsx(`text-${catColor}`, "fw-semibold fs-6")}>
                                    R$ {item.amount.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                                </span>
                            </div>

                            <div className="progress-track">
                                <motion.div
                                    className={clsx("progress-bar", `progress-bar-${catColor}`)}
                                    initial={{ width: 0 }}
                                    animate={{ width: `${item.percentage}%` }}
                                    transition={{ duration: 0.8, ease: "easeOut" }}
                                />
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};