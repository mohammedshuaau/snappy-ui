import {render, screen} from '@testing-library/react';
import {describe, expect, it} from 'vitest';
import {Timeline, type TimelineItem} from './Timeline';

describe('Timeline', () => {
    const mockItems: TimelineItem[] = [
        {
            id: '1',
            title: 'Step 1',
            description: 'First step description',
            date: '2024-03-15',
            status: 'completed'
        },
        {
            id: '2',
            title: 'Step 2',
            description: 'Second step description',
            date: '2024-03-16',
            status: 'current'
        },
        {
            id: '3',
            title: 'Step 3',
            description: 'Third step description',
            date: '2024-03-17',
            status: 'upcoming'
        }
    ];

    it('renders with default props', () => {
        render(<Timeline items={mockItems} />);
        expect(screen.getByRole('list')).toBeInTheDocument();
        expect(screen.getByRole('list')).toHaveAttribute('aria-label', 'Timeline');
    });

    it('renders all timeline items', () => {
        render(<Timeline items={mockItems} />);
        mockItems.forEach(item => {
            expect(screen.getByText(item.title)).toBeInTheDocument();
            expect(screen.getByText(item.description!)).toBeInTheDocument();
            expect(screen.getByText(item.date!)).toBeInTheDocument();
        });
    });

    describe('variants', () => {
        it('renders default variant correctly', () => {
            render(<Timeline items={mockItems} variant="default" />);
            const items = screen.getAllByRole('listitem');
            items.forEach(item => {
                expect(item).not.toHaveClass('even:flex-row-reverse');
            });
        });

        it('renders alternate variant correctly', () => {
            render(<Timeline items={mockItems} variant="alternate" />);
            const items = screen.getAllByRole('listitem');
            items.forEach(item => {
                expect(item).toHaveClass('even:flex-row-reverse');
            });
        });
    });

    describe('status styles', () => {
        it('applies correct styles for completed status', () => {
            render(<Timeline items={[mockItems[0]]} />);
            const dot = screen.getByTestId('timeline-dot-1');
            expect(dot).toHaveClass('border-success-500', 'text-success-500');
        });

        it('applies correct styles for current status', () => {
            render(<Timeline items={[mockItems[1]]} />);
            const dot = screen.getByTestId('timeline-dot-2');
            expect(dot).toHaveClass('border-primary-500', 'text-primary-500');
        });

        it('applies correct styles for upcoming status', () => {
            render(<Timeline items={[mockItems[2]]} />);
            const dot = screen.getByTestId('timeline-dot-3');
            expect(dot).toHaveClass('border-gray-300', 'text-gray-300');
        });
    });

    it('renders custom icons', () => {
        const customIcon = <span data-testid="custom-icon">🎯</span>;
        const itemsWithIcon = [{ ...mockItems[0], icon: customIcon }];

        render(<Timeline items={itemsWithIcon} />);
        expect(screen.getByTestId('custom-icon')).toBeInTheDocument();
    });

    it('uses custom renderItem when provided', () => {
        const customRender = (item: TimelineItem) => (
            <div key={item.id} data-testid={`custom-item-${item.id}`}>
                Custom {item.title}
            </div>
        );

        render(<Timeline items={mockItems} renderItem={customRender} />);
        mockItems.forEach(item => {
            expect(screen.getByTestId(`custom-item-${item.id}`)).toBeInTheDocument();
            expect(screen.getByText(`Custom ${item.title}`)).toBeInTheDocument();
        });
    });

    it('applies custom className', () => {
        render(<Timeline items={mockItems} className="custom-class" />);
        expect(screen.getByRole('list')).toHaveClass('custom-class');
    });

    it('applies custom styles through sx prop', () => {
        render(
            <Timeline
                items={mockItems}
                sx={{
                    backgroundColor: 'rgb(0, 0, 255)',
                    padding: '20px'
                }}
            />
        );

        const timeline = screen.getByRole('list');
        const computedStyle = window.getComputedStyle(timeline);
        expect(computedStyle.backgroundColor).toBe('rgb(0, 0, 255)');
        expect(computedStyle.padding).toBe('20px');
    });

    it('handles items without optional props', () => {
        const minimalItems: TimelineItem[] = [
            {
                id: '1',
                title: 'Minimal Item'
            }
        ];

        render(<Timeline items={minimalItems} />);
        expect(screen.getByText('Minimal Item')).toBeInTheDocument();
        expect(screen.queryByRole('time')).not.toBeInTheDocument();
        expect(screen.queryByTestId('description')).not.toBeInTheDocument();
    });
}); 