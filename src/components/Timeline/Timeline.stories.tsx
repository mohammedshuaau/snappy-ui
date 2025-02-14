import type { Meta, StoryObj } from '@storybook/react';
import { Timeline, type TimelineItem } from './Timeline';
import { twMerge } from 'tailwind-merge';

const meta = {
    title: 'Data Display/Timeline',
    component: Timeline,
    parameters: {
        layout: 'padded',
    },
    tags: ['autodocs'],
    argTypes: {
        variant: {
            control: 'select',
            options: ['default', 'alternate'],
        },
    },
} satisfies Meta<typeof Timeline>;

export default meta;
type Story = StoryObj<typeof Timeline>;

// Sample data
const sampleItems: TimelineItem[] = [
    {
        id: '1',
        title: 'Project Started',
        description: 'Initial project setup and planning phase completed.',
        date: 'March 1, 2024',
        status: 'completed',
    },
    {
        id: '2',
        title: 'Design Phase',
        description: 'UI/UX design and prototyping in progress.',
        date: 'March 5, 2024',
        status: 'current',
    },
    {
        id: '3',
        title: 'Development',
        description: 'Frontend and backend development scheduled.',
        date: 'March 10, 2024',
        status: 'upcoming',
    },
];

// Basic example
export const Default: Story = {
    args: {
        items: sampleItems,
    },
};

// Alternate layout
export const Alternate: Story = {
    args: {
        items: sampleItems,
        variant: 'alternate',
    },
};

// Custom icons
const CustomIcon = ({ status }: { status: TimelineItem['status'] }) => {
    const iconColor = status === 'completed' ? 'text-green-500' :
        status === 'current' ? 'text-blue-500' : 'text-gray-400';

    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className={iconColor}
        >
            {status === 'completed' ? (
                <path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z" />
            ) : status === 'current' ? (
                <path d="M12 8v4l3 3" />
            ) : (
                <path d="M12 6v6l4 2" />
            )}
        </svg>
    );
};

export const WithCustomIcons: Story = {
    args: {
        items: sampleItems.map(item => ({
            ...item,
            icon: <CustomIcon status={item.status} />,
        })),
    },
};

// Custom styling
export const CustomStyled: Story = {
    args: {
        items: sampleItems,
        sx: {
            backgroundColor: '#ffffff',
            borderRadius: '1rem',
            padding: '2rem',
            boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.1)',
            '&::before': {
                content: '""',
                position: 'absolute',
                top: '0',
                left: '6rem',
                height: '100%',
                width: '2px',
                background: 'linear-gradient(to bottom, #3b82f6 0%, #60a5fa 100%)',
            },
            '@media (prefers-color-scheme: dark)': {
                backgroundColor: '#1e293b',
                boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.3)',
                '&::before': {
                    background: 'linear-gradient(to bottom, #1d4ed8 0%, #3b82f6 100%)',
                },
            },
        },
        renderItem: (item) => (
            <div className="flex flex-col gap-3 p-4 rounded-xl bg-gray-50 dark:bg-gray-800/50 backdrop-blur-sm shadow-sm">
                <div className="flex items-center justify-between">
                    <h3 className="font-bold text-gray-900 dark:text-gray-100">
                        {item.title}
                    </h3>
                    <div className={twMerge(
                        'px-3 py-1 rounded-full text-sm font-medium',
                        item.status === 'completed' ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300' :
                            item.status === 'current' ? 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300' :
                                'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300'
                    )}>
                        {item.status}
                    </div>
                </div>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                    {item.date}
                </p>
                <p className="text-gray-600 dark:text-gray-300">
                    {item.description}
                </p>
                <div className="flex gap-2 mt-2">
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300">
                        Feature
                    </span>
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-300">
                        Sprint 1
                    </span>
                </div>
            </div>
        ),
    },
    parameters: {
        docs: {
            description: {
                story: 'Use `sx` prop for custom styling including complex animations, gradients, and advanced CSS properties. The example shows a modern timeline with gradient connector and glass-morphism cards.',
            },
        },
    },
}; 