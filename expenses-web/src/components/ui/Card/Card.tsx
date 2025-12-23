// Card.tsx
import React from "react";
import clsx from "clsx";

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
    hoverEffect?: boolean;
    padding?: 'none' | 'sm' | 'md' | 'lg' | 'xl';
    variant?: 'default' | 'outline' | 'filled';
    shadow?: 'none' | 'sm' | 'md' | 'lg';
    rounded?: 'sm' | 'md' | 'lg' | 'full' | 'none';
}

export const Card = React.forwardRef<HTMLDivElement, CardProps>(
    ({
         className,
         hoverEffect = false,
         padding = 'md',
         variant = 'default',
         shadow = 'sm',
         rounded = 'lg',
         ...props
     }, ref) => {

        const paddingClasses = {
            none: 'p-0',
            sm: 'p-4',
            md: 'p-6',
            lg: 'p-8',
            xl: 'p-10'
        }[padding];

        const variantClasses = {
            default: 'bg-zinc-800 border border-zinc-700',
            outline: 'bg-transparent border border-zinc-700',
            filled: 'bg-zinc-800 border-0'
        }[variant];

        const shadowClasses = {
            none: '',
            sm: 'shadow-custom-sm',
            md: 'shadow-custom-md',
            lg: 'shadow-custom-lg'
        }[shadow];

        const roundedClasses = {
            none: 'rounded-0',
            sm: 'rounded-sm',
            md: 'rounded-md',
            lg: 'rounded-lg',
            full: 'rounded-full'
        }[rounded];

        return (
            <div
                ref={ref}
                className={clsx(
                    variantClasses,
                    paddingClasses,
                    shadowClasses,
                    roundedClasses,
                    "transition-all",
                    hoverEffect && "hover-lift hover-shadow-custom-md cursor-pointer",
                    className
                )}
                {...props}
            />
        );
    }
);

Card.displayName = "Card";