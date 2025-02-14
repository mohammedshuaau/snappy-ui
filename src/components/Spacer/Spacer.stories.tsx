import React from 'react';
import type {Meta, StoryObj} from '@storybook/react';
import {Spacer} from './Spacer';

const meta = {
    title: 'Layout/Spacer',
    component: Spacer,
    parameters: {
        layout: 'centered',
        docs: {
            description: {
                component: 'A component that creates consistent spacing between elements.',
            },
        },
    },
    tags: ['autodocs'],
} satisfies Meta<typeof Spacer>;

export default meta;
type Story = StoryObj<typeof meta>;

const Box = ({ children }: { children: React.ReactNode }) => (
    <div className="bg-slate-200 p-4 rounded">
        {children}
    </div>
);

export const Basic: Story = {
    render: () => (
        <div className="bg-white p-4">
            <Box>First</Box>
            <Spacer size={4} />
            <Box>Second</Box>
        </div>
    ),
};

export const Sizes: Story = {
    render: () => (
        <div className="space-y-8 bg-white p-4">
            <div>
                <p className="mb-2 text-sm text-slate-500">Size 2</p>
                <Box>First</Box>
                <Spacer size={2} />
                <Box>Second</Box>
            </div>
            <div>
                <p className="mb-2 text-sm text-slate-500">Size 4</p>
                <Box>First</Box>
                <Spacer size={4} />
                <Box>Second</Box>
            </div>
            <div>
                <p className="mb-2 text-sm text-slate-500">Size 8</p>
                <Box>First</Box>
                <Spacer size={8} />
                <Box>Second</Box>
            </div>
        </div>
    ),
};

export const HorizontalAxis: Story = {
    render: () => (
        <div className="bg-white p-4 flex items-center">
            <Box>Left</Box>
            <Spacer size={4} axis="x" />
            <Box>Right</Box>
        </div>
    ),
};

export const VerticalAxis: Story = {
    render: () => (
        <div className="bg-white p-4">
            <Box>Top</Box>
            <Spacer size={4} axis="y" />
            <Box>Bottom</Box>
        </div>
    ),
};

export const Growing: Story = {
    render: () => (
        <div className="bg-white p-4 flex">
            <Box>Start</Box>
            <Spacer grow />
            <Box>End</Box>
        </div>
    ),
};

export const CustomStyling: Story = {
    args: {
        size: 4,
        className: 'w-full',
        sx: {
            backgroundColor: '#e2e8f0',
            '&:hover': {
                backgroundColor: '#cbd5e1',
            },
        },
    },
    decorators: [
        (Story) => (
            <div className="w-96 bg-white p-4">
                <Box>First</Box>
                <Story />
                <Box>Second</Box>
            </div>
        ),
    ],
}; 