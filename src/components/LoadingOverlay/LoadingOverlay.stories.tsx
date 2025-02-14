import type {Meta, StoryObj} from '@storybook/react';
import {LoadingOverlay} from './LoadingOverlay';

const meta = {
    title: 'Feedback/LoadingOverlay',
    component: LoadingOverlay,
    parameters: {
        layout: 'fullscreen',
    },
    tags: ['autodocs'],
    argTypes: {
        visible: {
            control: 'boolean',
        },
        blur: {
            control: 'boolean',
        },
        fullscreen: {
            control: 'boolean',
        },
        text: {
            control: 'text',
        },
    },
} satisfies Meta<typeof LoadingOverlay>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
    args: {
        visible: true,
    },
};

export const WithText: Story = {
    args: {
        visible: true,
        text: 'Loading...',
    },
};

export const NoBlur: Story = {
    args: {
        visible: true,
        blur: false,
        text: 'Loading without blur effect',
    },
};

export const CustomSpinner: Story = {
    args: {
        visible: true,
        text: 'Custom spinner',
        spinner: (
            <div className="animate-spin rounded-full h-12 w-12 border-4 border-primary-500 border-t-transparent" />
        ),
    },
};

export const RelativeContainer: Story = {
    render: () => (
        <div className="relative w-full h-[400px] bg-gray-100 dark:bg-gray-800 rounded-lg p-4">
            <div className="mb-4">Content behind the overlay</div>
            <LoadingOverlay
                visible
                fullscreen={false}
                text="Loading content..."
            />
        </div>
    ),
};

export const CustomStyles: Story = {
    args: {
        visible: true,
        text: 'Custom styles',
        sx: {
            backgroundColor: 'rgba(var(--color-primary-500), 0.2)',
            backdropFilter: 'blur(8px)',
        },
    },
}; 