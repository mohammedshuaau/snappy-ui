import type { Meta, StoryObj } from '@storybook/react';
import { Tag } from './Tag';

const meta = {
    title: 'Data Display/Tag',
    component: Tag,
    parameters: {
        layout: 'centered',
    },
    tags: ['autodocs'],
    argTypes: {
        variant: {
            control: 'select',
            options: ['default', 'primary', 'success', 'warning', 'error', 'outline'],
        },
        size: {
            control: 'select',
            options: ['sm', 'md', 'lg'],
        },
        rounded: {
            control: 'boolean',
        },
    },
} satisfies Meta<typeof Tag>;

export default meta;
type Story = StoryObj<typeof Tag>;

// Basic examples
export const Default: Story = {
    args: {
        children: 'Default Tag',
    },
};

export const WithIcon: Story = {
    args: {
        children: 'Tag with Icon',
        leftIcon: (
            <svg
                width="12"
                height="12"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
            >
                <path d="M20.59 13.41l-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z" />
                <line x1="7" y1="7" x2="7.01" y2="7" />
            </svg>
        ),
    },
};

export const Closable: Story = {
    args: {
        children: 'Closable Tag',
        onClose: () => console.log('Tag closed'),
    },
};

// Variants
export const Variants = () => (
    <div className="flex flex-wrap gap-2">
        <Tag>Default</Tag>
        <Tag variant="primary">Primary</Tag>
        <Tag variant="success">Success</Tag>
        <Tag variant="warning">Warning</Tag>
        <Tag variant="error">Error</Tag>
        <Tag variant="outline">Outline</Tag>
    </div>
);

// Sizes
export const Sizes = () => (
    <div className="flex items-center gap-2">
        <Tag size="sm">Small</Tag>
        <Tag size="md">Medium</Tag>
        <Tag size="lg">Large</Tag>
    </div>
);

// Shapes
export const Shapes = () => (
    <div className="flex items-center gap-2">
        <Tag>Default Shape</Tag>
        <Tag rounded>Rounded Shape</Tag>
    </div>
);

// With Icons
export const WithIcons = () => (
    <div className="flex flex-wrap gap-2">
        <Tag
            leftIcon={
                <svg
                    width="12"
                    height="12"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                >
                    <circle cx="12" cy="12" r="10" />
                    <line x1="12" y1="8" x2="12" y2="16" />
                    <line x1="8" y1="12" x2="16" y2="12" />
                </svg>
            }
        >
            Add Tag
        </Tag>
        <Tag
            variant="success"
            leftIcon={
                <svg
                    width="12"
                    height="12"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                >
                    <path d="M20 6L9 17l-5-5" />
                </svg>
            }
        >
            Success
        </Tag>
        <Tag
            variant="error"
            leftIcon={
                <svg
                    width="12"
                    height="12"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                >
                    <circle cx="12" cy="12" r="10" />
                    <line x1="15" y1="9" x2="9" y2="15" />
                    <line x1="9" y1="9" x2="15" y2="15" />
                </svg>
            }
            onClose={() => console.log('Tag closed')}
        >
            Error
        </Tag>
    </div>
);

// Group
export const Group = () => (
    <div className="flex flex-wrap gap-2">
        <Tag variant="primary" onClose={() => { }}>
            React
        </Tag>
        <Tag variant="primary" onClose={() => { }}>
            TypeScript
        </Tag>
        <Tag variant="primary" onClose={() => { }}>
            Tailwind CSS
        </Tag>
        <Tag variant="outline">+3 more</Tag>
    </div>
);

// Custom styled
export const CustomStyled: Story = {
    args: {
        children: 'Custom Tag',
        sx: {
            background: 'linear-gradient(45deg, #4f46e5, #7c3aed)',
            color: 'white',
            boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
            '&:hover': {
                transform: 'translateY(-1px)',
                boxShadow: '0 6px 8px -1px rgba(0, 0, 0, 0.15)',
            },
        },
    },
}; 