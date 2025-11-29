import React from "react";
import clsx from "clsx";
import {getCategoryConfig} from "../../utils/transactionUtils.tsx";

interface CategoryIconProps {
    category: string;
    className?: string;
    size?: 'sm' | 'md' | 'lg';
}

export const CategoryIcon: React.FC<CategoryIconProps> = ({
                                                              category,
                                                              className,
                                                              size = 'md'
                                                          }) => {
    const { icon, color, label } = getCategoryConfig(category);

    const sizeClasses = {
        sm: 'category-icon-sm', // 32px
        md: 'category-icon-md', // 40px
        lg: 'category-icon-lg'  // 48px
    };

    return (
        <div
            className={clsx(
                "category-icon-wrapper",
                `category-icon-wrapper--${color}`,
                sizeClasses[size],
                className
            )}
            title={label}
            aria-label={label}
        >
            {icon}
        </div>
    );
};