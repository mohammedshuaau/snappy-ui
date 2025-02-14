import React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { twMerge } from 'tailwind-merge';
import { transitionClasses } from '../../styles/base';

// Card variants
const cardVariants = cva(
    [
        // Base styles
        'rounded-lg border bg-white p-4',
        'relative overflow-hidden',
        ...transitionClasses,
        // Dark mode
        'dark:bg-slate-800 dark:border-slate-700',
    ],
    {
        variants: {
            variant: {
                flat: [
                    'border-transparent shadow-sm',
                    'dark:shadow-none',
                ],
                outlined: [
                    'border border-slate-200',
                    'dark:border-slate-700',
                ],
                elevated: [
                    'border-transparent shadow-md',
                    'dark:shadow-slate-900/10',
                ],
            },
            padding: {
                none: 'p-0',
                sm: 'p-3',
                md: 'p-4',
                lg: 'p-6',
            },
            radius: {
                none: 'rounded-none',
                sm: 'rounded',
                md: 'rounded-lg',
                lg: 'rounded-xl',
            },
            isHoverable: {
                true: [
                    'transition-all duration-200',
                    'hover:shadow-lg hover:-translate-y-0.5',
                    'dark:hover:shadow-slate-900/10',
                ],
            },
            isClickable: {
                true: [
                    'cursor-pointer',
                    'active:scale-[0.98]',
                ],
            },
        },
        defaultVariants: {
            variant: 'flat',
            padding: 'md',
            radius: 'md',
            isHoverable: false,
            isClickable: false,
        },
    }
);

// Image wrapper variants
const imageWrapperVariants = cva(
    'relative overflow-hidden',
    {
        variants: {
            aspectRatio: {
                auto: '',
                square: 'aspect-square',
                video: 'aspect-video',
            },
            radius: {
                none: 'rounded-none',
                sm: 'rounded',
                md: 'rounded-lg',
                lg: 'rounded-xl',
            },
        },
        defaultVariants: {
            aspectRatio: 'auto',
            radius: 'none',
        },
    }
);

// Types
type CSSPropertiesWithPseudos = React.CSSProperties & {
    [K in `&:${string}`]?: React.CSSProperties;
};

// Props interfaces
export interface CardProps
    extends Omit<React.HTMLAttributes<HTMLDivElement>, 'title'>,
    VariantProps<typeof cardVariants> {
    sx?: CSSPropertiesWithPseudos;
}

export interface CardImageProps
    extends React.ImgHTMLAttributes<HTMLImageElement>,
    VariantProps<typeof imageWrapperVariants> {
    overlay?: React.ReactNode;
}

// Card Component
const Card = React.forwardRef<HTMLDivElement, CardProps>(
    ({ className, variant, padding, radius, isHoverable, isClickable, sx, children, ...props }, ref) => {
        // Generate unique class name for custom styles
        const cardClassName = `card-${Math.random().toString(36).slice(2, 11)}`;

        // Convert sx prop to style object with simplified typing
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
                            .${cardClassName} {
                                transition: all 300ms cubic-bezier(0.4, 0, 0.2, 1);
                            }
                            ${Object.entries(styles.pseudo)
                                .map(([selector, rules]) => `
                                    .${cardClassName}${selector.slice(1)} {
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
                    className={twMerge(
                        cardVariants({ variant, padding, radius, isHoverable, isClickable }),
                        cardClassName,
                        className
                    )}
                    style={styles.base as React.CSSProperties}
                    {...props}
                >
                    {children}
                </div>
            </>
        );
    }
);

// Card Image Component
const CardImage = React.forwardRef<HTMLImageElement, CardImageProps>(
    ({ className, aspectRatio, radius, src, alt, overlay, ...props }, ref) => (
        <div className={twMerge(imageWrapperVariants({ aspectRatio, radius }), className)}>
            <img
                ref={ref}
                src={src}
                alt={alt}
                className="h-full w-full object-cover"
                {...props}
            />
            {overlay && (
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent">
                    {overlay}
                </div>
            )}
        </div>
    )
);

// Display names
Card.displayName = 'Card';
CardImage.displayName = 'CardImage';

export { Card, CardImage, cardVariants, imageWrapperVariants };
