import type {Meta, StoryObj} from '@storybook/react';
import CommandPalette from './CommandPalette';
import {Calendar, FileText, Github, HelpCircle, LogOut, Mail, Moon, Search, Settings, User,} from 'lucide-react';

const meta = {
    title: 'Advanced/CommandPalette',
    component: CommandPalette,
    parameters: {
        layout: 'fullscreen',
    },
    tags: ['autodocs'],
    argTypes: {
        variant: {
            control: 'select',
            options: ['default', 'blur'],
        },
        size: {
            control: 'select',
            options: ['sm', 'default', 'lg'],
        },
    },
} satisfies Meta<typeof CommandPalette>;

export default meta;
type Story = StoryObj<typeof meta>;

const items = [
    {
        id: 'settings',
        title: 'Settings',
        description: 'Manage your account settings and preferences',
        icon: <Settings className="h-4 w-4" />,
        shortcut: ['⌘', ','],
        category: 'System',
        action: () => console.log('Settings clicked'),
    },
    {
        id: 'profile',
        title: 'Profile',
        description: 'View and edit your profile information',
        icon: <User className="h-4 w-4" />,
        category: 'System',
        action: () => console.log('Profile clicked'),
    },
    {
        id: 'documents',
        title: 'Documents',
        description: 'View your documents and files',
        icon: <FileText className="h-4 w-4" />,
        category: 'Content',
        action: () => console.log('Documents clicked'),
    },
    {
        id: 'mail',
        title: 'Mail',
        description: 'Check your inbox and messages',
        icon: <Mail className="h-4 w-4" />,
        shortcut: ['⌘', 'E'],
        category: 'Communication',
        action: () => console.log('Mail clicked'),
    },
    {
        id: 'calendar',
        title: 'Calendar',
        description: 'View your calendar and events',
        icon: <Calendar className="h-4 w-4" />,
        shortcut: ['⌘', 'C'],
        category: 'Communication',
        action: () => console.log('Calendar clicked'),
    },
    {
        id: 'search',
        title: 'Search',
        description: 'Search through your content',
        icon: <Search className="h-4 w-4" />,
        shortcut: ['⌘', 'F'],
        category: 'Content',
        action: () => console.log('Search clicked'),
    },
    {
        id: 'help',
        title: 'Help & Support',
        description: 'Get help and support',
        icon: <HelpCircle className="h-4 w-4" />,
        category: 'System',
        action: () => console.log('Help clicked'),
    },
    {
        id: 'theme',
        title: 'Toggle Theme',
        description: 'Switch between light and dark mode',
        icon: <Moon className="h-4 w-4" />,
        shortcut: ['⌘', 'T'],
        category: 'System',
        action: () => console.log('Theme clicked'),
    },
    {
        id: 'github',
        title: 'View on GitHub',
        description: 'Open the repository on GitHub',
        icon: <Github className="h-4 w-4" />,
        category: 'Links',
        action: () => window.open('https://github.com', '_blank'),
    },
    {
        id: 'logout',
        title: 'Log Out',
        description: 'Sign out of your account',
        icon: <LogOut className="h-4 w-4" />,
        shortcut: ['⌘', 'Q'],
        category: 'System',
        action: () => console.log('Logout clicked'),
    },
];

export const Default: Story = {
    args: {
        items,
        open: true,
        onClose: () => console.log('Close clicked'),
    },
};

export const WithBlur: Story = {
    args: {
        ...Default.args,
        variant: 'blur',
    },
};

export const Small: Story = {
    args: {
        ...Default.args,
        size: 'sm',
    },
};

export const Large: Story = {
    args: {
        ...Default.args,
        size: 'lg',
    },
};

export const CustomStyles: Story = {
    args: {
        ...Default.args,
        sx: {
            backgroundColor: 'rgba(0, 0, 0, 0.8)',
        },
    },
}; 