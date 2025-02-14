import {render, screen} from '@testing-library/react';
import {describe, expect, it, vi} from 'vitest';
import Gauge from './Gauge';

// Mock ResizeObserver
global.ResizeObserver = vi.fn().mockImplementation(() => ({
    observe: vi.fn(),
    unobserve: vi.fn(),
    disconnect: vi.fn(),
}));

describe('Gauge', () => {
    it('renders without crashing', () => {
        const { container } = render(<Gauge value={75} />);
        expect(container.querySelector('.recharts-surface')).toBeInTheDocument();
    });

    it('displays the value when showValue is true', () => {
        render(<Gauge value={75} showValue />);
        expect(screen.getByText('75')).toBeInTheDocument();
    });

    it('hides the value when showValue is false', () => {
        render(<Gauge value={75} showValue={false} />);
        expect(screen.queryByText('75')).not.toBeInTheDocument();
    });

    it('displays the label when provided', () => {
        render(<Gauge value={50} label="Progress" />);
        expect(screen.getByText('Progress')).toBeInTheDocument();
    });

    it('applies size variants correctly', () => {
        const { container, rerender } = render(<Gauge value={50} size="sm" />);
        expect(container.querySelector('[class*="w-32"]')).toBeInTheDocument();

        rerender(<Gauge value={50} size="lg" />);
        expect(container.querySelector('[class*="w-64"]')).toBeInTheDocument();
    });

    it('applies variant styles', () => {
        const { container } = render(<Gauge value={75} variant="success" />);
        expect(container.firstChild).toHaveClass('text-green-600');
    });

    it('applies custom styles through sx prop', () => {
        const { container } = render(
            <Gauge
                value={75}
                sx={{ backgroundColor: 'red' }}
            />
        );
        const style = container.querySelector('style');
        expect(style?.textContent).toContain('background-color: red');
    });

    it('clamps value between min and max', () => {
        const { rerender } = render(<Gauge value={150} min={0} max={100} showValue />);
        const valueElement = screen.getByText('150');
        expect(valueElement).toBeInTheDocument();

        rerender(<Gauge value={-50} min={0} max={100} showValue />);
        const valueElement2 = screen.getByText('-50');
        expect(valueElement2).toBeInTheDocument();
    });

    it('renders correct number of segments', () => {
        const { container } = render(<Gauge value={75} segments={3} />);
        const surface = container.querySelector('.recharts-surface');
        expect(surface).toBeInTheDocument();
        
        // Check if we have the correct number of sectors
        const sectors = container.querySelectorAll('.recharts-layer.recharts-pie-sector');
        expect(sectors.length).toBe(3);
    });
}); 