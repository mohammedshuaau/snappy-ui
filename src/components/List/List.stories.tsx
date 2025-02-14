import type {Meta, StoryObj} from '@storybook/react';
import {List} from './List';

const meta = {
    title: 'Data Display/List',
    component: List,
    parameters: {
        layout: 'padded',
    },
    tags: ['autodocs'],
    argTypes: {
        variant: {
            control: 'select',
            options: ['default', 'ordered', 'unordered', 'none'],
        },
        spacing: {
            control: 'select',
            options: ['compact', 'default', 'relaxed'],
        },
        marker: {
            control: 'select',
            options: ['inside', 'outside'],
        },
        ordered: {
            control: 'boolean',
        },
        nested: {
            control: 'boolean',
        },
    },
} satisfies Meta<typeof List>;

export default meta;
type Story = StoryObj<typeof List>;

// Basic examples
export const Unordered: Story = {
    args: {
        children: (
            <>
                <li>First item</li>
                <li>Second item</li>
                <li>Third item</li>
            </>
        ),
    },
};

export const Ordered: Story = {
    args: {
        ordered: true,
        children: (
            <>
                <li>First item</li>
                <li>Second item</li>
                <li>Third item</li>
            </>
        ),
    },
};

export const WithoutMarkers: Story = {
    args: {
        variant: 'none',
        children: (
            <>
                <li>First item</li>
                <li>Second item</li>
                <li>Third item</li>
            </>
        ),
    },
};

// Spacing variations
export const CompactSpacing: Story = {
    args: {
        spacing: 'compact',
        children: (
            <>
                <li>First item</li>
                <li>Second item</li>
                <li>Third item</li>
            </>
        ),
    },
};

export const RelaxedSpacing: Story = {
    args: {
        spacing: 'relaxed',
        children: (
            <>
                <li>First item</li>
                <li>Second item</li>
                <li>Third item</li>
            </>
        ),
    },
};

// Marker position
export const MarkerInside: Story = {
    args: {
        marker: 'inside',
        children: (
            <>
                <li>First item with a longer text that wraps to the next line to demonstrate marker positioning</li>
                <li>Second item with a longer text that wraps to the next line to demonstrate marker positioning</li>
                <li>Third item with a longer text that wraps to the next line to demonstrate marker positioning</li>
            </>
        ),
    },
};

// Nested lists
export const NestedLists = () => (
    <List>
        <li>First level item 1</li>
        <li>
            First level item 2
            <List nested>
                <li>Second level item 1</li>
                <li>
                    Second level item 2
                    <List nested ordered>
                        <li>Third level item 1</li>
                        <li>Third level item 2</li>
                        <li>Third level item 3</li>
                    </List>
                </li>
                <li>Second level item 3</li>
            </List>
        </li>
        <li>First level item 3</li>
    </List>
);

// Custom styled example
export const CustomStyled = () => (
    <List variant="none" spacing="relaxed" className="max-w-2xl">
        <li className="group relative pl-8 pb-1">
            <div className="absolute left-0 top-2 h-4 w-4 rounded-full border-2 border-primary-500 bg-white dark:bg-gray-800 group-last:before:hidden before:absolute before:left-2 before:top-4 before:h-full before:w-px before:bg-primary-200 dark:before:bg-primary-800" />
            <div className="flex flex-col gap-1">
                <h3 className="font-semibold text-gray-900 dark:text-white">Project Planning</h3>
                <p className="text-gray-600 dark:text-gray-300">Define project scope, objectives, and key deliverables</p>
                <div className="flex gap-2 text-sm text-gray-500 dark:text-gray-400">
                    <span>Due: March 15</span>
                    <span>•</span>
                    <span>High Priority</span>
                </div>
            </div>
        </li>
        <li className="group relative pl-8 pb-1">
            <div className="absolute left-0 top-2 h-4 w-4 rounded-full border-2 border-primary-500 bg-primary-100 dark:bg-primary-900" />
            <div className="flex flex-col gap-1">
                <h3 className="font-semibold text-gray-900 dark:text-white">Resource Allocation</h3>
                <p className="text-gray-600 dark:text-gray-300">Assign team members and allocate necessary resources</p>
                <div className="flex gap-2 text-sm text-gray-500 dark:text-gray-400">
                    <span>Due: March 20</span>
                    <span>•</span>
                    <span>Medium Priority</span>
                </div>
            </div>
        </li>
        <li className="group relative pl-8">
            <div className="absolute left-0 top-2 h-4 w-4 rounded-full border-2 border-primary-500 bg-white dark:bg-gray-800" />
            <div className="flex flex-col gap-1">
                <h3 className="font-semibold text-gray-900 dark:text-white">Implementation</h3>
                <p className="text-gray-600 dark:text-gray-300">Execute project tasks according to the timeline</p>
                <div className="flex gap-2 text-sm text-gray-500 dark:text-gray-400">
                    <span>Due: April 1</span>
                    <span>•</span>
                    <span>Medium Priority</span>
                </div>
            </div>
        </li>
    </List>
);

CustomStyled.parameters = {
    docs: {
        description: {
            story: 'Example of a custom styled list with rich content, timeline indicators, and dark mode support.',
        },
    },
}; 