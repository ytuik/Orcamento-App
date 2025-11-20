import React from "react";
import * as RadixSeparator from '@radix-ui/react-separator';
import { cn } from '../../../utils/cn';

interface SeparatorProps extends React.ComponentPropsWithoutRef<typeof RadixSeparator.Root> {
    className?: string;
    orientation?: 'horizontal' | 'vertical';
}

export const Separator = ({
                              className,
                              orientation = 'horizontal',
                              ...props
                          }: SeparatorProps) => (
    <RadixSeparator.Root
        orientation={orientation}
        className={cn(
            "shrink-0 bg-gray-200 dark:bg-gray-700",
            orientation === 'horizontal' ? 'h-[1px] w-full' : 'w-[1px] h-full',
            className
        )}
        {...props}
    />
);