import React from 'react';
import {act, fireEvent, render} from '@testing-library/react';
import useScroll from './useScroll';

describe('useScroll', () => {
    let scrollX = 0;
    let scrollY = 0;

    beforeEach(() => {
        // Reset scroll values
        scrollX = 0;
        scrollY = 0;

        // Mock window scroll properties
        Object.defineProperty(window, 'pageXOffset', {
            get: () => scrollX,
        });
        Object.defineProperty(window, 'pageYOffset', {
            get: () => scrollY,
        });

        // Mock scrollTo
        window.scrollTo = vi.fn().mockImplementation((x: number | ScrollToOptions, y?: number) => {
            if (typeof x === 'object') {
                scrollX = x.left ?? scrollX;
                scrollY = x.top ?? scrollY;
            } else {
                scrollX = x;
                scrollY = y ?? scrollY;
            }
        });

        // Mock Date.now to control throttling
        vi.useFakeTimers();
    });

    afterEach(() => {
        vi.useRealTimers();
        vi.restoreAllMocks();
    });

    it('tracks window scroll position', () => {
        let position: { x: number; y: number } | undefined;
        const TestComponent = () => {
            const [pos] = useScroll({ throttleDelay: 0 }); // Disable throttling for this test
            position = pos;
            return null;
        };

        render(<TestComponent />);

        expect(position).toEqual({ x: 0, y: 0 });

        // Simulate scroll
        act(() => {
            scrollX = 100;
            scrollY = 200;
            fireEvent.scroll(window);
        });

        expect(position).toEqual({ x: 100, y: 200 });
    });

    it('tracks element scroll position', () => {
        let position: { x: number; y: number } | undefined;
        const TestComponent = () => {
            const containerRef = React.useRef<HTMLDivElement>(null);
            const [pos] = useScroll({ target: containerRef.current, throttleDelay: 0 }); // Disable throttling for this test
            position = pos;
            return (
                <div
                    ref={containerRef}
                    style={{ width: '100px', height: '100px', overflow: 'auto' }}
                    data-testid="container"
                >
                    <div style={{ width: '200px', height: '200px' }}>Content</div>
                </div>
            );
        };

        const { getByTestId } = render(<TestComponent />);
        const container = getByTestId('container');

        expect(position).toEqual({ x: 0, y: 0 });

        // Simulate scroll
        act(() => {
            Object.defineProperty(container, 'scrollLeft', { value: 50, configurable: true });
            Object.defineProperty(container, 'scrollTop', { value: 100, configurable: true });
            fireEvent.scroll(container);
        });

        expect(position).toEqual({ x: 50, y: 100 });
    });

    it('tracks scroll direction', async () => {
        let direction: { horizontal: 'left' | 'right' | null; vertical: 'up' | 'down' | null } | undefined;
        const TestComponent = () => {
            const [, dir] = useScroll({ trackDirection: true, throttleDelay: 0 }); // Disable throttling for this test
            direction = dir;
            return null;
        };

        render(<TestComponent />);

        expect(direction).toEqual({ horizontal: null, vertical: null });

        // Scroll down
        act(() => {
            scrollY = 100;
            fireEvent.scroll(window);
        });

        expect(direction).toEqual({ horizontal: null, vertical: 'down' });

        // Wait for next render
        await Promise.resolve();

        // Scroll up
        act(() => {
            scrollY = 50;
            fireEvent.scroll(window);
        });

        expect(direction).toEqual({ horizontal: null, vertical: 'up' });

        // Wait for next render
        await Promise.resolve();

        // Scroll right
        act(() => {
            scrollX = 100;
            fireEvent.scroll(window);
        });

        expect(direction).toEqual({ horizontal: 'right', vertical: null });

        // Wait for next render
        await Promise.resolve();

        // Scroll left
        act(() => {
            scrollX = 50;
            fireEvent.scroll(window);
        });

        expect(direction).toEqual({ horizontal: 'left', vertical: null });
    });

    it('ignores events when disabled', () => {
        let position: { x: number; y: number } | undefined;
        const TestComponent = () => {
            const [pos] = useScroll({ enabled: false, throttleDelay: 0 }); // Disable throttling for this test
            position = pos;
            return null;
        };

        render(<TestComponent />);

        expect(position).toEqual({ x: 0, y: 0 });

        // Simulate scroll
        act(() => {
            scrollX = 100;
            scrollY = 200;
            fireEvent.scroll(window);
        });

        expect(position).toEqual({ x: 0, y: 0 });
    });

    it('provides scroll to function', () => {
        let scrollTo: ((x: number, y: number, smooth?: boolean) => void) | undefined;
        const TestComponent = () => {
            const [, , scrollFn] = useScroll({ throttleDelay: 0 }); // Disable throttling for this test
            scrollTo = scrollFn;
            return null;
        };

        render(<TestComponent />);

        // Scroll with smooth behavior
        act(() => {
            scrollTo?.(100, 200, true);
        });

        expect(scrollX).toBe(100);
        expect(scrollY).toBe(200);

        // Scroll without smooth behavior
        act(() => {
            scrollTo?.(300, 400, false);
        });

        expect(scrollX).toBe(300);
        expect(scrollY).toBe(400);
    });
}); 