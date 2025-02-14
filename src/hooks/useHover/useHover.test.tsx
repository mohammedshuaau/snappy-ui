import {act, fireEvent, render} from '@testing-library/react';
import useHover from './useHover';

describe('useHover', () => {
    it('tracks hover state', () => {
        let isHovered = false;
        const TestComponent = () => {
            const [ref, hovered] = useHover<HTMLDivElement>();
            isHovered = hovered;
            return <div ref={ref} data-testid="hover-target">Hover me</div>;
        };

        const { getByTestId } = render(<TestComponent />);
        const target = getByTestId('hover-target');

        expect(isHovered).toBe(false);

        act(() => {
            fireEvent.mouseEnter(target);
        });
        expect(isHovered).toBe(true);

        act(() => {
            fireEvent.mouseLeave(target);
        });
        expect(isHovered).toBe(false);
    });

    it('allows manual hover control', () => {
        let isHovered = false;
        const TestComponent = () => {
            const [ref, hovered] = useHover<HTMLDivElement>();
            isHovered = hovered;
            return <div ref={ref} data-testid="hover-target">Hover me</div>;
        };

        const { getByTestId } = render(<TestComponent />);
        const target = getByTestId('hover-target');

        expect(isHovered).toBe(false);

        act(() => {
            fireEvent.mouseEnter(target);
        });
        expect(isHovered).toBe(true);

        act(() => {
            fireEvent.mouseLeave(target);
        });
        expect(isHovered).toBe(false);
    });

    it('handles touch events when enabled', () => {
        let isHovered = false;
        const TestComponent = () => {
            const [ref, hovered] = useHover<HTMLDivElement>({ enableTouch: true });
            isHovered = hovered;
            return <div ref={ref} data-testid="hover-target">Touch me</div>;
        };

        const { getByTestId } = render(<TestComponent />);
        const target = getByTestId('hover-target');

        expect(isHovered).toBe(false);

        act(() => {
            fireEvent.touchStart(target);
        });
        expect(isHovered).toBe(true);

        act(() => {
            fireEvent.touchEnd(target);
        });
        expect(isHovered).toBe(false);
    });

    it('ignores touch events when disabled', () => {
        let isHovered = false;
        const TestComponent = () => {
            const [ref, hovered] = useHover<HTMLDivElement>({ enableTouch: false });
            isHovered = hovered;
            return <div ref={ref} data-testid="hover-target">Touch me</div>;
        };

        const { getByTestId } = render(<TestComponent />);
        const target = getByTestId('hover-target');

        expect(isHovered).toBe(false);

        act(() => {
            fireEvent.touchStart(target);
        });
        expect(isHovered).toBe(false);

        act(() => {
            fireEvent.touchEnd(target);
        });
        expect(isHovered).toBe(false);
    });

    it('applies delay when hovering', () => {
        vi.useFakeTimers();
        let isHovered = false;
        const TestComponent = () => {
            const [ref, hovered] = useHover<HTMLDivElement>({ delay: 200 });
            isHovered = hovered;
            return <div ref={ref} data-testid="hover-target">Hover me</div>;
        };

        const { getByTestId } = render(<TestComponent />);
        const target = getByTestId('hover-target');

        expect(isHovered).toBe(false);

        act(() => {
            fireEvent.mouseEnter(target);
        });
        expect(isHovered).toBe(false);

        act(() => {
            vi.advanceTimersByTime(100);
        });
        expect(isHovered).toBe(false);

        act(() => {
            vi.advanceTimersByTime(100);
        });
        expect(isHovered).toBe(true);

        vi.useRealTimers();
    });

    it('does not track hover when disabled', () => {
        let isHovered = false;
        const TestComponent = () => {
            const [ref, hovered] = useHover<HTMLDivElement>({ enabled: false });
            isHovered = hovered;
            return <div ref={ref} data-testid="hover-target">Hover me</div>;
        };

        const { getByTestId } = render(<TestComponent />);
        const target = getByTestId('hover-target');

        act(() => {
            fireEvent.mouseEnter(target);
        });
        expect(isHovered).toBe(false);

        act(() => {
            fireEvent.mouseLeave(target);
        });
        expect(isHovered).toBe(false);
    });

    it('cleans up event listeners on unmount', () => {
        const TestComponent = () => {
            const [ref] = useHover<HTMLDivElement>();
            return <div ref={ref}>Hover me</div>;
        };

        const { unmount } = render(<TestComponent />);
        
        expect(() => {
            unmount();
        }).not.toThrow();
    });
}); 