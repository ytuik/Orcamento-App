import React, { createContext, useContext, useState, useRef, useEffect, useCallback, forwardRef } from "react";
import { ChevronDown, Check } from "lucide-react";
import clsx from "clsx";

interface SelectContextType {
    value: string;
    onChange: (value: string) => void;
    open: boolean;
    setOpen: (open: boolean) => void;
}

const SelectContext = createContext<SelectContextType | undefined>(undefined);

interface SelectProps {
    value: string;
    onValueChange: (value: string) => void;
    children: React.ReactNode;
    className?: string;
}

export const Select: React.FC<SelectProps> = ({ value, onValueChange, children, className }) => {
    const [open, setOpen] = useState(false);
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
                setOpen(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    useEffect(() => {
        const handleEsc = (event: KeyboardEvent) => {
            if (event.key === 'Escape' && open) {
                setOpen(false);
            }
        };
        document.addEventListener("keydown", handleEsc);
        return () => document.removeEventListener("keydown", handleEsc);
    }, [open]);

    return (
        <SelectContext.Provider value={{ value, onChange: onValueChange, open, setOpen}}>
            <div className={clsx("ui-select", className)} ref={containerRef}>
                {children}
            </div>
        </SelectContext.Provider>
    );
};

interface SelectTriggerProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    children: React.ReactNode;
    className?: string;
}

export const SelectTrigger = forwardRef<HTMLButtonElement, SelectTriggerProps>(
    ({ className, children, ...props }, ref) => {
        const context = useContext(SelectContext);
        if (!context) throw new Error("SelectTrigger must be used within Select");

        return (
            <button
                type="button"
                className={clsx("ui-select__trigger", className)}
                onClick={() => context.setOpen(!context.open)}
                ref={ref}
                aria-expanded={context.open}
                {...props}
            >
                {children}
                <ChevronDown className={clsx("ui-select__chevron", context.open && "ui-select__chevron--open")} />
            </button>
        );
    }
);

SelectTrigger.displayName = 'SelectTrigger';

export const SelectValue: React.FC<{ placeholder?: string, children?: React.ReactNode }> = ({ placeholder,children }) => {
    const context = useContext(SelectContext);
    return <span className="ui-select__value">{children || (context?.value || placeholder)}</span>;
};

interface SelectContentProps {
    children: React.ReactNode;
    className?: string;
    align?: "start" | "center" | "end";
    sideOffset?: number;
}

export const SelectContent: React.FC<SelectContentProps> = ({
                                                                children,
                                                                className,
                                                                sideOffset = 4
                                                            }) => {
    const context = useContext(SelectContext);
    const [position, setPosition] = useState({ top: 0, left: 0, width: 0 });
    const contentRef = useRef<HTMLDivElement>(null);

    const getTriggerElement = useCallback((): HTMLButtonElement | null => {
        const selectContainer = contentRef.current?.closest('.ui-select');
        if (selectContainer) {
            return selectContainer.querySelector('.ui-select__trigger');
        }
        return null;
    }, []);

    const updatePosition = useCallback(() => {
        const trigger = getTriggerElement();
        if (trigger && context?.open) {
            const rect = trigger.getBoundingClientRect();

            setPosition({
                top: rect.bottom + window.scrollY + sideOffset,
                left: rect.left + window.scrollX,
                width: rect.width
            });
        }
    }, [context?.open, sideOffset, getTriggerElement]);

    useEffect(() => {
        if (context?.open) {
            const timer = setTimeout(() => {
                updatePosition();
            }, 0);

            const handleResize = () => updatePosition();
            window.addEventListener('resize', handleResize);

            return () => {
                clearTimeout(timer);
                window.removeEventListener('resize', handleResize);
            };
        }
    }, [context?.open, updatePosition]);

    // Scroll listener para reposicionar
    useEffect(() => {
        if (context?.open) {
            const handleScroll = () => updatePosition();
            window.addEventListener('scroll', handleScroll, true);

            return () => window.removeEventListener('scroll', handleScroll, true);
        }
    }, [context?.open, updatePosition]);

    if (!context || !context.open) return null;

    return (
        <div
            ref={contentRef}
            className={clsx("ui-select__content", className)}
            style={{
                top: `${position.top}px`,
                left: `${position.left}px`,
                width: `fit-content`,
                zIndex: 9999,
            }}
        >
            {children}
        </div>
    );
};

interface SelectItemProps {
    value: string;
    children: React.ReactNode;
    className?: string;
    disabled?: boolean;
}

export const SelectItem: React.FC<SelectItemProps> = ({
                                                          value,
                                                          children,
                                                          className,
                                                          disabled = false
                                                      }) => {
    const context = useContext(SelectContext);
    if (!context) throw new Error("SelectItem must be used within Select");

    const isSelected = context.value === value;

    const handleSelect = (e: React.MouseEvent) => {
        if (disabled) return;
        e.stopPropagation();
        context.onChange(value)
        context.setOpen(false);
    };

    return (
        <div
            className={clsx(
                "ui-select__item",
                isSelected && "ui-select__item--selected",
                disabled && "ui-select__item--disabled",
                className
            )}
            onClick={handleSelect}
            role="option"
            aria-selected={isSelected}
            aria-disabled={disabled}
        >
            <span className="ui-select__item-text">{children}</span>
            {isSelected && <Check className="ui-select__item-check" />}
        </div>
    );
};

interface SelectGroupProps {
    children: React.ReactNode;
    className?: string;
}

export const SelectGroup: React.FC<SelectGroupProps> = ({ children, className }) => {
    return <div className={clsx("ui-select__group", className)}>{children}</div>;
};
