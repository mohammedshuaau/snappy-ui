import React from 'react';
import type {Meta, StoryObj} from '@storybook/react';
import {Dropdown, DropdownItem, DropdownMenu} from './Dropdown';
import {Button} from '../Button/Button';

const meta = {
    title: 'Data Display/Dropdown',
    component: Dropdown,
    parameters: {
        layout: 'centered',
        docs: {
            description: {
                component: `
A flexible dropdown menu component for navigation and actions.

## Features
- Multiple variants and positions
- Icon support
- Keyboard navigation
- Dark mode support
- Custom styling with \`sx\` prop
`,
            },
        },
    },
    tags: ['autodocs'],
} satisfies Meta<typeof Dropdown>;

export default meta;
type Story = StoryObj<typeof meta>;

// Basic Dropdown
export const Basic: Story = {
    args: {
        trigger: <Button>Open Menu</Button>,
    },
    render: function BasicRender(args) {
        const [isOpen, setIsOpen] = React.useState(false);

        return (
            <Dropdown
                {...args}
                open={isOpen}
                onClose={() => setIsOpen(false)}
                trigger={
                    <Button onClick={() => setIsOpen(!isOpen)}>
                        Open Menu
                    </Button>
                }
            >
                <DropdownMenu>
                    <DropdownItem onClick={() => setIsOpen(false)}>Profile</DropdownItem>
                    <DropdownItem onClick={() => setIsOpen(false)}>Settings</DropdownItem>
                    <DropdownItem onClick={() => setIsOpen(false)}>Logout</DropdownItem>
                </DropdownMenu>
            </Dropdown>
        );
    },
};

// With Icons
export const WithIcons: Story = {
    args: {
        trigger: <Button>Menu with Icons</Button>,
    },
    render: function IconsRender(args) {
        const [isOpen, setIsOpen] = React.useState(false);

        return (
            <Dropdown
                {...args}
                open={isOpen}
                onClose={() => setIsOpen(false)}
                trigger={
                    <Button onClick={() => setIsOpen(!isOpen)}>
                        Menu with Icons
                    </Button>
                }
            >
                <DropdownMenu>
                    <DropdownItem
                        onClick={() => setIsOpen(false)}
                        icon={
                            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                            </svg>
                        }
                    >
                        Profile
                    </DropdownItem>
                    <DropdownItem
                        onClick={() => setIsOpen(false)}
                        icon={
                            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                            </svg>
                        }
                    >
                        Settings
                    </DropdownItem>
                    <DropdownItem
                        onClick={() => setIsOpen(false)}
                        variant="destructive"
                        icon={
                            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                            </svg>
                        }
                    >
                        Logout
                    </DropdownItem>
                </DropdownMenu>
            </Dropdown>
        );
    },
};

// Variants
export const Variants: Story = {
    args: {
        trigger: <Button>Default Menu</Button>,
    },
    render: function VariantsRender(args) {
        const [isOpen, setIsOpen] = React.useState(false);

        return (
            <div className="flex gap-4">
                <Dropdown
                    {...args}
                    open={isOpen}
                    onClose={() => setIsOpen(false)}
                    trigger={
                        <Button onClick={() => setIsOpen(!isOpen)}>
                            Default Menu
                        </Button>
                    }
                >
                    <DropdownMenu variant="default">
                        <DropdownItem onClick={() => setIsOpen(false)}>Item 1</DropdownItem>
                        <DropdownItem onClick={() => setIsOpen(false)}>Item 2</DropdownItem>
                    </DropdownMenu>
                </Dropdown>

                <Dropdown
                    open={isOpen}
                    onClose={() => setIsOpen(false)}
                    trigger={
                        <Button variant="destructive" onClick={() => setIsOpen(!isOpen)}>
                            Destructive Menu
                        </Button>
                    }
                >
                    <DropdownMenu variant="destructive">
                        <DropdownItem onClick={() => setIsOpen(false)}>Delete</DropdownItem>
                        <DropdownItem onClick={() => setIsOpen(false)}>Remove</DropdownItem>
                    </DropdownMenu>
                </Dropdown>
            </div>
        );
    },
};

// Disabled Items
export const DisabledItems: Story = {
    args: {
        trigger: <Button>Menu with Disabled Items</Button>,
    },
    render: function DisabledRender(args) {
        const [isOpen, setIsOpen] = React.useState(false);

        return (
            <Dropdown
                {...args}
                open={isOpen}
                onClose={() => setIsOpen(false)}
                trigger={
                    <Button onClick={() => setIsOpen(!isOpen)}>
                        Menu with Disabled Items
                    </Button>
                }
            >
                <DropdownMenu>
                    <DropdownItem onClick={() => setIsOpen(false)}>Enabled Item</DropdownItem>
                    <DropdownItem disabled onClick={() => setIsOpen(false)}>Disabled Item</DropdownItem>
                    <DropdownItem onClick={() => setIsOpen(false)}>Enabled Item</DropdownItem>
                </DropdownMenu>
            </Dropdown>
        );
    },
};

// Custom Styled
export const CustomStyled: Story = {
    args: {
        trigger: <Button>Custom Menu</Button>,
    },
    render: function CustomRender(args) {
        const [isOpen, setIsOpen] = React.useState(false);

        return (
            <Dropdown
                {...args}
                open={isOpen}
                onClose={() => setIsOpen(false)}
                trigger={
                    <Button
                        onClick={() => setIsOpen(!isOpen)}
                        sx={{
                            background: 'linear-gradient(to right, #4f46e5, #7c3aed)',
                        }}
                    >
                        Custom Menu
                    </Button>
                }
            >
                <DropdownMenu
                    sx={{
                        background: 'linear-gradient(to right, #4f46e5, #7c3aed)',
                        border: 'none',
                        padding: '0.5rem',
                    }}
                >
                    <DropdownItem
                        className="text-white hover:bg-white/10"
                        onClick={() => setIsOpen(false)}
                    >
                        Custom Item 1
                    </DropdownItem>
                    <DropdownItem
                        className="text-white hover:bg-white/10"
                        onClick={() => setIsOpen(false)}
                    >
                        Custom Item 2
                    </DropdownItem>
                </DropdownMenu>
            </Dropdown>
        );
    },
}; 