import React from 'react';
import {fireEvent, render, screen} from '@testing-library/react';
import {vi} from 'vitest';
import {SnapKitToastContainer, ToastContent} from './Toast';

// Mock react-toastify
vi.mock('react-toastify', () => ({
  toast: {
    info: vi.fn(),
    success: vi.fn(),
    warning: vi.fn(),
    error: vi.fn(),
    dismiss: vi.fn(),
  },
  ToastContainer: ({ children }: { children?: React.ReactNode }) => (
    <div data-testid="toast-container">{children}</div>
  ),
  Slide: vi.fn(),
}));

describe('Toast', () => {
  it('renders ToastContainer with default props', () => {
    render(<SnapKitToastContainer />);
    expect(screen.getByTestId('toast-container')).toBeInTheDocument();
  });

  it('renders ToastContent with message', () => {
    render(
      <ToastContent
        message="Test message"
        variant="info"
      />
    );
    expect(screen.getByText('Test message')).toBeInTheDocument();
  });

  it('renders ToastContent with title and message', () => {
    render(
      <ToastContent
        title="Test Title"
        message="Test message"
        variant="success"
      />
    );
    expect(screen.getByText('Test Title')).toBeInTheDocument();
    expect(screen.getByText('Test message')).toBeInTheDocument();
  });

  it('renders ToastContent with different variants', () => {
    const { rerender } = render(
      <ToastContent message="Test message" variant="info" />
    );
    expect(screen.getByRole('alert')).toHaveClass('bg-blue-50/95');

    rerender(<ToastContent message="Test message" variant="success" />);
    expect(screen.getByRole('alert')).toHaveClass('bg-green-50/95');

    rerender(<ToastContent message="Test message" variant="warning" />);
    expect(screen.getByRole('alert')).toHaveClass('bg-yellow-50/95');

    rerender(<ToastContent message="Test message" variant="error" />);
    expect(screen.getByRole('alert')).toHaveClass('bg-red-50/95');
  });

  it('calls onClose when close button is clicked', () => {
    const onClose = vi.fn();
    render(
      <ToastContent
        message="Test message"
        variant="info"
        onClose={onClose}
      />
    );
    
    const closeButton = screen.getByRole('button', { name: /close toast/i });
    fireEvent.click(closeButton);
    expect(onClose).toHaveBeenCalled();
  });
}); 