import {render, screen} from '@testing-library/react';
import {describe, expect, it} from 'vitest';
import {Divider} from './Divider';

describe('Divider', () => {
    it('renders with default props', () => {
        render(<Divider data-testid="divider" />);
        const divider = screen.getByTestId('divider');
        expect(divider).toBeInTheDocument();
        expect(divider).toHaveClass('border-[1px]', 'border-slate-200');
    });

    describe('orientation', () => {
        it('renders horizontal orientation correctly', () => {
            render(<Divider orientation="horizontal" data-testid="divider" />);
            const divider = screen.getByTestId('divider');
            expect(divider).toHaveClass('w-full');
            expect(divider).toHaveClass('transition-all');
            expect(divider).toHaveClass('duration-200');
        });

        it('renders vertical orientation correctly', () => {
            render(<Divider orientation="vertical" data-testid="divider" />);
            const divider = screen.getByTestId('divider');
            expect(divider).toHaveClass('h-full');
            expect(divider).toHaveClass('self-stretch');
            expect(divider).toHaveClass('transition-all');
            expect(divider).toHaveClass('duration-200');
        });
    });

    describe('variants', () => {
        const variants = {
            solid: '',
            dashed: 'border-dashed',
            dotted: 'border-dotted'
        } as const;

        Object.entries(variants).forEach(([variant, expectedClass]) => {
            it(`renders ${variant} variant correctly`, () => {
                render(<Divider variant={variant as keyof typeof variants} data-testid="divider" />);
                if (expectedClass) {
                    expect(screen.getByTestId('divider')).toHaveClass(expectedClass);
                }
            });
        });
    });

    describe('sizes', () => {
        const sizes = {
            thin: 'border-[0.5px]',
            regular: 'border-[1px]',
            thick: 'border-[2px]'
        } as const;

        Object.entries(sizes).forEach(([size, expectedClass]) => {
            it(`renders ${size} size correctly`, () => {
                render(<Divider size={size as keyof typeof sizes} data-testid="divider" />);
                expect(screen.getByTestId('divider')).toHaveClass(expectedClass);
            });
        });
    });

    describe('colors', () => {
        const colors = {
            default: 'border-slate-200',
            primary: 'border-primary-200',
            secondary: 'border-secondary-200',
            success: 'border-success-200',
            warning: 'border-warning-200',
            error: 'border-error-200'
        } as const;

        Object.entries(colors).forEach(([color, expectedClass]) => {
            it(`renders ${color} color correctly`, () => {
                render(<Divider color={color as keyof typeof colors} data-testid="divider" />);
                expect(screen.getByTestId('divider')).toHaveClass(expectedClass);
            });
        });
    });

    describe('spacing', () => {
        const spacings = {
            0: 'm-0',
            1: 'my-1',
            2: 'my-2',
            3: 'my-3',
            4: 'my-4',
            5: 'my-5',
            6: 'my-6',
            8: 'my-8',
            10: 'my-10',
            12: 'my-12',
            16: 'my-16'
        } as const;

        Object.entries(spacings).forEach(([spacing, expectedClass]) => {
            it(`applies ${spacing} spacing correctly`, () => {
                render(<Divider spacing={Number(spacing) as keyof typeof spacings} data-testid="divider" />);
                expect(screen.getByTestId('divider')).toHaveClass(expectedClass);
            });
        });
    });

    describe('label', () => {
        it('renders with text label', () => {
            render(<Divider label="Divider Label" />);
            expect(screen.getByText('Divider Label')).toBeInTheDocument();
        });

        it('renders with custom label component', () => {
            const CustomLabel = () => <span data-testid="custom-label">Custom Label</span>;
            render(<Divider label={<CustomLabel />} />);
            expect(screen.getByTestId('custom-label')).toBeInTheDocument();
        });

        it('renders two dividers when label is provided', () => {
            render(<Divider label="Label" data-testid="divider" />);
            const dividers = screen.getAllByRole('separator');
            expect(dividers).toHaveLength(2);
        });

        it('applies correct styles to label container', () => {
            render(<Divider label="Label" orientation="horizontal" />);
            const labelContainer = screen.getByText('Label').parentElement;
            expect(labelContainer).toHaveClass('flex', 'items-center', 'w-full');
        });

        it('applies vertical styles to label container when orientation is vertical', () => {
            render(<Divider label="Label" orientation="vertical" />);
            const labelContainer = screen.getByText('Label').parentElement;
            expect(labelContainer).toHaveClass('flex-col', 'h-full');
        });
    });

    describe('as prop', () => {
        it('renders as a different HTML element', () => {
            render(<Divider as="div" data-testid="divider" />);
            const divider = screen.getByTestId('divider');
            expect(divider.tagName.toLowerCase()).toBe('div');
        });

        it('renders as hr by default', () => {
            render(<Divider data-testid="divider" />);
            const divider = screen.getByTestId('divider');
            expect(divider.tagName.toLowerCase()).toBe('hr');
        });
    });

    describe('styling', () => {
        it('applies custom className', () => {
            render(<Divider className="custom-class" data-testid="divider" />);
            expect(screen.getByTestId('divider')).toHaveClass('custom-class');
        });

        it('applies custom styles through sx prop', () => {
            render(
                <Divider
                    sx={{
                        backgroundColor: 'rgb(0, 0, 255)',
                        height: '20px'
                    }}
                    data-testid="divider"
                />
            );

            const divider = screen.getByTestId('divider');
            const computedStyle = window.getComputedStyle(divider);
            expect(computedStyle.backgroundColor).toBe('rgb(0, 0, 255)');
            expect(computedStyle.height).toBe('20px');
        });

        it('applies pseudo-class styles', () => {
            render(
                <Divider
                    sx={{
                        '&:hover': { backgroundColor: 'blue' }
                    }}
                    data-testid="divider"
                />
            );

            const styleTag = document.querySelector('style');
            expect(styleTag?.textContent).toContain('background-color: blue');
        });
    });
}); 