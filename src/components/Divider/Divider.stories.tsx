import type { Meta, StoryObj } from '@storybook/react';
import { Divider } from './Divider';

const meta = {
    title: 'Layout/Divider',
    component: Divider,
    parameters: {
        layout: 'centered',
        docs: {
            description: {
                component: 'A divider component that creates a visual separation between content.',
            },
        },
    },
    tags: ['autodocs'],
} satisfies Meta<typeof Divider>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Basic: Story = {
    args: {
        className: 'w-96',
    },
    decorators: [
        (Story) => (
            <div className="w-96 bg-white p-4">
                <p>Content above</p>
                <Story />
                <p>Content below</p>
            </div>
        ),
    ],
};

export const WithLabel: Story = {
    args: {
        label: 'OR',
        className: 'w-96',
    },
    decorators: [
        (Story) => (
            <div className="w-96 bg-white p-4">
                <p>Content above</p>
                <Story />
                <p>Content below</p>
            </div>
        ),
    ],
};

export const Vertical: Story = {
    args: {
        orientation: 'vertical',
        className: 'h-32',
    },
    decorators: [
        (Story) => (
            <div className="h-32 bg-white p-4 flex">
                <p>Left</p>
                <Story />
                <p>Right</p>
            </div>
        ),
    ],
};

export const Variants: Story = {
    render: () => (
        <div className="w-96 space-y-8 bg-white p-4">
            <div>
                <p className="mb-2 text-sm text-slate-500">Solid</p>
                <Divider variant="solid" />
            </div>
            <div>
                <p className="mb-2 text-sm text-slate-500">Dashed</p>
                <Divider variant="dashed" />
            </div>
            <div>
                <p className="mb-2 text-sm text-slate-500">Dotted</p>
                <Divider variant="dotted" />
            </div>
        </div>
    ),
};

export const Sizes: Story = {
    render: () => (
        <div className="w-96 space-y-8 bg-white p-4">
            <div>
                <p className="mb-2 text-sm text-slate-500">Thin</p>
                <Divider size="thin" />
            </div>
            <div>
                <p className="mb-2 text-sm text-slate-500">Regular</p>
                <Divider size="regular" />
            </div>
            <div>
                <p className="mb-2 text-sm text-slate-500">Thick</p>
                <Divider size="thick" />
            </div>
        </div>
    ),
};

export const Colors: Story = {
    render: () => (
        <div className="w-96 space-y-8 bg-white p-4">
            <div>
                <p className="mb-2 text-sm text-slate-500">Default</p>
                <Divider color="default" />
            </div>
            <div>
                <p className="mb-2 text-sm text-slate-500">Primary</p>
                <Divider color="primary" />
            </div>
            <div>
                <p className="mb-2 text-sm text-slate-500">Secondary</p>
                <Divider color="secondary" />
            </div>
            <div>
                <p className="mb-2 text-sm text-slate-500">Success</p>
                <Divider color="success" />
            </div>
            <div>
                <p className="mb-2 text-sm text-slate-500">Warning</p>
                <Divider color="warning" />
            </div>
            <div>
                <p className="mb-2 text-sm text-slate-500">Error</p>
                <Divider color="error" />
            </div>
        </div>
    ),
};

export const CustomStyling: Story = {
    args: {
        className: 'w-96',
        sx: {
            borderColor: '#4f46e5',
            borderWidth: '2px',
            '&:hover': {
                borderColor: '#6366f1',
            },
        },
    },
    decorators: [
        (Story) => (
            <div className="w-96 bg-white p-4">
                <p>Content above</p>
                <Story />
                <p>Content below</p>
            </div>
        ),
    ],
}; 