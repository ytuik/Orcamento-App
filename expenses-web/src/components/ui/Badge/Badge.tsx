import React from "react";
import { cn } from '../../../utils/cn';

export type BadgeVariant = 'primary' | 'success' | 'danger';

interface BadgeProps {
    children: React.ReactNode;
    variant?: BadgeVariant;
    className?: string;
}

const variantStyles: Record<BadgeVariant, string> = {
    success: "bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300",
    danger: "bg-red-100 text-red-700 dark:bg-red-900 dark:text-red-300",
    primary: "bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300",
};

export const Badge = ({
                          children,
                          variant = 'primary',
                          className
                      }: BadgeProps) => {
    return (
        <span className={cn(
            "inline-flex items-center rounded-full px-3 py-1 text-xs font-medium transition-colors",
            variantStyles[variant],
            className
        )}>
      {children}
    </span>
    );
};