import React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { twMerge } from 'tailwind-merge';

const progressVariants = cva(
    [
        'relative',
        'overflow-hidden',
        'rounded-full',
        'transition-all',
    ],
    {
        variants: {
            size: {
                sm: 'h-1',
                md: 'h-2',
                lg: 'h-3',
                xl: 'h-4',
            },
            variant: {
                default: [
                    'bg-gray-100',
                    'dark:bg-gray-800',
                ],
                success: [
                    'bg-success-100',
                    'dark:bg-success-900/30',
                ],
                warning: [
                    'bg-warning-100',
                    'dark:bg-warning-900/30',
                ],
                error: [
                    'bg-error-100',
                    'dark:bg-error-900/30',
                ],
            },
        },
        defaultVariants: {
            size: 'md',
            variant: 'default',
        },
    }
);

const progressBarVariants = cva(
    [
        'h-full',
        'transition-all',
        'duration-300',
        'ease-in-out',
    ],
    {
        variants: {
            variant: {
                default: [
                    'bg-primary-600',
                    'dark:bg-primary-400',
                ],
                success: [
                    'bg-success-600',
                    'dark:bg-success-400',
                ],
                warning: [
                    'bg-warning-600',
                    'dark:bg-warning-400',
                ],
                error: [
                    'bg-error-600',
                    'dark:bg-error-400',
                ],
            },
            animated: {
                true: 'animate-progress-stripes bg-[length:1rem_1rem]',
                false: '',
            },
        },
        defaultVariants: {
            variant: 'default',
            animated: false,
        },
    }
);

export interface ProgressProps
    extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof progressVariants> {
    /**
     * The value of the progress indicator (0-100)
     */
    value?: number;
    /**
     * Whether to show the progress value
     */
    showValue?: boolean;
    /**
     * Whether to show animated stripes
     */
    animated?: boolean;
    /**
     * Whether to show indeterminate state
     */
    indeterminate?: boolean;
    /**
     * Custom styles
     */
    sx?: { [key: string]: any };
}

export const Progress = React.forwardRef<HTMLDivElement, ProgressProps>(
    (
        {
            className,
            variant,
            size,
            value = 0,
            showValue = false,
            animated = false,
            indeterminate = false,
            sx,
            ...props
        },
        ref
    ) => {
        const progressClassName = sx ? `progress-${Math.random().toString(36).slice(2, 11)}` : '';
        const clampedValue = Math.min(100, Math.max(0, value));

        return (
            <>
                {sx && (
                    <style>
                        {`
                            .${progressClassName} {
                                transition: all 300ms cubic-bezier(0.4, 0, 0.2, 1);
                                ${Object.entries(sx)
                                .filter(([key]) => !key.startsWith('&') && !key.startsWith('@media'))
                                .map(([key, value]) => `${key.replace(/[A-Z]/g, '-$&').toLowerCase()}: ${value};`)
                                .join('\n')}
                            }
                            ${Object.entries(sx)
                                .filter(([key]) => key.startsWith('&') || key.startsWith('@media'))
                                .map(([key, value]) => `
                                    ${key.startsWith('@media') ? key : `.${progressClassName}${key.slice(1)}`} {
                                        ${Object.entries(value as object)
                                        .map(([k, v]) => `${k.replace(/[A-Z]/g, '-$&').toLowerCase()}: ${v};`)
                                        .join('\n')}
                                    }
                                `)
                                .join('\n')}

                            @keyframes progress-stripes {
                                from {
                                    background-position: 1rem 0;
                                }
                                to {
                                    background-position: 0 0;
                                }
                            }

                            .animate-progress-stripes {
                                animation: progress-stripes 1s linear infinite;
                                background-image: linear-gradient(
                                    45deg,
                                    rgba(255, 255, 255, 0.15) 25%,
                                    transparent 25%,
                                    transparent 50%,
                                    rgba(255, 255, 255, 0.15) 50%,
                                    rgba(255, 255, 255, 0.15) 75%,
                                    transparent 75%,
                                    transparent
                                );
                            }

                            @keyframes indeterminate {
                                0% {
                                    transform: translateX(-100%);
                                }
                                100% {
                                    transform: translateX(200%);
                                }
                            }

                            .animate-indeterminate {
                                animation: indeterminate 1.5s infinite;
                                width: 50%;
                            }
                        `}
                    </style>
                )}
                <div
                    ref={ref}
                    className={twMerge(progressVariants({ variant, size }), progressClassName, className)}
                    role="progressbar"
                    aria-valuemin={0}
                    aria-valuemax={100}
                    aria-valuenow={indeterminate ? undefined : clampedValue}
                    {...props}
                >
                    <div
                        className={twMerge(
                            progressBarVariants({ variant, animated }),
                            indeterminate ? 'animate-indeterminate' : '',
                            'relative'
                        )}
                        style={{
                            width: indeterminate ? undefined : `${clampedValue}%`,
                        }}
                    />
                    {showValue && !indeterminate && (
                        <div className="absolute inset-0 flex items-center justify-center text-xs font-medium">
                            {clampedValue}%
                        </div>
                    )}
                </div>
            </>
        );
    }
);

Progress.displayName = 'Progress'; 