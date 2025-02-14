import {act, render} from '@testing-library/react';
import useWindowSize from './useWindowSize';

describe('useWindowSize', () => {
    const originalInnerWidth = window.innerWidth;
    const originalInnerHeight = window.innerHeight;
    const originalClientWidth = document.documentElement.clientWidth;
    const originalClientHeight = document.documentElement.clientHeight;

    beforeEach(() => {
        // Mock window dimensions
        Object.defineProperty(window, 'innerWidth', {
            writable: true,
            configurable: true,
            value: 1024,
        });
        Object.defineProperty(window, 'innerHeight', {
            writable: true,
            configurable: true,
            value: 768,
        });

        // Mock document dimensions (without scrollbar)
        Object.defineProperty(document.documentElement, 'clientWidth', {
            writable: true,
            configurable: true,
            value: 1008, // 1024 - 16 (typical scrollbar width)
        });
        Object.defineProperty(document.documentElement, 'clientHeight', {
            writable: true,
            configurable: true,
            value: 752, // 768 - 16 (typical scrollbar width)
        });

        // Mock timers for debounce
        vi.useFakeTimers();
    });

    afterEach(() => {
        // Restore original dimensions
        Object.defineProperty(window, 'innerWidth', {
            writable: true,
            configurable: true,
            value: originalInnerWidth,
        });
        Object.defineProperty(window, 'innerHeight', {
            writable: true,
            configurable: true,
            value: originalInnerHeight,
        });
        Object.defineProperty(document.documentElement, 'clientWidth', {
            writable: true,
            configurable: true,
            value: originalClientWidth,
        });
        Object.defineProperty(document.documentElement, 'clientHeight', {
            writable: true,
            configurable: true,
            value: originalClientHeight,
        });

        vi.useRealTimers();
        vi.restoreAllMocks();
    });

    it('returns initial window size without scrollbar', () => {
        let size: { width: number; height: number } | undefined;
        const TestComponent = () => {
            size = useWindowSize();
            return null;
        };

        render(<TestComponent />);

        expect(size).toEqual({
            width: 1008,
            height: 752,
        });
    });

    it('returns window size with scrollbar when includeScrollbar is true', () => {
        let size: { width: number; height: number } | undefined;
        const TestComponent = () => {
            size = useWindowSize({ includeScrollbar: true });
            return null;
        };

        render(<TestComponent />);

        expect(size).toEqual({
            width: 1024,
            height: 768,
        });
    });

    it('updates size on window resize with debounce', () => {
        let size: { width: number; height: number } | undefined;
        const TestComponent = () => {
            size = useWindowSize({ debounceDelay: 100 });
            return null;
        };

        render(<TestComponent />);

        // Initial size
        expect(size).toEqual({
            width: 1008,
            height: 752,
        });

        // Change window size
        act(() => {
            Object.defineProperty(document.documentElement, 'clientWidth', {
                value: 800,
            });
            Object.defineProperty(document.documentElement, 'clientHeight', {
                value: 600,
            });
            window.dispatchEvent(new Event('resize'));
        });

        // Size should not update immediately due to debounce
        expect(size).toEqual({
            width: 1008,
            height: 752,
        });

        // Advance timers by debounce delay
        act(() => {
            vi.advanceTimersByTime(100);
        });

        // Size should update after debounce
        expect(size).toEqual({
            width: 800,
            height: 600,
        });
    });

    it('ignores resize events when disabled', () => {
        let size: { width: number; height: number } | undefined;
        const TestComponent = () => {
            size = useWindowSize({ enabled: false });
            return null;
        };

        render(<TestComponent />);

        // Initial size
        expect(size).toEqual({
            width: 1008,
            height: 752,
        });

        // Change window size
        act(() => {
            Object.defineProperty(document.documentElement, 'clientWidth', {
                value: 800,
            });
            Object.defineProperty(document.documentElement, 'clientHeight', {
                value: 600,
            });
            window.dispatchEvent(new Event('resize'));
        });

        // Advance timers
        act(() => {
            vi.advanceTimersByTime(100);
        });

        // Size should not update when disabled
        expect(size).toEqual({
            width: 1008,
            height: 752,
        });
    });

    it('cleans up resize listener and timeout on unmount', () => {
        const removeEventListenerSpy = vi.spyOn(window, 'removeEventListener');
        const clearTimeoutSpy = vi.spyOn(window, 'clearTimeout');

        const TestComponent = () => {
            useWindowSize();
            return null;
        };

        const { unmount } = render(<TestComponent />);
        unmount();

        expect(removeEventListenerSpy).toHaveBeenCalledWith('resize', expect.any(Function));
        expect(clearTimeoutSpy).toHaveBeenCalled();
    });
}); 