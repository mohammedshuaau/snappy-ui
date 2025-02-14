import React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { twMerge } from 'tailwind-merge';
import { transitionClasses } from '../../styles/base';

const buttonVariants = cva(
    [
        // Base styles
        'inline-flex items-center justify-center rounded-md text-sm font-medium',
        'ring-offset-background',
        'outline-none',
        ...transitionClasses,
        // Disabled styles
        'disabled:pointer-events-none disabled:opacity-50',
    ],
    {
        variants: {
            variant: {
                default: [
                    'bg-primary-600 text-white hover:bg-primary-700',
                    'focus:ring-2 focus:ring-offset-2 focus:ring-primary-500',
                    'dark:bg-primary-700 dark:hover:bg-primary-600',
                    'dark:focus:ring-primary-400',
                ],
                destructive: [
                    'bg-red-600 text-white hover:bg-red-700',
                    'focus:ring-2 focus:ring-offset-2 focus:ring-red-500',
                    'dark:bg-red-700 dark:hover:bg-red-600',
                    'dark:focus:ring-red-400',
                ],
                outline: [
                    'border border-primary-200 bg-transparent text-primary-900 hover:bg-primary-100 hover:text-primary-900',
                    'focus:ring-2 focus:ring-offset-2 focus:ring-primary-500',
                    'dark:border-primary-700 dark:text-primary-100 dark:hover:bg-primary-800 dark:hover:text-primary-100',
                    'dark:focus:ring-primary-400',
                ],
                secondary: [
                    'bg-secondary-200 text-secondary-900 hover:bg-secondary-300',
                    'focus:ring-2 focus:ring-offset-2 focus:ring-secondary-500',
                    'dark:bg-secondary-800 dark:text-secondary-100 dark:hover:bg-secondary-700',
                    'dark:focus:ring-secondary-400',
                ],
                ghost: [
                    'bg-transparent text-primary-900 hover:bg-primary-100 hover:text-primary-900',
                    'focus:ring-2 focus:ring-offset-2 focus:ring-primary-500',
                    'dark:text-primary-100 dark:hover:bg-primary-800 dark:hover:text-primary-100',
                    'dark:focus:ring-primary-400',
                ],
                link: [
                    'text-primary-900 underline-offset-4 hover:underline',
                    'focus:ring-2 focus:ring-offset-2 focus:ring-primary-500',
                    'dark:text-primary-100',
                    'dark:focus:ring-primary-400',
                ],
            },
            size: {
                default: 'h-10 px-4 py-2',
                sm: 'h-8 px-3 py-1 text-xs',
                lg: 'h-12 px-8 py-3 text-base',
                icon: 'h-10 w-10 p-2',
            },
            fullWidth: {
                true: 'w-full',
            },
        },
        defaultVariants: {
            variant: 'default',
            size: 'default',
            fullWidth: false,
        },
    }
);

type CSSPropertiesWithPseudos = React.CSSProperties & {
    [K in `&:${string}`]?: React.CSSProperties;
};

export interface ButtonProps
    extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
    asChild?: boolean;
    loading?: boolean;
    leftIcon?: React.ReactNode;
    rightIcon?: React.ReactNode;
    sx?: CSSPropertiesWithPseudos;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
    (
        {
            className,
            variant,
            size,
            fullWidth,
            asChild = false,
            loading = false,
            disabled,
            children,
            leftIcon,
            rightIcon,
            sx,
            ...props
        },
        ref
    ) => {
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
        const buttonClassName = `btn-${Math.random().toString(36).slice(2, 11)}`;

        return (
            <>
                {sx && Object.keys(styles.pseudo).length > 0 && (
                    <style>
                        {`
                            .${buttonClassName} {
                                transition: all 300ms cubic-bezier(0.4, 0, 0.2, 1);
                            }
                            ${Object.entries(styles.pseudo)
                                .map(([selector, rules]) => `
                                    .${buttonClassName}${selector.slice(1)} {
                                        ${Object.entries(rules)
                                        .map(([prop, value]) => `${prop.replace(/[A-Z]/g, '-$&').toLowerCase()}: ${value}`)
                                        .join(';')}
                                    }
                                `)
                                .join('')}
                        `}
                    </style>
                )}
                <button
                    className={twMerge(buttonVariants({ variant, size, fullWidth }), buttonClassName, className)}
                    ref={ref}
                    disabled={disabled || loading}
                    style={styles.base}
                    {...props}
                >
                    {loading ? (
                        <span className="mr-2 inline-flex" data-testid="loading-spinner">
                            <svg
                                className="animate-spin h-4 w-4"
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                            >
                                <circle
                                    className="opacity-25"
                                    cx="12"
                                    cy="12"
                                    r="10"
                                    stroke="currentColor"
                                    strokeWidth="4"
                                ></circle>
                                <path
                                    className="opacity-75"
                                    fill="currentColor"
                                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                                ></path>
                            </svg>
                        </span>
                    ) : leftIcon ? (
                        <span className="mr-2 inline-flex">{leftIcon}</span>
                    ) : null}
                    <span className="inline-flex items-center justify-center">{children}</span>
                    {rightIcon && !loading && (
                        <span className="ml-2 inline-flex">{rightIcon}</span>
                    )}
                </button>
            </>
        );
    }
);

Button.displayName = 'Button';

export { Button, buttonVariants }; 