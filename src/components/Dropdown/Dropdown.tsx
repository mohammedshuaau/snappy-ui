import React, { useEffect, useCallback, useState, useRef } from 'react';
import { createPortal } from 'react-dom';
import { cva, type VariantProps } from 'class-variance-authority';
import { twMerge } from 'tailwind-merge';
import { transitionClasses } from '../../styles/base';

// Dropdown menu variants
const dropdownMenuVariants = cva(
    [
        // Base styles
        'z-50 min-w-[8rem] overflow-hidden rounded-md bg-white shadow-lg',
        'mt-0.5',
        // Animation
        'origin-top-left transition-all',
        'data-[state=open]:animate-in data-[state=open]:fade-in-0 data-[state=open]:zoom-in-95',
        'data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95',
        // Dark mode
        'dark:bg-slate-900',
        ...transitionClasses,
    ],
    {
        variants: {
            variant: {
                default: [
                    'bg-white',
                    'dark:bg-slate-900',
                ],
                destructive: [
                    'bg-red-50',
                    'dark:bg-red-950',
                ],
            },
            align: {
                start: '',
                center: '',
                end: '',
            },
        },
        defaultVariants: {
            variant: 'default',
            align: 'start',
        },
    }
);

// Dropdown item variants
const dropdownItemVariants = cva(
    [
        'relative flex w-full cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none',
        'transition-colors',
        'hover:bg-slate-100 hover:text-slate-900',
        'focus:bg-slate-100 focus:text-slate-900',
        'data-[disabled]:pointer-events-none data-[disabled]:opacity-50',
        // Dark mode
        'dark:hover:bg-slate-800 dark:hover:text-slate-50',
        'dark:focus:bg-slate-800 dark:focus:text-slate-50',
    ],
    {
        variants: {
            variant: {
                default: [
                    'text-slate-700',
                    'dark:text-slate-300',
                ],
                destructive: [
                    'text-red-700',
                    'dark:text-red-300',
                    'hover:bg-red-50',
                    'focus:bg-red-50',
                    'dark:hover:bg-red-950',
                    'dark:focus:bg-red-950',
                ],
            },
            inset: {
                true: 'pl-8',
            },
        },
        defaultVariants: {
            variant: 'default',
            inset: false,
        },
    }
);

// Types
type CSSPropertiesWithPseudos = React.CSSProperties & {
    [K in `&:${string}`]?: React.CSSProperties;
};

// Props interfaces
export interface DropdownProps extends React.HTMLAttributes<HTMLDivElement> {
    /** Whether the dropdown is open */
    open?: boolean;
    /** Callback when the dropdown should close */
    onClose?: () => void;
    /** The trigger element */
    trigger: React.ReactNode;
    /** Custom styles using the sx prop */
    sx?: CSSPropertiesWithPseudos;
}

export interface DropdownMenuProps
    extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof dropdownMenuVariants> {
    /** Custom styles using the sx prop */
    sx?: CSSPropertiesWithPseudos;
}

export interface DropdownItemProps
    extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof dropdownItemVariants> {
    /** Whether the item is disabled */
    disabled?: boolean;
    /** Icon to display before the item text */
    icon?: React.ReactNode;
}

