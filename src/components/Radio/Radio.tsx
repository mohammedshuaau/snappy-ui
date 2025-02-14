import React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { twMerge } from 'tailwind-merge';
import { transitionClasses } from '../../styles/base';

// Type for sx prop
type CSSPropertiesWithPseudos = React.CSSProperties & {
    [K in `&:${string}`]?: React.CSSProperties;
};

const radioVariants = cva(
    [
        // Base styles
        'peer h-4 w-4 shrink-0 rounded-full border',
        'focus:outline-none focus:ring-2 focus:ring-offset-2',
        'disabled:cursor-not-allowed disabled:opacity-50',
        // Checked styles
        'checked:bg-primary-600 checked:border-primary-600 checked:hover:bg-primary-700 checked:hover:border-primary-700',
        'dark:checked:bg-primary-500 dark:checked:border-primary-500 dark:checked:hover:bg-primary-600 dark:checked:hover:border-primary-600',
        // Custom radio icon
        'appearance-none',
        'checked:bg-[url("data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTYiIGhlaWdodD0iMTYiIHZpZXdCb3g9IjAgMCAxNiAxNiIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48Y2lyY2xlIGN4PSI4IiBjeT0iOCIgcj0iNCIgZmlsbD0id2hpdGUiLz48L3N2Zz4=")] checked:bg-no-repeat checked:bg-center',
        ...transitionClasses,
    ],
    {
        variants: {
            variant: {
                default: [
                    'border-slate-300 bg-white',
                    'hover:border-slate-400',
                    'focus:ring-primary-500',
                    'dark:border-slate-700 dark:bg-slate-900',
                    'dark:hover:border-slate-600',
                ],
                error: [
                    'border-red-300 bg-white',
                    'hover:border-red-400',
                    'focus:ring-red-500',
                    'dark:border-red-800 dark:bg-slate-900',
                    'dark:hover:border-red-700',
                ],
            },
        },
        defaultVariants: {
            variant: 'default',
        },
    }
);

export interface RadioProps
    extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'type'>,
    VariantProps<typeof radioVariants> {
    /** Label for the radio */
    label?: string;
    /** Description text to display below the label */
    description?: string;
    /** Error message to display */
    error?: string;
    /** Whether the field is required */
    required?: boolean;
    /** Custom styles using the sx prop */
    sx?: CSSPropertiesWithPseudos;
}

export const Radio = React.forwardRef<HTMLInputElement, RadioProps>(
    ({
        className,
        variant,
        label,
        description,
        error,
        required,
        disabled,
        sx,
        ...props
    }, ref) => {
        // Generate a unique ID for the radio
        const id = React.useId();
        const radioClassName = `radio-${Math.random().toString(36).slice(2, 11)}`;

        // Convert sx prop to style object
        const generateStyles = () => {
            if (!sx) return { base: {}, pseudo: {} };

            const baseStyles: React.CSSProperties = {};
            const pseudoStyles: { [key: string]: React.CSSProperties } = {};

            Object.entries(sx).forEach(([key, value]) => {
                if (key.startsWith('&')) {
                    pseudoStyles[key] = value as React.CSSProperties;
                } else {
                    (baseStyles as any)[key] = value;
                }
            });

            return {
                base: baseStyles,
                pseudo: pseudoStyles,
            };
        };

        const styles = generateStyles();

        return (
            <div className="relative flex items-start">
                {/* Style tag for custom styles */}
                {sx && Object.keys(styles.pseudo).length > 0 && (
                    <style>
                        {`
                            .${radioClassName} {
                                transition: all 300ms cubic-bezier(0.4, 0, 0.2, 1);
                            }
                            ${Object.entries(styles.pseudo)
                                .map(([selector, rules]) => `
                                    .${radioClassName}${selector.slice(1)} {
                                        ${Object.entries(rules)
                                        .map(([prop, value]) => `${prop.replace(/[A-Z]/g, '-$&').toLowerCase()}: ${value}`)
                                        .join(';')}
                                    }
                                `)
                                .join('')}
                        `}
                    </style>
                )}

                <div className="flex h-5 items-center">
                    <input
                        type="radio"
                        ref={ref}
                        id={id}
                        className={twMerge(
                            radioVariants({ variant: error ? 'error' : variant }),
                            radioClassName,
                            className
                        )}
                        disabled={disabled}
                        aria-invalid={!!error}
                        aria-required={required}
                        style={styles.base}
                        {...props}
                    />
                </div>
                {(label || description || error) && (
                    <div className="ml-3 text-sm">
                        {label && (
                            <label
                                htmlFor={id}
                                className={twMerge(
                                    'font-medium text-slate-900 dark:text-slate-100',
                                    disabled && 'opacity-50 cursor-not-allowed'
                                )}
                            >
                                {label}
                                {required && <span className="ml-1 text-red-500">*</span>}
                            </label>
                        )}
                        {description && (
                            <p className={twMerge(
                                'text-slate-500 dark:text-slate-400',
                                disabled && 'opacity-50'
                            )}>
                                {description}
                            </p>
                        )}
                        {error && (
                            <p className="mt-1 text-sm text-red-500 dark:text-red-400">
                                {error}
                            </p>
                        )}
                    </div>
                )}
            </div>
        );
    }
);

Radio.displayName = 'Radio'; 