import {useCallback, useRef} from 'react';

let globalId = 0;

export interface UseIdOptions {
    /**
     * Prefix for the generated ID
     */
    prefix?: string;
    /**
     * Whether to use a random ID instead of sequential
     */
    random?: boolean;
}

/**
 * Hook to generate unique IDs
 * @param options Configuration options
 * @returns Function to generate unique IDs
 */
const useId = (options: UseIdOptions = {}) => {
    const { prefix = '', random = false } = options;
    const idCounterRef = useRef(0);

    const generateId = useCallback(() => {
        if (random) {
            const randomId = Math.random().toString(36).slice(2, 11);
            return prefix ? `${prefix}-${randomId}` : randomId;
        }

        if (typeof window === 'undefined') {
            // For SSR, use a counter per instance
            idCounterRef.current += 1;
            return prefix ? `${prefix}-${idCounterRef.current}` : `${idCounterRef.current}`;
        }

        // For client-side, use a global counter
        globalId += 1;
        return prefix ? `${prefix}-${globalId}` : `${globalId}`;
    }, [prefix, random]);

    return generateId;
};

export default useId; 