// Dropdown Component
const Dropdown = React.forwardRef<HTMLDivElement, DropdownProps>(
    ({ className, children, open = false, onClose, trigger, sx, ...props }, ref) => {
        const [mounted, setMounted] = useState(false);
        const [isClosing, setIsClosing] = useState(false);
        const triggerRef = useRef<HTMLDivElement>(null);
        const menuRef = useRef<HTMLDivElement>(null);
        const [position, setPosition] = useState({ top: 0, left: 0 });

        // Handle mounting and unmounting
        useEffect(() => {
            if (open) {
                setMounted(true);
                setIsClosing(false);
                // Calculate position when opening
                if (triggerRef.current) {
                    const rect = triggerRef.current.getBoundingClientRect();
                    setPosition({
                        top: rect.bottom + window.scrollY,
                        left: rect.left + window.scrollX,
                    });
                }
            } else if (mounted) {
                setIsClosing(true);
                const timer = setTimeout(() => {
                    setMounted(false);
                    setIsClosing(false);
                }, 300);
                return () => clearTimeout(timer);
            }
        }, [open]);

        // Handle click outside
        useEffect(() => {
            const handleClickOutside = (event: MouseEvent) => {
                if (
                    open &&
                    triggerRef.current &&
                    menuRef.current &&
                    !triggerRef.current.contains(event.target as Node) &&
                    !menuRef.current.contains(event.target as Node)
                ) {
                    onClose?.();
                }
            };

            document.addEventListener('mousedown', handleClickOutside);
            return () => document.removeEventListener('mousedown', handleClickOutside);
        }, [open, onClose]);

        // Handle escape key
        const handleEscape = useCallback((event: KeyboardEvent) => {
            if (open && event.key === 'Escape') {
                onClose?.();
            }
        }, [open, onClose]);

        useEffect(() => {
            document.addEventListener('keydown', handleEscape);
            return () => document.removeEventListener('keydown', handleEscape);
        }, [handleEscape]);

        // Update position on scroll and resize
        useEffect(() => {
            const updatePosition = () => {
                if (triggerRef.current && open) {
                    const rect = triggerRef.current.getBoundingClientRect();
                    setPosition({
                        top: rect.bottom + window.scrollY,
                        left: rect.left + window.scrollX,
                    });
                }
            };

            window.addEventListener('scroll', updatePosition, true);
            window.addEventListener('resize', updatePosition);

            return () => {
                window.removeEventListener('scroll', updatePosition, true);
                window.removeEventListener('resize', updatePosition);
            };
        }, [open]);

        // Generate unique class name for custom styles
        const dropdownClassName = `dropdown-${Math.random().toString(36).slice(2, 11)}`;

        // Convert sx prop to style object
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

        const menuState = isClosing ? 'closed' : 'open';

        return (
            <div
                ref={ref}
                className={twMerge('relative inline-block', className)}
                {...props}
            >
                {/* Trigger */}
                <div ref={triggerRef}>{trigger}</div>

                {/* Menu Portal */}
                {mounted && createPortal(
                    <div
                        ref={menuRef}
                        className={twMerge(
                            dropdownMenuVariants({ variant: 'default' }),
                            dropdownClassName
                        )}
                        style={{
                            position: 'fixed',
                            top: position.top,
                            left: position.left,
                            zIndex: 50,
                            opacity: isClosing ? 0 : 1,
                            transform: `scale(${isClosing ? 0.95 : 1})`,
                            pointerEvents: isClosing ? 'none' : 'auto',
                            ...styles.base as React.CSSProperties,
                        }}
                        data-state={menuState}
                        onClick={(e) => e.stopPropagation()}
                    >
                        {children}
                    </div>,
                    document.body
                )}
            </div>
        );
    }
);

// DropdownMenu Component
const DropdownMenu = React.forwardRef<HTMLDivElement, DropdownMenuProps>(
    ({ className, variant, align, children, sx, ...props }, ref) => {
        // Generate unique class name for custom styles
        const menuClassName = `menu-${Math.random().toString(36).slice(2, 11)}`;

        // Convert sx prop to style object
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
                {/* Style tag for custom styles */}
                {sx && Object.keys(styles.pseudo).length > 0 && (
                    <style>
                        {`
                            .${menuClassName} {
                                transition: all 200ms cubic-bezier(0.4, 0, 0.2, 1);
                            }
                            ${Object.entries(styles.pseudo)
                                .map(([selector, rules]) => `
                                    .${menuClassName}${selector.slice(1)} {
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
                        dropdownMenuVariants({ variant, align }),
                        menuClassName,
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

// DropdownItem Component
const DropdownItem = React.forwardRef<HTMLButtonElement, DropdownItemProps>(
    ({ className, variant, inset, disabled, icon, children, ...props }, ref) => (
        <button
            ref={ref}
            className={twMerge(dropdownItemVariants({ variant, inset }), className)}
            disabled={disabled}
            type="button"
            {...props}
        >
            {icon && (
                <span className="mr-2 h-4 w-4">
                    {icon}
                </span>
            )}
            {children}
        </button>
    )
);

// Display names
Dropdown.displayName = 'Dropdown';
DropdownMenu.displayName = 'DropdownMenu';
DropdownItem.displayName = 'DropdownItem';

export { Dropdown, DropdownMenu, DropdownItem, dropdownMenuVariants, dropdownItemVariants }; 