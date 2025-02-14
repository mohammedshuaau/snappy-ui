import React from 'react';
import type {Meta, StoryObj} from '@storybook/react';
import {Select} from './Select';

const meta = {
    title: 'Form/Select',
    component: Select,
    parameters: {
        layout: 'centered',
        docs: {
            description: {
                component: `
A flexible select component that supports single and multiple selection.

## Features
- Single and multi-select support
- Label and required field support
- Customizable default option
- Error states
- Different sizes
- Dark mode support
- Custom styling with \`sx\` prop
`,
            },
        },
    },
    tags: ['autodocs'],
} satisfies Meta<typeof Select>;

export default meta;
type Story = StoryObj<typeof meta>;

const options = [
    { value: 'apple', label: 'Apple' },
    { value: 'banana', label: 'Banana' },
    { value: 'orange', label: 'Orange' },
    { value: 'grape', label: 'Grape' },
    { value: 'mango', label: 'Mango' },
];

// Basic Select
export const Basic: Story = {
    args: {
        options,
        label: 'Fruit',
        placeholder: 'Select a fruit',
    },
    render: function BasicRender(args) {
        const [value, setValue] = React.useState<string>('');
        return (
            <div className="w-[300px]">
                <Select
                    {...args}
                    value={value}
                    onChange={(v) => setValue(v as string)}
                />
            </div>
        );
    },
};

// With Default Option
export const WithDefaultOption: Story = {
    args: {
        options,
        label: 'Fruit',
        placeholder: 'Select a fruit',
        defaultOption: 'Choose a fruit...',
    },
    render: function DefaultOptionRender(args) {
        const [value, setValue] = React.useState<string>('');
        return (
            <div className="w-[300px]">
                <Select
                    {...args}
                    value={value}
                    onChange={(v) => setValue(v as string)}
                />
            </div>
        );
    },
};

// Required Field
export const Required: Story = {
    args: {
        options,
        label: 'Fruit',
        required: true,
        placeholder: 'Select a fruit',
    },
    render: function RequiredRender(args) {
        const [value, setValue] = React.useState<string>('');
        return (
            <div className="w-[300px]">
                <Select
                    {...args}
                    value={value}
                    onChange={(v) => setValue(v as string)}
                />
            </div>
        );
    },
};

// Multiple Select
export const Multiple: Story = {
    args: {
        options,
        label: 'Fruits',
        multiple: true,
        placeholder: 'Select fruits',
    },
    render: function MultipleRender(args) {
        const [value, setValue] = React.useState<string[]>([]);
        return (
            <div className="w-[300px]">
                <Select
                    {...args}
                    value={value}
                    onChange={(v) => setValue(v as string[])}
                />
            </div>
        );
    },
};

// With Error
export const WithError: Story = {
    args: {
        options,
        label: 'Fruit',
        required: true,
        error: 'Please select a fruit',
        placeholder: 'Select a fruit',
    },
    render: function ErrorRender(args) {
        const [value, setValue] = React.useState<string>('');
        return (
            <div className="w-[300px]">
                <Select
                    {...args}
                    value={value}
                    onChange={(v) => setValue(v as string)}
                />
            </div>
        );
    },
};

// Disabled State
export const Disabled: Story = {
    args: {
        options,
        label: 'Fruit',
        disabled: true,
        placeholder: 'Select a fruit',
    },
};

// Different Sizes
export const Sizes: Story = {
    args: {
        options,
    },
    render: function SizesRender(args) {
        return (
            <div className="flex w-[300px] flex-col gap-4">
                <Select
                    {...args}
                    label="Small"
                    size="sm"
                    placeholder="Small select"
                />
                <Select
                    {...args}
                    label="Default"
                    size="default"
                    placeholder="Default select"
                />
                <Select
                    {...args}
                    label="Large"
                    size="lg"
                    placeholder="Large select"
                />
            </div>
        );
    },
};

// With Disabled Options
export const WithDisabledOptions: Story = {
    args: {
        label: 'Fruit',
        placeholder: 'Select a fruit',
        options: [
            { value: 'apple', label: 'Apple' },
            { value: 'banana', label: 'Banana', disabled: true },
            { value: 'orange', label: 'Orange' },
            { value: 'grape', label: 'Grape', disabled: true },
            { value: 'mango', label: 'Mango' },
        ],
    },
    render: function DisabledOptionsRender(args) {
        const [value, setValue] = React.useState<string>('');
        return (
            <div className="w-[300px]">
                <Select
                    {...args}
                    value={value}
                    onChange={(v) => setValue(v as string)}
                />
            </div>
        );
    },
};

// Custom Styled
export const CustomStyled: Story = {
    args: {
        options,
        label: 'Custom Select',
        placeholder: 'Select a fruit',
        sx: {
            background: 'linear-gradient(to right, #4f46e5, #7c3aed)',
            color: 'white',
            borderColor: 'transparent',
            '&:hover': {
                borderColor: 'rgba(255, 255, 255, 0.2)',
            },
        },
    },
    render: function CustomStyledRender(args) {
        const [value, setValue] = React.useState<string>('');
        return (
            <div className="w-[300px]">
                <Select
                    {...args}
                    value={value}
                    onChange={(v) => setValue(v as string)}
                />
            </div>
        );
    },
}; 