import { format, parseISO } from "date-fns";
import { ptBR } from "date-fns/locale";
import {memo, useState} from "react";
import type { TransactionDto } from "../../../types/transactionDto";
import type { CategoryDto } from "../../../types/categoryDto";
import { getIconByKey } from "../../../utils/iconUtils.tsx";
import type {AccountDto} from "../../../types/accountDto";
import {Pencil, Trash2} from "lucide-react";
import './TransactionItem.scss';

interface TransactionItemProps {
    data: TransactionDto;
    category?: CategoryDto | null;
    account?: AccountDto | null;
    onEdit: () => void;
    onDelete: () => void;
    actionButtonsVisible?: boolean;
}

export const TransactionItem = memo(({ data, category, account, onEdit, onDelete, actionButtonsVisible }: TransactionItemProps) => {
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

    const [isExpanded, setIsExpanded] = useState(false);
    const handleClick = () => {
        if(actionButtonsVisible){
            setIsExpanded(!isExpanded);
        }
    }

    return (
        <div
            onClick={handleClick}
            className={`transaction-item variant-${accountTheme} ${isExpanded ? 'is-expanded' : ''}`}
        >
            <div className="left-content d-flex align-items-center gap-4">
                <div className={`icon-wrapper variant-${colorTheme}`}>
                    {getIconByKey(iconKey)}
                </div>

                <div className="info-wrapper">
                    <h4 className="title">{data.description}</h4>
                    <span className="account">{accountName}</span>
                    <span className="category">{categoryName}</span>
                </div>
            </div>

            <div className={"right-content"} >
                <div className="amount-wrapper">
                    <span className={`amount ${isIncome ? 'text-income' : 'text-expense'}`}>
                        {formattedAmount}
                    </span>
                    <span className="date">
                        {formattedDate}
                    </span>
                </div>

                {isExpanded && actionButtonsVisible &&
                    <div className={"action-buttons fade-in"}>
                        <button className={`action-btn edit-btn`}
                            onClick={() => {onEdit() }}>
                            <Pencil size={16}/>
                        </button>
                        <button className={`action-btn delete-btn`}
                            onClick={() => {
                                onDelete()
                            }}>
                            <Trash2 size={16}/>
                        </button>
                    </div>
                }
            </div>
        </div>
    );
});