import React from 'react';
import type {Meta, StoryObj} from '@storybook/react';
import {Flex} from './Flex';

const meta = {
    title: 'Layout/Flex',
    component: Flex,
    parameters: {
        layout: 'centered',
        docs: {
            description: {
                component: 'A flexible box layout component with various alignment and spacing options.',
            },
        },
    },
    tags: ['autodocs'],
} satisfies Meta<typeof Flex>;

export default meta;
type Story = StoryObj<typeof meta>;

const Box = ({ children }: { children: React.ReactNode }) => (
    <div className="w-16 h-16 bg-slate-200 rounded flex items-center justify-center">
        {children}
    </div>
);

export const Basic: Story = {
    args: {
        children: (
            <>
                <Box>1</Box>
                <Box>2</Box>
                <Box>3</Box>
            </>
        ),
        className: 'bg-white p-4',
    },
};

export const Column: Story = {
    args: {
        children: (
            <>
                <Box>1</Box>
                <Box>2</Box>
                <Box>3</Box>
            </>
        ),
        direction: 'column',
        className: 'bg-white p-4',
    },
};

export const WithGap: Story = {
    args: {
        children: (
            <>
                <Box>1</Box>
                <Box>2</Box>
                <Box>3</Box>
            </>
        ),
        gap: 4,
        className: 'bg-white p-4',
    },
};

export const JustifyCenter: Story = {
    args: {
        children: (
            <>
                <Box>1</Box>
                <Box>2</Box>
                <Box>3</Box>
            </>
        ),
        justify: 'center',
        className: 'bg-white p-4 w-96',
    },
};

export const AlignCenter: Story = {
    args: {
        children: (
            <>
                <Box>1</Box>
                <Box>2</Box>
                <Box>3</Box>
            </>
        ),
        align: 'center',
        className: 'bg-white p-4 h-32',
    },
};

export const Wrap: Story = {
    args: {
        children: (
            <>
                {Array.from({ length: 10 }).map((_, i) => (
                    <Box key={i}>{i + 1}</Box>
                ))}
            </>
        ),
        wrap: 'wrap',
        gap: 2,
        className: 'bg-white p-4 w-64',
    },
};

export const Responsive: Story = {
    args: {
        children: (
            <>
                <Box>1</Box>
                <Box>2</Box>
                <Box>3</Box>
            </>
        ),
        direction: 'column',
        gap: 4,
        className: 'bg-white p-4 sm:flex-row',
    },
};

export const CustomStyling: Story = {
    args: {
        children: (
            <>
                <Box>1</Box>
                <Box>2</Box>
                <Box>3</Box>
            </>
        ),
        gap: 4,
        className: 'p-4 rounded-lg',
        sx: {
            backgroundColor: '#f8fafc',
            boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
            '&:hover': {
                transform: 'translateY(-2px)',
            },
        },
    },
}; 