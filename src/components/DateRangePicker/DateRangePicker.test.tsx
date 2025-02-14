import {fireEvent, render, screen} from '@testing-library/react';
import {describe, expect, it, vi} from 'vitest';
import {DateRangePicker} from './DateRangePicker';

describe('DateRangePicker', () => {
    it('renders with default props', () => {
        render(<DateRangePicker />);
        expect(screen.getByRole('textbox')).toBeInTheDocument();
    });

    it('renders with label', () => {
        render(<DateRangePicker label="Test Label" />);
        expect(screen.getByText('Test Label')).toBeInTheDocument();
    });

    it('renders with helper text', () => {
        render(<DateRangePicker helperText="Help text" name="date" />);
        expect(screen.getByText('Help text')).toBeInTheDocument();
    });

    it('opens calendar on click', () => {
        render(<DateRangePicker />);
        fireEvent.click(screen.getByRole('textbox'));
        expect(screen.getByText(/January|February|March|April|May|June|July|August|September|October|November|December/)).toBeInTheDocument();
    });

    it('handles date selection', () => {
        const onChange = vi.fn();
        render(<DateRangePicker onChange={onChange} />);

        fireEvent.click(screen.getByRole('textbox'));
        const dayButtons = screen.getAllByRole('button').slice(2); // Skip prev/next month buttons
        fireEvent.click(dayButtons[15]); // Click a day in the middle of the month

        expect(onChange).toHaveBeenCalled();
    });

    it('disables the input when disabled prop is true', () => {
        render(<DateRangePicker disabled />);
        expect(screen.getByRole('textbox')).toBeDisabled();
    });

    it('applies error styles when variant is error', () => {
        render(<DateRangePicker variant="error" />);
        expect(screen.getByRole('textbox')).toHaveClass('border-red-500');
    });
}); 