import React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { twMerge } from 'tailwind-merge';
import { useFormContext } from 'react-hook-form';

const numberInputVariants = cva(
    'w-full rounded-md border text-sm transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50',
    {
        variants: {
            variant: {
                default:
                    'border-slate-200 bg-white text-slate-900 placeholder:text-slate-500 focus:border-primary-500 focus:ring-primary-500 dark:border-slate-700 dark:bg-slate-950 dark:text-slate-100 dark:placeholder:text-slate-400 dark:focus:border-primary-400 dark:focus:ring-primary-400',
                error:
                    'border-red-500 bg-white text-slate-900 placeholder:text-slate-500 focus:border-red-500 focus:ring-red-500 dark:border-red-500 dark:bg-slate-950 dark:text-slate-100 dark:placeholder:text-slate-400 dark:focus:border-red-400 dark:focus:ring-red-400',
            },
            size: {
                default: 'h-10 px-3 py-2',
                sm: 'h-8 px-2 py-1 text-xs',
                lg: 'h-12 px-4 py-3 text-base',
            },
        },
        defaultVariants: {
            variant: 'default',
            size: 'default',
        },
    }
);

const stepperButtonVariants = cva(
    'flex items-center justify-center text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 disabled:opacity-50 disabled:cursor-not-allowed transition-colors border-l dark:border-gray-700',
    {
        variants: {
            size: {
                sm: 'w-6 h-4',
                default: 'w-8 h-5',
                lg: 'w-10 h-6',
            },
        },
        defaultVariants: {
            size: 'default',
        },
    }
);

const labelVariants = cva('block text-sm font-medium mb-1.5', {
    variants: {
        variant: {
            default: 'text-slate-700 dark:text-slate-200',
            error: 'text-red-500 dark:text-red-400',
        },
    },
    defaultVariants: {
        variant: 'default',
    },
});

const helperTextVariants = cva('text-xs mt-1.5', {
    variants: {
        variant: {
            default: 'text-slate-500 dark:text-slate-400',
            error: 'text-red-500 dark:text-red-400',
        },
    },
    defaultVariants: {
        variant: 'default',
    },
});

export interface NumberInputProps
    extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size' | 'type' | 'value' | 'defaultValue'>,
    VariantProps<typeof numberInputVariants> {
    /**
     * The label for the input
     */
    label?: string;
    /**
     * Helper text to be displayed below the input
     */
    helperText?: string;
    /**
     * Custom styles using the sx prop
     */
    sx?: { [key: string]: any };
    /**
     * Show stepper buttons
     */
    showStepper?: boolean;
    /**
     * Minimum value
     */
    min?: number;
    /**
     * Maximum value
     */
    max?: number;
    /**
     * Step value for increment/decrement
     */
    step?: number;
    /**
     * Whether the input is for currency
     */
    isCurrency?: boolean;
    /**
     * Currency symbol (e.g., '$', '€')
     */
    currencySymbol?: string;
    /**
     * Number of decimal places
     */
    decimalPlaces?: number;
    /**
     * Thousands separator
     */
    thousandsSeparator?: string;
    /**
     * Decimal separator
     */
    decimalSeparator?: string;
    /**
     * Value of the input
     */
    value?: number | string;
    /**
     * Default value
     */
    defaultValue?: number | string;
}

