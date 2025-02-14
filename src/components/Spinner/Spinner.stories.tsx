import type {Meta, StoryObj} from '@storybook/react';
import {Spinner} from './Spinner';

const meta = {
    title: 'Feedback/Spinner',
    component: Spinner,
    parameters: {
        layout: 'centered',
    },
    tags: ['autodocs'],
    argTypes: {
        variant: {
            control: 'select',
            options: ['primary', 'secondary', 'success', 'danger', 'warning', 'info'],
        },
        size: {
            control: 'select',
            options: ['xs', 'sm', 'md', 'lg', 'xl'],
        },
    },
} satisfies Meta<typeof Spinner>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
    args: {},
};

export const Variants: Story = {
    render: () => (
        <div className="flex gap-4 items-center">
            <Spinner variant="primary" />
            <Spinner variant="secondary" />
            <Spinner variant="success" />
            <Spinner variant="danger" />
            <Spinner variant="warning" />
            <Spinner variant="info" />
        </div>
    ),
};

export const Sizes: Story = {
    render: () => (
        <div className="flex gap-4 items-center">
            <Spinner size="xs" />
            <Spinner size="sm" />
            <Spinner size="md" />
            <Spinner size="lg" />
            <Spinner size="xl" />
        </div>
    ),
};

export const CustomStyles: Story = {
    args: {
        sx: {
            borderWidth: '4px',
            width: '3rem',
            height: '3rem',
        },
    },
}; 