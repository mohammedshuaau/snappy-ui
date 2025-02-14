import {render} from '@testing-library/react';
import {Slider} from './Slider';

// Mock ResizeObserver
class ResizeObserver {
  observe() {}
  unobserve() {}
  disconnect() {}
}

// Add to global
global.ResizeObserver = ResizeObserver;

describe('Slider', () => {
  it('renders with default props', () => {
    const { container } = render(<Slider />);
    expect(container).toBeInTheDocument();
  });

  it('renders with custom value', () => {
    const { container } = render(<Slider value={50} />);
    expect(container).toBeInTheDocument();
  });

  it('renders with min and max values', () => {
    const { container } = render(<Slider min={0} max={100} />);
    expect(container).toBeInTheDocument();
  });

  it('renders in disabled state', () => {
    const { container } = render(<Slider disabled />);
    expect(container).toBeInTheDocument();
  });

  it('renders with custom size', () => {
    const { container } = render(<Slider size="sm" />);
    expect(container).toBeInTheDocument();
  });
}); 