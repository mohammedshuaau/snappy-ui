import React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { twMerge } from 'tailwind-merge';
import { transitionClasses } from '../../styles/base';

// Type for sx prop
type CSSPropertiesWithPseudos = React.CSSProperties & {
    [K in `&:${string}`]?: React.CSSProperties;
};

const breadcrumbVariants = cva(
    [
        'flex items-center text-sm',
        ...transitionClasses,
    ],
    {
        variants: {
            variant: {
                default: 'text-slate-600 dark:text-slate-400',
                primary: 'text-primary-600 dark:text-primary-400',
            },
            size: {
                sm: 'text-xs',
                default: 'text-sm',
                lg: 'text-base',
            },
        },
        defaultVariants: {
            variant: 'default',
            size: 'default',
        },
    }
);

const breadcrumbItemVariants = cva(
    [
        'inline-flex items-center',
        'hover:text-slate-900 dark:hover:text-slate-100',
        'transition-colors duration-200',
    ],
    {
        variants: {
            isLast: {
                true: 'font-medium text-slate-900 dark:text-slate-100 cursor-default hover:text-slate-900 dark:hover:text-slate-100',
                false: 'hover:underline cursor-pointer',
            },
        },
        defaultVariants: {
            isLast: false,
        },
    }
);

export interface BreadcrumbItem {
    /** Label to display */
    label: string;
    /** URL for the breadcrumb item */
    href?: string;
    /** Icon to display before the label */
    icon?: React.ReactNode;
    /** Click handler */
    onClick?: () => void;
    /** Additional props to pass to the link component */
    linkProps?: Record<string, any>;
}

export interface BreadcrumbProps
    extends React.HTMLAttributes<HTMLElement>,
    VariantProps<typeof breadcrumbVariants> {
    /** Array of breadcrumb items */
    items: BreadcrumbItem[];
    /** Custom separator between items */
    separator?: React.ReactNode;
    /** Maximum items to show before collapsing */
    maxItems?: number;
    /** Custom styles using the sx prop */
    sx?: CSSPropertiesWithPseudos;
    /** Custom component to use for links */
    linkComponent?: React.ComponentType<any>;
}

export const Breadcrumb = React.forwardRef<HTMLElement, BreadcrumbProps>(
    ({
        items,
        separator = '/',
        maxItems,
        variant,
        size,
        className,
        sx,
        linkComponent: LinkComponent,
        ...props
    }, ref) => {
        const breadcrumbClassName = `breadcrumb-${Math.random().toString(36).slice(2, 11)}`;

        // Convert sx prop to style object
        const generateStyles = () => {
            if (!sx) return { base: {}, pseudo: {} };

            const baseStyles: React.CSSProperties = {};
            const pseudoStyles: { [key: string]: React.CSSProperties } = {};

            Object.entries(sx).forEach(([key, value]) => {
                if (key.startsWith('&')) {
                    pseudoStyles[key] = value as React.CSSProperties;
                } else {
                    (baseStyles as any)[key] = value;
                }
            });

            return {
                base: baseStyles,
                pseudo: pseudoStyles,
            };
        };

        const styles = generateStyles();

        // Handle item collapse
        const renderItems = () => {
            if (!maxItems || items.length <= maxItems) {
                return items;
            }

            const firstItems = items.slice(0, Math.max(1, Math.ceil((maxItems - 1) / 2)));
            const lastItems = items.slice(-(Math.floor((maxItems - 1) / 2)));

            return [
                ...firstItems,
                { label: '...', href: undefined },
                ...lastItems,
            ];
        };

        return (
            <>
                {/* Style tag for custom styles */}
                {sx && Object.keys(styles.pseudo).length > 0 && (
                    <style>
                        {`
                            .${breadcrumbClassName} {
                                transition: all 200ms cubic-bezier(0.4, 0, 0.2, 1);
                            }
                            ${Object.entries(styles.pseudo)
                                .map(([selector, rules]) => `
                                    .${breadcrumbClassName}${selector.slice(1)} {
                                        ${Object.entries(rules)
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
                    aria-label="Breadcrumb"
                    className={twMerge(
                        breadcrumbVariants({ variant, size }),
                        breadcrumbClassName,
                        className
                    )}
                    style={styles.base}
                    {...props}
                >
                    <ol className="flex items-center space-x-2">
                        {renderItems().map((item, index, array) => (
                            <li
                                key={index}
                                className="flex items-center"
                            >
                                {index > 0 && (
                                    <span className="mx-2 text-slate-400 dark:text-slate-600">
                                        {separator}
                                    </span>
                                )}
                                {item.href ? (
                                    LinkComponent ? (
                                        <LinkComponent
                                            href={item.href}
                                            onClick={item.onClick}
                                            className={twMerge(
                                                breadcrumbItemVariants({
                                                    isLast: index === array.length - 1,
                                                })
                                            )}
                                            {...item.linkProps}
                                        >
                                            {item.icon && (
                                                <span className="mr-1.5">{item.icon}</span>
                                            )}
                                            {item.label}
                                        </LinkComponent>
                                    ) : (
                                        <a
                                            href={item.href}
                                            onClick={item.onClick}
                                            className={twMerge(
                                                breadcrumbItemVariants({
                                                    isLast: index === array.length - 1,
                                                })
                                            )}
                                            {...item.linkProps}
                                        >
                                            {item.icon && (
                                                <span className="mr-1.5">{item.icon}</span>
                                            )}
                                            {item.label}
                                        </a>
                                    )
                                ) : (
                                    <span
                                        className={twMerge(
                                            breadcrumbItemVariants({
                                                isLast: index === array.length - 1,
                                            })
                                        )}
                                        onClick={item.onClick}
                                    >
                                        {item.icon && (
                                            <span className="mr-1.5">{item.icon}</span>
                                        )}
                                        {item.label}
                                    </span>
                                )}
                            </li>
                        ))}
                    </ol>
                </nav>
            </>
        );
    }
);

Breadcrumb.displayName = 'Breadcrumb'; 