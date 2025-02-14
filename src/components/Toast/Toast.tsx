import React from 'react';
import { toast as toastify, ToastContainer, ToastOptions, UpdateOptions, ToastContainerProps, TypeOptions, ToastPosition as ToastifyPosition, Slide } from 'react-toastify';
import { cva, type VariantProps } from 'class-variance-authority';
import { twMerge } from 'tailwind-merge';
import { transitionClasses } from '../../styles/base';
import 'react-toastify/dist/ReactToastify.css';

// Types
export type ToastType = 'info' | 'success' | 'warning' | 'error';
export type ToastPosition = 'top-left' | 'top-right' | 'top-center' | 'bottom-left' | 'bottom-right' | 'bottom-center';

// Styles
const toastVariants = cva(
    [
        // Base styles
        'relative w-full rounded-lg py-3 pl-3 pr-8',
        'flex items-center gap-3',
        'shadow-sm',
        ...transitionClasses,
    ],
    {
        variants: {
            variant: {
                info: [
                    'bg-blue-50/95 text-blue-800',
                    'dark:bg-blue-900/90 dark:text-blue-100',
                ],
                success: [
                    'bg-green-50/95 text-green-800',
                    'dark:bg-green-900/90 dark:text-green-100',
                ],
                warning: [
                    'bg-yellow-50/95 text-yellow-800',
                    'dark:bg-yellow-900/90 dark:text-yellow-100',
                ],
                error: [
                    'bg-red-50/95 text-red-800',
                    'dark:bg-red-900/90 dark:text-red-100',
                ],
            },
            hasIcon: {
                true: 'pl-3',
            },
            hasClose: {
                true: 'pr-8',
            },
        },
        defaultVariants: {
            variant: 'info',
            hasIcon: false,
            hasClose: false,
        },
    }
);

// Icons
const icons = {
    info: () => (
        <div className="flex h-6 w-6 items-center justify-center rounded-full bg-blue-500 text-white dark:bg-blue-400">
            <svg
                className="h-4 w-4"
                viewBox="0 0 24 24"
                fill="currentColor"
                stroke="none"
            >
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-6h2v6zm0-8h-2V7h2v2z" />
            </svg>
        </div>
    ),
    success: () => (
        <div className="flex h-6 w-6 items-center justify-center rounded-full bg-green-500 text-white dark:bg-green-400">
            <svg
                className="h-4 w-4"
                viewBox="0 0 24 24"
                fill="currentColor"
                stroke="none"
            >
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" />
            </svg>
        </div>
    ),
    warning: () => (
        <div className="flex h-6 w-6 items-center justify-center rounded-full bg-yellow-500 text-white dark:bg-yellow-400">
            <svg
                className="h-4 w-4"
                viewBox="0 0 24 24"
                fill="currentColor"
                stroke="none"
            >
                <path d="M1 21h22L12 2 1 21zm12-3h-2v-2h2v2zm0-4h-2v-4h2v4z" />
            </svg>
        </div>
    ),
    error: () => (
        <div className="flex h-6 w-6 items-center justify-center rounded-full bg-red-500 text-white dark:bg-red-400">
            <svg
                className="h-4 w-4"
                viewBox="0 0 24 24"
                fill="currentColor"
                stroke="none"
            >
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z" />
            </svg>
        </div>
    ),
};

export interface ToastProps
    extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof toastVariants> {
    /** The main message of the toast */
    message: React.ReactNode;
    /** Optional title for the toast */
    title?: string;
    /** Duration in milliseconds before auto-closing */
    duration?: number;
    /** Position of the toast */
    position?: ToastPosition;
    /** Custom icon to display */
    icon?: React.ReactNode;
    /** Callback when the toast is closed */
    onClose?: () => void;
}

// Custom Toast Component
export const ToastContent: React.FC<ToastProps> = ({
    message,
    title,
    variant = 'info',
    icon,
    onClose,
    className,
    ...props
}) => {
    const id = React.useId();

    // Get the icon based on variant if not provided
    const toastIcon = icon || (variant && icons[variant as keyof typeof icons]());

    return (
        <div
            role="alert"
            aria-labelledby={title ? `${id}-title` : undefined}
            className={twMerge(
                toastVariants({
                    variant,
                    hasIcon: !!toastIcon,
                    hasClose: true,
                }),
                'backdrop-blur-[2px]',
                className
            )}
            {...props}
        >
            {/* Icon */}
            {toastIcon && (
                <div className="flex items-center justify-center">
                    {toastIcon}
                </div>
            )}

            {/* Content */}
            <div className="flex-1 min-w-0">
                {title && (
                    <h5
                        id={`${id}-title`}
                        className="text-base font-semibold leading-none tracking-tight"
                    >
                        {title}
                    </h5>
                )}
                <div className={twMerge(
                    "text-sm leading-relaxed",
                    title && "mt-1",
                    variant === 'info' && 'text-blue-700 dark:text-blue-100',
                    variant === 'success' && 'text-green-700 dark:text-green-100',
                    variant === 'warning' && 'text-yellow-700 dark:text-yellow-100',
                    variant === 'error' && 'text-red-700 dark:text-red-100'
                )}>
                    {message}
                </div>
            </div>

            {/* Close button */}
            <button
                type="button"
                aria-label="Close toast"
                onClick={onClose}
                className={twMerge(
                    'absolute right-2 top-1/2 -translate-y-1/2',
                    'rounded-sm opacity-70 transition-opacity',
                    'hover:opacity-100',
                    'focus:outline-none',
                    variant === 'info' && 'text-blue-500 dark:text-blue-400',
                    variant === 'success' && 'text-green-500 dark:text-green-400',
                    variant === 'warning' && 'text-yellow-500 dark:text-yellow-400',
                    variant === 'error' && 'text-red-500 dark:text-red-400'
                )}
            >
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-4 w-4"
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
        </div>
    );
};

