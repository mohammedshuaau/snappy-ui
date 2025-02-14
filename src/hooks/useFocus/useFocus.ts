import {useCallback, useRef, useState} from 'react';

export interface UseFocusOptions {
    /**
     * Whether to detect focus within child elements
     */
    within?: boolean;
    /**
     * Whether to trap focus within the element
     */
    trap?: boolean;
    /**
     * Whether the hook is enabled
     */
    enabled?: boolean;
}

/**
 * Hook to track focus state of an element
 * @param options Configuration options
 * @returns [ref, isFocused, setFocus] tuple
 */
const useFocus = <T extends HTMLElement = HTMLElement>(
    options: UseFocusOptions = {}
) => {
    const { within = false, trap = false, enabled = true } = options;
    const [isFocused, setIsFocused] = useState(false);
    const internalRef = useRef<T | null>(null);
    const previousFocusRef = useRef<HTMLElement | null>(null);

    const handleFocus = useCallback(() => {
        if (!enabled) return;
        setIsFocused(true);
    }, [enabled]);

    const handleBlur = useCallback((event: FocusEvent) => {
        if (!enabled) return;
        if (within) {
            const target = event.relatedTarget as HTMLElement;
            if (internalRef.current?.contains(target)) {
                return;
            }
        }
        setIsFocused(false);
    }, [enabled, within]);

    const handleKeyDown = useCallback((event: KeyboardEvent) => {
        if (!enabled || !trap || !internalRef.current) return;

        if (event.key === 'Tab') {
            const focusableElements = internalRef.current.querySelectorAll(
                'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
            );
            const firstFocusable = focusableElements[0] as HTMLElement;
            const lastFocusable = focusableElements[focusableElements.length - 1] as HTMLElement;

            if (event.shiftKey) {
                if (document.activeElement === firstFocusable) {
                    event.preventDefault();
                    lastFocusable.focus();
                }
            } else {
                if (document.activeElement === lastFocusable) {
                    event.preventDefault();
                    firstFocusable.focus();
                }
            }
        }
    }, [enabled, trap]);

    const setFocus = useCallback((focus: boolean) => {
        if (!enabled || !internalRef.current) return;
        if (focus) {
            internalRef.current.focus();
        } else {
            internalRef.current.blur();
        }
    }, [enabled]);

    const callbackRef = useCallback(
        (node: T | null) => {
            if (internalRef.current) {
                internalRef.current.removeEventListener('focus', handleFocus);
                internalRef.current.removeEventListener('blur', handleBlur);
                if (trap) {
                    internalRef.current.removeEventListener('keydown', handleKeyDown);
                }
            }

            internalRef.current = node;

            if (internalRef.current) {
                internalRef.current.addEventListener('focus', handleFocus);
                internalRef.current.addEventListener('blur', handleBlur);
                if (trap) {
                    internalRef.current.addEventListener('keydown', handleKeyDown);
                    previousFocusRef.current = document.activeElement as HTMLElement;
                }
            } else if (trap && previousFocusRef.current) {
                previousFocusRef.current.focus();
            }
        },
        [handleFocus, handleBlur, handleKeyDown, trap]
    );

    return [callbackRef, isFocused, setFocus] as const;
};

export default useFocus; 