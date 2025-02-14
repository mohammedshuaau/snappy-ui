import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { vi } from 'vitest';
import {TimePicker} from './TimePicker';
import { set } from 'date-fns';

describe('TimePicker', () => {
  const mockOnChange = vi.fn();

  beforeEach(() => {
    mockOnChange.mockClear();
  });

  it('renders with default props', () => {
    const { container } = render(<TimePicker />);
    const input = container.querySelector('input[type="time"]');
    expect(input).toBeInTheDocument();
  });

  it('renders with label and helper text', () => {
    render(
      <TimePicker
        label="Select Time"
        helperText="Choose a time between 9 AM and 5 PM"
      />
    );
    expect(screen.getByText('Select Time')).toBeInTheDocument();
    expect(screen.getByText('Choose a time between 9 AM and 5 PM')).toBeInTheDocument();
  });

  it('handles time selection', () => {
    const { container } = render(<TimePicker onChange={mockOnChange} />);
    const input = container.querySelector('input[type="time"]');
    if (!input) throw new Error('Input not found');

    fireEvent.change(input, { target: { value: '14:30' } });
    expect(mockOnChange).toHaveBeenCalled();
  });

  it('handles disabled state', () => {
    const { container } = render(<TimePicker disabled />);
    const input = container.querySelector('input[type="time"]');
    expect(input).toBeDisabled();
  });

  it('respects min and max time constraints', () => {
    const minTime = set(new Date(), { hours: 9, minutes: 0 });
    const maxTime = set(new Date(), { hours: 17, minutes: 0 });

    const { container } = render(
      <TimePicker
        minTime={minTime}
        maxTime={maxTime}
        onChange={mockOnChange}
      />
    );

    const input = container.querySelector('input[type="time"]');
    if (!input) throw new Error('Input not found');

    // Time before min
    fireEvent.change(input, { target: { value: '08:00' } });
    expect(mockOnChange).toHaveBeenCalledWith(minTime);

    // Time after max
    fireEvent.change(input, { target: { value: '18:00' } });
    expect(mockOnChange).toHaveBeenCalledWith(maxTime);
  });

  it('handles disabled times', () => {
    const disabledTime = set(new Date(), { hours: 12, minutes: 0 });
    const { container } = render(
      <TimePicker
        disabledTimes={[disabledTime]}
        onChange={mockOnChange}
      />
    );

    const input = container.querySelector('input[type="time"]');
    if (!input) throw new Error('Input not found');

    fireEvent.change(input, { target: { value: '12:00' } });
    expect(mockOnChange).not.toHaveBeenCalled();
  });

  it('shows time dropdown when showDropdown is true', async () => {
    const { container } = render(<TimePicker showDropdown />);
    const input = container.querySelector('input[type="time"]');
    if (!input) throw new Error('Input not found');

    fireEvent.click(input);
    await waitFor(() => {
      const timeOptions = container.querySelectorAll('[role="option"]');
      expect(timeOptions.length).toBeGreaterThan(0);
    });
  });

  it('handles step intervals correctly', () => {
    const { container } = render(<TimePicker step={60} showDropdown />);
    const input = container.querySelector('input[type="time"]');
    if (!input) throw new Error('Input not found');

    fireEvent.click(input);
    const timeSlots = screen.getAllByRole('option');

    // With step=60, we should have 24 time slots (one for each hour)
    expect(timeSlots).toHaveLength(24);
  });

  it('formats time according to specified format', () => {
    const time = set(new Date(), { hours: 14, minutes: 30 });
    const { container, rerender } = render(<TimePicker value={time} format="24h" />);

    const input = container.querySelector('input[type="time"]');
    expect(input).toHaveValue('14:30');

    rerender(<TimePicker value={time} format="12h" />);
    expect(input).toHaveValue('14:30'); // HTML time input always uses 24h format
  });

  it('applies custom styles using sx prop', () => {
    const { container } = render(
      <TimePicker
        sx={{
          backgroundColor: 'red',
          '&:hover': { backgroundColor: 'blue' }
        }}
      />
    );

    const input = container.querySelector('input');
    expect(input?.className).toMatch(/timepicker-[a-z0-9]+/);
  });
}); 