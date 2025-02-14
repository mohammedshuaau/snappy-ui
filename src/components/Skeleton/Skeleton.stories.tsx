import type {Meta, StoryObj} from '@storybook/react';
import {Skeleton, SkeletonCircle, SkeletonRectangle, SkeletonText} from './Skeleton';

const meta = {
    title: 'Data Display/Skeleton',
    component: Skeleton,
    parameters: {
        layout: 'padded',
    },
    tags: ['autodocs'],
    argTypes: {
        variant: {
            control: 'select',
            options: ['default', 'circular', 'rectangular'],
        },
        animation: {
            control: 'select',
            options: ['pulse', 'wave', 'none'],
        },
        width: {
            control: 'text',
        },
        height: {
            control: 'text',
        },
    },
} satisfies Meta<typeof Skeleton>;

export default meta;
type Story = StoryObj<typeof Skeleton>;

// Basic examples
export const Default: Story = {
    args: {
        width: 200,
        height: 20,
    },
};

export const Circular: Story = {
    args: {
        variant: 'circular',
        width: 48,
        height: 48,
    },
};

export const Rectangular: Story = {
    args: {
        variant: 'rectangular',
        width: 200,
        height: 100,
    },
};

// Animation variants
export const Animations = () => (
    <div className="flex flex-col gap-4">
        <Skeleton width={200} height={20} animation="pulse" />
        <Skeleton width={200} height={20} animation="wave" />
        <Skeleton width={200} height={20} animation="none" />
    </div>
);

// Text skeleton
export const Text = () => (
    <div className="flex flex-col gap-2 max-w-md">
        <SkeletonText width="80%" />
        <SkeletonText width="100%" />
        <SkeletonText width="60%" />
    </div>
);

// Avatar with text
export const AvatarWithText = () => (
    <div className="flex gap-4 items-center">
        <SkeletonCircle width={48} height={48} />
        <div className="flex flex-col gap-2">
            <SkeletonText width={120} />
            <SkeletonText width={80} />
        </div>
    </div>
);

// Card skeleton
export const CardSkeleton = () => (
    <div className="w-full max-w-sm p-4 border rounded-lg shadow">
        <SkeletonRectangle width="100%" height={200} />
        <div className="mt-4 space-y-3">
            <SkeletonText width="80%" />
            <SkeletonText width="60%" />
            <div className="flex gap-2 mt-4">
                <Skeleton width={80} height={32} />
                <Skeleton width={80} height={32} />
            </div>
        </div>
    </div>
);

// List skeleton
export const ListSkeleton = () => (
    <div className="w-full max-w-md space-y-4">
        {[1, 2, 3].map((i) => (
            <div key={i} className="flex items-center gap-3">
                <SkeletonCircle width={40} height={40} />
                <div className="flex-1">
                    <SkeletonText width="60%" />
                    <SkeletonText width="40%" className="mt-2" />
                </div>
                <Skeleton width={60} height={24} />
            </div>
        ))}
    </div>
);

// Table skeleton
export const TableSkeleton = () => (
    <div className="w-full max-w-2xl">
        <div className="grid grid-cols-4 gap-4 mb-4">
            {[1, 2, 3, 4].map((i) => (
                <Skeleton key={i} height={24} />
            ))}
        </div>
        {[1, 2, 3].map((row) => (
            <div key={row} className="grid grid-cols-4 gap-4 mb-4">
                {[1, 2, 3, 4].map((col) => (
                    <Skeleton key={col} height={16} />
                ))}
            </div>
        ))}
    </div>
);

// Custom styled
export const CustomStyled: Story = {
    args: {
        width: 200,
        height: 100,
        sx: {
            borderRadius: '1rem',
            background: 'linear-gradient(110deg, #ececec 8%, #f5f5f5 18%, #ececec 33%)',
            backgroundSize: '200% 100%',
            animation: 'skeleton-wave 1.5s linear infinite',
            '&:hover': {
                transform: 'scale(1.05)',
            },
            '@media (prefers-color-scheme: dark)': {
                background: 'linear-gradient(110deg, #2a2a2a 8%, #3a3a3a 18%, #2a2a2a 33%)',
            },
        },
    },
}; 