export const NumberInput = React.forwardRef<HTMLInputElement, NumberInputProps>(
    (
        {
            className,
            variant,
            size,
            label,
            helperText,
            name,
            sx,
            showStepper = false,
            min,
            max,
            step = 1,
            isCurrency = false,
            currencySymbol = '$',
            decimalPlaces = 2,
            thousandsSeparator = ',',
            decimalSeparator = '.',
            value,
            defaultValue,
            onChange,
            ...props
        },
        ref
    ) => {
        const formContext = useFormContext();
        const isFormField = formContext && name;

        const fieldState = isFormField ? formContext.getFieldState(name, formContext.formState) : null;
        const hasError = Boolean(fieldState?.error);
        const errorMessage = fieldState?.error?.message;

        const inputClassName = sx ? `number-input-${Math.random().toString(36).slice(2, 11)}` : '';
        const registerProps = isFormField ? formContext.register(name) : {};

        const formatNumber = (num: number): string => {
            if (isCurrency) {
                const parts = Math.abs(num).toFixed(decimalPlaces).split('.');
                parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, thousandsSeparator);
                const formattedNumber = parts.join(decimalSeparator);
                return `${num < 0 ? '-' : ''}${currencySymbol}${formattedNumber}`;
            }
            return num.toString();
        };

        const parseNumber = (value: string): number => {
            if (isCurrency) {
                const cleanValue = value
                    .replace(currencySymbol, '')
                    .replace(new RegExp(`\\${thousandsSeparator}`, 'g'), '')
                    .replace(decimalSeparator, '.');
                return parseFloat(cleanValue) || 0;
            }
            return parseFloat(value) || 0;
        };

        const [localValue, setLocalValue] = React.useState<string>(() => {
            const initialValue = value ?? defaultValue ?? '';
            return initialValue ? formatNumber(typeof initialValue === 'string' ? parseFloat(initialValue) : initialValue) : '';
        });

        React.useEffect(() => {
            if (value !== undefined) {
                setLocalValue(formatNumber(typeof value === 'string' ? parseFloat(value) : value));
            }
        }, [value]);

        const inputRef = React.useRef<HTMLInputElement | null>(null);
        const mergedRef = React.useCallback(
            (node: HTMLInputElement | null) => {
                inputRef.current = node;
                if (typeof ref === 'function') {
                    ref(node);
                } else if (ref) {
                    ref.current = node;
                }
            },
            [ref]
        );

        const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
            const inputValue = e.target.value;

            // Allow empty input, minus sign, and decimal separator
            if (inputValue === '' || inputValue === '-' || inputValue === decimalSeparator) {
                setLocalValue(inputValue);
                return;
            }

            // For currency, allow the symbol and formatting
            if (isCurrency) {
                const numericValue = parseNumber(inputValue);
                if (!isNaN(numericValue)) {
                    const formattedValue = formatNumber(numericValue);
                    setLocalValue(formattedValue);
                    if (onChange) {
                        e.target.value = formattedValue;
                        onChange(e);
                    }
                }
                return;
            }

            // For regular numbers, only allow numeric input
            const numericRegex = /^-?\d*\.?\d*$/;
            if (numericRegex.test(inputValue)) {
                setLocalValue(inputValue);
                if (onChange) {
                    onChange(e);
                }
            }
        };

        const updateValue = (newValue: number) => {
            const formattedValue = formatNumber(newValue);
            setLocalValue(formattedValue);
            if (inputRef.current) {
                const event = new Event('change', { bubbles: true });
                Object.defineProperty(event, 'target', {
                    writable: false,
                    value: { ...inputRef.current, value: formattedValue },
                });
                inputRef.current.dispatchEvent(event);
            }
        };

        const increment = () => {
            const currentValue = parseNumber(localValue || '0');
            const newValue = currentValue + step;
            if (max === undefined || newValue <= max) {
                updateValue(newValue);
            }
        };

        const decrement = () => {
            const currentValue = parseNumber(localValue || '0');
            const newValue = currentValue - step;
            if (min === undefined || newValue >= min) {
                updateValue(newValue);
            }
        };

        const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
            if (e.key === 'ArrowUp') {
                e.preventDefault();
                increment();
            } else if (e.key === 'ArrowDown') {
                e.preventDefault();
                decrement();
            }
        };

        return (
            <div className="w-full">
                {sx && (
                    <style>
                        {`
                            .${inputClassName} {
                                ${Object.entries(sx)
                                .map(([key, value]) => `${key.replace(/[A-Z]/g, '-$&').toLowerCase()}: ${value};`)
                                .join('\n')}
                            }
                        `}
                    </style>
                )}
                {label && (
                    <label
                        htmlFor={name}
                        className={labelVariants({ variant: hasError ? 'error' : variant })}
                    >
                        {label}
                    </label>
                )}
                <div className="relative flex">
                    <input
                        ref={mergedRef}
                        id={name}
                        type="text"
                        inputMode="numeric"
                        pattern="[0-9]*"
                        className={twMerge(
                            numberInputVariants({ variant: hasError ? 'error' : variant, size }),
                            showStepper && 'pr-10',
                            inputClassName,
                            className
                        )}
                        aria-describedby={helperText ? `${name}-description` : undefined}
                        aria-invalid={hasError}
                        value={localValue}
                        onChange={handleChange}
                        onKeyDown={handleKeyDown}
                        {...registerProps}
                        {...props}
                    />
                    {showStepper && (
                        <div className="absolute right-0 inset-y-0 flex flex-col justify-center">
                            <button
                                type="button"
                                className={twMerge(
                                    stepperButtonVariants({ size }),
                                    'rounded-tr-md'
                                )}
                                onClick={increment}
                                disabled={max !== undefined && parseNumber(localValue || '0') >= max}
                                tabIndex={-1}
                            >
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 20 20"
                                    fill="currentColor"
                                    className="w-3 h-3"
                                >
                                    <path fillRule="evenodd" d="M14.77 12.79a.75.75 0 01-1.06-.02L10 8.832 6.29 12.77a.75.75 0 11-1.08-1.04l4.25-4.5a.75.75 0 011.08 0l4.25 4.5a.75.75 0 01-.02 1.06z" clipRule="evenodd" />
                                </svg>
                            </button>
                            <button
                                type="button"
                                className={twMerge(
                                    stepperButtonVariants({ size }),
                                    'rounded-br-md'
                                )}
                                onClick={decrement}
                                disabled={min !== undefined && parseNumber(localValue || '0') <= min}
                                tabIndex={-1}
                            >
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 20 20"
                                    fill="currentColor"
                                    className="w-3 h-3"
                                >
                                    <path fillRule="evenodd" d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z" clipRule="evenodd" />
                                </svg>
                            </button>
                        </div>
                    )}
                </div>
                {(helperText || hasError) && (
                    <p
                        id={`${name}-description`}
                        className={helperTextVariants({ variant: hasError ? 'error' : variant })}
                    >
                        {errorMessage || helperText}
                    </p>
                )}
            </div>
        );
    }
);

NumberInput.displayName = 'NumberInput'; 