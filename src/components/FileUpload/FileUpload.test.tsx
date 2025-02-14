import {fireEvent, render, screen} from '@testing-library/react';
import {vi} from 'vitest';
import {FileUpload} from './FileUpload';

describe('FileUpload', () => {
  const mockOnChange = vi.fn();

  beforeEach(() => {
    mockOnChange.mockClear();
  });

  it('renders with default props', () => {
    render(<FileUpload />);
    expect(screen.getByText(/drag and drop files here/i)).toBeInTheDocument();
    expect(screen.getByText(/browse/i)).toBeInTheDocument();
  });

  it('renders with label and helper text', () => {
    render(
      <FileUpload
        label="Upload Files"
        helperText="Max size: 5MB"
      />
    );
    expect(screen.getByText('Upload Files')).toBeInTheDocument();
    expect(screen.getByText('Max size: 5MB')).toBeInTheDocument();
  });

  it('handles file selection', () => {
    const { container } = render(<FileUpload onChange={mockOnChange} />);
    const file = new File(['test'], 'test.txt', { type: 'text/plain' });
    const input = container.querySelector('input[type="file"]');
    
    if (!input) throw new Error('File input not found');
    fireEvent.change(input, { target: { files: [file] } });
    expect(mockOnChange).toHaveBeenCalledWith([file]);
  });
}); 