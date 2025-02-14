import type {Meta, StoryObj} from '@storybook/react';
import {Popover, PopoverContent, PopoverTrigger} from './Popover';

const meta = {
    title: 'Feedback/Popover',
    component: Popover,
    parameters: {
        layout: 'centered',
    },
    tags: ['autodocs'],
    argTypes: {
        defaultOpen: {
            description: 'The open state of the popover when it is initially rendered',
            control: 'boolean',
        },
        open: {
            description: 'The controlled open state of the popover',
            control: 'boolean',
        },
        onOpenChange: {
            description: 'Event handler called when the open state of the popover changes',
            control: false,
        },
        modal: {
            description: 'The modality of the popover. When set to true, interaction with outside elements will be disabled',
            control: 'boolean',
        },
    },
} satisfies Meta<typeof Popover>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
    render: () => (
        <Popover>
            <PopoverTrigger>
                <button className="px-4 py-2 bg-primary-500 text-white rounded-md hover:bg-primary-600">
                    Click me
                </button>
            </PopoverTrigger>
            <PopoverContent>
                <div className="text-sm">
                    <h3 className="font-medium mb-2">Popover Title</h3>
                    <p className="text-gray-600 dark:text-gray-300">
                        This is a popover content with some information.
                    </p>
                </div>
            </PopoverContent>
        </Popover>
    ),
};

export const Positions: Story = {
    render: () => (
        <div className="flex gap-4">
            <Popover>
                <PopoverTrigger>
                    <button className="px-4 py-2 bg-primary-500 text-white rounded-md hover:bg-primary-600">
                        Top
                    </button>
                </PopoverTrigger>
                <PopoverContent side="top">
                    <div className="text-sm">Appears on top</div>
                </PopoverContent>
            </Popover>

            <Popover>
                <PopoverTrigger>
                    <button className="px-4 py-2 bg-primary-500 text-white rounded-md hover:bg-primary-600">
                        Right
                    </button>
                </PopoverTrigger>
                <PopoverContent side="right">
                    <div className="text-sm">Appears on right</div>
                </PopoverContent>
            </Popover>

            <Popover>
                <PopoverTrigger>
                    <button className="px-4 py-2 bg-primary-500 text-white rounded-md hover:bg-primary-600">
                        Bottom
                    </button>
                </PopoverTrigger>
                <PopoverContent side="bottom">
                    <div className="text-sm">Appears on bottom</div>
                </PopoverContent>
            </Popover>

            <Popover>
                <PopoverTrigger>
                    <button className="px-4 py-2 bg-primary-500 text-white rounded-md hover:bg-primary-600">
                        Left
                    </button>
                </PopoverTrigger>
                <PopoverContent side="left">
                    <div className="text-sm">Appears on left</div>
                </PopoverContent>
            </Popover>
        </div>
    ),
};

export const WithCustomStyles: Story = {
    render: () => (
        <Popover>
            <PopoverTrigger>
                <button className="px-4 py-2 bg-primary-500 text-white rounded-md hover:bg-primary-600">
                    Custom Styles
                </button>
            </PopoverTrigger>
            <PopoverContent
                sx={{
                    backgroundColor: 'rgb(var(--color-primary-50))',
                    borderWidth: '2px',
                    borderStyle: 'dashed',
                    borderColor: 'rgb(var(--color-primary-500))',
                }}
            >
                <div className="text-sm">
                    This popover has custom styles applied via the sx prop.
                </div>
            </PopoverContent>
        </Popover>
    ),
}; 