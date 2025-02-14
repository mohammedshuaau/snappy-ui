import {fireEvent, render, screen} from '@testing-library/react';
import {Navbar} from './Navbar';

describe('Navbar', () => {
  it('renders with default props', () => {
    render(<Navbar />);
    expect(screen.getByRole('navigation')).toBeInTheDocument();
  });

  it('renders brand content', () => {
    render(
      <Navbar
        brand={<div>Brand</div>}
      />
    );
    expect(screen.getByText('Brand')).toBeInTheDocument();
  });

  it('renders center content', () => {
    render(
      <Navbar
        center={<div>Center</div>}
      />
    );
    expect(screen.getByText('Center')).toBeInTheDocument();
  });

  it('renders end content', () => {
    render(
      <Navbar
        end={<div>End</div>}
      />
    );
    expect(screen.getByText('End')).toBeInTheDocument();
  });

  it('handles collapsible state', () => {
    render(
      <Navbar
        collapsible
        brand={<div>Brand</div>}
        center={<div data-testid="desktop-center">Center Content</div>}
      />
    );

    // Initially collapsed on mobile
    const mobileMenu = screen.getByRole('navigation').querySelector('.overflow-hidden');
    expect(mobileMenu).toHaveClass('h-0');

    // Toggle menu
    const toggleButton = screen.getByRole('button');
    fireEvent.click(toggleButton);

    // Should be expanded after toggle
    expect(mobileMenu).not.toHaveClass('h-0');
  });

  it('applies floating variant styles', () => {
    render(
      <Navbar
        variant="floating"
      />
    );
    expect(screen.getByRole('navigation')).toHaveClass('rounded-lg shadow-lg');
  });

  it('applies different sizes', () => {
    const { rerender } = render(
      <Navbar
        size="sm"
      />
    );
    expect(screen.getByRole('navigation')).toHaveClass('h-12');

    rerender(
      <Navbar
        size="lg"
      />
    );
    expect(screen.getByRole('navigation')).toHaveClass('h-20');
  });
}); 