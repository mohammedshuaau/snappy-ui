import {fireEvent, render, screen, waitFor} from '@testing-library/react';
import {vi} from 'vitest';
import {PasswordInput} from './PasswordInput';

describe('PasswordInput', () => {
  it('renders with default props', () => {
    const { container } = render(<PasswordInput />);
    const input = container.querySelector('input[type="password"]');
    expect(input).toBeInTheDocument();
  });

  it('renders with label and helper text', () => {
    render(
      <PasswordInput
        label="Password"
        helperText="Must be at least 8 characters"
      />
    );
    expect(screen.getByText('Password')).toBeInTheDocument();
    expect(screen.getByText('Must be at least 8 characters')).toBeInTheDocument();
  });

  it('toggles password visibility', () => {
    const { container } = render(<PasswordInput />);
    const input = container.querySelector('input');
    const toggleButton = screen.getByRole('button', { name: /show password/i });

    expect(input).toHaveAttribute('type', 'password');
    fireEvent.click(toggleButton);
    expect(input).toHaveAttribute('type', 'text');
    expect(screen.getByRole('button', { name: /hide password/i })).toBeInTheDocument();
  });

  it('shows password strength indicator when showStrength is true', async () => {
    const { container } = render(<PasswordInput showStrength />);
    const input = container.querySelector('input');
    
    expect(screen.getByText('Enter a password')).toBeInTheDocument();
    
    // Test weak password (8+ characters but only lowercase)
    if (!input) throw new Error('Input not found');
    fireEvent.change(input, { target: { value: 'weakpassword' } });
    await waitFor(() => {
      expect(screen.getByText('Weak')).toBeInTheDocument();
    });
    
    // Test strong password (8+ chars, uppercase, numbers, special chars)
    fireEvent.change(input, { target: { value: 'StrongP@ssw0rd' } });
    await waitFor(() => {
      expect(screen.getByText('Strong')).toBeInTheDocument();
    });
  });

  it('calls custom strengthCheck function when provided', async () => {
    const mockStrengthCheck = vi.fn().mockReturnValue(2);
    const { container } = render(<PasswordInput showStrength strengthCheck={mockStrengthCheck} />);
    
    const input = container.querySelector('input');
    if (!input) throw new Error('Input not found');
    
    fireEvent.change(input, { target: { value: 'test' } });
    await waitFor(() => {
      expect(mockStrengthCheck).toHaveBeenCalledWith('test');
      expect(screen.getByText('Fair')).toBeInTheDocument();
    });
  });

  it('handles onChange event', () => {
    const handleChange = vi.fn();
    const { container } = render(<PasswordInput onChange={handleChange} />);
    
    const input = container.querySelector('input');
    if (!input) throw new Error('Input not found');
    
    fireEvent.change(input, { target: { value: 'test' } });
    expect(handleChange).toHaveBeenCalled();
  });
}); 