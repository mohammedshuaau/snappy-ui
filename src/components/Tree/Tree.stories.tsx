import type { Meta, StoryObj } from '@storybook/react';
import { Tree } from './Tree';

const meta = {
    title: 'Data Display/Tree',
    component: Tree,
    parameters: {
        layout: 'padded',
    },
    tags: ['autodocs'],
    argTypes: {
        expandOnItemClick: {
            control: 'boolean',
            description: 'Allow expanding/collapsing when clicking the item itself',
        },
    },
} satisfies Meta<typeof Tree>;

export default meta;
type Story = StoryObj<typeof Tree>;

interface TreeItem {
    id: string;
    label: string;
    children?: TreeItem[];
    icon?: React.ReactNode;
}

// Sample data
const sampleItems: TreeItem[] = [
    {
        id: '1',
        label: 'Documents',
        children: [
            {
                id: '1.1',
                label: 'Work',
                children: [
                    { id: '1.1.1', label: 'Reports' },
                    { id: '1.1.2', label: 'Meetings' },
                ],
            },
            {
                id: '1.2',
                label: 'Personal',
                children: [
                    { id: '1.2.1', label: 'Photos' },
                    { id: '1.2.2', label: 'Travel' },
                ],
            },
        ],
    },
    {
        id: '2',
        label: 'Downloads',
        children: [
            { id: '2.1', label: 'Music' },
            { id: '2.2', label: 'Videos' },
        ],
    },
];

// Example icons
const FolderIcon = () => (
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
        <path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z" />
    </svg>
);

const FileIcon = () => (
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
        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
        <polyline points="14 2 14 8 20 8" />
    </svg>
);

// Basic example
export const Default: Story = {
    args: {
        items: sampleItems,
    },
};

// With icons
export const WithIcons: Story = {
    args: {
        items: sampleItems.map(item => ({
            ...item,
            icon: <FolderIcon />,
            children: item.children?.map(child => ({
                ...child,
                icon: child.children ? <FolderIcon /> : <FileIcon />,
                children: child.children?.map(grandChild => ({
                    ...grandChild,
                    icon: <FileIcon />,
                })),
            })),
        })),
    },
};

// With pre-expanded items
export const PreExpanded: Story = {
    args: {
        items: sampleItems,
        defaultExpandedIds: ['1', '1.1'],
    },
};

// Custom rendering
export const CustomStyled: Story = {
    args: {
        items: sampleItems.map(item => ({
            ...item,
            icon: <FolderIcon />,
            children: item.children?.map(child => ({
                ...child,
                icon: child.children ? <FolderIcon /> : <FileIcon />,
                children: child.children?.map(grandChild => ({
                    ...grandChild,
                    icon: <FileIcon />,
                })),
            })),
        })),
        sx: {
            backgroundColor: '#f8fafc',
            borderRadius: '1rem',
            padding: '1rem',
            boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
            '&:hover': {
                boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)',
            },
            '@media (prefers-color-scheme: dark)': {
                backgroundColor: '#1e293b',
                boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.3)',
                '&:hover': {
                    boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.4)',
                },
            },
        },
        renderItem: (item) => (
            <div className="flex items-center gap-3 px-4 py-2.5 rounded-lg">
                <span className="text-blue-500 dark:text-blue-400">{item.icon}</span>
                <div className="flex-1">
                    <span className="font-medium">{item.label}</span>
                    {!item.children && (
                        <div className="flex items-center gap-2 mt-0.5">
                            <span className="text-xs px-2 py-0.5 rounded-full bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300">
                                3 days ago
                            </span>
                            <span className="text-xs text-gray-500 dark:text-gray-400">
                                23KB
                            </span>
                        </div>
                    )}
                </div>
                {!item.children && (
                    <button className="opacity-0 group-hover:opacity-100 transition-opacity px-2 py-1 rounded hover:bg-gray-100 dark:hover:bg-gray-700">
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
                            className="text-gray-500 dark:text-gray-400"
                        >
                            <circle cx="12" cy="12" r="1" />
                            <circle cx="19" cy="12" r="1" />
                            <circle cx="5" cy="12" r="1" />
                        </svg>
                    </button>
                )}
            </div>
        ),
    },
    parameters: {
        docs: {
            description: {
                story: 'Use `sx` prop for custom styling including complex animations, gradients, hover effects, and advanced CSS properties. The example shows a modern file explorer with hover effects and dark mode support.',
            },
        },
    },
};

// Add new story for expandOnItemClick
export const ExpandOnItemClick: Story = {
    args: {
        items: sampleItems,
        expandOnItemClick: true,
    },
    parameters: {
        docs: {
            description: {
                story: 'When `expandOnItemClick` is enabled, clicking anywhere on the item will toggle its expanded state, not just the chevron icon.',
            },
        },
    },
}; 