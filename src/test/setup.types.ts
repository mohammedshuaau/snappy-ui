import '@testing-library/jest-dom';

declare module 'vitest' {
    interface Assertion<T = any> extends jest.Matchers<void, T> {
        toBeInTheDocument(): void;
        toHaveClass(...classNames: string[]): void;
        toBeDisabled(): void;
        toHaveStyle(style: Record<string, any>): void;
    }
} 