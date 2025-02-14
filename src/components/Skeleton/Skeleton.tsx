import React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { twMerge } from 'tailwind-merge';

const skeletonVariants = cva(
    [
        'animate-pulse',
        'bg-gray-200',
        'dark:bg-gray-700',
        'rounded-md',
    ],
    {
        variants: {
            variant: {
                default: '',
                circular: 'rounded-full',
                rectangular: 'rounded-none',
            },
            animation: {
                pulse: 'animate-pulse',
                wave: 'animate-skeleton-wave',
                none: '',
            },
        },
        defaultVariants: {
            variant: 'default',
            animation: 'pulse',
        },
    }
);

export interface SkeletonProps
    extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof skeletonVariants> {
    /**
     * Width of the skeleton
     */
    width?: string | number;
    /**
     * Height of the skeleton
     */
    height?: string | number;
    /**
     * Custom styles
     */
    sx?: { [key: string]: any };
}

export const Skeleton = React.forwardRef<HTMLDivElement, SkeletonProps>(
    ({ className, variant, animation, width, height, sx, style, ...props }, ref) => {
        const skeletonClassName = sx ? `skeleton-${Math.random().toString(36).slice(2, 11)}` : '';

        return (
            <>
                {sx && (
                    <style>
                        {`
                            @keyframes skeleton-wave {
                                0% {
                                    background-position: 100% 50%;
                                }
                                100% {
                                    background-position: 0% 50%;
                                }
                            }

                            .animate-skeleton-wave {
                                background: linear-gradient(
                                    90deg,
                                    rgba(255, 255, 255, 0) 0%,
                                    rgba(255, 255, 255, 0.1) 50%,
                                    rgba(255, 255, 255, 0) 100%
                                );
                                background-size: 200% 100%;
                                animation: skeleton-wave 1.5s infinite;
                            }

                            .${skeletonClassName} {
                                transition: all 300ms cubic-bezier(0.4, 0, 0.2, 1);
                                ${Object.entries(sx)
                                .filter(([key]) => !key.startsWith('&') && !key.startsWith('@media'))
                                .map(([key, value]) => `${key.replace(/[A-Z]/g, '-$&').toLowerCase()}: ${value};`)
                                .join('\n')}
                            }
                            ${Object.entries(sx)
                                .filter(([key]) => key.startsWith('&') || key.startsWith('@media'))
                                .map(([key, value]) => `
                                    ${key.startsWith('@media') ? key : `.${skeletonClassName}${key.slice(1)}`} {
                                        ${Object.entries(value as object)
                                        .map(([k, v]) => `${k.replace(/[A-Z]/g, '-$&').toLowerCase()}: ${v};`)
                                        .join('\n')}
                                    }
                                `)
                                .join('\n')}
                        `}
                    </style>
                )}
                <div
                    ref={ref}
                    className={twMerge(skeletonVariants({ variant, animation }), skeletonClassName, className)}
                    style={{
                        width: width ? (typeof width === 'number' ? `${width}px` : width) : undefined,
                        height: height ? (typeof height === 'number' ? `${height}px` : height) : undefined,
                        ...style,
                    }}
                    {...props}
                />
            </>
        );
    }
);

Skeleton.displayName = 'Skeleton';

// Compound components for common use cases
export const SkeletonText = React.forwardRef<HTMLDivElement, Omit<SkeletonProps, 'height'>>((props, ref) => (
    <Skeleton ref={ref} height={16} {...props} />
));

SkeletonText.displayName = 'SkeletonText';

export const SkeletonCircle = React.forwardRef<HTMLDivElement, Omit<SkeletonProps, 'variant'>>((props, ref) => (
    <Skeleton ref={ref} variant="circular" {...props} />
));

SkeletonCircle.displayName = 'SkeletonCircle';

export const SkeletonRectangle = React.forwardRef<HTMLDivElement, Omit<SkeletonProps, 'variant'>>((props, ref) => (
    <Skeleton ref={ref} variant="rectangular" {...props} />
));

SkeletonRectangle.displayName = 'SkeletonRectangle'; 