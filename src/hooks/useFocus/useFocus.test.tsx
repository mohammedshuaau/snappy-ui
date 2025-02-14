import { act, fireEvent, render } from '@testing-library/react';
import useFocus from './useFocus';

describe('useFocus', () => {
    it('tracks focus state', () => {
        let isFocused = false;
        const TestComponent = () => {
            const [ref, focused] = useFocus<HTMLButtonElement>();
            isFocused = focused;
            return <button ref={ref}>Focus me</button>;
        };

        const { getByText } = render(<TestComponent />);
        const button = getByText('Focus me');

        expect(isFocused).toBe(false);

        act(() => {
            fireEvent.focus(button);
        });
        expect(isFocused).toBe(true);

        act(() => {
            fireEvent.blur(button);
        });
        expect(isFocused).toBe(false);
    });

    it('allows manual focus control', () => {
        let setFocusFunction: ((focus: boolean) => void) | undefined;
        const TestComponent = () => {
            const [ref, _focused, setFocus] = useFocus<HTMLButtonElement>();
            setFocusFunction = setFocus;
            return <button ref={ref}>Focus me</button>;
        };

        const { getByText } = render(<TestComponent />);
        const button = getByText('Focus me');

        expect(document.activeElement).not.toBe(button);

        act(() => {
            setFocusFunction?.(true);
        });
        expect(document.activeElement).toBe(button);

        act(() => {
            setFocusFunction?.(false);
        });
        expect(document.activeElement).not.toBe(button);
    });

    it('detects focus within when enabled', () => {
        let isFocused = false;
        const TestComponent = () => {
            const [ref, focused] = useFocus<HTMLDivElement>({ within: true });
            isFocused = focused;
            return (
                <div ref={ref} tabIndex={-1} data-testid="container">
                    <button data-testid="button1">Button 1</button>
                    <button data-testid="button2">Button 2</button>
                </div>
            );
        };

        const { getByTestId } = render(
            <div>
                <button data-testid="outside">Outside</button>
                <TestComponent />
            </div>
        );

        const container = getByTestId('container');
        const button1 = getByTestId('button1');
        const button2 = getByTestId('button2');
        const outsideButton = getByTestId('outside');

        expect(isFocused).toBe(false);

        // Focus container
        act(() => {
            container.focus();
        });
        expect(isFocused).toBe(true);

        // Focus first button (within container)
        act(() => {
            button1.focus();
            // Simulate native focus event with relatedTarget
            const focusEvent = new FocusEvent('focus', { bubbles: true, relatedTarget: container });
            button1.dispatchEvent(focusEvent);
        });
        expect(isFocused).toBe(true);

        // Focus second button (within container)
        act(() => {
            button2.focus();
            // Simulate native focus event with relatedTarget
            const focusEvent = new FocusEvent('focus', { bubbles: true, relatedTarget: button1 });
            button2.dispatchEvent(focusEvent);
        });
        expect(isFocused).toBe(true);

        // Focus outside button
        act(() => {
            outsideButton.focus();
            // Simulate native blur event with relatedTarget
            const blurEvent = new FocusEvent('blur', { bubbles: true, relatedTarget: outsideButton });
            button2.dispatchEvent(blurEvent);
        });
        expect(isFocused).toBe(false);
    });

    it('traps focus when enabled', () => {
        const TestComponent = () => {
            const [ref] = useFocus<HTMLDivElement>({ trap: true });
            return (
                <div ref={ref}>
                    <button>First</button>
                    <button>Middle</button>
                    <button>Last</button>
                </div>
            );
        };

        const { getByText } = render(<TestComponent />);
        const firstButton = getByText('First');
        const lastButton = getByText('Last');

        // Focus first button
        act(() => {
            firstButton.focus();
        });
        expect(document.activeElement).toBe(firstButton);

        // Simulate Shift+Tab on first button
        act(() => {
            fireEvent.keyDown(firstButton, { key: 'Tab', shiftKey: true });
        });
        expect(document.activeElement).toBe(lastButton);

        // Focus last button
        act(() => {
            lastButton.focus();
        });
        expect(document.activeElement).toBe(lastButton);

        // Simulate Tab on last button
        act(() => {
            fireEvent.keyDown(lastButton, { key: 'Tab' });
        });
        expect(document.activeElement).toBe(firstButton);
    });

    it('does not track focus when disabled', () => {
        let isFocused = false;
        const TestComponent = () => {
            const [ref, focused] = useFocus<HTMLButtonElement>({ enabled: false });
            isFocused = focused;
            return <button ref={ref}>Focus me</button>;
        };

        const { getByText } = render(<TestComponent />);
        const button = getByText('Focus me');

        act(() => {
            fireEvent.focus(button);
        });
        expect(isFocused).toBe(false);

        act(() => {
            fireEvent.blur(button);
        });
        expect(isFocused).toBe(false);
    });

    it('cleans up event listeners on unmount', () => {
        const removeEventListenerSpy = vi.spyOn(HTMLButtonElement.prototype, 'removeEventListener');
        const TestComponent = () => {
            const [ref] = useFocus<HTMLButtonElement>();
            return <button ref={ref}>Focus me</button>;
        };

        const { unmount } = render(<TestComponent />);
        unmount();

        expect(removeEventListenerSpy).toHaveBeenCalledWith('focus', expect.any(Function));
        expect(removeEventListenerSpy).toHaveBeenCalledWith('blur', expect.any(Function));

        removeEventListenerSpy.mockRestore();
    });
}); 