import type { Meta, StoryObj } from '@storybook/react';
import { Input } from './Input';

// Example icons
const SearchIcon = () => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        width="16"
        height="16"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
    >
        <circle cx="11" cy="11" r="8" />
        <line x1="21" y1="21" x2="16.65" y2="16.65" />
    </svg>
);

const LockIcon = () => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        width="16"
        height="16"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
    >
        <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
        <path d="M7 11V7a5 5 0 0 1 10 0v4" />
    </svg>
);

const meta = {
    title: 'Form/Input',
    component: Input,
    parameters: {
        layout: 'centered',
    },
    tags: ['autodocs'],
} satisfies Meta<typeof Input>;

export default meta;
type Story = StoryObj<typeof Input>;

// Basic examples
export const Default: Story = {
    args: {
        placeholder: 'Enter text...',
    },
};

export const WithLabel: Story = {
    args: {
        label: 'Email',
        placeholder: 'Enter your email',
        type: 'email',
    },
};

export const Required: Story = {
    args: {
        label: 'Email',
        placeholder: 'Enter your email',
        type: 'email',
        required: true,
    },
};

export const WithHelperText: Story = {
    args: {
        label: 'Password',
        placeholder: 'Enter your password',
        type: 'password',
        helperText: 'Password must be at least 8 characters',
    },
};

// Variants
export const Error: Story = {
    args: {
        label: 'Email',
        placeholder: 'Enter your email',
        type: 'email',
        error: 'Invalid email address',
        value: 'invalid-email',
    },
};

export const Success: Story = {
    args: {
        label: 'Email',
        placeholder: 'Enter your email',
        type: 'email',
        success: 'Email is available',
        value: 'good@example.com',
    },
};

// Sizes
export const Small: Story = {
    args: {
        placeholder: 'Small input',
        size: 'sm',
    },
};

export const Large: Story = {
    args: {
        placeholder: 'Large input',
        size: 'lg',
    },
};

// States
export const Disabled: Story = {
    args: {
        placeholder: 'Disabled input',
        disabled: true,
    },
};

// With icons
export const WithLeftIcon: Story = {
    args: {
        placeholder: 'Search...',
        leftIcon: <SearchIcon />,
    },
};

export const WithRightIcon: Story = {
    args: {
        placeholder: 'Search...',
        rightIcon: <SearchIcon />,
    },
};

export const WithBothIcons: Story = {
    args: {
        placeholder: 'Enter password',
        type: 'password',
        leftIcon: <LockIcon />,
        rightIcon: (
            <button
                type="button"
                onClick={() => alert('Toggle password visibility')}
                className="focus:outline-none"
            >
                👁️
            </button>
        ),
    },
};

// Custom Styles
export const CustomStyles = () => (
    <div className="flex flex-col gap-4">
        <Input
            label="Hover Animation"
            placeholder="Hover me for animation..."
            sx={{
                backgroundColor: '#f8fafc',
                borderColor: '#e2e8f0',
                transition: 'all 0.2s ease',
                '&:hover': {
                    backgroundColor: '#f1f5f9',
                    borderColor: '#94a3b8',
                    transform: 'translateY(-1px)',
                },
                '&:focus': {
                    backgroundColor: 'white',
                    transform: 'translateY(0)',
                    borderColor: '#3b82f6',
                    boxShadow: '0 0 0 2px rgba(59, 130, 246, 0.2)',
                },
            }}
        />
        <Input
            label="Gradient Border"
            placeholder="Focus me for gradient..."
            sx={{
                borderWidth: '2px',
                borderImage: 'linear-gradient(to right, #6366f1, #8b5cf6) 1',
                transition: 'all 0.3s ease',
                '&:focus': {
                    borderImage: 'linear-gradient(to right, #8b5cf6, #6366f1) 1',
                    backgroundColor: 'rgba(99, 102, 241, 0.05)',
                },
            }}
        />
        <Input
            label="Custom Animation"
            placeholder="Type something..."
            sx={{
                transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                '&:focus': {
                    backgroundColor: 'rgba(59, 130, 246, 0.1)',
                    borderColor: '#3b82f6',
                    transform: 'scale(1.01)',
                },
                '&::placeholder': {
                    transition: 'opacity 0.2s ease',
                },
                '&:focus::placeholder': {
                    opacity: '0.5',
                },
            }}
        />
        <Input
            label="Shine Effect"
            placeholder="Focus me for shine..."
            sx={{
                position: 'relative',
                overflow: 'hidden',
                '&::before': {
                    content: '""',
                    position: 'absolute',
                    top: '0',
                    left: '-100%',
                    width: '100%',
                    height: '100%',
                    background: 'linear-gradient(90deg, transparent, rgba(99, 102, 241, 0.2), transparent)',
                    transition: 'left 0.5s ease',
                },
                '&:focus::before': {
                    left: '100%',
                },
            }}
        />
    </div>
);

CustomStyles.parameters = {
    docs: {
        description: {
            story: 'Use `sx` prop for custom styling including complex animations, pseudo-elements, and advanced CSS properties.',
        },
    },
};

// Styling Examples
export const StylingWithSx = () => (
    <div className="flex flex-col gap-4">
        <Input
            label="Complex Hover States"
            placeholder="Hover me for complex interactions..."
            sx={{
                backgroundColor: '#f8fafc',
                borderColor: '#e2e8f0',
                transition: 'all 0.2s ease',
                '&:hover': {
                    backgroundColor: '#f1f5f9',
                    borderColor: '#94a3b8',
                    transform: 'translateY(-1px)',
                },
                '&:focus': {
                    backgroundColor: 'white',
                    transform: 'translateY(0)',
                },
            }}
        />
        <Input
            label="Gradient Border"
            placeholder="Complex border effects..."
            sx={{
                borderWidth: '2px',
                borderImage: 'linear-gradient(to right, #6366f1, #8b5cf6) 1',
                '&:focus': {
                    borderImage: 'linear-gradient(to right, #8b5cf6, #6366f1) 1',
                },
            }}
        />
        <Input
            label="Custom Animation"
            placeholder="Type something..."
            sx={{
                transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                '&:focus': {
                    backgroundColor: 'rgba(59, 130, 246, 0.1)',
                    borderColor: '#3b82f6',
                },
                '&::placeholder': {
                    transition: 'opacity 0.2s ease',
                },
                '&:focus::placeholder': {
                    opacity: '0.5',
                },
            }}
        />
    </div>
);

StylingWithSx.parameters = {
    docs: {
        description: {
            story: 'Use `sx` prop for complex styling needs including pseudo-classes, animations, and CSS properties that are not easily achieved with utility classes.',
        },
    },
}; 