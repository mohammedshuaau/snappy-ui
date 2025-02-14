import type {Meta, StoryObj} from '@storybook/react';
import {Textarea} from './Textarea';

const meta = {
    title: 'Form/Textarea',
    component: Textarea,
    parameters: {
        layout: 'centered',
        docs: {
            description: {
                component: 'A flexible textarea component that supports different sizes, states, and variants. Features include label support, error handling, and dark mode compatibility.',
            },
        },
    },
    tags: ['autodocs'],
} satisfies Meta<typeof Textarea>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Basic: Story = {
    args: {
        placeholder: 'Type your message here...',
    },
};

export const WithLabel: Story = {
    args: {
        label: 'Message',
        placeholder: 'Type your message here...',
    },
};

export const Required: Story = {
    args: {
        label: 'Message',
        placeholder: 'Type your message here...',
        required: true,
    },
};

export const WithError: Story = {
    args: {
        label: 'Message',
        placeholder: 'Type your message here...',
        error: 'This field is required',
        required: true,
    },
};

export const Disabled: Story = {
    args: {
        label: 'Message',
        placeholder: 'This textarea is disabled',
        disabled: true,
        value: 'This is a disabled textarea with some content.',
    },
};

export const Small: Story = {
    args: {
        label: 'Small Textarea',
        placeholder: 'Small size textarea...',
        size: 'sm',
    },
};

export const Large: Story = {
    args: {
        label: 'Large Textarea',
        placeholder: 'Large size textarea...',
        size: 'lg',
    },
};

export const CustomStyling: Story = {
    args: {
        label: 'Custom Styled Textarea',
        placeholder: 'Type something...',
        sx: {
            background: 'linear-gradient(to right, #4f46e5, #7c3aed)',
            color: 'white',
            borderColor: 'transparent',
            '&:hover': {
                borderColor: 'rgba(255, 255, 255, 0.2)',
            },
            '&:focus': {
                borderColor: 'rgba(255, 255, 255, 0.5)',
                boxShadow: '0 0 0 2px rgba(255, 255, 255, 0.2)',
            },
            '&::placeholder': {
                color: 'rgba(255, 255, 255, 0.6)',
            },
        },
    },
}; 