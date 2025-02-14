import React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { twMerge } from 'tailwind-merge';

const messageVariants = cva(
    [
        'flex',
        'items-center',
        'gap-2',
        'text-sm',
        'py-2',
        'px-3',
        'rounded-md',
    ],
    {
        variants: {
            variant: {
                default: [
                    'bg-gray-100',
                    'text-gray-800',
                    'dark:bg-gray-800',
                    'dark:text-gray-200',
                ],
                info: [
                    'bg-blue-100',
                    'text-blue-800',
                    'dark:bg-blue-900/50',
                    'dark:text-blue-200',
                ],
                success: [
                    'bg-green-100',
                    'text-green-800',
                    'dark:bg-green-900/50',
                    'dark:text-green-200',
                ],
                warning: [
                    'bg-yellow-100',
                    'text-yellow-800',
                    'dark:bg-yellow-900/50',
                    'dark:text-yellow-200',
                ],
                error: [
                    'bg-red-100',
                    'text-red-800',
                    'dark:bg-red-900/50',
                    'dark:text-red-200',
                ],
            },
            size: {
                sm: 'text-xs py-1 px-2',
                md: 'text-sm py-2 px-3',
                lg: 'text-base py-3 px-4',
            },
        },
        defaultVariants: {
            variant: 'default',
            size: 'md',
        },
    }
);

const iconVariants = cva('flex-shrink-0', {
    variants: {
        size: {
            sm: 'w-3 h-3',
            md: 'w-4 h-4',
            lg: 'w-5 h-5',
        },
    },
    defaultVariants: {
        size: 'md',
    },
});

export interface MessageProps
    extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof messageVariants> {
    /**
     * Icon to display before the message
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

export const Message = React.forwardRef<HTMLDivElement, MessageProps>(
    ({ className, variant, size, icon, children, sx, ...props }, ref) => {
        const messageClassName = sx ? `message-${Math.random().toString(36).slice(2, 11)}` : '';

        return (
            <>
                {sx && (
                    <style>
                        {`
                            .${messageClassName} {
                                ${Object.entries(sx)
                                .map(([key, value]) => `${key.replace(/[A-Z]/g, '-$&').toLowerCase()}: ${value};`)
                                .join('\n')}
                            }
                        `}
                    </style>
                )}
                <div
                    ref={ref}
                    role="status"
                    className={twMerge(messageVariants({ variant, size }), messageClassName, className)}
                    {...props}
                >
                    {(icon || (variant && variant !== 'default' && defaultIcons[variant])) && (
                        <span className={iconVariants({ size })}>
                            {icon || (variant && variant !== 'default' && defaultIcons[variant])}
                        </span>
                    )}
                    {children}
                </div>
            </>
        );
    }
);

Message.displayName = 'Message'; 