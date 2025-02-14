import React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { twMerge } from 'tailwind-merge';
import { transitionClasses } from '../../styles/base';

// Type for sx prop
type CSSPropertiesWithPseudos = React.CSSProperties & {
    [K in `&:${string}`]?: React.CSSProperties;
};

const textareaVariants = cva(
    [
        // Base styles
        'flex w-full rounded-md border bg-white px-3 py-2 text-sm',
        'ring-offset-background',
        'placeholder:text-muted-foreground',
        'focus:outline-none focus:ring-2 focus:ring-offset-2',
        'disabled:cursor-not-allowed disabled:opacity-50 disabled:bg-slate-50 disabled:border-slate-200',
        // Dark mode
        'dark:bg-slate-950 dark:border-slate-800',
        'dark:focus:ring-slate-400',
        'dark:disabled:bg-slate-900 dark:disabled:border-slate-800',
        ...transitionClasses,
    ],
    {
        variants: {
            variant: {
                default: [
                    'border-slate-200 text-slate-900',
                    'hover:border-slate-300',
                    'focus:ring-primary-500',
                    'dark:text-slate-100',
                    'dark:hover:border-slate-700',
                    'disabled:hover:border-slate-200',
                    'dark:disabled:hover:border-slate-800',
                ],
                error: [
                    'border-red-300 text-red-900',
                    'hover:border-red-400',
                    'focus:ring-red-500',
                    'dark:border-red-800 dark:text-red-400',
                    'disabled:hover:border-red-300',
                    'dark:disabled:hover:border-red-800',
                ],
            },
            size: {
                default: 'min-h-[80px]',
                sm: 'min-h-[60px] px-2 text-xs',
                lg: 'min-h-[120px] px-4 text-base',
            },
        },
        defaultVariants: {
            variant: 'default',
            size: 'default',
        },
    }
);

export interface TextareaProps
    extends Omit<React.TextareaHTMLAttributes<HTMLTextAreaElement>, 'size'>,
    VariantProps<typeof textareaVariants> {
    /** Error message to display */
    error?: string;
    /** Label for the textarea */
    label?: string;
    /** Whether the field is required */
    required?: boolean;
    /** Custom styles using the sx prop */
    sx?: CSSPropertiesWithPseudos;
}

export const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
    ({
        className,
        variant,
        size,
        error,
        label,
        required,
        disabled,
        sx,
        ...props
    }, ref) => {
        // Generate a unique ID for the textarea
        const id = React.useId();
        const textareaClassName = `textarea-${Math.random().toString(36).slice(2, 11)}`;

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
            <div className="w-full">
                {/* Style tag for custom styles */}
                {sx && Object.keys(styles.pseudo).length > 0 && (
                    <style>
                        {`
                            .${textareaClassName} {
                                transition: all 300ms cubic-bezier(0.4, 0, 0.2, 1);
                            }
                            ${Object.entries(styles.pseudo)
                                .map(([selector, rules]) => `
                                    .${textareaClassName}${selector.slice(1)} {
                                        ${Object.entries(rules)
                                        .map(([prop, value]) => `${prop.replace(/[A-Z]/g, '-$&').toLowerCase()}: ${value}`)
                                        .join(';')}
                                    }
                                `)
                                .join('')}
                        `}
                    </style>
                )}

                {/* Label */}
                {label && (
                    <label
                        htmlFor={id}
                        className="mb-2 block text-sm font-medium text-slate-900 dark:text-slate-100"
                    >
                        {label}
                        {required && <span className="ml-1 text-red-500">*</span>}
                    </label>
                )}

                {/* Textarea */}
                <textarea
                    ref={ref}
                    id={id}
                    className={twMerge(
                        textareaVariants({ variant: error ? 'error' : variant, size }),
                        'resize-y',
                        textareaClassName,
                        className
                    )}
                    disabled={disabled}
                    aria-invalid={!!error}
                    aria-required={required}
                    style={styles.base}
                    {...props}
                />

                {/* Error message */}
                {error && (
                    <p className="mt-1 text-sm text-red-500 dark:text-red-400">
                        {error}
                    </p>
                )}
            </div>
        );
    }
);

Textarea.displayName = 'Textarea'; 