import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Menu } from './Menu';
import { Button } from '../Button/Button';
import { CustomStyle } from '../../types/custom-style.types';

const meta = {
    title: 'Navigation/Menu',
    component: Menu,
    parameters: {
        layout: 'centered',
        docs: {
            description: {
                component: `
# Menu Component

A flexible menu component that supports icons, keyboard navigation, and nested items.

## Features

- Keyboard navigation
- Icon support
- Keyboard shortcuts
- Disabled items
- Destructive items
- Dark mode support
- Context menu support
- Custom positioning

## Usage

\`\`\`jsx
import { Menu } from '@mohammedshuaau/snappy-ui';

function MyComponent() {
  const [open, setOpen] = useState(false);
  const items = [
    { label: 'New File', shortcut: '⌘N' },
    { label: 'Open...', shortcut: '⌘O' },
    { label: 'Save', shortcut: '⌘S', disabled: true },
    { label: 'Delete', shortcut: '⌫', destructive: true },
  ];

  return (
    <Menu
      items={items}
      open={open}
      onClose={() => setOpen(false)}
    />
  );
}
\`\`\`
`,
            },
        },
    },
    tags: ['autodocs'],
    argTypes: {
        items: {
            description: 'Array of menu items',
            control: 'object',
        },
        open: {
            description: 'Controls menu visibility',
            control: 'boolean',
        },
        onClose: {
            description: 'Callback when menu should close',
            control: 'function',
        },
        variant: {
            description: 'Menu variant',
            control: 'select',
            options: ['default', 'contextMenu'],
        },
        position: {
            description: 'Position for context menu variant',
            control: 'object',
        },
        anchorEl: {
            description: 'Element to anchor the menu to',
            control: 'object',
        },
        sx: {
            description: 'Custom styles',
            control: 'object',
        },
    },
} satisfies Meta<typeof Menu>;

export default meta;
type Story = StoryObj<typeof meta>;

// Example icons
const FileIcon = () => (
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
        <path d="M13 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V9z" />
        <polyline points="13 2 13 9 20 9" />
    </svg>
);

const EditIcon = () => (
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
        <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
        <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
    </svg>
);

const TrashIcon = () => (
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
        <polyline points="3 6 5 6 21 6" />
        <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
    </svg>
);

// Basic Menu
export const Basic: Story = {
    args: {
        items: [
            { label: 'New File', shortcut: '⌘N' },
            { label: 'Open...', shortcut: '⌘O' },
            { label: 'Save', shortcut: '⌘S', disabled: true },
            { label: 'Delete', shortcut: '⌫', destructive: true },
        ],
        open: true,
    },
    render: (args) => {
        const [open, setOpen] = React.useState(false);
        const [anchorEl, setAnchorEl] = React.useState<HTMLElement | null>(null);

        return (
            <div>
                <Button
                    ref={(el) => setAnchorEl(el)}
                    onClick={() => setOpen(true)}
                >
                    Open Menu
                </Button>
                <Menu
                    {...args}
                    items={args.items}
                    open={open}
                    onClose={() => setOpen(false)}
                    anchorEl={anchorEl}
                />
            </div>
        );
    }
};

// With Icons
export const WithIcons: Story = {
    args: {
        items: [
            { label: 'New File', icon: <FileIcon />, shortcut: '⌘N' },
            { label: 'Edit', icon: <EditIcon />, shortcut: '⌘E' },
            { label: 'Delete', icon: <TrashIcon />, shortcut: '⌫', destructive: true },
        ],
        open: true,
    },
    render: (args) => {
        const [open, setOpen] = React.useState(false);
        const [anchorEl, setAnchorEl] = React.useState<HTMLElement | null>(null);

        return (
            <div>
                <Button
                    ref={(el) => setAnchorEl(el)}
                    onClick={() => setOpen(true)}
                >
                    Open Menu
                </Button>
                <Menu
                    {...args}
                    items={args.items}
                    open={open}
                    onClose={() => setOpen(false)}
                    anchorEl={anchorEl}
                />
            </div>
        );
    }
};

// Context Menu
export const ContextMenu: Story = {
    args: {
        items: [
            { label: 'Cut', shortcut: '⌘X' },
            { label: 'Copy', shortcut: '⌘C' },
            { label: 'Paste', shortcut: '⌘V' },
            { label: 'Delete', shortcut: '⌫', destructive: true },
        ],
        //variant: 'contextMenu',
        open: true,
    },
    render: (args) => {
        const [open, setOpen] = React.useState(false);
        const [position, setPosition] = React.useState({ x: 0, y: 0 });

        return (
            <div
                className="h-40 w-80 rounded border border-dashed border-slate-300 p-4 dark:border-slate-700"
                onContextMenu={(e) => {
                    e.preventDefault();
                    setPosition({ x: e.clientX, y: e.clientY });
                    setOpen(true);
                }}
            >
                Right click here to open context menu
                <Menu
                    {...args}
                    items={args.items}
                    open={open}
                    onClose={() => setOpen(false)}
                    position={position}
                />
            </div>
        );
    }
};

// Custom Styled
export const CustomStyled: Story = {
    args: {
        items: [
            { label: 'Profile', shortcut: '⌘P' },
            { label: 'Settings', shortcut: '⌘,' },
            { label: 'Logout', shortcut: '⌘Q', destructive: true },
        ],
        open: true,
        sx: {
            backgroundColor: '#4f46e5',
            borderColor: 'transparent',
            '[data-role="menuitem"]': {
                color: 'white',
                '&:hover': {
                    backgroundColor: 'rgba(255, 255, 255, 0.1)',
                },
                '&[data-highlighted="true"]': {
                    backgroundColor: 'rgba(255, 255, 255, 0.15)',
                },
            },
            '[data-destructive="true"]': {
                color: '#fecaca',
            },
        } as CustomStyle,
    },
    render: (args) => {
        const [open, setOpen] = React.useState(false);
        const [anchorEl, setAnchorEl] = React.useState<HTMLElement | null>(null);

        return (
            <div>
                <Button
                    ref={(el) => setAnchorEl(el)}
                    onClick={() => setOpen(true)}
                    sx={{
                        background: 'linear-gradient(to right, #4f46e5, #7c3aed)',
                    }}
                >
                    Custom Menu
                </Button>
                <Menu
                    {...args}
                    items={args.items}
                    open={open}
                    onClose={() => setOpen(false)}
                    anchorEl={anchorEl}
                />
            </div>
        );
    }
}; 