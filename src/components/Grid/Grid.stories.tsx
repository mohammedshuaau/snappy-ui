import React from 'react';
import type {Meta, StoryObj} from '@storybook/react';
import {Grid} from './Grid';

const meta = {
    title: 'Layout/Grid',
    component: Grid,
    parameters: {
        layout: 'centered',
        docs: {
            description: {
                component: 'A grid layout component that provides a powerful and flexible grid system.',
            },
        },
    },
    tags: ['autodocs'],
} satisfies Meta<typeof Grid>;

export default meta;
type Story = StoryObj<typeof meta>;

const GridItem = ({ children }: { children: React.ReactNode }) => (
    <div className="bg-slate-200 p-4 rounded flex items-center justify-center">
        {children}
    </div>
);

export const Basic: Story = {
    args: {
        children: (
            <>
                {Array.from({ length: 4 }).map((_, i) => (
                    <GridItem key={i}>Item {i + 1}</GridItem>
                ))}
            </>
        ),
        cols: 2,
        gap: 4,
        className: 'bg-white p-4 w-96',
    },
};

export const ThreeColumns: Story = {
    args: {
        children: (
            <>
                {Array.from({ length: 9 }).map((_, i) => (
                    <GridItem key={i}>Item {i + 1}</GridItem>
                ))}
            </>
        ),
        cols: 3,
        gap: 4,
        className: 'bg-white p-4 w-[32rem]',
    },
};

export const WithRows: Story = {
    args: {
        children: (
            <>
                {Array.from({ length: 6 }).map((_, i) => (
                    <GridItem key={i}>Item {i + 1}</GridItem>
                ))}
            </>
        ),
        cols: 3,
        rows: 2,
        gap: 4,
        className: 'bg-white p-4 w-[32rem]',
    },
};

export const DifferentGaps: Story = {
    args: {
        children: (
            <>
                {Array.from({ length: 9 }).map((_, i) => (
                    <GridItem key={i}>Item {i + 1}</GridItem>
                ))}
            </>
        ),
        cols: 3,
        rowGap: 8,
        colGap: 4,
        className: 'bg-white p-4 w-[32rem]',
    },
};

export const DenseFlow: Story = {
    args: {
        children: (
            <>
                {Array.from({ length: 7 }).map((_, i) => (
                    <GridItem key={i}>Item {i + 1}</GridItem>
                ))}
            </>
        ),
        cols: 3,
        flow: 'dense',
        gap: 4,
        className: 'bg-white p-4 w-[32rem]',
    },
};

export const AutoRows: Story = {
    args: {
        children: (
            <>
                {Array.from({ length: 6 }).map((_, i) => (
                    <GridItem key={i}>
                        {i === 2 ? (
                            <div className="h-32">Taller Content</div>
                        ) : (
                            `Item ${i + 1}`
                        )}
                    </GridItem>
                ))}
            </>
        ),
        cols: 3,
        autoRows: 'auto',
        gap: 4,
        className: 'bg-white p-4 w-[32rem]',
    },
};

export const Responsive: Story = {
    args: {
        children: (
            <>
                {Array.from({ length: 6 }).map((_, i) => (
                    <GridItem key={i}>Item {i + 1}</GridItem>
                ))}
            </>
        ),
        responsive: true,
        gap: 4,
        className: 'bg-white p-4 w-full max-w-4xl',
    },
};

export const CustomStyling: Story = {
    args: {
        children: (
            <>
                {Array.from({ length: 4 }).map((_, i) => (
                    <GridItem key={i}>Item {i + 1}</GridItem>
                ))}
            </>
        ),
        cols: 2,
        gap: 4,
        className: 'p-4 rounded-lg',
        sx: {
            backgroundColor: '#f8fafc',
            boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
            '&:hover': {
                transform: 'scale(1.01)',
            },
        },
    },
}; 