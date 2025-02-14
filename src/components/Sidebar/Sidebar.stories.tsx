import type { Meta, StoryObj } from '@storybook/react';
import { Sidebar } from './Sidebar';
import { CustomStyle } from '../../types/custom-style.types';

const meta = {
    title: 'Navigation/Sidebar',
    component: Sidebar,
    parameters: {
        layout: 'fullscreen',
        docs: {
            description: {
                component: 'A collapsible sidebar navigation component that supports grouped items, icons, and responsive design.',
            },
        },
    },
    tags: ['autodocs'],
} satisfies Meta<typeof Sidebar>;

export default meta;
type Story = StoryObj<typeof meta>;

const Logo = () => (
    <svg
        className="h-8 w-8 text-primary-600 dark:text-primary-400"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
    >
        <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M13 10V3L4 14h7v7l9-11h-7z"
        />
    </svg>
);

const HomeIcon = () => (
    <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
        />
    </svg>
);

const UsersIcon = () => (
    <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"
        />
    </svg>
);

const SettingsIcon = () => (
    <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
        />
        <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
        />
    </svg>
);

const FolderIcon = () => (
    <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z"
        />
    </svg>
);

const items = [
    {
        label: 'Dashboard',
        icon: <HomeIcon />,
        active: true,
    },
    {
        label: 'Team',
        icon: <UsersIcon />,
    },
    {
        label: 'Projects',
        items: [
            {
                label: 'All Projects',
                icon: <FolderIcon />,
            },
            {
                label: 'Recent',
                icon: <FolderIcon />,
            },
            {
                label: 'Archived',
                icon: <FolderIcon />,
            },
        ],
    },
    {
        label: 'Settings',
        icon: <SettingsIcon />,
    },
];

export const Basic: Story = {
    args: {
        brand: (
            <div className="flex items-center gap-2">
                <Logo />
                <span className="font-semibold">SnapKit</span>
            </div>
        ),
        items,
    },
};

export const Floating: Story = {
    args: {
        ...Basic.args,
        variant: 'floating',
    },
};

export const Collapsible: Story = {
    args: {
        ...Basic.args,
        collapsible: true,
    },
};

export const InitiallyCollapsed: Story = {
    args: {
        ...Basic.args,
        collapsible: true,
        defaultCollapsed: true,
    },
};

export const CustomStyling: Story = {
    args: {
        brand: (
            <div className="flex items-center gap-2 text-white">
                <Logo />
                <span className="font-semibold">Custom</span>
            </div>
        ),
        items,
        sx: {
            background: 'linear-gradient(to bottom, #4f46e5, #7c3aed)',
            borderColor: 'transparent',
            '[data-state=active]': {
                backgroundColor: 'rgba(255, 255, 255, 0.1)',
                color: 'white',
            },
            '& button, & a': {
                color: 'rgba(255, 255, 255, 0.7)',
                '&:hover': {
                    backgroundColor: 'rgba(255, 255, 255, 0.1)',
                    color: 'white',
                },
            },
        } as CustomStyle,
    },
}; 