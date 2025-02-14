import type {Meta, StoryObj} from '@storybook/react';
import {Avatar} from './Avatar';

const meta = {
    title: 'Data Display/Avatar',
    component: Avatar,
    parameters: {
        layout: 'centered',
    },
    tags: ['autodocs'],
    argTypes: {
        size: {
            control: 'select',
            options: ['xs', 'sm', 'md', 'lg', 'xl'],
        },
        variant: {
            control: 'select',
            options: ['circle', 'square'],
        },
        status: {
            control: 'select',
            options: ['online', 'offline', 'busy', 'away'],
        },
    },
} satisfies Meta<typeof Avatar>;

export default meta;
type Story = StoryObj<typeof Avatar>;

// Basic examples
export const Default: Story = {
    args: {
        name: 'John Doe',
    },
};

export const WithImage: Story = {
    args: {
        src: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
        alt: 'John Doe',
    },
};

export const WithFallback: Story = {
    args: {
        fallback: '👤',
    },
};

// Sizes
export const Sizes = () => (
    <div className="flex items-center gap-4">
        <Avatar size="xs" name="XS" />
        <Avatar size="sm" name="SM" />
        <Avatar size="md" name="MD" />
        <Avatar size="lg" name="LG" />
        <Avatar size="xl" name="XL" />
    </div>
);

// Variants
export const Variants = () => (
    <div className="flex items-center gap-4">
        <Avatar
            variant="circle"
            src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
        />
        <Avatar
            variant="square"
            src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
        />
    </div>
);

// Status indicators
export const StatusIndicators = () => (
    <div className="flex items-center gap-4">
        <Avatar status="online" name="ON" />
        <Avatar status="offline" name="OFF" />
        <Avatar status="busy" name="BS" />
        <Avatar status="away" name="AW" />
    </div>
);

// Group
export const Group = () => (
    <div className="flex items-center -space-x-2">
        <Avatar
            src="https://images.unsplash.com/photo-1491528323818-fdd1faba62cc?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
            className="ring-2 ring-white dark:ring-gray-900"
        />
        <Avatar
            src="https://images.unsplash.com/photo-1550525811-e5869dd03032?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
            className="ring-2 ring-white dark:ring-gray-900"
        />
        <Avatar
            src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2.25&w=256&h=256&q=80"
            className="ring-2 ring-white dark:ring-gray-900"
        />
        <Avatar
            src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
            className="ring-2 ring-white dark:ring-gray-900"
        />
    </div>
);

// Custom styled
export const CustomStyled: Story = {
    args: {
        name: 'Custom',
        sx: {
            background: 'linear-gradient(45deg, #4f46e5, #7c3aed)',
            color: 'white',
            boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)',
            '&:hover': {
                transform: 'scale(1.1)',
            },
        },
    },
}; 