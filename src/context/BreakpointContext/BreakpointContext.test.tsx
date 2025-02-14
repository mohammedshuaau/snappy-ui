import React from 'react';
import {act, render} from '@testing-library/react';
import BreakpointProvider, {useBreakpoint} from './BreakpointContext';

interface BreakpointContextType {
    breakpoint: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl';
    breakpoints: {
        xs: number;
        sm: number;
        md: number;
        lg: number;
        xl: number;
        '2xl': number;
    };
    up: (breakpoint: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl') => boolean;
    down: (breakpoint: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl') => boolean;
    between: (start: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl', end: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl') => boolean;
    only: (breakpoint: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl') => boolean;
    width: number;
}

describe('BreakpointContext', () => {
    const originalInnerWidth = window.innerWidth;

    afterEach(() => {
        // Reset window width after each test
        Object.defineProperty(window, 'innerWidth', {
            writable: true,
            configurable: true,
            value: originalInnerWidth,
        });
    });

    it('provides default breakpoints', () => {
        let result: BreakpointContextType | undefined;
        render(
            <BreakpointProvider>
                <TestComponent callback={(value) => { result = value; }} />
            </BreakpointProvider>
        );

        expect(result?.breakpoints).toEqual({
            xs: 0,
            sm: 640,
            md: 768,
            lg: 1024,
            xl: 1280,
            '2xl': 1536,
        });
    });

    it('allows custom breakpoints', () => {
        const customBreakpoints = {
            sm: 500,
            md: 800,
        };

        let result: BreakpointContextType | undefined;
        render(
            <BreakpointProvider breakpoints={customBreakpoints}>
                <TestComponent callback={(value) => { result = value; }} />
            </BreakpointProvider>
        );

        expect(result?.breakpoints.sm).toBe(500);
        expect(result?.breakpoints.md).toBe(800);
    });

    it('updates on window resize', () => {
        let result: BreakpointContextType | undefined;
        render(
            <BreakpointProvider>
                <TestComponent callback={(value) => { result = value; }} />
            </BreakpointProvider>
        );

        // Set to mobile size
        act(() => {
            Object.defineProperty(window, 'innerWidth', {
                writable: true,
                configurable: true,
                value: 400,
            });
            window.dispatchEvent(new Event('resize'));
        });

        expect(result?.breakpoint).toBe('xs');
        expect(result?.width).toBe(400);

        // Set to tablet size
        act(() => {
            Object.defineProperty(window, 'innerWidth', {
                writable: true,
                configurable: true,
                value: 800,
            });
            window.dispatchEvent(new Event('resize'));
        });

        expect(result?.breakpoint).toBe('md');
        expect(result?.width).toBe(800);
    });

    it('provides correct breakpoint utilities', () => {
        let result: BreakpointContextType | undefined;
        render(
            <BreakpointProvider>
                <TestComponent callback={(value) => { result = value; }} />
            </BreakpointProvider>
        );

        // Set to 800px (md breakpoint)
        act(() => {
            Object.defineProperty(window, 'innerWidth', {
                writable: true,
                configurable: true,
                value: 800,
            });
            window.dispatchEvent(new Event('resize'));
        });

        expect(result?.up('sm')).toBe(true);
        expect(result?.up('lg')).toBe(false);
        expect(result?.down('lg')).toBe(true);
        expect(result?.down('sm')).toBe(false);
        expect(result?.between('sm', 'lg')).toBe(true);
        expect(result?.only('md')).toBe(true);
    });

    it('throws error when used outside provider', () => {
        expect(() => {
            render(<TestComponent callback={() => {}} />);
        }).toThrow('useBreakpoint must be used within a BreakpointProvider');
    });
});

// Helper component to access hook values
const TestComponent = ({ callback }: { callback: (value: BreakpointContextType) => void }) => {
    const value = useBreakpoint();
    React.useEffect(() => {
        callback(value);
    }, [callback, value]);
    return null;
}; 