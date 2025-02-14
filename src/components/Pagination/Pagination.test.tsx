import {fireEvent, render, screen} from '@testing-library/react';
import {vi} from 'vitest';
import {Pagination} from './Pagination';

describe('Pagination', () => {
  const onPageChange = vi.fn();

  beforeEach(() => {
    onPageChange.mockClear();
  });

  it('renders with default props', () => {
    render(
      <Pagination
        totalPages={5}
        currentPage={1}
        onPageChange={onPageChange}
      />
    );
    expect(screen.getByRole('navigation')).toBeInTheDocument();
  });

  it('shows correct page numbers', () => {
    render(
      <Pagination
        totalPages={5}
        currentPage={1}
        onPageChange={onPageChange}
      />
    );
    
    expect(screen.getByText('1')).toBeInTheDocument();
    expect(screen.getByText('2')).toBeInTheDocument();
    expect(screen.getByText('5')).toBeInTheDocument();
  });

  it('handles page changes', () => {
    render(
      <Pagination
        totalPages={5}
        currentPage={1}
        onPageChange={onPageChange}
      />
    );
    
    fireEvent.click(screen.getByText('2'));
    expect(onPageChange).toHaveBeenCalledWith(2);
  });

  it('disables first/prev buttons on first page', () => {
    render(
      <Pagination
        totalPages={5}
        currentPage={1}
        onPageChange={onPageChange}
        showFirstLast
        showPrevNext
      />
    );
    
    const firstButton = screen.getByLabelText('Go to first page');
    const prevButton = screen.getByLabelText('Go to previous page');
    
    expect(firstButton).toBeDisabled();
    expect(prevButton).toBeDisabled();
  });

  it('disables last/next buttons on last page', () => {
    render(
      <Pagination
        totalPages={5}
        currentPage={5}
        onPageChange={onPageChange}
        showFirstLast
        showPrevNext
      />
    );
    
    const lastButton = screen.getByLabelText('Go to last page');
    const nextButton = screen.getByLabelText('Go to next page');
    
    expect(lastButton).toBeDisabled();
    expect(nextButton).toBeDisabled();
  });

  it('applies different sizes', () => {
    const { rerender } = render(
      <Pagination
        totalPages={5}
        currentPage={1}
        onPageChange={onPageChange}
        size="sm"
      />
    );
    expect(screen.getByRole('navigation')).toHaveClass('gap-1');

    rerender(
      <Pagination
        totalPages={5}
        currentPage={1}
        onPageChange={onPageChange}
        size="lg"
      />
    );
    expect(screen.getByRole('navigation')).toHaveClass('gap-3');
  });

  it('shows correct number of siblings', () => {
    render(
      <Pagination
        totalPages={10}
        currentPage={5}
        onPageChange={onPageChange}
        siblingCount={2}
      />
    );
    
    expect(screen.getByText('3')).toBeInTheDocument();
    expect(screen.getByText('4')).toBeInTheDocument();
    expect(screen.getByText('5')).toBeInTheDocument();
    expect(screen.getByText('6')).toBeInTheDocument();
    expect(screen.getByText('7')).toBeInTheDocument();
  });
}); 