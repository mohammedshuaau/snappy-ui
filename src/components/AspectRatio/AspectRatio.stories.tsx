import type {Meta, StoryObj} from '@storybook/react';
import {AspectRatio} from './AspectRatio';

const meta = {
    title: 'Layout/AspectRatio',
    component: AspectRatio,
    parameters: {
        layout: 'centered',
        docs: {
            description: {
                component: 'A component that maintains a consistent aspect ratio for its content.',
            },
        },
    },
    tags: ['autodocs'],
} satisfies Meta<typeof AspectRatio>;

export default meta;
type Story = StoryObj<typeof meta>;

const PlaceholderContent = () => (
    <div className="w-full h-full bg-slate-200 flex items-center justify-center">
        Content
    </div>
);

const ImageContent = () => (
    <img
        src="https://images.unsplash.com/photo-1706502563914-b95a6f5c4f0c"
        alt="Sample"
        className="w-full h-full object-cover"
    />
);

export const Square: Story = {
    args: {
        children: <PlaceholderContent />,
        ratio: '1/1',
        className: 'w-64',
    },
};

export const Video: Story = {
    args: {
        children: <PlaceholderContent />,
        ratio: '16/9',
        className: 'w-96',
    },
};

export const Widescreen: Story = {
    args: {
        children: <PlaceholderContent />,
        ratio: '21/9',
        className: 'w-96',
    },
};

export const Portrait: Story = {
    args: {
        children: <PlaceholderContent />,
        ratio: '3/4',
        className: 'w-64',
    },
};

export const Mobile: Story = {
    args: {
        children: <PlaceholderContent />,
        ratio: '9/16',
        className: 'w-64',
    },
};

export const WithImage: Story = {
    args: {
        children: <ImageContent />,
        ratio: '16/9',
        className: 'w-96',
        rounded: 'lg',
    },
};

export const WithRoundedCorners: Story = {
    args: {
        children: <PlaceholderContent />,
        ratio: '1/1',
        rounded: 'xl',
        className: 'w-64',
    },
};

export const CustomStyling: Story = {
    args: {
        children: <PlaceholderContent />,
        ratio: '16/9',
        className: 'w-96',
        sx: {
            backgroundColor: '#f8fafc',
            boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
            '&:hover': {
                transform: 'scale(1.02)',
            },
        },
    },
}; 