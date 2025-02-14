import React, { useEffect, useRef, useState, useCallback } from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { twMerge } from 'tailwind-merge';

const virtualListVariants = cva(
    'relative overflow-y-auto',
    {
        variants: {
            variant: {
                default: 'bg-white dark:bg-slate-900',
                contained: 'border border-slate-200 dark:border-slate-700 rounded-lg',
            },
        },
        defaultVariants: {
            variant: 'default',
        },
    }
);

export interface VirtualListProps<T> extends VariantProps<typeof virtualListVariants> {
    /**
     * Array of items to render
     */
    items: T[];
    /**
     * Function to render each item
     */
    renderItem: (item: T, index: number, style: React.CSSProperties) => React.ReactNode;
    /**
     * Height of the container
     */
    height: number;
    /**
     * Fixed height for each item, or a function to calculate dynamic height
     */
    itemHeight: number | ((item: T, index: number) => number);
    /**
     * Number of items to render beyond visible area (overscan)
     */
    overscan?: number;
    /**
     * Whether to use window as scroll container
     */
    useWindow?: boolean;
    /**
     * Custom styles
     */
    sx?: React.CSSProperties;
    /**
     * Additional class names
     */
    className?: string;
}

export function VirtualList<T>({
    items,
    renderItem,
    height,
    itemHeight,
    overscan = 3,
    useWindow = false,
    variant,
    sx,
    className,
}: VirtualListProps<T>) {
    // Generate unique class name for custom styles
    const listClassName = sx ? `virtual-list-${Math.random().toString(36).slice(2, 11)}` : '';

    // Refs
    const containerRef = useRef<HTMLDivElement>(null);
    const heightCache = useRef<Map<number, number>>(new Map());

    // State
    const [scrollTop, setScrollTop] = useState(0);
    const [containerHeight, setContainerHeight] = useState(height);

    // Calculate item positions and total height
    const getItemHeight = useCallback((index: number) => {
        if (typeof itemHeight === 'number') return itemHeight;

        const cached = heightCache.current.get(index);
        if (cached !== undefined) return cached;

        const calculated = itemHeight(items[index], index);
        heightCache.current.set(index, calculated);
        return calculated;
    }, [items, itemHeight]);

    const getItemPosition = useCallback((index: number) => {
        let position = 0;
        for (let i = 0; i < index; i++) {
            position += getItemHeight(i);
        }
        return position;
    }, [getItemHeight]);

    const getTotalHeight = useCallback(() => {
        return items.reduce((total, _, index) => total + getItemHeight(index), 0);
    }, [items, getItemHeight]);

    // Calculate visible range
    const getVisibleRange = useCallback(() => {
        const totalHeight = getTotalHeight();
        if (totalHeight === 0) return { start: 0, end: 0 };

        const viewportTop = scrollTop;
        const viewportBottom = viewportTop + containerHeight;

        let start = 0;
        let position = 0;
        while (position < viewportTop - (overscan * getItemHeight(start))) {
            position += getItemHeight(start);
            start++;
        }

        let end = start;
        while (position < viewportBottom + (overscan * getItemHeight(end)) && end < items.length) {
            position += getItemHeight(end);
            end++;
        }

        return {
            start: Math.max(0, start),
            end: Math.min(items.length, end),
        };
    }, [scrollTop, containerHeight, items, getItemHeight, overscan, getTotalHeight]);

    // Handle scroll
    const handleScroll = useCallback(() => {
        if (!containerRef.current) return;

        const newScrollTop = useWindow
            ? window.scrollY
            : containerRef.current.scrollTop;

        setScrollTop(newScrollTop);
    }, [useWindow]);

    // Set up scroll listener
    useEffect(() => {
        const scrollContainer = useWindow ? window : containerRef.current;
        if (!scrollContainer) return;

        scrollContainer.addEventListener('scroll', handleScroll);
        return () => scrollContainer.removeEventListener('scroll', handleScroll);
    }, [useWindow, handleScroll]);

    // Update container height on resize
    useEffect(() => {
        if (useWindow) {
            setContainerHeight(window.innerHeight);
            const handleResize = () => setContainerHeight(window.innerHeight);
            window.addEventListener('resize', handleResize);
            return () => window.removeEventListener('resize', handleResize);
        } else {
            setContainerHeight(height);
        }
    }, [useWindow, height]);

    // Render visible items
    const { start, end } = getVisibleRange();
    const visibleItems = items.slice(start, end);
    const totalHeight = getTotalHeight();

    return (
        <div
            ref={containerRef}
            className={twMerge(
                virtualListVariants({ variant }),
                listClassName,
                className
            )}
            style={{
                height: useWindow ? '100%' : height,
                position: 'relative',
            }}
            role="list"
        >
            {sx && (
                <style>
                    {`
                        .${listClassName} {
                            ${Object.entries(sx)
                            .map(([key, value]) => `${key.replace(/[A-Z]/g, '-$&').toLowerCase()}: ${value};`)
                            .join('\n')}
                        }
                    `}
                </style>
            )}
            <div
                style={{
                    height: totalHeight,
                    position: 'relative',
                }}
                role="presentation"
            >
                {visibleItems.map((item, index) => {
                    const absoluteIndex = start + index;
                    const top = getItemPosition(absoluteIndex);

                    return renderItem(item, absoluteIndex, {
                        position: 'absolute',
                        top,
                        left: 0,
                        width: '100%',
                        height: getItemHeight(absoluteIndex),
                    });
                })}
            </div>
        </div>
    );
}

VirtualList.displayName = 'VirtualList';