import type {Meta, StoryObj} from '@storybook/react';
import {Checkbox} from './Checkbox';

const meta = {
    title: 'Form/Checkbox',
    component: Checkbox,
    parameters: {
        layout: 'centered',
        docs: {
            description: {
                component: 'A customizable checkbox component with support for labels, descriptions, error states, and dark mode. Features include keyboard navigation, focus states, and accessibility attributes.',
            },
        },
    },
    tags: ['autodocs'],
} satisfies Meta<typeof Checkbox>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Basic: Story = {
    args: {
        label: 'Accept terms and conditions',
    },
};

export const WithDescription: Story = {
    args: {
        label: 'Marketing emails',
        description: 'Receive updates about our latest products and promotions.',
    },
};

export const Required: Story = {
    args: {
        label: 'Accept terms and conditions',
        required: true,
    },
};

export const WithError: Story = {
    args: {
        label: 'Accept terms and conditions',
        required: true,
        error: 'You must accept the terms and conditions',
    },
};

export const Checked: Story = {
    args: {
        label: 'Remember me',
        defaultChecked: true,
    },
};

export const Disabled: Story = {
    args: {
        label: 'Disabled option',
        description: 'This option cannot be selected',
        disabled: true,
    },
};

export const DisabledChecked: Story = {
    args: {
        label: 'Disabled checked option',
        description: 'This option is selected but cannot be changed',
        disabled: true,
        defaultChecked: true,
    },
};

export const CustomStyling: Story = {
    args: {
        label: 'Custom Styled Checkbox',
        description: 'With gradient background when checked',
        sx: {
            '&:checked': {
                background: 'linear-gradient(to right, #4f46e5, #7c3aed)',
                borderColor: 'transparent',
            },
            '&:hover:not(:checked)': {
                borderColor: '#4f46e5',
            },
            '&:focus:not(:checked)': {
                borderColor: '#4f46e5',
                boxShadow: '0 0 0 2px rgba(79, 70, 229, 0.2)',
            },
        },
    },
};

export const CustomStyledGroup: Story = {
    render: () => (
        <div className="space-y-4">
            <Checkbox
                label="Purple Theme"
                sx={{
                    '&:checked': {
                        background: 'linear-gradient(to right, #4f46e5, #7c3aed)',
                        borderColor: 'transparent',
                    },
                }}
            />
            <Checkbox
                label="Green Theme"
                sx={{
                    '&:checked': {
                        background: 'linear-gradient(to right, #059669, #10b981)',
                        borderColor: 'transparent',
                    },
                }}
            />
            <Checkbox
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
}; 