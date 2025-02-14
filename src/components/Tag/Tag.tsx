import React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { twMerge } from 'tailwind-merge';

const tagVariants = cva(
    [
        'inline-flex',
        'items-center',
        'justify-center',
        'whitespace-nowrap',
        'rounded-md',
        'font-medium',
        'transition-colors',
        'focus-visible:outline-none',
        'focus-visible:ring-2',
        'focus-visible:ring-offset-2',
        'focus-visible:ring-primary-500',
    ],
    {
        variants: {
            variant: {
                default: [
                    'bg-gray-100',
                    'text-gray-900',
                    'hover:bg-gray-200/80',
                    'dark:bg-gray-800',
                    'dark:text-gray-100',
                    'dark:hover:bg-gray-700/80',
                ],
                primary: [
                    'bg-primary-100',
                    'text-primary-900',
                    'hover:bg-primary-200/80',
                    'dark:bg-primary-900',
                    'dark:text-primary-100',
                    'dark:hover:bg-primary-800/80',
                ],
                success: [
                    'bg-success-100',
                    'text-success-900',
                    'hover:bg-success-200/80',
                    'dark:bg-success-900',
                    'dark:text-success-100',
                    'dark:hover:bg-success-800/80',
                ],
                warning: [
                    'bg-warning-100',
                    'text-warning-900',
                    'hover:bg-warning-200/80',
                    'dark:bg-warning-900',
                    'dark:text-warning-100',
                    'dark:hover:bg-warning-800/80',
                ],
                error: [
                    'bg-error-100',
                    'text-error-900',
                    'hover:bg-error-200/80',
                    'dark:bg-error-900',
                    'dark:text-error-100',
                    'dark:hover:bg-error-800/80',
                ],
                outline: [
                    'border',
                    'border-gray-200',
                    'bg-transparent',
                    'text-gray-900',
                    'hover:bg-gray-100',
                    'dark:border-gray-700',
                    'dark:text-gray-100',
                    'dark:hover:bg-gray-800',
                ],
            },
            size: {
                sm: ['text-xs', 'px-2', 'py-0.5', 'gap-1'],
                md: ['text-sm', 'px-2.5', 'py-0.5', 'gap-1.5'],
                lg: ['text-base', 'px-3', 'py-1', 'gap-2'],
            },
            rounded: {
                true: 'rounded-full',
                false: 'rounded-md',
            },
        },
        defaultVariants: {
            variant: 'default',
            size: 'md',
            rounded: false,
        },
    }
);

const closeButtonVariants = cva(
    [
        'inline-flex',
        'items-center',
        'justify-center',
        'rounded-full',
        'hover:bg-black/10',
        'dark:hover:bg-white/10',
        'focus:outline-none',
        'focus:ring-2',
        'focus:ring-primary-500',
        'focus:ring-offset-1',
    ],
    {
        variants: {
            size: {
                sm: ['w-3.5', 'h-3.5'],
                md: ['w-4', 'h-4'],
                lg: ['w-5', 'h-5'],
            },
        },
        defaultVariants: {
            size: 'md',
        },
    }
);

export interface TagProps
    extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof tagVariants> {
    leftIcon?: React.ReactNode;
    rightIcon?: React.ReactNode;
    onClose?: () => void;
    closeIcon?: React.ReactNode;
    sx?: { [key: string]: any };
}

const CloseIcon = ({ size = 'md' }: { size?: 'sm' | 'md' | 'lg' }) => {
    const sizeMap = {
        sm: 10,
        md: 12,
        lg: 14,
    };

    return (
        <svg
            width={sizeMap[size]}
            height={sizeMap[size]}
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
        >
            <path d="M18 6L6 18M6 6l12 12" />
        </svg>
    );
};

export const Tag = React.forwardRef<HTMLDivElement, TagProps>(
    (
        {
            className,
            variant,
            size,
            rounded,
            children,
            leftIcon,
            rightIcon,
            onClose,
            closeIcon,
            sx,
            ...props
        },
        ref
    ) => {
        const tagClassName = sx ? `tag-${Math.random().toString(36).slice(2, 11)}` : '';

        return (
            <>
                {sx && (
                    <style>
                        {`
                            .${tagClassName} {
                                transition: all 300ms cubic-bezier(0.4, 0, 0.2, 1);
                                ${Object.entries(sx)
                                .filter(([key]) => !key.startsWith('&') && !key.startsWith('@media'))
                                .map(([key, value]) => `${key.replace(/[A-Z]/g, '-$&').toLowerCase()}: ${value};`)
                                .join('\n')}
                            }
                            ${Object.entries(sx)
                                .filter(([key]) => key.startsWith('&') || key.startsWith('@media'))
                                .map(([key, value]) => `
                                    ${key.startsWith('@media') ? key : `.${tagClassName}${key.slice(1)}`} {
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
                    className={twMerge(tagVariants({ variant, size, rounded }), tagClassName, className)}
                    {...props}
                >
                    {leftIcon && <span className="shrink-0">{leftIcon}</span>}
                    <span>{children}</span>
                    {rightIcon && <span className="shrink-0">{rightIcon}</span>}
                    {onClose && (
                        <button
                            type="button"
                            className={closeButtonVariants({ size })}
                            onClick={onClose}
                            aria-label="Remove tag"
                        >
                            {closeIcon || <CloseIcon size={size ?? 'md'} />}
                        </button>
                    )}
                </div>
            </>
        );
    }
);

Tag.displayName = 'Tag'; 