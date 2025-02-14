import {fireEvent, render, screen} from '@testing-library/react';
import {describe, expect, it, vi} from 'vitest';
import {Tree, type TreeItem} from './Tree';

describe('Tree', () => {
    const mockItems: TreeItem[] = [
        {
            id: '1',
            label: 'Parent 1',
            children: [
                {
                    id: '1-1',
                    label: 'Child 1-1'
                },
                {
                    id: '1-2',
                    label: 'Child 1-2',
                    children: [
                        {
                            id: '1-2-1',
                            label: 'Grandchild 1-2-1'
                        }
                    ]
                }
            ]
        },
        {
            id: '2',
            label: 'Parent 2'
        }
    ];

    it('renders with default props', () => {
        render(<Tree items={mockItems} />);
        expect(screen.getByRole('tree')).toBeInTheDocument();
        expect(screen.getByRole('tree')).toHaveAttribute('aria-label', 'Tree navigation');
    });

    it('renders all root level items', () => {
        render(<Tree items={mockItems} />);
        expect(screen.getByText('Parent 1')).toBeInTheDocument();
        expect(screen.getByText('Parent 2')).toBeInTheDocument();
    });

    it('expands/collapses items on chevron click', () => {
        render(<Tree items={mockItems} />);

        // Initially children are not visible
        expect(screen.queryByText('Child 1-1')).not.toBeInTheDocument();

        // Click chevron to expand
        const chevron = screen.getAllByRole('treeitem')[0].querySelector('svg');
        fireEvent.click(chevron!);

        // Children should be visible
        expect(screen.getByText('Child 1-1')).toBeInTheDocument();
        expect(screen.getByText('Child 1-2')).toBeInTheDocument();

        // Click chevron again to collapse
        fireEvent.click(chevron!);

        // Children should be hidden
        expect(screen.queryByText('Child 1-1')).not.toBeInTheDocument();
    });

    it('expands/collapses items on item click when expandOnItemClick is true', () => {
        render(<Tree items={mockItems} expandOnItemClick />);

        // Initially children are not visible
        expect(screen.queryByText('Child 1-1')).not.toBeInTheDocument();

        // Click item to expand
        fireEvent.click(screen.getByText('Parent 1'));

        // Children should be visible
        expect(screen.getByText('Child 1-1')).toBeInTheDocument();

        // Click item again to collapse
        fireEvent.click(screen.getByText('Parent 1'));

        // Children should be hidden
        expect(screen.queryByText('Child 1-1')).not.toBeInTheDocument();
    });

    it('calls onSelect when item is clicked', () => {
        const onSelect = vi.fn();
        render(<Tree items={mockItems} onSelect={onSelect} />);

        fireEvent.click(screen.getByText('Parent 2'));
        expect(onSelect).toHaveBeenCalledWith(mockItems[1]);
    });

    it('renders with defaultExpandedIds', () => {
        render(<Tree items={mockItems} defaultExpandedIds={['1']} />);
        expect(screen.getByText('Child 1-1')).toBeInTheDocument();
        expect(screen.getByText('Child 1-2')).toBeInTheDocument();
    });

    it('renders custom icons', () => {
        const itemsWithIcon = [
            {
                id: '1',
                label: 'Item with icon',
                icon: <span data-testid="custom-icon">🌟</span>
            }
        ];

        render(<Tree items={itemsWithIcon} />);
        expect(screen.getByTestId('custom-icon')).toBeInTheDocument();
    });

    it('uses custom renderItem when provided', () => {
        const renderItem = (item: TreeItem) => (
            <div data-testid={`custom-item-${item.id}`}>
                Custom {item.label}
            </div>
        );

        render(<Tree items={mockItems} renderItem={renderItem} />);
        expect(screen.getByTestId('custom-item-1')).toBeInTheDocument();
        expect(screen.getByText('Custom Parent 1')).toBeInTheDocument();
    });

    it('applies custom className', () => {
        render(<Tree items={mockItems} className="custom-class" />);
        expect(screen.getByRole('tree')).toHaveClass('custom-class');
    });

    it('applies custom styles through sx prop', () => {
        render(
            <Tree
                items={mockItems}
                sx={{
                    backgroundColor: 'rgb(0, 0, 255)',
                    padding: '20px'
                }}
            />
        );

        const tree = screen.getByRole('tree');
        const computedStyle = window.getComputedStyle(tree);
        expect(computedStyle.backgroundColor).toBe('rgb(0, 0, 255)');
        expect(computedStyle.padding).toBe('20px');
    });

    it('maintains selection state', () => {
        render(<Tree items={mockItems} />);

        // Initially no item is selected
        expect(screen.queryByRole('treeitem', { selected: true })).not.toBeInTheDocument();

        // Click to select an item
        fireEvent.click(screen.getByText('Parent 1'));
        expect(screen.getByRole('treeitem', { selected: true })).toHaveTextContent('Parent 1');

        // Click another item
        fireEvent.click(screen.getByText('Parent 2'));
        expect(screen.getByRole('treeitem', { selected: true })).toHaveTextContent('Parent 2');
    });

    it('handles deep nesting correctly', () => {
        render(<Tree items={mockItems} defaultExpandedIds={['1', '1-2']} />);

        // All levels should be visible
        expect(screen.getByText('Parent 1')).toBeInTheDocument();
        expect(screen.getByText('Child 1-2')).toBeInTheDocument();
        expect(screen.getByText('Grandchild 1-2-1')).toBeInTheDocument();

        // Check proper nesting with margin
        const grandchild = screen.getByText('Grandchild 1-2-1').closest('[role="treeitem"]');
        expect(grandchild).toHaveStyle({ marginLeft: '2.5rem' }); // level 2 * 1.25rem
    });
}); 