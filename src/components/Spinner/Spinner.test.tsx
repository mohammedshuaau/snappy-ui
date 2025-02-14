import {render, screen} from '@testing-library/react';
import {describe, expect, it} from 'vitest';
import {Spinner} from './Spinner';

describe('Spinner', () => {
    it('renders with default props', () => {
        render(<Spinner data-testid="spinner" />);
        const spinner = screen.getByTestId('spinner');
        expect(spinner).toBeInTheDocument();
        expect(spinner).toHaveClass('inline-block', 'animate-spin', 'rounded-full');
        expect(spinner).toHaveAttribute('role', 'status');
        expect(spinner).toHaveAttribute('aria-label', 'loading');
    });

    describe('variants', () => {
        const variants = {
            primary: 'text-primary-500',
            secondary: 'text-gray-500',
            success: 'text-green-500',
            danger: 'text-red-500',
            warning: 'text-yellow-500',
            info: 'text-blue-500'
        } as const;

        Object.entries(variants).forEach(([variant, expectedClass]) => {
            it(`renders ${variant} variant correctly`, () => {
                render(<Spinner variant={variant as keyof typeof variants} data-testid="spinner" />);
                expect(screen.getByTestId('spinner')).toHaveClass(expectedClass);
            });
        });
    });

    describe('sizes', () => {
        const sizes = {
            xs: ['w-3', 'h-3', 'border-2'],
            sm: ['w-4', 'h-4', 'border-2'],
            md: ['w-6', 'h-6', 'border-2'],
            lg: ['w-8', 'h-8', 'border-3'],
            xl: ['w-12', 'h-12', 'border-4']
        } as const;

        Object.entries(sizes).forEach(([size, expectedClasses]) => {
            it(`renders ${size} size correctly`, () => {
                render(<Spinner size={size as keyof typeof sizes} data-testid="spinner" />);
                const spinner = screen.getByTestId('spinner');
                expectedClasses.forEach(className => {
                    expect(spinner).toHaveClass(className);
                });
            });
        });
    });

    describe('styling', () => {
        it('applies custom className', () => {
            render(<Spinner className="custom-class" data-testid="spinner" />);
            expect(screen.getByTestId('spinner')).toHaveClass('custom-class');
        });

        it('applies custom styles through sx prop', () => {
            render(
                <Spinner
                    sx={{
                        backgroundColor: 'rgb(0, 0, 255)',
                        padding: '20px'
                    }}
                    data-testid="spinner"
                />
            );

            const spinner = screen.getByTestId('spinner');
            const computedStyle = window.getComputedStyle(spinner);
            expect(computedStyle.backgroundColor).toBe('rgb(0, 0, 255)');
            expect(computedStyle.padding).toBe('20px');
        });
    });
});