import React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { twMerge } from 'tailwind-merge';

const accordionVariants = cva(
    [
        'w-full',
        'rounded-lg',
        'divide-y',
        'divide-gray-200',
        'dark:divide-gray-700',
        'bg-white',
        'dark:bg-gray-800',
        'shadow-sm',
    ],
    {
        variants: {
            variant: {
                default: 'border border-gray-200 dark:border-gray-700',
                ghost: '',
            },
        },
        defaultVariants: {
            variant: 'default',
        },
    }
);

const accordionTriggerVariants = cva(
    [
        'flex',
        'w-full',
        'items-center',
        'justify-between',
        'py-4',
        'px-4',
        'text-left',
        'text-sm',
        'font-medium',
        'text-gray-900',
        'dark:text-gray-100',
        'transition-all',
        'hover:bg-gray-50',
        'dark:hover:bg-gray-700',
        'focus:outline-none',
        'focus:ring-2',
        'focus:ring-primary-500',
        'focus:ring-offset-2',
        'dark:focus:ring-offset-gray-800',
    ],
    {
        variants: {
            disabled: {
                true: 'opacity-50 cursor-not-allowed',
                false: 'cursor-pointer',
            },
        },
        defaultVariants: {
            disabled: false,
        },
    }
);

const accordionContentVariants = cva(
    [
        'text-sm',
        'text-gray-600',
        'dark:text-gray-300',
    ],
    {
        variants: {
            variant: {
                default: 'px-4',
                ghost: 'px-4',
            },
        },
        defaultVariants: {
            variant: 'default',
        },
    }
);

export interface AccordionProps
    extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof accordionVariants> {
    /**
     * Allow multiple items to be expanded at once
     */
    multiple?: boolean;
    /**
     * Default expanded item values
     */
    defaultValue?: string | string[];
    /**
     * Controlled expanded values
     */
    value?: string | string[];
    /**
     * Callback when value changes
     */
    onValueChange?: (value: string | string[]) => void;
    /**
     * Custom styles
     */
    sx?: { [key: string]: any };
}

export interface AccordionItemProps extends React.HTMLAttributes<HTMLDivElement> {
    /**
     * Unique value for the item
     */
    value: string;
    /**
     * Whether the item is disabled
     */
    disabled?: boolean;
}

export interface AccordionTriggerProps
    extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    /**
     * Icon to show when item is expanded
     */
    expandIcon?: React.ReactNode;
    /**
     * Icon to show when item is collapsed
     */
    collapseIcon?: React.ReactNode;
}

export interface AccordionContentProps extends React.HTMLAttributes<HTMLDivElement> { }

const AccordionContext = React.createContext<{
    value: string | string[];
    onValueChange: (value: string) => void;
    multiple: boolean;
}>({
    value: '',
    onValueChange: () => { },
    multiple: false,
});

const AccordionItemContext = React.createContext<{
    value: string;
    disabled?: boolean;
}>({
    value: '',
});

export const Accordion = React.forwardRef<HTMLDivElement, AccordionProps>(
    (
        {
            className,
            variant,
            multiple = false,
            defaultValue,
            value: controlledValue,
            onValueChange,
            children,
            sx,
            ...props
        },
        ref
    ) => {
        const [value, setValue] = React.useState<string | string[]>(
            controlledValue ?? defaultValue ?? (multiple ? [] : '')
        );

        React.useEffect(() => {
            if (controlledValue !== undefined) {
                setValue(controlledValue);
            }
        }, [controlledValue]);

        const handleValueChange = React.useCallback(
            (itemValue: string) => {
                const newValue = multiple
                    ? Array.isArray(value)
                        ? value.includes(itemValue)
                            ? value.filter((v) => v !== itemValue)
                            : [...value, itemValue]
                        : [itemValue]
                    : itemValue === value
                        ? ''
                        : itemValue;

                if (controlledValue === undefined) {
                    setValue(newValue);
                }
                onValueChange?.(newValue);
            },
            [multiple, value, onValueChange, controlledValue]
        );

        const accordionClassName = sx ? `accordion-${Math.random().toString(36).slice(2, 11)}` : '';

        return (
            <>
                {sx && (
                    <style>
                        {`
                            .${accordionClassName} {
                                transition: all 300ms cubic-bezier(0.4, 0, 0.2, 1);
                                ${Object.entries(sx)
                                .filter(([key]) => !key.startsWith('&') && !key.startsWith('@media'))
                                .map(([key, value]) => `${key.replace(/[A-Z]/g, '-$&').toLowerCase()}: ${value};`)
                                .join('\n')}
                            }
                            ${Object.entries(sx)
                                .filter(([key]) => key.startsWith('&') || key.startsWith('@media'))
                                .map(([key, value]) => `
                                    ${key.startsWith('@media') ? key : `.${accordionClassName}${key.slice(1)}`} {
                                        ${Object.entries(value as object)
                                        .map(([k, v]) => `${k.replace(/[A-Z]/g, '-$&').toLowerCase()}: ${v};`)
                                        .join('\n')}
                                    }
                                `)
                                .join('\n')}
                        `}
                    </style>
                )}
                <div
                    ref={ref}
                    className={twMerge(accordionVariants({ variant }), accordionClassName, className)}
                    data-testid="accordion-root"
                    {...props}
                >
                    <AccordionContext.Provider
                        value={{
                            value,
                            onValueChange: handleValueChange,
                            multiple,
                        }}
                    >
                        {children}
                    </AccordionContext.Provider>
                </div>
            </>
        );
    }
);

