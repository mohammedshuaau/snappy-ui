import {act, render} from '@testing-library/react';
import useDebounce from './useDebounce';

describe('useDebounce', () => {
    beforeEach(() => {
        vi.useFakeTimers();
    });

    afterEach(() => {
        vi.useRealTimers();
    });

    it('debounces value with default delay', () => {
        let debouncedValue: string | undefined;
        const TestComponent = ({ value }: { value: string }) => {
            debouncedValue = useDebounce(value);
            return null;
        };

        const { rerender } = render(<TestComponent value="initial" />);
        expect(debouncedValue).toBeUndefined();

        // Fast forward default delay (500ms)
        act(() => {
            vi.advanceTimersByTime(500);
        });
        expect(debouncedValue).toBe('initial');

        // Update value
        rerender(<TestComponent value="updated" />);
        expect(debouncedValue).toBe('initial');

        // Fast forward half the delay
        act(() => {
            vi.advanceTimersByTime(250);
        });
        expect(debouncedValue).toBe('initial');

        // Fast forward remaining delay
        act(() => {
            vi.advanceTimersByTime(250);
        });
        expect(debouncedValue).toBe('updated');
    });

    it('debounces value with custom delay', () => {
        let debouncedValue: string | undefined;
        const TestComponent = ({ value }: { value: string }) => {
            debouncedValue = useDebounce(value, { delay: 1000 });
            return null;
        };

        const { rerender } = render(<TestComponent value="initial" />);
        expect(debouncedValue).toBeUndefined();

        // Fast forward custom delay (1000ms)
        act(() => {
            vi.advanceTimersByTime(1000);
        });
        expect(debouncedValue).toBe('initial');

        // Update value
        rerender(<TestComponent value="updated" />);
        expect(debouncedValue).toBe('initial');

        // Fast forward delay
        act(() => {
            vi.advanceTimersByTime(1000);
        });
        expect(debouncedValue).toBe('updated');
    });

    it('updates immediately when immediate option is true', () => {
        let debouncedValue: string | undefined;
        const TestComponent = ({ value }: { value: string }) => {
            debouncedValue = useDebounce(value, { immediate: true });
            return null;
        };

        render(<TestComponent value="initial" />);
        expect(debouncedValue).toBe('initial');
    });

    it('updates without delay when disabled', () => {
        let debouncedValue: string | undefined;
        const TestComponent = ({ value }: { value: string }) => {
            debouncedValue = useDebounce(value, { enabled: false });
            return null;
        };

        const { rerender } = render(<TestComponent value="initial" />);
        expect(debouncedValue).toBe('initial');

        rerender(<TestComponent value="updated" />);
        expect(debouncedValue).toBe('updated');
    });

    it('cleans up timeout on unmount', () => {
        const clearTimeoutSpy = vi.spyOn(window, 'clearTimeout');
        const TestComponent = ({ value }: { value: string }) => {
            useDebounce(value);
            return null;
        };

        const { unmount } = render(<TestComponent value="test" />);
        unmount();

        expect(clearTimeoutSpy).toHaveBeenCalled();
        clearTimeoutSpy.mockRestore();
    });

    it('cleans up timeout on value change', () => {
        const clearTimeoutSpy = vi.spyOn(window, 'clearTimeout');
        const TestComponent = ({ value }: { value: string }) => {
            useDebounce(value);
            return null;
        };

        const { rerender } = render(<TestComponent value="initial" />);
        rerender(<TestComponent value="updated" />);

        expect(clearTimeoutSpy).toHaveBeenCalled();
        clearTimeoutSpy.mockRestore();
    });
}); 