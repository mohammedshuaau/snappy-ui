import {fireEvent, render, screen, waitFor} from '@testing-library/react';
import {vi} from 'vitest';
import {Select} from './Select';

describe('Select', () => {
  const mockOptions = [
    { label: 'Option 1', value: '1' },
    { label: 'Option 2', value: '2' },
    { label: 'Option 3', value: '3', disabled: true },
  ];

  const mockOnChange = vi.fn();

  beforeEach(() => {
    mockOnChange.mockClear();
  });

  it('renders with default props', () => {
    render(<Select options={mockOptions} />);
    expect(screen.getByText('Select option')).toBeInTheDocument();
  });

  it('renders with label and required indicator', () => {
    render(<Select options={mockOptions} label="Choose an option" required />);
    expect(screen.getByText('Choose an option')).toBeInTheDocument();
    expect(screen.getByText('*')).toHaveClass('text-red-500');
  });

  it('shows options when clicked', async () => {
    render(<Select options={mockOptions} />);
    const trigger = screen.getByText('Select option');
    
    fireEvent.click(trigger);
    await waitFor(() => {
      expect(screen.getByText('Option 1')).toBeInTheDocument();
      expect(screen.getByText('Option 2')).toBeInTheDocument();
      expect(screen.getByText('Option 3')).toBeInTheDocument();
    });
  });

  it('handles single selection', async () => {
    render(<Select options={mockOptions} onChange={mockOnChange} />);
    const trigger = screen.getByText('Select option');
    
    fireEvent.click(trigger);
    await waitFor(() => {
      const option = screen.getByText('Option 1');
      fireEvent.click(option);
    });
    
    expect(mockOnChange).toHaveBeenCalledWith('1');
    expect(screen.getByText('Option 1')).toBeInTheDocument();
  });

  it('handles multiple selection', async () => {
    const selectedValues: string[] = [];
    const handleChange = (value: string | string[]) => {
      if (Array.isArray(value)) {
        selectedValues.push(...value.filter(v => !selectedValues.includes(v)));
      }
      mockOnChange(value);
    };

    render(<Select options={mockOptions} multiple onChange={handleChange} value={selectedValues} />);
    const trigger = screen.getByText('Select option');
    
    fireEvent.click(trigger);
    await waitFor(() => {
      const option1 = screen.getByText('Option 1');
      fireEvent.click(option1);
    });
    
    // Verify first selection
    expect(mockOnChange).toHaveBeenLastCalledWith(['1']);
    
    // Select second option
    fireEvent.click(trigger);
    await waitFor(() => {
      const option2 = screen.getByText('Option 2');
      fireEvent.click(option2);
    });
    
    // Verify both selections
    expect(mockOnChange).toHaveBeenLastCalledWith(['1', '2']);
  });

  it('respects disabled state', () => {
    render(<Select options={mockOptions} disabled />);
    const trigger = screen.getByText('Select option');
    expect(trigger.parentElement).toHaveAttribute('aria-disabled', 'true');
  });

  it('respects disabled options', async () => {
    render(<Select options={mockOptions} onChange={mockOnChange} />);
    const trigger = screen.getByText('Select option');
    
    fireEvent.click(trigger);
    await waitFor(() => {
      const disabledOption = screen.getByText('Option 3').closest('[role="option"]');
      expect(disabledOption).toHaveAttribute('data-disabled', 'true');
      fireEvent.click(disabledOption!);
    });
    
    expect(mockOnChange).not.toHaveBeenCalled();
  });

  it('shows error state and message', () => {
    render(<Select options={mockOptions} error="Please select an option" />);
    expect(screen.getByText('Please select an option')).toBeInTheDocument();
    const trigger = screen.getByText('Select option');
    expect(trigger.parentElement).toHaveClass('border-red-300');
  });

  it('closes dropdown when clicking outside', async () => {
    render(<Select options={mockOptions} />);
    const trigger = screen.getByText('Select option');
    
    fireEvent.click(trigger);
    await waitFor(() => {
      expect(screen.getByText('Option 1')).toBeInTheDocument();
    });
    
    fireEvent.mouseDown(document.body);
    await waitFor(() => {
      expect(screen.queryByText('Option 1')).not.toBeInTheDocument();
    });
  });

  it('applies custom styles using sx prop', () => {
    const { container } = render(
      <Select
        options={mockOptions}
        sx={{
          backgroundColor: 'red',
          '&:hover': { backgroundColor: 'blue' }
        }}
      />
    );
    
    const select = container.querySelector('[role="combobox"]');
    expect(select).toBeInTheDocument();
    expect(select?.className).toContain('bg-white'); // Default style
  });
}); 