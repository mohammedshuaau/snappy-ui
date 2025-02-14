import React, { useState } from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { twMerge } from 'tailwind-merge';
import DynamicComponent from '../../shared/DynamicComponent';

const sidebarVariants = cva(
    [
        // Base styles
        'flex flex-col',
        'border-r bg-white',
        'transition-all duration-300',
        // Dark mode
        'dark:bg-slate-900 dark:border-slate-800',
    ],
    {
        variants: {
            variant: {
                default: [
                    'border-slate-200',
                    'dark:border-slate-800',
                ],
                floating: [
                    'border shadow-lg',
                    'm-4 rounded-lg',
                    'h-[calc(100vh-2rem)]',
                ],
            },
            collapsed: {
                true: 'w-16',
                false: 'w-64',
            },
        },
        defaultVariants: {
            variant: 'default',
            collapsed: false,
        },
    }
);

const sidebarHeaderVariants = cva(
    [
        'flex items-center justify-between',
        'p-4 h-16',
        'border-b border-slate-200',
        'dark:border-slate-800',
    ],
    {
        variants: {
            collapsed: {
                true: 'justify-center',
                false: 'justify-between',
            },
        },
        defaultVariants: {
            collapsed: false,
        },
    }
);

const sidebarGroupVariants = cva(
    'flex flex-col gap-1',
    {
        variants: {
            collapsed: {
                true: '[&>*]:px-2',
                false: '[&>*]:px-4',
            },
        },
        defaultVariants: {
            collapsed: false,
        },
    }
);

const sidebarItemVariants = cva(
    [
        'flex items-center gap-2 w-full',
        'py-2 rounded-md',
        'text-sm font-medium text-slate-700',
        'transition-colors duration-200',
        'hover:bg-slate-100 hover:text-slate-900',
        'focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2',
        // Active state
        'data-[state=active]:bg-primary-50 data-[state=active]:text-primary-900',
        // Dark mode
        'dark:text-slate-300',
        'dark:hover:bg-slate-800 dark:hover:text-white',
        'dark:data-[state=active]:bg-primary-900/10 dark:data-[state=active]:text-primary-400',
    ],
    {
        variants: {
            collapsed: {
                true: 'justify-center px-2',
                false: 'justify-start px-4',
            },
        },
        defaultVariants: {
            collapsed: false,
        },
    }
);

type CSSPropertiesWithPseudos = React.CSSProperties & {
    [K in `&:${string}`]?: React.CSSProperties;
};

export interface SidebarItem {
    /** Item label */
    label: string;
    /** Item icon */
    icon?: React.ReactNode;
    /** Whether the item is active */
    active?: boolean;
    /** Click handler */
    onClick?: () => void;
    /** Item href */
    href?: string;
}

export interface SidebarGroup {
    /** Group label */
    label?: string;
    /** Group items */
    items: SidebarItem[];
}

export interface SidebarProps
    extends React.HTMLAttributes<HTMLElement>,
    VariantProps<typeof sidebarVariants> {
    /** Brand/logo component */
    brand?: React.ReactNode;
    /** Navigation items or groups */
    items: (SidebarItem | SidebarGroup)[];
    /** Whether the sidebar is collapsible */
    collapsible?: boolean;
    /** Initial collapsed state */
    defaultCollapsed?: boolean;
    /** Custom styles using the sx prop */
    sx?: CSSPropertiesWithPseudos;
}

export interface SidebarHeaderProps
    extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof sidebarHeaderVariants> {
    /** Toggle collapse callback */
    onToggle?: () => void;
}

export interface SidebarGroupProps
    extends Omit<React.HTMLAttributes<HTMLDivElement>, 'title'>,
    VariantProps<typeof sidebarGroupVariants> {
    /** Group label */
    label?: string;
}

export interface SidebarItemProps
    extends React.HTMLAttributes<HTMLAnchorElement>,
    VariantProps<typeof sidebarItemVariants> {
    /** Item icon */
    icon?: React.ReactNode;
    /** Whether the item is active */
    active?: boolean;
    /** Item href */
    href?: string;
}

export const SidebarHeader = React.forwardRef<HTMLDivElement, SidebarHeaderProps>(
    ({ className, collapsed, children, onToggle, ...props }, ref) => (
        <div
            ref={ref}
            className={twMerge(sidebarHeaderVariants({ collapsed }), className)}
            {...props}
        >
            {children}
            {onToggle && (
                <button
                    type="button"
                    className="inline-flex items-center justify-center rounded-md p-2 text-slate-500 hover:bg-slate-100 hover:text-slate-600 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-primary-500 dark:text-slate-400 dark:hover:bg-slate-800 dark:hover:text-slate-300"
                    onClick={onToggle}
                >
                    <span className="sr-only">Toggle sidebar</span>
                    <svg
                        className="h-6 w-6"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth="1.5"
                        stroke="currentColor"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d={collapsed
                                ? "M13 5l7 7-7 7M5 5l7 7-7 7"
                                : "M11 19l-7-7 7-7m8 14l-7-7 7-7"
                            }
                        />
                    </svg>
                </button>
            )}
        </div>
    )
);

