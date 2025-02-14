import {fireEvent, render, screen} from '@testing-library/react';
import {describe, expect, it, vi} from 'vitest';
import DateTimePicker from './DateTimePicker';

describe('DateTimePicker', () => {
    it('renders with default props', () => {
        render(<DateTimePicker />);
        expect(screen.getByRole('textbox')).toBeInTheDocument();
    });

    it('renders with label', () => {
        render(<DateTimePicker label="Test Label" />);
        expect(screen.getByText('Test Label')).toBeInTheDocument();
    });

    it('renders with helper text', () => {
        render(<DateTimePicker helperText="Help text" name="datetime" />);
        expect(screen.getByText('Help text')).toBeInTheDocument();
    });

    it('opens calendar on click', () => {
        render(<DateTimePicker />);
        fireEvent.click(screen.getByRole('textbox'));
        expect(screen.getByText(/January|February|March|April|May|June|July|August|September|October|November|December/)).toBeInTheDocument();
    });

    it('shows time picker after date selection', () => {
        render(<DateTimePicker />);
        fireEvent.click(screen.getByRole('textbox'));
        const dayButtons = screen.getAllByRole('button').slice(2); // Skip prev/next month buttons
        fireEvent.click(dayButtons[15]); // Click a day in the middle of the month
        expect(screen.getByText('Select Time')).toBeInTheDocument();
    });

    it('handles date and time selection', () => {
        const onChange = vi.fn();
        render(<DateTimePicker onChange={onChange} />);

        fireEvent.click(screen.getByRole('textbox'));
        const dayButtons = screen.getAllByRole('button').slice(2);
        fireEvent.click(dayButtons[15]); // Select date

        // Select time
        const timeButtons = screen.getAllByRole('button').filter(button => {
            const text = button.textContent;
            return text && /^\d{1,2}:\d{2}$/.test(text);
        });
        fireEvent.click(timeButtons[0]); // Select first time slot

        expect(onChange).toHaveBeenCalled();
    });

    it('disables the input when disabled prop is true', () => {
        render(<DateTimePicker disabled />);
        expect(screen.getByRole('textbox')).toBeDisabled();
    });

    it('applies error styles when variant is error', () => {
        render(<DateTimePicker variant="error" />);
        expect(screen.getByRole('textbox')).toHaveClass('border-red-500');
    });

    describe('time step', () => {
        it('generates time slots based on timeStep prop', () => {
            render(<DateTimePicker timeStep={60} />);
            fireEvent.click(screen.getByRole('textbox'));
            const dayButtons = screen.getAllByRole('button').slice(2);
            fireEvent.click(dayButtons[15]); // Select date

            const timeButtons = screen.getAllByRole('button').filter(button => {
                const text = button.textContent;
                return text && /^\d{1,2}:\d{2}$/.test(text);
            });

            expect(timeButtons).toHaveLength(24); // 24 hours with 60-minute step
        });
    });
}); 