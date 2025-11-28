import React from "react";
import clsx from "clsx";
import { formatCurrency } from '../../../../utils/formatCurrency.ts';
import './StatCard.scss';

type ColorVariant = 'purple' | 'green' | 'red';

interface StatCardProps {
    title: string;
    value: number;
    icon: React.ReactNode;
    colorVariant: ColorVariant;
    description: string;
    className: string;
}

export const StatCard = ({
                             title,
                             value,
                             icon,
                             colorVariant,
                             description,
                             className
                         }: StatCardProps) => {

    return (
        <div className={clsx(
            "stat-card h-100 p-4",
            `variant-${colorVariant}`,
            className
        )}>
            <div className="d-flex align-items-end justify-content-between mb-3">
                <div className="content">
                    <span className="card-title text-muted-custom">{title}</span>
                    <div className={clsx("card-value my-2", `text-${colorVariant}`)}>
                        {formatCurrency(value)}
                    </div>
                </div>
                <div className={clsx("card-icon", `icon-${colorVariant}`, "ps-1")}>
                    {icon}
                </div>
            </div>
            <div className="card-description text-white-50">
                {description}
            </div>
        </div>

    );
};