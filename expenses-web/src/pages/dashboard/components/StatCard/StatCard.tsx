import React from "react";
import clsx from "clsx";
import { formatCurrency } from '../../../../utils/formatCurrency.ts';

type ColorVariant = 'purple' | 'green' | 'red' | 'blue' | 'yellow' | 'pink' | 'gray';

interface StatCardProps {
    title: string;
    value: number;
    icon: React.ReactNode;
    colorVariant: ColorVariant;
    description: string;
    className?: string;
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
            "stat-card-base h-100 p-4 border-left-transparent",
            `border-left-${colorVariant}`,
            "hover-stat-card",
            className
        )}>
            <div className="d-flex align-items-end justify-content-between mb-3">
                <div className="content">
                    <span className="stat-title">{title}</span>
                    <div className={clsx("stat-value my-2", `text-${colorVariant}`)}>
                        {formatCurrency(value)}
                    </div>
                </div>
                <div className={clsx(
                    "d-flex align-items-md-center justify-content-center icon-42 icon-opacity-90 ps-1",
                    `text-${colorVariant}`
                )}>
                    {icon}
                </div>
            </div>
            <div className="stat-description">
                {description}
            </div>
        </div>
    );
};