import React from 'react';
import {act, fireEvent, render} from '@testing-library/react';
import useKeyboard from './useKeyboard';

describe('useKeyboard', () => {
    it('handles single key press', () => {
        const onKeyPress = vi.fn();
        const TestComponent = () => {
            useKeyboard([
                {
                    key: 'Enter',
                    handler: onKeyPress,
                },
            ]);
            return null;
        };

        render(<TestComponent />);

        act(() => {
            fireEvent.keyDown(document, { key: 'Enter' });
        });

        expect(onKeyPress).toHaveBeenCalledTimes(1);
    });

    it('handles key combinations', () => {
        const onKeyPress = vi.fn();
        const TestComponent = () => {
            useKeyboard([
                {
                    key: 'a',
                    ctrl: true,
                    handler: onKeyPress,
                },
            ]);
            return null;
        };

        render(<TestComponent />);

        act(() => {
            fireEvent.keyDown(document, { key: 'a', ctrlKey: true });
        });

        expect(onKeyPress).toHaveBeenCalledTimes(1);
    });

    it('handles multiple key bindings', () => {
        const onKeyPress1 = vi.fn();
        const onKeyPress2 = vi.fn();
        const TestComponent = () => {
            useKeyboard([
                {
                    key: 'Enter',
                    handler: onKeyPress1,
                },
                {
                    key: 'Escape',
                    handler: onKeyPress2,
                },
            ]);
            return null;
        };

        render(<TestComponent />);

        act(() => {
            fireEvent.keyDown(document, { key: 'Enter' });
        });
        expect(onKeyPress1).toHaveBeenCalledTimes(1);
        expect(onKeyPress2).not.toHaveBeenCalled();

        act(() => {
            fireEvent.keyDown(document, { key: 'Escape' });
        });
        expect(onKeyPress1).toHaveBeenCalledTimes(1);
        expect(onKeyPress2).toHaveBeenCalledTimes(1);
    });

    it('handles array of keys', () => {
        const onKeyPress = vi.fn();
        const TestComponent = () => {
            useKeyboard([
                {
                    key: ['ArrowUp', 'ArrowDown'],
                    handler: onKeyPress,
                },
            ]);
            return null;
        };

        render(<TestComponent />);

        act(() => {
            fireEvent.keyDown(document, { key: 'ArrowUp' });
        });
        expect(onKeyPress).toHaveBeenCalledTimes(1);

        act(() => {
            fireEvent.keyDown(document, { key: 'ArrowDown' });
        });
        expect(onKeyPress).toHaveBeenCalledTimes(2);
    });

    it('ignores events when disabled', () => {
        const onKeyPress = vi.fn();
        const TestComponent = () => {
            useKeyboard(
                [
                    {
                        key: 'Enter',
                        handler: onKeyPress,
                    },
                ],
                { enabled: false }
            );
            return null;
        };

        render(<TestComponent />);

        act(() => {
            fireEvent.keyDown(document, { key: 'Enter' });
        });

        expect(onKeyPress).not.toHaveBeenCalled();
    });

    it('handles target element when provided', () => {
        const onKeyPress = vi.fn();
        const TestComponent = () => {
            const ref = React.useRef<HTMLDivElement>(null);
            useKeyboard(
                [
                    {
                        key: 'Enter',
                        handler: onKeyPress,
                    },
                ],
                { target: ref.current }
            );
            return <div ref={ref} data-testid="target">Target</div>;
        };

        const { getByTestId } = render(<TestComponent />);
        const target = getByTestId('target');

        act(() => {
            fireEvent.keyDown(target, { key: 'Enter' });
        });

        expect(onKeyPress).toHaveBeenCalledTimes(1);
    });
}); 