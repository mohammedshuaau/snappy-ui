import {useEffect, useState} from 'react';

export interface UseDebounceOptions {
    /**
     * Delay in milliseconds
     */
    delay?: number;
    /**
     * Whether to update immediately on the first call
     */
    immediate?: boolean;
    /**
     * Whether the hook is enabled
     */
    enabled?: boolean;
}

/**
 * Hook to debounce a value
 * @param value Value to debounce
 * @param options Configuration options
 * @returns Debounced value
 */
const useDebounce = <T>(
    value: T,
    options: UseDebounceOptions = {}
) => {
    const {
        delay = 500,
        immediate = false,
        enabled = true,
    } = options;

    const [debouncedValue, setDebouncedValue] = useState<T>(immediate ? value : undefined as T);

    useEffect(() => {
        if (!enabled) {
            setDebouncedValue(value);
            return;
        }

        if (immediate && debouncedValue === undefined) {
            setDebouncedValue(value);
            return;
        }

        const timer = setTimeout(() => {
            setDebouncedValue(value);
        }, delay);

        return () => {
            clearTimeout(timer);
        };
    }, [value, delay, immediate, enabled, debouncedValue]);

    return debouncedValue;
};

export default useDebounce; 