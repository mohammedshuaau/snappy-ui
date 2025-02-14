import {render} from '@testing-library/react';
import {describe, expect, it} from 'vitest';
import {Heatmap} from './Heatmap';
import {type HeatmapData} from '../../types/chart.types';

describe('Heatmap', () => {
    const mockData: HeatmapData[] = [
        { x: 'Mon', y: '9AM', value: 10 },
        { x: 'Mon', y: '10AM', value: 20 },
        { x: 'Tue', y: '9AM', value: 15 },
        { x: 'Tue', y: '10AM', value: 25 },
    ];

    it('renders without crashing', () => {
        const { container } = render(<Heatmap data={mockData} />);
        expect(container.firstChild).toBeInTheDocument();
    });

    it('displays correct number of cells', () => {
        const { container } = render(<Heatmap data={mockData} />);
        const cells = container.querySelectorAll('.relative');
        expect(cells.length).toBe(4); // 2x2 grid
    });

    it('applies variant styles', () => {
        const { container } = render(<Heatmap data={mockData} variant="primary" />);
        expect(container.firstChild).toHaveClass('text-primary-600');
    });

    it('applies custom styles through sx prop', () => {
        const { container } = render(
            <Heatmap data={mockData} sx={{ backgroundColor: 'red' }} />
        );
        const style = container.querySelector('style');
        expect(style?.textContent).toContain('background-color: red');
    });

    it('applies custom height', () => {
        const { container } = render(<Heatmap data={mockData} height={500} />);
        const cells = container.querySelectorAll('.relative');
        const firstCell = cells[0] as HTMLElement;
        // With height 500 and 2 rows, each cell should be 40px (capped)
        expect(firstCell.style.height).toBe('40px');
    });

    it('shows tooltips when showTooltips is true', () => {
        const { container } = render(<Heatmap data={mockData} showTooltips={true} />);
        const tooltips = container.querySelectorAll('.group');
        expect(tooltips.length).toBe(4);
    });

    it('hides tooltips when showTooltips is false', () => {
        const { container } = render(<Heatmap data={mockData} showTooltips={false} />);
        const tooltips = container.querySelectorAll('.group');
        expect(tooltips.length).toBe(0);
    });

    it('shows labels when showLabels is true', () => {
        const { container } = render(<Heatmap data={mockData} showLabels={true} />);
        const xLabels = container.querySelectorAll('.mt-2.text-xs');
        const yLabels = container.querySelectorAll('.ml-4.text-xs');
        expect(xLabels.length).toBe(1);
        expect(yLabels.length).toBe(1);
    });

    it('hides labels when showLabels is false', () => {
        const { container } = render(<Heatmap data={mockData} showLabels={false} />);
        const xLabels = container.querySelectorAll('.mt-2.text-xs');
        const yLabels = container.querySelectorAll('.ml-4.text-xs');
        expect(xLabels.length).toBe(0);
        expect(yLabels.length).toBe(0);
    });

    it('uses custom min and max values for color scaling', () => {
        const { container } = render(
            <Heatmap data={mockData} minValue={0} maxValue={50} variant="default" />
        );
        const cells = container.querySelectorAll('.relative');
        const firstCell = cells[0] as HTMLElement;
        // Value is 10 in a range of 0-50, so opacity should be 0.5
        expect(firstCell.style.backgroundColor).toBe('rgba(15, 23, 42, 0.5)');
    });

    it('calculates min and max values from data when not provided', () => {
        const { container } = render(<Heatmap data={mockData} variant="default" />);
        const cells = container.querySelectorAll('.relative');
        const firstCell = cells[0] as HTMLElement;
        // Value is 10 in a range of 10-25, so opacity should be 0.1 (min)
        expect(firstCell.style.backgroundColor).toBe('rgb(15, 23, 42)');
    });

    it('adjusts cell size based on container height and data', () => {
        const { container } = render(<Heatmap data={mockData} height={200} />);
        const cell = container.querySelector('.relative') as HTMLElement;
        expect(cell.style.height).toBe('40px'); // (200 - 40) / 2 = 40 (capped at 40)
    });
}); 