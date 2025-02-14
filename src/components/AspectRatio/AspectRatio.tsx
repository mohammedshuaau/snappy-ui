import React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { twMerge } from 'tailwind-merge';

const aspectRatioVariants = cva(
    [
        'relative',
        'w-full',
        'transition-all duration-200',
    ],
    {
        variants: {
            ratio: {
                '1/1': 'aspect-square',
                '4/3': 'aspect-[4/3]',
                '16/9': 'aspect-video',
                '21/9': 'aspect-[21/9]',
                '3/4': 'aspect-[3/4]',
                '9/16': 'aspect-[9/16]',
            },
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
        },
        defaultVariants: {
            ratio: '1/1',
            rounded: 'none',
        },
    }
);

type CSSPropertiesWithPseudos = React.CSSProperties & {
    [K in `&:${string}`]?: React.CSSProperties;
};

export interface AspectRatioProps
    extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof aspectRatioVariants> {
    /** Custom styles using the sx prop */
    sx?: CSSPropertiesWithPseudos;
}

export const AspectRatio = React.forwardRef<HTMLDivElement, AspectRatioProps>(
    ({
        className,
        ratio,
        rounded,
        sx,
        children,
        ...props
    }, ref) => {
        // Generate unique class name for custom styles
        const aspectRatioClassName = `aspect-ratio-${Math.random().toString(36).slice(2, 11)}`;

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
                            .${aspectRatioClassName} {
                                transition: all 300ms cubic-bezier(0.4, 0, 0.2, 1);
                            }
                            ${Object.entries(styles.pseudo)
                                .map(([selector, rules]) => `
                                    .${aspectRatioClassName}${selector.slice(1)} {
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
                    className={twMerge(aspectRatioVariants({ ratio, rounded }), aspectRatioClassName, className)}
                    style={styles.base as React.CSSProperties}
                    {...props}
                >
                    <div className="absolute inset-0">
                        {children}
                    </div>
                </div>
            </>
        );
    }
);

AspectRatio.displayName = 'AspectRatio'; 