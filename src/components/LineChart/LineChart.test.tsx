import {render, screen} from '@testing-library/react';
import {describe, expect, it, vi} from 'vitest';
import LineChart from './LineChart';
import {type DataPoint, type DataSeries} from '../../types/chart.types';

// Mock ResizeObserver
global.ResizeObserver = vi.fn().mockImplementation(() => ({
    observe: vi.fn(),
    unobserve: vi.fn(),
    disconnect: vi.fn(),
}));

describe('LineChart', () => {
    const mockData: DataPoint[] = [
        { date: '2023-01', value: 100, trend: 90 },
        { date: '2023-02', value: 200, trend: 180 },
        { date: '2023-03', value: 300, trend: 270 },
    ];

    const mockSeries: DataSeries[] = [
        { dataKey: 'value', name: 'Value' },
        { dataKey: 'trend', name: 'Trend' },
    ];

    it('renders without crashing', () => {
        const { container } = render(<LineChart data={mockData} series={mockSeries} xAxisKey="date" />);
        expect(container.querySelector('.recharts-surface')).toBeInTheDocument();
    });

    it('displays "No data available" when data is empty', () => {
        render(<LineChart data={[]} series={mockSeries} xAxisKey="date" />);
        expect(screen.getByText('No data available')).toBeInTheDocument();
    });

    it('displays "No data available" when series is empty', () => {
        render(<LineChart data={mockData} series={[]} xAxisKey="date" />);
        expect(screen.getByText('No data available')).toBeInTheDocument();
    });

    it('applies custom height', () => {
        const { container } = render(
            <LineChart data={mockData} series={mockSeries} xAxisKey="date" height={500} />
        );
        const chart = container.querySelector('.recharts-wrapper');
        expect(chart).toHaveStyle({ height: '468px' }); // 500 - 32 (padding)
    });

    it('applies variant styles', () => {
        const { container } = render(
            <LineChart data={mockData} series={mockSeries} xAxisKey="date" variant="primary" />
        );
        expect(container.firstChild).toHaveClass('text-primary-600');
    });

    it('applies custom styles through sx prop', () => {
        const { container } = render(
            <LineChart
                data={mockData}
                series={mockSeries}
                xAxisKey="date"
                sx={{ backgroundColor: 'red' }}
            />
        );
        const style = container.querySelector('style');
        expect(style?.textContent).toContain('background-color: red');
    });

    it('renders with custom stroke width', () => {
        const seriesWithStrokeWidth: DataSeries[] = [
            { dataKey: 'value', name: 'Value', strokeWidth: 4 },
        ];
        const { container } = render(
            <LineChart
                data={mockData}
                series={seriesWithStrokeWidth}
                xAxisKey="date"
            />
        );
        expect(container.querySelector('.recharts-surface')).toBeInTheDocument();
    });

    it('hides grid when showGrid is false', () => {
        const { container } = render(
            <LineChart
                data={mockData}
                series={mockSeries}
                xAxisKey="date"
                showGrid={false}
            />
        );
        expect(container.querySelector('.recharts-cartesian-grid')).not.toBeInTheDocument();
    });

    it('hides legend when showLegend is false', () => {
        const { container } = render(
            <LineChart
                data={mockData}
                series={mockSeries}
                xAxisKey="date"
                showLegend={false}
            />
        );
        expect(container.querySelector('.recharts-legend-wrapper')).not.toBeInTheDocument();
    });

    it('hides tooltip when showTooltip is false', () => {
        const { container } = render(
            <LineChart
                data={mockData}
                series={mockSeries}
                xAxisKey="date"
                showTooltip={false}
            />
        );
        expect(container.querySelector('.recharts-tooltip-wrapper')).not.toBeInTheDocument();
    });

    it('renders with dots disabled', () => {
        const seriesWithoutDots: DataSeries[] = [
            { dataKey: 'value', name: 'Value', dot: false },
        ];
        const { container } = render(
            <LineChart
                data={mockData}
                series={seriesWithoutDots}
                xAxisKey="date"
            />
        );
        expect(container.querySelector('.recharts-surface')).toBeInTheDocument();
    });
}); 