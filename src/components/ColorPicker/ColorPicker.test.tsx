import {fireEvent, render, screen} from '@testing-library/react';
import {describe, expect, it, vi} from 'vitest';
import {FormProvider, useForm} from 'react-hook-form';
import {ColorPicker} from './ColorPicker';

// Default colors from the component
const DEFAULT_COLORS = [
    '#000000', '#ffffff', '#f44336', '#e91e63', '#9c27b0', '#673ab7',
    '#3f51b5', '#2196f3', '#03a9f4', '#00bcd4', '#009688', '#4caf50',
    '#8bc34a', '#cddc39', '#ffeb3b', '#ffc107', '#ff9800', '#ff5722',
];

describe('ColorPicker', () => {
    it('renders with default props', () => {
        render(<ColorPicker />);
        expect(screen.getByRole('textbox')).toBeInTheDocument();
        expect(screen.getByRole('textbox')).toHaveValue('#000000');
    });

    it('renders with label', () => {
        render(<ColorPicker label="Brand Color" />);
        expect(screen.getByText('Brand Color')).toBeInTheDocument();
    });

    it('renders with helper text', () => {
        render(<ColorPicker helperText="Select a color" />);
        expect(screen.getByText('Select a color')).toBeInTheDocument();
    });

    it('opens color picker on click', () => {
        render(<ColorPicker />);
        fireEvent.click(screen.getByRole('textbox'));
        expect(screen.getAllByRole('button')).toHaveLength(DEFAULT_COLORS.length); // Default color buttons
    });

    it('handles color selection', () => {
        const onChange = vi.fn();
        render(<ColorPicker onChange={onChange} />);

        fireEvent.click(screen.getByRole('textbox'));
        const colorButtons = screen.getAllByRole('button');
        fireEvent.click(colorButtons[1]); // Click second color

        expect(onChange).toHaveBeenCalledWith('#ffffff'); // Second color in DEFAULT_COLORS
    });

    it('handles custom color input', () => {
        const onChange = vi.fn();
        render(<ColorPicker onChange={onChange} />);

        fireEvent.click(screen.getByRole('textbox'));
        const customInput = screen.getAllByRole('textbox')[1]; // Second textbox is custom color input

        fireEvent.change(customInput, { target: { value: '#ff0000' } });
        expect(onChange).toHaveBeenCalledWith('#ff0000');
    });

    it('renders in disabled state', () => {
        render(<ColorPicker disabled />);
        expect(screen.getByRole('textbox')).toBeDisabled();
    });

    describe('sizes', () => {
        it('renders small size correctly', () => {
            render(<ColorPicker size="sm" />);
            expect(screen.getByRole('textbox').parentElement).toHaveClass('h-8');
        });

        it('renders default size correctly', () => {
            render(<ColorPicker size="default" />);
            expect(screen.getByRole('textbox').parentElement).toHaveClass('h-10');
        });

        it('renders large size correctly', () => {
            render(<ColorPicker size="lg" />);
            expect(screen.getByRole('textbox').parentElement).toHaveClass('h-12');
        });
    });

    describe('variants', () => {
        it('renders default variant correctly', () => {
            render(<ColorPicker variant="default" />);
            expect(screen.getByRole('textbox').parentElement).toHaveClass('border-slate-200');
        });

        it('renders error variant correctly', () => {
            render(<ColorPicker variant="error" />);
            expect(screen.getByRole('textbox').parentElement).toHaveClass('border-red-500');
        });
    });

    describe('form integration', () => {
        const TestForm = () => {
            const methods = useForm({
                defaultValues: {
                    color: '#000000'
                }
            });

            return (
                <FormProvider {...methods}>
                    <form>
                        <ColorPicker name="color" />
                    </form>
                </FormProvider>
            );
        };

        it('integrates with react-hook-form', () => {
            render(<TestForm />);
            expect(screen.getByRole('textbox')).toHaveValue('#000000');
        });
    });

    it('applies custom styles through sx prop', () => {
        render(
            <ColorPicker
                sx={{
                    backgroundColor: 'rgb(0, 0, 255)',
                    padding: '20px'
                }}
            />
        );

        const colorPicker = screen.getByRole('textbox').parentElement;
        const computedStyle = window.getComputedStyle(colorPicker as HTMLElement);
        expect(computedStyle.backgroundColor).toBe('rgb(0, 0, 255)');
        expect(computedStyle.padding).toBe('20px');
    });
}); 