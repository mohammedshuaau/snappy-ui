import React from 'react';
import type {Meta, StoryObj} from '@storybook/react';
import {Stack} from './Stack';

const meta = {
    title: 'Layout/Stack',
    component: Stack,
    parameters: {
        layout: 'centered',
        docs: {
            description: {
                component: 'A layout component that stacks its children with consistent spacing.',
            },
        },
    },
    tags: ['autodocs'],
} satisfies Meta<typeof Stack>;

export default meta;
type Story = StoryObj<typeof meta>;

const Box = ({ children }: { children: React.ReactNode }) => (
    <div className="bg-slate-200 p-4 rounded">
        {children}
    </div>
);

export const Vertical: Story = {
    args: {
        children: (
            <>
                <Box>Item 1</Box>
                <Box>Item 2</Box>
                <Box>Item 3</Box>
            </>
        ),
        direction: 'vertical',
        spacing: 4,
        className: 'bg-white p-4',
    },
};

export const Horizontal: Story = {
    args: {
        children: (
            <>
                <Box>Item 1</Box>
                <Box>Item 2</Box>
                <Box>Item 3</Box>
            </>
        ),
        direction: 'horizontal',
        spacing: 4,
        className: 'bg-white p-4',
    },
};

export const WithDivider: Story = {
    args: {
        children: (
            <>
                <Box>Item 1</Box>
                <Box>Item 2</Box>
                <Box>Item 3</Box>
            </>
        ),
        divider: true,
        spacing: 4,
        className: 'bg-white p-4',
    },
};

export const AlignCenter: Story = {
    args: {
        children: (
            <>
                <Box>Short</Box>
                <Box>Medium length content</Box>
                <Box>Very long content that takes more space</Box>
            </>
        ),
        align: 'center',
        spacing: 4,
        className: 'bg-white p-4',
    },
};

export const JustifyBetween: Story = {
    args: {
        children: (
            <>
                <Box>Start</Box>
                <Box>Middle</Box>
                <Box>End</Box>
            </>
        ),
        direction: 'horizontal',
        justify: 'between',
        className: 'bg-white p-4 w-96',
    },
};

export const Wrap: Story = {
    args: {
        children: (
            <>
                {Array.from({ length: 8 }).map((_, i) => (
                    <Box key={i}>Item {i + 1}</Box>
                ))}
            </>
        ),
        direction: 'horizontal',
        wrap: true,
        spacing: 4,
        className: 'bg-white p-4 w-64',
    },
};

export const Responsive: Story = {
    args: {
        children: (
            <>
                <Box>Item 1</Box>
                <Box>Item 2</Box>
                <Box>Item 3</Box>
            </>
        ),
        responsive: true,
        spacing: 4,
        className: 'bg-white p-4',
    },
};

export const CustomStyling: Story = {
    args: {
        children: (
            <>
                <Box>Item 1</Box>
                <Box>Item 2</Box>
                <Box>Item 3</Box>
            </>
        ),
        spacing: 4,
        className: 'p-4 rounded-lg',
        sx: {
            backgroundColor: '#f8fafc',
            boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
            '&:hover': {
                backgroundColor: '#f1f5f9',
            },
        },
    },
}; 