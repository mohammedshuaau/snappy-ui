import {render, screen} from '@testing-library/react';
import {describe, expect, it} from 'vitest';
import {Progress} from './Progress';

describe('Progress', () => {
    it('renders with default props', () => {
        render(<Progress />);
        const progress = screen.getByRole('progressbar');
        expect(progress).toBeInTheDocument();
        expect(progress).toHaveClass('h-2', 'bg-gray-100');
        expect(progress).toHaveAttribute('aria-valuenow', '0');
    });

    describe('variants', () => {
        const variants = {
            default: ['bg-gray-100', 'dark:bg-gray-800'],
            success: ['bg-success-100', 'dark:bg-success-900/30'],
            warning: ['bg-warning-100', 'dark:bg-warning-900/30'],
            error: ['bg-error-100', 'dark:bg-error-900/30']
        } as const;

        Object.entries(variants).forEach(([variant, expectedClasses]) => {
            it(`renders ${variant} variant correctly`, () => {
                render(<Progress variant={variant as keyof typeof variants} value={50} />);
                const progress = screen.getByRole('progressbar');
                expectedClasses.forEach(className => {
                    expect(progress).toHaveClass(className);
                });
            });
        });
    });

    describe('sizes', () => {
        const sizes = {
            sm: 'h-1',
            md: 'h-2',
            lg: 'h-3',
            xl: 'h-4'
        } as const;

        Object.entries(sizes).forEach(([size, expectedClass]) => {
            it(`renders ${size} size correctly`, () => {
                render(<Progress size={size as keyof typeof sizes} value={50} />);
                expect(screen.getByRole('progressbar')).toHaveClass(expectedClass);
            });
        });
    });

    describe('value handling', () => {
        it('clamps value between 0 and 100', () => {
            const { rerender } = render(<Progress value={150} />);
            expect(screen.getByRole('progressbar')).toHaveAttribute('aria-valuenow', '100');

            rerender(<Progress value={-50} />);
            expect(screen.getByRole('progressbar')).toHaveAttribute('aria-valuenow', '0');
        });

        it('shows value label when showValue is true', () => {
            render(<Progress value={75} showValue />);
            expect(screen.getByText('75%')).toBeInTheDocument();
        });

        it('updates progress bar width based on value', () => {
            render(<Progress value={60} />);
            const progressBar = screen.getByRole('progressbar').firstElementChild;
            expect(progressBar).toHaveStyle({ width: '60%' });
        });
    });

    describe('animation states', () => {
        it('applies animated styles when animated prop is true', () => {
            render(<Progress value={50} animated />);
            const progressBar = screen.getByRole('progressbar').firstElementChild;
            expect(progressBar).toHaveClass('animate-progress-stripes');
        });

        it('applies indeterminate animation when indeterminate is true', () => {
            render(<Progress indeterminate />);
            const progressBar = screen.getByRole('progressbar').firstElementChild;
            expect(progressBar).toHaveClass('animate-indeterminate');
        });

        it('does not show value label when indeterminate', () => {
            render(<Progress indeterminate showValue />);
            const progressBar = screen.getByRole('progressbar');
            expect(progressBar).not.toHaveTextContent('%');
        });
    });

    describe('accessibility', () => {
        it('has correct ARIA attributes', () => {
            render(<Progress value={75} />);
            const progress = screen.getByRole('progressbar');
            expect(progress).toHaveAttribute('aria-valuemin', '0');
            expect(progress).toHaveAttribute('aria-valuemax', '100');
            expect(progress).toHaveAttribute('aria-valuenow', '75');
        });

        it('removes aria-valuenow when indeterminate', () => {
            render(<Progress indeterminate />);
            const progress = screen.getByRole('progressbar');
            expect(progress).not.toHaveAttribute('aria-valuenow');
        });
    });

    describe('styling', () => {
        it('applies custom className', () => {
            render(<Progress className="custom-class" />);
            expect(screen.getByRole('progressbar')).toHaveClass('custom-class');
        });

        it('applies custom styles through sx prop', () => {
            render(
                <Progress
                    sx={{
                        backgroundColor: 'rgb(0, 0, 255)',
                        height: '20px'
                    }}
                />
            );

            const progress = screen.getByRole('progressbar');
            const computedStyle = window.getComputedStyle(progress);
            expect(computedStyle.backgroundColor).toBe('rgb(0, 0, 255)');
            expect(computedStyle.height).toBe('20px');
        });

        it('generates animation styles', () => {
            render(
                <Progress
                    animated
                    sx={{
                        '&:hover': { backgroundColor: 'blue' }
                    }}
                />
            );
            const styleTag = document.querySelector('style');
            expect(styleTag).toBeTruthy();
            expect(styleTag?.innerHTML).toContain('animation');
        });
    });
}); 