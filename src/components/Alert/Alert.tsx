import React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { twMerge } from 'tailwind-merge';

const alertVariants = cva(
    [
        'relative',
        'w-full',
        'rounded-lg',
        'p-4',
        'text-sm',
        'flex',
        'items-start',
        'gap-3',
    ],
    {
        variants: {
            variant: {
                info: [
                    'bg-blue-50',
                    'text-blue-800',
                    'dark:bg-blue-900/50',
                    'dark:text-blue-200',
                ],
                success: [
                    'bg-green-50',
                    'text-green-800',
                    'dark:bg-green-900/50',
                    'dark:text-green-200',
                ],
                warning: [
                    'bg-yellow-50',
                    'text-yellow-800',
                    'dark:bg-yellow-900/50',
                    'dark:text-yellow-200',
                ],
                error: [
                    'bg-red-50',
                    'text-red-800',
                    'dark:bg-red-900/50',
                    'dark:text-red-200',
                ],
            },
        },
        defaultVariants: {
            variant: 'info',
        },
    }
);

const iconVariants = cva('flex-shrink-0 w-5 h-5', {
    variants: {
        variant: {
            info: 'text-blue-500 dark:text-blue-400',
            success: 'text-green-500 dark:text-green-400',
            warning: 'text-yellow-500 dark:text-yellow-400',
            error: 'text-red-500 dark:text-red-400',
        },
    },
    defaultVariants: {
        variant: 'info',
    },
});

export interface AlertProps
    extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof alertVariants> {
    /**
     * The title of the alert
     */
    title?: string;
    /**
     * Whether the alert can be dismissed
     */
    dismissible?: boolean;
    /**
     * Callback when the alert is dismissed
     */
    onDismiss?: () => void;
    /**
     * Custom icon to display
     */
    icon?: React.ReactNode;
    /**
     * Custom styles
     */
    sx?: { [key: string]: any };
}

const defaultIcons = {
    info: (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
            <path fillRule="evenodd" d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12zm8.706-1.442c1.146-.573 2.437.463 2.126 1.706l-.709 2.836.042-.02a.75.75 0 01.67 1.34l-.04.022c-1.147.573-2.438-.463-2.127-1.706l.71-2.836-.042.02a.75.75 0 11-.671-1.34l.041-.022zM12 9a.75.75 0 100-1.5.75.75 0 000 1.5z" clipRule="evenodd" />
        </svg>
    ),
    success: (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
            <path fillRule="evenodd" d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12zm13.36-1.814a.75.75 0 10-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 00-1.06 1.06l2.25 2.25a.75.75 0 001.14-.094l3.75-5.25z" clipRule="evenodd" />
        </svg>
    ),
    warning: (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
            <path fillRule="evenodd" d="M9.401 3.003c1.155-2 4.043-2 5.197 0l7.355 12.748c1.154 2-.29 4.5-2.599 4.5H4.645c-2.309 0-3.752-2.5-2.598-4.5L9.4 3.003zM12 8.25a.75.75 0 01.75.75v3.75a.75.75 0 01-1.5 0V9a.75.75 0 01.75-.75zm0 8.25a.75.75 0 100-1.5.75.75 0 000 1.5z" clipRule="evenodd" />
        </svg>
    ),
    error: (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
            <path fillRule="evenodd" d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25zm-1.72 6.97a.75.75 0 10-1.06 1.06L10.94 12l-1.72 1.72a.75.75 0 101.06 1.06L12 13.06l1.72 1.72a.75.75 0 101.06-1.06L13.06 12l1.72-1.72a.75.75 0 10-1.06-1.06L12 10.94l-1.72-1.72z" clipRule="evenodd" />
        </svg>
    ),
};

export const Alert = React.forwardRef<HTMLDivElement, AlertProps>(
    (
        {
            className,
            variant,
            title,
            children,
            dismissible,
            onDismiss,
            icon,
            sx,
            ...props
        },
        ref
    ) => {
        const alertClassName = sx ? `alert-${Math.random().toString(36).slice(2, 11)}` : '';

        return (
            <>
                {sx && (
                    <style>
                        {`
                            .${alertClassName} {
                                ${Object.entries(sx)
                                .map(([key, value]) => `${key.replace(/[A-Z]/g, '-$&').toLowerCase()}: ${value};`)
                                .join('\n')}
                            }
                        `}
                    </style>
                )}
                <div
                    ref={ref}
                    role="alert"
                    className={twMerge(alertVariants({ variant }), alertClassName, className)}
                    {...props}
                >
                    {(icon || defaultIcons[variant || 'info']) && (
                        <div className={iconVariants({ variant })}>
                            {icon || defaultIcons[variant || 'info']}
                        </div>
                    )}
                    <div className="flex-1">
                        {title && (
                            <h3 className="font-medium mb-1">{title}</h3>
                        )}
                        <div className="text-sm">{children}</div>
                    </div>
                    {dismissible && (
                        <button
                            type="button"
                            className={twMerge(
                                'flex-shrink-0',
                                'p-1.5',
                                'rounded-lg',
                                'inline-flex',
                                'hover:bg-black/5',
                                'dark:hover:bg-white/5',
                                'focus:outline-none',
                                'focus:ring-2',
                                'focus:ring-offset-2',
                                'focus:ring-offset-transparent',
                                variant === 'info' && 'focus:ring-blue-500',
                                variant === 'success' && 'focus:ring-green-500',
                                variant === 'warning' && 'focus:ring-yellow-500',
                                variant === 'error' && 'focus:ring-red-500'
                            )}
                            onClick={onDismiss}
                            aria-label="Dismiss"
                        >
                            <svg
                                className="w-4 h-4"
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            >
                                <line x1="18" y1="6" x2="6" y2="18" />
                                <line x1="6" y1="6" x2="18" y2="18" />
                            </svg>
                        </button>
                    )}
                </div>
            </>
        );
    }
);

Alert.displayName = 'Alert'; 