export const AccordionItem = React.forwardRef<HTMLDivElement, AccordionItemProps>(
    ({ className, value, disabled, children, ...props }, ref) => {
        return (
            <div ref={ref} className={twMerge('', className)} {...props}>
                <AccordionItemContext.Provider
                    value={{
                        value,
                        disabled,
                    }}
                >
                    {children}
                </AccordionItemContext.Provider>
            </div>
        );
    }
);

const ChevronIcon = ({ expanded }: { expanded: boolean }) => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        width="16"
        height="16"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className={twMerge('transition-transform', expanded ? 'rotate-180' : '')}
    >
        <polyline points="6 9 12 15 18 9" />
    </svg>
);

export const AccordionTrigger = React.forwardRef<HTMLButtonElement, AccordionTriggerProps>(
    ({ className, children, expandIcon, collapseIcon, onClick, ...props }, ref) => {
        const { value, onValueChange } = React.useContext(AccordionContext);
        const { value: itemValue, disabled } = React.useContext(AccordionItemContext);
        const expanded = Array.isArray(value)
            ? value.includes(itemValue)
            : value === itemValue;

        const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
            if (onClick) {
                onClick(e);
            }
            if (!e.defaultPrevented && !disabled) {
                onValueChange(itemValue);
            }
        };

        return (
            <button
                ref={ref}
                type="button"
                onClick={handleClick}
                className={twMerge(
                    accordionTriggerVariants({ disabled }),
                    'group',
                    className
                )}
                disabled={disabled}
                aria-expanded={expanded}
                {...props}
            >
                <span className="flex-1">{children}</span>
                <span className="ml-2 flex-shrink-0">
                    {expanded
                        ? expandIcon || <ChevronIcon expanded={true} />
                        : collapseIcon || <ChevronIcon expanded={false} />}
                </span>
            </button>
        );
    }
);

export const AccordionContent = React.forwardRef<HTMLDivElement, AccordionContentProps>(
    ({ className, children, ...props }, ref) => {
        const { value } = React.useContext(AccordionContext);
        const { value: itemValue } = React.useContext(AccordionItemContext);
        const expanded = Array.isArray(value)
            ? value.includes(itemValue)
            : value === itemValue;

        const contentRef = React.useRef<HTMLDivElement>(null);
        const [height, setHeight] = React.useState<number | undefined>(expanded ? undefined : 0);

        React.useEffect(() => {
            if (!contentRef.current) return;

            if (expanded) {
                const height = contentRef.current.scrollHeight;
                setHeight(height);
            } else {
                setHeight(0);
            }
        }, [expanded]);

        return (
            <div
                ref={ref}
                className={twMerge(
                    'overflow-hidden transition-all duration-300 ease-in-out',
                    accordionContentVariants({}),
                    className
                )}
                style={{ height }}
                aria-hidden={!expanded}
                {...props}
            >
                <div ref={contentRef} className="py-4">
                    {children}
                </div>
            </div>
        );
    }
);

Accordion.displayName = 'Accordion';
AccordionItem.displayName = 'AccordionItem';
AccordionTrigger.displayName = 'AccordionTrigger';
AccordionContent.displayName = 'AccordionContent'; 