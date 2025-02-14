import {render, screen} from '@testing-library/react';
import {describe, expect, it, vi} from 'vitest';
import {BarChart} from './BarChart';
import {type DataPoint, type DataSeries} from '../../types/chart.types';

// Mock ResizeObserver
global.ResizeObserver = vi.fn().mockImplementation(() => ({
    observe: vi.fn(),
    unobserve: vi.fn(),
    disconnect: vi.fn(),
}));

describe('BarChart', () => {
    const mockData: DataPoint[] = [
        { month: 'Jan', sales: 100, profit: 50 },
        { month: 'Feb', sales: 200, profit: 100 },
        { month: 'Mar', sales: 300, profit: 150 },
    ];

    const mockSeries: DataSeries[] = [
        { dataKey: 'sales', name: 'Sales' },
        { dataKey: 'profit', name: 'Profit' },
    ];

    it('renders without crashing', () => {
        const { container } = render(<BarChart data={mockData} series={mockSeries} xAxisKey="month" />);
        expect(container.querySelector('.recharts-surface')).toBeInTheDocument();
    });

    it('displays "No data available" when data is empty', () => {
        render(<BarChart data={[]} series={mockSeries} xAxisKey="month" />);
        expect(screen.getByText('No data available')).toBeInTheDocument();
    });

    it('displays "No data available" when series is empty', () => {
        render(<BarChart data={mockData} series={[]} xAxisKey="month" />);
        expect(screen.getByText('No data available')).toBeInTheDocument();
    });

    it('applies custom height', () => {
        const { container } = render(
            <BarChart data={mockData} series={mockSeries} xAxisKey="month" height={500} />
        );
        const chart = container.querySelector('.recharts-wrapper');
        expect(chart).toHaveStyle({ height: '468px' }); // 500 - 32 (padding)
    });

    it('applies variant styles', () => {
        const { container } = render(
            <BarChart data={mockData} series={mockSeries} xAxisKey="month" variant="primary" />
        );
        expect(container.firstChild).toHaveClass('text-primary-600');
    });

    it('applies custom styles through sx prop', () => {
        const { container } = render(
            <BarChart
                data={mockData}
                series={mockSeries}
                xAxisKey="month"
                sx={{ backgroundColor: 'red' }}
            />
        );
        const style = container.querySelector('style');
        expect(style?.textContent).toContain('background-color: red');
    });

    it('renders with horizontal layout', () => {
        const { container } = render(
            <BarChart
                data={mockData}
                series={mockSeries}
                xAxisKey="month"
                layout="horizontal"
            />
        );
        expect(container.querySelector('.recharts-surface')).toBeInTheDocument();
    });

    it('hides grid when showGrid is false', () => {
        const { container } = render(
            <BarChart
                data={mockData}
                series={mockSeries}
                xAxisKey="month"
                showGrid={false}
            />
        );
        expect(container.querySelector('.recharts-cartesian-grid')).not.toBeInTheDocument();
    });

    it('hides legend when showLegend is false', () => {
        const { container } = render(
            <BarChart
                data={mockData}
                series={mockSeries}
                xAxisKey="month"
                showLegend={false}
            />
        );
        expect(container.querySelector('.recharts-legend-wrapper')).not.toBeInTheDocument();
    });

    it('hides tooltip when showTooltip is false', () => {
        const { container } = render(
            <BarChart
                data={mockData}
                series={mockSeries}
                xAxisKey="month"
                showTooltip={false}
            />
        );
        expect(container.querySelector('.recharts-tooltip-wrapper')).not.toBeInTheDocument();
    });
}); 