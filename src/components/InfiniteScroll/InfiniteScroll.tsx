import React, { useEffect, useRef, useCallback } from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { twMerge } from 'tailwind-merge';
import { Loader } from 'lucide-react';

const infiniteScrollVariants = cva(
    'relative',
    {
        variants: {
            variant: {
                default: '',
                contained: 'h-full overflow-y-auto',
            },
        },
        defaultVariants: {
            variant: 'default',
        },
    }
);

export interface InfiniteScrollProps extends VariantProps<typeof infiniteScrollVariants> {
    /**
     * The content to render
     */
    children: React.ReactNode;
    /**
     * Callback to load more items
     */
    onLoadMore: () => Promise<void>;
    /**
     * Whether there are more items to load
     */
    hasMore: boolean;
    /**
     * Whether items are currently being loaded
     */
    isLoading?: boolean;
    /**
     * Any error that occurred during loading
     */
    error?: Error | null;
    /**
     * Distance from the bottom (in pixels) to trigger loading more items
     */
    threshold?: number;
    /**
     * Whether to use window scroll instead of container scroll
     */
    useWindow?: boolean;
    /**
     * Loading indicator element
     */
    loader?: React.ReactNode;
    /**
     * Element to show when there are no more items
     */
    endMessage?: React.ReactNode;
    /**
     * Element to show when an error occurs
     */
    errorMessage?: React.ReactNode;
    /**
     * Custom styles
     */
    sx?: React.CSSProperties;
    /**
     * Additional class names
     */
    className?: string;
}

const InfiniteScroll = React.forwardRef<HTMLDivElement, InfiniteScrollProps>(
    ({
        children,
        onLoadMore,
        hasMore,
        isLoading = false,
        error = null,
        threshold = 250,
        useWindow = true,
        loader = (
            <div className="flex justify-center p-4">
                <Loader className="w-6 h-6 animate-spin text-primary-600" />
            </div>
        ),
        endMessage = (
            <div className="text-center p-4 text-slate-600 dark:text-slate-400">
                No more items to load
            </div>
        ),
        errorMessage = (
            <div className="text-center p-4 text-red-600 dark:text-red-400">
                Error loading items. Please try again.
            </div>
        ),
        variant,
        sx,
        className,
    }, ref) => {
        // Generate unique class name for custom styles
        const scrollClassName = sx ? `infinite-scroll-${Math.random().toString(36).slice(2, 11)}` : '';

        // Ref for the scroll container
        const containerRef = useRef<HTMLDivElement | null>(null);
        const loadingRef = useRef(false);

        const checkShouldLoadMore = useCallback(() => {
            if (!hasMore || isLoading || loadingRef.current || error) return;

            const scrollContainer = useWindow ? window : containerRef.current;
            if (!scrollContainer) return;

            let scrollHeight: number;
            let scrollTop: number;
            let clientHeight: number;

            if (useWindow) {
                scrollHeight = document.documentElement.scrollHeight;
                scrollTop = window.scrollY;
                clientHeight = window.innerHeight;
            } else {
                const container = containerRef.current!;
                scrollHeight = container.scrollHeight;
                scrollTop = container.scrollTop;
                clientHeight = container.clientHeight;
            }

            if (scrollHeight - scrollTop - clientHeight <= threshold) {
                loadingRef.current = true;
                onLoadMore().finally(() => {
                    loadingRef.current = false;
                });
            }
        }, [hasMore, isLoading, error, useWindow, threshold, onLoadMore]);

        useEffect(() => {
            const scrollContainer = useWindow ? window : containerRef.current;
            if (!scrollContainer) return;

            const handleScroll = () => {
                requestAnimationFrame(checkShouldLoadMore);
            };

            scrollContainer.addEventListener('scroll', handleScroll);
            return () => scrollContainer.removeEventListener('scroll', handleScroll);
        }, [useWindow, checkShouldLoadMore]);

        // Initial check in case the content doesn't fill the container
        useEffect(() => {
            checkShouldLoadMore();
        }, [checkShouldLoadMore]);

        return (
            <div
                ref={(node) => {
                    if (typeof ref === 'function') {
                        ref(node);
                    } else if (ref) {
                        ref.current = node;
                    }
                    containerRef.current = node;
                }}
                className={twMerge(
                    infiniteScrollVariants({ variant }),
                    scrollClassName,
                    className
                )}
                role="feed"
                aria-busy={isLoading}
            >
                {sx && (
                    <style>
                        {`
                            .${scrollClassName} {
                                ${Object.entries(sx)
                                .map(([key, value]) => `${key.replace(/[A-Z]/g, '-$&').toLowerCase()}: ${value};`)
                                .join('\n')}
                            }
                        `}
                    </style>
                )}
                {children}
                {isLoading && loader}
                {error && errorMessage}
                {!hasMore && !isLoading && !error && endMessage}
            </div>
        );
    }
);

InfiniteScroll.displayName = 'InfiniteScroll';

export default InfiniteScroll; 