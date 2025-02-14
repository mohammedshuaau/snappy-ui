import {render, screen} from '@testing-library/react';
import {describe, expect, it} from 'vitest';
import {Box} from './Box';

describe('Box', () => {
    it('renders with default props', () => {
        render(<Box data-testid="box">Test Box</Box>);
        const box = screen.getByTestId('box');
        expect(box).toBeInTheDocument();
        expect(box).toHaveClass('block');
    });

    describe('rounded variants', () => {
        const roundedVariants = {
            none: 'rounded-none',
            sm: 'rounded-sm',
            md: 'rounded',
            lg: 'rounded-lg',
            xl: 'rounded-xl',
            '2xl': 'rounded-2xl',
            '3xl': 'rounded-3xl',
            full: 'rounded-full'
        } as const;

        Object.entries(roundedVariants).forEach(([variant, expectedClass]) => {
            it(`renders ${variant} rounded variant correctly`, () => {
                render(<Box rounded={variant as keyof typeof roundedVariants} data-testid="box">Box</Box>);
                expect(screen.getByTestId('box')).toHaveClass(expectedClass);
            });
        });
    });

    describe('shadow variants', () => {
        const shadowVariants = {
            none: 'shadow-none',
            sm: 'shadow-sm',
            md: 'shadow',
            lg: 'shadow-lg',
            xl: 'shadow-xl',
            '2xl': 'shadow-2xl',
            inner: 'shadow-inner'
        } as const;

        Object.entries(shadowVariants).forEach(([variant, expectedClass]) => {
            it(`renders ${variant} shadow variant correctly`, () => {
                render(<Box shadow={variant as keyof typeof shadowVariants} data-testid="box">Box</Box>);
                expect(screen.getByTestId('box')).toHaveClass(expectedClass);
            });
        });
    });

    describe('border variants', () => {
        const borderVariants = {
            none: 'border-0',
            thin: 'border',
            medium: 'border-2',
            thick: 'border-4'
        } as const;

        Object.entries(borderVariants).forEach(([variant, expectedClass]) => {
            it(`renders ${variant} border variant correctly`, () => {
                render(<Box border={variant as keyof typeof borderVariants} data-testid="box">Box</Box>);
                expect(screen.getByTestId('box')).toHaveClass(expectedClass);
            });
        });
    });

    describe('as prop', () => {
        it('renders as a different HTML element', () => {
            render(<Box as="section" data-testid="box">Box as section</Box>);
            const box = screen.getByTestId('box');
            expect(box.tagName.toLowerCase()).toBe('section');
        });

        it('renders as div by default', () => {
            render(<Box data-testid="box">Default Box</Box>);
            const box = screen.getByTestId('box');
            expect(box.tagName.toLowerCase()).toBe('div');
        });
    });

    describe('styling', () => {
        it('applies custom className', () => {
            render(<Box className="custom-class" data-testid="box">Box</Box>);
            expect(screen.getByTestId('box')).toHaveClass('custom-class');
        });

        it('applies custom styles through sx prop', () => {
            render(
                <Box
                    sx={{
                        backgroundColor: 'rgb(0, 0, 255)',
                        padding: '20px'
                    }}
                    data-testid="box"
                >
                    Styled Box
                </Box>
            );

            const box = screen.getByTestId('box');
            const computedStyle = window.getComputedStyle(box);
            expect(computedStyle.backgroundColor).toBe('rgb(0, 0, 255)');
            expect(computedStyle.padding).toBe('20px');
        });

        it('applies pseudo-class styles', () => {
            render(
                <Box
                    sx={{
                        '&:hover': { backgroundColor: 'blue' }
                    }}
                    data-testid="box"
                >
                    Hover Box
                </Box>
            );

            const styleTag = document.querySelector('style');
            expect(styleTag?.textContent).toContain('background-color: blue');
        });
    });
}); 