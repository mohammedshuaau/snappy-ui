import React from 'react';
import type {Meta, StoryObj} from '@storybook/react';
import {Badge} from './Badge';

const meta = {
    title: 'Feedback/Badge',
    component: Badge,
    parameters: {
        layout: 'centered',
        docs: {
            description: {
                component: `
A versatile badge component for displaying status, labels, or counts.

## Features
- Multiple variants for different contexts
- Size options
- Icon support
- Removable badges
- Dark mode support
- Custom styling with \`sx\` prop
`,
            },
        },
    },
    tags: ['autodocs'],
    argTypes: {
        variant: {
            control: 'select',
            options: ['default', 'secondary', 'success', 'warning', 'error', 'outline'],
            description: 'The visual style of the badge',
        },
        size: {
            control: 'select',
            options: ['sm', 'default', 'lg'],
            description: 'The size of the badge',
        },
        children: {
            control: 'text',
            description: 'The content of the badge',
        },
        icon: {
            control: 'boolean',
            description: 'Whether to show an icon',
        },
        onRemove: {
            control: 'boolean',
            description: 'Whether the badge is removable',
        },
    },
} satisfies Meta<typeof Badge>;

export default meta;
type Story = StoryObj<typeof meta>;

// Basic variants
export const Default: Story = {
    args: {
        children: 'Badge',
    },
};

export const Secondary: Story = {
    args: {
        children: 'Secondary',
        variant: 'secondary',
    },
};

export const Success: Story = {
    args: {
        children: 'Success',
        variant: 'success',
    },
};

export const Warning: Story = {
    args: {
        children: 'Warning',
        variant: 'warning',
    },
};

export const Error: Story = {
    args: {
        children: 'Error',
        variant: 'error',
    },
};

export const Outline: Story = {
    args: {
        children: 'Outline',
        variant: 'outline',
    },
};

// Sizes
export const Small: Story = {
    args: {
        children: 'Small',
        size: 'sm',
    },
};

export const Large: Story = {
    args: {
        children: 'Large',
        size: 'lg',
    },
};

// With Icon
export const WithIcon: Story = {
    args: {
        children: 'New',
        icon: (
            <svg
                className="h-2.5 w-2.5"
                fill="currentColor"
                viewBox="0 0 20 20"
            >
                <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v2H7a1 1 0 100 2h2v2a1 1 0 102 0v-2h2a1 1 0 100-2h-2V7z"
                    clipRule="evenodd"
                />
            </svg>
        ),
    },
};

// Removable
export const Removable: Story = {
    args: {
        children: 'Click × to remove',
        onRemove: () => alert('Badge removed!'),
    },
};

// All Variants
export const AllVariants: Story = {
    render: () => (
        <div className="flex flex-wrap gap-2">
            <Badge>Default</Badge>
            <Badge variant="secondary">Secondary</Badge>
            <Badge variant="success">Success</Badge>
            <Badge variant="warning">Warning</Badge>
            <Badge variant="error">Error</Badge>
            <Badge variant="outline">Outline</Badge>
        </div>
    ),
};

// All Sizes
export const AllSizes: Story = {
    render: () => (
        <div className="flex flex-wrap items-center gap-2">
            <Badge size="sm">Small</Badge>
            <Badge size="default">Default</Badge>
            <Badge size="lg">Large</Badge>
        </div>
    ),
};

// Interactive Example
export const Interactive: Story = {
    render: () => {
        const [badges, setBadges] = React.useState([
            { id: 1, text: 'React', variant: 'default' as const },
            { id: 2, text: 'TypeScript', variant: 'secondary' as const },
            { id: 3, text: 'Tailwind', variant: 'success' as const },
        ]);

        return (
            <div className="flex flex-wrap gap-2">
                {badges.map((badge) => (
                    <Badge
                        key={badge.id}
                        variant={badge.variant}
                        onRemove={() => setBadges(badges.filter(b => b.id !== badge.id))}
                    >
                        {badge.text}
                    </Badge>
                ))}
            </div>
        );
    },
};

// Custom Styling
export const CustomStyling: Story = {
    render: () => (
        <div className="flex flex-wrap gap-2">
            <Badge
                sx={{
                    background: 'linear-gradient(to right, #06b6d4, #3b82f6)',
                    color: 'white',
                }}
            >
                Gradient
            </Badge>
            <Badge
                sx={{
                    border: '2px dashed #6366f1',
                    color: '#6366f1',
                    backgroundColor: 'transparent',
                }}
            >
                Dashed
            </Badge>
            <Badge
                sx={{
                    boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
                    backgroundColor: 'white',
                    color: '#1f2937',
                }}
            >
                Shadow
            </Badge>
        </div>
    ),
}; 