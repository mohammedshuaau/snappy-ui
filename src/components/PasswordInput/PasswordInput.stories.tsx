import type {Meta, StoryObj} from '@storybook/react';
import {PasswordInput} from './PasswordInput';

const meta = {
    title: 'Form/PasswordInput',
    component: PasswordInput,
    parameters: {
        layout: 'centered',
    },
    tags: ['autodocs'],
    argTypes: {
        variant: {
            control: 'select',
            options: ['default', 'error'],
        },
        size: {
            control: 'select',
            options: ['sm', 'default', 'lg'],
        },
        showStrength: {
            control: 'boolean',
        },
    },
} satisfies Meta<typeof PasswordInput>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
    args: {
        placeholder: 'Enter password',
    },
};

export const WithLabel: Story = {
    args: {
        label: 'Password',
        placeholder: 'Enter your password',
    },
};

export const WithStrengthIndicator: Story = {
    args: {
        label: 'Password',
        placeholder: 'Enter your password',
        showStrength: true,
        helperText: 'Password must contain at least 8 characters, including uppercase, numbers, and special characters',
    },
};

export const Sizes = () => (
    <div className="flex flex-col gap-4 w-[300px]">
        <PasswordInput size="sm" placeholder="Small" />
        <PasswordInput size="default" placeholder="Default" />
        <PasswordInput size="lg" placeholder="Large" />
    </div>
);

export const WithCustomStrengthCheck: Story = {
    args: {
        label: 'Password',
        placeholder: 'Enter your password',
        showStrength: true,
        strengthCheck: (password) => {
            let score = 0;
            if (password.length >= 12) score++; // Longer password
            if (/[A-Z]/.test(password)) score++; // Uppercase
            if (/[0-9]/.test(password)) score++; // Numbers
            if (/[^A-Za-z0-9]/.test(password)) score++; // Special characters
            return score;
        },
        helperText: 'Custom strength calculation (12+ chars, uppercase, numbers, special chars)',
    },
};

export const WithError: Story = {
    args: {
        label: 'Password',
        placeholder: 'Enter your password',
        variant: 'error',
        helperText: 'Password is required',
        showStrength: true,
    },
};

export const CustomStyled: Story = {
    args: {
        label: 'Custom Styled Password',
        placeholder: 'Enter your password',
        showStrength: true,
        sx: {
            '& input': {
                background: 'linear-gradient(45deg, #f3f4f6, #e5e7eb)',
                borderRadius: '0.75rem',
                borderColor: '#6366f1',
                '&:focus': {
                    borderColor: '#4f46e5',
                    boxShadow: '0 0 0 2px rgba(99, 102, 241, 0.2)',
                },
            },
            '& button': {
                background: 'linear-gradient(45deg, #6366f1, #4f46e5)',
                color: 'white',
                borderRadius: '0.5rem',
                marginLeft: '0.5rem',
                '&:hover': {
                    background: 'linear-gradient(45deg, #4f46e5, #4338ca)',
                },
            },
            '& [role="progressbar"]': {
                background: 'linear-gradient(45deg, #6366f1, #4f46e5)',
                height: '0.5rem',
                borderRadius: '0.25rem',
                marginTop: '0.5rem',
            },
        },
    },
}; 