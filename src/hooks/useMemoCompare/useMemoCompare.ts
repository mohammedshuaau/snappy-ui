import {useEffect, useRef} from 'react';

type CompareFunction<T> = (prev: T | undefined, next: T) => boolean;

/**
 * Hook to memoize a value with custom comparison
 * @param value Value to memoize
 * @param compare Comparison function
 * @returns Memoized value
 */
const useMemoCompare = <T>(
    value: T,
    compare: CompareFunction<T>
): T => {
    const previousRef = useRef<T>();
    const previous = previousRef.current;

    const isEqual = previous !== undefined && compare(previous, value);

    useEffect(() => {
        if (!isEqual) {
            previousRef.current = value;
        }
    });

    return isEqual ? previous : value;
};

export default useMemoCompare;

// Example comparison functions
export const shallowEqual = <T extends { [key: string]: any }>(
    prev: T | undefined,
    next: T
): boolean => {
    if (!prev) return false;
    return Object.keys(prev).every(key => prev[key] === next[key]);
};

export const deepEqual = <T>(prev: T | undefined, next: T): boolean => {
    if (!prev) return false;
    return JSON.stringify(prev) === JSON.stringify(next);
}; 