import {fireEvent, render} from '@testing-library/react';
import {vi} from 'vitest';
import {Image} from './Image';

// Mock IntersectionObserver
const mockIntersectionObserver = vi.fn();
mockIntersectionObserver.mockReturnValue({
  observe: () => null,
  unobserve: () => null,
  disconnect: () => null
});
window.IntersectionObserver = mockIntersectionObserver;

describe('Image', () => {
  it('renders with default props', () => {
    const { container } = render(
      <Image src="test.jpg" alt="Test image" />
    );
    const img = container.querySelector('img');
    expect(img).toBeInTheDocument();
    expect(img).toHaveAttribute('src', 'test.jpg');
    expect(img).toHaveAttribute('alt', 'Test image');
  });

  it('shows skeleton loader while loading', () => {
    const { container } = render(
      <Image src="test.jpg" alt="Test image" showSkeleton />
    );
    expect(container.querySelector('.animate-pulse')).toBeInTheDocument();
  });

  it('handles error state with fallback', () => {
    const { container } = render(
      <Image 
        src="invalid.jpg" 
        alt="Test image" 
        fallbackSrc="/placeholder.png"
        showError
      />
    );
    const img = container.querySelector('img');
    fireEvent.error(img!);
    expect(img).toHaveAttribute('src', '/placeholder.png');
  });

  it('applies object fit classes', () => {
    const { container } = render(
      <Image src="test.jpg" alt="Test image" fit="contain" />
    );
    const img = container.querySelector('img');
    expect(img).toHaveClass('object-contain');
  });

  it('applies rounded corner classes', () => {
    const { container } = render(
      <Image src="test.jpg" alt="Test image" rounded="full" />
    );
    const img = container.querySelector('img');
    expect(img).toHaveClass('rounded-full');
  });

  it('enables zoom on hover when specified', () => {
    const { container } = render(
      <Image src="test.jpg" alt="Test image" zoomOnHover />
    );
    const img = container.querySelector('img');
    expect(img).toHaveClass('group-hover:scale-110');
  });
}); 