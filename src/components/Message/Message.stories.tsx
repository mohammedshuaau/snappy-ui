import type {Meta, StoryObj} from '@storybook/react';
import {Message} from './Message';

const meta = {
    title: 'Feedback/Message',
    component: Message,
    parameters: {
        layout: 'centered',
    },
    tags: ['autodocs'],
    argTypes: {
        variant: {
            control: 'select',
            options: ['default', 'info', 'success', 'warning', 'error'],
        },
        size: {
            control: 'select',
            options: ['sm', 'md', 'lg'],
        },
    },
} satisfies Meta<typeof Message>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
    args: {
        children: 'This is a default message',
    },
};

export const Variants: Story = {
    render: () => (
        <div className="flex flex-col gap-4 w-[400px]">
            <Message variant="default">
                This is a default message
            </Message>
            <Message variant="info">
                This is an info message
            </Message>
            <Message variant="success">
                This is a success message
            </Message>
            <Message variant="warning">
                This is a warning message
            </Message>
            <Message variant="error">
                This is an error message
            </Message>
        </div>
    ),
};

export const Sizes: Story = {
    render: () => (
        <div className="flex flex-col gap-4 w-[400px]">
            <Message size="sm" variant="info">
                This is a small message
            </Message>
            <Message size="md" variant="info">
                This is a medium message
            </Message>
            <Message size="lg" variant="info">
                This is a large message
            </Message>
        </div>
    ),
};

export const CustomIcon: Story = {
    args: {
        variant: 'default',
        icon: (
            <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="w-4 h-4"
            >
                <path d="M11.645 20.91l-.007-.003-.022-.012a15.247 15.247 0 01-.383-.218 25.18 25.18 0 01-4.244-3.17C4.688 15.36 2.25 12.174 2.25 8.25 2.25 5.322 4.714 3 7.688 3A5.5 5.5 0 0112 5.052 5.5 5.5 0 0116.313 3c2.973 0 5.437 2.322 5.437 5.25 0 3.925-2.438 7.111-4.739 9.256a25.175 25.175 0 01-4.244 3.17 15.247 15.247 0 01-.383.219l-.022.012-.007.004-.003.001a.752.752 0 01-.704 0l-.003-.001z" />
            </svg>
        ),
        children: 'Message with custom icon',
    },
};

export const CustomStyles: Story = {
    args: {
        variant: 'info',
        sx: {
            borderWidth: '2px',
            borderStyle: 'dashed',
            borderColor: 'currentColor',
        },
        children: 'Message with custom styles',
    },
}; 