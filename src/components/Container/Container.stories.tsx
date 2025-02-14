import type {Meta, StoryObj} from '@storybook/react';
import {Container} from './Container';

const meta = {
    title: 'Layout/Container',
    component: Container,
    parameters: {
        layout: 'fullscreen',
        docs: {
            description: {
                component: 'A container component that maintains consistent max-width and padding across different screen sizes.',
            },
        },
    },
    tags: ['autodocs'],
} satisfies Meta<typeof Container>;

export default meta;
type Story = StoryObj<typeof meta>;

const DemoContent = () => (
    <div className="w-full h-32 bg-slate-100 rounded-lg flex items-center justify-center">
        Content
    </div>
);

export const Basic: Story = {
    args: {
        children: <DemoContent />,
        className: 'bg-white p-4',
    },
};

export const Small: Story = {
    args: {
        children: <DemoContent />,
        size: 'sm',
        className: 'bg-white p-4',
    },
};

export const Medium: Story = {
    args: {
        children: <DemoContent />,
        size: 'md',
        className: 'bg-white p-4',
    },
};

export const Large: Story = {
    args: {
        children: <DemoContent />,
        size: 'lg',
        className: 'bg-white p-4',
    },
};

export const ExtraLarge: Story = {
    args: {
        children: <DemoContent />,
        size: 'xl',
        className: 'bg-white p-4',
    },
};

export const TwoExtraLarge: Story = {
    args: {
        children: <DemoContent />,
        size: '2xl',
        className: 'bg-white p-4',
    },
};

export const Responsive: Story = {
    args: {
        children: <DemoContent />,
        responsive: true,
        className: 'bg-white p-4',
    },
};

export const CustomStyling: Story = {
    args: {
        children: <DemoContent />,
        className: 'p-4',
        sx: {
            backgroundColor: '#f8fafc',
            borderLeft: '4px solid #4f46e5',
            '&:hover': {
                backgroundColor: '#f1f5f9',
            },
        },
    },
}; 