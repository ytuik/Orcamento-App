import clsx from 'clsx';
import React from "react";

interface AccountCardProps {
    name: string;
    balance: number;
    className?: string;
    onClick?: () => void;
    children?: React.ReactNode
}

export const AccountCard = ({ name, balance, className, onClick, children }: AccountCardProps) => {
    return (
        <div
            className={clsx(
                "bg-zinc-900 border-f border-zinc-700 rounded-lg min-w-220 p-4 cursor-pointer",
                "hover-card-lift",
                className
            )}
            onClick={onClick}
        >
            <div className="d-flex flex-column">
                <h4 className="text-zinc-400 fw-semibold mb-2">{name}</h4>
                <div className="mt-auto">
                    <span className="label-small text-zinc-400">Saldo atual</span>
                    <p className={clsx("fw-bold fs-5 mb-0", onClick ? 'text-zinc-900' : "text-purple") }>
                        {onClick? name : balance.toLocaleString('pt-BR', {
                            style: 'currency',
                            currency: 'BRL'
                        })}
                    </p>
                </div>
            </div>
            {children}
        </div>
    );
}