import type {Meta, StoryObj} from '@storybook/react';
import {Button} from './Button';

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

const ArrowRightIcon = () => (
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
        <line x1="5" y1="12" x2="19" y2="12" />
        <polyline points="12 5 19 12 12 19" />
    </svg>
);

const meta = {
    title: 'Form/Button',
    component: Button,
    parameters: {
        layout: 'centered',
    },
    tags: ['autodocs'],
    argTypes: {
        variant: {
            control: 'select',
            options: ['default', 'destructive', 'outline', 'secondary', 'ghost', 'link'],
        },
        size: {
            control: 'select',
            options: ['default', 'sm', 'lg', 'icon'],
        },
        fullWidth: {
            control: 'boolean',
        },
        loading: {
            control: 'boolean',
        },
        disabled: {
            control: 'boolean',
        },
    },
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof Button>;

// Basic variants
export const Default: Story = {
    args: {
        children: 'Button',
        variant: 'default',
    },
};

export const Secondary: Story = {
    args: {
        children: 'Secondary',
        variant: 'secondary',
    },
};

export const Destructive: Story = {
    args: {
        children: 'Destructive',
        variant: 'destructive',
    },
};

export const Outline: Story = {
    args: {
        children: 'Outline',
        variant: 'outline',
    },
};

export const Ghost: Story = {
    args: {
        children: 'Ghost',
        variant: 'ghost',
    },
};

export const Link: Story = {
    args: {
        children: 'Link Button',
        variant: 'link',
    },
};

// Icon examples
export const WithLeftIcon: Story = {
    args: {
        children: 'Search',
        leftIcon: <SearchIcon />,
    },
};

export const WithRightIcon: Story = {
    args: {
        children: 'Next',
        rightIcon: <ArrowRightIcon />,
    },
};

export const WithBothIcons: Story = {
    args: {
        children: 'Search & Go',
        leftIcon: <SearchIcon />,
        rightIcon: <ArrowRightIcon />,
    },
};

// States
export const Loading: Story = {
    args: {
        children: 'Loading',
        loading: true,
    },
};

export const LoadingWithIcon: Story = {
    args: {
        children: 'Loading',
        loading: true,
        leftIcon: <SearchIcon />,
        rightIcon: <ArrowRightIcon />,
    },
};

export const Disabled: Story = {
    args: {
        children: 'Disabled',
        disabled: true,
    },
};

// Sizes
export const Small: Story = {
    args: {
        children: 'Small',
        size: 'sm',
    },
};

export const Large: Story = {
    args: {
        children: 'Large',
        size: 'lg',
    },
};

export const FullWidth: Story = {
    args: {
        children: 'Full Width Button',
        fullWidth: true,
    },
};

// Styling Examples
export const CustomStyles = () => (
    <div className="flex flex-col gap-8">
        <div className="flex gap-4">
            <Button
                sx={{
                    background: 'linear-gradient(to right, #06b6d4, #3b82f6)',
                    color: 'white',
                    transition: 'all 0.2s ease',
                    '&:hover': {
                        background: 'linear-gradient(to right, #0891b2, #2563eb)',
                        transform: 'translateY(-2px)',
                    },
                }}
            >
                Gradient Background
            </Button>
            <Button
                sx={{
                    borderRadius: '9999px',
                    padding: '0 2rem',
                    backgroundColor: '#a855f7',
                    color: 'white',
                    '&:hover': {
                        backgroundColor: '#9333ea',
                    },
                }}
            >
                Rounded Button
            </Button>
            <Button
                sx={{
                    boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)',
                    backgroundColor: 'white',
                    color: '#1f2937',
                    transition: 'all 0.2s ease',
                    '&:hover': {
                        backgroundColor: '#f9fafb',
                        boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1)',
                    },
                }}
            >
                Shadow Effect
            </Button>
        </div>
        <div className="flex gap-4">
            <Button
                sx={{
                    backgroundColor: 'transparent',
                    border: '2px solid #6366f1',
                    color: '#6366f1',
                    overflow: 'hidden',
                    position: 'relative',
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
                    '&:hover::before': {
                        left: '100%',
                    },
                }}
            >
                Shine Effect
            </Button>
            <Button
                sx={{
                    backgroundColor: '#22c55e',
                    color: 'white',
                    position: 'relative',
                    '&::after': {
                        content: '""',
                        position: 'absolute',
                        width: '0',
                        height: '2px',
                        bottom: '0',
                        left: '50%',
                        backgroundColor: 'white',
                        transition: 'all 0.3s ease',
                    },
                    '&:hover::after': {
                        width: '80%',
                        left: '10%',
                    },
                }}
            >
                Underline Animation
            </Button>
        </div>
    </div>
);

CustomStyles.parameters = {
    docs: {
        description: {
            story: 'Use `sx` prop for custom styling including complex animations, pseudo-elements, and advanced CSS properties.',
        },
    },
}; 