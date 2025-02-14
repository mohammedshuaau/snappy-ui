import type {Meta, StoryObj} from '@storybook/react';
import {Pagination} from './Pagination';

const meta = {
    title: 'Navigation/Pagination',
    component: Pagination,
    parameters: {
        layout: 'centered',
        docs: {
            description: {
                component: 'A flexible pagination component that supports different styles, sizes, and navigation options.',
            },
        },
    },
    tags: ['autodocs'],
} satisfies Meta<typeof Pagination>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Basic: Story = {
    args: {
        totalPages: 10,
        currentPage: 1,
    },
};

export const WithSiblings: Story = {
    args: {
        totalPages: 10,
        currentPage: 5,
        siblingCount: 2,
    },
};

export const WithFirstLast: Story = {
    args: {
        totalPages: 10,
        currentPage: 5,
        showFirstLast: true,
    },
};

export const WithPrevNext: Story = {
    args: {
        totalPages: 10,
        currentPage: 5,
        showPrevNext: true,
    },
};

export const AllNavigationOptions: Story = {
    args: {
        totalPages: 10,
        currentPage: 5,
        showFirstLast: true,
        showPrevNext: true,
        siblingCount: 1,
    },
};

export const Sizes: Story = {
    args: {
        totalPages: 10,
        currentPage: 5,
        onPageChange: () => { },
    },
    render: (args) => (
        <div className="space-y-4">
            <Pagination {...args} size="sm" />
            <Pagination {...args} size="md" />
            <Pagination {...args} size="lg" />
        </div>
    ),
};

export const CustomStyling: Story = {
    args: {
        totalPages: 10,
        currentPage: 5,
        showFirstLast: true,
        showPrevNext: true,
        className: 'custom-pagination',
        onPageChange: () => { },
    },
}; 