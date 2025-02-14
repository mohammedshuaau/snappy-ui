import {render, screen} from '@testing-library/react';
import {describe, expect, it} from 'vitest';
import {Link} from './Link';

describe('Link', () => {
    it('renders with default props', () => {
        render(<Link href="#">Test Link</Link>);
        const link = screen.getByRole('link');
        expect(link).toBeInTheDocument();
        expect(link).toHaveClass('inline-flex', 'items-center', 'gap-1.5', 'font-medium');
    });

    describe('variants', () => {
        const variants = {
            default: ['text-primary-600', 'hover:text-primary-700'],
            subtle: ['text-slate-600', 'hover:text-slate-900'],
            underline: ['text-primary-600', 'underline', 'decoration-primary-300'],
            ghost: ['text-slate-600', 'hover:bg-slate-100', 'rounded-md']
        } as const;

        Object.entries(variants).forEach(([variant, expectedClasses]) => {
            it(`renders ${variant} variant correctly`, () => {
                render(<Link variant={variant as keyof typeof variants} href="#">Link</Link>);
                const link = screen.getByRole('link');
                expectedClasses.forEach(className => {
                    expect(link).toHaveClass(className);
                });
            });
        });
    });

    describe('sizes', () => {
        const sizes = {
            sm: 'text-sm',
            md: 'text-base',
            lg: 'text-lg'
        } as const;

        Object.entries(sizes).forEach(([size, expectedClass]) => {
            it(`renders ${size} size correctly`, () => {
                render(<Link size={size as keyof typeof sizes} href="#">Link</Link>);
                expect(screen.getByRole('link')).toHaveClass(expectedClass);
            });
        });
    });

    describe('external links', () => {
        it('adds target and rel attributes for external links', () => {
            render(<Link href="https://example.com" external>External Link</Link>);
            const link = screen.getByRole('link');
            expect(link).toHaveAttribute('target', '_blank');
            expect(link).toHaveAttribute('rel', 'noopener noreferrer');
        });

        it('renders external link icon', () => {
            render(<Link href="https://example.com" external>External Link</Link>);
            const svg = screen.getByRole('link').querySelector('svg');
            expect(svg).toBeInTheDocument();
            expect(svg).toHaveClass('h-4', 'w-4');
        });
    });

    describe('icons', () => {
        it('renders with left icon', () => {
            render(
                <Link href="#" leftIcon={<span data-testid="left-icon">←</span>}>
                    Link with Left Icon
                </Link>
            );
            expect(screen.getByTestId('left-icon')).toBeInTheDocument();
            expect(screen.getByTestId('left-icon').parentElement).toHaveClass('inline-flex');
        });

        it('renders with right icon', () => {
            render(
                <Link href="#" rightIcon={<span data-testid="right-icon">→</span>}>
                    Link with Right Icon
                </Link>
            );
            expect(screen.getByTestId('right-icon')).toBeInTheDocument();
            expect(screen.getByTestId('right-icon').parentElement).toHaveClass('inline-flex');
        });

        it('renders with both icons', () => {
            render(
                <Link
                    href="#"
                    leftIcon={<span data-testid="left-icon">←</span>}
                    rightIcon={<span data-testid="right-icon">→</span>}
                >
                    Link with Both Icons
                </Link>
            );
            expect(screen.getByTestId('left-icon')).toBeInTheDocument();
            expect(screen.getByTestId('right-icon')).toBeInTheDocument();
        });
    });

    describe('accessibility', () => {
        it('maintains href attribute', () => {
            render(<Link href="/test">Test Link</Link>);
            expect(screen.getByRole('link')).toHaveAttribute('href', '/test');
        });

        it('applies aria-label when provided', () => {
            render(<Link href="#" aria-label="Accessible Link">Link</Link>);
            expect(screen.getByRole('link')).toHaveAttribute('aria-label', 'Accessible Link');
        });

        it('applies aria-current for current page', () => {
            render(<Link href="#" aria-current="page">Current Page</Link>);
            expect(screen.getByRole('link')).toHaveAttribute('aria-current', 'page');
        });
    });

    describe('styling', () => {
        it('applies custom className', () => {
            render(<Link href="#" className="custom-class">Link</Link>);
            expect(screen.getByRole('link')).toHaveClass('custom-class');
        });

        it('applies custom styles through sx prop', () => {
            render(
                <Link
                    href="#"
                    sx={{
                        backgroundColor: 'rgb(0, 0, 255)',
                        padding: '20px'
                    }}
                >
                    Styled Link
                </Link>
            );

            const link = screen.getByRole('link');
            const computedStyle = window.getComputedStyle(link);
            expect(computedStyle.backgroundColor).toBe('rgb(0, 0, 255)');
            expect(computedStyle.padding).toBe('20px');
        });

        it('applies pseudo-class styles', () => {
            render(
                <Link
                    href="#"
                    sx={{
                        '&:hover': { backgroundColor: 'blue' }
                    }}
                >
                    Hover Link
                </Link>
            );

            const styleTag = document.querySelector('style');
            expect(styleTag?.textContent).toContain('background-color: blue');
        });
    });
}); 