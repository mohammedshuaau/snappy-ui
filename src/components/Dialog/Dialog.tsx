import React, { useEffect, useCallback, useState } from 'react';
import { createPortal } from 'react-dom';
import { cva, type VariantProps } from 'class-variance-authority';
import { twMerge } from 'tailwind-merge';
import { transitionClasses } from '../../styles/base';

// Backdrop variants
const backdropVariants = cva(
    [
        'fixed inset-0 z-50',
        'bg-black/50 backdrop-blur-sm',
        'transition-all duration-200',
        'data-[state=closed]:animate-out data-[state=closed]:fade-out-0',
        'data-[state=open]:animate-in data-[state=open]:fade-in-0',
    ],
    {
        variants: {
            blur: {
                none: 'backdrop-blur-none',
                sm: 'backdrop-blur-sm',
                md: 'backdrop-blur-md',
                lg: 'backdrop-blur-lg',
            },
        },
        defaultVariants: {
            blur: 'sm',
        },
    }
);

// Dialog variants
const dialogVariants = cva(
    [
        // Base styles
        'fixed left-[50%] top-[50%] z-50',
        'flex flex-col gap-4',
        'translate-x-[-50%] translate-y-[-50%]',
        'rounded-lg border bg-white p-6 shadow-lg',
        'focus-visible:outline-none',
        // Dark mode
        'dark:bg-slate-900 dark:border-slate-800',
        // Animation
        'transition-all duration-200',
        'data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95 data-[state=closed]:slide-out-to-left-1/2 data-[state=closed]:slide-out-to-top-[48%]',
        'data-[state=open]:animate-in data-[state=open]:fade-in-0 data-[state=open]:zoom-in-95 data-[state=open]:slide-in-from-left-1/2 data-[state=open]:slide-in-from-top-[48%]',
        ...transitionClasses,
    ],
    {
        variants: {
            size: {
                sm: 'w-full max-w-sm',
                md: 'w-full max-w-md',
                lg: 'w-full max-w-lg',
                xl: 'w-full max-w-xl',
                '2xl': 'w-full max-w-2xl',
                'screen-sm': 'w-screen h-[calc(100vh-4rem)]',
            },
            variant: {
                default: [
                    'border-slate-200',
                    'dark:border-slate-800',
                ],
                destructive: [
                    'border-red-200 bg-red-50',
                    'dark:border-red-800 dark:bg-red-950',
                ],
            },
        },
        defaultVariants: {
            size: 'md',
            variant: 'default',
        },
    }
);

// Types
type CSSPropertiesWithPseudos = React.CSSProperties & {
    [K in `&:${string}`]?: React.CSSProperties;
};

// Props interfaces
export interface DialogProps
    extends Omit<React.HTMLAttributes<HTMLDivElement>, 'title'>,
    VariantProps<typeof dialogVariants> {
    /** Whether the dialog is open */
    open?: boolean;
    /** Callback when the dialog should close */
    onClose?: () => void;
    /** Whether to show the close button */
    showCloseButton?: boolean;
    /** Whether to close when clicking outside */
    closeOnClickOutside?: boolean;
    /** Whether to close when pressing escape */
    closeOnEscape?: boolean;
    /** Custom styles using the sx prop */
    sx?: CSSPropertiesWithPseudos;
    /** Backdrop blur amount */
    blur?: VariantProps<typeof backdropVariants>['blur'];
}

export interface DialogHeaderProps
    extends Omit<React.HTMLAttributes<HTMLDivElement>, 'title'> {
    /** Dialog title */
    title?: React.ReactNode;
    /** Dialog description */
    description?: React.ReactNode;
}

export interface DialogFooterProps extends React.HTMLAttributes<HTMLDivElement> { }

