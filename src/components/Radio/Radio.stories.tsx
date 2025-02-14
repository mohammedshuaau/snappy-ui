import type {Meta, StoryObj} from '@storybook/react';
import {Radio} from './Radio';

const meta = {
    title: 'Form/Radio',
    component: Radio,
    parameters: {
        layout: 'centered',
        docs: {
            description: {
                component: 'A customizable radio button component with support for labels, descriptions, error states, and dark mode. Features include keyboard navigation, focus states, and accessibility attributes.',
            },
        },
    },
    tags: ['autodocs'],
} satisfies Meta<typeof Radio>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Basic: Story = {
    args: {
        label: 'Option 1',
        name: 'basic-demo',
    },
};

export const WithDescription: Story = {
    args: {
        label: 'Email notifications',
        description: 'Receive notifications about your account via email.',
        name: 'notifications',
    },
};

export const Required: Story = {
    args: {
        label: 'Select an option',
        required: true,
        name: 'required-demo',
    },
};

export const WithError: Story = {
    args: {
        label: 'Select an option',
        required: true,
        error: 'Please select an option',
        name: 'error-demo',
    },
};

export const Checked: Story = {
    args: {
        label: 'Selected option',
        defaultChecked: true,
        name: 'checked-demo',
    },
};

export const Disabled: Story = {
    args: {
        label: 'Disabled option',
        description: 'This option cannot be selected',
        disabled: true,
        name: 'disabled-demo',
    },
};

export const DisabledChecked: Story = {
    args: {
        label: 'Disabled checked option',
        description: 'This option is selected but cannot be changed',
        disabled: true,
        defaultChecked: true,
        name: 'disabled-checked-demo',
    },
};

export const RadioGroup: Story = {
    render: () => (
        <div className="space-y-4">
            <Radio
                name="radio-group"
                label="Option 1"
                description="First option description"
                defaultChecked
            />
            <Radio
                name="radio-group"
                label="Option 2"
                description="Second option description"
            />
            <Radio
                name="radio-group"
                label="Option 3"
                description="Third option description"
            />
        </div>
    ),
};

export const CustomStyling: Story = {
    args: {
        label: 'Custom Styled Radio',
        description: 'With gradient background when checked',
        name: 'custom-styled',
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
            <Radio
                name="custom-group"
                label="Purple Theme"
                sx={{
                    '&:checked': {
                        background: 'linear-gradient(to right, #4f46e5, #7c3aed)',
                        borderColor: 'transparent',
                    },
                }}
            />
            <Radio
                name="custom-group"
                label="Green Theme"
                sx={{
                    '&:checked': {
                        background: 'linear-gradient(to right, #059669, #10b981)',
                        borderColor: 'transparent',
                    },
                }}
            />
            <Radio
                name="custom-group"
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