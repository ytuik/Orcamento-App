import { format, parseISO } from "date-fns"; // Adicionado parseISO
import { ptBR } from "date-fns/locale";
import { memo } from "react";
import type { TransactionDto } from "../../../types/transactionDto";
import type { CategoryDto } from "../../../types/categoryDto";
import { getIconByKey } from "../../../utils/iconUtils.tsx";
import type {AccountDto} from "../../../types/accountDto";

interface TransactionItemProps {
    data: TransactionDto;
    category?: CategoryDto | null;
    account?: AccountDto | null;
}

export const TransactionItem = memo(({ data, category, account }: TransactionItemProps) => {
    const isIncome = data.type === 'INCOME';

    const iconKey = category?.iconKey || 'OTHER';
    const colorTheme = category?.color || (isIncome ? 'green' : 'red');
    const categoryName = category?.name || 'Sem categoria';
    const accountName = account?.name || 'Conta desconhecida';
    const accountTheme = account?.id == 1 ? 'purple' : 'amber';

    const formattedDate = format(parseISO(data.transactionDate), "dd MMM", { locale: ptBR });

    const formattedAmount = data.amount.toLocaleString('pt-BR', {
        style: 'currency',
        currency: 'BRL'
    });

    return (
        <div className={`transaction-item variant-${accountTheme}`}>
            <div className="d-flex align-items-center gap-4">
                <div className={`icon-wrapper variant-${colorTheme}`}>
                    {getIconByKey(iconKey)}
                </div>

                <div className="info-wrapper">
                    <h4 className="title">{data.description}</h4>
                    <span className="account">{accountName}</span>
                    <span className="category">{categoryName}</span>
                </div>
            </div>

            <div className="amount-wrapper">
                <span className={`amount ${isIncome ? 'text-income' : 'text-expense'}`}>
                    {formattedAmount}
                </span>
                <span className="date">
                    {formattedDate}
                </span>
            </div>
        </div>
    );
});