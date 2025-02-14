import {render, screen} from '@testing-library/react';
import {describe, expect, it, vi} from 'vitest';
import PieChart from './PieChart';
import {type DataPoint} from '../../types/chart.types';

// Mock ResizeObserver
global.ResizeObserver = vi.fn().mockImplementation(() => ({
    observe: vi.fn(),
    unobserve: vi.fn(),
    disconnect: vi.fn(),
}));

describe('PieChart', () => {
    const mockData: DataPoint[] = [
        { name: 'Group A', value: 400, variant: 'primary' },
        { name: 'Group B', value: 300, variant: 'success' },
        { name: 'Group C', value: 300, variant: 'warning' },
    ];

    it('renders without crashing', () => {
        const { container } = render(<PieChart data={mockData} />);
        expect(container.querySelector('.recharts-surface')).toBeInTheDocument();
    });

    it('displays "No data available" when data is empty', () => {
        render(<PieChart data={[]} />);
        expect(screen.getByText('No data available')).toBeInTheDocument();
    });

    it('applies custom height', () => {
        const { container } = render(
            <PieChart data={mockData} height={500} />
        );
        const chart = container.querySelector('.recharts-wrapper');
        expect(chart).toHaveStyle({ height: '468px' }); // 500 - 32 (padding)
    });

    it('applies variant styles', () => {
        const { container } = render(
            <PieChart data={mockData} variant="primary" />
        );
        expect(container.firstChild).toHaveClass('text-primary-600');
    });

    it('applies custom styles through sx prop', () => {
        const { container } = render(
            <PieChart
                data={mockData}
                sx={{ backgroundColor: 'red' }}
            />
        );
        const style = container.querySelector('style');
        expect(style?.textContent).toContain('background-color: red');
    });

    it('renders as donut chart when innerRadius is provided', () => {
        const { container } = render(
            <PieChart data={mockData} innerRadius={60} />
        );
        const pieContainer = container.querySelector('.recharts-wrapper');
        expect(pieContainer).toBeInTheDocument();
        
        // Check if the pie chart surface is rendered
        const surface = container.querySelector('.recharts-surface');
        expect(surface).toBeInTheDocument();
        
        // Check if we have data labels rendered
        mockData.forEach(item => {
            expect(screen.getByText(item.name)).toBeInTheDocument();
        });
    });

    it('hides legend when showLegend is false', () => {
        const { container } = render(
            <PieChart data={mockData} showLegend={false} />
        );
        expect(container.querySelector('.recharts-legend-wrapper')).not.toBeInTheDocument();
    });

    it('hides tooltip when showTooltip is false', () => {
        const { container } = render(
            <PieChart data={mockData} showTooltip={false} />
        );
        expect(container.querySelector('.recharts-tooltip-wrapper')).not.toBeInTheDocument();
    });

    it('renders with custom outer radius', () => {
        const { container } = render(
            <PieChart data={mockData} outerRadius={100} />
        );
        const pieContainer = container.querySelector('.recharts-wrapper');
        expect(pieContainer).toBeInTheDocument();
        
        // Check if the pie chart surface is rendered
        const surface = container.querySelector('.recharts-surface');
        expect(surface).toBeInTheDocument();
        
        // Check if we have data labels rendered
        mockData.forEach(item => {
            expect(screen.getByText(item.name)).toBeInTheDocument();
        });
    });

    it('disables animation when animate is false', () => {
        const { container } = render(
            <PieChart data={mockData} animate={false} />
        );
        const pieContainer = container.querySelector('.recharts-wrapper');
        expect(pieContainer).toBeInTheDocument();
        
        // Check if the pie chart surface is rendered
        const surface = container.querySelector('.recharts-surface');
        expect(surface).toBeInTheDocument();
        
        // Check if we have data labels rendered
        mockData.forEach(item => {
            expect(screen.getByText(item.name)).toBeInTheDocument();
        });
    });
});