import type {Meta, StoryObj} from '@storybook/react';
import {Tabs} from './Tabs';

const meta = {
    title: 'Navigation/Tabs',
    component: Tabs,
    parameters: {
        layout: 'centered',
        docs: {
            description: {
                component: 'A versatile tabs component that supports different styles, sizes, and features like icons and disabled states.',
            },
        },
    },
    tags: ['autodocs'],
} satisfies Meta<typeof Tabs>;

export default meta;
type Story = StoryObj<typeof meta>;

const defaultItems = [
    {
        label: 'Account',
        content: <div className="p-4">Account settings content</div>,
    },
    {
        label: 'Password',
        content: <div className="p-4">Password settings content</div>,
    },
    {
        label: 'Notifications',
        content: <div className="p-4">Notification preferences content</div>,
    },
];

const itemsWithIcons = [
    {
        label: 'Account',
        content: <div className="p-4">Account settings content</div>,
        icon: (
            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
            </svg>
        ),
    },
    {
        label: 'Password',
        content: <div className="p-4">Password settings content</div>,
        icon: (
            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z" />
            </svg>
        ),
    },
    {
        label: 'Notifications',
        content: <div className="p-4">Notification preferences content</div>,
        icon: (
            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
            </svg>
        ),
    },
];

export const Default: Story = {
    args: {
        items: defaultItems,
    },
};

export const WithIcons: Story = {
    args: {
        items: itemsWithIcons,
    },
};

export const Pills: Story = {
    args: {
        items: itemsWithIcons,
        variant: 'pills',
    },
};

export const Underline: Story = {
    args: {
        items: itemsWithIcons,
        variant: 'underline',
    },
};

export const Sizes: Story = {
    args: {
        items: defaultItems,
        onChange: () => { },
    },
    render: (args) => (
        <div className="space-y-8">
            <Tabs {...args} size="sm" />
            <Tabs {...args} size="md" />
            <Tabs {...args} size="lg" />
        </div>
    ),
};

export const WithDisabledTab: Story = {
    args: {
        items: [
            ...defaultItems.slice(0, 1),
            { ...defaultItems[1], disabled: true },
            ...defaultItems.slice(2),
        ],
    },
};

export const CustomStyling: Story = {
    args: {
        items: defaultItems,
        className: 'custom-tabs',
        onChange: () => { },
    },
}; 