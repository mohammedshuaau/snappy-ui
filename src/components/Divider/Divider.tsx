import React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { twMerge } from 'tailwind-merge';
import DynamicComponent from '../../shared/DynamicComponent';

const dividerVariants = cva(
    [
        'border-0',
        'transition-all duration-200',
    ],
    {
        variants: {
            orientation: {
                horizontal: [
                    'w-full',
                    'border-b',
                ],
                vertical: [
                    'h-full',
                    'border-r',
                    'self-stretch',
                ],
            },
            variant: {
                solid: '',
                dashed: 'border-dashed',
                dotted: 'border-dotted',
            },
            size: {
                thin: 'border-[0.5px]',
                regular: 'border-[1px]',
                thick: 'border-[2px]',
            },
            color: {
                default: [
                    'border-slate-200',
                    'dark:border-slate-700',
                ],
                primary: [
                    'border-primary-200',
                    'dark:border-primary-800',
                ],
                secondary: [
                    'border-secondary-200',
                    'dark:border-secondary-800',
                ],
                success: [
                    'border-success-200',
                    'dark:border-success-800',
                ],
                warning: [
                    'border-warning-200',
                    'dark:border-warning-800',
                ],
                error: [
                    'border-error-200',
                    'dark:border-error-800',
                ],
            },
            spacing: {
                0: 'm-0',
                1: 'my-1',
                2: 'my-2',
                3: 'my-3',
                4: 'my-4',
                5: 'my-5',
                6: 'my-6',
                8: 'my-8',
                10: 'my-10',
                12: 'my-12',
                16: 'my-16',
            },
        },
        defaultVariants: {
            orientation: 'horizontal',
            variant: 'solid',
            size: 'regular',
            color: 'default',
            spacing: 4,
        },
    }
);

type CSSPropertiesWithPseudos = React.CSSProperties & {
    [K in `&:${string}`]?: React.CSSProperties;
};

export interface DividerProps
    extends Omit<React.HTMLAttributes<HTMLHRElement>, keyof VariantProps<typeof dividerVariants>>,
    VariantProps<typeof dividerVariants> {
    /** Custom styles using the sx prop */
    sx?: CSSPropertiesWithPseudos;
    /** Label to show in the middle of the divider */
    label?: React.ReactNode;
    /** Whether to render as a different HTML element */
    as?: keyof JSX.IntrinsicElements;
}

export const Divider = React.forwardRef<HTMLHRElement, DividerProps>(
    ({
        className,
        orientation,
        variant,
        size,
        color,
        spacing,
        label,
        sx,
        as: Component = 'hr',
        ...props
    }, ref) => {
        // Generate unique class name for custom styles
        const dividerClassName = `divider-${Math.random().toString(36).slice(2, 11)}`;

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

        if (label) {
            return (
                <div
                    className={twMerge(
                        'flex items-center',
                        orientation === 'vertical' ? 'flex-col h-full' : 'w-full',
                        `my-${spacing}`
                    )}
                >
                    <DynamicComponent
                        as={Component}
                        ref={ref}
                        className={twMerge(dividerVariants({ orientation, variant, size, color }), dividerClassName, className)}
                        style={styles.base as React.CSSProperties}
                        {...props}
                    />
                    <span className={twMerge(
                        'px-3 text-sm text-slate-500 dark:text-slate-400',
                        orientation === 'vertical' ? 'py-3' : ''
                    )}>
                        {label}
                    </span>
                    <DynamicComponent
                        as={Component}
                        className={twMerge(dividerVariants({ orientation, variant, size, color }), dividerClassName)}
                        {...props}
                    />
                </div>
            );
        }

        return (
            <>
                {sx && Object.keys(styles.pseudo).length > 0 && (
                    <style>
                        {`
                            .${dividerClassName} {
                                transition: all 300ms cubic-bezier(0.4, 0, 0.2, 1);
                            }
                            ${Object.entries(styles.pseudo)
                                .map(([selector, rules]) => `
                                    .${dividerClassName}${selector.slice(1)} {
                                        ${Object.entries(rules as Record<string, unknown>)
                                        .map(([prop, value]) => `${prop.replace(/[A-Z]/g, '-$&').toLowerCase()}: ${value}`)
                                        .join(';')}
                                    }
                                `)
                                .join('')}
                        `}
                    </style>
                )}
                <DynamicComponent
                    as={Component}
                    ref={ref}
                    className={twMerge(dividerVariants({ orientation, variant, size, color, spacing }), dividerClassName, className)}
                    style={styles.base as React.CSSProperties}
                    {...props}
                />
            </>
        );
    }
);

Divider.displayName = 'Divider'; 