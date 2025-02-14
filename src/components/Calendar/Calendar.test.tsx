import {fireEvent, render, screen} from '@testing-library/react';
import {vi} from 'vitest';
import {Calendar} from './Calendar';

describe('Calendar', () => {
  const mockOnSelect = vi.fn();
  const mockOnMonthChange = vi.fn();

  beforeEach(() => {
    mockOnSelect.mockClear();
    mockOnMonthChange.mockClear();
  });

  it('renders with default props', () => {
    render(<Calendar />);
    expect(screen.getByRole('button', { name: /today/i })).toBeInTheDocument();
  });

  it('displays current month and year', () => {
    const date = new Date(2024, 2, 15); // March 15, 2024
    render(<Calendar month={date} />);
    expect(screen.getByText('March 2024')).toBeInTheDocument();
  });

  it('handles date selection', () => {
    const date = new Date(2024, 2, 15);
    render(<Calendar month={date} onSelect={mockOnSelect} />);
    
    fireEvent.click(screen.getByText('15'));
    expect(mockOnSelect).toHaveBeenCalled();
  });

  it('navigates between months', () => {
    const date = new Date(2024, 2, 15);
    render(<Calendar month={date} onMonthChange={mockOnMonthChange} />);
    
    fireEvent.click(screen.getByLabelText('Next month'));
    expect(mockOnMonthChange).toHaveBeenCalled();
  });

  it('displays events when provided', () => {
    const date = new Date(2024, 2, 15);
    const events = [{
      id: '1',
      title: 'Meeting',
      date: new Date(2024, 2, 15),
      color: 'blue'
    }];

    render(<Calendar month={date} events={events} />);
    expect(screen.getByRole('button', { name: /event: meeting/i })).toBeInTheDocument();
  });

  it('applies variant styles', () => {
    const { container } = render(<Calendar variant="minimal" />);
    expect(container.firstChild).toHaveClass('border-0', 'shadow-none');
  });

  it('handles disabled dates', () => {
    const date = new Date(2024, 2, 15);
    const minDate = new Date(2024, 2, 10);
    const maxDate = new Date(2024, 2, 20);

    render(
      <Calendar
        month={date}
        minDate={minDate}
        maxDate={maxDate}
        onSelect={mockOnSelect}
      />
    );

    // Find all date cells and click the first one that's disabled
    const disabledCell = screen.getAllByText('5')[0].closest('div');
    fireEvent.click(disabledCell!);
    expect(mockOnSelect).not.toHaveBeenCalled();
  });
}); 