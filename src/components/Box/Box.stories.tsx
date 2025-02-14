import type {Meta, StoryObj} from '@storybook/react';
import {Box} from './Box';

const meta = {
    title: 'Layout/Box',
    component: Box,
    parameters: {
        layout: 'centered',
        docs: {
            description: {
                component: 'A fundamental layout component that provides a container with support for rounded corners, shadows, and borders.',
            },
        },
    },
    tags: ['autodocs'],
} satisfies Meta<typeof Box>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Basic: Story = {
    args: {
        children: 'Basic Box',
        className: 'p-4 bg-white',
    },
};

export const Rounded: Story = {
    args: {
        children: 'Rounded Box',
        rounded: 'lg',
        className: 'p-4 bg-white',
    },
};

export const WithShadow: Story = {
    args: {
        children: 'Box with Shadow',
        shadow: 'lg',
        className: 'p-4 bg-white',
    },
};

export const WithBorder: Story = {
    args: {
        children: 'Box with Border',
        border: 'medium',
        className: 'p-4 bg-white border-slate-200',
    },
};

export const Combinations: Story = {
    args: {
        children: 'Combined Styles',
        rounded: 'xl',
        shadow: 'md',
        border: 'thin',
        className: 'p-4 bg-white border-slate-200',
    },
};

export const CustomStyling: Story = {
    args: {
        children: 'Custom Styled Box',
        rounded: 'lg',
        className: 'p-4',
        sx: {
            background: 'linear-gradient(to right, #4f46e5, #7c3aed)',
            color: 'white',
            '&:hover': {
                transform: 'translateY(-2px)',
                boxShadow: '0 10px 20px rgba(0, 0, 0, 0.1)',
            },
        },
    },
};

export const AsButton: Story = {
    args: {
        as: 'button',
        children: 'Box as Button',
        rounded: 'lg',
        shadow: 'md',
        className: 'p-4 bg-white hover:bg-slate-50 active:bg-slate-100',
        onClick: () => alert('Clicked!'),
    },
}; 