import React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { twMerge } from 'tailwind-merge';
import { Spinner } from '../Spinner/Spinner';

const loadingOverlayVariants = cva(
    [
        'fixed',
        'inset-0',
        'z-50',
        'flex',
        'items-center',
        'justify-center',
        'bg-white/80',
        'dark:bg-gray-900/80',
        'backdrop-blur-sm',
        'transition-opacity',
        'duration-200',
    ],
    {
        variants: {
            blur: {
                true: 'backdrop-blur-sm',
                false: 'backdrop-blur-none',
            },
            fullscreen: {
                true: 'fixed inset-0',
                false: 'absolute inset-0',
            },
        },
        defaultVariants: {
            blur: true,
            fullscreen: true,
        },
    }
);

export interface LoadingOverlayProps
    extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof loadingOverlayVariants> {
    /**
     * Whether the overlay is visible
     */
    visible?: boolean;
    /**
     * Custom loading spinner
     */
    spinner?: React.ReactNode;
    /**
     * Text to display below the spinner
     */
    text?: string;
    /**
     * Custom styles
     */
    sx?: { [key: string]: any };
}

export const LoadingOverlay = React.forwardRef<HTMLDivElement, LoadingOverlayProps>(
    (
        {
            className,
            visible = false,
            blur,
            fullscreen,
            spinner,
            text,
            sx,
            ...props
        },
        ref
    ) => {
        const overlayClassName = sx ? `loading-overlay-${Math.random().toString(36).slice(2, 11)}` : '';

        if (!visible) return null;

        return (
            <>
                {sx && (
                    <style>
                        {`
                            .${overlayClassName} {
                                ${Object.entries(sx)
                                .map(([key, value]) => `${key.replace(/[A-Z]/g, '-$&').toLowerCase()}: ${value};`)
                                .join('\n')}
                            }
                        `}
                    </style>
                )}
                <div
                    ref={ref}
                    className={twMerge(loadingOverlayVariants({ blur, fullscreen }), overlayClassName, className)}
                    role="status"
                    aria-busy="true"
                    data-testid="loading-overlay"
                    {...props}
                >
                    <div className="flex flex-col items-center gap-3">
                        {spinner || <Spinner size="xl" />}
                        {text && (
                            <div className="text-sm font-medium text-gray-900 dark:text-gray-100">
                                {text}
                            </div>
                        )}
                    </div>
                </div>
            </>
        );
    }
);

LoadingOverlay.displayName = 'LoadingOverlay'; 