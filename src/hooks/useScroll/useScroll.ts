import {useCallback, useEffect, useRef, useState} from 'react';

export interface ScrollPosition {
    x: number;
    y: number;
}

export interface ScrollDirection {
    horizontal: 'left' | 'right' | null;
    vertical: 'up' | 'down' | null;
}

export interface UseScrollOptions {
    /**
     * Target element to track (defaults to window)
     */
    target?: HTMLElement | null;
    /**
     * Whether to track scroll direction
     */
    trackDirection?: boolean;
    /**
     * Throttle delay in ms
     */
    throttleDelay?: number;
    /**
     * Whether the hook is enabled
     */
    enabled?: boolean;
}

/**
 * Hook to track scroll position and direction
 * @param options Configuration options
 * @returns [position, direction, scrollTo] tuple
 */
const useScroll = (options: UseScrollOptions = {}) => {
    const {
        target = null,
        trackDirection = true,
        throttleDelay = 100,
        enabled = true,
    } = options;

    const [position, setPosition] = useState<ScrollPosition>({ x: 0, y: 0 });
    const [direction, setDirection] = useState<ScrollDirection>({
        horizontal: null,
        vertical: null,
    });

    const lastPosition = useRef<ScrollPosition>({ x: 0, y: 0 });
    const lastTime = useRef<number>(0);

    const getScrollPosition = useCallback(() => {
        if (target) {
            return {
                x: target.scrollLeft,
                y: target.scrollTop,
            };
        }
        return {
            x: window.pageXOffset,
            y: window.pageYOffset,
        };
    }, [target]);

    const handleScroll = useCallback(() => {
        if (!enabled) return;

        const now = Date.now();
        if (now - lastTime.current < throttleDelay) return;

        const currentPosition = getScrollPosition();
        setPosition(currentPosition);

        if (trackDirection) {
            setDirection({
                horizontal:
                    currentPosition.x > lastPosition.current.x
                        ? 'right'
                        : currentPosition.x < lastPosition.current.x
                        ? 'left'
                        : null,
                vertical:
                    currentPosition.y > lastPosition.current.y
                        ? 'down'
                        : currentPosition.y < lastPosition.current.y
                        ? 'up'
                        : null,
            });
        }

        lastPosition.current = currentPosition;
        lastTime.current = now;
    }, [enabled, trackDirection, throttleDelay, getScrollPosition]);

    const scrollTo = useCallback(
        (x: number, y: number, smooth = true) => {
            if (!enabled) return;

            const element = target || window;
            element.scrollTo({
                left: x,
                top: y,
                behavior: smooth ? 'smooth' : 'auto',
            });
        },
        [enabled, target]
    );

    useEffect(() => {
        const element = target || window;
        element.addEventListener('scroll', handleScroll, { passive: true });
        handleScroll(); // Get initial position

        return () => {
            element.removeEventListener('scroll', handleScroll);
        };
    }, [target, handleScroll]);

    return [position, direction, scrollTo] as const;
};

export default useScroll; 