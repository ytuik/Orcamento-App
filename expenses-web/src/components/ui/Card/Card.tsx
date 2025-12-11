import React from "react";
import clsx from "clsx";

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
    hoverEffect?: boolean;
}

export const Card = React.forwardRef<HTMLDivElement, CardProps>(
    ({ className, hoverEffect = false, ...props }, ref) => {
        return (
            <div
                ref={ref}
                className={clsx(
                    "ui-card",
                    hoverEffect && "ui-card--interactive",
                    className
                )}
                {...props}
            />
        );
    }
);
Card.displayName = "Card";