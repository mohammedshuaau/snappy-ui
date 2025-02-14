import React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { twMerge } from 'tailwind-merge';
import DynamicComponent from '../../shared/DynamicComponent';

const stackVariants = cva(
    [
        'flex',
        'transition-all duration-200',
    ],
    {
        variants: {
            direction: {
                vertical: 'flex-col',
                horizontal: 'flex-row',
            },
            spacing: {
                0: 'gap-0',
                1: 'gap-1',
                2: 'gap-2',
                3: 'gap-3',
                4: 'gap-4',
                5: 'gap-5',
                6: 'gap-6',
                8: 'gap-8',
                10: 'gap-10',
                12: 'gap-12',
                16: 'gap-16',
            },
            align: {
                start: ['items-start', 'justify-start'],
                center: ['items-center', 'justify-center'],
                end: ['items-end', 'justify-end'],
                stretch: ['items-stretch'],
                baseline: ['items-baseline'],
            },
            justify: {
                start: 'justify-start',
                center: 'justify-center',
                end: 'justify-end',
                between: 'justify-between',
                around: 'justify-around',
                evenly: 'justify-evenly',
            },
            wrap: {
                true: 'flex-wrap',
                false: 'flex-nowrap',
            },
            divider: {
                true: 'divide-slate-200 dark:divide-slate-700',
            },
            responsive: {
                true: [
                    'flex-col',
                    'sm:flex-row',
                ],
            },
        },
        defaultVariants: {
            direction: 'vertical',
            spacing: 4,
            align: 'stretch',
            wrap: false,
        },
    }
);

type CSSPropertiesWithPseudos = React.CSSProperties & {
    [K in `&:${string}`]?: React.CSSProperties;
};

export interface StackProps
    extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof stackVariants> {
    /** Custom styles using the sx prop */
    sx?: CSSPropertiesWithPseudos;
    /** Whether to render as a different HTML element */
    as?: keyof JSX.IntrinsicElements;
}

export const Stack = React.forwardRef<HTMLDivElement, StackProps>(
    ({
        className,
        direction,
        spacing,
        align,
        justify,
        wrap,
        divider,
        responsive,
        sx,
        as: Component = 'div',
        ...props
    }, ref) => {
        // Generate unique class name for custom styles
        const stackClassName = `stack-${Math.random().toString(36).slice(2, 11)}`;

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

        // Add divider classes based on direction
        const dividerClasses = divider
            ? direction === 'vertical'
                ? 'divide-y'
                : 'divide-x'
            : '';

        return (
            <>
                {sx && Object.keys(styles.pseudo).length > 0 && (
                    <style>
                        {`
                            .${stackClassName} {
                                transition: all 300ms cubic-bezier(0.4, 0, 0.2, 1);
                            }
                            ${Object.entries(styles.pseudo)
                                .map(([selector, rules]) => `
                                    .${stackClassName}${selector.slice(1)} {
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
                    className={twMerge(stackVariants({ direction, spacing, align, justify, wrap, divider, responsive }), dividerClasses, stackClassName, className)}
                    style={styles.base as React.CSSProperties}
                    {...props}
                />
            </>
        );
    }
);

Stack.displayName = 'Stack'; 