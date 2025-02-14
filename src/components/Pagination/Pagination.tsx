import React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { twMerge } from 'tailwind-merge';
import { transitionClasses } from '../../styles/base';

const paginationVariants = cva(
    [
        'flex items-center gap-1',
        'text-sm',
    ],
    {
        variants: {
            size: {
                sm: 'gap-1',
                md: 'gap-2',
                lg: 'gap-3',
            },
        },
        defaultVariants: {
            size: 'md',
        },
    }
);

const paginationItemVariants = cva(
    [
        'flex items-center justify-center',
        'rounded-md',
        'transition-colors duration-200',
        'focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2',
        'disabled:opacity-50 disabled:cursor-not-allowed',
        ...transitionClasses,
    ],
    {
        variants: {
            size: {
                sm: 'h-8 w-8 text-sm',
                md: 'h-10 w-10 text-base',
                lg: 'h-12 w-12 text-lg',
            },
            variant: {
                default: [
                    'text-slate-600 hover:text-slate-900',
                    'hover:bg-slate-100',
                    'dark:text-slate-400 dark:hover:text-white',
                    'dark:hover:bg-slate-800',
                ],
                active: [
                    'bg-primary-50 text-primary-600',
                    'hover:bg-primary-100',
                    'dark:bg-primary-900/10 dark:text-primary-400',
                    'dark:hover:bg-primary-900/20',
                ],
                dots: [
                    'text-slate-400 cursor-default',
                    'dark:text-slate-600',
                ],
            },
        },
        defaultVariants: {
            size: 'md',
            variant: 'default',
        },
    }
);

type CSSPropertiesWithPseudos = React.CSSProperties & {
    [K in `&:${string}`]?: React.CSSProperties;
};

export interface PaginationProps
    extends React.HTMLAttributes<HTMLElement>,
    VariantProps<typeof paginationVariants> {
    /** Total number of pages */
    totalPages: number;
    /** Current page number (1-based) */
    currentPage: number;
    /** Callback when page changes */
    onPageChange: (page: number) => void;
    /** Number of pages to show before and after current page */
    siblingCount?: number;
    /** Whether to show first/last page buttons */
    showFirstLast?: boolean;
    /** Whether to show previous/next buttons */
    showPrevNext?: boolean;
    /** Custom styles using the sx prop */
    sx?: CSSPropertiesWithPseudos;
}

export const Pagination = React.forwardRef<HTMLElement, PaginationProps>(
    ({
        className,
        size,
        totalPages,
        currentPage,
        onPageChange,
        siblingCount = 1,
        showFirstLast = true,
        showPrevNext = true,
        sx,
        ...props
    }, ref) => {
        // Generate page numbers to display
        const getPageNumbers = () => {
            // const pageNumbers: (number | string)[] = [];
            const totalNumbers = siblingCount * 2 + 3; // siblings + current + first + last
            const totalBlocks = totalNumbers + 2; // +2 for dots blocks

            if (totalPages <= totalBlocks) {
                return Array.from({ length: totalPages }, (_, i) => i + 1);
            }

            const leftSiblingIndex = Math.max(currentPage - siblingCount, 1);
            const rightSiblingIndex = Math.min(currentPage + siblingCount, totalPages);

            const shouldShowLeftDots = leftSiblingIndex > 2;
            const shouldShowRightDots = rightSiblingIndex < totalPages - 1;

            if (!shouldShowLeftDots && shouldShowRightDots) {
                const leftItemCount = 3 + 2 * siblingCount;
                const leftRange = Array.from({ length: leftItemCount }, (_, i) => i + 1);
                return [...leftRange, '...', totalPages];
            }

            if (shouldShowLeftDots && !shouldShowRightDots) {
                const rightItemCount = 3 + 2 * siblingCount;
                const rightRange = Array.from(
                    { length: rightItemCount },
                    (_, i) => totalPages - rightItemCount + i + 1
                );
                return [1, '...', ...rightRange];
            }

            if (shouldShowLeftDots && shouldShowRightDots) {
                const middleRange = Array.from(
                    { length: rightSiblingIndex - leftSiblingIndex + 1 },
                    (_, i) => leftSiblingIndex + i
                );
                return [1, '...', ...middleRange, '...', totalPages];
            }

            return [];
        };

        // Generate unique class name for custom styles
        const paginationClassName = `pagination-${Math.random().toString(36).slice(2, 11)}`;

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
                            .${paginationClassName} {
                                transition: all 300ms cubic-bezier(0.4, 0, 0.2, 1);
                            }
                            ${Object.entries(styles.pseudo)
                                .map(([selector, rules]) => `
                                    .${paginationClassName}${selector.slice(1)} {
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
                    role="navigation"
                    aria-label="Pagination"
                    className={twMerge(paginationVariants({ size }), paginationClassName, className)}
                    style={styles.base as React.CSSProperties}
                    {...props}
                >
                    {showFirstLast && (
                        <button
                            type="button"
                            className={paginationItemVariants({ size })}
                            onClick={() => onPageChange(1)}
                            disabled={currentPage === 1}
                            aria-label="Go to first page"
                        >
                            <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 19l-7-7 7-7m8 14l-7-7 7-7" />
                            </svg>
                        </button>
                    )}

                    {showPrevNext && (
                        <button
                            type="button"
                            className={paginationItemVariants({ size })}
                            onClick={() => onPageChange(currentPage - 1)}
                            disabled={currentPage === 1}
                            aria-label="Go to previous page"
                        >
                            <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                            </svg>
                        </button>
                    )}

                    {getPageNumbers().map((pageNumber, index) => (
                        <button
                            key={index}
                            type="button"
                            className={paginationItemVariants({
                                size,
                                variant: pageNumber === '...' ? 'dots' : pageNumber === currentPage ? 'active' : 'default',
                            })}
                            onClick={() => pageNumber !== '...' && onPageChange(pageNumber as number)}
                            disabled={pageNumber === '...'}
                            aria-label={pageNumber === '...' ? 'More pages' : `Go to page ${pageNumber}`}
                            aria-current={pageNumber === currentPage ? 'page' : undefined}
                        >
                            {pageNumber}
                        </button>
                    ))}

                    {showPrevNext && (
                        <button
                            type="button"
                            className={paginationItemVariants({ size })}
                            onClick={() => onPageChange(currentPage + 1)}
                            disabled={currentPage === totalPages}
                            aria-label="Go to next page"
                        >
                            <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                            </svg>
                        </button>
                    )}

                    {showFirstLast && (
                        <button
                            type="button"
                            className={paginationItemVariants({ size })}
                            onClick={() => onPageChange(totalPages)}
                            disabled={currentPage === totalPages}
                            aria-label="Go to last page"
                        >
                            <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 5l7 7-7 7M5 5l7 7-7 7" />
                            </svg>
                        </button>
                    )}
                </nav>
            </>
        );
    }
);

Pagination.displayName = 'Pagination'; 