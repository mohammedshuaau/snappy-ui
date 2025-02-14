import React from 'react';
import type {Meta, StoryObj} from '@storybook/react';
import VirtualList from './VirtualList';

interface ItemType {
    id: number;
    title: string;
    description: string;
    height: number;
}

const meta = {
    title: 'Advanced/VirtualList',
    component: VirtualList,
    parameters: {
        layout: 'padded',
    },
    decorators: [
        (Story) => (
            <div style={{ width: '600px', margin: '0 auto' }}>
                <Story />
            </div>
        ),
    ],
    tags: ['autodocs'],
    argTypes: {
        variant: {
            control: 'select',
            options: ['default', 'contained'],
        },
        height: {
            control: 'number',
        },
        overscan: {
            control: 'number',
        },
        useWindow: {
            control: 'boolean',
        },
    },
} satisfies Meta<typeof VirtualList>;

export default meta;
type Story = StoryObj<typeof meta>;

// Generate sample items
const generateItems = (count: number): ItemType[] =>
    Array.from({ length: count }, (_, i) => ({
        id: i,
        title: `Item ${i + 1}`,
        description: `Description for item ${i + 1}`,
        height: Math.floor(Math.random() * 50) + 50, // Random height between 50 and 100
    }));

// Basic item renderer
const BasicItem = ({ item, style }: { item: ItemType; style: React.CSSProperties }) => (
    <div
        key={item.id}
        style={style}
        className="p-4 border-b border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors"
    >
        <h3 className="font-medium text-slate-900 dark:text-slate-100">{item.title}</h3>
    </div>
);

// Detailed item renderer
const DetailedItem = ({ item, style }: { item: ItemType; style: React.CSSProperties }) => (
    <div
        key={item.id}
        style={style}
        className="p-4 border-b border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors"
    >
        <h3 className="font-medium text-slate-900 dark:text-slate-100">{item.title}</h3>
        <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">{item.description}</p>
    </div>
);

export const Default: Story = {
    args: {
        items: generateItems(1000),
        height: 400,
        itemHeight: 70,
        renderItem: (item, _, style) => <BasicItem item={item as ItemType} style={style} />,
        variant: 'contained',
    },
};

export const Contained: Story = {
    args: {
        items: generateItems(1000),
        height: 400,
        itemHeight: 70,
        variant: 'contained',
        renderItem: (item, _, style) => <BasicItem item={item as ItemType} style={style} />,
    },
};

export const WithDynamicHeights: Story = {
    args: {
        items: generateItems(1000),
        height: 400,
        itemHeight: (item) => (item as ItemType).height,
        renderItem: (item, _, style) => <DetailedItem item={item as ItemType} style={style} />,
        variant: 'contained',
    },
};

export const WithLargeDataset: Story = {
    args: {
        items: generateItems(10000),
        height: 400,
        itemHeight: 70,
        renderItem: (item, _, style) => <BasicItem item={item as ItemType} style={style} />,
        variant: 'contained',
    },
};

export const WithCustomOverscan: Story = {
    args: {
        items: generateItems(1000),
        height: 400,
        itemHeight: 70,
        overscan: 5,
        renderItem: (item, _, style) => <BasicItem item={item as ItemType} style={style} />,
        variant: 'contained',
    },
};

const WindowScrollExample = () => {
    const [items] = React.useState(() => generateItems(1000));

    return (
        <div className="min-h-screen p-4 bg-white dark:bg-slate-900">
            <VirtualList
                items={items}
                height={window.innerHeight}
                itemHeight={70}
                useWindow={true}
                variant="contained"
                renderItem={(item, _, style) => <BasicItem item={item as ItemType} style={style} />}
            />
        </div>
    );
};

export const WithWindowScroll: Story = {
    parameters: {
        layout: 'fullscreen',
    },
    args: {
        items: generateItems(1000),
        height: 400,
        itemHeight: 70,
        useWindow: true,
        renderItem: (item, _, style) => <BasicItem item={item as ItemType} style={style} />,
        variant: 'contained',
    },
    render: () => <WindowScrollExample />,
};

export const CustomStyled: Story = {
    args: {
        items: generateItems(1000),
        height: 400,
        itemHeight: 70,
        renderItem: (item, _, style) => <BasicItem item={item as ItemType} style={style} />,
        variant: 'contained',
        sx: {
            boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
            borderRadius: '0.5rem',
        },
        className: 'hover:shadow-lg transition-shadow duration-200',
    },
}; 