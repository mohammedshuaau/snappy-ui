import {render, screen} from '@testing-library/react';
import {describe, expect, it, vi} from 'vitest';
import {Icon} from './Icon';

// Mock console.warn to prevent warnings in tests
const originalWarn = console.warn;
beforeAll(() => {
    console.warn = vi.fn();
});
afterAll(() => {
    console.warn = originalWarn;
});

describe('Icon', () => {
    it('renders with default props', () => {
        render(<Icon name="IconHome" data-testid="icon" />);
        const icon = screen.getByTestId('icon');
        expect(icon).toBeInTheDocument();
        expect(icon).toHaveClass('text-slate-900', 'w-5', 'h-5', 'stroke-[1.5]');
    });

    describe('variants', () => {
        const variants = {
            default: 'text-slate-900',
            primary: 'text-primary-600',
            secondary: 'text-slate-600',
            success: 'text-green-600',
            warning: 'text-yellow-600',
            error: 'text-red-600'
        } as const;

        Object.entries(variants).forEach(([variant, expectedClass]) => {
            it(`renders ${variant} variant correctly`, () => {
                render(<Icon name="IconHome" variant={variant as keyof typeof variants} data-testid="icon" />);
                expect(screen.getByTestId('icon')).toHaveClass(expectedClass);
            });
        });
    });

    describe('sizes', () => {
        const sizes = {
            sm: ['w-4', 'h-4'],
            default: ['w-5', 'h-5'],
            lg: ['w-6', 'h-6'],
            xl: ['w-8', 'h-8']
        } as const;

        Object.entries(sizes).forEach(([size, expectedClasses]) => {
            it(`renders ${size} size correctly`, () => {
                render(<Icon name="IconHome" size={size as keyof typeof sizes} data-testid="icon" />);
                const icon = screen.getByTestId('icon');
                expectedClasses.forEach(className => {
                    expect(icon).toHaveClass(className);
                });
            });
        });
    });

    describe('stroke', () => {
        const strokes = {
            thin: 'stroke-[1]',
            default: 'stroke-[1.5]',
            medium: 'stroke-[1.75]',
            bold: 'stroke-[2]'
        } as const;

        Object.entries(strokes).forEach(([stroke, expectedClass]) => {
            it(`renders ${stroke} stroke correctly`, () => {
                render(<Icon name="IconHome" stroke={stroke as keyof typeof strokes} data-testid="icon" />);
                expect(screen.getByTestId('icon')).toHaveClass(expectedClass);
            });
        });
    });

    describe('icon rendering', () => {
        it('renders the correct icon from Tabler Icons', () => {
            render(<Icon name="IconHome" data-testid="icon" />);
            expect(screen.getByTestId('icon')).toBeInTheDocument();
            expect(screen.getByTestId('icon').tagName.toLowerCase()).toBe('svg');
        });

        it('returns null and warns when icon name is not found', () => {
            // @ts-expect-error - Testing invalid icon name
            render(<Icon name="NonExistentIcon" data-testid="icon" />);
            expect(screen.queryByTestId('icon')).not.toBeInTheDocument();
            expect(console.warn).toHaveBeenCalledWith('Icon "NonExistentIcon" not found in Tabler Icons');
        });
    });

    describe('styling', () => {
        it('applies custom className', () => {
            render(<Icon name="IconHome" className="custom-class" data-testid="icon" />);
            expect(screen.getByTestId('icon')).toHaveClass('custom-class');
        });

        it('applies custom styles through sx prop', () => {
            render(
                <Icon
                    name="IconHome"
                    sx={{
                        backgroundColor: 'rgb(0, 0, 255)',
                        padding: '20px'
                    }}
                    data-testid="icon"
                />
            );

            const icon = screen.getByTestId('icon');
            const computedStyle = window.getComputedStyle(icon);
            expect(computedStyle.backgroundColor).toBe('rgb(0, 0, 255)');
            expect(computedStyle.padding).toBe('20px');
        });
    });
}); 