import type { Meta, StoryObj } from '@storybook/react';
import { Button } from '../Button/Button';
import { Tooltip } from './Tooltip';

const meta = {
    title: 'Feedback/Tooltip',
    component: Tooltip,
    parameters: {
        layout: 'centered',
        docs: {
            description: {
                component: 'A tooltip component that displays informative text when hovering over or focusing on an element.',
            },
        },
    },
    tags: ['autodocs'],
} satisfies Meta<typeof Tooltip>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Basic: Story = {
    args: {
        content: 'This is a tooltip',
        children: <Button>Hover me</Button>,
    },
};

export const Positions: Story = {
    args: {
        children: <div />,
        content: ''
    },
    render: () => (
        <div className="flex gap-4 items-center">
            <Tooltip content="Tooltip on top" position="top">
                <Button variant="outline">Top</Button>
            </Tooltip>
            <Tooltip content="Tooltip on bottom" position="bottom">
                <Button variant="outline">Bottom</Button>
            </Tooltip>
            <Tooltip content="Tooltip on left" position="left">
                <Button variant="outline">Left</Button>
            </Tooltip>
            <Tooltip content="Tooltip on right" position="right">
                <Button variant="outline">Right</Button>
            </Tooltip>
        </div>
    ),
};

export const WithDelay: Story = {
    args: {
        content: 'Tooltip with custom delay',
        delayShow: 500,
        delayHide: 300,
        children: <Button>Hover me (slow)</Button>,
    },
};

export const WithHTML: Story = {
    args: {
        content: (
            <div>
                <strong>Rich content</strong>
                <p className="mt-1">With multiple lines of text</p>
                <ul className="list-disc list-inside mt-1">
                    <li>Feature 1</li>
                    <li>Feature 2</li>
                </ul>
            </div>
        ),
        children: <Button>Hover for rich content</Button>,
    },
};

export const CustomStyling: Story = {
    args: {
        content: 'Custom styled tooltip',
        children: <Button>Hover me</Button>,
        sx: {
            backgroundColor: '#4f46e5',
            borderRadius: '0.5rem',
            padding: '0.75rem 1rem',
            '&:hover': {
                backgroundColor: '#4338ca',
            },
        },
    },
}; 