// Dialog Component
const Dialog = React.forwardRef<HTMLDivElement, DialogProps>(
    ({
        className,
        children,
        open = false,
        onClose,
        showCloseButton = true,
        closeOnClickOutside = true,
        closeOnEscape = true,
        size,
        variant,
        blur,
        sx,
        ...props
    }, ref) => {
        const [mounted, setMounted] = useState(false);
        const [isClosing, setIsClosing] = useState(false);

        // Handle mounting and unmounting
        useEffect(() => {
            if (open) {
                setMounted(true);
                setIsClosing(false);
                document.body.style.overflow = 'hidden';
            } else if (mounted) {
                setIsClosing(true);
                document.body.style.overflow = '';
                const timer = setTimeout(() => {
                    setMounted(false);
                    setIsClosing(false);
                }, 200);
                return () => clearTimeout(timer);
            }
        }, [open]);

        // Cleanup scroll lock on unmount
        useEffect(() => {
            return () => {
                document.body.style.overflow = '';
            };
        }, []);

        // Handle escape key
        const handleEscape = useCallback((event: KeyboardEvent) => {
            if (open && closeOnEscape && event.key === 'Escape') {
                onClose?.();
            }
        }, [open, closeOnEscape, onClose]);

        useEffect(() => {
            document.addEventListener('keydown', handleEscape);
            return () => document.removeEventListener('keydown', handleEscape);
        }, [handleEscape]);

        // Handle backdrop click
        const handleBackdropClick = (event: React.MouseEvent) => {
            if (closeOnClickOutside && event.target === event.currentTarget) {
                onClose?.();
            }
        };

        // Generate unique class name for custom styles
        const dialogClassName = `dialog-${Math.random().toString(36).slice(2, 11)}`;

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

        if (!mounted) return null;

        const dialogState = isClosing ? 'closed' : 'open';

        return createPortal(
            <div
                role="presentation"
                className={twMerge(backdropVariants({ blur }))}
                data-state={dialogState}
                onClick={handleBackdropClick}
                style={{
                    visibility: isClosing ? 'hidden' : 'visible',
                    opacity: isClosing ? 0 : 1,
                    pointerEvents: isClosing ? 'none' : 'auto'
                }}
            >
                {/* Style tag for custom styles */}
                {sx && Object.keys(styles.pseudo).length > 0 && (
                    <style>
                        {`
                            .${dialogClassName} {
                                transition: all 200ms cubic-bezier(0.4, 0, 0.2, 1);
                            }
                            ${Object.entries(styles.pseudo)
                                .map(([selector, rules]) => `
                                    .${dialogClassName}${selector.slice(1)} {
                                        ${Object.entries(rules as Record<string, unknown>)
                                        .map(([prop, value]) => `${prop.replace(/[A-Z]/g, '-$&').toLowerCase()}: ${value}`)
                                        .join(';')}
                                    }
                                `)
                                .join('')}
                        `}
                    </style>
                )}

                {/* Dialog */}
                <div
                    ref={ref}
                    role="dialog"
                    aria-modal="true"
                    className={twMerge(
                        dialogVariants({ size, variant }),
                        dialogClassName,
                        className
                    )}
                    style={{
                        ...styles.base as React.CSSProperties,
                        visibility: isClosing ? 'hidden' : 'visible',
                        opacity: isClosing ? 0 : 1,
                        pointerEvents: isClosing ? 'none' : 'auto'
                    }}
                    data-state={dialogState}
                    onClick={(e) => e.stopPropagation()}
                    {...props}
                >
                    {/* Close button */}
                    {showCloseButton && onClose && (
                        <button
                            type="button"
                            className={twMerge(
                                'absolute right-4 top-4 rounded-sm opacity-70',
                                'hover:opacity-100',
                                'focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2',
                                'disabled:pointer-events-none',
                                'dark:focus:ring-slate-400 dark:focus:ring-offset-slate-900',
                            )}
                            onClick={onClose}
                            aria-label="Close dialog"
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
                    )}

                    {children}
                </div>
            </div>,
            document.body
        );
    }
);

// Dialog Header Component
const DialogHeader = React.forwardRef<HTMLDivElement, DialogHeaderProps>(
    ({ className, title, description, children, ...props }, ref) => (
        <div
            ref={ref}
            className={twMerge('flex flex-col gap-2', className)}
            {...props}
        >
            {(title || description) ? (
                <>
                    {title && (
                        <h2 className="text-lg font-semibold leading-none tracking-tight text-slate-900 dark:text-slate-100">
                            {title}
                        </h2>
                    )}
                    {description && (
                        <p className="text-sm text-slate-500 dark:text-slate-400">
                            {description}
                        </p>
                    )}
                </>
            ) : children}
        </div>
    )
);

// Dialog Footer Component
const DialogFooter = React.forwardRef<HTMLDivElement, DialogFooterProps>(
    ({ className, children, ...props }, ref) => (
        <div
            ref={ref}
            className={twMerge(
                'flex flex-col-reverse sm:flex-row sm:justify-end sm:gap-2',
                className
            )}
            {...props}
        >
            {children}
        </div>
    )
);

// Display names
Dialog.displayName = 'Dialog';
DialogHeader.displayName = 'DialogHeader';
DialogFooter.displayName = 'DialogFooter';

export { Dialog, DialogHeader, DialogFooter, dialogVariants, backdropVariants }; 