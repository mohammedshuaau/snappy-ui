import type {Meta, StoryObj} from '@storybook/react';
import {type Column, Table} from './Table';
import {Button} from '../Button/Button';
import {Badge} from '../Badge/Badge';

// Example icons
const EditIcon = () => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        width="16"
        height="16"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
    >
        <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
        <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
    </svg>
);

const DeleteIcon = () => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        width="16"
        height="16"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
    >
        <path d="M3 6h18" />
        <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
    </svg>
);

interface User {
    id: number;
    name: string;
    email: string;
    role: string;
    status: 'active' | 'inactive';
    lastLogin: string;
}

const meta = {
    title: 'Data Display/Table',
    component: Table,
    parameters: {
        layout: 'padded',
        controls: {
            exclude: ['size'],
        },
    },
    tags: ['autodocs'],
    argTypes: {
        variant: {
            control: 'select',
            options: ['default', 'bordered', 'striped'],
        },
        hover: {
            control: 'boolean',
        },
        stickyHeader: {
            control: 'boolean',
        },
        sortColumn: {
            control: 'text',
        },
        sortDirection: {
            control: 'select',
            options: ['asc', 'desc'],
        },
    },
} satisfies Meta<typeof Table>;

export default meta;
type Story = StoryObj<typeof Table<User>>;

// Sample data
const sampleData: User[] = [
    {
        id: 1,
        name: 'John Doe',
        email: 'john@example.com',
        role: 'Admin',
        status: 'active',
        lastLogin: '2024-02-10',
    },
    {
        id: 2,
        name: 'Jane Smith',
        email: 'jane@example.com',
        role: 'User',
        status: 'active',
        lastLogin: '2024-02-09',
    },
    {
        id: 3,
        name: 'Bob Johnson',
        email: 'bob@example.com',
        role: 'Editor',
        status: 'inactive',
        lastLogin: '2024-02-08',
    },
];

const columns: Column<User>[] = [
    {
        key: 'id',
        header: 'ID',
        align: 'center',
    },
    {
        key: 'name',
        header: 'Name',
        sortable: true,
    },
    {
        key: 'email',
        header: 'Email',
    },
    {
        key: 'role',
        header: 'Role',
        sortable: true,
    },
    {
        key: 'status',
        header: 'Status',
        cell: (item) => (
            <Badge
                variant={item.status === 'active' ? 'success' : 'error'}
            >
                {item.status}
            </Badge>
        ),
    },
    {
        key: 'actions',
        header: 'Actions',
        align: 'right',
        cell: () => (
            <div className="flex items-center justify-end gap-2">
                <Button size="sm" variant="outline" leftIcon={<EditIcon />}>Edit</Button>
                <Button size="sm" variant="destructive" leftIcon={<DeleteIcon />}>Delete</Button>
            </div>
        ),
    },
];

// Basic variants
export const Default: Story = {
    args: {
        columns,
        data: sampleData,
    },
};

export const Bordered: Story = {
    args: {
        columns,
        data: sampleData,
        variant: 'bordered',
    },
};

export const Striped: Story = {
    args: {
        columns,
        data: sampleData,
        variant: 'striped',
    },
};

// Features
export const WithoutHover: Story = {
    args: {
        columns,
        data: sampleData,
        hover: false,
    },
};

export const WithStickyHeader: Story = {
    args: {
        columns,
        data: [...sampleData, ...sampleData, ...sampleData], // Repeat data for scrolling
        stickyHeader: true,
    },
    decorators: [
        (Story) => (
            <div style={{ height: '400px', overflow: 'auto' }}>
                <Story />
            </div>
        ),
    ],
};

export const WithSorting: Story = {
    args: {
        columns: columns.map(col => ({
            ...col,
            sortable: true,
        })),
        data: sampleData,
        sortColumn: 'name',
        sortDirection: 'asc',
        onSort: (key, direction) => {
            console.log(`Sorting by ${key} in ${direction} order`);
        },
    },
};

// Styling Examples
export const CustomStyled = () => (
    <div className="flex flex-col gap-8">
        <div className="flex flex-col gap-4">
            <Table<User>
                columns={columns}
                data={sampleData}
                className="dark:bg-gray-800 dark:shadow-lg dark:[&_thead]:bg-gradient-to-r dark:[&_thead]:from-blue-800 dark:[&_thead]:to-blue-900 dark:[&_td]:border-gray-700 dark:[&_tr:hover]:bg-gray-700/50"
                sx={{
                    background: 'linear-gradient(to right, #ffffff, #f8fafc)',
                    borderRadius: '1rem',
                    overflow: 'hidden',
                    boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)',
                    transition: 'all 0.2s ease',
                    '& thead': {
                        background: 'linear-gradient(to right, #3b82f6, #2563eb)',
                    },
                    '& th': {
                        color: 'white',
                        fontWeight: 600,
                        border: 'none',
                    },
                    '& td': {
                        borderColor: '#e2e8f0',
                    },
                    '& tr:hover': {
                        background: 'linear-gradient(to right, #f1f5f9, #f8fafc)',
                        transform: 'translateY(-1px)',
                    },
                }}
            />
            <Table<User>
                columns={columns}
                data={sampleData}
                sx={{
                    borderRadius: '9999px',
                    overflow: 'hidden',
                    border: '2px solid #6366f1',
                    '& thead': {
                        backgroundColor: '#6366f1',
                    },
                    '& th': {
                        color: 'white',
                        fontWeight: 600,
                        border: 'none',
                    },
                    '& td': {
                        borderColor: '#e2e8f0',
                    },
                    '& tr:hover': {
                        backgroundColor: '#f5f3ff',
                    },
                }}
            />
        </div>
        <div className="flex flex-col gap-4">
            <Table<User>
                columns={columns}
                data={sampleData}
                sx={{
                    boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)',
                    borderRadius: '0.5rem',
                    overflow: 'hidden',
                    backgroundColor: 'white',
                    transition: 'all 0.2s ease',
                    '& thead': {
                        backgroundColor: '#1f2937',
                    },
                    '& th': {
                        color: 'white',
                        fontWeight: 600,
                        border: 'none',
                    },
                    '& td': {
                        borderColor: '#e2e8f0',
                    },
                    '& tr:hover': {
                        backgroundColor: '#f5f3ff',
                    },
                }}
            />
            <Table<User>
                columns={columns}
                data={sampleData}
                sx={{
                    backgroundColor: 'transparent',
                    border: '2px solid #22c55e',
                    borderRadius: '0.5rem',
                    overflow: 'hidden',
                    position: 'relative',
                    '& thead': {
                        backgroundColor: '#22c55e',
                    },
                    '& th': {
                        color: 'white',
                        fontWeight: 600,
                        border: 'none',
                    },
                    '& td': {
                        borderColor: '#86efac',
                    },
                    '&::before': {
                        content: '""',
                        position: 'absolute',
                        top: '0',
                        left: '-100%',
                        width: '100%',
                        height: '100%',
                        background: 'linear-gradient(90deg, transparent, rgba(34, 197, 94, 0.2), transparent)',
                        transition: 'left 0.5s ease',
                    },
                    '&:hover::before': {
                        left: '100%',
                    },
                }}
            />
        </div>
    </div>
);

CustomStyled.parameters = {
    docs: {
        description: {
            story: 'Use `sx` prop for custom styling including complex animations, gradients, hover effects, and advanced CSS properties.',
        },
    },
}; 