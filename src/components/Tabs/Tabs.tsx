import React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { twMerge } from 'tailwind-merge';
import { transitionClasses } from '../../styles/base';

const tabsVariants = cva(
    [
        'flex flex-col',
    ],
    {
        variants: {
            variant: {
                default: '',
                pills: '',
                underline: '',
            },
            size: {
                sm: '',
                md: '',
                lg: '',
            },
        },
        defaultVariants: {
            variant: 'default',
            size: 'md',
        },
    }
);

const tabListVariants = cva(
    [
        'flex',
        'relative',
    ],
    {
        variants: {
            variant: {
                default: [
                    'bg-slate-100 rounded-lg p-1',
                    'dark:bg-slate-800',
                ],
                pills: [
                    'gap-2',
                ],
                underline: [
                    'border-b border-slate-200',
                    'dark:border-slate-700',
                ],
            },
            size: {
                sm: 'gap-1',
                md: 'gap-2',
                lg: 'gap-3',
            },
        },
        defaultVariants: {
            variant: 'default',
            size: 'md',
        },
    }
);

const tabTriggerVariants = cva(
    [
        'flex items-center justify-center',
        'font-medium',
        'transition-all duration-200',
        'focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2',
        'disabled:opacity-50 disabled:cursor-not-allowed',
        ...transitionClasses,
    ],
    {
        variants: {
            variant: {
                default: [
                    'rounded-md px-4',
                    'text-slate-600 hover:text-slate-900',
                    'data-[state=active]:bg-white data-[state=active]:text-slate-900 data-[state=active]:shadow-sm',
                    'dark:text-slate-400 dark:hover:text-white',
                    'dark:data-[state=active]:bg-slate-900 dark:data-[state=active]:text-white',
                ],
                pills: [
                    'rounded-full px-4',
                    'text-slate-600 hover:text-slate-900 hover:bg-slate-100',
                    'data-[state=active]:bg-primary-100 data-[state=active]:text-primary-900',
                    'dark:text-slate-400 dark:hover:text-white dark:hover:bg-slate-800',
                    'dark:data-[state=active]:bg-primary-900/10 dark:data-[state=active]:text-primary-400',
                ],
                underline: [
                    'px-4 py-2 -mb-px',
                    'text-slate-600 hover:text-slate-900',
                    'data-[state=active]:text-primary-600 data-[state=active]:border-b-2 data-[state=active]:border-primary-500',
                    'dark:text-slate-400 dark:hover:text-white',
                    'dark:data-[state=active]:text-primary-400 dark:data-[state=active]:border-primary-400',
                ],
            },
            size: {
                sm: 'h-8 text-sm',
                md: 'h-10 text-base',
                lg: 'h-12 text-lg',
            },
        },
        defaultVariants: {
            variant: 'default',
            size: 'md',
        },
    }
);

const tabContentVariants = cva(
    [
        'mt-4',
        'focus:outline-none',
    ],
    {
        variants: {
            variant: {
                default: '',
                pills: '',
                underline: '',
            },
        },
        defaultVariants: {
            variant: 'default',
        },
    }
);

type CSSPropertiesWithPseudos = React.CSSProperties & {
    [K in `&:${string}`]?: React.CSSProperties;
};

export interface TabItem {
    /** Label for the tab */
    label: string;
    /** Content of the tab */
    content: React.ReactNode;
    /** Whether the tab is disabled */
    disabled?: boolean;
    /** Icon to display before the label */
    icon?: React.ReactNode;
}

export interface TabsProps
    extends Omit<React.HTMLAttributes<HTMLDivElement>, 'onChange'>,
    VariantProps<typeof tabsVariants> {
    /** Array of tab items */
    items: TabItem[];
    /** Active tab index */
    activeTab?: number;
    /** Callback when tab changes */
    onChange?: (index: number) => void;
    /** Custom styles using the sx prop */
    sx?: CSSPropertiesWithPseudos;
}

export const Tabs = React.forwardRef<HTMLDivElement, TabsProps>(
    ({
        className,
        variant,
        size,
        items,
        activeTab = 0,
        onChange,
        sx,
        ...props
    }, ref) => {
        const [selectedTab, setSelectedTab] = React.useState(activeTab);

        React.useEffect(() => {
            setSelectedTab(activeTab);
        }, [activeTab]);

        const handleChange = (index: number) => {
            setSelectedTab(index);
            onChange?.(index);
        };

        // Generate unique class name for custom styles
        const tabsClassName = `tabs-${Math.random().toString(36).slice(2, 11)}`;

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
                            .${tabsClassName} {
                                transition: all 300ms cubic-bezier(0.4, 0, 0.2, 1);
                            }
                            ${Object.entries(styles.pseudo)
                                .map(([selector, rules]) => `
                                    .${tabsClassName}${selector.slice(1)} {
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
                    className={twMerge(tabsVariants({ variant, size }), tabsClassName, className)}
                    style={styles.base as React.CSSProperties}
                    {...props}
                >
                    <div
                        role="tablist"
                        className={tabListVariants({ variant, size })}
                    >
                        {items.map((item, index) => (
                            <button
                                key={index}
                                role="tab"
                                type="button"
                                className={tabTriggerVariants({ variant, size })}
                                onClick={() => !item.disabled && handleChange(index)}
                                disabled={item.disabled}
                                aria-selected={selectedTab === index}
                                aria-controls={`tab-panel-${index}`}
                                data-state={selectedTab === index ? 'active' : 'inactive'}
                            >
                                {item.icon && (
                                    <span className="mr-2">{item.icon}</span>
                                )}
                                {item.label}
                            </button>
                        ))}
                    </div>
                    <div
                        role="tabpanel"
                        id={`tab-panel-${selectedTab}`}
                        aria-labelledby={`tab-${selectedTab}`}
                        className={tabContentVariants({ variant })}
                        tabIndex={0}
                    >
                        {items[selectedTab]?.content}
                    </div>
                </div>
            </>
        );
    }
);

Tabs.displayName = 'Tabs'; 