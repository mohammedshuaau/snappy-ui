import React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { twMerge } from 'tailwind-merge';
import DynamicComponent from '../../shared/DynamicComponent';

const boxVariants = cva(
    [
        'block',
        'transition-all duration-200',
    ],
    {
        variants: {
            rounded: {
                none: 'rounded-none',
                sm: 'rounded-sm',
                md: 'rounded',
                lg: 'rounded-lg',
                xl: 'rounded-xl',
                '2xl': 'rounded-2xl',
                '3xl': 'rounded-3xl',
                full: 'rounded-full',
            },
            shadow: {
                none: 'shadow-none',
                sm: 'shadow-sm',
                md: 'shadow',
                lg: 'shadow-lg',
                xl: 'shadow-xl',
                '2xl': 'shadow-2xl',
                inner: 'shadow-inner',
            },
            border: {
                none: 'border-0',
                thin: 'border',
                medium: 'border-2',
                thick: 'border-4',
            },
        },
        defaultVariants: {
            rounded: 'none',
            shadow: 'none',
            border: 'none',
        },
    }
);

type CSSPropertiesWithPseudos = React.CSSProperties & {
    [K in `&:${string}`]?: React.CSSProperties;
};

export interface BoxProps
    extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof boxVariants> {
    /** Custom styles using the sx prop */
    sx?: CSSPropertiesWithPseudos;
    /** Whether to render as a different HTML element */
    as?: keyof JSX.IntrinsicElements;
}

export const Box = React.forwardRef<HTMLDivElement, BoxProps>(
    ({
        className,
        rounded,
        shadow,
        border,
        sx,
        as: Component = 'div',
        ...props
    }, ref) => {
        // Generate unique class name for custom styles
        const boxClassName = `box-${Math.random().toString(36).slice(2, 11)}`;

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
                            .${boxClassName} {
                                transition: all 300ms cubic-bezier(0.4, 0, 0.2, 1);
                            }
                            ${Object.entries(styles.pseudo)
                                .map(([selector, rules]) => `
                                    .${boxClassName}${selector.slice(1)} {
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
                    className={twMerge(boxVariants({ rounded, shadow, border }), boxClassName, className)}
                    style={styles.base as React.CSSProperties}
                    {...props}
                />
            </>
        );
    }
);

Box.displayName = 'Box'; 