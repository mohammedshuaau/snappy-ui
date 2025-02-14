import React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { twMerge } from 'tailwind-merge';

const spinnerVariants = cva(
    [
        'inline-block',
        'animate-spin',
        'rounded-full',
        'border-current',
        'border-solid',
        'border-r-transparent',
    ],
    {
        variants: {
            variant: {
                primary: 'text-primary-500',
                secondary: 'text-gray-500',
                success: 'text-green-500',
                danger: 'text-red-500',
                warning: 'text-yellow-500',
                info: 'text-blue-500',
            },
            size: {
                xs: 'w-3 h-3 border-2',
                sm: 'w-4 h-4 border-2',
                md: 'w-6 h-6 border-2',
                lg: 'w-8 h-8 border-3',
                xl: 'w-12 h-12 border-4',
            },
        },
        defaultVariants: {
            variant: 'primary',
            size: 'md',
        },
    }
);

export interface SpinnerProps
    extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof spinnerVariants> {
    /**
     * Custom styles
     */
    sx?: { [key: string]: any };
}

export const Spinner = React.forwardRef<HTMLDivElement, SpinnerProps>(
    ({ className, variant, size, sx, ...props }, ref) => {
        const spinnerClassName = sx ? `spinner-${Math.random().toString(36).slice(2, 11)}` : '';

        return (
            <>
                {sx && (
                    <style>
                        {`
                            .${spinnerClassName} {
                                ${Object.entries(sx)
                                .map(([key, value]) => `${key.replace(/[A-Z]/g, '-$&').toLowerCase()}: ${value};`)
                                .join('\n')}
                            }
                        `}
                    </style>
                )}
                <div
                    ref={ref}
                    className={twMerge(spinnerVariants({ variant, size }), spinnerClassName, className)}
                    role="status"
                    aria-label="loading"
                    {...props}
                />
            </>
        );
    }
);

Spinner.displayName = 'Spinner'; 