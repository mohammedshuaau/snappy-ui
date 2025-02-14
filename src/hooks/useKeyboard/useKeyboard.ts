import {useCallback, useEffect, useRef} from 'react';

type KeyHandler = (event: KeyboardEvent) => void;

export interface KeyBinding {
    /**
     * Key or keys to listen for
     */
    key: string | string[];
    /**
     * Whether the Alt key is required
     */
    alt?: boolean;
    /**
     * Whether the Ctrl key is required
     */
    ctrl?: boolean;
    /**
     * Whether the Meta key is required
     */
    meta?: boolean;
    /**
     * Whether the Shift key is required
     */
    shift?: boolean;
    /**
     * Handler function to call when the key combination is pressed
     */
    handler: KeyHandler;
}

export interface UseKeyboardOptions {
    /**
     * Target element to attach listeners to (defaults to window)
     */
    target?: HTMLElement | null;
    /**
     * Whether to prevent default behavior
     */
    preventDefault?: boolean;
    /**
     * Whether to stop event propagation
     */
    stopPropagation?: boolean;
    /**
     * Whether the hook is enabled
     */
    enabled?: boolean;
}

/**
 * Hook to handle keyboard shortcuts and key combinations
 * @param bindings Array of key bindings
 * @param options Configuration options
 */
const useKeyboard = (
    bindings: KeyBinding[],
    options: UseKeyboardOptions = {}
) => {
    const {
        target = null,
        preventDefault = true,
        stopPropagation = true,
        enabled = true,
    } = options;

    const handlersRef = useRef(bindings);
    handlersRef.current = bindings;

    const handleKeyDown = useCallback(
        (event: KeyboardEvent) => {
            if (!enabled) return;

            for (const binding of handlersRef.current) {
                const keys = Array.isArray(binding.key) ? binding.key : [binding.key];
                const matchesKey = keys.some(k => k.toLowerCase() === event.key.toLowerCase());
                const matchesModifiers = (
                    (!binding.alt || event.altKey) &&
                    (!binding.ctrl || event.ctrlKey) &&
                    (!binding.meta || event.metaKey) &&
                    (!binding.shift || event.shiftKey)
                );

                if (matchesKey && matchesModifiers) {
                    if (preventDefault) {
                        event.preventDefault();
                    }
                    if (stopPropagation) {
                        event.stopPropagation();
                    }
                    binding.handler(event);
                    return;
                }
            }
        },
        [enabled, preventDefault, stopPropagation]
    );

    useEffect(() => {
        const element = target || window;
        element.addEventListener('keydown', handleKeyDown as EventListener);
        return () => {
            element.removeEventListener('keydown', handleKeyDown as EventListener);
        };
    }, [target, handleKeyDown]);
};

export default useKeyboard; 