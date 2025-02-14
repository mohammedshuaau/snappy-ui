import {useCallback, useRef, useState} from 'react';

export interface UseHoverOptions {
    /**
     * Delay before hover state changes (in ms)
     */
    delay?: number;
    /**
     * Whether to enable touch events
     */
    enableTouch?: boolean;
    /**
     * Whether the hook is enabled
     */
    enabled?: boolean;
}

/**
 * Hook to track hover state of an element
 * @param options Configuration options
 * @returns [ref, isHovered] tuple
 */
const useHover = <T extends HTMLElement = HTMLElement>(
    options: UseHoverOptions = {}
) => {
    const { delay = 0, enableTouch = true, enabled = true } = options;
    const [isHovered, setIsHovered] = useState(false);
    const ref = useRef<T>(null);
    const timeoutRef = useRef<number>();
    const internalRef = useRef<T | null>(null);

    const handleMouseEnter = useCallback(() => {
        if (!enabled) return;
        if (delay) {
            timeoutRef.current = window.setTimeout(() => {
                setIsHovered(true);
            }, delay);
        } else {
            setIsHovered(true);
        }
    }, [delay, enabled]);

    const handleMouseLeave = useCallback(() => {
        if (!enabled) return;
        if (timeoutRef.current) {
            clearTimeout(timeoutRef.current);
        }
        setIsHovered(false);
    }, [enabled]);

    const handleTouchStart = useCallback(() => {
        if (!enabled || !enableTouch) return;
        setIsHovered(true);
    }, [enableTouch, enabled]);

    const handleTouchEnd = useCallback(() => {
        if (!enabled || !enableTouch) return;
        setIsHovered(false);
    }, [enableTouch, enabled]);

    const callbackRef = useCallback(
        (node: T | null) => {
            if (ref.current) {
                ref.current.removeEventListener('mouseenter', handleMouseEnter);
                ref.current.removeEventListener('mouseleave', handleMouseLeave);
                if (enableTouch) {
                    ref.current.removeEventListener('touchstart', handleTouchStart);
                    ref.current.removeEventListener('touchend', handleTouchEnd);
                }
            }

            internalRef.current = node;

            if (internalRef.current) {
                internalRef.current.addEventListener('mouseenter', handleMouseEnter);
                internalRef.current.addEventListener('mouseleave', handleMouseLeave);
                if (enableTouch) {
                    internalRef.current.addEventListener('touchstart', handleTouchStart);
                    internalRef.current.addEventListener('touchend', handleTouchEnd);
                }
            }
        },
        [handleMouseEnter, handleMouseLeave, handleTouchStart, handleTouchEnd, enableTouch]
    );

    return [callbackRef, isHovered] as const;
};

export default useHover; 