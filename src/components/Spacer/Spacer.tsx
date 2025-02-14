import React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { twMerge } from 'tailwind-merge';

const spacerVariants = cva(
    [
        'block',
        'transition-all duration-200',
    ],
    {
        variants: {
            size: {
                1: 'h-1 w-1',
                2: 'h-2 w-2',
                3: 'h-3 w-3',
                4: 'h-4 w-4',
                5: 'h-5 w-5',
                6: 'h-6 w-6',
                8: 'h-8 w-8',
                10: 'h-10 w-10',
                12: 'h-12 w-12',
                16: 'h-16 w-16',
            },
            axis: {
                both: '',
                x: 'h-0',
                y: 'w-0',
            },
            grow: {
                true: 'flex-grow',
            },
        },
        defaultVariants: {
            size: 4,
            axis: 'both',
        },
    }
);

type CSSPropertiesWithPseudos = React.CSSProperties & {
    [K in `&:${string}`]?: React.CSSProperties;
};

export interface SpacerProps
    extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof spacerVariants> {
    /** Custom styles using the sx prop */
    sx?: CSSPropertiesWithPseudos;
}

export const Spacer = React.forwardRef<HTMLDivElement, SpacerProps>(
    ({
        className,
        size,
        axis,
        grow,
        sx,
        ...props
    }, ref) => {
        // Generate unique class name for custom styles
        const spacerClassName = `spacer-${Math.random().toString(36).slice(2, 11)}`;

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
                            .${spacerClassName} {
                                transition: all 300ms cubic-bezier(0.4, 0, 0.2, 1);
                            }
                            ${Object.entries(styles.pseudo)
                                .map(([selector, rules]) => `
                                    .${spacerClassName}${selector.slice(1)} {
                                        ${Object.entries(rules as Record<string, unknown>)
                                        .map(([prop, value]) => `${prop.replace(/[A-Z]/g, '-$&').toLowerCase()}: ${value}`)
                                        .join(';')}
                                    }
                                `)
                                .join('')}
                        `}
                    </style>
                )}
                <div
                    ref={ref}
                    className={twMerge(spacerVariants({ size, axis, grow }), spacerClassName, className)}
                    style={styles.base as React.CSSProperties}
                    {...props}
                />
            </>
        );
    }
);

Spacer.displayName = 'Spacer'; 