import { TransactionCategory } from '../../../../types/transactionDto/transactionCategory';
import {motion} from "framer-motion";
import { Home} from 'lucide-react';
import './MonthlySpendingSummary.scss'
import {getCategoryConfig} from "../../../../utils/transactionUtils.tsx";


interface MonthlySpendingSummaryProps {
    expensesByCategory : {
        category: TransactionCategory,
        amount: number,
        count: number,
        percentage: number
    }[],
    summary: {
        sumAllAccountBalances : number,
        monthTotalIncome: number,
        monthTotalExpense : number,
        monthBalance: number,
        activeCategoriesCount: number,
    }

}

export const MonthlySpendingSummary = ({expensesByCategory, summary} : MonthlySpendingSummaryProps ) => {

    return (
        <div className="category-widget">
            {/* Header */}
            <div className="d-flex justify-content-between align-items-start">
                <div>
                    <h3 className="category-widget__title">Gastos por Categoria</h3>
                    <span className="category-widget__subtitle">Resumo do mês atual</span>
                </div>
                <div>
                    <span className="category-widget__total-label">Total Gasto</span>
                    <h2 className="category-widget__total-value">
                        R$ {summary.monthTotalExpense.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                    </h2>
                </div>
            </div>

            <div className="category-widget__list">
                {expensesByCategory.map((item) => {
                    const config = getCategoryConfig(item.category);

                    return (
                    <div key={config.label} className="category-widget__item">

                        <div className="category-widget__row">
                            <div className="category-widget__info">
                                <div className={`category-widget__icon-box category-widget__icon-box--${config.color}`}>
                                    {config.icon || <Home size={20} />}
                                </div>
                                <div>
                                    <h4 className="category-widget__name">{config.label}</h4>
                                    <span className="category-widget__percent">{item.percentage.toPrecision(4)}% do total</span>
                                </div>
                            </div>

                            {/* Valor Monetário */}
                            <span className={`category-widget__amount category-widget__amount--${config.color}`}>
                                R$ {item.amount.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                            </span>
                        </div>

                        <div className="category-widget__track">
                            <motion.div
                                className={`category-widget__bar category-widget__bar--${config.color}`}
                                initial={{ width: 0 }}
                                animate={{ width: `${item.percentage}%` }}
                                transition={{ duration: 0.8, ease: "easeOut" }}
                            />
                        </div>
                    </div>
                    );})}
            </div>

        </div>
    );
};