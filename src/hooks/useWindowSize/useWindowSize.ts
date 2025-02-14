import {useCallback, useEffect, useState} from 'react';

export interface WindowSize {
    width: number;
    height: number;
}

export interface UseWindowSizeOptions {
    /**
     * Debounce delay in milliseconds
     */
    debounceDelay?: number;
    /**
     * Whether to include scrollbar width in calculations
     */
    includeScrollbar?: boolean;
    /**
     * Whether the hook is enabled
     */
    enabled?: boolean;
}

/**
 * Hook to track window dimensions
 * @param options Configuration options
 * @returns Window dimensions
 */
const useWindowSize = (options: UseWindowSizeOptions = {}) => {
    const {
        debounceDelay = 100,
        includeScrollbar = false,
        enabled = true,
    } = options;

    const getSize = useCallback((): WindowSize => ({
        width: includeScrollbar
            ? window.innerWidth
            : document.documentElement.clientWidth,
        height: includeScrollbar
            ? window.innerHeight
            : document.documentElement.clientHeight,
    }), [includeScrollbar]);

    const [windowSize, setWindowSize] = useState<WindowSize>(getSize);

    useEffect(() => {
        if (!enabled) return;

        let timeoutId: number;

        const handleResize = () => {
            if (timeoutId) {
                window.clearTimeout(timeoutId);
            }

            timeoutId = window.setTimeout(() => {
                setWindowSize(getSize());
            }, debounceDelay);
        };

        window.addEventListener('resize', handleResize);
        // Update size if it changed during mount (e.g., due to scrollbar)
        handleResize();

        return () => {
            if (timeoutId) {
                window.clearTimeout(timeoutId);
            }
            window.removeEventListener('resize', handleResize);
        };
    }, [enabled, debounceDelay, getSize]);

    return windowSize;
};

export default useWindowSize; 