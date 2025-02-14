import React from 'react';
import {act, render} from '@testing-library/react';
import MediaQueryProvider, {useMediaQuery} from './MediaQueryContext';

interface MediaQueryContextType {
    isMobile: boolean;
    isTablet: boolean;
    isDesktop: boolean;
    isPortrait: boolean;
    isLandscape: boolean;
    hasHover: boolean;
    hasFinePointer: boolean;
    screenWidth: number;
    screenHeight: number;
}

describe('MediaQueryContext', () => {
    const originalInnerWidth = window.innerWidth;
    const originalInnerHeight = window.innerHeight;
    const originalMatchMedia = window.matchMedia;

    beforeEach(() => {
        // Mock matchMedia
        const mockMatchMedia = (query: string) => ({
            matches: query === '(hover: hover)' || query === '(pointer: fine)',
            media: query,
            onchange: null,
            addListener: () => {},
            removeListener: () => {},
            addEventListener: () => {},
            removeEventListener: () => {},
            dispatchEvent: () => false,
        });

        Object.defineProperty(window, 'matchMedia', {
            writable: true,
            value: mockMatchMedia,
        });
    });

    afterEach(() => {
        // Reset window dimensions after each test
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
        Object.defineProperty(window, 'matchMedia', {
            writable: true,
            value: originalMatchMedia,
        });
    });

    it('provides default breakpoints and device info', () => {
        let result: MediaQueryContextType | undefined;
        render(
            <MediaQueryProvider>
                <TestComponent callback={(value) => { result = value; }} />
            </MediaQueryProvider>
        );

        expect(result?.hasHover).toBe(true);
        expect(result?.hasFinePointer).toBe(true);
        expect(result?.screenWidth).toBe(window.innerWidth);
        expect(result?.screenHeight).toBe(window.innerHeight);
    });

    it('detects mobile device correctly', () => {
        let result: MediaQueryContextType | undefined;
        render(
            <MediaQueryProvider>
                <TestComponent callback={(value) => { result = value; }} />
            </MediaQueryProvider>
        );

        // Set to mobile size (below 640px)
        act(() => {
            Object.defineProperty(window, 'innerWidth', {
                writable: true,
                configurable: true,
                value: 400,
            });
            window.dispatchEvent(new Event('resize'));
        });

        expect(result?.isMobile).toBe(true);
        expect(result?.isTablet).toBe(false);
        expect(result?.isDesktop).toBe(false);
    });

    it('detects tablet device correctly', () => {
        let result: MediaQueryContextType | undefined;
        render(
            <MediaQueryProvider>
                <TestComponent callback={(value) => { result = value; }} />
            </MediaQueryProvider>
        );

        // Set to tablet size (between 640px and 1024px)
        act(() => {
            Object.defineProperty(window, 'innerWidth', {
                writable: true,
                configurable: true,
                value: 800,
            });
            window.dispatchEvent(new Event('resize'));
        });

        expect(result?.isMobile).toBe(false);
        expect(result?.isTablet).toBe(true);
        expect(result?.isDesktop).toBe(false);
    });

    it('detects desktop device correctly', () => {
        let result: MediaQueryContextType | undefined;
        render(
            <MediaQueryProvider>
                <TestComponent callback={(value) => { result = value; }} />
            </MediaQueryProvider>
        );

        // Set to desktop size (above 1024px)
        act(() => {
            Object.defineProperty(window, 'innerWidth', {
                writable: true,
                configurable: true,
                value: 1200,
            });
            window.dispatchEvent(new Event('resize'));
        });

        expect(result?.isMobile).toBe(false);
        expect(result?.isTablet).toBe(false);
        expect(result?.isDesktop).toBe(true);
    });

    it('detects orientation correctly', () => {
        let result: MediaQueryContextType | undefined;
        render(
            <MediaQueryProvider>
                <TestComponent callback={(value) => { result = value; }} />
            </MediaQueryProvider>
        );

        // Set to portrait
        act(() => {
            Object.defineProperty(window, 'innerWidth', {
                writable: true,
                configurable: true,
                value: 400,
            });
            Object.defineProperty(window, 'innerHeight', {
                writable: true,
                configurable: true,
                value: 800,
            });
            window.dispatchEvent(new Event('resize'));
        });

        expect(result?.isPortrait).toBe(true);
        expect(result?.isLandscape).toBe(false);

        // Set to landscape
        act(() => {
            Object.defineProperty(window, 'innerWidth', {
                writable: true,
                configurable: true,
                value: 800,
            });
            Object.defineProperty(window, 'innerHeight', {
                writable: true,
                configurable: true,
                value: 400,
            });
            window.dispatchEvent(new Event('resize'));
        });

        expect(result?.isPortrait).toBe(false);
        expect(result?.isLandscape).toBe(true);
    });

    it('accepts custom breakpoints', () => {
        let result: MediaQueryContextType | undefined;
        render(
            <MediaQueryProvider mobileBreakpoint={500} tabletBreakpoint={900}>
                <TestComponent callback={(value) => { result = value; }} />
            </MediaQueryProvider>
        );

        // Set width to 600px (tablet in custom breakpoints)
        act(() => {
            Object.defineProperty(window, 'innerWidth', {
                writable: true,
                configurable: true,
                value: 600,
            });
            window.dispatchEvent(new Event('resize'));
        });

        expect(result?.isMobile).toBe(false);
        expect(result?.isTablet).toBe(true);
        expect(result?.isDesktop).toBe(false);
    });

    it('throws error when used outside provider', () => {
        expect(() => {
            render(<TestComponent callback={() => {}} />);
        }).toThrow('useMediaQuery must be used within a MediaQueryProvider');
    });
});

// Helper component to access hook values
const TestComponent = ({ callback }: { callback: (value: MediaQueryContextType) => void }) => {
    const value = useMediaQuery();
    React.useEffect(() => {
        callback(value);
    }, [callback, value]);
    return null;
}; 