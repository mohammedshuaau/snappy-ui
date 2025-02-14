import React from 'react';
import {act, render} from '@testing-library/react';
import DirectionProvider, {useDirection} from './DirectionContext';

interface DirectionContextType {
    direction: 'ltr' | 'rtl';
    toggleDirection: () => void;
    setDirection: (direction: 'ltr' | 'rtl') => void;
    isRTL: boolean;
}

describe('DirectionContext', () => {
    const getDocumentDirection = () => document.documentElement.getAttribute('dir');

    afterEach(() => {
        // Reset document direction after each test
        document.dir = 'ltr';
        document.documentElement.setAttribute('dir', 'ltr');
    });

    it('provides default direction as ltr', () => {
        let result: DirectionContextType | undefined;
        render(
            <DirectionProvider>
                <TestComponent callback={(value) => { result = value; }} />
            </DirectionProvider>
        );

        expect(result?.direction).toBe('ltr');
        expect(result?.isRTL).toBe(false);
        expect(getDocumentDirection()).toBe('ltr');
    });

    it('accepts custom initial direction', () => {
        let result: DirectionContextType | undefined;
        render(
            <DirectionProvider defaultDirection="rtl">
                <TestComponent callback={(value) => { result = value; }} />
            </DirectionProvider>
        );

        expect(result?.direction).toBe('rtl');
        expect(result?.isRTL).toBe(true);
        expect(getDocumentDirection()).toBe('rtl');
    });

    it('toggles direction correctly', () => {
        let result: DirectionContextType | undefined;
        render(
            <DirectionProvider>
                <TestComponent callback={(value) => { result = value; }} />
            </DirectionProvider>
        );

        expect(result?.direction).toBe('ltr');
        
        act(() => {
            result?.toggleDirection();
        });

        expect(result?.direction).toBe('rtl');
        expect(result?.isRTL).toBe(true);
        expect(getDocumentDirection()).toBe('rtl');

        act(() => {
            result?.toggleDirection();
        });

        expect(result?.direction).toBe('ltr');
        expect(result?.isRTL).toBe(false);
        expect(getDocumentDirection()).toBe('ltr');
    });

    it('sets direction explicitly', () => {
        let result: DirectionContextType | undefined;
        render(
            <DirectionProvider>
                <TestComponent callback={(value) => { result = value; }} />
            </DirectionProvider>
        );

        act(() => {
            result?.setDirection('rtl');
        });

        expect(result?.direction).toBe('rtl');
        expect(result?.isRTL).toBe(true);
        expect(getDocumentDirection()).toBe('rtl');

        act(() => {
            result?.setDirection('ltr');
        });

        expect(result?.direction).toBe('ltr');
        expect(result?.isRTL).toBe(false);
        expect(getDocumentDirection()).toBe('ltr');
    });

    it('throws error when used outside provider', () => {
        expect(() => {
            render(<TestComponent callback={() => {}} />);
        }).toThrow('useDirection must be used within a DirectionProvider');
    });
});

// Helper component to access hook values
const TestComponent = ({ callback }: { callback: (value: DirectionContextType) => void }) => {
    const value = useDirection();
    React.useEffect(() => {
        callback(value);
    }, [callback, value]);
    return null;
}; 