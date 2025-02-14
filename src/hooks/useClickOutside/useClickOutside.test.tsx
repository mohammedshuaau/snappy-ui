import {fireEvent, render} from '@testing-library/react';
import useClickOutside from './useClickOutside';

const createMockHandler = () => vi.fn();
const createSpyOn = (obj: any, method: string) => vi.spyOn(obj, method);

describe('useClickOutside', () => {
    it('calls handler when clicking outside', () => {
        const handler = createMockHandler();
        const TestComponent = () => {
            const ref = useClickOutside<HTMLDivElement>(handler);
            return <div ref={ref} data-testid="target">Target</div>;
        };

        const { getByTestId } = render(
            <div>
                <TestComponent />
                <div data-testid="outside">Outside</div>
            </div>
        );

        const targetElement = getByTestId('target');
        const outsideElement = getByTestId('outside');

        // Click inside - handler should not be called
        fireEvent.mouseDown(targetElement);
        expect(handler).not.toHaveBeenCalled();

        // Click outside - handler should be called
        fireEvent.mouseDown(outsideElement);
        expect(handler).toHaveBeenCalledTimes(1);
    });

    it('handles touch events when enabled', () => {
        const handler = createMockHandler();
        const TestComponent = () => {
            const ref = useClickOutside<HTMLDivElement>(handler, { enableTouch: true });
            return <div ref={ref} data-testid="target">Target</div>;
        };

        const { getByTestId } = render(
            <div>
                <TestComponent />
                <div data-testid="outside">Outside</div>
            </div>
        );

        const targetElement = getByTestId('target');
        const outsideElement = getByTestId('outside');

        // Touch inside - handler should not be called
        fireEvent.touchStart(targetElement);
        expect(handler).not.toHaveBeenCalled();

        // Touch outside - handler should be called
        fireEvent.touchStart(outsideElement);
        expect(handler).toHaveBeenCalledTimes(1);
    });

    it('does not handle touch events when disabled', () => {
        const handler = createMockHandler();
        const TestComponent = () => {
            const ref = useClickOutside<HTMLDivElement>(handler, { enableTouch: false });
            return <div ref={ref} data-testid="target">Target</div>;
        };

        const { getByTestId } = render(
            <div>
                <TestComponent />
                <div data-testid="outside">Outside</div>
            </div>
        );

        const outsideElement = getByTestId('outside');

        // Touch outside - handler should not be called because touch is disabled
        fireEvent.touchStart(outsideElement);
        expect(handler).not.toHaveBeenCalled();

        // Mouse click outside - handler should still be called
        fireEvent.mouseDown(outsideElement);
        expect(handler).toHaveBeenCalledTimes(1);
    });

    it('does not call handler when disabled', () => {
        const handler = createMockHandler();
        const TestComponent = () => {
            const ref = useClickOutside<HTMLDivElement>(handler, { enabled: false });
            return <div ref={ref} data-testid="target">Target</div>;
        };

        const { getByTestId } = render(
            <div>
                <TestComponent />
                <div data-testid="outside">Outside</div>
            </div>
        );

        const outsideElement = getByTestId('outside');

        // Click outside - handler should not be called because hook is disabled
        fireEvent.mouseDown(outsideElement);
        expect(handler).not.toHaveBeenCalled();

        // Touch outside - handler should not be called because hook is disabled
        fireEvent.touchStart(outsideElement);
        expect(handler).not.toHaveBeenCalled();
    });

    it('cleans up event listeners on unmount', () => {
        const removeEventListenerSpy = createSpyOn(document, 'removeEventListener');
        const handler = createMockHandler();
        const TestComponent = () => {
            const ref = useClickOutside<HTMLDivElement>(handler);
            return <div ref={ref}>Target</div>;
        };

        const { unmount } = render(<TestComponent />);
        unmount();

        expect(removeEventListenerSpy).toHaveBeenCalledWith('mousedown', expect.any(Function));
        expect(removeEventListenerSpy).toHaveBeenCalledWith('touchstart', expect.any(Function));

        removeEventListenerSpy.mockRestore();
    });
}); 