export const SidebarGroup = React.forwardRef<HTMLDivElement, SidebarGroupProps>(
    ({ className, collapsed, label, children, ...props }, ref) => (
        <div ref={ref} {...props}>
            {label && !collapsed && (
                <div className="mb-2 px-4 text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                    {label}
                </div>
            )}
            <div className={twMerge(sidebarGroupVariants({ collapsed }), className)}>
                {children}
            </div>
        </div>
    )
);

export const SidebarItem = React.forwardRef<HTMLAnchorElement, SidebarItemProps>(
    ({ className, collapsed, icon, active, children, href, ...props }, ref) => {
        const Component = href ? 'a' : 'button';
        return (
            <DynamicComponent
                as={Component}
                ref={ref}
                href={href}
                className={twMerge(sidebarItemVariants({ collapsed }), className)}
                data-state={active ? 'active' : undefined}
                {...props}
            >
                {icon && (
                    <span className="inline-flex h-5 w-5 items-center justify-center">
                        {icon}
                    </span>
                )}
                {!collapsed && <span>{children}</span>}
                {collapsed && !icon && <span>{(children as string)?.[0]}</span>}
            </DynamicComponent>
        );
    }
);

export const Sidebar = React.forwardRef<HTMLElement, SidebarProps>(
    ({
        className,
        variant,
        brand,
        items,
        collapsible = false,
        defaultCollapsed = false,
        sx,
        ...props
    }, ref) => {
        const [isCollapsed, setIsCollapsed] = useState(defaultCollapsed);

        // Generate unique class name for custom styles
        const sidebarClassName = `sidebar-${Math.random().toString(36).slice(2, 11)}`;

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
                {sx && Object.keys(styles.pseudo).length > 0 && (
                    <style>
                        {`
                            .${sidebarClassName} {
                                transition: all 300ms cubic-bezier(0.4, 0, 0.2, 1);
                            }
                            ${Object.entries(styles.pseudo)
                                .map(([selector, rules]) => `
                                    .${sidebarClassName}${selector.slice(1)} {
                                        ${Object.entries(rules as Record<string, unknown>)
                                        .map(([prop, value]) => `${prop.replace(/[A-Z]/g, '-$&').toLowerCase()}: ${value}`)
                                        .join(';')}
                                    }
                                `)
                                .join('')}
                        `}
                    </style>
                )}
                <aside
                    ref={ref}
                    className={twMerge(sidebarVariants({ variant, collapsed: isCollapsed }), sidebarClassName, className)}
                    style={styles.base as React.CSSProperties}
                    {...props}
                >
                    {brand && (
                        <SidebarHeader
                            collapsed={isCollapsed}
                            onToggle={collapsible ? () => setIsCollapsed(!isCollapsed) : undefined}
                        >
                            {brand}
                        </SidebarHeader>
                    )}
                    <nav className="flex-1 space-y-4 p-4">
                        {items.map((item, index) => {
                            if ('items' in item) {
                                return (
                                    <SidebarGroup
                                        key={item.label || index}
                                        label={item.label}
                                        collapsed={isCollapsed}
                                    >
                                        {item.items.map((groupItem, groupIndex) => (
                                            <SidebarItem
                                                key={groupItem.label || groupIndex}
                                                icon={groupItem.icon}
                                                active={groupItem.active}
                                                href={groupItem.href}
                                                onClick={groupItem.onClick}
                                                collapsed={isCollapsed}
                                            >
                                                {groupItem.label}
                                            </SidebarItem>
                                        ))}
                                    </SidebarGroup>
                                );
                            }
                            return (
                                <SidebarItem
                                    key={item.label || index}
                                    icon={item.icon}
                                    active={item.active}
                                    href={item.href}
                                    onClick={item.onClick}
                                    collapsed={isCollapsed}
                                >
                                    {item.label}
                                </SidebarItem>
                            );
                        })}
                    </nav>
                </aside>
            </>
        );
    }
);

SidebarHeader.displayName = 'SidebarHeader';
SidebarGroup.displayName = 'SidebarGroup';
SidebarItem.displayName = 'SidebarItem';
Sidebar.displayName = 'Sidebar'; 