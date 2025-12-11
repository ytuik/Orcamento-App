import React from "react";
import clsx from "clsx";
import { useCategoryData } from "../../hooks/useCategoryData.ts"; // Ajuste o path se necessário
import { getIconByKey } from "../../utils/iconUtils"; // O utilitário que criamos

interface CategoryIconProps {
    categoryId: number;
    className?: string;
    size?: 'sm' | 'md' | 'lg';
}

export const CategoryIcon: React.FC<CategoryIconProps> = ({
                                                              categoryId,
                                                              className,
                                                              size = 'md'
                                                          }) => {

    const { allCategories } = useCategoryData();

    const category = allCategories?.find(c => c.id === categoryId);

    const displayColor = category?.color || 'gray';
    const displayName = category?.name || 'Desconhecido';
    const displayIconKey = category?.iconKey || 'OTHER';

    const sizeClasses = {
        sm: 'category-icon-sm', // 32px
        md: 'category-icon-md', // 40px
        lg: 'category-icon-lg'  // 48px
    };

    return (
        <div
            className={clsx(
                "category-icon-wrapper",
                `category-icon-wrapper--${displayColor}`, // Usa a cor vinda do objeto
                sizeClasses[size],
                className
            )}
            title={displayName}
            aria-label={displayName}
            role="img"
        >
            {/* Usa o utilitário para transformar a string (ex: "FOOD") em Ícone React */}
            {getIconByKey(displayIconKey)}
        </div>
    );
};