import { formatCurrency } from '../../../utils/formatCurrency';
import clsx from 'clsx';

interface AccountCardProps {
    name: string;
    balance: number;
    className?: string;
    onClick?: () => void;
}

export const AccountCard = ({ name, balance, className, onClick }: AccountCardProps) => (
    <div className={clsx("account-card p-3 d-flex flex-column justify-content-between", className)} onClick={onClick}>
        <div className="mb-3 text-warning">
            { onClick ? <i className="bi bi-plus-circle fs-4"/> : <i className="bi bi-wallet2 fs-4"/>}
        </div>
        <div>
            <small className="text-white-50 d-block mb-1 text-uppercase fw-bold label-small">
                {name}
            </small>
            <h5 className="text-white mb-0 value">
                {onClick? name : formatCurrency(balance)}
            </h5>
        </div>
    </div>
);