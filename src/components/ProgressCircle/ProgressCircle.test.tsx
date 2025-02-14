import {render, screen} from '@testing-library/react';
import {describe, expect, it, vi} from 'vitest';
import ProgressCircle from './ProgressCircle';

// Mock ResizeObserver
global.ResizeObserver = vi.fn().mockImplementation(() => ({
    observe: vi.fn(),
    unobserve: vi.fn(),
    disconnect: vi.fn(),
}));

describe('ProgressCircle', () => {
    it('renders without crashing', () => {
        const { container } = render(<ProgressCircle value={75} />);
        expect(container.querySelector('.recharts-surface')).toBeInTheDocument();
    });

    it('displays value when showValue is true', () => {
        render(<ProgressCircle value={75} showValue />);
        expect(screen.getByText('75%')).toBeInTheDocument();
    });

    it('hides value when showValue is false', () => {
        render(<ProgressCircle value={75} showValue={false} />);
        expect(screen.queryByText('75%')).not.toBeInTheDocument();
    });

    it('applies size variants correctly', () => {
        const { container, rerender } = render(<ProgressCircle value={75} size="default" />);
        expect(container.firstChild).toHaveClass('w-24');

        rerender(<ProgressCircle value={75} size="lg" />);
        expect(container.firstChild).toHaveClass('w-32');

        rerender(<ProgressCircle value={75} size="xl" />);
        expect(container.firstChild).toHaveClass('w-40');
    });

    it('applies variant styles', () => {
        const { container } = render(<ProgressCircle value={75} variant="success" />);
        expect(container.firstChild).toHaveClass('text-green-600');
    });

    it('applies custom styles through sx prop', () => {
        const { container } = render(
            <ProgressCircle
                value={75}
                sx={{ backgroundColor: 'red' }}
            />
        );
        const style = container.querySelector('style');
        expect(style?.textContent).toContain('background-color: red');
    });

    it('renders with custom thickness', () => {
        const { container } = render(<ProgressCircle value={75} thickness={16} />);
        const pieChart = container.querySelector('.recharts-wrapper');
        expect(pieChart).toBeInTheDocument();
        
        // Check if the pie element exists
        const pie = container.querySelector('.recharts-pie');
        expect(pie).toBeInTheDocument();
    });

    it('clamps value between 0 and 100', () => {
        const { rerender } = render(<ProgressCircle value={150} showValue />);
        expect(screen.getByText('100%')).toBeInTheDocument();

        rerender(<ProgressCircle value={-50} showValue />);
        expect(screen.getByText('0%')).toBeInTheDocument();
    });

    it('rounds displayed value to nearest integer', () => {
        render(<ProgressCircle value={75.6} showValue />);
        expect(screen.getByText('76%')).toBeInTheDocument();
    });

    it('renders with correct angle calculations', () => {
        const { container } = render(<ProgressCircle value={75} />);
        const surface = container.querySelector('.recharts-surface');
        expect(surface).toBeInTheDocument();
        
        // Check if the circle is rendered with sectors
        const sectors = container.querySelectorAll('.recharts-layer.recharts-pie-sector');
        expect(sectors.length).toBeGreaterThan(0);
    });
}); 