import {render, screen} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import {describe, expect, it, vi} from 'vitest';
import {Button} from './Button';

describe('Button', () => {
    it('renders with default props', () => {
        render(<Button>Click me</Button>);
        const button = screen.getByRole('button', { name: /click me/i });

        expect(button).toBeInTheDocument();
        expect(button).toHaveClass('inline-flex', 'bg-primary-600');
    });

    describe('variants', () => {
        const variants = {
            default: 'bg-primary-600',
            destructive: 'bg-red-600',
            outline: 'border-primary-200',
            secondary: 'bg-secondary-200',
            ghost: 'bg-transparent',
            link: 'underline-offset-4'
        } as const;

        Object.entries(variants).forEach(([variant, expectedClass]) => {
            it(`renders ${variant} variant correctly`, () => {
                render(<Button variant={variant as keyof typeof variants}>Button</Button>);
                const button = screen.getByRole('button');
                expect(button).toHaveClass(expectedClass);
            });
        });
    });

    describe('sizes', () => {
        const sizes = {
            default: 'h-10 px-4 py-2',
            sm: 'h-8 px-3 py-1 text-xs',
            lg: 'h-12 px-8 py-3 text-base',
            icon: 'h-10 w-10 p-2'
        } as const;

        Object.entries(sizes).forEach(([size, expectedClass]) => {
            it(`renders ${size} size correctly`, () => {
                render(<Button size={size as keyof typeof sizes}>Button</Button>);
                const button = screen.getByRole('button');
                expectedClass.split(' ').forEach(className => {
                    expect(button).toHaveClass(className);
                });
            });
        });
    });

    it('renders full width when fullWidth is true', () => {
        render(<Button fullWidth>Button</Button>);
        expect(screen.getByRole('button')).toHaveClass('w-full');
    });

    describe('loading state', () => {
        it('shows loading spinner and disables button when loading', () => {
            render(<Button loading>Click me</Button>);
            const button = screen.getByRole('button');
            const spinner = screen.getByTestId('loading-spinner');

            expect(button).toBeDisabled();
            expect(spinner).toBeInTheDocument();
            expect(spinner.querySelector('svg')).toHaveClass('animate-spin');
        });

        it('hides right icon when loading', () => {
            render(
                <Button loading rightIcon={<span data-testid="right-icon">→</span>}>
                    Next
                </Button>
            );

            expect(screen.queryByTestId('right-icon')).not.toBeInTheDocument();
        });
    });

    describe('icons', () => {
        it('renders with left icon', () => {
            render(
                <Button leftIcon={<span data-testid="left-icon">←</span>}>
                    Previous
                </Button>
            );

            expect(screen.getByTestId('left-icon')).toBeInTheDocument();
            expect(screen.getByTestId('left-icon').parentElement).toHaveClass('mr-2');
        });

        it('renders with right icon', () => {
            render(
                <Button rightIcon={<span data-testid="right-icon">→</span>}>
                    Next
                </Button>
            );

            expect(screen.getByTestId('right-icon')).toBeInTheDocument();
            expect(screen.getByTestId('right-icon').parentElement).toHaveClass('ml-2');
        });
    });

    describe('interaction', () => {
        it('handles click events', async () => {
            const handleClick = vi.fn();
            const user = userEvent.setup();

            render(<Button onClick={handleClick}>Click me</Button>);
            await user.click(screen.getByRole('button'));

            expect(handleClick).toHaveBeenCalledTimes(1);
        });

        it('does not trigger click when disabled', async () => {
            const handleClick = vi.fn();
            const user = userEvent.setup();

            render(<Button disabled onClick={handleClick}>Click me</Button>);
            await user.click(screen.getByRole('button'));

            expect(handleClick).not.toHaveBeenCalled();
        });
    });

    describe('styling', () => {
        it('applies custom className', () => {
            render(<Button className="custom-test">Button</Button>);
            expect(screen.getByRole('button')).toHaveClass('custom-test');
        });

        it('applies base styles from sx prop', () => {
            render(
                <Button
                    sx={{
                        backgroundColor: 'red',
                        padding: '20px'
                    }}
                    data-testid="styled-button"
                >
                    Styled Button
                </Button>
            );

            const button = screen.getByTestId('styled-button');
            const computedStyle = window.getComputedStyle(button);
            expect(computedStyle.backgroundColor).toBe('rgb(255, 0, 0)');
            expect(computedStyle.padding).toBe('20px');
        });

        it('generates pseudo-class styles', () => {
            render(
                <Button
                    sx={{
                        '&:hover': { backgroundColor: 'blue' }
                    }}
                >
                    Hover Button
                </Button>
            );

            // Check if style tag was created
            const styleTag = document.querySelector('style');
            expect(styleTag).toBeInTheDocument();
            expect(styleTag?.textContent).toContain('background-color: blue');
        });
    });
}); 