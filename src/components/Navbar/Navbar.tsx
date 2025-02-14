import React, { useState } from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { twMerge } from 'tailwind-merge';
import DynamicComponent from '../../shared/DynamicComponent';

const navbarVariants = cva(
    [
        // Base styles
        'relative w-full border-b bg-white',
        'transition-all',
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
                    'border-none shadow-lg',
                    'm-4 rounded-lg',
                    'max-w-[calc(100%-2rem)]',
                ],
            },
            sticky: {
                true: 'sticky top-0 z-40',
            },
            size: {
                sm: 'h-12',
                md: 'h-16',
                lg: 'h-20',
            },
        },
        defaultVariants: {
            variant: 'default',
            sticky: false,
            size: 'md',
        },
    }
);

const navbarContentVariants = cva(
    [
        'flex h-full w-full items-center px-4',
        'mx-auto max-w-7xl',
        'gap-4',
    ],
    {
        variants: {
            size: {
                sm: 'gap-2',
                md: 'gap-4',
                lg: 'gap-6',
            },
        },
        defaultVariants: {
            size: 'md',
        },
    }
);

const navbarSectionVariants = cva('flex items-center', {
    variants: {
        position: {
            start: 'mr-auto',
            center: 'mx-auto',
            end: 'ml-auto',
        },
    },
    defaultVariants: {
        position: 'start',
    },
});

type CSSPropertiesWithPseudos = React.CSSProperties & {
    [K in `&:${string}`]?: React.CSSProperties;
};

export interface NavbarProps
    extends React.HTMLAttributes<HTMLElement>,
    VariantProps<typeof navbarVariants> {
    /** Brand/logo component */
    brand?: React.ReactNode;
    /** Content for the center section */
    center?: React.ReactNode;
    /** Content for the end section */
    end?: React.ReactNode;
    /** Whether to collapse on mobile */
    collapsible?: boolean;
    /** Initial collapsed state */
    defaultCollapsed?: boolean;
    /** Custom styles using the sx prop */
    sx?: CSSPropertiesWithPseudos;
    /** Maximum width for the content */
    maxWidth?: string | number;
}

export interface NavbarBrandProps extends React.HTMLAttributes<HTMLDivElement | HTMLAnchorElement> {
    /** Whether the brand is a link */
    href?: string;
}

export const NavbarBrand = React.forwardRef<HTMLDivElement | HTMLAnchorElement, NavbarBrandProps>(
    ({ className, children, href, ...props }, ref) => {
        const Component = href ? 'a' : 'div';
        const elementProps = href ? { href, ...props } : props;

        return (
            <DynamicComponent
                as={Component}
                ref={ref}
                className={twMerge('flex items-center gap-2', className)}
                {...elementProps}
            >
                {children}
            </DynamicComponent>
        );
    }
);

export interface NavbarContentProps
    extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof navbarContentVariants> { }

export interface NavbarSectionProps
    extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof navbarSectionVariants> { }

export const NavbarContent = React.forwardRef<HTMLDivElement, NavbarContentProps>(
    ({ className, size, children, ...props }, ref) => (
        <div
            ref={ref}
            className={twMerge(navbarContentVariants({ size }), className)}
            {...props}
        >
            {children}
        </div>
    )
);

export const NavbarSection = React.forwardRef<HTMLDivElement, NavbarSectionProps>(
    ({ className, position, children, ...props }, ref) => (
        <div
            ref={ref}
            className={twMerge(navbarSectionVariants({ position }), className)}
            {...props}
        >
            {children}
        </div>
    )
);

export const Navbar = React.forwardRef<HTMLElement, NavbarProps>(
    ({
        className,
        variant,
        sticky,
        size,
        brand,
        center,
        end,
        collapsible = false,
        defaultCollapsed = true,
        sx,
        maxWidth,
        children,
        ...props
    }, ref) => {
        const [isCollapsed, setIsCollapsed] = useState(defaultCollapsed);

        // Generate unique class name for custom styles
        const navbarClassName = `navbar-${Math.random().toString(36).slice(2, 11)}`;

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
                            .${navbarClassName} {
                                transition: all 200ms cubic-bezier(0.4, 0, 0.2, 1);
                            }
                            ${Object.entries(styles.pseudo)
                                .map(([selector, rules]) => `
                                    .${navbarClassName}${selector.slice(1)} {
                                        ${Object.entries(rules as Record<string, unknown>)
                                        .map(([prop, value]) => `${prop.replace(/[A-Z]/g, '-$&').toLowerCase()}: ${value}`)
                                        .join(';')}
                                    }
                                `)
                                .join('')}
                        `}
                    </style>
                )}
                <nav
                    ref={ref}
                    className={twMerge(navbarVariants({ variant, sticky, size }), navbarClassName, className)}
                    style={{
                        ...styles.base,
                        ...(maxWidth ? { '--navbar-max-width': typeof maxWidth === 'number' ? `${maxWidth}px` : maxWidth } : {}),
                    } as React.CSSProperties}
                    {...props}
                >
                    <NavbarContent size={size}>
                        {brand && (
                            <NavbarSection position="start">
                                {brand}
                            </NavbarSection>
                        )}
                        {center && (
                            <NavbarSection position="center" className={collapsible ? 'hidden md:flex' : undefined}>
                                {center}
                            </NavbarSection>
                        )}
                        {end && (
                            <NavbarSection position="end" className={collapsible ? 'hidden md:flex' : undefined}>
                                {end}
                            </NavbarSection>
                        )}
                        {collapsible && (center || end) && (
                            <NavbarSection position="end" className="md:hidden">
                                <button
                                    type="button"
                                    className="inline-flex items-center justify-center rounded-md p-2 text-slate-700 hover:bg-slate-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-primary-500 dark:text-slate-200 dark:hover:bg-slate-800"
                                    onClick={() => setIsCollapsed(!isCollapsed)}
                                    aria-expanded={!isCollapsed}
                                >
                                    <span className="sr-only">Toggle navigation</span>
                                    <svg
                                        className="h-6 w-6"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        strokeWidth="1.5"
                                        stroke="currentColor"
                                    >
                                        {isCollapsed ? (
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
                                            />
                                        ) : (
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                d="M6 18L18 6M6 6l12 12"
                                            />
                                        )}
                                    </svg>
                                </button>
                            </NavbarSection>
                        )}
                        {children}
                    </NavbarContent>
                    {collapsible && (center || end) && (
                        <div
                            className={twMerge(
                                'overflow-hidden transition-[height] duration-200 md:hidden',
                                isCollapsed ? 'h-0' : 'h-auto border-t border-slate-200 dark:border-slate-800'
                            )}
                        >
                            {center && (
                                <div className="p-4">
                                    {center}
                                </div>
                            )}
                            {end && (
                                <div className="p-4">
                                    {end}
                                </div>
                            )}
                        </div>
                    )}
                </nav>
            </>
        );
    }
);

NavbarBrand.displayName = 'NavbarBrand';
NavbarContent.displayName = 'NavbarContent';
NavbarSection.displayName = 'NavbarSection';
Navbar.displayName = 'Navbar'; 