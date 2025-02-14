import {fireEvent, render, screen} from '@testing-library/react';
import {describe, expect, it, vi} from 'vitest';
import {NumberInput} from './NumberInput';

describe('NumberInput', () => {
    it('renders with default props', () => {
        render(<NumberInput data-testid="number-input" />);
        const input = screen.getByTestId('number-input');
        expect(input).toBeInTheDocument();
        expect(input).toHaveClass('w-full', 'rounded-md', 'border');
    });

    it('renders label when provided', () => {
        render(<NumberInput label="Test Label" />);
        expect(screen.getByText('Test Label')).toBeInTheDocument();
    });

    it('renders helper text when provided', () => {
        render(<NumberInput helperText="Helper Text" />);
        expect(screen.getByText('Helper Text')).toBeInTheDocument();
    });

    describe('variants', () => {
        it('renders default variant correctly', () => {
            render(<NumberInput variant="default" data-testid="number-input" />);
            const input = screen.getByTestId('number-input');
            expect(input).toHaveClass('border-slate-200', 'bg-white', 'text-slate-900');
        });

        it('renders error variant correctly', () => {
            render(<NumberInput variant="error" data-testid="number-input" />);
            const input = screen.getByTestId('number-input');
            expect(input).toHaveClass('border-red-500', 'bg-white', 'text-slate-900');
        });
    });

    describe('sizes', () => {
        it('renders default size correctly', () => {
            render(<NumberInput size="default" data-testid="number-input" />);
            const input = screen.getByTestId('number-input');
            expect(input).toHaveClass('h-10', 'px-3', 'py-2');
        });

        it('renders small size correctly', () => {
            render(<NumberInput size="sm" data-testid="number-input" />);
            const input = screen.getByTestId('number-input');
            expect(input).toHaveClass('h-8', 'px-2', 'py-1', 'text-xs');
        });

        it('renders large size correctly', () => {
            render(<NumberInput size="lg" data-testid="number-input" />);
            const input = screen.getByTestId('number-input');
            expect(input).toHaveClass('h-12', 'px-4', 'py-3', 'text-base');
        });
    });

    describe('stepper buttons', () => {
        it('renders stepper buttons when showStepper is true', () => {
            render(<NumberInput showStepper data-testid="number-input" />);
            const buttons = screen.getAllByRole('button');
            expect(buttons).toHaveLength(2);
            expect(buttons[0]).toHaveClass('rounded-tr-md'); // Increment button
            expect(buttons[1]).toHaveClass('rounded-br-md'); // Decrement button
        });

        it('increments value when increment button is clicked', () => {
            const onChange = vi.fn();
            render(<NumberInput showStepper defaultValue={5} onChange={onChange} data-testid="number-input" />);

            const buttons = screen.getAllByRole('button');
            fireEvent.click(buttons[0]); // Click increment button
            expect(screen.getByTestId('number-input')).toHaveValue('6');
        });

        it('decrements value when decrement button is clicked', () => {
            const onChange = vi.fn();
            render(<NumberInput showStepper defaultValue={5} onChange={onChange} data-testid="number-input" />);

            const buttons = screen.getAllByRole('button');
            fireEvent.click(buttons[1]); // Click decrement button
            expect(screen.getByTestId('number-input')).toHaveValue('4');
        });

        it('respects min and max values', () => {
            render(
                <NumberInput
                    showStepper
                    defaultValue={5}
                    min={0}
                    max={10}
                    data-testid="number-input"
                />
            );

            const input = screen.getByTestId('number-input');
            const buttons = screen.getAllByRole('button');
            const incrementBtn = buttons[0];
            const decrementBtn = buttons[1];

            // Test max value
            for (let i = 0; i < 10; i++) {
                fireEvent.click(incrementBtn);
            }
            expect(input).toHaveValue('10');

            // Test min value
            for (let i = 0; i < 15; i++) {
                fireEvent.click(decrementBtn);
            }
            expect(input).toHaveValue('0');
        });
    });

    describe('currency formatting', () => {
        it('formats currency values correctly', () => {
            render(
                <NumberInput
                    isCurrency
                    currencySymbol="$"
                    defaultValue={1234.56}
                    data-testid="number-input"
                />
            );
            expect(screen.getByTestId('number-input')).toHaveValue('$1,234.56');
        });

        it('handles custom currency symbol', () => {
            render(
                <NumberInput
                    isCurrency
                    currencySymbol="€"
                    defaultValue={1234.56}
                    data-testid="number-input"
                />
            );
            expect(screen.getByTestId('number-input')).toHaveValue('€1,234.56');
        });

        it('respects decimal places setting', () => {
            render(
                <NumberInput
                    isCurrency
                    decimalPlaces={3}
                    defaultValue={1234.5678}
                    data-testid="number-input"
                />
            );
            expect(screen.getByTestId('number-input')).toHaveValue('$1,234.568');
        });

        it('handles custom separators', () => {
            render(
                <NumberInput
                    isCurrency
                    thousandsSeparator="."
                    decimalSeparator=","
                    defaultValue={1234.56}
                    data-testid="number-input"
                />
            );
            expect(screen.getByTestId('number-input')).toHaveValue('$1.234,56');
        });
    });

    describe('keyboard interaction', () => {
        it('allows numeric input', () => {
            render(<NumberInput data-testid="number-input" />);
            const input = screen.getByTestId('number-input');

            fireEvent.change(input, { target: { value: '123' } });
            expect(input).toHaveValue('123');
        });

        it('allows negative numbers', () => {
            render(<NumberInput data-testid="number-input" />);
            const input = screen.getByTestId('number-input');

            fireEvent.change(input, { target: { value: '-123' } });
            expect(input).toHaveValue('-123');
        });

        it('allows decimal numbers', () => {
            render(<NumberInput data-testid="number-input" />);
            const input = screen.getByTestId('number-input');

            fireEvent.change(input, { target: { value: '123.45' } });
            expect(input).toHaveValue('123.45');
        });

        it('prevents invalid input', () => {
            render(<NumberInput data-testid="number-input" />);
            const input = screen.getByTestId('number-input');

            fireEvent.change(input, { target: { value: 'abc' } });
            expect(input).toHaveValue('');
        });
    });

    describe('styling', () => {
        it('applies custom className', () => {
            render(<NumberInput className="custom-class" data-testid="number-input" />);
            expect(screen.getByTestId('number-input')).toHaveClass('custom-class');
        });

        it('applies custom styles through sx prop', () => {
            render(
                <NumberInput
                    sx={{
                        backgroundColor: 'rgb(0, 0, 255)',
                        padding: '20px'
                    }}
                    data-testid="number-input"
                />
            );

            const input = screen.getByTestId('number-input');
            const computedStyle = window.getComputedStyle(input);
            expect(computedStyle.backgroundColor).toBe('rgb(0, 0, 255)');
            expect(computedStyle.padding).toBe('20px');
        });
    });
});
