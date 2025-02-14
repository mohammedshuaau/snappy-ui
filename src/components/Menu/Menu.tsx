import React, { useCallback, useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { cva, type VariantProps } from 'class-variance-authority';
import { twMerge } from 'tailwind-merge';

// Menu variants
const menuVariants = cva(
    [
        // Base styles
        'z-50 min-w-[8rem] overflow-hidden rounded-md border border-slate-200 bg-white p-1 shadow-lg',
        // Animation
        'origin-top-left',
        'transition-[transform,opacity] duration-200',
        'data-[state=open]:opacity-100 data-[state=open]:scale-100',
        'data-[state=closed]:opacity-0 data-[state=closed]:scale-95',
        // Dark mode
        'dark:border-slate-800 dark:bg-slate-900',
    ],
    {
        variants: {
            variant: {
                default: [
                    'bg-white text-slate-950',
                    'dark:bg-slate-900 dark:text-slate-50',
                ],
                destructive: [
                    'bg-red-50 text-red-900',
                    'dark:bg-red-950 dark:text-red-50',
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

// Menu item variants
const menuItemVariants = cva(
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

export interface MenuItem {
    /** Label for the menu item */
    label: string;
    /** Icon to display before the label */
    icon?: React.ReactNode;
    /** Whether the item is disabled */
    disabled?: boolean;
    /** Whether the item is destructive */
    destructive?: boolean;
    /** Click handler */
    onClick?: () => void;
    /** Keyboard shortcut */
    shortcut?: string;
}

export interface MenuProps extends React.HTMLAttributes<HTMLDivElement>, VariantProps<typeof menuVariants> {
    /** Array of menu items */
    items: MenuItem[];
    /** Whether the menu is open */
    open?: boolean;
    /** Callback when the menu should close */
    onClose?: () => void;
    /** Custom styles using the sx prop */
    sx?: CSSPropertiesWithPseudos;
    /** Reference element to position the menu */
    anchorEl?: HTMLElement | null;
    /** Custom position for context menus */
    position?: { x: number; y: number };
}

export const Menu = React.forwardRef<HTMLDivElement, MenuProps>(
    ({ className, variant, items, open = false, onClose, sx, anchorEl, position, align, ...props }, ref) => {
        const [mounted, setMounted] = useState(false);
        const [isClosing, setIsClosing] = useState(false);
        const menuRef = useRef<HTMLDivElement>(null);
        const [menuPosition, setMenuPosition] = useState({ top: 0, left: 0 });
        const [activeIndex, setActiveIndex] = useState<number>(-1);
        const closeTimer = useRef<number>();

        // Handle mounting and unmounting
        useEffect(() => {
            if (open) {
                clearTimeout(closeTimer.current);
                setMounted(true);
                setIsClosing(false);
                // Calculate position when opening
                if (anchorEl) {
                    const rect = anchorEl.getBoundingClientRect();
                    setMenuPosition({
                        top: rect.bottom + window.scrollY,
                        left: rect.left + window.scrollX,
                    });
                } else if (position) {
                    setMenuPosition({
                        top: position.y,
                        left: position.x,
                    });
                }
            } else if (mounted) {
                setIsClosing(true);
                closeTimer.current = window.setTimeout(() => {
                    setMounted(false);
                    setIsClosing(false);
                }, 200); // Match the duration in the CSS
            }

            return () => {
                clearTimeout(closeTimer.current);
            };
        }, [open, anchorEl, position]);

        // Handle click outside
        useEffect(() => {
            const handleClickOutside = (event: MouseEvent) => {
                if (
                    open &&
                    menuRef.current &&
                    !menuRef.current.contains(event.target as Node) &&
                    (!anchorEl || !anchorEl.contains(event.target as Node))
                ) {
                    onClose?.();
                }
            };

            document.addEventListener('mousedown', handleClickOutside);
            return () => document.removeEventListener('mousedown', handleClickOutside);
        }, [open, onClose, anchorEl]);

        // Handle keyboard navigation
        const handleKeyDown = useCallback((event: KeyboardEvent) => {
            if (!open) return;

            switch (event.key) {
                case 'ArrowDown':
                    event.preventDefault();
                    setActiveIndex(prev => (prev + 1) % items.length);
                    break;
                case 'ArrowUp':
                    event.preventDefault();
                    setActiveIndex(prev => (prev - 1 + items.length) % items.length);
                    break;
                case 'Enter':
                case ' ':
                    event.preventDefault();
                    if (activeIndex >= 0 && items[activeIndex].onClick) {
                        items[activeIndex].onClick();
                        onClose?.();
                    }
                    break;
                case 'Escape':
                    event.preventDefault();
                    onClose?.();
                    break;
            }
        }, [open, items, activeIndex, onClose]);

        useEffect(() => {
            document.addEventListener('keydown', handleKeyDown);
            return () => document.removeEventListener('keydown', handleKeyDown);
        }, [handleKeyDown]);

        // Update position on scroll and resize
        useEffect(() => {
            const updatePosition = () => {
                if (anchorEl && open) {
                    const rect = anchorEl.getBoundingClientRect();
                    setMenuPosition({
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
        }, [open, anchorEl]);

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

        if (!mounted) return null;

        return createPortal(
            <>
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
                    ref={mergeRefs([ref, menuRef])}
                    className={twMerge(
                        menuVariants({ variant, align }),
                        menuClassName,
                        className
                    )}
                    style={{
                        ...styles.base,
                        position: 'fixed',
                        ...menuPosition,
                    }}
                    data-state={isClosing ? 'closed' : 'open'}
                    role="menu"
                    aria-orientation="vertical"
                    {...props}
                >
                    {items.map((item, index) => (
                        <div
                            key={item.label}
                            className={menuItemVariants({
                                variant: item.destructive ? 'destructive' : 'default',
                                inset: Boolean(item.icon),
                            })}
                            role="menuitem"
                            tabIndex={-1}
                            data-highlighted={index === activeIndex}
                            data-disabled={item.disabled}
                            onClick={() => {
                                if (!item.disabled && item.onClick) {
                                    item.onClick();
                                    onClose?.();
                                }
                            }}
                        >
                            {item.icon && (
                                <span className="absolute left-2 h-4 w-4">
                                    {item.icon}
                                </span>
                            )}
                            {item.label}
                            {item.shortcut && (
                                <span className="ml-auto pl-4 text-xs tracking-widest text-slate-500 dark:text-slate-400">
                                    {item.shortcut}
                                </span>
                            )}
                        </div>
                    ))}
                </div>
            </>,
            document.body
        );
    }
);

Menu.displayName = 'Menu';

// Helper function to merge refs
function mergeRefs<T>(refs: Array<React.Ref<T>>): React.RefCallback<T> {
    return (value: T | null) => {
        refs.forEach((ref) => {
            if (typeof ref === 'function') {
                ref(value);
            } else if (ref != null) {
                (ref as React.MutableRefObject<T | null>).current = value;
            }
        });
    };
} 