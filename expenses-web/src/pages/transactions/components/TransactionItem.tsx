
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import type {TransactionDto} from "../../../types/transactionDto";
import {getIconByKey} from "../../../utils/iconUtils.tsx";
import {useCategoryData} from "../../../hooks/useCategoryData.ts";

interface TransactionItemProps {
    data: TransactionDto;
}

export const TransactionItem = ({ data }: TransactionItemProps) => {
    const category = useCategoryData().allCategories.find(cat => cat.id === data.categoryId);
    const isIncome = data.type === 'INCOME';
    const iconKey = category?.iconKey || 'OTHER';
    const colorTheme = category?.color || (isIncome ? 'green' : 'red');

    return (
        <div className="transaction-item">
            <div className="flex items-center gap-4">
                {/* Ícone com fundo colorido */}
                <div className={`icon-wrapper variant-${colorTheme}`}>
                    {getIconByKey(iconKey)}
                </div>

                {/* Textos */}
                <div className="info-wrapper">
                    <h4 className="title">{data.description}</h4>
                    <span className="category">{category?.name || 'Sem categoria'}</span>
                </div>
            </div>

            <div className="amount-wrapper">
                <span className={`amount ${isIncome ? 'text-income' : 'text-expense'}`}>
                    {isIncome ? '+ ' : '- '}
                    {data.amount.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
                </span>
                <span className="date">
                    {format(new Date(data.transactionDate), "dd MMM", { locale: ptBR })}
                </span>
            </div>
        </div>
    );
};