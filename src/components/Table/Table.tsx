import React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { twMerge } from 'tailwind-merge';
import { transitionClasses } from '../../styles/base';

// Sort icons
const SortUpIcon = () => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        width="12"
        height="12"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
    >
        <path d="M18 15l-6-6-6 6" />
    </svg>
);

const SortDownIcon = () => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        width="12"
        height="12"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
    >
        <path d="M6 9l6 6 6-6" />
    </svg>
);

const tableVariants = cva(
    [
        'w-full',
        'border-collapse',
        'text-sm',
        'ring-offset-background',
        'outline-none',
        'bg-white dark:bg-gray-800',
        'text-gray-900 dark:text-gray-100',
        ...transitionClasses,
    ],
    {
        variants: {
            variant: {
                default: [
                    'border-separate border-spacing-0',
                ],
                bordered: [
                    'border border-gray-200 dark:border-gray-700',
                ],
                striped: [
                    '[&_tbody_tr:nth-child(even)]:bg-gray-50/50',
                    'dark:[&_tbody_tr:nth-child(even)]:bg-gray-700/50',
                ],
            },
            hover: {
                true: [
                    '[&_tbody_tr:hover]:bg-gray-50/70',
                    'dark:[&_tbody_tr:hover]:bg-gray-700/70',
                ],
                false: '',
            },
        },
        defaultVariants: {
            variant: 'default',
            hover: true,
        },
    }
);

const cellVariants = cva(
    [
        'transition-colors',
        'p-4',
        'text-gray-900 dark:text-gray-100',
    ],
    {
        variants: {
            variant: {
                default: [
                    'border-b border-gray-200 dark:border-gray-700',
                ],
                bordered: [
                    'border border-gray-200 dark:border-gray-700',
                ],
                striped: [
                    'border-b border-gray-200 dark:border-gray-700',
                ],
            },
            align: {
                left: 'text-left',
                center: 'text-center',
                right: 'text-right',
            },
        },
        defaultVariants: {
            variant: 'default',
            align: 'left',
        },
    }
);

type NestedCSSProperties = {
    [K: string]: string | number | NestedCSSProperties;
};

type CSSPropertiesWithPseudos = {
    [K: string]: string | number | NestedCSSProperties;
} & {
    [K in `&:${string}`]?: {
        [P: string]: string | number | NestedCSSProperties;
    };
};

export interface Column<T> {
    key: string;
    header: React.ReactNode;
    cell?: (item: T) => React.ReactNode;
    sortable?: boolean;
    align?: 'left' | 'center' | 'right';
}

export interface TableProps<T>
    extends React.TableHTMLAttributes<HTMLTableElement>,
    VariantProps<typeof tableVariants> {
    columns: Column<T>[];
    data: T[];
    onSort?: (key: string, direction: 'asc' | 'desc') => void;
    sortColumn?: string;
    sortDirection?: 'asc' | 'desc';
    sx?: CSSPropertiesWithPseudos;
    stickyHeader?: boolean;
}

function Table<T>({
    className,
    variant,
    hover,
    columns,
    data,
    onSort,
    sortColumn,
    sortDirection,
    sx,
    stickyHeader,
    ...props
}: TableProps<T>) {
    // Generate styles from sx prop
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

        return { base: baseStyles, pseudo: pseudoStyles };
    };

    const styles = generateStyles();
    const tableClassName = `table-${Math.random().toString(36).slice(2, 11)}`;

    const handleSort = (key: string) => {
        if (!onSort) return;
        const newDirection = sortColumn === key && sortDirection === 'asc' ? 'desc' : 'asc';
        onSort(key, newDirection);
    };

    return (
        <>
            {sx && Object.keys(styles.pseudo).length > 0 && (
                <style>
                    {`
                        .${tableClassName} {
                            transition: all 300ms cubic-bezier(0.4, 0, 0.2, 1);
                        }
                        ${Object.entries(styles.pseudo)
                            .map(([selector, rules]) => `
                                .${tableClassName}${selector.slice(1)} {
                                    ${Object.entries(rules)
                                    .map(([prop, value]) => `${prop.replace(/[A-Z]/g, '-$&').toLowerCase()}: ${value}`)
                                    .join(';')}
                                }
                            `)
                            .join('')}
                    `}
                </style>
            )}
            <div className="w-full overflow-x-auto rounded-md bg-white dark:bg-gray-800">
                <table
                    className={twMerge(
                        tableVariants({ variant, hover }),
                        tableClassName,
                        variant === 'striped' && 'divide-y divide-gray-200 dark:divide-gray-700',
                        className
                    )}
                    style={styles.base}
                    {...props}
                >
                    <thead className={twMerge(
                        'bg-gray-50/80 dark:bg-gray-700/80',
                        'text-gray-900 dark:text-gray-100',
                        'border-b border-gray-200 dark:border-gray-700',
                        stickyHeader && 'sticky top-0'
                    )}>
                        <tr>
                            {columns.map((column) => (
                                <th
                                    key={column.key}
                                    className={twMerge(
                                        cellVariants({
                                            variant,
                                            align: column.align,
                                        }),
                                        'font-semibold',
                                        'text-gray-900 dark:text-gray-100',
                                        column.sortable && 'cursor-pointer select-none'
                                    )}
                                    onClick={() => column.sortable && handleSort(column.key)}
                                    scope="col"
                                >
                                    <div className="flex items-center gap-1 justify-between">
                                        <span>{column.header}</span>
                                        {column.sortable && (
                                            <span className="inline-flex flex-col">
                                                <span className={twMerge(
                                                    '-mb-1',
                                                    sortColumn === column.key &&
                                                        sortDirection === 'asc'
                                                        ? 'text-primary-600 dark:text-primary-400'
                                                        : 'text-gray-400 dark:text-gray-500'
                                                )}>
                                                    <SortUpIcon />
                                                </span>
                                                <span className={twMerge(
                                                    sortColumn === column.key &&
                                                        sortDirection === 'desc'
                                                        ? 'text-primary-600 dark:text-primary-400'
                                                        : 'text-gray-400 dark:text-gray-500'
                                                )}>
                                                    <SortDownIcon />
                                                </span>
                                            </span>
                                        )}
                                    </div>
                                </th>
                            ))}
                        </tr>
                    </thead>
                    <tbody className={twMerge(
                        'divide-y divide-gray-200 dark:divide-gray-700',
                        variant === 'striped' && 'divide-y-0',
                    )}>
                        {data.map((row, rowIndex) => (
                            <tr
                                key={rowIndex}
                                className={twMerge(
                                    'text-gray-900 dark:text-gray-100',
                                    hover && 'hover:bg-gray-50/70 dark:hover:bg-gray-700/70',
                                    variant === 'striped' && rowIndex % 2 === 1 && 'bg-gray-50/50 dark:bg-gray-700/50'
                                )}
                            >
                                {columns.map((column) => (
                                    <td
                                        key={column.key}
                                        className={twMerge(
                                            cellVariants({
                                                variant,
                                                align: column.align,
                                            }),
                                            'text-gray-900 dark:text-gray-100'
                                        )}
                                    >
                                        {column.cell
                                            ? column.cell(row)
                                            : (row as any)[column.key]}
                                    </td>
                                ))}
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </>
    );
}

Table.displayName = 'Table';

export { Table, tableVariants, cellVariants }; 