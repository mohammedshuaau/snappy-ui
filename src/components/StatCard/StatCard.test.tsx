import React from 'react';
import {render} from '@testing-library/react';
import {StatCard} from './StatCard';

// Mock ResizeObserver
class ResizeObserverMock {
    observe() {}
    unobserve() {}
    disconnect() {}
}

global.ResizeObserver = ResizeObserverMock;

// Create a wrapper component that provides a fixed size container
const TestWrapper: React.FC<{ children: React.ReactNode }> = ({ children }) => (
    <div style={{ width: '400px', height: '200px' }}>
        {children}
    </div>
);

describe('StatCard', () => {
    const defaultProps = {
        title: 'Test Title',
        value: '$1,234',
    };

    it('renders without crashing', () => {
        const { getByText } = render(
            <TestWrapper>
                <StatCard {...defaultProps} />
            </TestWrapper>
        );
        expect(getByText('Test Title')).toBeInTheDocument();
        expect(getByText('$1,234')).toBeInTheDocument();
    });

    it('applies variant styles', () => {
        const { container } = render(
            <TestWrapper>
                <StatCard {...defaultProps} variant="success" />
            </TestWrapper>
        );
        expect(container.querySelector('.border-green-200')).toBeInTheDocument();
    });

    it('renders sparkline chart', () => {
        const { container } = render(
            <TestWrapper>
                <StatCard
                    {...defaultProps}
                    chartType="sparkline"
                    sparklineData={[1, 5, 2, 8, 3, 7]}
                />
            </TestWrapper>
        );
        expect(container.querySelector('.recharts-responsive-container')).toBeInTheDocument();
    });

    it('renders progress circle chart', () => {
        const { container } = render(
            <TestWrapper>
                <StatCard
                    {...defaultProps}
                    chartType="progress"
                    progressValue={75}
                />
            </TestWrapper>
        );
        expect(container.querySelector('.recharts-pie')).toBeInTheDocument();
    });

    it('renders gauge chart', () => {
        const { container } = render(
            <TestWrapper>
                <StatCard
                    {...defaultProps}
                    chartType="gauge"
                    progressValue={75}
                />
            </TestWrapper>
        );
        expect(container.querySelector('.recharts-pie')).toBeInTheDocument();
    });

    it('displays positive change with plus sign', () => {
        const { container } = render(
            <TestWrapper>
                <StatCard {...defaultProps} change={5.2} />
            </TestWrapper>
        );
        const changeElement = container.querySelector('.bg-green-100.text-green-800');
        expect(changeElement).toBeInTheDocument();
        expect(changeElement).toHaveTextContent('+5.2%');
    });

    it('displays negative change without plus sign', () => {
        const { container } = render(
            <TestWrapper>
                <StatCard {...defaultProps} change={-3.1} />
            </TestWrapper>
        );
        const changeElement = container.querySelector('.bg-red-100.text-red-800');
        expect(changeElement).toBeInTheDocument();
        expect(changeElement).toHaveTextContent('-3.1%');
    });

    it('displays custom change period', () => {
        const { getByText } = render(
            <TestWrapper>
                <StatCard {...defaultProps} change={5.2} changePeriod="vs. last month" />
            </TestWrapper>
        );
        expect(getByText('vs. last month')).toBeInTheDocument();
    });

    it('applies custom styles through sx prop', () => {
        const { container } = render(
            <TestWrapper>
                <StatCard
                    {...defaultProps}
                    sx={{ transform: 'scale(1.1)', '&:hover': { opacity: 0.8 } }}
                />
            </TestWrapper>
        );
        const style = container.querySelector('style');
        expect(style?.textContent).toContain('transform: scale(1.1)');
    });

    it('applies additional class names', () => {
        const { container } = render(
            <TestWrapper>
                <StatCard {...defaultProps} className="custom-class" />
            </TestWrapper>
        );
        expect(container.querySelector('.custom-class')).toBeInTheDocument();
    });
});