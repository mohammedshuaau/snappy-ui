import React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { twMerge } from 'tailwind-merge';
import DynamicComponent from '../../shared/DynamicComponent';

const gridVariants = cva(
    [
        'grid',
        'transition-all duration-200',
    ],
    {
        variants: {
            cols: {
                1: 'grid-cols-1',
                2: 'grid-cols-2',
                3: 'grid-cols-3',
                4: 'grid-cols-4',
                5: 'grid-cols-5',
                6: 'grid-cols-6',
                7: 'grid-cols-7',
                8: 'grid-cols-8',
                9: 'grid-cols-9',
                10: 'grid-cols-10',
                11: 'grid-cols-11',
                12: 'grid-cols-12',
            },
            rows: {
                1: 'grid-rows-1',
                2: 'grid-rows-2',
                3: 'grid-rows-3',
                4: 'grid-rows-4',
                5: 'grid-rows-5',
                6: 'grid-rows-6',
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
            rowGap: {
                0: 'row-gap-0',
                1: 'row-gap-1',
                2: 'row-gap-2',
                3: 'row-gap-3',
                4: 'row-gap-4',
                5: 'row-gap-5',
                6: 'row-gap-6',
                8: 'row-gap-8',
                10: 'row-gap-10',
                12: 'row-gap-12',
                16: 'row-gap-16',
            },
            colGap: {
                0: 'col-gap-0',
                1: 'col-gap-1',
                2: 'col-gap-2',
                3: 'col-gap-3',
                4: 'col-gap-4',
                5: 'col-gap-5',
                6: 'col-gap-6',
                8: 'col-gap-8',
                10: 'col-gap-10',
                12: 'col-gap-12',
                16: 'col-gap-16',
            },
            flow: {
                row: 'grid-flow-row',
                col: 'grid-flow-col',
                dense: 'grid-flow-dense',
                'row-dense': 'grid-flow-row-dense',
                'col-dense': 'grid-flow-col-dense',
            },
            autoRows: {
                auto: 'auto-rows-auto',
                min: 'auto-rows-min',
                max: 'auto-rows-max',
                fr: 'auto-rows-fr',
            },
            autoCols: {
                auto: 'auto-cols-auto',
                min: 'auto-cols-min',
                max: 'auto-cols-max',
                fr: 'auto-cols-fr',
            },
            responsive: {
                true: [
                    'sm:grid-cols-2',
                    'md:grid-cols-3',
                    'lg:grid-cols-4',
                    'xl:grid-cols-5',
                    '2xl:grid-cols-6',
                ],
            },
        },
        defaultVariants: {
            cols: 1,
            gap: 4,
        },
    }
);

type CSSPropertiesWithPseudos = React.CSSProperties & {
    [K in `&:${string}`]?: React.CSSProperties;
};

export interface GridProps
    extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof gridVariants> {
    /** Custom styles using the sx prop */
    sx?: CSSPropertiesWithPseudos;
    /** Whether to render as a different HTML element */
    as?: keyof JSX.IntrinsicElements;
}

export const Grid = React.forwardRef<HTMLDivElement, GridProps>(
    ({
        className,
        cols,
        rows,
        gap,
        rowGap,
        colGap,
        flow,
        autoRows,
        autoCols,
        responsive,
        sx,
        as: Component = 'div',
        ...props
    }, ref) => {
        // Generate unique class name for custom styles
        const gridClassName = `grid-${Math.random().toString(36).slice(2, 11)}`;

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
                            .${gridClassName} {
                                transition: all 300ms cubic-bezier(0.4, 0, 0.2, 1);
                            }
                            ${Object.entries(styles.pseudo)
                                .map(([selector, rules]) => `
                                    .${gridClassName}${selector.slice(1)} {
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
                    className={twMerge(gridVariants({ cols, rows, gap, rowGap, colGap, flow, autoRows, autoCols, responsive }), gridClassName, className)}
                    style={styles.base as React.CSSProperties}
                    {...props}
                />
            </>
        );
    }
);

Grid.displayName = 'Grid'; 