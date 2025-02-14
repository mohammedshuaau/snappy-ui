import React from 'react';
import {fireEvent, render, screen} from '@testing-library/react';
import {vi} from 'vitest';
import {Textarea} from './Textarea';

describe('Textarea', () => {
  it('renders with default props', () => {
    const { container } = render(<Textarea />);
    const textarea = container.querySelector('textarea');
    expect(textarea).toBeInTheDocument();
    expect(textarea).toHaveClass('min-h-[80px]'); // default size
  });

  it('renders with label and required indicator', () => {
    render(<Textarea label="Message" required />);
    expect(screen.getByText('Message')).toBeInTheDocument();
    expect(screen.getByText('*')).toHaveClass('text-red-500');
  });

  it('renders with error state and message', () => {
    render(<Textarea error="This field is required" />);
    const textarea = screen.getByRole('textbox');
    const errorMessage = screen.getByText('This field is required');
    
    expect(textarea).toHaveAttribute('aria-invalid', 'true');
    expect(errorMessage).toHaveClass('text-red-500');
  });

  it('handles different sizes', () => {
    const { rerender, container } = render(<Textarea size="sm" />);
    let textarea = container.querySelector('textarea');
    expect(textarea).toHaveClass('min-h-[60px]');

    rerender(<Textarea size="lg" />);
    textarea = container.querySelector('textarea');
    expect(textarea).toHaveClass('min-h-[120px]');
  });

  it('applies custom styles using sx prop', () => {
    const { container } = render(
      <Textarea
        sx={{
          backgroundColor: 'red',
          '&:hover': { backgroundColor: 'blue' }
        }}
      />
    );
    
    const textarea = container.querySelector('textarea');
    expect(textarea?.className).toMatch(/textarea-[a-z0-9]+/);
  });

  it('handles disabled state', () => {
    render(<Textarea disabled />);
    const textarea = screen.getByRole('textbox');
    expect(textarea).toBeDisabled();
    expect(textarea).toHaveClass('disabled:cursor-not-allowed');
  });

  it('handles value changes', () => {
    const handleChange = vi.fn();
    render(<Textarea onChange={handleChange} />);
    
    const textarea = screen.getByRole('textbox');
    fireEvent.change(textarea, { target: { value: 'New value' } });
    
    expect(handleChange).toHaveBeenCalled();
  });

  it('forwards ref correctly', () => {
    const ref = React.createRef<HTMLTextAreaElement>();
    render(<Textarea ref={ref} />);
    
    expect(ref.current).toBeInstanceOf(HTMLTextAreaElement);
  });

  it('handles placeholder text', () => {
    render(<Textarea placeholder="Enter your message" />);
    const textarea = screen.getByPlaceholderText('Enter your message');
    expect(textarea).toBeInTheDocument();
  });

  it('applies custom className correctly', () => {
    render(<Textarea className="custom-class" />);
    const textarea = screen.getByRole('textbox');
    expect(textarea).toHaveClass('custom-class');
  });
}); 