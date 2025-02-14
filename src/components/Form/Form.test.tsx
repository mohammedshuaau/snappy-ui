import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { vi } from 'vitest';
import { Form } from './Form';

describe('Form', () => {
  const mockOnSubmit = vi.fn();
  const mockOnError = vi.fn();

  beforeEach(() => {
    mockOnSubmit.mockClear();
    mockOnError.mockClear();
  });

  it('renders children correctly', () => {
    render(
      <Form>
        <div>Form Content</div>
      </Form>
    );
    expect(screen.getByText('Form Content')).toBeInTheDocument();
  });

  it('renders with custom className', () => {
    const { container } = render(
      <Form className="custom-class">
        <div>Form Content</div>
      </Form>
    );
    expect(container.querySelector('form')).toHaveClass('custom-class');
  });

  it('calls onSubmit when form is submitted with valid data', async () => {
    const { container } = render(
      <Form onSubmit={mockOnSubmit}>
        <input type="text" name="test" defaultValue="test value" />
        <button type="submit">Submit</button>
      </Form>
    );

    const form = container.querySelector('form');
    if (!form) throw new Error('Form not found');

    fireEvent.submit(form);
    await waitFor(() => {
      expect(mockOnSubmit).toHaveBeenCalled();
    });
  });

  it('applies custom styles using sx prop', () => {
    const { container } = render(
      <Form sx={{ backgroundColor: 'red' }}>
        <div>Form Content</div>
      </Form>
    );

    const form = container.querySelector('form');
    expect(form?.className).toMatch(/form-[a-z0-9]+/);
  });

  it('calls onInit with form methods', () => {
    const mockOnInit = vi.fn();
    render(
      <Form onInit={mockOnInit}>
        <div>Form Content</div>
      </Form>
    );

    expect(mockOnInit).toHaveBeenCalled();
    expect(mockOnInit.mock.calls[0][0]).toHaveProperty('handleSubmit');
  });
}); 