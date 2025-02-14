import React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { twMerge } from 'tailwind-merge';
import { transitionClasses } from '../../styles/base';

const linkVariants = cva(
    [
        'inline-flex items-center gap-1.5',
        'font-medium',
        'transition-colors duration-200',
        'focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2',
        'disabled:opacity-50 disabled:cursor-not-allowed',
        ...transitionClasses,
    ],
    {
        variants: {
            variant: {
                default: [
                    'text-primary-600 hover:text-primary-700',
                    'dark:text-primary-400 dark:hover:text-primary-300',
                ],
                subtle: [
                    'text-slate-600 hover:text-slate-900',
                    'dark:text-slate-400 dark:hover:text-white',
                ],
                underline: [
                    'text-primary-600 hover:text-primary-700',
                    'underline decoration-primary-300 underline-offset-4',
                    'hover:decoration-primary-400',
                    'dark:text-primary-400 dark:hover:text-primary-300',
                    'dark:decoration-primary-700 dark:hover:decoration-primary-600',
                ],
                ghost: [
                    'text-slate-600 hover:text-slate-900',
                    'hover:bg-slate-100 rounded-md px-2 -mx-2',
                    'dark:text-slate-400 dark:hover:text-white',
                    'dark:hover:bg-slate-800',
                ],
            },
            size: {
                sm: 'text-sm',
                md: 'text-base',
                lg: 'text-lg',
            },
        },
        defaultVariants: {
            variant: 'default',
            size: 'md',
        },
    }
);

type CSSPropertiesWithPseudos = React.CSSProperties & {
    [K in `&:${string}`]?: React.CSSProperties;
};

export interface LinkProps
    extends React.AnchorHTMLAttributes<HTMLAnchorElement>,
    VariantProps<typeof linkVariants> {
    /** Whether the link is external */
    external?: boolean;
    /** Icon to display before the text */
    leftIcon?: React.ReactNode;
    /** Icon to display after the text */
    rightIcon?: React.ReactNode;
    /** Custom styles using the sx prop */
    sx?: CSSPropertiesWithPseudos;
}

export const Link = React.forwardRef<HTMLAnchorElement, LinkProps>(
    ({
        className,
        variant,
        size,
        external,
        leftIcon,
        rightIcon,
        children,
        sx,
        ...props
    }, ref) => {
        // Generate unique class name for custom styles
        const linkClassName = `link-${Math.random().toString(36).slice(2, 11)}`;

        // Convert sx prop to style object
        const styles = sx ? {
            base: Object.entries(sx).reduce((acc, [key, value]) => {
                if (!key.startsWith('&')) {
                    acc[key] = value;
                }
                return acc;
            }, {} as Record<string, unknown>),
            pseudo: Object.entries(sx).reduce((acc, [key, value]) => {
                if (key.startsWith('&')) {
                    acc[key] = value;
                }
                return acc;
            }, {} as Record<string, unknown>),
        } : { base: {}, pseudo: {} };

        return (
            <>
                {sx && Object.keys(styles.pseudo).length > 0 && (
                    <style>
                        {`
                            .${linkClassName} {
                                transition: all 300ms cubic-bezier(0.4, 0, 0.2, 1);
                            }
                            ${Object.entries(styles.pseudo)
                                .map(([selector, rules]) => `
                                    .${linkClassName}${selector.slice(1)} {
                                        ${Object.entries(rules as Record<string, unknown>)
                                        .map(([prop, value]) => `${prop.replace(/[A-Z]/g, '-$&').toLowerCase()}: ${value}`)
                                        .join(';')}
                                    }
                                `)
                                .join('')}
                        `}
                    </style>
                )}
                <a
                    ref={ref}
                    className={twMerge(linkVariants({ variant, size }), linkClassName, className)}
                    style={styles.base as React.CSSProperties}
                    target={external ? '_blank' : undefined}
                    rel={external ? 'noopener noreferrer' : undefined}
                    {...props}
                >
                    {leftIcon && <span className="inline-flex">{leftIcon}</span>}
                    {children}
                    {rightIcon && <span className="inline-flex">{rightIcon}</span>}
                    {external && (
                        <svg
                            className="h-4 w-4"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                            />
                        </svg>
                    )}
                </a>
            </>
        );
    }
);

Link.displayName = 'Link'; 