// Custom styles to completely override react-toastify
const toastifyOverrides = `
.Toastify__toast-container {
    padding: 16px;
    margin: 0;
    width: auto;
    min-width: 320px;
    max-width: 420px;
    z-index: 9999;
}

.Toastify__toast {
    padding: 0;
    margin: 0 0 12px 0;
    min-height: 0;
    background: none;
    box-shadow: none;
    cursor: default;
    overflow: visible;
    border-radius: 0.5rem;
    position: relative;
}

.Toastify__toast:last-child {
    margin-bottom: 0;
}

.Toastify__toast-body {
    padding: 0;
    margin: 0;
}

.Toastify__close-button {
    display: none;
}

.Toastify__progress-bar {
    height: 3px;
    background: none;
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    opacity: 1;
    transform: scaleX(1);
    transform-origin: left;
    transition: transform linear;
}

.Toastify__progress-bar--controlled {
    transition: transform linear !important;
}

.Toastify__progress-bar--info {
    background: linear-gradient(to right, rgb(59 130 246), rgb(37 99 235));
}

.Toastify__progress-bar--success {
    background: linear-gradient(to right, rgb(34 197 94), rgb(22 163 74));
}

.Toastify__progress-bar--warning {
    background: linear-gradient(to right, rgb(234 179 8), rgb(202 138 4));
}

.Toastify__progress-bar--error {
    background: linear-gradient(to right, rgb(239 68 68), rgb(220 38 38));
}

.dark .Toastify__progress-bar--info {
    background: linear-gradient(to right, rgb(96 165 250), rgb(59 130 246));
}

.dark .Toastify__progress-bar--success {
    background: linear-gradient(to right, rgb(74 222 128), rgb(34 197 94));
}

.dark .Toastify__progress-bar--warning {
    background: linear-gradient(to right, rgb(250 204 21), rgb(234 179 8));
}

.dark .Toastify__progress-bar--error {
    background: linear-gradient(to right, rgb(248 113 113), rgb(239 68 68));
}

/* Dark mode support */
.dark .Toastify__toast {
    color-scheme: dark;
}

/* Animation fixes */
.Toastify__slide-enter--top-right {
    animation-name: Toastify__slideInRight !important;
}

.Toastify__slide-exit--top-right {
    animation-name: Toastify__slideOutRight !important;
}
`;

// Toast Container Component
export const SnapKitToastContainer: React.FC<Partial<ToastContainerProps>> = (props) => (
    <>
        <style>{toastifyOverrides}</style>
        <ToastContainer
            position="top-right"
            autoClose={5000}
            hideProgressBar={false}
            newestOnTop
            closeOnClick={false}
            rtl={false}
            pauseOnFocusLoss
            draggable={false}
            pauseOnHover
            theme="light"
            className="!-translate-y-4 !translate-x-0"
            {...props}
        />
    </>
);

// Toast functions
export const toast = {
    show: (props: ToastProps) => {
        const { message, title, variant = 'info', duration = 5000, position = 'top-right', icon, onClose, ...rest } = props;

        const toastOptions: ToastOptions = {
            position: position as ToastifyPosition,
            autoClose: duration,
            hideProgressBar: false,
            closeOnClick: false,
            pauseOnHover: true,
            draggable: false,
            progress: undefined,
            onClose,
            type: variant as TypeOptions,
        };

        // For string messages, use the default toast with type-based styling
        if (typeof message === 'string') {
            return toastify(message, toastOptions);
        }

        // For complex content, use our custom ToastContent component
        return toastify(
            <ToastContent
                message={message}
                title={title}
                variant={variant}
                icon={icon}
                onClose={() => toastify.dismiss()}
                {...rest}
            />,
            toastOptions
        );
    },
    info: (message: React.ReactNode, options?: Partial<ToastProps>) => {
        return toast.show({ message, variant: 'info', ...options });
    },
    success: (message: React.ReactNode, options?: Partial<ToastProps>) => {
        return toast.show({ message, variant: 'success', ...options });
    },
    warning: (message: React.ReactNode, options?: Partial<ToastProps>) => {
        return toast.show({ message, variant: 'warning', ...options });
    },
    error: (message: React.ReactNode, options?: Partial<ToastProps>) => {
        return toast.show({ message, variant: 'error', ...options });
    },
    update: (toastId: string | number, options: UpdateOptions) => {
        const { type, render } = options;
        if (typeof render === 'string') {
            return toastify.update(toastId, {
                ...options,
                type: type as TypeOptions,
            });
        }
        return toastify.update(toastId, {
            ...options,
            render: () => (
                <ToastContent
                    message={typeof render === 'function' ? render({
                        closeToast: () => toastify.dismiss(toastId),
                        toastProps: {
                            isIn: true,
                            toastId,
                            key: toastId,
                            position: 'top-right',
                            type: 'default',
                            rtl: false,
                            closeToast: () => toastify.dismiss(toastId),
                            theme: 'light',
                            transition: Slide,
                            draggablePercent: 80,
                            deleteToast: () => toastify.dismiss(toastId),
                            collapseAll: () => toastify.dismiss()
                        },
                        isPaused: false,
                        data: undefined
                    }) : render}
                    variant={(type || 'info') as ToastType}
                    onClose={() => toastify.dismiss(toastId)}
                />
            ),
            type: type as TypeOptions,
        });
    },
    dismiss: (toastId?: string | number) => {
        toastify.dismiss(toastId);
    },
    dismissAll: () => {
        toastify.dismiss();
    },
}; 