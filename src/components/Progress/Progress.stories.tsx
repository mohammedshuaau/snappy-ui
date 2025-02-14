import React from 'react';
import type {Meta, StoryObj} from '@storybook/react';
import {Progress} from './Progress';

const meta = {
    title: 'Data Display/Progress',
    component: Progress,
    parameters: {
        layout: 'padded',
    },
    tags: ['autodocs'],
    argTypes: {
        value: {
            control: { type: 'range', min: 0, max: 100 },
        },
        variant: {
            control: 'select',
            options: ['default', 'success', 'warning', 'error'],
        },
        size: {
            control: 'select',
            options: ['sm', 'md', 'lg', 'xl'],
        },
        showValue: {
            control: 'boolean',
        },
        animated: {
            control: 'boolean',
        },
        indeterminate: {
            control: 'boolean',
        },
    },
} satisfies Meta<typeof Progress>;

export default meta;
type Story = StoryObj<typeof Progress>;

// Basic examples
export const Default: Story = {
    args: {
        value: 60,
    },
};

export const WithValue: Story = {
    args: {
        value: 75,
        showValue: true,
    },
};

export const Indeterminate: Story = {
    args: {
        indeterminate: true,
    },
};

// Variants
export const Variants = () => (
    <div className="flex flex-col gap-4">
        <Progress value={75} variant="default" />
        <Progress value={75} variant="success" />
        <Progress value={75} variant="warning" />
        <Progress value={75} variant="error" />
    </div>
);

// Sizes
export const Sizes = () => (
    <div className="flex flex-col gap-4">
        <Progress value={75} size="sm" />
        <Progress value={75} size="md" />
        <Progress value={75} size="lg" />
        <Progress value={75} size="xl" />
    </div>
);

// Animated
export const Animated = () => (
    <div className="flex flex-col gap-4">
        <Progress value={75} animated />
        <Progress value={75} variant="success" animated />
        <Progress value={75} variant="warning" animated />
        <Progress value={75} variant="error" animated />
    </div>
);

// With value label
export const WithValueLabel = () => (
    <div className="flex flex-col gap-4">
        <Progress value={25} showValue />
        <Progress value={50} showValue />
        <Progress value={75} showValue />
        <Progress value={100} showValue />
    </div>
);

// Custom styled
export const CustomStyled: Story = {
    args: {
        value: 75,
        showValue: true,
        sx: {
            height: '1.5rem',
            borderRadius: '0.75rem',
            background: 'linear-gradient(45deg, #f3f4f6, #e5e7eb)',
            boxShadow: 'inset 0 2px 4px rgba(0, 0, 0, 0.1)',
            '& > div:first-child': {
                background: 'linear-gradient(45deg, #4f46e5, #7c3aed)',
                boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
            },
            '& > div:last-child': {
                color: 'white',
                fontWeight: 600,
                textShadow: '0 1px 2px rgba(0, 0, 0, 0.1)',
            },
        },
    },
};

// Interactive example
export const Interactive = () => {
    const [value, setValue] = React.useState(0);

    React.useEffect(() => {
        const interval = setInterval(() => {
            setValue((v) => (v >= 100 ? 0 : v + 1));
        }, 100);
        return () => clearInterval(interval);
    }, []);

    return (
        <div className="flex flex-col gap-4">
            <Progress value={value} showValue animated />
            <Progress value={value} variant="success" showValue animated />
            <Progress value={value} variant="warning" showValue animated />
            <Progress value={value} variant="error" showValue animated />
        </div>
    );
}; 