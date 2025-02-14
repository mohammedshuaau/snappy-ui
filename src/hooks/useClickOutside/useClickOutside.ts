import {useEffect, useRef} from 'react';

type Handler = (event: MouseEvent | TouchEvent) => void;

export interface UseClickOutsideOptions {
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
 * Hook to detect clicks outside of a component
 * @param handler Function to call when a click outside is detected
 * @param options Configuration options
 * @returns Ref to attach to the element
 */
const useClickOutside = <T extends HTMLElement = HTMLElement>(
    handler: Handler,
    options: UseClickOutsideOptions = {}
) => {
    const { enableTouch = true, enabled = true } = options;
    const ref = useRef<T>(null);

    useEffect(() => {
        if (!enabled) return;

        const listener = (event: MouseEvent | TouchEvent) => {
            const el = ref?.current;
            if (!el || el.contains((event?.target as Node) || null)) {
                return;
            }

            handler(event);
        };

        document.addEventListener('mousedown', listener);
        if (enableTouch) {
            document.addEventListener('touchstart', listener);
        }

        return () => {
            document.removeEventListener('mousedown', listener);
            if (enableTouch) {
                document.removeEventListener('touchstart', listener);
            }
        };
    }, [ref, handler, enableTouch, enabled]);

    return ref;
};

export default useClickOutside; 