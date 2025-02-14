import {fireEvent, render, screen} from '@testing-library/react';
import {describe, expect, it, vi} from 'vitest';
import {Table} from './Table';

interface TestData {
    id: number;
    name: string;
    email: string;
}

describe('Table', () => {
    const testData: TestData[] = [
        { id: 1, name: 'John Doe', email: 'john@example.com' },
        { id: 2, name: 'Jane Smith', email: 'jane@example.com' },
    ];

    const columns = [
        { key: 'id', header: 'ID' },
        { key: 'name', header: 'Name', sortable: true },
        { key: 'email', header: 'Email' },
    ];

    it('renders with default props', () => {
        render(<Table columns={columns} data={testData} />);
        expect(screen.getByRole('table')).toBeInTheDocument();
    });

    it('renders correct number of rows and columns', () => {
        render(<Table columns={columns} data={testData} />);
        expect(screen.getAllByRole('row')).toHaveLength(3); // header + 2 data rows
        expect(screen.getAllByRole('columnheader')).toHaveLength(3);
        expect(screen.getAllByRole('cell')).toHaveLength(6); // 2 rows * 3 columns
    });

    it('renders custom cell content using cell renderer', () => {
        const customColumns = [
            ...columns,
            {
                key: 'actions',
                header: 'Actions',
                cell: () => <button>Edit</button>
            }
        ];

        render(<Table columns={customColumns} data={testData} />);
        expect(screen.getAllByRole('button', { name: 'Edit' })).toHaveLength(2);
    });

    it('handles sorting when clicking sortable column', () => {
        const onSort = vi.fn();
        render(<Table columns={columns} data={testData} onSort={onSort} />);

        const nameHeader = screen.getByText('Name').closest('th');
        fireEvent.click(nameHeader as HTMLElement);

        expect(onSort).toHaveBeenCalledWith('name', 'asc');
    });

    it('applies variant styles correctly', () => {
        const { rerender } = render(<Table columns={columns} data={testData} variant="bordered" />);
        expect(screen.getByRole('table')).toHaveClass('border');

        rerender(<Table columns={columns} data={testData} variant="striped" />);
        expect(screen.getByRole('table')).toHaveClass('divide-y');
    });

    it('applies hover styles when hover prop is true', () => {
        render(<Table columns={columns} data={testData} hover />);
        const table = screen.getByRole('table');
        expect(table.innerHTML).toContain('hover:bg-gray-50');
    });

    it('applies sticky header styles when stickyHeader is true', () => {
        render(<Table columns={columns} data={testData} stickyHeader />);
        const header = screen.getByRole('table').querySelector('thead');
        expect(header).toHaveClass('sticky', 'top-0');
    });
}); 