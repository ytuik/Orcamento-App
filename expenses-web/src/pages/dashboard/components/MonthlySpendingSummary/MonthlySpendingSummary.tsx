import { motion } from "framer-motion";
import { getIconByKey } from "../../../../utils/iconUtils.tsx";
import type {CategoryExpenseSummary} from "../../hooks/useDashboardData.ts";
import './MonthlySpendingSummary.scss';

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
    return (
        <div className="category-widget monthly-spending-summary-container">
            {/* Header */}
            <div className="d-flex justify-content-between align-items-start">
                <div>
                    <h3 className="category-widget__title">Gastos por Categoria</h3>
                    <span className="category-widget__subtitle">Resumo do mês atual</span>
                </div>
                <div className="text-end">
                    <span className="category-widget__total-label">Total Gasto</span>
                    <h2 className="category-widget__total-value">
                        R$ {summary.monthTotalExpense.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                    </h2>
                </div>
            </div>

            <div className="category-widget__list">
                {expensesByCategory.map((item) => {
                    const catName = item.name || 'Desconhecida';
                    const catColor = item.color || 'gray';
                    const catIconKey = item.iconKey || 'OTHER';
                    console.log(catIconKey)
                    const catId = item.categoryId || 0

                    return (
                        <div key={catId} className="category-widget__item">
                            <div className="category-widget__row">
                                <div className="category-widget__info">
                                    <div className={`category-widget__icon-box category-widget__icon-box--${catColor}`}>
                                        {getIconByKey(catIconKey)}
                                    </div>

                                    <div>
                                        <h4 className="category-widget__name">{catName}</h4>
                                        <span className="category-widget__percent">
                                            {item.percentage.toFixed(1)}% do total
                                        </span>
                                    </div>
                                </div>

                                <span className={`category-widget__amount category-widget__amount--${catColor}`}>
                                    R$ {item.amount.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                                </span>
                            </div>

                            <div className="category-widget__track">
                                <motion.div
                                    className={`category-widget__bar category-widget__bar--${catColor}`}
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