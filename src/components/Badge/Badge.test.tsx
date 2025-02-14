import {fireEvent, render, screen} from '@testing-library/react';
import {describe, expect, it, vi} from 'vitest';
import {Badge} from './Badge';

describe('Badge', () => {
    it('renders with default props', () => {
        render(<Badge>Test Badge</Badge>);
        expect(screen.getByText('Test Badge')).toBeInTheDocument();
        expect(screen.getByText('Test Badge')).toHaveClass('bg-primary-100');
    });

    describe('variants', () => {
        const variants = {
            default: 'bg-primary-100',
            secondary: 'bg-slate-100',
            success: 'bg-green-100',
            warning: 'bg-yellow-100',
            error: 'bg-red-100',
            outline: 'border-primary-200'
        } as const;

        Object.entries(variants).forEach(([variant, expectedClass]) => {
            it(`renders ${variant} variant correctly`, () => {
                render(<Badge variant={variant as keyof typeof variants}>Badge</Badge>);
                expect(screen.getByText('Badge')).toHaveClass(expectedClass);
            });
        });
    });

    describe('sizes', () => {
        const sizes = {
            default: 'text-xs',
            sm: 'text-[0.625rem]',
            lg: 'text-sm'
        } as const;

        Object.entries(sizes).forEach(([size, expectedClass]) => {
            it(`renders ${size} size correctly`, () => {
                render(<Badge size={size as keyof typeof sizes}>Badge</Badge>);
                expect(screen.getByText('Badge')).toHaveClass(expectedClass);
            });
        });
    });

    it('renders with custom icon', () => {
        const icon = <span data-testid="custom-icon">🔔</span>;
        render(<Badge icon={icon}>Badge with Icon</Badge>);
        expect(screen.getByTestId('custom-icon')).toBeInTheDocument();
    });

    describe('removable behavior', () => {
        it('renders remove button when onRemove is provided', () => {
            render(<Badge onRemove={() => { }}>Removable Badge</Badge>);
            expect(screen.getByRole('button', { name: /remove badge/i })).toBeInTheDocument();
        });

        it('calls onRemove when remove button is clicked', () => {
            const onRemove = vi.fn();
            render(<Badge onRemove={onRemove}>Removable Badge</Badge>);

            fireEvent.click(screen.getByRole('button', { name: /remove badge/i }));
            expect(onRemove).toHaveBeenCalledTimes(1);
        });

        it('applies correct padding when removable', () => {
            render(<Badge onRemove={() => { }}>Removable Badge</Badge>);
            expect(screen.getByRole('button', { name: /remove badge/i })).toHaveClass('ml-1');
        });
    });

    describe('styling', () => {
        it('applies custom className', () => {
            render(<Badge className="custom-class">Badge</Badge>);
            expect(screen.getByText('Badge')).toHaveClass('custom-class');
        });

        it('applies custom styles through sx prop', () => {
            render(
                <Badge
                    sx={{
                        backgroundColor: 'rgb(0, 0, 255)',
                        padding: '20px'
                    }}
                >
                    Styled Badge
                </Badge>
            );

            const badge = screen.getByText('Styled Badge');
            const computedStyle = window.getComputedStyle(badge);
            expect(computedStyle.backgroundColor).toBe('rgb(0, 0, 255)');
            expect(computedStyle.padding).toBe('20px');
        });

        it('applies pseudo-class styles', () => {
            render(
                <Badge
                    sx={{
                        '&:hover': { backgroundColor: 'blue' }
                    }}
                >
                    Hover Badge
                </Badge>
            );

            const styleTag = document.querySelector('style');
            expect(styleTag?.textContent).toContain('background-color: blue');
        });
    });
}); 