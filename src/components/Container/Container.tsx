import React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { twMerge } from 'tailwind-merge';
import DynamicComponent from '../../shared/DynamicComponent';

const containerVariants = cva(
    [
        'w-full',
        'mx-auto',
        'px-4',
        'transition-all duration-200',
    ],
    {
        variants: {
            size: {
                sm: 'max-w-screen-sm',
                md: 'max-w-screen-md',
                lg: 'max-w-screen-lg',
                xl: 'max-w-screen-xl',
                '2xl': 'max-w-screen-2xl',
                full: 'max-w-full',
            },
            responsive: {
                true: [
                    'sm:max-w-[640px]',
                    'md:max-w-[768px]',
                    'lg:max-w-[1024px]',
                    'xl:max-w-[1280px]',
                    '2xl:max-w-[1536px]',
                ],
            },
            center: {
                true: 'mx-auto',
            },
        },
        defaultVariants: {
            size: 'lg',
            center: true,
        },
    }
);

type CSSPropertiesWithPseudos = React.CSSProperties & {
    [K in `&:${string}`]?: React.CSSProperties;
};

export interface ContainerProps
    extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof containerVariants> {
    /** Custom styles using the sx prop */
    sx?: CSSPropertiesWithPseudos;
    /** Whether to render as a different HTML element */
    as?: keyof JSX.IntrinsicElements;
}

export const Container = React.forwardRef<HTMLDivElement, ContainerProps>(
    ({
        className,
        size,
        responsive,
        center,
        sx,
        as: Component = 'div',
        ...props
    }, ref) => {
        // Generate unique class name for custom styles
        const containerClassName = `container-${Math.random().toString(36).slice(2, 11)}`;

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
                            .${containerClassName} {
                                transition: all 300ms cubic-bezier(0.4, 0, 0.2, 1);
                            }
                            ${Object.entries(styles.pseudo)
                                .map(([selector, rules]) => `
                                    .${containerClassName}${selector.slice(1)} {
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
                    className={twMerge(containerVariants({ size, responsive, center }), containerClassName, className)}
                    style={styles.base as React.CSSProperties}
                    {...props}
                />
            </>
        );
    }
);

Container.displayName = 'Container'; 