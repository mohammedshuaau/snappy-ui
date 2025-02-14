import React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { twMerge } from 'tailwind-merge';
import { transitionClasses } from '../../styles/base';

const badgeVariants = cva(
    [
        // Base styles
        'inline-flex items-center justify-center rounded-full px-2.5 py-0.5',
        'text-xs font-medium',
        'ring-offset-background',
        'outline-none',
        ...transitionClasses,
    ],
    {
        variants: {
            variant: {
                default: [
                    'bg-primary-100 text-primary-800',
                    'dark:bg-primary-900 dark:text-primary-100',
                ],
                secondary: [
                    'bg-slate-100 text-slate-800',
                    'dark:bg-slate-800 dark:text-slate-100',
                ],
                success: [
                    'bg-green-100 text-green-800',
                    'dark:bg-green-900 dark:text-green-100',
                ],
                warning: [
                    'bg-yellow-100 text-yellow-800',
                    'dark:bg-yellow-900 dark:text-yellow-100',
                ],
                error: [
                    'bg-red-100 text-red-800',
                    'dark:bg-red-900 dark:text-red-100',
                ],
                outline: [
                    'border border-primary-200 bg-transparent text-primary-800',
                    'dark:border-primary-700 dark:text-primary-100',
                ],
            },
            size: {
                default: 'text-xs',
                sm: 'text-[0.625rem] px-2 py-px',
                lg: 'text-sm px-3 py-1',
            },
            removable: {
                true: 'pr-1',
            },
        },
        defaultVariants: {
            variant: 'default',
            size: 'default',
            removable: false,
        },
    }
);

type CSSPropertiesWithPseudos = React.CSSProperties & {
    [K in `&:${string}`]?: React.CSSProperties;
};

export interface BadgeProps
    extends React.HTMLAttributes<HTMLSpanElement>,
    VariantProps<typeof badgeVariants> {
    /** Icon to display before the badge text */
    icon?: React.ReactNode;
    /** Whether the badge can be removed */
    onRemove?: () => void;
    /** Custom styles using the sx prop */
    sx?: CSSPropertiesWithPseudos;
}

const Badge = React.forwardRef<HTMLSpanElement, BadgeProps>(
    (
        {
            className,
            variant,
            size,
            removable,
            children,
            icon,
            onRemove,
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
        const badgeClassName = `badge-${Math.random().toString(36).slice(2, 11)}`;

        return (
            <>
                {sx && Object.keys(styles.pseudo).length > 0 && (
                    <style>
                        {`
                            .${badgeClassName} {
                                transition: all 300ms cubic-bezier(0.4, 0, 0.2, 1);
                            }
                            ${Object.entries(styles.pseudo)
                                .map(([selector, rules]) => `
                                    .${badgeClassName}${selector.slice(1)} {
                                        ${Object.entries(rules)
                                        .map(([prop, value]) => `${prop.replace(/[A-Z]/g, '-$&').toLowerCase()}: ${value}`)
                                        .join(';')}
                                    }
                                `)
                                .join('')}
                        `}
                    </style>
                )}
                <span
                    ref={ref}
                    className={twMerge(
                        badgeVariants({ variant, size, removable }),
                        badgeClassName,
                        className
                    )}
                    style={styles.base}
                    {...props}
                >
                    {icon && (
                        <span className="mr-1 -ml-0.5 inline-flex h-3.5 w-3.5 items-center justify-center">
                            {icon}
                        </span>
                    )}
                    {children}
                    {onRemove && (
                        <button
                            type="button"
                            className={twMerge(
                                'ml-1 -mr-0.5 inline-flex h-3.5 w-3.5 items-center justify-center rounded-full',
                                'hover:bg-black/10 dark:hover:bg-white/10',
                                'focus:outline-none focus:ring-2 focus:ring-offset-1',
                                variant === 'default' && 'focus:ring-primary-500 dark:focus:ring-primary-400',
                                variant === 'secondary' && 'focus:ring-slate-500 dark:focus:ring-slate-400',
                                variant === 'success' && 'focus:ring-green-500 dark:focus:ring-green-400',
                                variant === 'warning' && 'focus:ring-yellow-500 dark:focus:ring-yellow-400',
                                variant === 'error' && 'focus:ring-red-500 dark:focus:ring-red-400',
                                variant === 'outline' && 'focus:ring-primary-500 dark:focus:ring-primary-400'
                            )}
                            onClick={onRemove}
                            aria-label="Remove badge"
                        >
                            <svg
                                className="h-2.5 w-2.5"
                                fill="currentColor"
                                viewBox="0 0 20 20"
                            >
                                <path
                                    fillRule="evenodd"
                                    d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                                    clipRule="evenodd"
                                />
                            </svg>
                        </button>
                    )}
                </span>
            </>
        );
    }
);

Badge.displayName = 'Badge';

export { Badge, badgeVariants }; 