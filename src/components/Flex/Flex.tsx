import React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { twMerge } from 'tailwind-merge';
import DynamicComponent from '../../shared/DynamicComponent';

const flexVariants = cva(
    [
        'flex',
        'transition-all duration-200',
    ],
    {
        variants: {
            direction: {
                row: 'flex-row',
                'row-reverse': 'flex-row-reverse',
                column: 'flex-col',
                'column-reverse': 'flex-col-reverse',
            },
            wrap: {
                nowrap: 'flex-nowrap',
                wrap: 'flex-wrap',
                'wrap-reverse': 'flex-wrap-reverse',
            },
            justify: {
                start: 'justify-start',
                end: 'justify-end',
                center: 'justify-center',
                between: 'justify-between',
                around: 'justify-around',
                evenly: 'justify-evenly',
            },
            align: {
                start: 'items-start',
                end: 'items-end',
                center: 'items-center',
                baseline: 'items-baseline',
                stretch: 'items-stretch',
            },
            gap: {
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
            inline: {
                true: 'inline-flex',
            },
        },
        defaultVariants: {
            direction: 'row',
            wrap: 'nowrap',
            justify: 'start',
            align: 'stretch',
            gap: 0,
        },
    }
);

type CSSPropertiesWithPseudos = React.CSSProperties & {
    [K in `&:${string}`]?: React.CSSProperties;
};

export interface FlexProps
    extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof flexVariants> {
    /** Custom styles using the sx prop */
    sx?: CSSPropertiesWithPseudos;
    /** Whether to render as a different HTML element */
    as?: keyof JSX.IntrinsicElements;
}

export const Flex = React.forwardRef<HTMLDivElement, FlexProps>(
    ({
        className,
        direction,
        wrap,
        justify,
        align,
        gap,
        inline,
        sx,
        as: Component = 'div',
        ...props
    }, ref) => {
        // Generate unique class name for custom styles
        const flexClassName = `flex-${Math.random().toString(36).slice(2, 11)}`;

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
                            .${flexClassName} {
                                transition: all 300ms cubic-bezier(0.4, 0, 0.2, 1);
                            }
                            ${Object.entries(styles.pseudo)
                                .map(([selector, rules]) => `
                                    .${flexClassName}${selector.slice(1)} {
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
                    className={twMerge(flexVariants({ direction, wrap, justify, align, gap, inline }), flexClassName, className)}
                    style={styles.base as React.CSSProperties}
                    {...props}
                />
            </>
        );
    }
);

Flex.displayName = 'Flex'; 