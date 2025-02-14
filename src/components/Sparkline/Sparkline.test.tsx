import React from 'react';
import {render} from '@testing-library/react';
import Sparkline from './Sparkline';

// Mock ResizeObserver
class ResizeObserverMock {
    observe() {}
    unobserve() {}
    disconnect() {}
}

global.ResizeObserver = ResizeObserverMock;

// Create a wrapper component that provides a fixed size container
const TestWrapper: React.FC<{ children: React.ReactNode }> = ({ children }) => (
    <div style={{ width: '200px', height: '100px' }}>
        {children}
    </div>
);

describe('Sparkline', () => {
    const sampleData = [1, 5, 2, 8, 3, 7];

    it('renders without crashing', () => {
        const { container } = render(
            <TestWrapper>
                <Sparkline data={sampleData} />
            </TestWrapper>
        );
        expect(container.querySelector('.recharts-responsive-container')).toBeInTheDocument();
    });

    it('applies variant styles', () => {
        const { container } = render(
            <TestWrapper>
                <Sparkline data={sampleData} variant="success" />
            </TestWrapper>
        );
        expect(container.querySelector('.text-green-600')).toBeInTheDocument();
    });

    it('applies size styles', () => {
        const { container } = render(
            <TestWrapper>
                <Sparkline data={sampleData} size="lg" />
            </TestWrapper>
        );
        expect(container.querySelector('.w-32.h-16')).toBeInTheDocument();
    });

    it('shows area under the line when showArea is true', () => {
        const { container } = render(
            <TestWrapper>
                <Sparkline data={sampleData} showArea />
            </TestWrapper>
        );
        expect(container.querySelector('.recharts-responsive-container')).toBeInTheDocument();
    });

    it('shows dots when showDots is true', () => {
        const { container } = render(
            <TestWrapper>
                <Sparkline data={sampleData} showDots />
            </TestWrapper>
        );
        expect(container.querySelector('.recharts-responsive-container')).toBeInTheDocument();
    });

    it('applies custom stroke width', () => {
        const { container } = render(
            <TestWrapper>
                <Sparkline data={sampleData} strokeWidth={4} />
            </TestWrapper>
        );
        expect(container.querySelector('.recharts-responsive-container')).toBeInTheDocument();
    });

    it('applies custom styles through sx prop', () => {
        const { container } = render(
            <TestWrapper>
                <Sparkline
                    data={sampleData}
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
                <Sparkline data={sampleData} className="custom-class" />
            </TestWrapper>
        );
        expect(container.querySelector('.custom-class')).toBeInTheDocument();
    });

    it('renders with empty data array', () => {
        const { container } = render(
            <TestWrapper>
                <Sparkline data={[]} />
            </TestWrapper>
        );
        expect(container.querySelector('.recharts-responsive-container')).toBeInTheDocument();
    });

    it('renders with single data point', () => {
        const { container } = render(
            <TestWrapper>
                <Sparkline data={[5]} />
            </TestWrapper>
        );
        expect(container.querySelector('.recharts-responsive-container')).toBeInTheDocument();
    });
}); 