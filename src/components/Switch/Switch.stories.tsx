import type {Meta, StoryObj} from '@storybook/react';
import {Switch} from './Switch';

const meta = {
    title: 'Form/Switch',
    component: Switch,
    parameters: {
        layout: 'centered',
        docs: {
            description: {
                component: 'A customizable switch component with support for labels, descriptions, error states, and dark mode. Features include keyboard navigation, focus states, and accessibility attributes.',
            },
        },
    },
    tags: ['autodocs'],
} satisfies Meta<typeof Switch>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Basic: Story = {
    args: {
        label: 'Airplane Mode',
    },
};

export const WithDescription: Story = {
    args: {
        label: 'Push Notifications',
        description: 'Receive notifications when someone mentions you.',
    },
};

export const Required: Story = {
    args: {
        label: 'Accept Terms',
        required: true,
    },
};

export const WithError: Story = {
    args: {
        label: 'Accept Terms',
        required: true,
        error: 'You must accept the terms to continue',
    },
};

export const Checked: Story = {
    args: {
        label: 'Dark Mode',
        defaultChecked: true,
    },
};

export const Disabled: Story = {
    args: {
        label: 'Disabled option',
        description: 'This option cannot be toggled',
        disabled: true,
    },
};

export const DisabledChecked: Story = {
    args: {
        label: 'Disabled checked option',
        description: 'This option is enabled but cannot be changed',
        disabled: true,
        defaultChecked: true,
    },
};

export const CustomStyling: Story = {
    args: {
        label: 'Custom Styled Switch',
        description: 'With gradient background when checked',
        sx: {
            '&:checked': {
                background: 'linear-gradient(to right, #4f46e5, #7c3aed)',
                borderColor: 'transparent',
            },
            '&:hover:not(:checked)': {
                backgroundColor: '#e2e8f0',
            },
            '&:focus:not(:checked)': {
                borderColor: '#4f46e5',
                boxShadow: '0 0 0 2px rgba(79, 70, 229, 0.2)',
            },
        },
    },
};

export const CustomStyledGroup: Story = {
    args: {
        children: (
            <div className="space-y-4">
                <Switch
                    label="Purple Theme"
                    sx={{
                        '&:checked': {
                            background: 'linear-gradient(to right, #4f46e5, #7c3aed)',
                            borderColor: 'transparent',
                        },
                    }}
                />
                <Switch
                    label="Green Theme"
                    sx={{
                        '&:checked': {
                            background: 'linear-gradient(to right, #059669, #10b981)',
                            borderColor: 'transparent',
                        },
                    }}
                />
                <Switch
                    label="Orange Theme"
                    sx={{
                        '&:checked': {
                            background: 'linear-gradient(to right, #ea580c, #f97316)',
                            borderColor: 'transparent',
                        },
                    }}
                />
            </div>
        ),
    },
}; 